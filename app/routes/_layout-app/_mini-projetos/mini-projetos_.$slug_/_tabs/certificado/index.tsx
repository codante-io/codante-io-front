import { useLoaderData, useOutletContext } from "@remix-run/react";
import { FaCrown } from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import { Link, json, useActionData, useNavigation } from "react-router-dom";
import RequestCertificateButton from "~/components/features/request-certificate-button";
import {
  type Certificate,
  getCertificateBySlug,
  requestCertificate,
} from "~/lib/models/certificates.server";
import type { ChallengeUser, User } from "~/lib/models/user.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const intent = formData.get("intent");
  switch (intent) {
    case "requestCertificate":
      const certifiableId = formData.get("certifiable_id") as string;
      return requestCertificate(request, "ChallengeUser", certifiableId);
    default:
      return null;
  }
}

export async function loader({
  params,
  request,
}: {
  request: Request;
  params: { slug: string };
}) {
  return json({
    certificate: await getCertificateBySlug(request, params.slug),
  });
}

export default function Certificate() {
  const { certificate } = useLoaderData<typeof loader>();
  const { challengeUsers, user } = useOutletContext<{
    challengeUsers: ChallengeUser[];
    user: User;
  }>();

  let submissionUser: ChallengeUser | undefined;

  if (user) {
    submissionUser = challengeUsers.find(
      (submissionUser) => submissionUser.user.github_user === user.github_user,
    );
  }

  return (
    <div className="container">
      <section>
        <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
          Solicitar certificado
        </h1>
        <p className="text-center md:text-start">
          Para solicitar seu certificado, você precisa{" "}
          <span className="text-brand-500">submeter uma solução</span> do Mini
          Projeto. Após a solicitação, caso o projeto cumpra com os requisitos
          propostos, o certificado ficará disponível.
        </p>
      </section>
      <section className="w-fit mt-10 mx-auto">
        <RequestCertificate
          certificate={certificate}
          user={user}
          submissionUser={submissionUser}
        />
      </section>
    </div>
  );
}

function RequestCertificate({
  user,
  submissionUser,
  certificate,
}: {
  user: User;
  submissionUser?: ChallengeUser; // pode vir undefined
  certificate: Certificate;
}) {
  const actionData = useActionData();
  const transition = useNavigation();
  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && actionData === null;

  if (user && user.is_pro && submissionUser?.submission_url) {
    if (certificate.status === "published") {
      return (
        <a
          href={`/certificados/${certificate.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg bg-gradient-to-r animate-bg from-amber-100 via-amber-200 to-amber-400">
            <PiCertificate className="mr-2 text-gray-700" /> Ver meu Certificado
          </button>
        </a>
      );
    }
    return (
      <div className="text-center">
        <RequestCertificateButton
          isSuccessfulSubmission={isSuccessfulSubmission}
          status={status}
          btnClass="mt-10 mb-2 text-lg"
          challengeUser={submissionUser}
          disabled={certificate.status === "pending"}
        >
          {certificate.status === "pending" ? (
            <span>Certificado solicitado</span>
          ) : (
            <span>Solicitar certificado</span>
          )}
        </RequestCertificateButton>
        {certificate.status === "pending" && (
          <p className="text-center text-gray-400 dark:text-gray-500 mt-5">
            A submissão está em análise e, assim que verificada, o certificado
            estará disponível. O prazo de analise é de até{" "}
            <span className="text-brand-500">3 dias úteis</span>.
          </p>
        )}
      </div>
    );
  }

  if (user && user.is_pro && !submissionUser?.submission_url) {
    return (
      <p className="text-center text-gray-400 dark:text-gray-500">
        Parece que você ainda não submeteu nenhuma solução para esse Mini
        Projeto.
      </p>
    );
  }

  return (
    <Link to="/assine">
      <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg bg-gradient-to-r animate-bg from-amber-100 via-amber-200 to-amber-400">
        <FaCrown className="mr-2 text-amber-400" /> Serviço exclusivo para
        membros
        <b className="ml-1">PRO</b>
      </button>
    </Link>
  );
}
