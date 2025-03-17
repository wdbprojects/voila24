import { Radio, cn } from "@nextui-org/react";

const CustomRadio = ({ children, ...otherProps }) => {
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-neutral-800 hover:bg-neutral-600 items-center justify-between",
          "flex-row-reverse max-w-[400px] cursor-pointer rounded-lg gap-4 p-2 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default CustomRadio;
