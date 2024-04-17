import { Link } from "@remix-run/react";
import { BsCameraVideo } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Card } from "~/components/ui/cards/card";

import CardItemTagsText from "~/components/ui/cards/card-item-tags-text";

import { NewButton } from "~/components/ui/new-button";
import { ResponsiveHoverCard } from "~/components/ui/responsive-hover-card";
import type { Workshop } from "~/lib/models/workshop.server";
import BecomeProCard from "~/routes/_layout-app/_trilhas/_components/become-pro-card";
import BecomeProDialog from "~/routes/_layout-app/_trilhas/_components/become-pro-dialog";
import FreeChip from "~/routes/_layout-app/_trilhas/_components/free-chip";
import ProOverlay from "~/routes/_layout-app/_trilhas/_components/pro-overlay";
import SoonChip from "~/routes/_layout-app/_trilhas/_components/soon-chip";

interface WorkshopTrackCardProps {
  workshop: Workshop;
  userIsPro: boolean;
}

function WorkshopTrackCard({ workshop, userIsPro }: WorkshopTrackCardProps) {
  return (
    <Card
      border="bright"
      className="w-full relative overflow-visible text-start border-l-8 mb-12"
      id={workshop.slug}
    >
      {workshop?.status === "soon" && <SoonChip />}
      {!workshop?.is_premium && !userIsPro && <FreeChip />}

      <div className="flex flex-col justify-between p-8 h-full flex-grow">
        <div>
          <div className="mb-2 card-header">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="h-full text-brand-500">
                <BsCameraVideo className="w-full h-12" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-gray-700 dark:text-gray-50 line-clamp-2">
                  {workshop?.pivot?.name}
                </h2>
                <h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 border-b border-brand-500">
                    Workshop:
                  </span>{" "}
                  {userIsPro ? workshop?.name : <ProOverlay />}
                  {!userIsPro && (
                    <ResponsiveHoverCard
                      trigger={
                        <span className="inline-block w-4 h-4 pt-[2px] my-auto ml-1 rounded-full bg-background-50 dark:text-gray-400 text-gray-700 dark:bg-background-700">
                          <FaRegQuestionCircle />
                        </span>
                      }
                      cardContent={<BecomeProCard />}
                    />
                  )}
                </h3>
              </div>
            </div>
            {userIsPro && (
              <p className="text-sm font-light text-gray-600 line-clamp-3 slate-600 dark:text-gray-300 mt-6">
                {workshop?.short_description}
              </p>
            )}
            <div className="border-t border-gray-200 dark:border-gray-800 my-4 px-2" />

            {workshop?.tags && workshop?.tags.length > 0 && (
              <div>
                <span className="text-xs text-gray-600 dark:text-gray-200">
                  O que você vai aprender:
                </span>
                <CardItemTagsText tags={workshop?.tags} />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          {userIsPro ? (
            <Link to={`/workshops/${workshop?.slug}`} target="_blank">
              <NewButton variant="secondary" type="button">
                Ver workshop
              </NewButton>
            </Link>
          ) : (
            <BecomeProDialog
              trigger={
                <NewButton variant="secondary" type="button">
                  Ver workshop
                </NewButton>
              }
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default WorkshopTrackCard;
