import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import ParticipantsSection from "./components/participants-section";
import axios from "axios";
import { useEffect } from "react";
import { BsCloudUpload, BsStars } from "react-icons/bs";
import AdminEditButton from "~/components/admin-edit-button/AdminEditButton";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";
import { useToasterWithSound } from "~/hooks/useToasterWithSound";
// import { useUserFromOutletContext } from "~/hooks/useUserFromOutletContext";
import {
  getChallenge,
  getChallengeParticipants,
  getChallengeUsers,
  joinChallenge,
  updateChallengeCompleted,
  updateUserJoinedDiscord,
  userJoinedChallenge,
  verifyAndUpdateForkURL,
} from "~/models/challenge.server";
import { user as getUser, logout } from "~/services/auth.server";
import { getOgGeneratorUrl } from "~/utils/path-utils";
import { abort404 } from "~/utils/responses.server";
import Overview from "./_tabs/_overview/overview";
import { buildInitialSteps } from "./build-steps.server";
import { CheckIcon } from "@heroicons/react/24/outline";
import type { User } from "~/models/user.server";

export const meta = ({ data, params }: any) => {
  // para não quebrar se não houver challenge ainda.
  if (!data?.challenge) {
    return [{}];
  }

  const title = `Projeto: ${data.challenge.name} | Codante.io`;
  const description = data.challenge.short_description;
  const imageUrl = getOgGeneratorUrl(data.challenge.name, "Mini Projeto");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/mini-projetos/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/mini-projetos/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.challenge.name },
  ];
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const intent = formData.get("intent") as string;
  const redirectTo = formData.get("redirectTo") as string;
  const slug = redirectTo.split("/")[2];

  switch (intent) {
    case "connect-github":
      return logout({ request, redirectTo: `/login?redirectTo=${redirectTo}` });
    case "join-challenge":
      return joinChallenge({ request, slug });
    case "verify-fork":
      return verifyAndUpdateForkURL({
        slug,
        request,
      });
    case "join-discord":
      return updateUserJoinedDiscord({
        slug,
        joinedDiscord: true,
        request,
      });
    case "submit-challenge":
      return redirect(`/mini-projetos/${slug}/minha-submissao`);
    case "finish-challenge":
      return updateChallengeCompleted({
        slug,
        completed: true,
        request,
      });
  }
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.slug, `params.slug is required`);

  const [challenge, participants, challengeUsers] = await Promise.all([
    getChallenge(params.slug, request),
    getChallengeParticipants(params.slug, request),
    getChallengeUsers(request, params.slug),
  ]);

  if (!challenge) {
    return abort404();
  }

  const user = (await getUser({ request })) as User | null;

  let challengeUser;
  if (user) {
    try {
      challengeUser = await userJoinedChallenge(params.slug, request);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err?.response?.status) challengeUser = null;
      }
    }
  }

  return {
    user,
    slug: params.slug,
    challenge,
    participants,

    challengeUser,
    challengeUsers,
    initialSteps: buildInitialSteps({
      user,
      challengeUser,
      repositorySlug: challenge.repository_name,
    }),
  };
};

