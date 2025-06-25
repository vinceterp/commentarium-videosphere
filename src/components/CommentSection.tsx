import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Comment, { CommentType } from "./Comment";

// Mock data - in a real app, this would come from your backend
const mockComments: CommentType[] = [
  {
    id: "1",
    content: "This is such an interesting perspective!",
    likes: 15,
    author: "User1",
    timestamp: "2 hours ago",
    replies: [
      {
        id: "2",
        content: "I completely agree with your point.",
        likes: 5,
        author: "User2",
        timestamp: "1 hour ago",
        replies: [],
      },
    ],
  },
  {
    id: "3",
    content: "Great video, thanks for sharing!",
    likes: 10,
    author: "User3",
    timestamp: "3 hours ago",
    replies: [],
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading initial comments
    setComments(mockComments);
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more comments
    setTimeout(() => {
      setComments([...comments, ...mockComments]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: CommentType = {
      id: Date.now().toString(),
      content: newComment,
      likes: 0,
      author: "You",
      timestamp: "Just now",
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmitComment} className="space-y-4">
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
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleLoadMore}
          disabled={loading}
          className="w-full max-w-sm"
        >
          {loading ? "Loading..." : "Load More Comments"}
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
