import { Link } from "@remix-run/react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Card } from "~/components/ui/cards/card";
import CardItemRibbon from "~/components/ui/cards/card-item-ribbon";
import type { TrackItem } from "~/lib/models/track.server";
import ProOverlay from "~/routes/_layout-app/_trilhas/_components/pro-overlay";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { FaRegQuestionCircle } from "react-icons/fa";
import BecomeProCard from "~/routes/_layout-app/_trilhas/_components/become-pro-card";
import BecomeProDialog from "~/routes/_layout-app/_trilhas/_components/become-pro-dialog";
import FreeChip from "~/routes/_layout-app/_trilhas/_components/free-chip";

interface ExternalLinkTrackCardProps {
  trackItem: TrackItem;
  userIsPro: boolean;
}

function LinkTrackCard({ trackItem, userIsPro }: ExternalLinkTrackCardProps) {
  return (
    <Card
      border="bright"
      className="relative overflow-visible text-start border-l-8 mb-12 cursor-pointer"
      id={`link-${trackItem.id}`}
    >
      {trackItem?.status === "soon" && (
        <CardItemRibbon className="group-hover:animate-tada" text="Em breve" />
      )}
      {!trackItem?.is_premium && !userIsPro && <FreeChip />}

      <div className="flex flex-col justify-between p-8 h-full flex-grow">
        <div>
          <div className="mb-2 card-header">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="h-full text-violet-400">
                <BsBoxArrowUpRight className="w-full h-10" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-gray-700 dark:text-gray-50 line-clamp-2">
                  {trackItem?.pivot?.name}
                </h2>
                <h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 border-b border-violet-400">
                    Link externo:
                  </span>{" "}
                  {userIsPro ? trackItem?.name : <ProOverlay />}
                  {!userIsPro && (
                    <HoverCard openDelay={100}>
                      <HoverCardTrigger className="inline-block ml-2">
                        <span className="inline-block w-4 h-4 pt-[2px] my-auto rounded-full bg-background-50 dark:text-gray-400 text-gray-700 dark:bg-background-700">
                          <FaRegQuestionCircle />
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <BecomeProCard />
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

const ClosedLinkTrackCard = ({
  trackItem,
  userIsPro,
}: ExternalLinkTrackCardProps) => (
  <BecomeProDialog
    trigger={
      <div>
        <LinkTrackCard trackItem={trackItem} userIsPro={userIsPro} />
      </div>
    }
  />
);

const OpenLinkTrackCard = ({
  trackItem,
  userIsPro,
}: ExternalLinkTrackCardProps) => (
  <Link to={trackItem.content} target="_blank" className="w-full">
    <LinkTrackCard trackItem={trackItem} userIsPro={userIsPro} />
  </Link>
);

const ExternalLinkTrackCard = ({
  trackItem,
  userIsPro,
}: ExternalLinkTrackCardProps) => {
  return (
    <>
      {userIsPro ? (
        <OpenLinkTrackCard trackItem={trackItem} userIsPro={userIsPro} />
      ) : (
        <ClosedLinkTrackCard trackItem={trackItem} userIsPro={userIsPro} />
      )}
    </>
  );
};

export default ExternalLinkTrackCard;
