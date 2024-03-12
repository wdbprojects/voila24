import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/redux/api/productsApi";
import AddToCart from "@/components/comps/AddToCart";
import BreadcrumbsComp from "@/components/comps/BreadcrumbsComp";
import ProductImages from "@/components/comps/ProductImages";
import { Divider } from "@nextui-org/react";
import { toast } from "sonner";
import Loader from "@/components/comps/Loader";
import Ratings from "@/components/comps/Ratings";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import ColorsComp from "@/components/comps/ColorsComp";
import { formatPrice } from "@/utils/Misc";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/features/cartSlice";

const ProductDetails = () => {
  const params = useParams();
  const { data, isLoading, error, isError, isSuccess } =
    useGetProductDetailsQuery(params?.id);
  const [isOpen, setIsOpen] = useState(false);
  const [colorChosen, setColorChosen] = useState("");
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const product = data?.product;
  const realPrice = product?.price * 1.15;

  const setItemsToCart = () => {
    const cartProduct = {
      //cartID: `${product?._id}${colorChosen}`,
      productId: product?._id,
      cartId: `${product?._id}${colorChosen}`,
      color: colorChosen,
      image: product?.images[0]?.url,
      price: product?.price,
      seller: product?.seller,
      amount: amount,
      name: product?.name,
      stock: product?.stock,
    };
    dispatch(addItem(cartProduct));
  };

  useEffect(() => {
    setColorChosen(data?.product?.colors[0]);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container px-1 sm:p-2 lg:p-4 pb-4">
      <BreadcrumbsComp />
      {/* INNER CONTAINER */}
      <div className="lg:border grid grid-cols-12 justify-between p-2 sm:p-4 gap-6">
        {/* LEFT COLUMN */}
        <div className="sm:order-1 col-span-12 sm:col-span-7 lg:col-span-5 w-full h-full">
          <ProductImages images={product.images} name={product.name} />
        </div>
        {/* CENTER COLUMN */}
        <div className="border sm:order-3 lg:order-2 col-span-12 sm:col-span-12 lg:col-span-4 w-full p-2">
          {/* HEADER & TITLE */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <h3 className="leading-6 mb-2 tracking-wide">
              {product.description && product.description.substring(0, 100)} ...
            </h3>
          </div>
          {/* RATINGS */}
          <div className="flex justify-start gap-4 items-start">
            <Ratings rating={product?.ratings} disabled={true} size="sm" />
            <span className="text-md text-gray-800 dark:text-gray-400">
              (
              {product?.numOfReviews === 1
                ? `${product?.numOfReviews} review`
                : `${product?.numOfReviews} reviews`}
              )
            </span>
          </div>
          <Divider className="my-4" />
          {/* PRICE */}
          <div className="mb-2">
            <span className="text-3xl text-[#b91c1c] font-light mr-3 tracking-tight">
              -15%
            </span>
            <span className="text-3xl font-bold mb-1">
              {formatPrice(product.price)}
            </span>
            <div className="text-xs font-extrabold text-zinc-700 dark:text-zinc-400 mt-1">
              List Price:{" "}
              <span className="line-through">{formatPrice(realPrice)}</span>
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="px-0 pr-1 mx-0 border mb-2 mt-4 bg-white dark:bg-neutral-900 rounded w-full transition-all">
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-2 transition"
            >
              <div className="w-full flex items-center justify-between">
                <h3 className="px-2 py-1 text-lg font-semibold">Description</h3>
                <CollapsibleTrigger className="flex justify-end items-center hover:bg-black/10 dark:hover:bg-black/40 px-2 py-1 rounded transition-all">
                  <span className="mr-2 dark:text-zinc-400 text-sm">
                    {isOpen ? "Close" : "Open"}
                  </span>
                  <CaretSortIcon className="h-4 w-4 dark:text-zinc-400" />
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="px-2 pb-2">
                <p className="text-sm">{product.description}</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="text-xs">
            <ColorsComp setColorChosen={setColorChosen} />
          </div>
          <div className="text-xs">Toggle options go here!</div>
          <Divider className="my-4" />
          <div className="productDetails">
            <h3 className="font-bold text-xl mb-2">Product Details</h3>
            <ul className="text-sm">
              <li className="grid grid-cols-[125px_1fr] mb-1">
                <span className="font-bold">Seller:</span> {product?.seller}
              </li>
              <li className="grid grid-cols-[125px_1fr]  mb-1">
                <span className="font-bold">Category:</span> {product?.category}
              </li>
              <li className="grid grid-cols-[125px_1fr]  mb-1">
                <span className="font-bold">Dimensions:</span> 59"D x 47"W x
                29"H
              </li>
              <li className="grid grid-cols-[125px_1fr] mb-1">
                <span className="font-bold">SKU:</span> {product?._id}
              </li>
            </ul>
          </div>
        </div>
        {/* RIGHT COLUMN */}
        <div className="border sm:order-2 lg:order-3 col-span-12 sm:col-span-5 lg:col-span-3 w-full px-4 py-2">
          <div className="price">
            <span className="text-3xl font-bold">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="text-xs">Returns</div>
          <Divider className="my-2" />
          <div className="mb-4">
            {product.stock <= 3 && product.stock > 0 ? (
              <p className="text-[#b45309] dark:text-[#d97706] text-[18px] font-medium mb-2">
                Only {product.stock} in stock
              </p>
            ) : product.stock < 1 ? (
              <p className="text-[#b91c1c] dark:text-[#b91c1c] text-md tracking-tight font-medium mb-2">
                <span>Currently unavailable.</span> We don't know when or if
                this item will be back in stock.
              </p>
            ) : (
              <p className="text-[#047857] dark:text-[#34d399] text-[18px] font-medium mb-2">
                In stock!
              </p>
            )}
          </div>

          {product?.stock > 0 && (
            <div className="mb-4">
              <AddToCart
                product={product}
                amount={amount}
                setAmount={setAmount}
                setItemsToCart={setItemsToCart}
              />
            </div>
          )}

          <div className="secure text-xs">
            lock icon + <span className="text-xs">Secure transaction</span>
          </div>

          <div className="return">
            <span className="text-xs">Return policy: </span>
          </div>

          <div className="support">
            <span className="text-xs">Support: </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
