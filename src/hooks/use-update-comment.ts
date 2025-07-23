/* eslint-disable @typescript-eslint/no-explicit-any */
import api, { CustomAxiosError, queryClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

type updateCommentVars = {
  commentId: number;
  content?: string;
  likedBy?: number;
  unlikedBy?: number;
};

export function useUpdateCommentMutation(postId: string) {
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
    onMutate: async (newCommentData) => {
      await queryClient.cancelQueries({ queryKey: ["getComments", postId] });
      const previousComments: any[] = queryClient.getQueryData([
        "getComments",
        postId,
      ]);

      const newComments = previousComments?.map((comment: any) => {
        if (comment.id === newCommentData.commentId) {
          return {
            ...comment,
            content: newCommentData.content ?? comment.content,
            likes: newCommentData.likedBy
              ? [...(comment.likes || []), newCommentData.likedBy]
              : comment.likes.filter(
                  (like: number) => like !== newCommentData.unlikedBy,
                ),
          };
        }
        return comment;
      });
      queryClient.setQueryData(["getComments", postId], newComments);
      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getComments"],
      });
      // toast({
      //   variant: "default",
      //   title: "Comment Updated",
      //   description: "Your comment has been updated successfully.",
      // });
    },
    onError: (error: CustomAxiosError, _, context) => {
      queryClient.setQueryData(
        ["getComments", postId],
        context?.previousComments,
      );
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
