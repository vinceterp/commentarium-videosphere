import URLSubmitForm from "@/components/URLSubmitForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MessageCircle, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { getPostId } from "@/hooks/use-create-post";

const examples = [
  {
    title: "Chasing the Chinese Dream in Africa - Documentary 360",
    url: "https://www.youtube.com/watch?v=34woI_H3nTc",
    thumbnail: "https://img.youtube.com/vi/34woI_H3nTc/maxresdefault.jpg",
    comments: [
      "Breathtaking views!",
      "Nature at its finest",
      "Amazing footage!",
    ],
  },
  {
    title: "Can Our Cities Survive the Heat?",
    url: "https://www.youtube.com/watch?v=qtinSxbRJV8&t=10s",
    thumbnail: "https://img.youtube.com/vi/qtinSxbRJV8/maxresdefault.jpg",
    comments: ["Mind-blowing!", "Space is fascinating", "Can't wait for more!"],
  },
  {
    title:
      "The Best Fried Chicken Wings You'll Ever Make! You will cook it again & again!!!🔥😲 | 2 RECIPES",
    url: "https://www.youtube.com/watch?v=w8Y_uGGt_88",
    thumbnail: "https://img.youtube.com/vi/w8Y_uGGt_88/maxresdefault.jpg",
    comments: ["Great recipe!", "Thanks for sharing", "Will try this weekend"],
  },
];

const Index = () => {
  return (
    <div className=" flex flex-col items-center justify-center m-4 gap-12">
      <h1 className="text-4xl font-bold text-center animate-fade-in pt-8">
        Hidden comments? Start the discussion you weren't meant to 🗣️
      </h1>

      <div className="w-full animate-fade-in">
        <URLSubmitForm />
      </div>

      <div className="w-screen mx-[-32px]">
        <Carousel
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
            duration: 20,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {examples.map((example, index) => {
              const postId = getPostId(example.url);
              return (
                <CarouselItem key={index} className=" basis-[80%]">
                  <div className="glass-morphism p-6 rounded-lg h-full">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <Link to={postId && `/post/${postId}`}>
                            <img
                              data-testid="example-thumbnail"
                              src={example.thumbnail}
                              alt={example.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </Link>
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
                          <h4 className="font-semibold">Comments</h4>
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
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Index;
