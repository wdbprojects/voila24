import { NavLink, Link } from "react-router-dom";
import { Avatar, Button as NUIButton } from "@nextui-org/react";
import { routes } from "@/data/siteLinks";
import { Button } from "@/components/ui/button";
import DropdownBtn from "@/components/comps/DropdownBtn";
import { useLazyLogoutQuery } from "@/redux/api/authApi";

const TopNav = ({ user }) => {
  const [logout, { isSuccess }] = useLazyLogoutQuery();

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
          {user ? (
            <div className="flex md:hidden justify-start items-center gap-1">
              <NUIButton
                isIconOnly
                radius="sm"
                color="secondary"
                variant="bordered"
                size="md"
              >
                <Link to="/me/profile">
                  <Avatar
                    size="sm"
                    radius="sm"
                    //src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    src={user?.avatar?.url}
                  />
                </Link>
              </NUIButton>
              <DropdownBtn user={user} logout={logout} />
            </div>
          ) : (
            <Link
              to="/login"
              className="block md:hidden font-medium transition-colors border dark:text-white border-transparent hover:border-black dark:hover:border-white rounded-lg"
            >
              <Button
                variant="outline"
                size="sm"
                className="text-sm hover:bg-transparent py-[19px] rounded-lg  leading-4 flex flex-col justify-center items-center"
              >
                <span>Hello, sign in</span>
                <span className="text-xs font-thin">(or sign up)</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default TopNav;
