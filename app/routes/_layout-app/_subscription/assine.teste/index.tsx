import type { LoaderArgs } from "@remix-run/node";

export function loader({ request }: LoaderArgs) {
  return new Response(JSON.stringify({ lala: "land" }), {
    status: 302,
    headers: { Location: "/assine/sucesso" },
  });
}

export default function AssineSucesso({ request }: { request: Request }) {
  return (
    <main className="container mx-auto ">
      <h1 className="mb-10 text-4xl text-center font-lexend">redirect</h1>
    </main>
  );
}
