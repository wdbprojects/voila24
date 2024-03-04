import { useSelector } from "react-redux";
import UserLayout from "../layout/UserLayout";
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
//import defaultImage from "@/assets/images/avatar1.jpeg";
import defaultImage from "@/assets/images/default_avatar.jpg";

const Profile = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });

  return (
    <UserLayout>
      <h2 className="text-xl uppercase text-center mb-0">Profile</h2>
      <div className="grid grid-cols-3 gap-8 p-4">
        <Image
          className="col-span-1"
          width={300}
          alt="Profile image"
          src={user?.avatar ? user?.avatar?.url : defaultImage}
        />
        <div className="col-span-2">
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
    </UserLayout>
  );
};

export default Profile;
