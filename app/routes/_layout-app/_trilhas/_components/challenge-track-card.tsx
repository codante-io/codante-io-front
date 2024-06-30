import { Link } from "@remix-run/react";
import { BsCodeSlash } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Card } from "~/components/ui/cards/card";

import CardItemRibbon from "~/components/ui/cards/card-item-ribbon";
import CardItemTagsText from "~/components/ui/cards/card-item-tags-text";
import ResumedChallengeCard from "~/components/ui/cards/resumed-challenge-card";

import { Button } from "~/components/ui/button";
import type { Challenge } from "~/lib/models/challenge.server";
import ProOverlay from "./pro-overlay";
import BecomeProCard from "~/components/ui/become-pro-card";
import BecomeProDialog from "~/components/ui/become-pro-dialog";
import { ResponsiveHoverCard } from "~/components/ui/responsive-hover-card";
import Chip from "~/components/ui/chip";

interface ChallengeTrackCardProps {
  challenge: Challenge;
  userIsPro: boolean;
}

function ChallengeTrackCard({ challenge, userIsPro }: ChallengeTrackCardProps) {
  const userCanSee = userIsPro || !challenge?.is_premium;

  return (
    <Card
      id={challenge?.slug}
      border="bright"
      className="w-full relative overflow-visible text-start border-l-8 mb-12"
    >
      {challenge?.status === "soon" && (
        <CardItemRibbon className="group-hover:animate-tada" text="Em breve" />
      )}
      {!challenge?.is_premium && !userIsPro && (
        <Chip text="Gratuito" type="free" />
      )}
      <div className="flex flex-col justify-between p-8 h-full flex-grow">
        <div>
          <div className="mb-2 card-header">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="h-full text-amber-400">
                <BsCodeSlash className="w-full h-12" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-gray-700 dark:text-gray-50 line-clamp-2">
                  {challenge?.pivot?.name}
                </h2>
                <h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 border-b border-amber-400">
                    Mini projeto:
                  </span>{" "}
                  {userCanSee ? challenge?.name : <ProOverlay />}
                  <ResponsiveHoverCard
                    trigger={
                      <span className="inline-block w-4 h-4 pt-[2px] my-auto ml-1 rounded-full bg-background-50 dark:text-gray-400 text-gray-700 dark:bg-background-700">
                        <FaRegQuestionCircle />
                      </span>
                    }
                    cardContent={
                      userIsPro || !challenge?.is_premium ? (
                        <ResumedChallengeCard challenge={challenge} />
                      ) : (
                        <BecomeProCard />
                      )
                    }
                  />
                </h3>
              </div>
            </div>
            {userCanSee && (
              <p className="text-sm font-light text-gray-600 line-clamp-3 slate-600 dark:text-gray-300 mt-6">
                {challenge?.short_description}
              </p>
            )}
            <div className="border-t border-gray-200 dark:border-gray-800 my-4 px-2" />

            {challenge?.tags && challenge?.tags.length > 0 && (
              <div>
                <span className="text-xs text-gray-600 dark:text-gray-200">
                  O que você vai aprender:
                </span>
                <CardItemTagsText tags={challenge?.tags} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-2">
          {userCanSee ? (
            <Link to={`/mini-projetos/${challenge?.slug}`} target="_blank">
              <Button variant="secondary" type="button">
                Acessar projeto
              </Button>
            </Link>
          ) : (
            <BecomeProDialog
              trigger={
                <Button variant="secondary" type="button">
                  Acessar projeto
                </Button>
              }
            />
          )}

          {userCanSee ? (
            <Link
              to={`/mini-projetos/${challenge?.slug}/resolucao`}
              target="_blank"
            >
              <Button variant="secondary" type="button">
                Ver resolução
              </Button>
            </Link>
          ) : (
            <BecomeProDialog
              trigger={
                <Button variant="secondary" type="button">
                  Ver resolução
                </Button>
              }
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default ChallengeTrackCard;
