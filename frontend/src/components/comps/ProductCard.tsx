import { formatPrice } from "@/utils/Misc";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import Ratings from "./Ratings";
import defaultImage from "@/assets/images/products/defaultProduct.png";

const ProductCard = (product) => {
  const productImage =
    product?.images.length > 0 ? product?.images[0].url : defaultImage;

  return (
    <Card className="flex flex-col justify-between p-0 border-0 dark:bg-gray-900 rounded">
      <Link to={`/products/${product._id}`}>
        <CardContent className="p-2">
          <div className="relative bg-foreground/5 dark:bg-gray-800">
            <img
              src={productImage}
              alt={product?.name}
              className="aspect-square object-cover transition-all duration-300 hover:brightness-125 h-[140px] w-full rounded"
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col justify-between h-full py-2 px-2">
        <div className="mb-2">
          <Link to={`/products/${product._id}`}>
            <p className="font-normal text-md font-medium capitalize text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-all">
              {product.name}
            </p>
          </Link>
        </div>
        <div className="p-0 w-full">
          <div className="flex justify-between items-center">
            <Ratings rating={product?.ratings} disabled={true} size="md" />
            <span className="text-sm text-gray-500">
              ({product?.numOfReviews})
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs text-gray-500">{product.category}</p>
            <div className="text-lg font-bold">
              {formatPrice(product.price)}
            </div>
          </div>
          <div className="flex flex-row justify-between items-end gap-0 w-full">
            <Button
              color="default"
              variant="solid"
              size="sm"
              as={Link}
              to={`/products/${product._id}`}
            >
              View details
            </Button>

            <Button
              color="success"
              size="sm"
              onClick={() => {
                console.log("added to cart!!");
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
