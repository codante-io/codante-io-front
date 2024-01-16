import { type LoaderFunctionArgs, type MetaArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import type { Challenge } from "~/lib/models/challenge.server";
import type { ChallengeUser, User } from "~/lib/models/user.server";
import UserAvatar from "~/components/ui/user-avatar";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ReactionsButton from "~/components/features/reactions/reactions-button";
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useEffect, useState, Fragment } from "react";
import {
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { formatName } from "~/lib/utils/format-name";
import toast from "react-hot-toast";
import { HiOutlineLink } from "react-icons/hi";
import { Transition, Dialog } from "@headlessui/react";
import {
  getSubmissionFromGithubUser,
  updateChallengeSubmission,
} from "~/lib/models/challenge.server";
import useSound from "use-sound";
import pop from "~/lib/sounds/pop.wav";
import { FiEdit } from "react-icons/fi";
import classNames from "~/lib/utils/class-names";
import SolutionButtonsSection from "../../components/solution-buttons-section";
import LoadingButton from "~/components/features/form/loading-button";
import invariant from "tiny-invariant";
import { NewButton } from "~/components/ui/new-button";
import { SaveIcon } from "lucide-react";
import { abort404 } from "~/lib/utils/responses.server";

export function meta({ matches, params, data }: MetaArgs) {
  const { submissionData } = data as any;
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !("title" in meta))
    .filter((meta) => (meta as any).name !== "description")
    .filter((meta) => (meta as any).property !== "og:title")
    .filter((meta) => (meta as any).property !== "og:description")
    .filter((meta) => (meta as any).property !== "og:image")
    .filter((meta) => (meta as any).property !== "og:url")
    .filter((meta) => (meta as any).property !== "og:type")
    .filter((meta) => (meta as any).name !== "twitter:title")
    .filter((meta) => (meta as any).name !== "twitter:description")
    .filter((meta) => (meta as any).name !== "twitter:image")
    .filter((meta) => (meta as any).name !== "twitter:card")
    .filter((meta) => (meta as any).name !== "twitter:domain");

  return [
    ...parentMeta,
    {
      title: submissionData
        ? `${formatName(submissionData.user_name)}: Solução de ${
            submissionData.challenge_name
          }`
        : `Submissão não encontrada`,
    },
    {
      name: "description",
      content: submissionData
        ? `Essa é a solução proposta por ${formatName(
            submissionData.user_name,
          )} para o Mini Projeto ${submissionData.challenge_name}.`
        : `Página de submissão não encontrada`,
    },
    {
      property: "og:title",
      content: submissionData
        ? `${formatName(submissionData.user_name)}: Solução de ${
            submissionData.challenge_name
          }`
        : `Submissão não encontrada`,
    },
    {
      property: "og:description",
      content: submissionData
        ? `Essa é a solução proposta por ${formatName(
            submissionData.user_name,
          )} para o Mini Projeto ${submissionData.challenge_name}.`
        : `Página de submissão não encontrada`,
    },
    {
      property: "og:image",
      content: submissionData ? submissionData.submission_image_url : null,
    },
    {
      property: "og:url",
      content: `https://codante.io/mini-projetos/${params.slug}/submissoes/${params.username}`,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:title",
      content: submissionData
        ? `${formatName(submissionData.user_name)}: Solução de ${
            submissionData.challenge_name
          }`
        : `Submissão não encontrada`,
    },
    {
      name: "twitter:description",
      content: submissionData
        ? `Essa é a solução proposta por ${formatName(
            submissionData.user_name,
          )} para o Mini Projeto ${submissionData.challenge_name}.`
        : `Página de submissão não encontrada`,
    },
    {
      name: "twitter:image",
      content: submissionData ? submissionData.submission_image_url : null,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:domain",
      content: `codante.io`,
    },
  ];
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { slug: string };
}) {
  let formData = await request.formData();
  let submissionUrl = formData.get("submission_url") as string;

  const intent = formData.get("intent");
  switch (intent) {
    case "updateSubmission":
      return updateChallengeSubmission(request, params.slug, submissionUrl);
  }
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.slug, `params.slug is required`);
  invariant(params.username, `params.username is required`);

  const submissionData = await getSubmissionFromGithubUser(
    params.slug,
    params.username,
  );

  if (!submissionData) return abort404();

  return {
    submissionData,
    params,
  };
};

