import { useMutation } from "@tanstack/react-query";
import api, { CustomAxiosError } from "@/lib/axios";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/users";

export const getPostId = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    // 1. Try the 'v' parameter
    const vParam = parsedUrl.searchParams.get("v");
    if (vParam && vParam.length === 11) {
      return vParam;
    }

    // 2. Try youtu.be/<id> path
    if (parsedUrl.hostname.includes("youtu.be")) {
      const pathId = parsedUrl.pathname.split("/").filter(Boolean)[0];
      if (pathId && pathId.length === 11) {
        return pathId;
      }
    }

    // 3. Try other youtube.com path patterns
    const regex = /(?:\/(?:v|e(?:mbed)?)\/|\/watch\/|\/shorts\/)([^/?&]{11})/;
    const match = parsedUrl.pathname.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  } catch {
    // invalid URL
  }

  return null;
};

export function useCreatePostMutation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useUser();
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (originalUrl: string) => {
      const { data } = await api.post("/posts", { originalUrl });
      return data;
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Post Created",
        description: "Your post has been created successfully.",
      });
      const postId = getPostId(response.data.originalUrl);
      if (postId) {
        navigate(`/post/${postId}`, {
          state: { post: response.data }, // Pass the created post data to the post page
        });
      }
    },
    onError: (error: CustomAxiosError) => {
      let description = "An error occurred while creating the post.";

      if (!isAuthenticated || error.response?.status === 403) {
        description = "You must be logged in to create a post.";
      } else {
        description = error.response?.data?.message || description;
      }

      toast({
        variant: "destructive",
        title: "Post Creation Failed",
        description,
      });

      if (error.response?.status === 403) {
        logout(); // Clear user data if not authenticated
        navigate("/signin");
      }
    },
  });
}
