import Vimeo from "@vimeo/player";
import { useEffect, useRef } from "react";

type VimeoPlayerProps = {
  vimeoUrl: string;
  onVideoEnded?: () => void;
};

export default function VimeoPlayer({
  vimeoUrl,
  onVideoEnded,
}: VimeoPlayerProps) {
  const playerRef = useRef<Vimeo | null>(null);

  useEffect(() => {
    const player = new Vimeo(playerRef.current, {
      id: vimeoUrl,
      allowfullscreen: true,
      allow: "autoplay; fullscreen; picture-in-picture",
    });

    player.on("ended", function () {
      if (onVideoEnded) {
        onVideoEnded();
      }
    });

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
