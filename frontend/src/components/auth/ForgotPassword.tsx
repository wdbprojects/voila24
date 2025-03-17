import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
/* RTK */
import { useForgotPasswordMutation } from "@/redux/api/userApi";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => {
    return state.auth;
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(`Error: ${error?.data?.message}`);
    }
    if (isSuccess) {
      toast.success("Email sent. Please check your inbox.");
    }
  }, [error, isAuthenticated, isSuccess]);

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    const forgotPasswordData = { email: data.email };
    try {
      await forgotPassword(forgotPasswordData);
      reset();
      return;
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="mt-8 w-[26rem] mx-auto text-left border p-4 sm:p-8 rounded">
        <h2 className="mb-12 text-xl text-center font-semibold">
          Forgot Password
        </h2>
        {/* EMAIL */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label="Email"
                      {...field}
                      variant="flat"
                      labelPlacement="outside"
                      autoComplete="off"
                      placeholder="Enter your email"
                      description="You will receive a link. Please check your email inbox or spam."
                      errorMessage={errors.email && errors.email.message}
                    />
                  );
                }}
              />
            </div>

            {/* BUTTON */}
            <div className="mt-8">
              <Button
                type="submit"
                variant="shadow"
                color="success"
                size="md"
                className="font-semibold"
                isLoading={isLoading ? true : false}
                isDisabled={isLoading ? true : false}
                fullWidth
              >
                {isLoading ? "Resetting Password" : "Reset Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
