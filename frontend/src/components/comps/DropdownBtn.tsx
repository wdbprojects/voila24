import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

const DropdownBtn = ({ user, logout }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-sm dark:text-white hover:no-underline hover:border-black  dark:hover:border-white rounded-[3px] hover:bg-transparent focus-visible:ring-0 pe-0 md:pr-2 py-[19px] rounded-lg"
        >
          <span className="flex text-sm font-light items-end justify-between gap-1.5">
            <span>
              Hello&nbsp;
              <span className="font-bold capitalize">{user?.username}</span>!
            </span>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              className="text-gray-300"
            />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link to="/me/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link to="/me/orders">Orders</Link>
          </DropdownMenuItem>
          {user?.role === "admin" && (
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link to="/admin/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={logoutHandler}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownBtn;
