import { useMutation } from "@tanstack/react-query";
import api, { CustomAxiosError, queryClient } from "@/lib/axios";
import { useToast } from "./use-toast";

type DeleteCommentVars = {
  commentId: number;
};

export function useDeleteCommentMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async ({ commentId }: DeleteCommentVars) => {
      const { data } = await api.delete(`/comments`, {
        data: { commentId },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getComments"],
      });
      toast({
        variant: "default",
        title: "Comment Deleted",
        description: "Your comment has been deleted successfully.",
      });
    },
    onError: (error: CustomAxiosError) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to delete comment.",
      });
    },
  });
}
