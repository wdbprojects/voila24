import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/comps/ProductCard";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Loader from "../comps/Loader";
import toast from "react-hot-toast";
import CustomPagination from "@/components/comps/CustomPagination";

const ProductsGrid = ({ setFilteredProducts }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const seller = searchParams.get("seller");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  seller !== null && (params.seller = seller);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) toast.error(error?.data?.message, { id: "clipboard" });
  }, [error]);
  useEffect(() => {
    setFilteredProducts(data?.filteredProductsCount);
  }, [data]);
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between gap-4 h-full pb-4">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products?.map((product) => {
          return <ProductCard key={product?._id} {...product} />;
        })}
      </div>

      <div className="mt-8">
        <CustomPagination
          resPerPage={data?.resPerPage}
          filteredProductsCount={data?.filteredProductsCount}
        />
      </div>
    </div>
  );
};

export default ProductsGrid;
