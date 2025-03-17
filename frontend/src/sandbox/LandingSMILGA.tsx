import Container from "@/components/comps/Container";
import Hero from "@/components/comps/Hero";
import MetaData from "@/components/comps/MetaData";
import FeaturedProducts from "@/components/layout/FeaturedProducts";
import { customFetch } from "@/utils/Axios";
const url = "/products?featured=true";

export const loader = async () => {
  const response = await customFetch.get(url);
  const products = await response?.data;
  console.log(products.data);
  return { products: products.data };
};

const Landing = () => {
  return (
    <>
      <MetaData title="Homepage" />
      <main className="sm:flex sm:justify-between">
        <Container>
          <div className="pb-10">
            <Hero />
          </div>
          <FeaturedProducts />
        </Container>
      </main>
    </>
  );
};
export default Landing;
