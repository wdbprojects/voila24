import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/lib/schemas";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
import { Button as LinkButton } from "@/components/ui/button";
/* RTK */
import { useRegisterMutation } from "@/redux/api/authApi";
import { useSelector } from "react-redux";

const Register = () => {
  const [register, { isLoading, error, data }] = useRegisterMutation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => {
    return state.auth;
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const registerData = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      const { data } = await register(registerData);
      if (data) {
        toast.success(`User ${data?.user?.username} created successfully`);
        reset();
      }
      return;
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error?.data?.message}`);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center w-[90%] mx-auto sm:w-full h-full">
      <div className="mt-8 w-[26rem] mx-auto text-left border p-4 sm:p-8 rounded">
        <h2 className="mb-12 text-xl text-center font-semibold">Register</h2>
        {/* FORM */}
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
                      label="First Name"
                      {...field}
                      size="md"
                      radius="sm"
                      variant="flat"
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
                      label="Last Name"
                      {...field}
                      size="md"
                      radius="sm"
                      variant="flat"
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
                      label="Username"
                      {...field}
                      size="md"
                      radius="sm"
                      variant="flat"
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
                      label="Email"
                      {...field}
                      size="md"
                      radius="sm"
                      variant="flat"
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
            {/* PASSWORD */}
            <div className="mb-10">
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
            </div>
            {/* BUTTON */}
            <div className="mb-4">
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
                {isLoading ? "Authenticating" : "Create Account"}
              </Button>
            </div>
            <div className="flex justify-end mt-0 pr-0 ">
              <LinkButton
                variant="link"
                className="ml-auto dark:text-neutral-300 dark:hover:text-neutral-50 pr-0"
              >
                <Link to="/login">Already have an account? Login</Link>
              </LinkButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
