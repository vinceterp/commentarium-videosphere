import { useMutation } from "@tanstack/react-query";
import api, { CustomAxiosError, queryClient } from "@/lib/axios";
import { useToast } from "./use-toast";
import { useUser } from "@/stores/users";

export function useCreateCommentMutation(postId: string) {
  const { toast } = useToast();
  const { isAuthenticated, logout } = useUser();

  return useMutation({
    mutationKey: ["createComment", postId],
    mutationFn: async (commentText: string) => {
      if (!isAuthenticated) {
        throw new Error("User not authenticated");
      }
      const {
        data: { data },
      } = await api.post(`/comments`, { postId, content: commentText });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getComments", postId],
      });
      toast({
        variant: "default",
        title: "Comment Created",
        description: "Your comment has been created successfully.",
      });
    },
    onError: (error: CustomAxiosError) => {
      if (error.response?.status === 401) {
        logout();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.message,
        });
      }
    },
  });
}
