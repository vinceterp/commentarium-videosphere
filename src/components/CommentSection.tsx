import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Comment, { CommentType } from "./Comment";
import { useGetCommentsQuery } from "@/hooks/use-get-comments";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useUser } from "@/stores/users";
import { useCreateCommentMutation } from "@/hooks/use-create-comment";

interface CommentSectionProps {
  postId: string;
}

const COMMENTS_PER_PAGE = 5;

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { mutate: createComment } = useCreateCommentMutation(postId);

  const {
    data: initialComments,
    isLoading,
    refetch,
    isRefetching,
  } = useGetCommentsQuery(postId, page, COMMENTS_PER_PAGE);

  const isAuthenticated = useUser((state) => state.isAuthenticated);

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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    createComment({ content: newComment });
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmitComment}>
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] max-h-[256px] bg-accent text-md text-gray-100"
          disabled={!isAuthenticated}
        />
        <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    type="submit"
                    className="bg-secondary hover:bg-secondary/80"
                    disabled={!isAuthenticated}
                  >
                    Post Comment
                  </Button>
                </span>
              </TooltipTrigger>
              {!isAuthenticated && (
                <TooltipContent side="top">
                  Login to leave a comment
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>

      <div className="space-y-6">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment?.id}
              comment={comment}
              createComment={createComment}
            />
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
