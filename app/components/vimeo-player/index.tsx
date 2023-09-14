import { PlayCircleIcon } from "@heroicons/react/24/solid";
import Vimeo from "@vimeo/player";
import { useEffect, useRef } from "react";
import LinkToLoginWithRedirect from "../link-to-login-with-redirect";
import Button from "../form/button";

type VimeoPlayerProps = {
  vimeoUrl: string;
  onVideoEnded?: () => void;
  autoplay?: boolean;
  thumbnailURL?: string;
};

export default function VimeoPlayer({
  vimeoUrl,
  onVideoEnded,
  autoplay = false,
  thumbnailURL,
}: VimeoPlayerProps) {
  const playerRef = useRef<Vimeo | null>(null);

  useEffect(() => {
    if (!vimeoUrl) return;

    const player = new Vimeo(playerRef.current, {
      id: vimeoUrl,
      allowfullscreen: true,
      allow: "autoplay; fullscreen; picture-in-picture",
      autoplay: autoplay,
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
      <div className="absolute top-0 z-10 w-full overflow-hidden opacity-1 lg:rounded-xl">
        <div className="vimeo-full-width" ref={playerRef}></div>
      </div>

      {thumbnailURL && (
        <div className="flex items-center justify-center h-full overflow-hidden lg:rounded-xl dark:bg-background-800 ">
          <img
            key={thumbnailURL}
            className="opacity-40 dark:opacity-30"
            src={thumbnailURL}
            alt=""
          />
          {vimeoUrl ? (
            <PlayCircleIcon className="absolute w-20 h-20 text-brand" />
          ) : (
            <div className="absolute z-20 p-3 bg-white border border-gray-200 rounded-lg shadow-2xl shadow-background-700 dark:border- dark:bg-background-800 dark:border-background-600 md:p-10">
              <h3 className="font-bold md:text-2xl text-brand font-lexend">
                Ops...{" "}
              </h3>
              <p className="mt-2 mb-4 text-sm text-gray-500 md:text-base">
                Você precisa estar logado para acessar essa aula!
              </p>
              <LinkToLoginWithRedirect className="mt-4 text-gray-800 ">
                <Button type="button">Entre com Github</Button>
              </LinkToLoginWithRedirect>
              {/* <LockClosedIcon className="w-20 h-20 text-brand" /> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
