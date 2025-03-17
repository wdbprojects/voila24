import { useGetProductDetailsQuery } from "@/redux/api/productsApi";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ColorsComp = ({ setColorChosen }) => {
  const params = useParams();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id,
  );
  const colors = data.product.colors;
  const [productColor, setProdutColor] = useState(colors[0]);

  return (
    <div className="mb-4">
      <h4 className="text-md font-medium tracking-wider capitalize text-lg">
        colors
      </h4>
      <div className="mt-2 flex flex-wrap gap-x-0 gap-y-2">
        {colors.map((color) => {
          return (
            <Button
              size="sm"
              isIconOnly
              variant="flat"
              key={color}
              className={`p-2 !h-5 mr-2 rounded transition ring-inset  ${
                productColor === color
                  ? "ring-2 ring-black dark:ring-white ring-inset"
                  : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => {
                setProdutColor(color);
                setColorChosen(color);
              }}
            ></Button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorsComp;
