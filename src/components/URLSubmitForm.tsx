/* eslint-disable no-useless-escape */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCreatePostMutation } from "@/hooks/use-create-post";

const URLSubmitForm = () => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const { mutate: createPost, isPending } = useCreatePostMutation(url);

  const validateYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  const getPostId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateYouTubeUrl(url)) {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
      });
      return;
    }

    const postId = getPostId(url);
    if (postId) {
      createPost();
      // navigate(`/post/${postId}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-4"
    >
      <div className="glass-morphism p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">
          Share a YouTube Video
        </h2>
        <p
          className="opacity-50 mt-24 text-sm text-center"
          style={{ marginTop: 0 }}
        >
          (with comments disabled)
        </p>
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-accent"
          />
          <Button
            loading={isPending}
            type="submit"
            className="bg-secondary hover:bg-secondary/80"
          >
            Create Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default URLSubmitForm;
