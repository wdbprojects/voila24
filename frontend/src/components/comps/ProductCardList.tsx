import { formatPrice } from "@/utils/Misc";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import Ratings from "./Ratings";
import defaultImage from "@/assets/images/products/defaultProduct.png";

const ProductCardList = (product) => {
  const productImage =
    product?.images.length > 0 ? product?.images[0].url : defaultImage;

  return (
    <Card className="flex flex-row p-0 border-0 dark:bg-gray-900 mb-4">
      <Link to={`/products/${product._id}`}>
        <CardHeader className="p-2">
          <img
            src={productImage}
            alt={product?.name}
            className="aspect-video object-cover transition-all duration-300 hover:brightness-125 h-[160px] max-w-[150px] md:max-w-[245px] rounded"
          />
        </CardHeader>
      </Link>
      <CardContent className="block h-full p-2">
        <div className="mb-2">
          <Link to={`/products/${product._id}`}>
            <p className="font-normal text-md md:text-xl capitalize">
              {product.name}
            </p>
          </Link>
        </div>
        <div>
          <div className="flex flex-row items-center justify-start gap-4 ">
            <Ratings rating={product?.ratings} disabled={true} size="md" />
            <span className="text-md text-gray-500">
              ({product?.numOfReviews})
            </span>
          </div>

          <div className="text-lg md:text-2xl font-medium mt-1  md:mt-4 text-left mb-3">
            {formatPrice(product.price)}
          </div>
          <div className="flex flex-row justify-start items-center gap-4">
            <Button
              color="default"
              variant="bordered"
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
      </CardContent>
    </Card>
  );
};

export default ProductCardList;
