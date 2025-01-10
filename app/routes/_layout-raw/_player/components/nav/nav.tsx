import { Link } from "@remix-run/react";
import { ChevronDownIcon, ChevronRight, MenuIcon } from "lucide-react";
import { BsArrowRight } from "react-icons/bs";
import ProfileMenu from "~/components/_layouts/navbar/profile-menu";
import LinkToLoginWithRedirect from "~/components/features/link-to-login-with-redirect";
import ToggleColorMode from "~/components/ui/toggle-color-mode";
import { User } from "~/lib/models/user.server";
import CodanteLogo from "../codante-logo";
import { Title } from "../sidebar/types";
import { Fragment } from "react";
import { cn } from "~/lib/utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { buttonVariants } from "~/components/ui/button";

export default function Nav({
  user,
  titles,
  setIsSidebarOpen,
  isSidebarOpen,
  mobileNavSidebarButtonRef,
}: {
  user: User | null;
  titles: Title[];
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
  mobileNavSidebarButtonRef: any;
}) {
  return (
    <div className="w-full max-w-[1600px] px-4 mx-auto py-6 lg:pb-12 z-50">
      {/* Mobile Navbar */}
      <MobileNav
        mobileNavSidebarButtonRef={mobileNavSidebarButtonRef} // isso é usado para o useclickoutside
        titles={titles}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      {/* Desktop Navbar */}
      <DesktopNav titles={titles} user={user} />
    </div>
  );
}

function MobileNav({
  titles,
  setIsSidebarOpen,
  isSidebarOpen,
  mobileNavSidebarButtonRef,
}: {
  titles: Title[];
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
  mobileNavSidebarButtonRef: any;
}) {
  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg dark:bg-background-800">
        <MenuIcon
          ref={mobileNavSidebarButtonRef}
          className="w-8 h-8 cursor-pointer shrink-0"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <div className="h-10 mx-2 border-r-2 border-r-background-700"></div>

        {titles.map((title, index) => {
          const isLast = index === titles.length - 1;
          return (
            <div key={title.type} className="">
              {isLast && (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={cn(
                        "flex items-center justify-between flex-1  gap-4 py-2 text-left -ml-5 w-fit",
                        buttonVariants({ variant: "ghost" }),
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs transition-colors dark:text-gray-500 group-hover:dark:text-brand-300">
                          {title.subTitle}
                        </span>
                        <h2 className="text-sm font-semibold leading-tight text-gray-400 transition-colors font-lexend group-hover:text-white">
                          {title.title}
                        </h2>
                      </div>
                      <ChevronDownIcon className="w-8 h-8 text-gray-600" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      sideOffset={16}
                      // alignOffset={12}
                      className="border w-fit max-w-72 dark:bg-background-700 rounded-xl dark:border-background-600 "
                    >
                      {titles.map((dropdownTitle) => (
                        <Link
                          key={dropdownTitle.type}
                          to={dropdownTitle.url}
                          className="flex flex-col px-4 py-2 rounded-lg hover:bg-background-800"
                        >
                          <span className="text-xs dark:text-gray-500">
                            {dropdownTitle.subTitle}
                          </span>
                          <span className="text-sm font-semibold leading-tight text-gray-400">
                            {dropdownTitle.title}
                          </span>
                        </Link>
                      ))}
                      {/* <RightControls user={user} /> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DesktopNav({ titles, user }: { titles: Title[]; user: User | null }) {
  return (
    <div className="hidden lg:justify-between lg:items-center lg:flex">
      <div className="flex items-center gap-2 px-6 py-2 rounded-lg dark:bg-background-800">
        <Link to="/">
          <CodanteLogo className="w-14 h-14" />
        </Link>
        <div className="h-10 mx-4 border-r-2 border-r-background-700"></div>

        {titles.map((title, index) => {
          const isLast = index === titles.length - 1;
          return (
            <Fragment key={title.type}>
              <Link
                to={title.url}
                className={cn(
                  "transition-colors border-b-2 group border-b-transparent hover:border-b-brand",
                  !isLast && "hidden lg:block",
                )}
              >
                <span className="text-xs transition-colors dark:text-gray-500 group-hover:dark:text-brand-300">
                  {title.subTitle}
                </span>
                <h2 className="-mt-1 font-semibold text-gray-400 transition-colors font-lexend group-hover:text-white ">
                  {title.title}
                </h2>
              </Link>
              {!isLast && (
                <ChevronRight className="hidden w-8 h-8 text-gray-600 lg:block" />
              )}
            </Fragment>
          );
        })}
      </div>
      <RightControls user={user} />
    </div>
  );
}

function RightControls({ user }: { user: User | null }) {
  return (
    <div className={cn("items-center", "lg:flex lg:items-center")}>
      <div className="mr-3">
        <ToggleColorMode />
      </div>
      {user ? (
        <div className="static inset-y-0 inset-auto right-0 flex items-center ">
          {/* Profile dropdown */}
          <ProfileMenu user={user} />
        </div>
      ) : (
        <LinkToLoginWithRedirect className="static inset-y-0 inset-auto right-0 flex items-center text-gray-700 dark:text-white gap-x-1">
          Login <BsArrowRight className="hidden md:inline" />
        </LinkToLoginWithRedirect>
      )}
    </div>
  );
}
