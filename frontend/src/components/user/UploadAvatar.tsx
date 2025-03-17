import { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import { Avatar, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import { Input } from "../ui/input";
import defaultImage from "@/assets/images/avatar1.jpeg";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useSelector } from "react-redux";

const UploadAvatar = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "",
  );

  const navigate = useNavigate();

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  const onSubmit = async () => {
    const userData = {
      avatar: avatar,
    };
    try {
      const { data } = await uploadAvatar(userData);
      if (data) {
        toast.success(`Avatar uploaded successfully`);
        navigate("/me/profile");
      }
      return;
    } catch (err) {
      toast.error(`Error from try/catch: ${err}`);
      return;
    }
  };

  const form = useForm({
    defaultValues: {
      avatar: "",
    },
  });

  const onChangeUpload = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    //if (isSuccess) {}
  }, [error, isSuccess]);

  return (
    <UserLayout>
      <div className="flex flex-col items-center">
        <h2 className="mb-6 text-xl">Upload Avatar</h2>

        <div className="grid w-full max-w-xs items-center gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-0 justify-normal items-center">
                <figure className="block mr-1">
                  <Avatar
                    radius="sm"
                    size="lg"
                    src={avatarPreview}
                    color="default"
                  />
                </figure>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full h-full">
                        <FormControl>
                          <Input
                            placeholder="Upload avatar"
                            className="h-auto p-4 cursor-pointer rounded-16"
                            type="file"
                            {...field}
                            onChange={(event) => {
                              field.onChange(event.target.value);
                              onChangeUpload(event);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="mt-4">
                <Button
                  size="md"
                  radius="sm"
                  variant="shadow"
                  type="submit"
                  color="success"
                  fullWidth
                  className="mt-1 font-semibold"
                  isLoading={isLoading ? true : false}
                  isDisabled={isLoading || avatar === "" ? true : false}
                >
                  {isLoading ? "Authenticating" : "Upload"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatar;
