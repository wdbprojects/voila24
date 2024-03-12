import { Link } from "react-router-dom";
import Loader from "@/components/comps/Loader";
import { Button, Checkbox, Divider, Image } from "@nextui-org/react";
import { Button as SCNButton } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { formatPrice } from "@/utils/Misc";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { generateAmountOptions } from "@/utils/helpers";
import { useDispatch } from "react-redux";
import { editItem, clearCart, removeItem } from "@/redux/features/cartSlice";

const Cart = () => {
  const { cartItems, numItemsInCart, cartTotal } = useSelector((state) => {
    return state.cartState;
  });

  const dispatch = useDispatch();

  if (false) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  const handleQuantity = (value, cartID) => {
    dispatch(editItem({ value: value, cartID: cartID }));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleDeleteItem = (cartID) => {
    dispatch(removeItem(cartID));
  };

  return (
    <div className="container mt-8 px-2 sm:px-4">
      {/* INNER CONTAINER */}
      <div className="grid grid-cols-12 gap-4">
        {/* CART ITEM */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-zinc-950 rounded-sm sm:pl-4 sm:pr-6 pt-2 sm:pt-4 pb-8">
          {/* CART HEADER */}
          <div className="flex flex-col justify-between px-2 sm:px-4">
            {cartItems.length === 0 && (
              <h2 className="text-2xl font-semibold">
                Your Voila! Cart is empty.{" "}
              </h2>
            )}
            {cartItems.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold">Shopping Cart</h2>
              </>
            )}
            <div className="flex justify-between items-center">
              <p className="text-sm dark:text-neutral-400">
                <span className="font-semibold">{numItemsInCart}</span> products
                currently in your cart
              </p>
              <span className="hidden xs:block text-sm text-right font-medium">
                Price
              </span>
            </div>
          </div>
          <Divider className="mb-4 mt-2" />
          {/* CART CONTENT */}
          {cartItems.map((item) => {
            let stockArray = generateAmountOptions(item.stock);
            return (
              <div key={item.productId} className="block">
                <div className="grid grid-cols-12 gap-4 rounded-sm my-4 px-2 sm:px-4 pb-2 h-auto">
                  {/* IMAGE */}
                  <Link
                    to={`/products/${item.id}`}
                    className="block order-1 col-span-12 xs:col-span-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="block object-cover h-32 w-[95%] xs:w-[100%] border"
                    />
                  </Link>

                  {/* CONTENT */}
                  <div className="order-3 xs:order-2 col-span-12 xs:col-span-6 sm:col-span-6 pb-0">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="text-lg font-medium leading-5 mb-0">
                        {item.name}
                      </h3>
                    </Link>
                    {item.stock >= 5 ? (
                      <span className="text-sm text-green-600 font-medium mt-0">
                        In stock
                      </span>
                    ) : (
                      <span className="text-sm text-orange-700 font-medium">
                        Only 5 left in stock - order soon
                      </span>
                    )}
                    <div className="flex items-center flex-start h-5 gap-0 sm:gap-4 mb-0 pb-0">
                      {item.price && (
                        <div className="mt-0 text-sm text-neutral-900 dark:text-neutral-300 mb-0 mr-[4px]">
                          Unit Price:{" "}
                          <span className="mb-0 font-semibold">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      )}
                      <Divider orientation="vertical" />
                      {item.amount && (
                        <div className="mt-0 ml-[4px] text-sm text-neutral-900 dark:text-neutral-300 mb-0">
                          Quantity:{" "}
                          <span className="mb-0 font-semibold">
                            {item.amount}
                          </span>
                        </div>
                      )}
                    </div>
                    {item.seller === "to be determined" ? (
                      <span className="text-xs italic dark:text-neutral-500 mt-0 mb-0">
                        Eligible for FREE Shipping
                      </span>
                    ) : (
                      <span className="text-xs italic dark:text-neutral-500 mt-0">
                        Shipping from : Voila! warehouse
                      </span>
                    )}
                    {item.color && (
                      <div className="mt-0 text-sm flex items-center gap-2">
                        <span>Color:</span>
                        <span
                          className={`rounded h-3 w-4 inline-block mt-[3px] bg-[${item?.color}]`}
                          style={{ backgroundColor: item?.color }}
                        ></span>
                      </div>
                    )}
                    {/* CREATE ARRAY FROM */}
                    <div className="mt-4 h-5 flex flex-wrap items-center justify-start gap-4">
                      <div className="min-w-[100px]">
                        <Select
                          onValueChange={(value) => {
                            return handleQuantity(value, item.productId);
                          }}
                          defaultValue={item.amount}
                        >
                          <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Change quantity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {stockArray.map((item) => {
                                return (
                                  <SelectItem key={item} value={item}>
                                    <span className="text-xs">QTY:</span>&nbsp;
                                    <span className="font-semibold">
                                      {item}
                                    </span>
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="text-xs sm:leading-4">
                        <Button
                          variant="light"
                          className="text-xs text-red-800 font-medium"
                          size="sm"
                          disableRipple
                          onClick={() => {
                            handleDeleteItem(item.productId);
                          }}
                        >
                          Delete
                        </Button>
                      </div>

                      <div className="text-xs leading-4">
                        <Link to="">Save</Link>
                      </div>

                      {/* <div className="text-xs leading-4">
                        <Link to="">Compare</Link>
                      </div> */}
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="order-2 xs:order-3 col-span-12 xs:col-span-2 sm:col-span-2 text-left xs:text-right text-lg font-bold">
                    <span className="xs:hidden">Price: </span>
                    {formatPrice(item.price * item.amount)}
                  </div>
                </div>
                <Divider className="mb-4 mt-2" />
              </div>
            );
          })}

          <div className="text-right">
            <h4 className="text-lg tracking-wide hidden lg:block px-2">
              Subtotal ({numItemsInCart} items):{" "}
              <span className="font-semibold">{formatPrice(cartTotal)}</span>
            </h4>
          </div>
        </div>
        {/* COMPLETE PURCHASE */}
        <div className="col-span-12 lg:col-span-4 flex justify-end">
          <div className="bg-white dark:bg-zinc-950 py-4 rounded w-full xs:w-[75%] sm:w-[50%] lg:w-full">
            <div className="text-right px-8 mt-2 mr-[5px]">
              <h4 className="text-lg tracking-wide">
                Subtotal ({numItemsInCart} items):{" "}
                <span className="font-semibold">{formatPrice(cartTotal)}</span>
              </h4>
            </div>
            <div className="py-4 px-8">
              <Link to="/checkout">
                <SCNButton
                  className="text-neutral-900 text-sm font-medium w-full"
                  variant="default"
                  color="primary"
                  size="sm"
                >
                  Proceed to checkout
                </SCNButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
