import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Comment, { CommentType } from "./Comment";
import { useGetCommentsQuery } from "@/hooks/use-get-comments";

interface CommentSectionProps {
  postId: string;
}

const COMMENTS_PER_PAGE = 5;

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: initialComments,
    isLoading,
    refetch,
    isRefetching,
  } = useGetCommentsQuery(postId, page, COMMENTS_PER_PAGE);

  useEffect(() => {
    if (initialComments) {
      if (page === 0) {
        setComments(initialComments);
      } else {
        setComments((prev) => {
          // Prevent duplicate comments if the same page is fetched again
          const ids = new Set(prev.map((c) => c.id));
          return [...prev, ...initialComments.filter((c) => !ids.has(c.id))];
        });
      }
      setHasMore(
        initialComments.length === COMMENTS_PER_PAGE &&
          initialComments.length > 0,
      );
    }
  }, [initialComments, page]);

  // Force refetch when page changes to ensure the query runs
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // const handleSubmitComment = (e: React.FormEvent) => {
  //   // e.preventDefault();
  //   // if (!newComment.trim()) return;

  //   // const comment: CommentType = {
  //   //   id: Date.now().toString(),
  //   //   content: newComment,
  //   //   likes: 0,
  //   //   author: "You",
  //   //   timestamp: "Just now",
  //   //   replies: [],
  //   // };

  //   // setComments([comment, ...comments]);
  //   // setNewComment("");
  // };

  return (
    <div className="space-y-6">
      <form className="space-y-4">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] bg-accent"
        />
        <div className="flex justify-end">
          <Button type="submit" className="bg-secondary hover:bg-secondary/80">
            Post Comment
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            loading={isLoading || isRefetching}
            className="w-full max-w-sm"
            onClick={handleLoadMore}
          >
            {isLoading || isRefetching ? "Loading..." : "Load More Comments"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
