import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import AdminLayout from "@/components/layout/AdminLayout";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { productCategories, productSellers } from "@/data/productsData";

const NewProduct = () => {
  const navigate = useNavigate();
  const defaultValues = {
    name: "",
    description: "",
    category: "",
    seller: "",
    price: 0,
    stock: 30,
  };

  const {
    handleSubmit,
    reset,
    resetField,
    setValue,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    console.log(data);
    // resetField("name");
    // resetField("description");
    // resetField("price");
    // resetField("stock");
    reset();
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center w-full h-full">
        <div className="mt-4 w-[26rem] mx-auto text-left border p-4 sm:py-4 sm:px-8 rounded">
          <h3 className="mb-8 text-xl text-center font-semibold">
            Add a product
          </h3>
          {/* FORM */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* NAME */}
              <div className="mb-3">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        label="Name"
                        {...field}
                        size="md"
                        radius="sm"
                        variant="flat"
                        labelPlacement="outside"
                        autoComplete="off"
                        placeholder="Enter the product name"
                        errorMessage={errors.name && errors.name.message}
                      />
                    );
                  }}
                />
              </div>
              {/* DESCRIPTION */}
              <div className="mb-10">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea
                        label="Description"
                        {...field}
                        size="md"
                        radius="sm"
                        variant="flat"
                        labelPlacement="outside"
                        autoComplete="off"
                        placeholder="Enter the product description"
                        errorMessage={
                          errors.description && errors.description.message
                        }
                      />
                    );
                  }}
                />
              </div>
              {/* CATEGORY */}
              <div className="mb-10">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        size="md"
                        {...field}
                        selectedKeys={field.value}
                        onSelectionChange={() => {
                          return field.onChange;
                        }}
                        radius="sm"
                        variant="flat"
                        label="Select a category"
                        labelPlacement="outside"
                        placeholder="Enter the product's category"
                      >
                        {productCategories?.map((cat) => {
                          return (
                            <SelectItem
                              key={cat.value}
                              value={field?.value || cat.value}
                            >
                              {cat.label}
                            </SelectItem>
                          );
                        })}
                      </Select>
                    );
                  }}
                />
              </div>
              {/* SELLERS */}
              <div className="mb-10">
                <Controller
                  name="seller"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        size="md"
                        {...field}
                        radius="sm"
                        variant="flat"
                        label="Select a seller"
                        labelPlacement="outside"
                        placeholder="Enter the product's seller"
                      >
                        {productSellers?.map((seller) => {
                          return (
                            <SelectItem key={seller.value} value={seller.value}>
                              {seller.label}
                            </SelectItem>
                          );
                        })}
                      </Select>
                    );
                  }}
                />
              </div>
              {/* PRICE */}
              <div className="mb-10">
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        type="number"
                        label="Price"
                        {...field}
                        size="md"
                        radius="sm"
                        variant="flat"
                        labelPlacement="outside"
                        autoComplete="off"
                        placeholder="Enter the product's price"
                        onChange={(event) => {
                          field.onChange(
                            event.target.value
                              ? event.target.valueAsNumber
                              : "",
                          );
                        }}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        errorMessage={errors.price && errors.price.message}
                        description="Always add two decimals without dot or comma, even if it is 00"
                      />
                    );
                  }}
                />
              </div>
              {/* STOCK */}
              <div className="mb-10">
                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        type="number"
                        label="Stock"
                        {...field}
                        size="md"
                        radius="sm"
                        variant="flat"
                        labelPlacement="outside"
                        autoComplete="off"
                        placeholder="Enter the current stock"
                        onChange={(event) => {
                          field.onChange(
                            event.target.value
                              ? event.target.valueAsNumber
                              : "",
                          );
                        }}
                        errorMessage={errors.stock && errors.stock.message}
                      />
                    );
                  }}
                />
              </div>

              {/* BUTTONS */}
              <div className="mb-4 flex justify-between gap-4">
                <Button
                  variant="flat"
                  className="w-full"
                  onClick={() => {
                    reset({ category: "" });
                  }}
                >
                  Clear form
                </Button>
                <Button
                  type="submit"
                  variant="shadow"
                  color="success"
                  size="md"
                  className="font-semibold w-full"
                  // isLoading={isLoading ? true : false}
                  // isDisabled={isLoading ? true : false}
                >
                  {/* {isLoading ? "Saving data" : "Create Product"} */}
                  Create product
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;

/*
name, description, price, category, stock, seller,

*/
