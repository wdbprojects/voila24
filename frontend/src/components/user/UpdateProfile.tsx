import { useEffect } from "react";
import UserLayout from "../layout/UserLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [updateUser, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();
  const navigate = useNavigate();

  const { user } = useSelector((state: any) => {
    return state.auth;
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    },
  });

  const setCurrentValues = () => {
    for (const key in user) {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        setValue(key, user[key]);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof ProfileSchema>) => {
    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
    };
    try {
      const { data } = await updateUser(updateData);
      if (data) {
        toast.success(`User ${data?.user?.username} updated successfully`);
        console.log(isSuccess);

        navigate("/me/profile");
      }
      return;
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
      return;
    }
  };

  useEffect(() => {
    setCurrentValues();
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [user, error, isSuccess]);

  return (
    <UserLayout>
      <div className="my-4 sm:w-[26rem] max-w-[400px] mx-auto text-left border p-4 sm:p-8 rounded">
        <h2 className="mb-12 text-xl text-center font-semibold">
          Update Profile
        </h2>
        {/* EMAIL */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* FIRST NAME */}
            <div className="mb-10">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="md"
                      radius="sm"
                      variant="flat"
                      label="First Name"
                      {...field}
                      labelPlacement="outside"
                      value={field.value ?? ""}
                      autoComplete="off"
                      placeholder="Enter your first name"
                      errorMessage={
                        errors.firstName && errors.firstName.message
                      }
                    />
                  );
                }}
              />
            </div>
            {/* LAST NAME */}
            <div className="mb-10">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="md"
                      radius="sm"
                      variant="flat"
                      label="Last Name"
                      {...field}
                      labelPlacement="outside"
                      value={field.value ?? ""}
                      autoComplete="off"
                      placeholder="Enter your last name"
                      errorMessage={errors.lastName && errors.lastName.message}
                    />
                  );
                }}
              />
            </div>
            {/* USERNAME */}
            <div className="mb-10">
              <Controller
                name="username"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="md"
                      radius="sm"
                      variant="flat"
                      label="Username"
                      {...field}
                      labelPlacement="outside"
                      value={field.value ?? ""}
                      autoComplete="off"
                      placeholder="Enter your username"
                      errorMessage={errors.username && errors.username.message}
                    />
                  );
                }}
              />
            </div>
            {/* EMAIL */}
            <div className="mb-10">
              <Controller
                name="email"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="md"
                      radius="sm"
                      variant="flat"
                      label="Email"
                      {...field}
                      labelPlacement="outside"
                      value={field.value ?? ""}
                      autoComplete="off"
                      placeholder="Enter your email"
                      errorMessage={errors.email && errors.email.message}
                    />
                  );
                }}
              />
            </div>

            {/* BUTTON */}
            <div className="mb-8">
              <Button
                size="md"
                radius="sm"
                variant="shadow"
                type="submit"
                color="success"
                className="font-semibold"
                isLoading={isLoading ? true : false}
                isDisabled={isLoading ? true : false}
                fullWidth
              >
                {isLoading ? "Authenticating" : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;
