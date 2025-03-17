import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
/* RTK */
import { useResetPasswordMutation } from "@/redux/api/userApi";
import { useSelector } from "react-redux";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();
  const navigate = useNavigate();
  const params = useParams();

  const { isAuthenticated } = useSelector((state) => {
    return state.auth;
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(`Error: ${error?.data?.message}`);
    }
    if (isSuccess) {
      toast.success("Password reset successfully");
    }
  }, [error, isAuthenticated, isSuccess]);

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    const resetPasswordData = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    try {
      await resetPassword({ token: params?.token, body: resetPasswordData });
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
      return;
    }
  };

  useEffect(() => {
    if (password && confirmPassword && password === confirmPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, setPassword, confirmPassword, setConfirmPassword]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="mt-8 w-[26rem] mx-auto text-left border p-4 sm:p-8 rounded">
        <h2 className="mb-12 text-xl text-center font-semibold">
          Reset Password
        </h2>
        {/* EMAIL */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* PASSWORD */}
            <div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label="Password"
                      {...field}
                      type="password"
                      variant="flat"
                      labelPlacement="outside"
                      autoComplete="off"
                      placeholder="Enter your new password"
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        setPassword(event.target.value);
                      }}
                      value={field.value}
                      errorMessage={errors.password && errors.password.message}
                    />
                  );
                }}
              />
            </div>
            {/* CONFIRM PASSWORD */}
            <div className="mt-12">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      type="password"
                      label="Confirm Password"
                      {...field}
                      variant="flat"
                      labelPlacement="outside"
                      autoComplete="off"
                      placeholder="Confirm your new password"
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        setConfirmPassword(event.target.value);
                      }}
                      value={field.value}
                      description="Submit button will be disabled until both passwords are exactly the same."
                      errorMessage={
                        errors.confirmPassword && errors.confirmPassword.message
                      }
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
                isDisabled={buttonDisabled}
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

export default PasswordReset;
