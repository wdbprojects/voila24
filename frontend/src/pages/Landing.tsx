import Container from "@/components/comps/Container";
import Hero from "@/components/comps/Hero";
import MetaData from "@/components/comps/MetaData";
import FeaturedProducts from "@/components/layout/FeaturedProducts";

const Landing = () => {
  return (
    <>
      <MetaData title="Homepage" />
      <div className="sm:flex sm:justify-between bg-gray-100 pb-8 dark:bg-gray-950">
        <div className="container px-0 lg:px-6 ">
          <Hero />
          <FeaturedProducts />
        </div>
      </div>
    </>
  );
};
export default Landing;
