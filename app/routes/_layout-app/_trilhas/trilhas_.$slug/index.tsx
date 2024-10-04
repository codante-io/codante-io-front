import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getTrack, toggleTrackableCompleted } from "~/lib/models/track.server";
import type {
  ChallengeTrackable,
  TrackItem,
  WorkshopTrackable,
} from "~/lib/models/track.server";
import type { Challenge } from "~/lib/models/challenge.server";
import type { Workshop } from "~/lib/models/workshop.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import AdminEditButton from "~/components/features/admin-edit-button/AdminEditButton";

import ChallengeTrackCard from "~/routes/_layout-app/_trilhas/_components/challenge-track-card";
import WorkshopTrackCard from "~/routes/_layout-app/_trilhas/_components/workshop-track-card";
import { cn } from "~/lib/utils/cn";
import { useEffect } from "react";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";
import { useUserFromOutletContext } from "~/lib/hooks/useUserFromOutletContext";
import useLazyLoading from "~/lib/hooks/use-lazy-loading";

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
  useLazyLoading();

  const actionData = useActionData<any>();
  const { showSuccessToast, showErrorToast } = useToasterWithSound();
  const user = useUserFromOutletContext();
  const userIsPro = user?.is_pro || false;

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
          <span className="font-bold">{track.name}</span>
        </h1>

        <AdminEditButton url={`/track/${track.id}/edit`} />
      </header>

      <section className="w-full flex flex-col">
        <div className="w-full group">
          {track.trackables &&
            track.trackables.map((trackable, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex w-full gap-4">
                  <div
                    className={cn(
                      "w-full",
                      // index === section.trackables.length - 1 && "mb-12",
                    )}
                  >
                    <TrackCard trackItem={trackable} userIsPro={userIsPro} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </section>
  );
}

function TrackCard({
  trackItem,
  userIsPro,
}: {
  trackItem: WorkshopTrackable | ChallengeTrackable;
  userIsPro: boolean;
}) {
  if (trackItem?.type.includes("Workshop")) {
    return (
      <WorkshopTrackCard
        workshop={trackItem as WorkshopTrackable}
        userIsPro={userIsPro}
      />
    );
  }

  if (trackItem?.type.includes("Challenge")) {
    return (
      <ChallengeTrackCard
        challenge={trackItem as Challenge}
        userIsPro={userIsPro}
      />
    );
  }
}
