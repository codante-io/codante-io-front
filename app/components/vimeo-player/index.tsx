import Vimeo from "@vimeo/player";
import { useEffect, useRef } from "react";

type VimeoPlayerProps = {
  vimeoUrl: string;
  onVideoEnded?: () => void;
  autoplay?: boolean;
};

export default function VimeoPlayer({
  vimeoUrl,
  onVideoEnded,
  autoplay = false,
}: VimeoPlayerProps) {
  const playerRef = useRef<Vimeo | null>(null);

  useEffect(() => {
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
  }, [vimeoUrl]);

  return (
    <div className="relative aspect-video">
      <div className="absolute top-0 z-0 w-full overflow-hidden opacity-1 lg:rounded-xl">
        <div className="vimeo-full-width" ref={playerRef}></div>
      </div>
    </div>
  );
}
