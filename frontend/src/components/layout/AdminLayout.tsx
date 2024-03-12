import React from "react";
import SidebarDashHor from "@/components/comps/SidebarDashHor";
import {
  Gauge,
  Plus,
  LibrarySquare,
  Users,
  BringToFront,
  Star,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: React.createElement(Gauge, {
        className: "sidebar-icon",
      }),
    },
    {
      name: "New Product",
      url: "/admin/new/products",
      icon: React.createElement(Plus, { className: "sidebar-icon" }),
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: React.createElement(LibrarySquare, { className: "sidebar-icon" }),
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: React.createElement(Users, { className: "sidebar-icon" }),
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: React.createElement(BringToFront, { className: "sidebar-icon" }),
    },
    /*  {
      name: "Reviews",
      url: "/admin/reviews",
      icon: React.createElement(Star, { className: "sidebar-icon" }),
    }, */
  ];

  return (
    <div className="container p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-[100%]">
        <div className="mt-2 mb-4">
          <h2 className="text-center font-semibold text-xl">Admin Dashboard</h2>
        </div>
        <div>
          <SidebarDashHor menuItems={menuItems} />
          <article>{children}</article>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
