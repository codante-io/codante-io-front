import Vimeo from "@vimeo/player";
import { useEffect, useRef, useState } from "react";

type VimeoPlayerProps = {
  vimeoUrl: string;
  onVideoEnded?: () => void;
  onVideoPaused?: () => void;
};

export default function VimeoPlayer({
  vimeoUrl,
  onVideoEnded,
  onVideoPaused,
}: VimeoPlayerProps) {
  const playerRef = useRef(null);

  useEffect(() => {
    console.log(playerRef.current);
    const player = new Vimeo(playerRef.current, {
      id: vimeoUrl,
      allowfullscreen: true,
      allow: "autoplay; fullscreen; picture-in-picture",
    });

    console.log("tenho o player");

    player.on("pause", () => {
      console.log("pausei!");
    });

    player.on("ended", () => {
      console.log("ended");
    });

    return () => {
      console.log("destruindo");

      player.destroy();
    };
  }, [vimeoUrl]);

  return (
    <div className="aspect-video">
      <div className="z-0 w-full overflow-hidden opacity-1 lg:rounded-xl">
        <div
          style={{ width: "100%", height: "100%" }}
          id="vimeo-player"
          ref={playerRef}
          className="w-full h-full"
        ></div>
      </div>
    </div>
  );
}
