import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCertificateById } from "~/lib/models/certificates.server";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import Button from "~/components/ui/button";
import CertificatePDF from "~/components/_layouts/certificate-pdf";
import { formatDate } from "~/lib/utils/format-date";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
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

  const location = `https://codante.io/certificados/${certificate.id}`;

  if (!certificate.certifiable_id || certificate.status !== "published") {
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
  function copyToClipboard() {
    navigator.clipboard.writeText(location);
    toast.success("Link copiado para a área de transferência!");
  }
  return (
    <div className="mx-auto flex flex-col items-center mt-10 container">
      <div className="flex items-end justify-end bg-blue-500 w-full"></div>
      <Card
        className="px-8 mx-5 py-5 flex flex-col w-96"
        border="dull"
        rounded="2xl"
      >
        <h1 className="text-lg text-gray-700 dark:text-gray-50 mb-2">
          {certificate.metadata.certifiable_source_name}
        </h1>
        <div className="flex items-center justify-end w-full gap-1">
          <TwitterShareButton hashtags={["codante", "front"]} url={location}>
            <div className="hover:text-brand-500 hover:opacity-70 rounded-md flex p-1">
              <RiTwitterXLine
                title="Twitter"
                className="text-base text-gray-500"
              />
            </div>
          </TwitterShareButton>
          <LinkedinShareButton
            url={location}
            title={certificate.metadata.certifiable_source_name}
            className=""
          >
            <RiLinkedinBoxLine
              title="Linkedin"
              className="text-base text-gray-500"
            />
          </LinkedinShareButton>
          <WhatsappShareButton url={location}>
            <div className="hover:text-brand-500 hover:opacity-70 rounded-md flex p-1">
              <RiWhatsappLine
                title="WhatsApp"
                className="text-base text-gray-500"
              />
            </div>
          </WhatsappShareButton>
        </div>
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
        <Link
          className="cursor-pointer underline sm:text-base text-sm hover:text-gray-600 dark:hover:text-gray-400 text-gray-500 dark:text-gray-500 mb-2 w-fit"
          to={`/mini-projetos/${certificate.metadata.certifiable_slug}/submissoes/${certificate.user.github_user}`}
        >
          Ver submissão
        </Link>

        <Button type="button" onClick={handleButtonClick} className="mt-3">
          {pdfUrl ? "Baixar certificado" : "Preparando download"}
        </Button>
      </Card>
    </div>
  );
}

// function CertificateImage({ certificate }: { certificate: Certificate }) {
//   return (
//     <div className="bg-[#1E2B38] h-96 md:w-[700px] relative rounded">
//       <img
//         src="/img/logobackground.png"
//         alt="Background logo"
//         className="h-full w-full"
//       />
//       <div className="bg-white m-5 text-gray-900 rounded absolute inset-0 flex flex-col">
//         <img
//           src="/img/codante-certificado-logo.png"
//           alt="Codante logo"
//           className="w-32 m-2"
//         />
//         <span className="mx-auto mt-2 font-alexbrush text-4xl">
//           Certificado de conclusão
//         </span>
//         <p className="text-sm mx-8 mt-5">
//           O presente certificado é conferido a
//         </p>
//         <div className="mx-auto w-[50%] text-center mt-5 border-b-[1px] uppercase border-black">
//           <p className="font-robotocondensed">{certificate.user.name}</p>
//         </div>
//         <section className="text-sm mx-8 mt-5">
//           <span>Em reconhecimento pela conclusão do projeto </span>
//           <span className="text-brand-500">
//             {certificate.metadata.certifiable_source_name}{" "}
//           </span>
//           <span>que abordou, de forma prática, </span>
//           <span>
//             {certificate.metadata.tags.length > 1
//               ? "as tecnologias "
//               : "a tecnologia "}
//           </span>
//           {certificate.metadata.tags.map((tag, index) => (
//             <span key={index} className="font-bold">
//               {tag}
//               {index === certificate.metadata.tags.length - 2
//                 ? " e "
//                 : index < certificate.metadata.tags.length - 1
//                 ? ", "
//                 : "."}
//             </span>
//           ))}
//         </section>
//         <section className="justify-between flex mx-32 mt-12">
//           <div className="border-t-[1px] border-black w-32 text-center text-xs pt-1 font-roboto">
//             <span>Icaro Harry</span>
//           </div>
//           <div className="border-t-[1px] border-black w-32 text-center text-xs pt-1 font-roboto">
//             <span>Roberto Cestari</span>
//           </div>
//         </section>
//         <p className="mx-auto text-xs mt-5">
//           {formatDate(certificate.metadata.end_date)}
//         </p>
//       </div>
//     </div>
//   );
// }
