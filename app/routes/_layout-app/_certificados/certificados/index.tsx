import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCertificates } from "~/lib/models/certificates.server";

export async function loader({
  request,
}: {
  request: Request;
}) {
  return json({
    certificates: await getCertificates(request),
  });
}

export default function Certificate() {
  const { certificates } = useLoaderData<typeof loader>();
  console.log(certificates)
  return (
    <div className="container">
      <h1>Certificado</h1>
    </div>
  );
}
