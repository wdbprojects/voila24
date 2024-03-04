import { useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { ListRestart, Search } from "lucide-react";
/* REDUX TOOLKIT */
import { useDispatch } from "react-redux";
import { setTerm } from "@/redux/features/miscSlice";

const SearchBar = () => {
  let [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const ref = useRef();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword?.trim()) {
      navigate(`/products/?keyword=${keyword}`);
      ref.current.reset();
    } else {
      navigate("/");
    }
  };

  <ListRestart />;

  return (
    <div className="hidden max-w-[600px] md:flex justify-center px-8 mx-auto mt-[-3px]">
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="flex w-full justify-center items-center gap-2"
      >
        <Input
          type="text"
          isClearable
          color="default"
          variant="underlined"
          fullWidth
          size="sm"
          radius="sm"
          placeholder={"Enter Product Name..."}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
          startContent={
            <Search className="text-sm h-4 w-4 dark:text-white/30 pointer-events-none flex-shrink-0" />
          }
          classNames={{
            label: "dark:text-white/90",
            input: "dark:caret-gray-50",
            innerWrapper: "",
            inputWrapper: ["dark:bg-transparent"],
          }}
        />
        <Button
          color="default"
          type="submit"
          variant="solid"
          size="md"
          radius="sm"
          onClick={() => {
            dispatch(setTerm(keyword));
          }}
        >
          Search
        </Button>
        <Tooltip
          placement="bottom-start"
          content="Reset Search"
          color="default"
        >
          <Button
            isIconOnly
            type="submit"
            color="default"
            variant="solid"
            aria-label="Reset search values"
            onClick={() => {
              searchParams.delete("keyword");
            }}
          >
            <Link to="/products">
              <ListRestart
                className="dark:text-gray-200 text-gray-700"
                size={20}
                strokeWidth={1.5}
              />
            </Link>
          </Button>
        </Tooltip>
      </form>
    </div>
  );
};
<ListRestart />;
export default SearchBar;

/* inputWrapper"｜ "innerWrapper"｜ "mainWrapper" ｜ "input" ｜ "clearButton" ｜ "helperWrapper" ｜ "description" ｜ "errorMessage", */
