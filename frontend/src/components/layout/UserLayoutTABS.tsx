import React, { useState } from "react";
import {
  SquareUser,
  SquarePen,
  CircleUser,
  LockKeyhole,
  BringToFront,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const UserLayout = ({ children }) => {
  const [tabValue, setTabValue] = useState("profile");
  const [urlValue, setUrlValue] = useState("/me/profile");
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
      <div className="w-[100%]">
        <div className="mt-2 mb-4">
          <h2 className="text-center font-semibold text-xl">User Settings</h2>
        </div>
        <div>
          <Tabs defaultValue={tabValue} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 h-full rounded-sm">
              {menuItems.map((item, index) => {
                return (
                  <TabsTrigger
                    key={index}
                    value={item.value}
                    className="dark:border dark:border-gray-700 dark:hover:bg-gray-900"
                    onClick={() => {
                      setTabValue(item.value);
                      setUrlValue(item.url);
                    }}
                  >
                    <Link to={urlValue}>{item.name}</Link>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent value={tabValue}>{children}</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
