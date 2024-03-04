import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateAmountOptions } from "@/utils/helpers";

const CartQuantity = ({ stock, amount }) => {
  let stockArray = [];

  for (let i = 1; i <= stock; i++) {
    stockArray.push(i);
  }

  console.log(generateAmountOptions(stock));

  const handleQuantity = (value) => {
    setAmount(value);
  };

  return (
    <div className="min-w-[200px]">
      {/* <Select onValueChange={handleQuantity} defaultValue={amount}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Change quantity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {stockArray.map((item) => {
              return (
                <SelectItem key={item} value={item}>
                  <span className="text-xs">QTY:</span>&nbsp;
                  <span className="font-semibold">{item}</span>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select> */}
    </div>
  );
};

export default CartQuantity;
