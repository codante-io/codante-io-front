import { useLoaderData, useOutletContext } from "@remix-run/react";
import { FaCrown } from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import { Link, json, useActionData, useNavigation } from "react-router-dom";
import RequestCertificateButton from "~/components/request-certificate-button";
import type { Certificate } from "~/models/certificates.server";
import {
  getCertificates,
  requestCertificate,
} from "~/models/certificates.server";
import type { Challenge } from "~/models/challenge.server";
import type { ChallengeUser, User } from "~/models/user.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const intent = formData.get("intent");
  switch (intent) {
    case "requestCertificate":
      const user_id = formData.get("user_id");
      const source_type = formData.get("source_type");
      const source_id = formData.get("source_id");
      const certificateInfo = {
        user_id,
        source_type,
        source_id,
      } as Certificate;
      return requestCertificate(request, certificateInfo);
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
    certificates: await getCertificates(request, "challenge", params.slug),
  });
}

export default function Certificate() {
  const { certificates } = useLoaderData<typeof loader>();
  const { challenge, challengeUsers, user } = useOutletContext<{
    challenge: Challenge;
    challengeUsers: ChallengeUser[];
    user: User;
  }>();

  let submissionUser: ChallengeUser | undefined;

  if (user) {
    submissionUser = challengeUsers.find(
      (submissionUser) => submissionUser.user_github_user === user.github_user,
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
          certificates={certificates}
          user={user}
          submissionUser={submissionUser}
          challenge={challenge}
        />
      </section>
    </div>
  );
}

function RequestCertificate({
  user,
  submissionUser,
  challenge,
  certificates,
}: {
  user: User;
  submissionUser?: ChallengeUser; // pode vir undefined
  challenge: Challenge;
  certificates: Certificate[];
}) {
  const actionData = useActionData();
  const transition = useNavigation();
  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && actionData === null;

  if (user && user.is_pro && submissionUser?.submission_url) {
    const pendingCertificate = certificates.find(
      (certificate) => certificate.status === "pending",
    );
    const publishedCertificate = certificates.find(
      (certificate) => certificate.status === "published",
    );

    if (publishedCertificate) {
      return (
        <Link to={`/certificados/${publishedCertificate.id}`}>
          <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg bg-gradient-to-r animate-bg from-amber-100 via-amber-200 to-amber-400">
            <PiCertificate className="mr-2 text-gray-700" /> Ver meu Certificado
          </button>
        </Link>
      );
    }
    return (
      <RequestCertificateButton
        isSuccessfulSubmission={isSuccessfulSubmission}
        status={status}
        btnClass="mt-10 mb-2 text-lg"
        challengeUser={submissionUser}
        sourceType="challenge"
        sourceId={challenge.id}
        disabled={pendingCertificate ? true : false}
      >
        {pendingCertificate ? (
          <span>Certificado solicitado</span>
        ) : (
          <span>Solicitar certificado</span>
        )}
      </RequestCertificateButton>
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
