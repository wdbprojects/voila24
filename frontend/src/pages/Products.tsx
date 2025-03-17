import { useState } from "react";
import Filters from "@/components/comps/Filters";
import Sort from "@/components/comps/Sort";
import ProductsGrid from "@/components/layout/ProductsGrid";
import ProductsList from "@/components/layout/ProductsList";

const Products = () => {
  const [gridView, setGridView] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(0);

  return (
    <div className="!h-full">
      <Sort
        gridView={gridView}
        setGridView={setGridView}
        filteredProducts={filteredProducts}
      />

      <div className="pt-4 px-4 lg:px-6 container flex flex-col sm:flex-row gap-6">
        <div
          className="min-w-[200px] lg:min-w-[220px] sm:max-w-[200px] lg:max-w-[220px]"
          style={{ display: "block" }}
        >
          <Filters />
        </div>
        <div className="block w-full">
          {gridView ? (
            <ProductsGrid setFilteredProducts={setFilteredProducts} />
          ) : (
            <ProductsList setFilteredProducts={setFilteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
