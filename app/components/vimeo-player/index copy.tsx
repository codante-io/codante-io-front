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
    console.log("entrei no console log", vimeoUrl);
    const player = new Vimeo(playerRef.current);
    // console.log('tentando dar play')
    // console.log(playerRef.current)
    player.on("pause", () => {
      console.log("pausouss");
      player.destroy;
    });
    // player.play()
    player.on("ended", function () {
      console.log("video acabou!!!");

      if (onVideoEnded) {
        onVideoEnded();
      }
    });

    return () => {
      console.log(player);
      // if(player) {
      //   player.destroy()
      // }
      // player.destroy().then(() => console.log("player destroyed"))
    };
  }, [vimeoUrl]);
  return (
    <div className="relative aspect-video">
      <div className="absolute top-0 z-0 w-full overflow-hidden opacity-1 lg:rounded-xl">
        <div style={{ padding: "56.30% 0 0 0", position: "relative" }}>
          <iframe
            ref={playerRef}
            src={vimeoUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            title="Codante.io"
            id={`video-${vimeoUrl}`}
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    </div>
  );
}
