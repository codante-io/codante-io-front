import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { Card } from "~/components/ui/cards/card";
import { NewButton } from "~/components/ui/new-button";
import type { ChallengeSummary } from "~/lib/models/challenge.server";
import { environment } from "~/lib/models/environment.server";
import { ComboboxDemo } from "~/routes/_layout-app/_admin/admin-panel/emails/combobox";

export async function loader() {
  const res = await axios.get<{ data: ChallengeSummary[] }>(
    environment().API_HOST + "/challenges-summary",
  );
  const data = res.data.data;

  return { challenges: data };
}

export default function Emails() {
  const { challenges } = useLoaderData<typeof loader>();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    alert(data);
  }

  return (
    <>
      <h2 className="text-2xl text-center">Emails</h2>

      <Card className="p-6 max-w-lg mx-auto mt-10">
        <h3 className="text-lg">Email avisando que há resolução disponível</h3>
        <p className="text-gray-400 text-sm">
          Envia email para todos os participantes do Mini Projeto. Em breve,
          marcará nos metadados do projeto que o email foi enviado.
        </p>
        <hr className="my-4" />

        <form onSubmit={handleSubmit} action="">
          <ComboboxDemo challenges={challenges} />
          <NewButton className="mt-4">Enviar Email</NewButton>
        </form>
      </Card>
    </>
  );
}
