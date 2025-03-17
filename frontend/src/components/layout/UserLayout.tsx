import React, { useState } from "react";
import {
  SquareUser,
  SquarePen,
  CircleUser,
  LockKeyhole,
  BringToFront,
} from "lucide-react";
import { Link } from "react-router-dom";
import SidebarDashHor from "@/components/comps/SidebarDashHor";

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
    <div className="container p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-[100%]">
        <div className="mt-2 mb-4">
          <h2 className="text-center font-semibold text-xl">User Settings</h2>
        </div>
        <div>
          <SidebarDashHor menuItems={menuItems} />
          <article>{children}</article>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
