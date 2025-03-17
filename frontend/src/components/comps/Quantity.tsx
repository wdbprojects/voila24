import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Quantity = ({ stock, amount, setAmount }) => {
  let stockArray = [];

  for (let i = 1; i <= stock; i++) {
    stockArray.push(i);
  }

  const handleQuantity = (value) => {
    setAmount(value);
  };

  return (
    <div>
      <Select onValueChange={handleQuantity} defaultValue={amount}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose quantity" />
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
      </Select>
    </div>
  );
};

export default Quantity;
