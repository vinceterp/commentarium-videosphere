/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api, { CustomAxiosError, queryClient } from "@/lib/axios";
import { useToast } from "./use-toast";
import { useUser } from "@/stores/users";
import { useLogout } from "./use-logout";

export type CreateCommentVars = {
  content: string;
  parentCommentId?: number;
};

export function useCreateCommentMutation(postId: string) {
  const { toast } = useToast();
  const { isAuthenticated, user } = useUser();
  const { handleLogout } = useLogout();

  return useMutation({
    mutationKey: ["createComment", postId],
    mutationFn: async ({ content, parentCommentId }: CreateCommentVars) => {
      if (!isAuthenticated) {
        throw new Error("User not authenticated");
      }
      const {
        data: { data },
      } = await api.post(`/comments`, { postId, content, parentCommentId });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getComments", postId],
      });
      // toast({
      //   variant: "default",
      //   title: "Comment Created",
      //   description: "Your comment has been created successfully.",
      // });
    },
    onMutate: async (newCommentData) => {
      await queryClient.cancelQueries({ queryKey: ["getComments", postId] });
      const previousComments: any[] = queryClient.getQueryData([
        "getComments",
        postId,
      ]);

      if (newCommentData.parentCommentId) {
        // If replying to a comment, find the parent comment and add the new reply
        const updatedComments = previousComments.map((comment: any) => {
          if (comment.id === newCommentData.parentCommentId) {
            const newReply = {
              author: user,
              id: Date.now(), // Temporary ID until the server responds
              content: newCommentData.content,
              createdAt: new Date().toISOString(),
              likes: [],
              replies: [],
            };
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          return comment;
        });
        queryClient.setQueryData(["getComments", postId], updatedComments);
        return { previousComments };
      }

      const newComment = {
        author: user,
        id: Date.now(), // Temporary ID until the server responds
        content: newCommentData.content,
        createdAt: new Date().toISOString(),
        likes: [],
        replies: [],
      };
      queryClient.setQueryData(["getComments", postId], (old: any[]) => [
        newComment,
        ...(old || []),
      ]);
      return { previousComments };
    },
    onError: (error: CustomAxiosError, _, context) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.message,
        });
      }
      queryClient.setQueryData(
        ["getComments", postId],
        context?.previousComments,
      );
    },
  });
}
