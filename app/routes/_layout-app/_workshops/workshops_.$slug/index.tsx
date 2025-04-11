import { LockClosedIcon } from "@heroicons/react/24/outline";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { data, useLoaderData, useOutletContext } from "@remix-run/react";
import { AiOutlineSolution } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiGift } from "react-icons/pi";
import { RiLiveLine } from "react-icons/ri";
import invariant from "tiny-invariant";
import AdminEditButton from "~/components/features/admin-edit-button/AdminEditButton";
import WorkshopDetails from "~/components/features/workshop/workshop-details";
import AlertBannerPortal from "~/components/ui/alert-banner-portal";
import BecomeProCard from "~/components/ui/become-pro-card";
import BecomeProFreeCard from "~/components/ui/become-pro-free-card";
import CardItemDifficulty from "~/components/ui/cards/card-item-difficulty";
import CardItemDuration from "~/components/ui/cards/card-item-duration";
import CardItemLessonsCount from "~/components/ui/cards/card-item-lessons-count";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import { ResponsiveHoverCard } from "~/components/ui/responsive-hover-card";
import type { User } from "~/lib/models/user.server";
import {
  getWorkshop,
  userJoinedWorkshop,
  Workshop,
} from "~/lib/models/workshop.server";
import { getPublishedDateAndTime, humanTimeFormat } from "~/lib/utils/interval";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { abort404 } from "~/lib/utils/responses.server";
import { hasHappened } from "~/lib/utils/workshop-utils";
import InstructorCard, { InstructorCardContent } from "./instructor-card";

interface LoaderData {
  slug: string;
  workshop: Workshop;
}

export const meta = ({ data, params }: any) => {
  if (!data?.workshop) return {};
  const title = `Workshop: ${data.workshop?.name} | Codante.io`;
  const description = data.workshop?.short_description ?? "";
  const imageUrl = getOgGeneratorUrl(
    data.workshop?.name ?? "Codante",
    "Workshop",
  );

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/workshops/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/workshops/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.workshop?.name },
  ];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.slug, `params.slug is required`);

  const workshop = await getWorkshop(params.slug, request);

  if (!workshop) {
    return abort404();
  }

  //https://sergiodxa.com/tutorials/fix-double-data-request-when-prefetching-in-remix
  const headers = new Headers();
  const purpose =
    request.headers.get("Purpose") ||
    request.headers.get("X-Purpose") ||
    request.headers.get("Sec-Purpose") ||
    request.headers.get("Sec-Fetch-Purpose") ||
    request.headers.get("X-Moz");

  if (purpose === "prefetch") {
    headers.set("Cache-Control", "private, max-age=15");
  }

  return data({ slug: params.slug, workshop }, { headers });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const slug = formData.get("slug");

  const entered = await userJoinedWorkshop(slug as string, request);

  return entered ? { success: true } : { success: false };
};

export default function WorkshopSlug() {
  const loaderData = useLoaderData<LoaderData>();
  const { user } = useOutletContext<{ user: User }>();
  const workshop = loaderData.workshop;
  const nextLesson = workshop?.first_unwatched_lesson || workshop?.lessons[0];

  const [publishedDate, publishedTime] = getPublishedDateAndTime(
    workshop.published_at,
  );

  return (
    <section className="container mx-auto mb-16">
      {workshop.status === "soon" && (
        <AlertBannerPortal
          title={`${
            hasHappened(workshop)
              ? `Esse workshop aconteceu recentemente!`
              : "Esse workshop está agendado."
          }`}
          subtitle={`${
            hasHappened(workshop)
              ? "Aguarde que em breve estará disponível na plataforma."
              : `Você poderá assisti-lo ao vivo ${
                  publishedDate
                    ? `no dia ${publishedDate}${
                        publishedTime ? ` às ${publishedTime}` : ""
                      }.`
                    : " em breve."
                }`
          }`}
        />
      )}

      {workshop.status === "streaming" && (
        <AlertBannerPortal
          type="workshop-is-live"
          title="Esse workshop está acontecendo agora!"
          subtitle="Você pode assistir ao vivo aqui embaixo o streaming ao vivo! 🎥"
        />
      )}
      {/* Header */}
      <header className="flex justify-center flex-col gap-2 mb-8 lg:gap-6">
        <div>
          <span className="lg:text-lg font-extralight flex items-center gap-2">
            {workshop.is_standalone ? (
              <>
                <RiLiveLine className="text-red-400 w-4 h-4" />
                Workshop
              </>
            ) : (
              <>
                <AiOutlineSolution className="text-green-400 w-4 h-4" />
                Tutorial
              </>
            )}
          </span>
          <h1 className="text-3xl font-bold lg:text-4xl font-lexend">
            {workshop.name}{" "}
            <AdminEditButton url={`/workshop/${workshop.id}/edit`} />
          </h1>
        </div>
        <div className="flex gap-4 flex-wrap mb-0 sm:mb-4 lg:mb-12">
          {workshop.lessons && workshop.lessons.length > 0 && (
            <div className="inline-flex gap-6 px-4 py-4  md:w-auto lg:px-8 lg:gap-10 bg-background-100 dark:bg-background-800 rounded-xl items-center">
              <CardItemDifficulty difficulty={workshop.difficulty} />
              <CardItemLessonsCount lessonsCount={workshop?.lessons?.length} />
              <CardItemDuration
                durationString={humanTimeFormat(workshop.duration_in_seconds)}
              />
            </div>
          )}

          <ResponsiveHoverCard
            behavior="click"
            trigger={
              <div className="px-4 py-4 md:w-auto lg:px-8 lg:gap-10 bg-background-100 dark:bg-background-800 rounded-xl  text-xs">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <InstructorCard instructor={workshop.instructor} />
                </span>
              </div>
            }
            cardContent={
              <div>
                <InstructorCardContent
                  bio={workshop.instructor.bio}
                  links={workshop.instructor.links}
                />
              </div>
            }
          />

          {!user?.is_pro && workshop.status !== "soon" && (
            <ResponsiveHoverCard
              behavior="click"
              trigger={
                <div className="p-4 md:w-auto lg:px-8 lg:gap-10 bg-background-100 dark:bg-background-800 rounded-xl cursor-pointer text-xs h-full">
                  {workshop.is_premium ? (
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1 h-full w-full">
                      <LockClosedIcon className="w-4 h-4 inline-block mr-1 text-amber-400 align-text-top" />
                      Conteúdo <ProSpanWrapper>PRO</ProSpanWrapper>{" "}
                      <IoInformationCircleOutline className="inline-block ml-2 w-5 h-5 align-text-top" />
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1 h-full w-full">
                      <PiGift className="w-5 h-5 inline-block mr-2 text-green-400 align-text-top " />
                      Conteúdo gratuito
                      <IoInformationCircleOutline className="inline-block ml-1 w-5 h-5 align-text-top" />
                    </span>
                  )}
                </div>
              }
              cardContent={
                workshop.is_premium ? <BecomeProCard /> : <BecomeProFreeCard />
              }
            />
          )}
        </div>
      </header>

      {/* layout */}

      <WorkshopDetails workshop={workshop} nextLesson={nextLesson} />
    </section>
  );
}
