import { Link } from "@remix-run/react";
import { BsFillPlayFill } from "react-icons/bs";
import CardItemRibbon from "~/components/ui/cards/card-item-ribbon";
import type { Challenge } from "~/lib/models/challenge.server";

export default function ResolutionSection({
  isAvailable,
  thumbnailUrl,
  challenge,
}: {
  isAvailable: boolean;
  thumbnailUrl?: string;
  challenge: Challenge;
}) {
  return (
    <div>
      <h1 className="flex items-center mb-4 text-xl font-semibold text-gray-700 font-lexend dark:text-gray-300">
        Resolução
      </h1>
      {!isAvailable && (
        <p className="text-sm text-gray-400">
          Esta resolução será publicada em breve!{" "}
          {/* <button className="text-xs underline text-brand">Me avise!</button> */}
        </p>
      )}
      {isAvailable ? (
        <Link
          to={`/mini-projetos/${challenge.slug}/resolucao`}
          className="relative"
        >
          <img
            className="relative w-full rounded-lg aspect-video"
            src={thumbnailUrl}
            alt=""
          />
        </Link>
      ) : (
        <div
          className={`relative w-full aspect-video max-w-full max-h-full bg-background-200 dark:bg-background-800 flex items-center justify-center rounded-lg mt-6 mb-20 ${
            !isAvailable && "cursor-not-allowed"
          }`}
        >
          {!isAvailable && <CardItemRibbon text="Disponível em breve" />}
          <span
            className={`flex items-center justify-center w-8 h-8 text-gray-700 rounded-full bg-background-100 ${
              !isAvailable && "cursor-not-allowed"
            }`}
          >
            <BsFillPlayFill size={16} color="#5282FF" />
          </span>
        </div>
      )}
    </div>
  );
}
