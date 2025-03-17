import React from "react";
import SidebarDashboard from "../comps/SidebarDashboard";
import {
  SquareUser,
  SquarePen,
  CircleUser,
  LockKeyhole,
  BringToFront,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "@/components/user/Profile";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Profile",
      value: "profile",
      url: "/me/profile",
      icon: React.createElement(SquareUser, {
        className: "sidebar-icon",
      }),
    },
    {
      name: "Update Profile",
      value: "updateProfile",
      url: "/me/update-profile",
      icon: React.createElement(SquarePen, { className: "sidebar-icon" }),
    },
    {
      name: "Upload Avatar",
      value: "updateAvatar",
      url: "/me/upload-avatar",
      icon: React.createElement(CircleUser, { className: "sidebar-icon" }),
    },
    {
      name: "Update Password",
      value: "updatePassword",
      url: "/me/change-password",
      icon: React.createElement(LockKeyhole, { className: "sidebar-icon" }),
    },
    {
      name: "My Orders",
      value: "orders",
      url: "/me/orders",
      icon: React.createElement(BringToFront, { className: "sidebar-icon" }),
    },
  ];

  return (
    <div className="container p-8">
      <div className="border border-neutral-200 dark:border-neutral-700 w-[100%] rounded">
        <div className="mt-2 mb-4">
          <h2 className="text-center font-semibold text-xl">User Settings</h2>
        </div>
        <div>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-5 gap-4">
              {menuItems.map((item, index) => {
                return (
                  <TabsTrigger key={index} value={item.value}>
                    {item.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent value="profile">
              <Profile />
            </TabsContent>
            <TabsContent value="updateProfile">
              Update Profile goes here
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid grid-cols-5">
          <SidebarDashboard menuItems={menuItems} />
          <div className="col-span-4 border border-neutral-200  dark:border-neutral-700 p-2 border-r-0 border-b-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
