import React from "react";
import SidebarDashboard from "../comps/SidebarDashboard";
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
    <div className="container p-8">
      <div className="border border-neutral-200 dark:border-neutral-700 w-[100%] rounded">
        <div className="mt-2 mb-4">
          <h2 className="text-center font-semibold text-xl">Admin Dashboard</h2>
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

export default AdminLayout;
