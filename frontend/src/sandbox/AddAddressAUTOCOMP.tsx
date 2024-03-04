import countries from "@/data/countries.json";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddAddressSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "z";
import { toast } from "sonner";

const AddAddress = () => {
  let countriesArray = [];
  for (const key in countries) {
    if (Object.prototype.hasOwnProperty.call(countries, key)) {
      countriesArray.push({ value: key, label: countries[key] });
    }
  }

  const onSubmit = async (data: z.infer<typeof AddAddressSchema>) => {
    console.log(data);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof AddAddressSchema>>({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      country: "",
    },
  });

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10">
          <Controller
            name="country"
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  {...field}
                  size="sm"
                  //defaultItems={countriesArray}
                  label="Select a country"
                  fullWidth
                  allowsCustomValue={true}
                  options={countriesArray}
                  defaultSelectedKey="US"
                  isClearable={true}
                  onChange={(value) => field.onChange(value)}
                >
                  {countriesArray.map((country) => {
                    return (
                      <AutocompleteItem
                        key={country.value}
                        value={country.value}
                      >
                        {country.label}
                      </AutocompleteItem>
                    );
                  })}
                </Autocomplete>
              );
            }}
          />
        </div>
        {/* BUTTON */}
        <div className="mb-4">
          <Button
            type="submit"
            variant="shadow"
            color="success"
            size="md"
            className="font-semibold"
            fullWidth
            // isLoading={isLoading ? true : false}
            // isDisabled={isLoading ? true : false}
          >
            Add address
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
