import TitleIcon from "~/components/title-icon";
import {
  FaGithub,
  FaLinkedinIn,
  FaRegCalendar,
  FaRegFileCode,
} from "react-icons/fa";
import { HiUsers, HiMap } from "react-icons/hi";
import { json } from "@remix-run/node";
import { getAssessment } from "~/models/assessments.server";
import { useLoaderData } from "@remix-run/react";
import { MdLocationCity } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import MarkdownRenderer from "~/components/markdown-renderer";
import { useColorMode } from "~/contexts/color-mode-context";
import { FiExternalLink } from "react-icons/fi";

export const loader = async ({
  request,
  params,
}: {
  request: Request;
  params: { slug: string };
}) => {
  return json({
    assessment: await getAssessment(params.slug),
  });
};

export default function TestesTecnicosSlugPage() {
  const { assessment } = useLoaderData<typeof loader>();
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
          className="w-4/5"
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
            <div className="text-gray-500 columns-1 sm:columns-2 lg:columns-3 gap-y-10 dark:text-gray-400">
              <HeaderItem
                icon={<FaRegCalendar />}
                text={assessment.assessment_year}
              />
              <HeaderItem
                icon={<FaRegFileCode />}
                text={assessment.tags?.join(", ")}
              />
              <HeaderItem
                icon={<HiMap />}
                text={assessment.company_headquarters}
              />

              <HeaderItem
                icon={<MdLocationCity />}
                text={assessment.company_industry}
              />
              <HeaderItem icon={<HiUsers />} text={assessment.company_size} />
              <HeaderItem
                icon={<FaLinkedinIn />}
                text={assessment.company_linkedin
                  ?.replace("https://", "")
                  .replace("www.", "")
                  .replace("linkedin.com/company", "")}
                href={assessment.company_linkedin}
              />

              <HeaderItem
                icon={<FaGithub />}
                text={assessment.company_github
                  ?.replace("https://", "")
                  .replace("www.", "")
                  .replace("github.com", "")}
                href={assessment.company_github}
              />
              <HeaderItem
                icon={<TbWorld />}
                text={assessment.company_website
                  ?.replace("https://", "")
                  .replace("www.", "")}
                href={assessment.company_website}
              />
            </div>
          </div>
        </header>
        <main className="">
          <section className="mt-12">
            <SecondaryTitle text="A Empresa" />
            <p className="font-light text-gray-600 dark:text-gray-300">
              {assessment.company_description}
            </p>
          </section>
          <section className="mt-12">
            <SecondaryTitle text="Sobre o Teste" />
            <p className="font-light text-gray-600 dark:text-gray-300">
              {assessment.assessment_description}
            </p>
          </section>
          <section className="mt-12">
            <SecondaryTitle text="Instruções do Teste" />
            <a
              target="_blank"
              href={assessment.assessment_instructions_url}
              className="flex items-center gap-2 mb-6 underline text-brand"
              rel="noreferrer"
            >
              <FiExternalLink />
              <p>Link para o teste</p>
            </a>
            <div className=" dark:bg-background-800 rounded-xl shadow bg-white border-[1.5px] border-background-100 dark:border-background-700">
              <div className="p-4 prose lg:py-6 lg:px-12 dark:prose-invert max-w-none dark:prose-headings:text-gray-300 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-8 prose-h1:mt-2 lg:prose-h1:mt-4">
                <MarkdownRenderer
                  markdown={assessment.assessment_instructions_text as string}
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
