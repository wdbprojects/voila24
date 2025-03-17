import { useLoaderData } from "react-router-dom";
import ProductCard from "@/components/comps/ProductCard";

const ProductsGrid = () => {
  const { products } = useLoaderData();
  return (
    <div className="pt-12 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        return <ProductCard key={product?.id} {...product} />;
      })}

      <ProductCard />
    </div>
  );
};

export default ProductsGrid;
