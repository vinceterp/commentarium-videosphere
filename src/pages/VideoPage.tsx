import { useParams } from "react-router-dom";
import CommentSection from "@/components/CommentSection";

const VideoPage = () => {
  const { videoId } = useParams();
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-8">
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;