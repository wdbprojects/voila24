import { useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddAddressSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "z";
import { toast } from "sonner";
import { countries as countriesAPI } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "@/redux/features/checkoutSlice";

const AddAddress = ({ onClose }) => {
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => {
    return state.checkout;
  });

  const countriesList = Object.entries(countriesAPI);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof AddAddressSchema>>({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      country: "BO",
      fullName: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      city: "",
    },
  });

  const setCurrentValues = () => {
    for (const key in shippingInfo) {
      if (Object.prototype.hasOwnProperty.call(shippingInfo, key)) {
        setValue(key, shippingInfo[key]);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof AddAddressSchema>) => {
    try {
      if (data) {
        const countryName = await countriesList.filter((item) => {
          return data.country === item[0];
        });
        dispatch(
          saveShippingInfo({ ...data, countryName: countryName[0][1].name }),
        );
        toast.success("Shipping info updated");
        onClose();
      }
      return;
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
      return;
    }
  };

  useEffect(() => {
    setCurrentValues();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* COUNTRIES */}
        <div className="mb-4">
          <label
            id="country"
            className="text-xs dark:text-neutral-300 ml-[5px] mb-1 block"
          >
            Country/Region
          </label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  size="sm"
                  id="country"
                  aria-label="country"
                  defaultSelectedKeys={["BO"]}
                  variant="flat"
                  {...field}
                  fullWidth
                  //label="Country"
                  placeholder="Choose a country"
                  labelPlacement="outside"
                  errorMessage={errors.country && errors.country.message}
                >
                  {countriesList.map((country) => {
                    return (
                      <SelectItem key={country[0]} value={country[0]}>
                        {country[1].name}
                      </SelectItem>
                    );
                  })}
                </Select>
              );
            }}
          />
        </div>
        {/* FULL NAME */}
        <div className="mb-4">
          <label
            id="fullName"
            className="text-xs dark:text-neutral-300 ml-[5px] mb-1 block"
          >
            Full name (First and Last name)
          </label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  //label="Full name"
                  //placeholder="First and last name"
                  labelPlacement="outside"
                  id="fullName"
                  aria-label="fullName"
                  {...field}
                  size="sm"
                  radius="sm"
                  variant="flat"
                  value={field.value ?? ""}
                  autoComplete="off"
                  errorMessage={errors.fullName && errors.fullName.message}
                />
              );
            }}
          />
        </div>
        {/* PHONE NUMBER */}
        <div className="mb-4">
          <label
            id="phoneNumber"
            className="text-xs dark:text-neutral-300 ml-[5px] mb-1 block"
          >
            Phone number
          </label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  //label="Phone number"
                  //placeholder="Enter your phone number"
                  labelPlacement="outside"
                  id="phoneNumber"
                  aria-label="phoneNumber"
                  {...field}
                  size="sm"
                  radius="sm"
                  variant="flat"
                  value={field.value ?? ""}
                  autoComplete="off"
                  errorMessage={
                    errors.phoneNumber && errors.phoneNumber.message
                  }
                />
              );
            }}
          />
        </div>
        {/* Address 1 */}
        <div id="address1" className="mb-1">
          <label className="text-xs dark:text-neutral-300 ml-[5px] mb-1 block">
            Address
          </label>
          <Controller
            name="address1"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  //label="Address 1"
                  id="address1"
                  aria-label="address1"
                  placeholder="Street address or P.O. Box"
                  labelPlacement="outside"
                  {...field}
                  size="sm"
                  radius="sm"
                  variant="flat"
                  value={field.value ?? ""}
                  autoComplete="off"
                  errorMessage={errors.address1 && errors.address1.message}
                />
              );
            }}
          />
        </div>
        {/* Address 2 */}
        <div className="mb-4">
          <Controller
            name="address2"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  //label="Phone number"
                  placeholder="Apt, suite, unit, building, floor, etc."
                  labelPlacement="outside"
                  {...field}
                  size="sm"
                  aria-label="address2"
                  radius="sm"
                  variant="flat"
                  value={field.value ?? ""}
                  autoComplete="off"
                  errorMessage={errors.address2 && errors.address2.message}
                />
              );
            }}
          />
        </div>
        {/* CITY */}
        <div className="mb-4">
          <label
            id="city"
            className="text-xs dark:text-neutral-300 ml-[5px] mb-1 block"
          >
            City
          </label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  id="city"
                  aria-label="city"
                  //label="Phone number"
                  //placeholder="Enter your phone number"
                  labelPlacement="outside"
                  {...field}
                  size="sm"
                  radius="sm"
                  variant="flat"
                  value={field.value ?? ""}
                  autoComplete="off"
                  errorMessage={errors.city && errors.city.message}
                />
              );
            }}
          />
        </div>
        {/* BUTTON */}
        <div className="mb-4 mt-8 flex justify-between items-center gap-4">
          <Button
            type="button"
            variant="shadow"
            color="default"
            size="sm"
            className="font-semibold"
            fullWidth
            onPress={onClose}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="shadow"
            color="primary"
            size="sm"
            className="font-semibold text-neutral-900"
            fullWidth
            isLoading={isSubmitting ? true : false}
            isDisabled={isSubmitting ? true : false}
            //onPress={errors ? false : onClose}
          >
            Add/Edit address
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
