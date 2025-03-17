import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const SidebarDashHor = ({ menuItems }) => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div className="border border-neutral-200 dark:border-neutral-700 p-2 border-l-0 border-r-0 border-b-0">
      <div className="py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ">
        {menuItems?.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.url}
              className={`text-neutral-800 dark:text-neutral-500 block ${
                activeMenuItem.includes(item.url) ? "bg-red" : ""
              }`}
            >
              <Button
                variant="outline"
                className={`w-full justify-start flex gap-2 items-center ${
                  activeMenuItem.includes(item.url)
                    ? "bg-neutral-900 text-neutral-400"
                    : ""
                }`}
                onClick={() => {
                  handleMenuItemClick(item.url);
                }}
                aria-current={
                  activeMenuItem.includes(item.url) ? "true" : "false"
                }
              >
                <span className="hidden sm:block">{item.icon}</span>
                <span className="">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarDashHor;
