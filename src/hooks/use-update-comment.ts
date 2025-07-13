import api, { CustomAxiosError, queryClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

type updateCommentVars = {
  commentId: number;
  content?: string;
  likedBy?: number;
  unlikedBy?: number;
};

export function useUpdateCommentMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["updateComment"],
    mutationFn: async ({
      commentId,
      content,
      likedBy,
      unlikedBy,
    }: updateCommentVars) => {
      const { data } = await api.patch(`/comments`, {
        commentId,
        content: content ?? null, // Use undefined if content is not provided
        likedBy: likedBy ?? null, // Use undefined if likedBy is not provided
        unlikedBy: unlikedBy ?? null, // Use undefined if likedBy is not provided
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getComments"],
      });
      toast({
        variant: "default",
        title: "Comment Updated",
        description: "Your comment has been updated successfully.",
      });
      // Invalidate queries or perform any other success actions
    },
    onError: (error: CustomAxiosError) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update comment.",
      });
      // Handle error, e.g., show a toast notification
    },
  });
}
