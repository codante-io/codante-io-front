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
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://player.vimeo.com/api/player.js";
    document.body.appendChild(scriptTag);

    const scriptTag1 = document.createElement("script");
    scriptTag1.innerHTML = `
      // window.addEventListener('load', () => {
      if(window.Vimeo) {
        const player = new Vimeo.Player(document.querySelector('#vimeo-player'));
        player.on('pause', () => {
          console.log('pausei');
        });
      }
        
      // })
    `;
    document.body.appendChild(scriptTag1);

    // const player = new Vimeo(playerRef.current);
    // player.on("pause", () => console.log('pause'));

    return () => {
      // remove script tag
      document.body.removeChild(scriptTag);
      document.body.removeChild(scriptTag1);
    };
  }, [vimeoUrl]);

  return (
    <div className="aspect-video">
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
            id="vimeo-player"
          ></iframe>
        </div>
        {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
      </div>
    </div>
  );
}
