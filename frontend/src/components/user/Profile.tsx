import { useSelector } from "react-redux";
import UserLayout from "../layout/UserLayout";
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
//import defaultImage from "@/assets/images/avatar1.jpeg";
import defaultImage from "@/assets/images/default_avatar.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Profile = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });

  return (
    <UserLayout>
      <Card className="rounded-sm lg:px-12 pb-4">
        <CardHeader>
          <CardTitle className="text-3xl font-light uppercase text-center mb-0">
            Profile
          </CardTitle>
          <CardDescription className="text-center">
            Personal details about your current user{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xs:grid-cols-12">
            <div className="xs:col-span-5 object-cover w-full">
              <Image
                className="h-full"
                alt="Profile image"
                src={user?.avatar ? user?.avatar?.url : defaultImage}
              />
            </div>
            <div className="col-span-3 xs:col-span-7 mt-4 xs:mt-0 xs:ml-8">
              <h4 className="text-lg text-gray-400">Full Name</h4>
              <p>
                {user?.firstName}&nbsp;{user?.lastName}
              </p>
              <Divider className="my-2" />
              <h4 className="text-lg text-gray-400">Email Address</h4>
              <p>{user?.email}</p>
              <Divider className="my-2" />
              <h4 className="text-lg text-gray-400">Joined On</h4>
              <p>{user?.createdAt?.substring(0, 10)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </UserLayout>
  );
};

export default Profile;
