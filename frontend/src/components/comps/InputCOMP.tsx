import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const InputCOMP = () => {
  return (
    <div className="relative flex items-center w-full px-10 max-w-3xl gap-2 leading-none">
      <Search className="w-5 h-5 absolute left-12 text-amber-500" />
      <Input
        type="text"
        placeholder={"Search ShopIT"}
        className={`w-full block pl-9`}
      />
    </div>
  );
};
export default InputCOMP;
