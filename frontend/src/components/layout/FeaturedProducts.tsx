import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/comps/ProductCard";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Loader from "../comps/Loader";
import toast from "react-hot-toast";
import CustomPagination from "@/components/comps/CustomPagination";

const ProductsGrid = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const params = { page, keyword };

  const { data, isLoading, error, isError } = useGetProductsQuery(params);
  useEffect(() => {
    if (isError) toast.error(error?.data?.message, { id: "clipboard" });
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="pt-4 px-4 md:px-4 lg:px-6">
      <div className="pt-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.products?.map((product) => {
          return <ProductCard key={product?._id} {...product} />;
        })}
      </div>
      <div className="mt-16">
        <CustomPagination
          resPerPage={data?.resPerPage}
          filteredProductsCount={data?.filteredProductsCount}
        />
      </div>
    </div>
  );
};

export default ProductsGrid;
