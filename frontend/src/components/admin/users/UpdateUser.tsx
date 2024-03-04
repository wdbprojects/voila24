import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import AdminLayout from "@/components/layout/AdminLayout";
import { Button, Image } from "@nextui-org/react";
import { productCategories, productSellers } from "@/data/productsData";
import {
  Form,
  FormControl,
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
import { toast } from "sonner";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";

const UpdateUser = () => {
  const navigate = useNavigate();
  const userId = useParams();
  const { data } = useGetUserByIdQuery(userId?.id);

  const userData = data?.user;

  const [updateUser, { isLoading, error, isSuccess }] = useUpdateUserMutation();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    role: "",
  };

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const setCurrentValues = () => {
    for (const key in userData) {
      if (Object.prototype.hasOwnProperty.call(userData, key)) {
        form.setValue(key, userData[key]);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    console.log(values);

    const dataForUpdate = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      role: values.role,
    };
    try {
      await updateUser({
        id: userId.id,
        body: dataForUpdate,
      });
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
    }
    return;
  };

  useEffect(() => {
    setCurrentValues();
  }, [userData, isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error?.data?.message}`);
    }
    if (isSuccess) {
      navigate("/admin/users");
      toast.success(
        `Successfully updated user: ${data?.user?.firstName} ${data?.user?.lastName}`,
      );
    }
  }, [error, isSuccess]);

  return (
    <AdminLayout>
      <div className="flex justify-center items-center w-full h-full">
        <div className="mt-4 w-[26rem] mx-auto text-left border p-4 sm:py-4 sm:px-8 rounded">
          <h3 className="mb-2 text-xl text-center font-semibold">
            Update User
          </h3>
          <div className="mb-4">
            <Image
              radius="sm"
              className="object-contain h-48 w-96"
              alt={`User: ${userData?.firstName} ${userData?.lastName}`}
              src={userData?.avatar?.url}
            />
          </div>
          {/* FORM */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                {/* FIRST NAME */}
                <div className="mb-0">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* LAST NAME */}
                <div className="mb-0">
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* EMAIL */}
                <div className="mb-0">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* USERNAME */}
                <div className="mb-0">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field} />
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
                    name="role"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
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
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
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
                    {isLoading ? "Saving data" : "Update User"}
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

export default UpdateUser;
