import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Button as NUIButton } from "@nextui-org/react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import avatarImg from "@/assets/images/shadcn.jpg";
import { ChevronDown } from "lucide-react";

const DropdownCOMP = ({ user }) => {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8 block">
            <AvatarImage
              src={avatarImg}
              alt={`My account: ${user?.username}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          {/*  <span className="block text-sm font-light">
            Hello&nbsp;
            <span className="font-bold capitalize">{user?.username}</span>!
          </span> */}
          My account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            Orders
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            Wishlist
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownCOMP;
