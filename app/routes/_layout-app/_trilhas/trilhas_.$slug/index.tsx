import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getTrack, toggleTrackableCompleted } from "~/lib/models/track.server";
import type { TrackItem } from "~/lib/models/track.server";
import type { Challenge } from "~/lib/models/challenge.server";
import type { Workshop } from "~/lib/models/workshop.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import AdminEditButton from "~/components/features/admin-edit-button/AdminEditButton";

import ChallengeTrackCard from "~/routes/_layout-app/_trilhas/_components/challenge-track-card";
import WorkshopTrackCard from "~/routes/_layout-app/_trilhas/_components/workshop-track-card";
import { cn } from "~/lib/utils/cn";
import ExternalLinkTrackCard from "~/routes/_layout-app/_trilhas/_components/external-link-track-card";
import MarkdownTrackText from "~/routes/_layout-app/_trilhas/_components/markdown-track-text";
import SectionCard from "~/routes/_layout-app/_trilhas/_components/section-card";
import TrackItemCheckbox from "~/routes/_layout-app/_trilhas/_components/track-item-checkbox";
import { useEffect } from "react";
import type { ChangeEvent } from "react";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";
import { useUserFromOutletContext } from "~/lib/hooks/useUserFromOutletContext";
import UnderConstructionCard from "~/routes/_layout-app/_trilhas/_components/under-construction-card";

export const meta = ({ data, params }: any) => {
  const title = `Trilha: ${data.track?.name} | Codante.io`;
  const description = data.track?.short_description ?? "";
  const imageUrl = getOgGeneratorUrl(data.track?.name ?? "Codante", "Trilha");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/trilhas/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/trilhas/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.track?.name },
  ];
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const trackableId = formData.get("trackableId") as string;
  const actionData = await toggleTrackableCompleted(trackableId, request);
  return actionData;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.slug, `params.slug is required`);
  return json({
    slug: params.slug,
    track: await getTrack(params.slug, request),
  });
};

export default function TrackSlug() {
  const { track } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const actionData = useActionData<any>();
  const { showSuccessToast, showErrorToast } = useToasterWithSound();
  const user = useUserFromOutletContext();
  const userIsPro = user?.is_pro || false;

  const handleCheckboxChange = (event: ChangeEvent<HTMLFormElement>) => {
    submit(event.currentTarget, { replace: true });
  };

  useEffect(() => {
    if (actionData?.error) {
      showErrorToast(actionData?.error);
    }

    if (actionData?.success) {
      showSuccessToast(actionData?.success);
    }
  }, [actionData, showErrorToast, showSuccessToast]);

  return (
    <section className="container mx-auto text-center">
      <header className="flex flex-col items-center justify-center gap-2 mb-8 text-center lg:gap-6">
        <h1 className=" text-4xl font-lexend">
          Aprenda{" "}
          <span className="font-bold border-b-4 border-brand-500">
            {track.name}
          </span>
        </h1>

        <AdminEditButton url={`/track/${track.id}/edit`} />
      </header>

      <section className="w-full flex flex-col">
        {track?.sections &&
          track?.sections.map((section, sectionIndex: number) => {
            return (
              <div
                key={sectionIndex}
                className="flex sm:flex-row flex-col gap-12"
              >
                <div className="w-full h-fit sm:w-1/4 sm:sticky top-2 md:pb-24">
                  <SectionCard
                    section={section}
                    index={sectionIndex}
                    userCompleted={section.trackables.reduce(
                      (acc, curr) => (curr.completed ? acc + 1 : acc),
                      0,
                    )}
                  />
                </div>
                <div className="w-full sm:w-3/4 group">
                  {sectionIndex === 0 && <UnderConstructionCard />}
                  {section.trackables &&
                    section.trackables.map((trackable, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex w-full gap-4">
                          <TrackItemCheckbox
                            trackableId={trackable?.pivot?.id || ""}
                            showTopLine={sectionIndex === 0 && index === 0}
                            showBottomLine={
                              index === section.trackables.length - 1 &&
                              sectionIndex === track.sections.length - 1
                            }
                            showCheckbox={
                              !(trackable as TrackItem).type ||
                              (trackable as TrackItem).type !== "markdown"
                            }
                            completed={trackable.completed}
                            onChange={handleCheckboxChange}
                            error={actionData}
                            userIsPro={userIsPro}
                            userIsLoggedIn={!!user}
                            isFree={!trackable?.is_premium}
                          />

                          <div
                            className={cn(
                              "w-full",
                              index === section.trackables.length - 1 &&
                                "mb-12",
                            )}
                          >
                            <TrackCard
                              trackItem={trackable}
                              userIsPro={userIsPro}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </section>
    </section>
  );
}

function TrackCard({
  trackItem,
  userIsPro,
}: {
  trackItem: Workshop | Challenge | TrackItem;
  userIsPro: boolean;
}) {
  if (trackItem?.pivot?.trackable_type.includes("Workshop")) {
    return (
      <WorkshopTrackCard
        workshop={trackItem as Workshop}
        userIsPro={userIsPro}
      />
    );
  }

  if (trackItem?.pivot?.trackable_type.includes("Challenge")) {
    return (
      <ChallengeTrackCard
        challenge={trackItem as Challenge}
        userIsPro={userIsPro}
      />
    );
  }

  if (
    trackItem?.pivot?.trackable_type.includes("TrackItem") &&
    (trackItem as TrackItem)?.type === "external_link"
  ) {
    return (
      <ExternalLinkTrackCard
        trackItem={trackItem as TrackItem}
        userIsPro={userIsPro}
      />
    );
  }
  return <MarkdownTrackText trackItem={trackItem as TrackItem} />;
}
