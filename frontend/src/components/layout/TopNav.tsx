import { NavLink, Link } from "react-router-dom";
import { Button as NUIButton } from "@nextui-org/react";
import { routes } from "@/data/siteLinks.js";
import { Button } from "../ui/button";

const TopNav = () => {
  return (
    <nav className=" bg-gray-800 text-neutral-900 py-[4px]">
      <div className="container flex flex-row w-full md:justify-between px-4 lg:px-6 justify-items-end justify-end">
        {/* LEFT NAV */}
        <nav className="hidden md:flex gap-2">
          {routes.map((route, index) => {
            return (
              <NavLink
                to={route.url}
                key={index}
                className="font-medium transition-colors border border-transparent hover:border-white rounded-[3px]"
              >
                <Button
                  variant="link"
                  size="sm"
                  className="text-sm text-white hover:no-underline"
                >
                  {route.name}
                </Button>
              </NavLink>
            );
          })}
        </nav>

        {/* RIGHT NAV */}
        <div className="flex flex-row  md:gap-4 justify-start">
          <NUIButton
            variant="light"
            size="sm"
            className="text-sm text-white hover:no-underline"
            as={Link}
            to={`/admin/dashboard`}
          >
            Dashboard
          </NUIButton>
          <NUIButton
            variant="light"
            size="sm"
            className="text-sm text-white hover:no-underline"
            as={Link}
            to={`/register`}
          >
            Create Account
          </NUIButton>
        </div>
      </div>
    </nav>
  );
};
export default TopNav;
