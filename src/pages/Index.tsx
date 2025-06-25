import URLSubmitForm from "@/components/URLSubmitForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MessageCircle, Youtube } from "lucide-react";

const examples = [
  {
    title: "EA Sports College Football 24",
    url: "https://www.youtube.com/watch?v=1e7P_nY2CKw",
    thumbnail:
      "https://i.ytimg.com/an_webp/1e7P_nY2CKw/mqdefault_6s.webp?du=3000&sqp=COC57MIG&rs=AOn4CLCqPl2LCgfa_J50npnvFLSBTc7a0Q",
    comments: [
      "Breathtaking views!",
      "Nature at its finest",
      "Amazing footage!",
    ],
  },
  {
    title:
      "Using Only Seeds My MIMIC OCTOPUS DIGS UP! (BETTER SEEDS?) | Grow a Garden",
    url: "https://youtu.be/watch?v=udAL48P5NJU",
    thumbnail:
      "https://i.ytimg.com/an_webp/Q8hOT67US1A/mqdefault_6s.webp?du=3000&sqp=COC_7MIG&rs=AOn4CLBVL0gpOkoEQo8AC9egwDvPi5JKAg",
    comments: ["Mind-blowing!", "Space is fascinating", "Can't wait for more!"],
  },
  {
    title:
      "The Best Fried Chicken Wings You'll Ever Make! You will cook it again & again!!!🔥😲 | 2 RECIPES",
    url: "https://www.youtube.com/watch?v=w8Y_uGGt_88",
    thumbnail:
      "https://i.ytimg.com/an_webp/w8Y_uGGt_88/mqdefault_6s.webp?du=3000&sqp=CK3F7MIG&rs=AOn4CLA3SKqU6Kz01qFgscrdmN_OYvGmRg",
    comments: ["Great recipe!", "Thanks for sharing", "Will try this weekend"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-12">
      <h1 className="text-4xl font-bold text-center animate-fade-in">
        Hidden comments? Start the discussion you weren't meant to 🗣️
      </h1>

      <div className="w-full animate-fade-in">
        <URLSubmitForm />
      </div>

      <div className="w-full mx-auto">
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
          <CarouselContent className="-ml-[8%]">
            {examples.map((example, index) => (
              <CarouselItem key={index} className="pl-[5%] basis-[80%]">
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
    </div>
  );
};

export default Index;
