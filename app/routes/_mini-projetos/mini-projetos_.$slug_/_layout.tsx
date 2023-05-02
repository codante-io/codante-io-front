import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { BsFillPlayFill } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import invariant from "tiny-invariant";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import ParticipantsSection from "./participants-section";

import { useColorMode } from "~/contexts/color-mode-context";
import {
  getChallenge,
  joinChallenge,
  updateChallengeCompleted,
  updateUserJoinedDiscord,
  verifyAndUpdateForkURL,
  getChallengeParticipants,
} from "~/models/challenge.server";
import { logout, user as getUser } from "~/services/auth.server";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import NotFound from "~/components/errors/not-found";
import { Error500 } from "~/components/errors/500";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const intent = formData.get("intent") as string;
  const redirectTo = formData.get("redirectTo") as string;
  const slug = redirectTo.split("/")[2];
  const user = await getUser({ request });

  switch (intent) {
    case "connect-github":
      return logout({ request, redirectTo: `/login?redirectTo=${redirectTo}` });
    case "join-challenge":
      return joinChallenge({ request, slug });
    case "verify-fork":
      return verifyAndUpdateForkURL({
        slug,
        githubUser: user.github_user,
        request,
      });
    case "join-discord":
      return updateUserJoinedDiscord({
        slug,
        joinedDiscord: true,
        request,
      });
    case "finish-challenge":
      return updateChallengeCompleted({
        slug,
        completed: true,
        request,
      });
  }
}

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  // redirect if page is not in overview or resolucao
  const { pathname } = new URL(request.url);
  if (
    pathname === `/mini-projetos/${params.slug}/` ||
    pathname === `/mini-projetos/${params.slug}`
  ) {
    return redirect(`/mini-projetos/${params.slug}/overview`);
  }

  const [challenge, participants] = await Promise.all([
    getChallenge(params.slug),
    getChallengeParticipants(params.slug),
  ]);

  return json({
    slug: params.slug,
    challenge,
    participants,
  });
};

export default function ChallengeSlug() {
  const { challenge, participants } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const { colorMode } = useColorMode();

  const location = useLocation();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData?.error);
    }

    if (actionData?.success) {
      toast.success(actionData?.success);
    }
  }, [actionData]);

  const tabs: {
    name: string;
    icon: React.ReactNode;
    href: string;
    current: boolean;
  }[] = [
    {
      name: "Overview",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13 8V4q0-.425.288-.713T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9h-6q-.425 0-.713-.288T13 8ZM3 12V4q0-.425.288-.713T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13H4q-.425 0-.713-.288T3 12Zm10 8v-8q0-.425.288-.713T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21h-6q-.425 0-.713-.288T13 20ZM3 20v-4q0-.425.288-.713T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21H4q-.425 0-.713-.288T3 20Zm2-9h4V5H5v6Zm10 8h4v-6h-4v6Zm0-12h4V5h-4v2ZM5 19h4v-2H5v2Zm4-8Zm6-4Zm0 6Zm-6 4Z"
          ></path>
        </svg>
      ),
      href: "overview",
      current: location.pathname.includes("overview"),
    },
    {
      name: "Resolução",
      href: "resolucao",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 28 28"
        >
          <path
            fill="currentColor"
            d="M3 5.75A2.75 2.75 0 0 1 5.75 3h16.5A2.75 2.75 0 0 1 25 5.75v8.75a7.486 7.486 0 0 0-1.5-.876V5.75c0-.69-.56-1.25-1.25-1.25H5.75c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h7.874c.234.535.529 1.038.875 1.5H5.75A2.75 2.75 0 0 1 3 22.25V5.75Zm3.75 10.248h7.75a7.493 7.493 0 0 0-.875 1.5H6.75a.75.75 0 0 1 0-1.5ZM6 20.751a.75.75 0 0 1 .75-.75h5.502a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM11.502 6a.75.75 0 0 1 .69.458l2.749 6.503a.75.75 0 1 1-1.382.583l-.44-1.042H9.881l-.441 1.043a.75.75 0 1 1-1.382-.585l2.752-6.503A.75.75 0 0 1 11.5 6Zm-.985 5.002h1.967l-.983-2.327l-.984 2.327ZM17.75 6a.75.75 0 0 1 .75.75V8h1.25a.75.75 0 0 1 0 1.5H18.5v1.248a.75.75 0 0 1-1.5 0V9.5h-1.248a.75.75 0 0 1 0-1.5H17V6.75a.75.75 0 0 1 .75-.75ZM27 20.5a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0Zm-6-4a.5.5 0 0 0-1 0V20h-3.5a.5.5 0 0 0 0 1H20v3.5a.5.5 0 0 0 1 0V21h3.5a.5.5 0 0 0 0-1H21v-3.5Z"
          ></path>
        </svg>
      ),
      current: location.pathname.includes("resolucao"),
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex flex-col items-center justify-center -mb-10 text-gray-900 dark:text-white">
      <section className="flex flex-col items-center w-full mb-16 text-gray-800 bg-transparent dark:text-white">
        <div className="container">
          <div>
            <CardItemDifficulty
              difficulty={challenge?.difficulty}
              className="mb-2"
            />
            <h1 className="flex items-center justify-between text-3xl font-light font-lexend">
              <span>
                <MdKeyboardDoubleArrowRight
                  size={24}
                  className="inline mr-2 text-blue-300 dark:text-blue-900"
                />
                <span className="font-extralight">Projeto</span>{" "}
                <span className="font-bold underline decoration-solid">
                  {challenge.name}
                </span>
              </span>
            </h1>
            <p className="mt-2 mb-4 font-light font-inter text-md md:mt-3 text-slate-400 text-start">
              {challenge.short_description}
            </p>
          </div>
        </div>
        <div className="container mt-8 mb-6">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue={tabs.find((tab) => tab?.current)?.name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    to={tab.href}
                    className={classNames(
                      tab.current
                        ? "bg-slate-200 dark:bg-slate-800 dark:text-white text-slate-800"
                        : "text-gray-500 hover:text-gray-700",
                      "rounded-full px-3 py-1.5 text-sm flex items-center gap-2"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <span className={tab.current ? "text-brand" : ""}>
                      {tab.icon}
                    </span>
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <Outlet />
      </section>

      {colorMode && (
        <img
          src={`/img/wave-top-${colorMode}.svg`}
          className="relative w-full"
          alt="Wave detail"
        />
      )}
      <section
        id="mini-projects"
        className="flex justify-center w-full text-gray-800 dark:bg-slate-800 bg-slate-100 dark:text-white"
      >
        <div className="container relative -top-12">
          <ParticipantsSection participants={participants} />
        </div>
      </section>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <div>
      <Error500 />
    </div>
  );
}
