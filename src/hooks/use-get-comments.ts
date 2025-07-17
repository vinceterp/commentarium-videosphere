import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useGetCommentsQuery(
  postId: string,
  page: number = 0,
  pageSize: number = 10,
) {
  return useQuery({
    queryKey: ["getComments", postId],
    queryFn: async () => {
      if (!postId) {
        throw new Error("Post ID is required to fetch comments");
      }
      const {
        data: { data },
      } = await api.get(
        `/comments?postId=${postId}&page=${page}&size=${pageSize}&sort=createdAt,desc`,
      );
      return data;
    },
    retry: false,
  });
}
