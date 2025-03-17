import hero1 from "@/assets/images/hero1.jpg";
import { Button } from "@nextui-org/react";
import { ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <div className="overflow-hidden">
      <div
        style={{ backgroundImage: `url(${hero1})` }}
        className="relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover max-h-[250px] w-full"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center sm:gap-y-8">
          <div className="font-bold text-xl sm:text-3xl lg:text-5xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/50 p-4 rounded-lg">
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
    </div>
  );
};
export default Hero;
