import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useFetcher } from "react-router-dom";
import { Card } from "~/components/ui/cards/card";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import type { ChallengeUser } from "~/lib/models/user.server";

export default function CurrentStatus({
  challengeUser,
  className,
}: {
  challengeUser: ChallengeUser;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = useFetcher();

  if (challengeUser.completed) {
    function handleSubmitButton() {
      if (challengeUser.user.is_pro) {
        setIsLoading(true);
        const certifiable_id = challengeUser.id;
        return fetcher.submit(
          { intent: "requestCertificate", certifiable_id },
          { method: "post" },
        );
      }
      toast((t) => (
        <div
          onClick={() => toast.dismiss(t.id)}
          className="flex flex-col gap-2"
        >
          <p>
            Apenas membros <ProSpanWrapper>PRO</ProSpanWrapper> podem solicitar
            certificados.
          </p>
          <Link
            to="/assine"
            className="w-fit underline dark:text-gray-500 text-gray-400 text-sm"
          >
            Ver planos
          </Link>
        </div>
      ));
    }

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (challengeUser.certificate?.status === "published") {
        const win = window.open(
          `/certificados/${challengeUser.certificate.id}`,
          "_blank",
        );
        win?.focus();
      } else {
        toast((t) => (
          <div
            onClick={() => toast.dismiss(t.id)}
            className="flex flex-col gap-2"
          >
            <p className="text-sm font-semibold">
              Seu certificado foi solicitado e sua submissão está sendo
              avaliada!
            </p>
            <p className="text-sm">A análise pode levar até 3 dias úteis.</p>
          </div>
        ));
      }
    };
    return (
      <Card
        as="aside"
        className={`${className} relative w-full rounded-lg font-inter`}
      >
        <div className="border-l-[10px] border-green-400 h-full w-full p-4 flex gap-5">
          <img src="/img/trophy.svg" alt="Projeto concluído" />
          <section className="flex flex-col gap-1">
            <p className="text-green-400 text-lg">Finalizado</p>
            <p className="text-sm">Você completou esse Mini Projeto</p>
            {!challengeUser.certificate && (
              <Form replace method="post">
                <button
                  onClick={handleSubmitButton}
                  type="submit"
                  disabled={isLoading}
                  className={`w-fit mt-2 text-sm underline dark:text-gray-500 text-gray-400 cursor-pointer hover:opacity-80 ${
                    isLoading ? "cursor-wait" : ""
                  }`}
                >
                  Solicitar certificado
                </button>
              </Form>
            )}
            {challengeUser.certificate && (
              <Link
                to={`/certificados/${challengeUser.certificate.id}`}
                className="w-fit mt-2 text-sm underline dark:text-gray-500 text-gray-400 cursor-pointer hover:opacity-80"
                onClick={(event) => handleLinkClick(event)}
              >
                {challengeUser.certificate.status === "published"
                  ? "Ver certificado"
                  : "Certificado solicitado"}
              </Link>
            )}
          </section>
        </div>
      </Card>
    );
  }

  return (
    <Card
      as="aside"
      className={`${className} relative w-full rounded-lg font-inter`}
    >
      <div className="border-l-[10px] border-amber-400 h-full w-full p-4 flex gap-5">
        <img src="/img/wip.svg" alt="Projeto em andamento" />
        <section className="flex flex-col gap-1">
          <p className="text-amber-400 text-lg">Projeto em andamento</p>
          <p className="text-sm">Você ainda não finalizou esse projeto</p>
        </section>
      </div>
    </Card>
  );
}
