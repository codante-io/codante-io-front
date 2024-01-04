import TitleIcon from "~/components/ui/title-icon";
import {
  FaGithub,
  FaLinkedinIn,
  FaRegCalendar,
  FaRegFileCode,
} from "react-icons/fa";
import { HiUsers, HiMap } from "react-icons/hi";
import type { Assessment } from "~/lib/models/assessments.server";
import { getAssessment } from "~/lib/models/assessments.server";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { MdLocationCity } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import AdminEditButton from "~/components/features/admin-edit-button/AdminEditButton";
import { abort404 } from "~/lib/utils/responses.server";
import NotFound from "~/components/features/error-handling/not-found";
import { Error500 } from "~/components/features/error-handling/500";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const meta = ({ data, params }: any) => {
  // para não quebrar se não houver teste técnico ainda.
  if (!data?.assessment) {
    return [{}];
  }

  const title = `Teste técnico: ${data.assessment.title} | Codante.io`;
  const description = `Teste técnico ${data.assessment.title}. Vaga ${data.assessment.type}`;
  const imageUrl = getOgGeneratorUrl(data.assessment.title, "Testes técnicos");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/testes-tecnicos/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/testes-tecnicos/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.assessment.title },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return <Error500 error={error} />;
}

export const loader = async ({
  request,
  params,
}: {
  request: Request;
  params: { slug: string };
}) => {
  const assessment = await getAssessment(params.slug);

  if (!assessment) {
    return abort404();
  }

  return {
    assessment,
  };
};

