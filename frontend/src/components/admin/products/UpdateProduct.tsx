import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@nextui-org/react";
import { productCategories, productSellers } from "@/data/productsData";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from "@/redux/api/productsApi";
import { toast } from "sonner";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const productId = useParams();

  const { data } = useGetProductByIdQuery(productId?.id);

  const productData = data?.product;

  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();

  const defaultValues = {
    name: "",
    description: "",
    category: "",
    seller: "",
    price: "",
    stock: 0,
  };

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const setCurrentValues = () => {
    for (const key in productData) {
      if (Object.prototype.hasOwnProperty.call(productData, key)) {
        form.setValue(key, productData[key]);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    const dataForUpdate = {
      name: values.name,
      description: values.description,
      category: values.category,
      seller: values.seller,
      price: values.price,
      stock: values.stock,
    };
    try {
      const { data } = await updateProduct({
        id: productId.id,
        body: dataForUpdate,
      });

      if (data) {
        // toast.success(`Successfully updated product: ${data?.product?.name}`);
        form.reset();
      }
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
    }
    return;
  };

  useEffect(() => {
    setCurrentValues();
  }, [productData, isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error?.data?.message}`);
    }
    if (isSuccess) {
      navigate("/admin/products");
      toast.success(`Successfully updated product: ${data?.product?.name}`);
    }
  }, [error, isSuccess]);

  return (
    <AdminLayout>
      <div className="flex justify-center items-center w-full h-full">
        <div className="mt-4 w-[26rem] mx-auto text-left border p-4 sm:py-4 sm:px-8 rounded">
          <h3 className="mb-8 text-xl text-center font-semibold">
            Update Product
          </h3>
          {/* FORM */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                {/* NAME */}
                <div className="mb-0">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Product's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-0">
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="No more than 400 characters"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* CATEGORY */}
                <div className="mb-8 block">
                  <FormField
                    name="category"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="dark:text-neutral-200 placeholder:text-default-300">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {productCategories.map((cat) => {
                                return (
                                  <SelectItem value={cat.value} key={cat.value}>
                                    {cat.label}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* SELLER */}
                <div className="mb-8 block">
                  <FormField
                    name="seller"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Seller</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="dark:text-neutral-200 placeholder:text-default-300">
                                <SelectValue placeholder="Select a verified seller" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {productSellers.map((seller) => {
                                return (
                                  <SelectItem
                                    value={seller.value}
                                    key={seller.value}
                                  >
                                    {seller.label}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* PRICE */}
                <div className="mb-0">
                  <FormField
                    name="price"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Price in USD ($)"
                              type="number"
                              {...field}
                              onChange={(event) => {
                                field.onChange(
                                  event.target.value
                                    ? event.target.valueAsNumber
                                    : "",
                                );
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Value must be an integer with 2 decimals - do not
                            include a dot
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* STOCK */}
                <div className="mb-0">
                  <FormField
                    name="stock"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the product's price"
                              type="number"
                              {...field}
                              onChange={(event) => {
                                field.onChange(
                                  event.target.value
                                    ? event.target.valueAsNumber
                                    : "",
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* BUTTONS */}
                <div className="!mt-[2rem] mb-4 flex justify-between gap-4 ">
                  <Button
                    variant="flat"
                    className="w-full"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Clear form
                  </Button>
                  <Button
                    type="submit"
                    variant="shadow"
                    color="warning"
                    size="md"
                    className="font-semibold w-full"
                    isLoading={isLoading ? true : false}
                    isDisabled={isLoading ? true : false}
                  >
                    {isLoading ? "Saving data" : "Update Product"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
