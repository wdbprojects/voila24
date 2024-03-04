import { formatPrice } from "@/utils/Misc";
import { Divider, Image } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CheckoutItems = () => {
  const { cartItems } = useSelector((state) => {
    return state.cartState;
  });

  return (
    <>
      {cartItems.map((item) => {
        return (
          <div
            key={item.productId}
            className="grid grid-cols-12 items-center gap-2 border rounded-sm my-1 px-3 py-2"
          >
            {/* ITEMS IMAGE */}
            <div className="col-span-3">
              <Image
                src={item.image}
                alt={item.name}
                className="object-cover w-[120px] h-auto"
              />
            </div>
            {/* ITEMS INFO */}
            <div className="col-span-7 pb-0">
              <Link to={`/products/${item.id}`}>
                <h3 className="text-base font-medium leading-5 mb-0">
                  {item.name}
                </h3>
              </Link>
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

              <div className="flex items-center flex-start h-5 gap-4 mb-0 pb-0">
                {item.price && (
                  <div className="mt-0 text-sm text-neutral-900 dark:text-neutral-300 mb-0">
                    Unit Price:{" "}
                    <span className="mb-0 font-semibold">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                )}
                <Divider orientation="vertical" />
                {item.amount && (
                  <div className="mt-0 text-sm text-neutral-900 dark:text-neutral-300 mb-0">
                    Quantity:{" "}
                    <span className="mb-0 font-semibold">{item.amount}</span>
                  </div>
                )}
              </div>

              <div className="text-base font-semibold text-black dark:text-white">
                {formatPrice(item.price * item.amount)}
              </div>
            </div>
            {/* SHIPPING */}
            <div className="col-span-2 self-start">
              <h4 className="text-center">Shipping Info</h4>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CheckoutItems;
