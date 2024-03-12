import { useEffect } from "react";
import UserLayout from "../layout/UserLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
import { useUpdatePasswordMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    const updateData = {
      oldPassword: data.oldPassword,
      password: data.password,
    };
    try {
      const { data } = await updatePassword(updateData);
      if (data) {
        toast.success(`Password updated successfully`);
        navigate("/me/profile");
      }
      return;
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <UserLayout>
      <div className="my-4 sm:w-[26rem] max-w-[400px] mx-auto text-left border p-4 sm:p-8 rounded">
        <h2 className="mb-12 text-xl text-center font-semibold">
          Update Password
        </h2>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* CURRENT PASSWORD */}
            <div className="mb-10">
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="md"
                      type="password"
                      radius="sm"
                      variant="flat"
                      label="Current Password"
                      {...field}
                      labelPlacement="outside"
                      autoComplete="off"
                      placeholder="Enter your current password"
                      errorMessage={
                        errors.oldPassword && errors.oldPassword.message
                      }
                    />
                  );
                }}
              />
            </div>
            {/* NEW PASSWORD */}
            <div className="mb-8">
              <Controller
                name="password"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="md"
                      type="password"
                      radius="sm"
                      variant="flat"
                      label="New Password"
                      {...field}
                      labelPlacement="outside"
                      autoComplete="off"
                      placeholder="Enter your new password"
                      errorMessage={errors.password && errors.password.message}
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
                {isLoading ? "Authenticating" : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
