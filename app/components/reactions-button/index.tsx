import { VscHeart } from "react-icons/vsc";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import pop from "./pop.wav";
import classNames from "~/utils/class-names";
import { useFetcher } from "@remix-run/react";
import type { Reactions, AllowedReaction } from "~/models/reactions.server";
import { useToasterWithSound } from "~/hooks/useToasterWithSound";
import { useUserFromOutletContext } from "~/hooks/useUserFromOutletContext";

const allowedReactions: AllowedReaction[] = [
  "like",
  "exploding-head",
  "fire",
  "rocket",
];

export default function ReactionsButton({
  reactions,
  reactableType,
  reactableId,
}: {
  reactions: Reactions;
  reactableType: string;
  reactableId: string;
}) {
  const fetcher = useFetcher();
  const toast = useToasterWithSound();

  const reactionError = fetcher.data?.error;

  useEffect(() => {
    if (fetcher.state === "idle" && reactionError) {
      toast.showErrorToast(reactionError);
    }
  }, [reactionError, fetcher.state]);

  const [totalReactions, setTotalReactions] = useState<number | null>(null);

  const [localReactions, setLocalReactions] = useState<{
    [K in AllowedReaction]?: number;
  }>({});

  const [localUserReacted, setLocalUserReacted] = useState<AllowedReaction[]>(
    []
  );

  const [popSound] = useSound(pop, { volume: 0.3 });
  const user = useUserFromOutletContext();

  useEffect(() => {
    setTotalReactions(
      Object.values(reactions.reaction_counts).reduce(
        (acc, curr) => acc + curr.count,
        0
      )
    );

    setLocalReactions(
      reactions.reaction_counts.reduce(
        (acc, { reaction, count }) => ({ ...acc, [reaction]: count || 0 }),
        {}
      )
    );

    setLocalUserReacted(reactions.user_reactions || []);
  }, [reactions]);

  const optimisticToggleReaction = (reaction: AllowedReaction) => {
    if (localUserReacted.includes(reaction)) {
      setLocalUserReacted((prev) => {
        const existingReactionIndex = prev.findIndex(
          (existingReaction) => existingReaction === reaction
        );

        return [
          ...prev.slice(0, existingReactionIndex),
          ...prev.slice(existingReactionIndex + 1),
        ];
      });

      setLocalReactions((prev) => ({
        ...prev,
        [reaction]: (prev[reaction] || 0) - 1,
      }));
    } else {
      setLocalUserReacted((prev) => [...prev, reaction]);

      setLocalReactions((prev) => ({
        ...prev,
        [reaction]: (prev[reaction] || 0) + 1,
      }));
    }
  };

  const handleClick = (reaction: AllowedReaction) => {
    popSound();

    if (!user) {
      return toast.showErrorToast(
        "Você precisa fazer login para reagir a um post."
      );
    }

    optimisticToggleReaction(reaction);
    const redirectTo = window.location.pathname;

    fetcher.submit(
      { reactableType, reactableId, reaction, redirectTo },
      {
        method: "post",
        action: "/reactions?index",
      }
    );
  };

  return (
    <>
      <button
        onClick={(ev) => ev.preventDefault()}
        className="flex items-center justify-center h-16 gap-1 pl-6 bg-transparent rounded-full group/reaction peer dark:border-gray-400"
      >
        <VscHeart className="text-xl transition-transform scale-90 group-focus/reaction:scale-100 group-hover/reaction:scale-100" />
        <span className="inline-block w-2 h-4 text-xs">{totalReactions}</span>
      </button>

      <fetcher.Form
        method="post"
        onClick={(ev) => ev.preventDefault()}
        className="peer -z-10 peer-focus:z-0 peer-hover:z-0 hover:z-0 hover:opacity-100 peer-hover:opacity-100 peer-focus:opacity-100 opacity-0 absolute right-2 flex items-center justify-around gap-6 px-4 h-14 mb-[6.5rem] bg-background-150 dark:bg-background-600 rounded-xl after:content-[''] after:bg-background-150 dark:after:bg-background-600 after:w-4 after:h-4 after:absolute after:right-[1.5rem] after:mt-12 after:rounded-br-sm after:rotate-45 after:clip-triangle shadow-lg after:shadow-lg"
      >
        <input type="hidden" name="reactable-id" value={reactableId} />
        <input type="hidden" name="reactable-type" value={reactableType} />
        {allowedReactions.map((reaction) => (
          <button
            key={reaction}
            onClick={() => handleClick(reaction)}
            className={classNames(
              "flex flex-row items-center gap-1 p-2 transition-colors border rounded-xl",
              localUserReacted.includes(reaction)
                ? "border-opacity-100 border-brand-500"
                : "border-transparent border-opacity-0"
            )}
          >
            <input type="hidden" name="reactable-type" value={reaction} />
            <motion.div whileHover={{ scale: 1.1, y: -2 }} className="w-6 h-6">
              {localUserReacted.includes(reaction) ? (
                <img
                  loading="lazy"
                  src={`/img/emoji/${reaction}-animated.png`}
                  alt={`Reaction button - ${reaction} emoji`}
                />
              ) : (
                <img
                  loading="lazy"
                  src={`/img/emoji/${reaction}.png`}
                  alt={`Reaction button - ${reaction} emoji`}
                />
              )}
            </motion.div>
            <span className="inline-block w-2 text-xs">
              {localReactions[reaction] || 0}
            </span>
          </button>
        ))}
      </fetcher.Form>
    </>
  );
}
