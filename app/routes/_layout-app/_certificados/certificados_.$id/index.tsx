import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCertificateById } from "~/lib/models/certificates.server";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import Button from "~/components/ui/button";
import CertificatePDF from "~/components/_layouts/certificate-pdf";
import { formatDate } from "~/lib/utils/format-date";
import { Card } from "~/components/ui/cards/card";
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiWhatsappLine,
} from "react-icons/ri";
import toast from "react-hot-toast";
import { IoCopySharp } from "react-icons/io5";
import SearchCertificate from "../components/search-certificate";

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  return json({
    certificate: await getCertificateById(params.id),
  });
}

export default function CertificadoId() {
  const { certificate } = useLoaderData<typeof loader>();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const location = `https://codante.io/certificados/${certificate.id}`;

  const source_type = certificate.certifiable_type.includes("WorkshopUser")
    ? "WorkshopUser"
    : "ChallengeUser";

  useEffect(() => {
    async function generatePdf() {
      if (!pdfUrl) {
        const blob = await pdf(
          <CertificatePDF
            username={certificate.user.name}
            metadata={certificate.metadata}
            certifiableType={source_type}
            certifiable={certificate.certifiable}
            validationLink={location}
            createdAt={certificate.created_at}
            id={certificate.id}
          />,
        ).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    }
    generatePdf();
  }, [pdfUrl, certificate, location, source_type]);

  if (!certificate.certifiable_id || certificate.status !== "published") {
    return (
      <div className="mx-auto flex justify-center mt-10">
        <SearchCertificate error />
      </div>
    );
  }

  const handleButtonClick = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };
  function copyToClipboard() {
    navigator.clipboard.writeText(location);
    toast.success("Link copiado para a área de transferência!");
  }
  return (
    <div className="mx-auto flex flex-col items-center mt-10 container">
      <div className="flex flex-col items-end justify-end w-fit">
        <Card
          className="px-8 mx-2 py-5 flex flex-col w-full sm:w-96"
          border="dull"
          rounded="2xl"
        >
          <h1 className="text-lg text-gray-700 dark:text-gray-50 mb-2">
            {certificate.metadata.certifiable_source_name}
          </h1>
          <p className="text-gray-500 sm:text-base text-sm mb-2">
            Conferido a:{" "}
            <span className="text-gray-600 dark:text-gray-400">
              {certificate.user.name}
            </span>
          </p>
          <p className="text-gray-500 sm:text-base text-sm mb-2">
            Finalizado em:{" "}
            <span className="text-gray-600 dark:text-gray-400">
              {formatDate(certificate.metadata.end_date)}
            </span>
          </p>
          <p className="text-gray-500 sm:text-base text-sm mb-2 gap-1 flex">
            Verificador:{" "}
            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              {certificate.id}
              <IoCopySharp
                className="text-xs cursor-pointer text-gray-400 dark:text-gray-700"
                onClick={copyToClipboard}
              />
            </span>
          </p>

          <div className="text-gray-500 sm:text-base text-sm mb-2 gap-1 flex">
            Compartilhar:{" "}
            <div className="flex items-center justify-start w-full gap-1">
              <TwitterShareButton
                hashtags={["codante", "front"]}
                url={location}
              >
                <div className="hover:text-brand-500 hover:opacity-70 rounded-md flex p-1">
                  <RiTwitterXLine
                    title="Twitter"
                    className="text-base text-gray-600 dark:text-gray-400"
                  />
                </div>
              </TwitterShareButton>
              <LinkedinShareButton
                url={location}
                title={certificate.metadata.certifiable_source_name}
                className=""
              >
                <div className="hover:text-brand-500 hover:opacity-70 rounded-md flex p-1">
                  <RiLinkedinBoxLine
                    title="Linkedin"
                    className="text-lg text-gray-600 dark:text-gray-400"
                  />
                </div>
              </LinkedinShareButton>
              <WhatsappShareButton url={location}>
                <div className="hover:text-brand-500 hover:opacity-70 rounded-md flex p-1">
                  <RiWhatsappLine
                    title="WhatsApp"
                    className="text-lg text-gray-600 dark:text-gray-400"
                  />
                </div>
              </WhatsappShareButton>
            </div>
          </div>

          {source_type === "WorkshopUser" && (
            <Link
              className="cursor-pointer underline sm:text-base text-sm hover:text-gray-600 dark:hover:text-gray-400 text-gray-500 dark:text-gray-500 mb-2 w-fit"
              to={`/workshops/${certificate.metadata.certifiable_slug}`}
            >
              Ver Workshop
            </Link>
          )}

          {source_type === "ChallengeUser" && (
            <Link
              className="cursor-pointer underline sm:text-base text-sm hover:text-gray-600 dark:hover:text-gray-400 text-gray-500 dark:text-gray-500 mb-2 w-fit"
              to={`/mini-projetos/${certificate.metadata.certifiable_slug}/submissoes/${certificate.user.github_user}`}
            >
              Ver submissão
            </Link>
          )}

          <Button type="button" onClick={handleButtonClick} className="mt-3">
            {pdfUrl ? "Baixar certificado" : "Preparando download"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
