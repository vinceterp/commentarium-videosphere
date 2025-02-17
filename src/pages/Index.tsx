
import URLSubmitForm from "@/components/URLSubmitForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MessageCircle, Youtube } from "lucide-react";

const examples = [
  {
    title: "Beautiful Nature Documentary",
    url: "https://youtu.be/v7yyhy5Ya5A",
    thumbnail: "https://img.youtube.com/vi/v7yyhy5Ya5A/maxresdefault.jpg",
    comments: ["Breathtaking views!", "Nature at its finest", "Amazing footage!"],
  },
  {
    title: "Space Exploration",
    url: "https://youtu.be/watch?v=udAL48P5NJU",
    thumbnail: "https://img.youtube.com/vi/udAL48P5NJU/maxresdefault.jpg",
    comments: ["Mind-blowing!", "Space is fascinating", "Can't wait for more!"],
  },
  {
    title: "Cooking Masterclass",
    url: "https://youtu.be/watch?v=8SU0gFPMwP8",
    thumbnail: "https://img.youtube.com/vi/8SU0gFPMwP8/maxresdefault.jpg",
    comments: ["Great recipe!", "Thanks for sharing", "Will try this weekend"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-12">
      <div className="w-full max-w-6xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            duration: 20,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {examples.map((example, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-2/3">
                <div className="glass-morphism p-6 rounded-lg h-full">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={example.thumbnail}
                          alt={example.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-black/40 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-secondary mb-2">
                          <Youtube className="h-5 w-5" />
                          <h3 className="font-semibold">{example.title}</h3>
                        </div>
                        <p className="text-sm text-gray-300 font-mono break-all">
                          {example.url}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2 text-secondary">
                        <MessageCircle className="h-5 w-5" />
                        <h4 className="font-semibold">Example Comments</h4>
                      </div>
                      <div className="space-y-3">
                        {example.comments.map((comment, idx) => (
                          <div
                            key={idx}
                            className="bg-black/40 p-4 rounded text-sm text-gray-300"
                          >
                            {comment}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="w-full animate-fade-in">
        <URLSubmitForm />
      </div>
    </div>
  );
};

export default Index;