export default function TestesTecnicosSlugPage() {
  const loaderData = useLoaderData<typeof loader>();
  const assessment = loaderData?.assessment;
  const { colorMode } = useColorMode();

  return (
    <div className="container md:grid md:grid-cols-[120px,1fr] lg:grid-cols-[250px,1fr] mx-auto relative">
      <div className="hidden md:flex sticky w-24 h-24 lg:w-48 lg:h-48 rounded-lg top-4 shadow-lg overflow-hidden dark:bg-background-800 bg-white dark:border-[1.5px] border-background-200 dark:border-background-700 items-center justify-center">
        <img
          src={
            colorMode === "dark"
              ? assessment.image_url_dark ?? assessment.image_url
              : assessment.image_url
          }
          alt=""
          className="w-4/5 rounded-lg"
        />
      </div>
      <div>
        <header className="flex items-start justify-start gap-6 mb-12 rounded-2xl p-6 lg:gap-6 shadow dark:bg-background-800 bg-white dark:border-[1.5px] border border-background-100 dark:border-background-700">
          <div className="flex flex-col flex-1 gap-6">
            <div className="">
              <p>
                Teste Técnico{" "}
                {(assessment.type === "frontend" ||
                  assessment.type === "fullstack") && (
                  <span className="font-bold text-brand">Frontend</span>
                )}
                {assessment.type === "fullstack" && " | "}
                {(assessment.type === "backend" ||
                  assessment.type === "fullstack") && (
                  <span className="font-bold text-yellow-400">Backend</span>
                )}
              </p>
              <h1 className="text-3xl text-gray-700 dark:text-white lg:text-4xl font-lexend">
                {assessment.title}
              </h1>
            </div>
            <IconsList assessment={assessment} />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {assessment.company_description}
            </p>
          </div>
        </header>
        <main className="">
          <AdminEditButton
            url={`/technical-assessment/${assessment.id}/edit`}
          />
          {assessment.status === "outdated" && (
            <OutdatedAlert assessment={assessment} />
          )}
          <section className="mt-12">
            <SecondaryTitle text="Sobre o Teste" />
            <p className="font-light text-gray-600 dark:text-gray-300">
              {assessment.assessment_description}
            </p>
          </section>
          <section className="mt-12">
            <SecondaryTitle text="Instruções do Teste" />
            <div className="mb-8 text-gray-500 dark:text-gray-400">
              <div className="mb-3">
                {assessment.assessment_instructions_url && (
                  <div className="flex items-center gap-2 mb-1 ">
                    <FiExternalLink className="text-brand" />
                    <a
                      target="_blank"
                      href={assessment.assessment_instructions_url}
                      className="text-sm hover:underline"
                      rel="noreferrer"
                    >
                      <p>Link para o teste técnico original</p>
                    </a>
                  </div>
                )}
                {assessment.zipped_files_url && (
                  <div className="flex items-center gap-2 mb-1 ">
                    <FiDownload className="text-brand" />
                    <a
                      target="_blank"
                      href={assessment.zipped_files_url}
                      className="text-sm hover:underline"
                      rel="noreferrer"
                    >
                      <p>Baixar Arquivos do Teste Técnico</p>
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className=" dark:bg-background-800 rounded-xl shadow bg-white border-[1.5px] border-background-100 dark:border-background-700">
              <div className="p-4 lg:py-6 lg:px-16 dark:prose-headings:text-gray-300 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-8 prose-h1:mt-2 lg:prose-h1:mt-4 max-w-none">
                <MarkdownRenderer
                  markdown={assessment.assessment_instructions_text ?? ""}
                  wrapperClasses="max-w-none"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SecondaryTitle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-4 text-xl font-bold font-lexend">
      <TitleIcon className="hidden w-5 h-5 lg:h-5 lg:w-5 md:inline-block" />
      <h3 className="text-gray-700 dark:text-gray-300">{text}</h3>
    </div>
  );
}

function HeaderItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text?: string;
  href?: string;
}) {
  if (!text) return null;
  if (href) {
    return (
      <div className="flex items-center gap-2 mb-2 overflow-hidden md:gap-4">
        <div className="">{icon}</div>
        <a
          target="_blank"
          className="flex items-center gap-2 text-xs md:text-sm hover:underline"
          href={href}
          rel="noreferrer"
        >
          {text}
          <FiExternalLink
            strokeWidth={1.5}
            className="text-xs font-thin text-gray-400 dark:text-gray-600 "
          />
        </a>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 mb-2 md:gap-4">
      <div className="">{icon}</div>

      <p className="text-xs md:text-sm">{text}</p>
    </div>
  );
}

function IconsList({ assessment }: { assessment: Assessment }) {
  return (
    <div className="text-gray-500 columns-1 sm:columns-2 lg:columns-3 gap-y-10 dark:text-gray-400">
      {assessment.assessment_year && (
        <HeaderItem
          icon={<FaRegCalendar />}
          text={assessment.assessment_year}
        />
      )}
      {assessment.tags?.length && assessment.tags.length > 0 ? (
        <HeaderItem
          icon={<FaRegFileCode />}
          text={assessment.tags?.join(", ")}
        />
      ) : null}
      {assessment.company_headquarters && (
        <HeaderItem icon={<HiMap />} text={assessment.company_headquarters} />
      )}
      {assessment.company_industry && (
        <HeaderItem
          icon={<MdLocationCity />}
          text={assessment.company_industry}
        />
      )}
      {assessment.company_size && (
        <HeaderItem icon={<HiUsers />} text={assessment.company_size} />
      )}
      {assessment.company_linkedin && (
        <HeaderItem
          icon={<FaLinkedinIn />}
          text={assessment.company_linkedin
            ?.replace("https://", "")
            .replace("www.", "")
            .replace("linkedin.com/company", "")}
          href={assessment.company_linkedin}
        />
      )}
      {assessment.company_github && (
        <HeaderItem
          icon={<FaGithub />}
          text={assessment.company_github
            ?.replace("https://", "")
            .replace("www.", "")
            .replace("github.com", "")}
          href={assessment.company_github}
        />
      )}
      {assessment.company_website && (
        <HeaderItem
          icon={<TbWorld />}
          text={assessment.company_website
            ?.replace("https://", "")
            .replace("www.", "")}
          href={assessment.company_website}
        />
      )}
    </div>
  );
}

function OutdatedAlert({ assessment }: { assessment: Assessment }) {
  return (
    <div className="p-4 border border-l-4 border-yellow-400 rounded-lg bg-yellow-50 dark:bg-background-800">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="w-5 h-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-100">
            Teste técnico desatualizado
          </h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
            <p>
              Um ou mais links de referência deste teste técnico podem não estar
              funcionando. Use-o apenas como referência.
            </p>
            {assessment.outdated_details && (
              <p className="mt-1">
                <span className="font-bold">Detalhes adicionais:</span>{" "}
                {assessment.outdated_details}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
