import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/utils/Misc";
import { Button as SCNButton } from "@/components/ui/button";

import countries from "@/data/countries.json";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

const AddAddress = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let countriesArray = [];
  for (const key in countries) {
    if (Object.prototype.hasOwnProperty.call(countries, key)) {
      countriesArray.push({ value: key, label: countries[key] });
    }
  }

  const FormSchema = z.object({
    country: z.string({
      required_error: "Please select a country.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <SCNButton
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? countriesArray.find((country) => {
                                return country.value === field.value;
                              })?.label
                            : "Select country"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </SCNButton>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search country..."
                          className="h-9"
                        />
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countriesArray.map((country) => {
                            return (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  return form.setValue(
                                    "country",
                                    country.value,
                                  );
                                }}
                              >
                                {country.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    country.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
        </form>
      </Form>
    </>
  );
};

export default AddAddress;
