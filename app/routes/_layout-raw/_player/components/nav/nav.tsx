import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";
import { BsArrowRight } from "react-icons/bs";
import ProfileMenu from "~/components/_layouts/navbar/profile-menu";
import LinkToLoginWithRedirect from "~/components/features/link-to-login-with-redirect";
import ToggleColorMode from "~/components/ui/toggle-color-mode";
import { User } from "~/lib/models/user.server";
import CodanteLogo from "../codante-logo";
import { Title } from "../sidebar/types";

export default function Nav({
  user,
  titles,
}: {
  user: User | null;
  titles: Title[];
}) {
  return (
    <div className=" max-w-[1600px] px-8 mx-auto py-6 flex justify-between sticky">
      <div className="flex gap-2 items-center dark:bg-background-800 rounded-lg py-2 px-6">
        <Link to="/">
          <CodanteLogo className="w-14 h-14" />
        </Link>
        <div className="border-r-2 border-r-background-700 h-10 mx-4"></div>
        <Link
          to={titles[0].url}
          className="group border-b-2 border-b-transparent hover:border-b-brand transition-colors"
        >
          <span className="dark:text-gray-500 text-xs group-hover:dark:text-white transition-colors">
            Todos
          </span>
          <h2 className="font-lexend font-semibold -mt-1 text-gray-400 group-hover:text-white transition-colors">
            {titles[0].title}
          </h2>
        </Link>
        <ChevronRight className="w-8 h-8 text-gray-600 " />
        {titles
          ?.filter((t) => t.type !== "home")
          .map((title) => {
            return (
              <Link
                to={title.url}
                key={title.type}
                className="group border-b-2 border-b-transparent hover:border-b-brand transition-colors"
              >
                <span className="dark:text-gray-500 text-xs group-hover:dark:text-brand-300 transition-colors">
                  {title.subTitle}
                </span>
                <h2 className="font-lexend font-semibold -mt-1 text-gray-400 group-hover:text-white transition-colors ">
                  {title.title}
                </h2>
              </Link>
            );
          })}
      </div>
      <div className="flex items-center">
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
    </div>
  );
}
