import Quantity from "./Quantity";
import { Button, Divider } from "@nextui-org/react";

const AddToCart = ({ product, amount, setAmount, setItemsToCart }) => {
  return (
    <div>
      <div className="mb-6 block">
        <Quantity stock={product.stock} amount={amount} setAmount={setAmount} />
      </div>
      <Divider className="my-4" />
      <div className="flex flex-col gap-3 mb-4 mt-6">
        <Button
          radius="full"
          size="md"
          className="bg-[#ffd812] text-black shadow-lg font-semibold"
          onClick={() => {
            setItemsToCart();
          }}
        >
          Add to Cart
        </Button>
        <Button
          radius="full"
          size="md"
          className="bg-[#ffa41c] text-black shadow-lg font-semibold"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;