export default function ChallengeSlug() {
  const {
    challenge,
    participants,
    initialSteps,
    challengeUser,
    challengeUsers,
    user,
  } = useLoaderData<typeof loader>();

  const userHasSubmitted = Boolean(
    challengeUsers.find(
      (submission) =>
        submission.user_id === user?.id && submission.submission_url,
    ),
  );

  const actionData = useActionData<any>();

  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToasterWithSound();

  const hasSolution = Boolean(
    challenge?.workshop?.id && challenge.workshop.status === "published",
  );

  const hasSubmissions = Boolean(
    challengeUsers?.length && challengeUsers.length > 0,
  );

  const isUserParticipating = Boolean(challengeUser?.id);

  const location = useLocation();

  useEffect(() => {
    if (actionData?.error) {
      showErrorToast(actionData?.error);
    }

    if (actionData?.success) {
      showSuccessToast(actionData?.success);
    }
  }, [actionData, showErrorToast, showSuccessToast]);

  const tabs: {
    name: string;
    icon: React.ReactNode;
    href: string;
    current: boolean;
    isVisible: boolean;
  }[] = [
    {
      name: "Overview",
      isVisible: true,
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
      href: "",
      current:
        location.pathname === `/mini-projetos/${challenge?.slug}` ||
        location.pathname === `/mini-projetos/${challenge?.slug}/`,
    },
    {
      name: "Resolução",
      href: "resolucao",
      isVisible: hasSolution,
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
    {
      name: "Submissões",
      href: "submissoes",
      isVisible: hasSubmissions,
      icon: <BsStars />,
      current: location.pathname.includes("submissoes"),
    },
    {
      name: userHasSubmitted ? "Editar submissão" : "Submeter solução",
      href: "minha-submissao",
      isVisible: !!user && isUserParticipating,
      icon: <BsCloudUpload />,
      current: location.pathname.includes("minha-submissao"),
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex flex-col items-center justify-center -mb-10 text-gray-900 dark:text-gray-50">
      <section className="min-h-[calc(100vh_-_68px)] flex flex-col items-center w-full mb-10 text-gray-800 bg-transparent lg:mb-24 dark:text-gray-50">
        {!location.pathname.includes("submissoes/") && (
          <>
            <div className="container">
              <div>
                <CardItemDifficulty
                  difficulty={challenge?.difficulty}
                  className="mb-2"
                />
                <h1 className="flex items-center justify-between text-2xl font-light lg:text-3xl font-lexend">
                  <span>
                    <MdKeyboardDoubleArrowRight
                      size={24}
                      className="inline mr-2 text-blue-300 dark:text-blue-900"
                    />
                    <span className="inline font-extralight">Projeto</span>{" "}
                    <span className="inline font-bold">{challenge?.name}</span>
                  </span>
                </h1>

                <p className="mt-2 mb-4 font-light text-gray-400 font-inter text-md md:mt-3 text-start">
                  {challenge?.short_description}
                </p>
                {challengeUser && (
                  <div
                    className={`mb inline-flex items-center gap-x-1.5 rounded-xl px-3 border py-1.5 xl:text-xs text-[0.65rem] shadow-sm font-light text-gray-600 dark:text-gray-300 ${
                      challengeUser.pivot?.completed
                        ? "border-green-500"
                        : "border-amber-500"
                    }`}
                  >
                    {challengeUser.pivot?.completed ? (
                      <CheckIcon className="w-3 h-3 text-green-500 dark:text-green-300" />
                    ) : (
                      <svg
                        className={`h-1.5 w-1.5 ${
                          challengeUser.pivot?.completed
                            ? "fill-brand-500"
                            : "animate-pulse fill-amber-400"
                        }`}
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                    )}

                    {challengeUser.pivot?.completed
                      ? "Projeto concluído!"
                      : "Participando"}
                  </div>
                )}
                <AdminEditButton url={`/challenge/${challenge.id}/edit`} />
              </div>
            </div>

            <div className="container mt-4 mb-8 lg:mt-8 lg:mb-12">
              <div>
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    onChange={(e) => {
                      const tab = tabs.find((t) => t.name === e.target.value);
                      if (tab) {
                        navigate(
                          `/mini-projetos/${challenge?.slug}/${tab.href}`,
                        );
                      }
                    }}
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md dark:border-gray-600 dark:bg-background-800 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={
                      tabs
                        .filter((t) => t.isVisible)
                        .find((tab) => tab?.current)?.name
                    }
                  >
                    {tabs
                      .filter((t) => t.isVisible)
                      .map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                      ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <nav className="flex space-x-4" aria-label="Tabs">
                    {tabs
                      .filter((t) => t.isVisible)
                      .map((tab) => (
                        <Link
                          key={tab.name}
                          to={tab.href}
                          className={classNames(
                            tab.current
                              ? "bg-background-150 dark:bg-background-800 dark:text-gray-50 text-gray-800 font-semibold"
                              : "text-gray-500 hover:text-gray-700",
                            "rounded-full px-3 py-2.5 text-sm flex items-center gap-2",
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
          </>
        )}

        {
          // if path is /mini-projetos/:slug, show the overview tab, otherwise show the content of the tab
          location.pathname === `/mini-projetos/${challenge?.slug}` ||
          location.pathname === `/mini-projetos/${challenge?.slug}/` ? (
            <>
              <Overview
                challenge={challenge}
                hasSolution={hasSolution}
                initialSteps={initialSteps}
              />
            </>
          ) : (
            <Outlet
              context={{
                user,
                challenge,
                challengeUser,
                challengeUsers,
                participants,
                initialSteps,
                hasSolution,
              }}
            />
          )
        }
      </section>

      {!location.pathname.includes("submissoes/") && (
        <>
          <hr className="mt-10 w-full container dark:border-background-700 border-background-200" />
          <section
            id="mini-projects"
            className="flex my-10 justify-center w-full text-gray-800 dark:text-gray-50"
          >
            <div className="container mb-10">
              <ParticipantsSection
                currentUserIsEnrolled={challenge.current_user_is_enrolled}
                participants={participants}
              />
            </div>
          </section>
        </>
      )}
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
      <Error500 error={error} />
    </div>
  );
}
