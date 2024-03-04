import hero1 from "@/assets/images/hero1.jpg";

import { heroImages } from "@/data/images";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "@nextui-org/react";
import { ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <div className="px-[3.5rem]">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {heroImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <div className="p-0">
                  <div className="relative flex items-center justify-center p-0 w-full h-[280px]">
                    <img src={image} alt={`Hero ${index}`} />
                    <div className=" absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] font-bold text-xl sm:text-3xl lg:text-5xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/50 p-4 rounded-lg">
                      <h3 className="mb-2">Featured Products</h3>
                      <Button color="primary" size="md">
                        <ShoppingBag className="mr-2 text-gray-700" />
                        <span className="uppercase text-gray-700 font-semibold">
                          Shop Now
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default Hero;
