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
  const { isAuthenticated, logout } = useUser();
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
      toast({
        variant: "default",
        title: "Comment Created",
        description: "Your comment has been created successfully.",
      });
    },
    onError: (error: CustomAxiosError) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(true);
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
