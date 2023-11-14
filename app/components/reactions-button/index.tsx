import {
  RiHeartAddLine,
  RiHeartAddFill,
  RiHeartLine,
  RiHeartFill,
} from "react-icons/ri";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import pop from "~/sounds/pop.wav";
import classNames from "~/utils/class-names";
import { useFetcher } from "@remix-run/react";
import type { Reactions, AllowedReaction } from "~/models/reactions.server";
import { useToasterWithSound } from "~/hooks/useToasterWithSound";
import { useUserFromOutletContext } from "~/hooks/useUserFromOutletContext";
import * as Popover from "@radix-ui/react-popover";

const allowedReactions: AllowedReaction[] = [
  "rocket",
  "fire",
  "exploding-head",
  "like",
];

export default function ReactionsButton({
  reactions,
  reactableType,
  reactableId,
  readOnly,
  className = "",
  side = "top",
}: {
  reactions: Reactions;
  reactableType: string;
  reactableId: string;
  readOnly?: boolean;
  className?: string;
  side?: "top" | "right";
}) {
  const fetcher = useFetcher<any>();
  const toast = useToasterWithSound();
  const user = useUserFromOutletContext();

  const reactionError = fetcher.data?.error;

  useEffect(() => {
    if (fetcher.state === "idle" && reactionError) {
      toast.showErrorToast(reactionError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactionError, fetcher.state]);

  const [totalReactions, setTotalReactions] = useState<number | null>(null);

  const [localReactions, setLocalReactions] = useState<{
    [K in AllowedReaction]?: number;
  }>({});

  const [localUserReacted, setLocalUserReacted] = useState<AllowedReaction[]>(
    [],
  );

  const [popSound] = useSound(pop, { volume: 0.3 });

  useEffect(() => {
    setTotalReactions(
      Object.values(reactions.reaction_counts).reduce(
        (acc, curr) => acc + curr.count,
        0,
      ),
    );

    setLocalReactions(
      reactions.reaction_counts.reduce(
        (acc, { reaction, count }) => ({ ...acc, [reaction]: count || 0 }),
        {},
      ),
    );

    setLocalUserReacted(reactions.user_reactions || []);
  }, [reactions]);

  const optimisticToggleReaction = (reaction: AllowedReaction) => {
    if (localUserReacted.includes(reaction)) {
      setLocalUserReacted((prev) => {
        const existingReactionIndex = prev.findIndex(
          (existingReaction) => existingReaction === reaction,
        );

        return [
          ...prev.slice(0, existingReactionIndex),
          ...prev.slice(existingReactionIndex + 1),
        ];
      });
      setTotalReactions((prev) => prev! - 1);

      setLocalReactions((prev) => ({
        ...prev,
        [reaction]: (prev[reaction] || 0) - 1,
      }));
    } else {
      setLocalUserReacted((prev) => [...prev, reaction]);
      setTotalReactions((prev) => prev! + 1);

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
        "Você precisa fazer login para reagir a um post.",
      );
    }

    optimisticToggleReaction(reaction);
    const redirectTo = window.location.pathname;

    fetcher.submit(
      { reactableType, reactableId, reaction, redirectTo },
      {
        method: "post",
        action: "/reactions?index",
      },
    );
  };

  const handleTotalReactionsClick = (ev: React.MouseEvent<HTMLElement>) => {
    const isPopoverClosed =
      ev.currentTarget.getAttribute("data-state") === "closed";

    if (isPopoverClosed && localUserReacted.length === 0 && user) {
      handleClick("like");
    }
  };

  const scale = {
    initial: { scale: 0.9 },
    animate: { scale: 1 },
  };

  const HeartIcon = readOnly ? RiHeartLine : RiHeartAddLine;
  const HeartIconFill = readOnly ? RiHeartFill : RiHeartAddFill;

  return (
    <Popover.Root>
      <Popover.Trigger
        onClick={handleTotalReactionsClick}
        className={classNames(
          `flex items-center justify-center  gap-1 p-2 bg-transparent group ${className}`,
          readOnly && "pointer-events-none",
        )}
      >
        {localUserReacted.length > 0 ? (
          <HeartIconFill className="text-xl transition-transform scale-90 fill-red-700" />
        ) : (
          <HeartIcon className="text-xl transition-all scale-90 group-hover:fill-red-700 group-hover:scale-105" />
        )}
        <span className="inline-block w-2 h-4 text-xs">{totalReactions}</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={side}
          align="end"
          alignOffset={-10}
          sideOffset={-20}
          className="p-2 data-[state=open]:animate-popover transition-opacity shadow-md bg-background-100 dark:bg-background-800 rounded-xl"
        >
          <fetcher.Form
            method="post"
            onClick={(ev) => ev.preventDefault()}
            className={`flex gap-1 ${
              side === "top" ? "flex-col" : "flex-row-reverse"
            }`}
          >
            <input type="hidden" name="reactable-id" value={reactableId} />
            <input type="hidden" name="reactable-type" value={reactableType} />
            {allowedReactions.map((reaction) => (
              <motion.button
                key={reaction}
                initial="initial"
                animate="initial"
                whileHover="animate"
                onClick={() => handleClick(reaction)}
                className={classNames(
                  "flex flex-row items-center gap-1 p-2 transition-colors border rounded-xl hover:bg-background-150 hover:dark:bg-background-700",
                  localUserReacted.includes(reaction)
                    ? "border-opacity-100 border-brand-500 bg-background-150 dark:bg-background-700"
                    : "border-transparent border-opacity-0",
                )}
              >
                <input type="hidden" name="reactable-type" value={reaction} />
                <motion.div variants={scale} className="w-6 h-6">
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
              </motion.button>
            ))}
          </fetcher.Form>
          <Popover.Arrow
            width={15}
            height={8}
            className="fill-background-100 dark:fill-background-800"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
