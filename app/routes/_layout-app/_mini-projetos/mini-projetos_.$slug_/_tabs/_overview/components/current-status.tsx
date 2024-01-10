import { Form, Link } from "@remix-run/react";
import toast from "react-hot-toast";
import { useFetcher } from "react-router-dom";
import { Card } from "~/components/ui/cards/card";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import type { ChallengeUser } from "~/lib/models/user.server";

export default function CurrentStatus({
  challengeUser,
}: {
  challengeUser: ChallengeUser;
}) {
  const fetcher = useFetcher();

  if (challengeUser.completed) {
    function handleSubmitButton() {
      if (challengeUser.user.is_pro) {
        const certifiable_id = challengeUser.id;
        return fetcher.submit(
          { intent: "requestCertificate", certifiable_id },
          { method: "post" },
        );
      }
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p>
            Certificado é uma exclusividade de membros{" "}
            <ProSpanWrapper>PRO</ProSpanWrapper>
          </p>
          <Link
            to="/assine"
            className="underline dark:text-gray-500 text-gray-400 text-sm"
          >
            Ver planos
          </Link>
        </div>
      ));
    }
    return (
      <Card as="aside" className={`relative w-full rounded-lg font-inter`}>
        <div className="border-l-[10px] border-green-400 h-full w-full p-4 flex gap-5">
          <img src="/img/trophy.svg" alt="Projeto concluído" />
          <section className="flex flex-col gap-1">
            <p className="text-green-400 text-lg">Finalizado</p>
            <p className="text-sm">Você completou esse Mini Projeto</p>
            <Form replace method="post">
              <button
                onClick={handleSubmitButton}
                type="submit"
                className="w-fit mt-2 text-sm underline dark:text-gray-500 text-gray-400 cursor-pointer hover:opacity-80"
              >
                Solicitar certificado
              </button>
            </Form>
          </section>
        </div>
      </Card>
    );
  }

  return (
    <Card as="aside" className={`relative w-full rounded-lg font-inter`}>
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
