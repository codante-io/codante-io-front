import { Form, Link } from "react-router";
import { Check, Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useFetcher } from "react-router";
import { Card } from "~/components/ui/cards/card";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import type { ChallengeUser } from "~/lib/models/user.server";
import { PiCertificateLight } from "react-icons/pi";
import { Button } from "~/components/ui/button";

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
        fetcher.submit(
          { intent: "requestCertificate", certifiable_id },
          { method: "post" },
        );
        setTimeout(() => {
          return toast.success("Certificado solicitado.");
        }, 1000);
      } else {
        toast((t) => (
          <div
            onClick={() => toast.dismiss(t.id)}
            className="flex flex-col gap-2"
          >
            <p>
              Apenas membros <ProSpanWrapper>PRO</ProSpanWrapper> podem
              solicitar certificados.
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
            className="flex flex-row items-center gap-5"
          >
            <Check className="text-green-400 w-10" />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold flex">
                O certificado foi solicitado e a submissão está sendo avaliada!
              </p>
              <p className="text-sm">A análise pode levar até 3 dias úteis.</p>
            </div>
          </div>
        ));
      }
    };
    return (
      <Card
        as="aside"
        className={`${className} relative w-full rounded-lg font-inter`}
      >
        <div className="border-l-8 border-green-400 h-full w-full p-4 py-6 flex gap-5">
          <img src="/img/trophy.svg" alt="Projeto concluído" />
          <section className="flex flex-col gap-1">
            <p className="text-green-400 font-bold">Finalizado</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Você completou esse Mini Projeto!
            </p>
            {!challengeUser.certificate && (
              <Form replace method="post">
                <Button
                  onClick={handleSubmitButton}
                  type="submit"
                  variant={"link"}
                  disabled={isLoading}
                  className={`text-xs dark:text-gray-500 text-gray-400 pl-0 mt-2 h-fit ${
                    isLoading ? "cursor-wait" : ""
                  }`}
                >
                  Solicitar certificado
                </Button>
              </Form>
            )}
            {challengeUser.certificate && (
              <Button
                asChild
                className="text-xs inline dark:text-gray-500 text-gray-400 pl-0 mt-2 h-fit"
                variant={"link"}
              >
                <Link
                  to={`/certificados/${challengeUser.certificate.id}`}
                  onClick={(event) => handleLinkClick(event)}
                >
                  {challengeUser.certificate.status === "published" ? (
                    <span className="flex items-center gap-2">
                      <PiCertificateLight className="text-lg" />
                      Certificado
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Clock className="w-3 h-3 inline" /> Certificado
                      solicitado
                    </span>
                  )}
                </Link>
              </Button>
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
      <div className="border-l-8 border-amber-400 h-full w-full p-4 py-6 flex gap-5">
        <img src="/img/wip.svg" alt="Projeto em andamento" />
        <section className="flex flex-col gap-1">
          <p className="text-amber-400 font-bold">Em andamento</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Você ainda não finalizou esse projeto
          </p>
        </section>
      </div>
    </Card>
  );
}
