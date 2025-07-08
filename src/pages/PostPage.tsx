import { useParams, useLocation, useNavigate } from "react-router-dom";
import CommentSection from "@/components/CommentSection";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useGetPostQuery } from "@/hooks/use-get-post";
import { Skeleton } from "@/components/ui/skeleton";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const thumbnailUrl = `https://img.youtube.com/vi/${postId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${postId}`;

  // TODO: Fetch post data from API Only instead of using router state
  const { data: post, isLoading, error } = useGetPostQuery(postId);

  if (error) {
    navigate("/404");
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-start animate-fade-in">
            {isLoading ? "Loading..." : post?.title}
          </h1>
          <div className="flex items-center justify-between  gap-2 mt-4">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <p className="font-bold">{"Loading..."}</p>
              ) : (
                <>
                  <Avatar className="flex h-8 cursor-pointer">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user`}
                    />
                  </Avatar>
                  <p className="font-bold">
                    {post?.author
                      ? `${post?.author?.firstName} ${post?.author?.lastName}`
                      : "John Doe"}
                  </p>
                </>
              )}
            </div>
            {
              <span className="text-md text-gray-100">
                {isLoading ? (
                  <>{"Loading..."}</>
                ) : (
                  <>
                    {"Posted on "}
                    {new Date(post?.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {post?.createdAt &&
                      ` at ${new Date(post?.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}`}
                  </>
                )}
              </span>
            }
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            {isLoading && <Skeleton className="w-full h-full object-cover" />}
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="bg-black/75 text-white px-3 py-1 rounded-full flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              {post?.viewCount && (
                <span className="text-sm font-medium">{`${Number(post?.viewCount).toLocaleString("en-US")} views`}</span>
              )}
            </div>
            <Button
              variant="secondary"
              className="w-auto"
              onClick={() => window.open(videoUrl, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Watch on YouTube
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {isLoading ? (
            <p>{"Loading..."}</p>
          ) : (
            <CommentSection postId={post?.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
