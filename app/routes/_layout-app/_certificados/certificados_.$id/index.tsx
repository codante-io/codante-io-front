import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCertificateById } from "~/lib/models/certificates.server";
import { pdf } from '@react-pdf/renderer';
import { useEffect, useState } from "react";
import Button from "~/components/ui/button";
import CertificatePDF from "~/components/_layouts/certificate";

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    async function generatePdf() {
      if (!pdfUrl) {
        const blob = await pdf(
          <CertificatePDF
            username={certificate.username}
            tags={certificate.metadata[0].tags}
            title={certificate.metadata[0].source_name}
            date={certificate.metadata[0].conclusion_date}
          />)
          .toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    };
    generatePdf();
  }, [pdfUrl, certificate]);

  const handleButtonClick = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="container">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Certificado
      </h1>
      <Button
        type="button"
        onClick={handleButtonClick}
      >
        {pdfUrl ? "Download" : "Preparando download"}
      </Button>
    </div>
  );
}