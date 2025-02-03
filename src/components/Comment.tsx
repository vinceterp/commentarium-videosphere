import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Edit2, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface CommentType {
  id: string;
  content: string;
  likes: number;
  replies: CommentType[];
  author: string;
  timestamp: string;
}

interface CommentProps {
  comment: CommentType;
  depth?: number;
}

const Comment = ({ comment, depth = 0 }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  const handleReply = () => {
    setShowReplyForm(false);
    setReplyContent("");
  };

  return (
    <div className={`space-y-4 ${depth > 0 ? "ml-6 pl-4 border-l border-muted" : ""}`}>
      <div className="glass-morphism p-4 rounded-lg space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`} />
              <AvatarFallback>{comment.author.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-secondary">{comment.author}</span>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[100px] bg-accent"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" onClick={handleSaveEdit}>
                <Check className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-foreground">{comment.content}</p>
        )}

        <div className="flex items-center gap-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 ${isLiked ? "text-secondary" : ""}`}
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            {comment.likes + (isLiked ? 1 : 0)}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <MessageSquare className="h-4 w-4" />
            Reply
          </Button>
        </div>

        {showReplyForm && (
          <div className="space-y-2 mt-4">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[100px] bg-accent"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" onClick={handleReply}>
                Post Reply
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
};

export default Comment;