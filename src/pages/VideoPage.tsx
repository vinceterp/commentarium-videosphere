import { useParams } from "react-router-dom";
import CommentSection from "@/components/CommentSection";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";

const VideoPage = () => {
  const { videoId } = useParams();
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="bg-black/75 text-white px-3 py-1 rounded-full flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">0 views</span>
            </div>
            <Button 
              variant="secondary" 
              className="w-auto"
              onClick={() => window.open(videoUrl, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Watch on YouTube
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;