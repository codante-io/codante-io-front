import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import type { Challenge } from "~/models/challenge.server";
import type { ChallengeUser, User } from "~/models/user.server";
import UserAvatar from "~/components/user-avatar";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ReactionsButton from "~/components/reactions-button";
import { LinkedinShareButton, WhatsappShareButton } from "react-share";
import { useEffect, useState, Fragment } from "react";
import { RiLinkedinBoxLine, RiWhatsappLine } from "react-icons/ri";
import { formatName } from "~/utils/format-name";
import toast from "react-hot-toast";
import { HiOutlineLink } from "react-icons/hi";
import { BsGithub } from "react-icons/bs";
import UpdateSubmissionForm from "../minha-submissao/UpdateSubmissionForm";
import { Transition, Dialog } from "@headlessui/react";
import { updateChallengeSubmission } from "~/models/challenge.server";
import useSound from "use-sound";
import pop from "~/sounds/pop.wav";
import { FiEdit } from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";

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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return {
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

  // console.log(user)

  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  const submissionUser = challengeUsers.find(
    (user) => user.user_github_user === params.username,
  );

  if (!submissionUser)
    return (
      <div className="flex flex-col items-start justify-center h-full container">
        <h1 className="mb-5 text-2xl font-bold dark:text-gray-300 text-gray-800">
          Nenhuma submissão encontrada
        </h1>
        <p className="text-gray-600 dark:text-gray-500">
          Esse usuário ainda não submeteu uma solução para este Mini Projeto.
        </p>
      </div>
    );

  return (
    <div className="container text-center">
      <Headline
        submissionUser={submissionUser}
        challenge={challenge}
        user={user}
      />
      <ShareSection challenge={challenge} location={location} />
      <MainSection submissionUser={submissionUser} challenge={challenge} />
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

  function getLinkedinUsername(url: string) {
    const prefixo = "https://www.linkedin.com/in/";
    if (url.startsWith(prefixo)) {
      return url.substring(prefixo.length);
    } else {
      return null;
    }
  }

  function handleClickLinkedin() {
    if (!submissionUser) return false;
    if (submissionUser?.linkedin_url)
      return window.open(submissionUser.linkedin_url, "_blank");
    if (user && user.id === submissionUser?.user_id)
      return navigate("/minha-conta");
    return toast.error(
      `${formatName(
        submissionUser.user_name,
      )} não vinculou sua conta do LinkedIn.`,
    );
  }
  return (
    <section id="headline" className="flex items-center justify-start gap-5">
      <UserAvatar
        avatar={submissionUser.avatar}
        className="lg:w-32 lg:h-32 sm:w-24 sm:h-24 w-20 h-20"
        showTooltip={false}
      />
      <div className="flex flex-col justify-center items-start gap-1 md:gap-4">
        <div className="flex items-center gap-5">
          <h1
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-lexend cursor-pointer hover:opacity-80 text-start"
            onClick={() => navigate(`/mini-projetos/${challenge.slug}`)}
          >
            {challenge.name}
          </h1>
          {user && user.id === submissionUser.user_id && (
            <EditSection submissionUser={submissionUser} user={user} />
          )}
        </div>
        <section className="flex md:items-center gap-2 md:flex-row flex-col break-words">
          <h2 className="text-md md:text-xl text-start">
            Solução de{" "}
            <span className="md:text-xl font-bold text-brand-500">
              {formatName(submissionUser.user_name)}
            </span>
          </h2>
          <div className="flex items-center gap-2 break-words flex-wrap">
            <div
              className="flex items-center justify-center gap-1 cursor-pointer hover:text-gray-500 text-gray-400 dark:text-gray-500 dark:hover:text-gray-300"
              onClick={handleClickLinkedin}
            >
              {!submissionUser.linkedin_url &&
                user &&
                user.id === submissionUser.user_id && (
                  <>
                    <RiLinkedinBoxLine className="text-xl" />
                    <span className="font-light md:text-base md:inline text-sm">
                      (Cadastrar!)
                    </span>
                  </>
                )}
              {submissionUser.linkedin_url && (
                <>
                  <FaLinkedin className="text-xl" />
                  <span className="font-light md:text-base md:inline text-sm">{`@${getLinkedinUsername(
                    submissionUser.linkedin_url,
                  )}`}</span>
                </>
              )}
            </div>
            {submissionUser.linkedin_url && (
              <div className="w-1 h-1 rounded-full bg-brand-500 sm:block hidden" />
            )}
            <div
              className="flex items-center justify-center gap-1 cursor-pointer hover:text-gray-500 text-gray-400 dark:text-gray-500 dark:hover:text-gray-300"
              onClick={() =>
                window.open(
                  `https://www.github.com/${submissionUser.user_github_user}`,
                  "_blank",
                )
              }
            >
              <FaGithub className="text-xl" />
              <span className="font-light md:text-base md:inline text-sm">{`@${submissionUser.user_github_user}`}</span>
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
    </section>
  );
}

function MainSection({
  submissionUser,
  challenge,
}: {
  submissionUser: ChallengeUser;
  challenge: Challenge;
}) {
  const navigate = useNavigate();

  return (
    <main className="overflow-hidden rounded-xl border-[1.5px] shadow-sm text-gray-800 dark:text-white transition-shadow dark:border-background-600  border-background-200 w-full dark:bg-background-700">
      <div className="">
        <img
          className="cursor-pointer"
          src={submissionUser.submission_image_url}
          alt={`Print Screen da submissão de ${formatName(
            submissionUser.user_name,
          )}`}
          onClick={() => window.open(submissionUser.submission_url, "_blank")}
        />
      </div>
      <footer
        className={
          "flex items-center justify-between gap-4 dark:bg-background-700 px-4 y-2 sm:px-4 sm:py-4"
        }
      >
        <section className="flex gap-8">
          <div
            className="flex items-center cursor-pointer gap-1 hover:opacity-70"
            onClick={() => {
              if (submissionUser.is_solution) {
                return navigate(
                  `/mini-projetos/${challenge.slug}/resolucao-codigo`,
                );
              }
              window.open(submissionUser.fork_url as string, "_blank");
            }}
          >
            <BsGithub className="text-lg" />
            <h3 className="font-light sm:inline hidden">Código</h3>
          </div>
          <div
            className="flex items-center cursor-pointer gap-1 hover:opacity-70"
            onClick={() => {
              if (submissionUser.is_solution) {
                return navigate(
                  `/mini-projetos/${challenge.slug}/resolucao-codigo`,
                );
              }
              window.open(submissionUser.submission_url, "_blank");
            }}
          >
            <CiGlobe className="text-lg" />
            <h3 className="font-light sm:inline hidden">Deploy</h3>
          </div>
        </section>
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
}: {
  submissionUser: ChallengeUser;
  user: User;
}) {
  const [showEditFormState, setShowEditFormState] = useState(false);
  const [popSound] = useSound(pop, { volume: 0.3 });

  function toggleShowEditForm() {
    setShowEditFormState(!showEditFormState);
    popSound();
  }

  return (
    <>
      {user && submissionUser.user_id === user.id && (
        <section id="edit" className="text-left">
          <FiEdit
            className="text-gray-400 dark:text-gray-500 hover:opacity-70 cursor-pointer sm:inline hidden"
            onClick={toggleShowEditForm}
          />
          <Transition appear show={showEditFormState}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowEditFormState(false)}
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
                        <UpdateSubmissionForm
                          showEditForm={toggleShowEditForm}
                          challengeUser={submissionUser}
                        />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </section>
      )}
    </>
  );
}
