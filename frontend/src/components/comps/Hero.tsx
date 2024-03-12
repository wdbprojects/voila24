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
    <div className="sm:px-[1.5rem] md:px-[3.5rem]">
      <Carousel
        className="w-full h-full"
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
                  <div className="relative flex items-start justify-center p-0 w-full max-h-[280px]">
                    <img src={image} alt={`Hero ${index}`} />
                    <div className=" absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] font-bold w-full text-lg sm:text-2xl md:text-3xl lg:text-5xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/50 p-4 rounded-lg">
                      <h3 className="mb-2 ">Featured Products</h3>
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
        <CarouselPrevious className="absolute left-[2px] sm:left-[-48px]" />
        <CarouselNext className="absolute right-[2px] sm:right-[-48px]" />
      </Carousel>
    </div>
  );
};
export default Hero;
