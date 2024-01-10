import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Certificate } from "~/lib/models/certificates.server";
import { getCertificateById } from "~/lib/models/certificates.server";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import Button from "~/components/ui/button";
import CertificatePDF from "~/components/_layouts/certificate-pdf";
import { formatDate } from "~/lib/utils/format-date";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    async function generatePdf() {
      if (!pdfUrl) {
        const blob = await pdf(
          <CertificatePDF
            username={certificate.user.name}
            tags={certificate.metadata.tags}
            title={certificate.metadata.certifiable_source_name}
            date={certificate.metadata.end_date}
          />,
        ).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    }
    generatePdf();
  }, [pdfUrl, certificate]);

  if (!certificate.certifiable_id) {
    return (
      <div className="container">
        <h1 className="mt-10 text-brand-500 font-bold text-xl mb-10 text-center sm:text-start">
          O certificado buscado não é válido.
        </h1>
        <Link
          to="/certificados"
          className="text-gray-500 dark:text-gray:700 flex gap-1 items-center"
        >
          <ArrowLeftIcon className="w-4" />
          Buscar novo certificado
        </Link>
      </div>
    );
  }

  const handleButtonClick = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <div className="container">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Certificado
      </h1>
      <CertificateImage certificate={certificate} />

      <Button type="button" onClick={handleButtonClick}>
        {pdfUrl ? "Download" : "Preparando download"}
      </Button>
    </div>
  );
}

function CertificateImage({ certificate }: { certificate: Certificate }) {
  return (
    <div className="bg-[#1E2B38] h-96 md:w-[700px] relative rounded">
      <img
        src="/img/logobackground.png"
        alt="Background logo"
        className="h-full w-full"
      />
      <div className="bg-white m-5 text-gray-900 rounded absolute inset-0 flex flex-col">
        <img
          src="/img/codante-certificado-logo.png"
          alt="Codante logo"
          className="w-32 m-2"
        />
        <span className="mx-auto mt-2 font-alexbrush text-4xl">
          Certificado de conclusão
        </span>
        <p className="text-sm mx-8 mt-5">
          O presente certificado é conferido a
        </p>
        <div className="mx-auto w-[50%] text-center mt-5 border-b-[1px] uppercase border-black">
          <p className="font-robotocondensed">{certificate.user.name}</p>
        </div>
        <section className="text-sm mx-8 mt-5">
          <span>Em reconhecimento pela conclusão do projeto </span>
          <span className="text-brand-500">
            {certificate.metadata.certifiable_source_name}{" "}
          </span>
          <span>que abordou, de forma prática, </span>
          <span>
            {certificate.metadata.tags.length > 1
              ? "as tecnologias "
              : "a tecnologia "}
          </span>
          {certificate.metadata.tags.map((tag, index) => (
            <span key={index} className="font-bold">
              {tag}
              {index === certificate.metadata.tags.length - 2
                ? " e "
                : index < certificate.metadata.tags.length - 1
                ? ", "
                : "."}
            </span>
          ))}
        </section>
        <section className="justify-between flex mx-32 mt-12">
          <div className="border-t-[1px] border-black w-32 text-center text-xs pt-1 font-roboto">
            <span>Icaro Harry</span>
          </div>
          <div className="border-t-[1px] border-black w-32 text-center text-xs pt-1 font-roboto">
            <span>Roberto Cestari</span>
          </div>
        </section>
        <p className="mx-auto text-xs mt-5">
          {formatDate(certificate.metadata.end_date)}
        </p>
      </div>
    </div>
  );
}
