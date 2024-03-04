import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import { getPriceQueryParams } from "@/utils/helpers";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
} from "@nextui-org/react";

const Filters = () => {
  let [searchParams] = useSearchParams();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const navigate = useNavigate();

  const { data } = useGetProductsQuery();
  const products = data?.products;

  const uniqueCategories = [
    ...new Set(
      products?.map((item) => {
        return item.category;
      }),
    ),
  ];
  const uniqueBrands = [
    ...new Set(
      products?.map((item) => {
        return item.seller;
      }),
    ),
  ];

  const handlePriceFilter = (event) => {
    event.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min * 100);
    searchParams = getPriceQueryParams(searchParams, "max", max * 100);
    searchParams.set("page", "1");
    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };

  /* HANDLE CATEGORY FILTER */
  const handleCategoryFilter = (value) => {
    if (value === "") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
      searchParams.set("page", "1");
    }
    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };
  /* HANDLE BRANDS FILTER */
  const handleBrandFilter = (value) => {
    if (value === "") {
      searchParams.delete("seller");
    } else {
      searchParams.set("seller", value);
      searchParams.set("page", "1");
    }
    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };

  useEffect(() => {
    handleCategoryFilter(category);
  }, [category, setCategory]);
  useEffect(() => {
    handleBrandFilter(brand);
  }, [brand, setBrand]);

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min") / 100);
    searchParams.has("max") && setMax(searchParams.get("max") / 100);
  }, []);

  return (
    <>
      <h2 className="capitalize dark:text-gray-300 text-xl font-semibold text-center mb-4">
        Filters
      </h2>
      <Divider className="my-4 hidden sm:block" />
      <div className="grid grid-cols-2 justify-center flex-wrap gap-4 sm:block">
        {/* CATEGORIES */}
        <div className="mb-1 sm:mb-4">
          <Autocomplete
            label="Categories"
            placeholder="Choose a category"
            className="max-w-xs"
            onInputChange={(value) => {
              setCategory(value);
            }}
          >
            {uniqueCategories?.map((item, index) => {
              return <AutocompleteItem key={index}>{item}</AutocompleteItem>;
            })}
          </Autocomplete>
        </div>
        <Divider className="my-4 hidden sm:block" />
        {/* SELLER */}
        <div className="mb-1 sm:mb-4">
          <Autocomplete
            label="Brands"
            placeholder="Choose a brand"
            className="max-w-xs"
            onInputChange={(value) => {
              setBrand(value);
            }}
          >
            {uniqueBrands?.map((item, index) => {
              return <AutocompleteItem key={index}>{item}</AutocompleteItem>;
            })}
          </Autocomplete>
        </div>
        <Divider className="my-4 hidden sm:block" />
        {/* PRICE */}
        <div className="mb-1 m:mb-4">
          <form onSubmit={handlePriceFilter}>
            <div className="flex items-center justify-between gap-2">
              <Input
                type="number"
                size="sm"
                label="From"
                value={min}
                name="min"
                labelPlacement="outside"
                placeholder="Min"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                onChange={(event) => {
                  setMin(event.target.value);
                }}
              />
              <Input
                type="number"
                size="sm"
                label="To"
                value={max}
                name="max"
                labelPlacement="outside"
                placeholder="Max"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                onChange={(event) => {
                  setMax(event.target.value);
                }}
              />
            </div>
            <Button
              type="submit"
              color="default"
              size="sm"
              className="w-full mt-2"
            >
              Filter by Price
            </Button>
          </form>
        </div>
        <Divider className="my-4 hidden sm:block" />
      </div>
    </>
  );
};

export default Filters;