export default function MySolution() {
  const { params } = useLoaderData<typeof loader>();

  const { challenge, challengeUsers, user } = useOutletContext<{
    challengeUser: ChallengeUser;
    challenge: Challenge;
    challengeUsers: ChallengeUser[];
    user: User;
  }>();

  const submissionUser = challengeUsers.find(
    (challengeUser) => challengeUser.user.github_user === params.username,
  );

  if (!submissionUser) return null;

  const location = `https://codante.io/mini-projetos/${challenge.slug}/submissoes/${submissionUser.user.github_user}`;

  return (
    <div className="container text-center">
      <Headline
        submissionUser={submissionUser}
        challenge={challenge}
        user={user}
      />
      <ShareSection challenge={challenge} location={location} />
      <MainSection
        submissionUser={submissionUser}
        challenge={challenge}
        user={user}
      />
      <SolutionButtonsSection
        challengeUser={submissionUser}
        user={user}
        challengeSlug={challenge.slug}
        sendoToSolutionPage
      />
    </div>
  );
}

function Headline({
  submissionUser,
  challenge,
  user,
}: {
  submissionUser: ChallengeUser;
  challenge: Challenge;
  user: User;
}) {
  const navigate = useNavigate();

  function handleClickLinkedin() {
    if (!submissionUser) return false;
    if (submissionUser?.user.linkedin_user)
      return window.open(
        `https://www.linkedin.com/in/${submissionUser.user.linkedin_user}`,
        "_blank",
      );
    if (user && user.id === submissionUser?.user.id)
      return navigate("/minha-conta#social-section");
    return toast.error(
      `${formatName(
        submissionUser.user.name,
      )} não vinculou sua conta do LinkedIn.`,
    );
  }
  return (
    <section
      id="headline"
      className="flex items-center justify-start gap-5 flex-col sm:flex-row"
    >
      <UserAvatar
        avatar={submissionUser.avatar}
        className="lg:w-32 lg:h-32 sm:w-24 sm:h-24 w-20 h-20"
        showTooltip={false}
      />
      <div className="flex flex-col justify-center items-center sm:items-start gap-1 md:gap-4">
        <div className="flex items-center sm:gap-5">
          <h1
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-lexend cursor-pointer hover:opacity-80 sm:text-start text-center"
            onClick={() => navigate(`/mini-projetos/${challenge.slug}`)}
          >
            {challenge.name}
          </h1>
          {user && user.id === submissionUser.user.id && (
            <EditSection submissionUser={submissionUser} user={user} />
          )}
        </div>
        <section className="flex md:items-center gap-2 md:flex-row flex-col break-words">
          <h2 className="text-sm md:text-xl sm:text-start text-center md:mr-4 flex-1">
            Solução de{" "}
            <span className="text-md md:text-xl font-bold text-brand-500">
              {formatName(submissionUser.user.name)}
            </span>
          </h2>
          <div className="flex items-center gap-4 sm:gap-2 break-words flex-wrap justify-center">
            <a
              href={`https://www.github.com/${submissionUser.user.github_user}`}
              target="_blank"
              className="flex items-center justify-center gap-1 cursor-pointer hover:text-gray-500 text-gray-400 dark:text-gray-500 dark:hover:text-gray-300"
              rel="noreferrer"
            >
              <FaGithub className="text-lg sm:text-xl" />
              <span className="font-light sm:text-base sm:inline text-xs">{`${submissionUser.user.github_user}`}</span>
            </a>
            {submissionUser.user.linkedin_user && (
              <div className="w-1 h-1 rounded-full bg-brand-500 sm:block" />
            )}
            <div
              className="flex items-center justify-center gap-1 cursor-pointer hover:text-gray-500 text-gray-400 dark:text-gray-500 dark:hover:text-gray-300"
              onClick={handleClickLinkedin}
            >
              {!submissionUser.user.linkedin_user &&
                user &&
                user.id === submissionUser.user.id && (
                  <>
                    <FaLinkedin className="text-lg sm:text-xl" />
                    <span className=" font-light sm:text-sm sm:inline text-xs flex items-center">
                      cadastre{" "}
                      <div className="inline-block w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    </span>
                  </>
                )}
              {submissionUser.user.linkedin_user && (
                <>
                  <FaLinkedin className="text-lg sm:text-xl" />
                  <span className=" font-light sm:text-base sm:inline text-xs">
                    {submissionUser.user.linkedin_user}
                  </span>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function ShareSection({
  challenge,
  location,
}: {
  challenge: Challenge;
  location: string;
}) {
  function copyToClipboard() {
    navigator.clipboard.writeText(location);
    toast.success("Link copiado para a área de transferência!");
  }

  return (
    <section
      id="share-section"
      className="dark:text-gray-500 text-gray-400 justify-end mt-10 flex items-center mb-2"
    >
      <h2 className="text-sm sm:inline hidden">Compartilhar</h2>
      <button
        title="Copiar link"
        onClick={copyToClipboard}
        className="rounded-md flex p-1 hover:text-brand-500 hover:opacity-70"
      >
        <HiOutlineLink className="text-lg" />
      </button>
      <LinkedinShareButton url={location} title={challenge.name}>
        <div className="rounded-md flex p-1 hover:text-brand-500 hover:opacity-70">
          <RiLinkedinBoxLine title="Linkedin" className="text-lg" />
        </div>
      </LinkedinShareButton>
      <WhatsappShareButton url={location}>
        <div className="hover:text-brand-500 hover:opacity-70 rounded-md flex p-1">
          <RiWhatsappLine title="WhatsApp" className="text-lg" />
        </div>
      </WhatsappShareButton>
      <TwitterShareButton hashtags={["codante", "front"]} url={location}>
        <div className="hover:text-brand-500 hover:opacity-70 rounded-md flex p-1">
          <RiTwitterXLine title="Twitter" className="text-lg" />
        </div>
      </TwitterShareButton>
    </section>
  );
}

function MainSection({
  submissionUser,
  challenge,
  user,
}: {
  submissionUser: ChallengeUser;
  challenge: Challenge;
  user: User;
}) {
  return (
    <main className="overflow-hidden rounded-xl border-[1.5px] shadow-sm text-gray-800 dark:text-white transition-shadow dark:border-background-600  border-background-200 w-full dark:bg-background-700">
      <div className="">
        <img
          className="cursor-pointer"
          src={submissionUser.submission_image_url}
          alt={`Print Screen da submissão de ${formatName(
            submissionUser.user.name,
          )}`}
          onClick={() => window.open(submissionUser.submission_url, "_blank")}
        />
      </div>
      <footer
        className={
          "flex items-center justify-between gap-4 dark:bg-background-700 px-4 y-2 sm:px-4 sm:py-4"
        }
      >
        <EditSection
          submissionUser={submissionUser}
          user={user}
          visibility="sm:hidden inline"
          size="text-lg"
        />
        <div className="flex items-center">
          <ReactionsButton
            reactions={submissionUser.reactions}
            reactableId={submissionUser.id}
            reactableType="ChallengeUser"
            iconSize="text-2xl"
          />
        </div>
      </footer>
    </main>
  );
}

function EditSection({
  submissionUser,
  user,
  visibility = "hidden sm:inline",
  size = "lg:text-2xl text-xl",
}: {
  submissionUser: ChallengeUser;
  user: User;
  visibility?: string;
  size?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [popSound] = useSound(pop, { volume: 0.3 });

  const actionData = useActionData<typeof action>();

  const transition = useNavigation();
  const status = transition.state;

  let isSuccessfulSubmission =
    status === "idle" && actionData && actionData?.error === undefined;

  function toggleDialog() {
    setIsOpen(!isOpen);
    popSound();
  }

  useEffect(() => {
    if (isSuccessfulSubmission && isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessfulSubmission]);

  return (
    <section>
      {user && submissionUser.user.id === user.id && (
        <section id="edit" className="text-left">
          <FiEdit
            className={classNames(
              "text-gray-300 dark:text-gray-600 dark:hover:text-gray-500 hover:text-gray-400 cursor-pointer",
              visibility,
              size,
            )}
            onClick={toggleDialog}
          />
          <Transition appear show={isOpen}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsOpen(false)}
            >
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background-100 dark:bg-background-800 p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 mb-6"
                      >
                        Editar submissão
                      </Dialog.Title>
                      <div className="mt-2">
                        <Form method="PUT">
                          <div>
                            <label
                              htmlFor="submission_url"
                              className="block text-sm leading-6 text-gray-800 dark:text-white"
                            >
                              Atualize o link do deploy da sua aplicação
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name="submission_url"
                                  defaultValue={submissionUser.submission_url}
                                  id="submission_url"
                                  className="rounded block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-800 dark:text-gray-200 dark:placeholder:text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="https://mp-example.vercel.app/"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-8 flex gap-x-3">
                            <LoadingButton
                              type="submit"
                              className="transition duration-200"
                              status={status}
                              isSuccessfulSubmission={isSuccessfulSubmission}
                              name="intent"
                              value="updateSubmission"
                            >
                              <span className="flex items-center">
                                <SaveIcon className="mr-2 h-4 w-4" />
                                Salvar
                              </span>
                            </LoadingButton>
                            <NewButton
                              type="button"
                              variant={"outline-ghost"}
                              onClick={toggleDialog}
                            >
                              Cancelar
                            </NewButton>
                          </div>
                        </Form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </section>
      )}
    </section>
  );
}
