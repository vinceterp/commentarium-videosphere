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
      "Fascinating perspective.",
      "This documentary highlights a side of globalization we rarely see.",
      "So many layers to this story. Glad this documentary didn’t shy away from the nuance.",
    ],
  },
  {
    title:
      'The "Voiceless Knights" Delivering Food: Chengdu, China - Asia Insight',
    url: "https://www.youtube.com/watch?v=NDKd5l297vc",
    thumbnail: "https://img.youtube.com/vi/NDKd5l297vc/maxresdefault.jpg",
    comments: [
      "This was incredibly moving. It’s amazing how these deaf delivery workers are navigating such a fast-paced city with strength and grace. Truly inspiring!",
      "Respect to the ‘Voiceless Knights’—they’re modern-day heroes.",
      "Beautiful storytelling. This video shows how resilience and community support can break down barriers. Thank you for shedding light on this!",
    ],
  },
  {
    title: "The Surge in South Korea's Foreign Workers - Asia Insight",
    url: "https://www.youtube.com/watch?v=yx7uozK8POs",
    thumbnail: "https://img.youtube.com/vi/yx7uozK8POs/maxresdefault.jpg",
    comments: [
      "I had no idea South Korea was relying so heavily on foreign labor.",
      "Respect to these workers who are filling crucial roles and contributing to Korea’s economy, often under tough conditions.",
      "Great documentary!",
    ],
  },
];

const Index = () => {
  return (
    <div className=" flex flex-col items-center justify-center m-4 gap-12">
      <div>
        <h1 className="text-4xl font-bold text-center animate-fade-in pt-8">
          Speak Your Mind 🗣️
        </h1>
        <h2 className="text-2xl text-center animate-fade-in pt-8 mt-[-16px]">
          Even When Creators Won’t Let You.
        </h2>
      </div>

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
            autoScroll: true,
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
