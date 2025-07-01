/* eslint-disable no-useless-escape */
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useToast } from "./use-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/users";

const getPostId = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export function useCreatePostMutation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (originalUrl: string) => {
      const { data } = await api.post("/posts", { originalUrl });
      //   console.log("Post created:", data);
      return data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Error creating post:", error);
      toast({
        variant: "destructive",
        title: "Post Creation Failed",
        description:
          !isAuthenticated && error.response?.status === 403
            ? "You must be logged in to create a post."
            : error.response?.data.message ||
              "An error occurred while creating the post.",
      });
    },
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Post Created",
        description: "Your post has been created successfully.",
      });
      const postId = getPostId(data.originalUrl);
      if (postId) {
        navigate(`/post/${postId}`, {
          state: { post: data }, // Pass the created post data to the post page
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid URL",
          description:
            "The provided URL does not contain a valid YouTube video ID.",
        });
      }
    },
  });
}
