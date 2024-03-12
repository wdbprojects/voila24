import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/comps/theme-provider";
import TopNav from "./TopNav";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, MoonStar, ShoppingCart, Sun } from "lucide-react";
import DropdownBtn from "../comps/DropdownBtn";
import { routes } from "@/data/siteLinks.js";
import SearchBar from "./SearchBar";
/* RTK */
import { useDispatch, useSelector } from "react-redux";
import { setThemeRedux } from "@/redux/features/miscSlice";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useLazyLogoutQuery } from "@/redux/api/authApi";
import { Avatar, Badge, Button as NUButton } from "@nextui-org/react";
import LogoDark from "@/assets/images/voila-logo-dark.png";
import LogoLight from "@/assets/images/voila-logo-light.png";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [logout, { isSuccess }] = useLazyLogoutQuery();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentTheme = useSelector((state) => {
    return state.search.currentTheme;
  });

  const { isLoading } = useGetMeQuery(); // prevents from resetting redux state
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const { cartItems, numItemsInCart } = useSelector((state) => {
    return state.cartState;
  });

  useEffect(() => {
    if (isSuccess) navigate(0);
  });

  return (
    <>
      <header className="sm:flex sm:justify-between py-1 bg-gray-50 dark:bg-gray-950 dark:text-neutral-900">
        <div className="container relative flex flex-wrap lg:px-6 items-center justify-between md:w-full h-12 px-4">
          {/* LOGO & MOBILE MENU */}
          <div className="flex items-center md:justify-start">
            {/* SHEET (MOBILE MENU) */}
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 w-6 md:hidden dark:text-gray-300" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-1 mt-6">
                  {routes.map((route, index) => {
                    return (
                      <SheetClose key={index} asChild>
                        <Button asChild key={index} variant="ghost">
                          <NavLink
                            to={route.url}
                            className="block px-2 text-lg text-left hover:dark:bg-gray-800"
                          >
                            {route.name}
                          </NavLink>
                        </Button>
                      </SheetClose>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            {/* LOGO */}
            <div className="pt-1">
              <Link to="/" className="block ml-2 md:ml-0">
                {/* <h1 className="text-xl font-bold dark:text-white"></h1> */}
                <img
                  src={currentTheme === "dark" ? LogoLight : LogoDark}
                  alt="Voila! logo"
                  className="max-w-[120px] pt-1"
                />
              </Link>
            </div>
          </div>

          {/* SEARCH FIELD */}
          <div className="w-auto flex-auto hidden lg:block">
            <SearchBar />
          </div>

          {/* TOP RIGHT ICONS */}
          <div className="flex items-center md:justify-end gap-4">
            {user ? (
              <div className="hidden md:flex justify-start items-center gap-1">
                <NUButton
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
                </NUButton>
                <DropdownBtn user={user} logout={logout} />
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block font-medium transition-colors border dark:text-white border-transparent hover:border-black dark:hover:border-white rounded-lg"
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
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="dark:text-accent-white dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => {
                dispatch(setThemeRedux(theme === "dark" ? "light" : "dark"));
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              <MoonStar className="h-7 w-7 rotate-90 scale-100 transition-all dark:rotate-0 dark:scale-0" />
              <Sun className="absolute h-7 w-7 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="dark:text-accent-white dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-white pt-[5px]"
              aria-label="Shopping Cart"
            >
              <Link to="/cart">
                {
                  <Badge
                    content={numItemsInCart}
                    size="lg"
                    color="primary"
                    className="text-neutral-900"
                  >
                    <ShoppingCart className="h-7 w-7" />
                    <span className="sr-only">Shopping Cart</span>
                  </Badge>
                }
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <TopNav user={user} />
    </>
  );
};
export default Header;
