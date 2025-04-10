import { PlayCircleIcon } from "@heroicons/react/24/solid";
import Vimeo from "@vimeo/player";
import { useEffect, useRef } from "react";
import type { AvailableTo } from "~/lib/models/lesson.server";
import BecomeProCard from "~/components/ui/become-pro-card";
import { cn } from "~/lib/utils/cn";
import SignInCard from "~/components/ui/sign-in-card";
import { useMediaQuery } from "~/lib/hooks/use-media-query";

type VimeoPlayerProps = {
  vimeoUrl: string;
  onVideoEnded?: () => void;
  autoplay?: boolean;
  thumbnailURL?: string;
  roundedClassName?: string;
  available_to?: AvailableTo | undefined;
  title?: string;
  labelledBy?: string;
  describedBy?: string;
  showPlayIcon?: boolean;
  thumbnailOpacity?: boolean;
};

export default function VimeoPlayer({
  vimeoUrl,
  onVideoEnded,
  autoplay = false,
  thumbnailURL,
  roundedClassName = "lg:rounded-xl",
  available_to = undefined,
  title = undefined,
  labelledBy = undefined,
  describedBy = undefined,
  showPlayIcon = true,
  thumbnailOpacity = true,
}: VimeoPlayerProps) {
  const playerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 400px)");

  useEffect(() => {
    if (!vimeoUrl) return;

    //@ts-ignore-next-line
    const player = new Vimeo(playerRef.current, {
      id: vimeoUrl,
      allowfullscreen: true,
      allow: "autoplay; fullscreen; picture-in-picture",
      autoplay: autoplay,
      controls: true,
    });

    player.on("ended", function () {
      if (onVideoEnded) {
        onVideoEnded();
      }
    });

    player.on("playbackratechange", function (data) {
      localStorage.setItem("videoSpeed", data.playbackRate.toString());
    });

    async function getPlaybackRateFromLocalStorage() {
      if (localStorage.getItem("videoSpeed")) {
        const playbackRate = await player.getPlaybackRate();
        if (Number(localStorage.getItem("videoSpeed")) !== playbackRate) {
          player.setPlaybackRate(Number(localStorage.getItem("videoSpeed")));
        }
      }
    }

    getPlaybackRateFromLocalStorage();

    return () => {
      player.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vimeoUrl]);

  return (
    <div className="relative aspect-video">
      <div
        className={`absolute top-0 z-10 w-full overflow-hidden opacity-100 ${roundedClassName} `}
      >
        <main
          title={title ? `Video ${title}` : "Vimeo Player"}
          className="vimeo-full-width"
          ref={playerRef}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
        ></main>
      </div>

      <div
        className={`flex items-center justify-center h-full overflow-hidden ${roundedClassName} bg-background-200 dark:bg-background-800 cursor-pointer`}
      >
        {thumbnailURL && (
          <img
            key={thumbnailURL}
            className={cn(
              thumbnailOpacity && "opacity-40 dark:opacity-30 ",
              !vimeoUrl && "opacity-10 dark:opacity-10",
            )}
            src={thumbnailURL}
            alt=""
          />
        )}
        {vimeoUrl ? (
          <>
            {showPlayIcon && (
              <PlayCircleIcon className="absolute w-20 h-20 text-brand" />
            )}
          </>
        ) : (
          <div className="absolute z-20 p-3 max-w-md w-full h-full flex justify-center items-center text-xs sm:text-base">
            {available_to === "pro" ? (
              <BecomeProCard hideContent={isMobile} />
            ) : (
              <SignInCard />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
