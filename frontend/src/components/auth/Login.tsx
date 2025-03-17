import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button as LinkButton } from "@/components/ui/button";
import { Button, Input } from "@nextui-org/react";
/* RTK */
import { useLoginMutation } from "@/redux/api/authApi";
import { useSelector } from "react-redux";

const Login = () => {
  const [login, { isLoading, error, data }] = useLoginMutation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => {
    return state.auth;
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(`Error: ${error?.data?.message}`);
    }
  }, [error, isAuthenticated]);

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const loginData = { email: data.email, password: data.password };
    //login(loginData);
    try {
      const { data } = await login(loginData);
      if (data) {
        toast.success(`User ${data?.user?.username} logged in successfully`);
        reset();
      }
      return;
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center w-[90%] mx-auto sm:w-full h-full">
      <div className="mt-8 w-[26rem] mx-auto text-left border p-4 sm:p-8 rounded">
        <h2 className="mb-12 text-xl text-center font-semibold">Login</h2>
        {/* EMAIL */}
        <div className="px-4 sm:px-0">
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
                      labelPlacement="outside"
                      value={field.value ?? ""}
                      size="md"
                      radius="sm"
                      variant="flat"
                      autoComplete="off"
                      placeholder="Enter your email"
                      errorMessage={errors.email && errors.email.message}
                    />
                  );
                }}
              />
            </div>
            {/* PASSWORD */}
            <div className="mt-10">
              <Controller
                name="password"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      label="Password"
                      type="password"
                      {...field}
                      size="md"
                      radius="sm"
                      variant="flat"
                      labelPlacement="outside"
                      value={field.value ?? ""}
                      autoComplete="off"
                      placeholder="Enter your password"
                      errorMessage={errors.password && errors.password.message}
                    />
                  );
                }}
              />
              <div className="flex justify-end mt-2">
                <LinkButton
                  variant="link"
                  className="ml-auto dark:text-neutral-300 dark:hover:text-neutral-50 pr-0"
                >
                  <Link to="/forgot-password">Forgot password?</Link>
                </LinkButton>
              </div>
            </div>
            {/* BUTTON */}
            <div className="mt-4">
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
                {isLoading ? "Authenticating" : "Log In"}
              </Button>
            </div>
            <div className="flex justify-end mt-4 pr-0 ">
              <LinkButton
                variant="link"
                className="ml-auto dark:text-neutral-300 dark:hover:text-neutral-50 pr-0"
              >
                <Link to="/register">Don't have an account yet? Register</Link>
              </LinkButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
