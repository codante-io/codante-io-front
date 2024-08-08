import {
  SiFigma,
  SiFigmaHex,
  SiJavascript,
  SiJavascriptHex,
  SiNextdotjs,
  SiReact,
  SiReactHex,
  SiTailwindcss,
  SiTailwindcssHex,
} from "@icons-pack/react-simple-icons";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import useLazyLoading from "~/lib/hooks/use-lazy-loading";
import { getWorkshops } from "~/lib/models/workshop.server";
import { cn } from "~/lib/utils/cn";
import FeaturedWorkshopSection from "~/routes/_layout-app/_workshops/workshops/featured-workshop-section";

export const meta = () => {
  return [
    { title: "Workshops | Codante.io" },
    {
      name: "description",
      content:
        "Os workshops do Codante são ensinados por especialistas da indústria de tecnologia usando uma abordagem prática e técnicas modernas de front-end",
    },
    {
      property: "og:title",
      content: "Workshops | Codante.io",
    },
    {
      property: "og:description",
      content:
        "Os workshops do Codante são ensinados por especialistas da indústria de tecnologia usando uma abordagem prática e técnicas modernas de front-end",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const tech = url.searchParams.get("tecnologia") ?? "";

  return json(
    {
      workshops: await getWorkshops({ tech }),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=120, s-maxage=120",
      },
    },
  );
};

export default function Workshops() {
  const { workshops } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const selectedTechs = searchParams.get("tecnologia");

  const pastWorkshops = workshops.filter(
    (workshop) =>
      workshop.published_at && new Date(workshop.published_at) < new Date(),
  );
  const upcomingWorkshops = workshops.filter(
    (workshop) =>
      workshop.published_at && new Date(workshop.published_at) >= new Date(),
  );

  useLazyLoading([selectedTechs]);

  const technologies = [
    {
      name: "Next.js",
      icon: (props: any) => <SiNextdotjs {...props} />,
      color: "#fff",
      value: "nextjs",
      hoverClass: "dark:group-hover:text-[#fff] group-hover:text-black",
      selectClass: "text-black dark:text-white",
    },
    {
      name: "TailwindCSS",
      icon: (props: any) => <SiTailwindcss {...props} />,
      color: SiTailwindcssHex,
      value: "tailwindcss",
      hoverClass: "group-hover:text-[#06B6D4]",
      selectClass: "text-[#06B6D4]",
    },
    {
      name: "React",
      icon: (props: any) => <SiReact {...props} />,
      color: SiReactHex,
      value: "react",
      hoverClass: "group-hover:text-[#61DAFB]",
      selectClass: "text-[#61DAFB]",
    },
    {
      name: "Fundamentos",
      icon: (props: any) => <SiJavascript {...props} />,
      color: SiJavascriptHex,
      value: "fundamentos",
      hoverClass: "group-hover:text-[#F7DF1E]",
      selectClass: "text-[#F7DF1E]",
    },
    {
      name: "UI/UX",
      icon: (props: any) => <SiFigma {...props} />,
      value: "ui-ux",
      color: SiFigmaHex,
      hoverClass: "group-hover:text-[#F24E1E]",
      selectClass: "text-[#F24E1E]",
    },
  ];

  return (
    <main className="container mx-auto text-center">
      <h1 className="mb-10 text-4xl font-lexend">
        <span className=" decoration-4 decoration-red-400">Workshops</span> e{" "}
        <span className=" decoration-4 decoration-green-400">Tutoriais</span>
      </h1>

      {upcomingWorkshops.length > 0 && (
        <FeaturedWorkshopSection featuredWorkshop={upcomingWorkshops[0]} />
      )}

      {/* filtro */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {technologies.map((technology) => {
          const isSelected = selectedTechs?.includes(technology.value);
          return (
            <Link
              to={
                isSelected
                  ? "/workshops"
                  : `/workshops?tecnologia=${technology.value}`
              }
              prefetch="intent"
              preventScrollReset
              key={technology.value}
              className={cn(
                "flex items-center gap-2 p-3 md:py-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-light transition-colors border-[1.5px] rounded-xl cursor-pointer group dark:border-gray-700 border-gray-300 hover:border-brand-300 hover:dark:border-brand-300",
                isSelected &&
                  "border-brand-300 dark:border-brand-300 dark:text-white text-gray-700 bg-background-100 dark:bg-background-800",
              )}
            >
              {technology.icon({
                className: cn(
                  "w-4 h-4 transition transtition-color scale-90 group-hover:text-brand-400 group-hover:scale-105",
                  technology.hoverClass,
                  isSelected && "scale-105",
                  isSelected && technology.selectClass,
                ),
              })}
              {technology.name}
            </Link>
          );
        })}
      </div>

      <section className="grid grid-cols-1 mt-16 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 place-items-center auto-rows-fr">
        {pastWorkshops.map((workshop) => (
          <WorkshopCard key={workshop.slug} workshop={workshop} />
        ))}
      </section>
    </main>
  );
}
