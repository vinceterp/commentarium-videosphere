import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useGetPostQuery(postId: string) {
  return useQuery({
    queryKey: ["getPost", postId],
    queryFn: async () => {
      const {
        data: { data },
      } = await api.get(`/posts?videoId=${postId}`);
      return data;
    },
    retry: false,
  });
}
