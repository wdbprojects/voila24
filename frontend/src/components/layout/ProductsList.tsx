import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCardList from "@/components/comps/ProductCardList";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Loader from "../comps/Loader";
import toast from "react-hot-toast";
import CustomPagination from "@/components/comps/CustomPagination";
import Filters from "../comps/Filters";

const ProductsList = ({ setFilteredProducts }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const params = { page, keyword };

  const { data, isLoading, error, isError } = useGetProductsQuery(params);
  useEffect(() => {
    if (isError) toast.error(error?.data?.message, { id: "clipboard" });
  }, [error]);

  useEffect(() => {
    setFilteredProducts(data?.filteredProductsCount);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full pb-4">
      <div className="block w-full">
        {data?.products?.map((product) => {
          return <ProductCardList key={product?._id} {...product} />;
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

export default ProductsList;
