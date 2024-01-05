import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCertificateById } from "~/lib/models/certificates.server";

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  return json({
    certificate: await getCertificateById(request, params.id),
  });
}

export default function CertificadoId() {
  const { certificate } = useLoaderData<typeof loader>();
  console.log(certificate)
  return (
    <div className="container">
      <h1>Certificado id</h1>
    </div>
  );
}
