import { PlayCircleIcon } from "@heroicons/react/24/solid";
import Vimeo from "@vimeo/player";
import { useEffect, useRef } from "react";
import LinkToLoginWithRedirect from "../link-to-login-with-redirect";
import Button from "../form/button";
import ProSpanWrapper from "../pro-span-wrapper";
import { Link } from "@remix-run/react";
import { FaCrown } from "react-icons/fa";
import type { AvailableTo } from "~/models/lesson.server";

type VimeoPlayerProps = {
  vimeoUrl: string;
  onVideoEnded?: () => void;
  autoplay?: boolean;
  thumbnailURL?: string;
  roundedClassName?: string;
  available_to?: AvailableTo | undefined;
};

export default function VimeoPlayer({
  vimeoUrl,
  onVideoEnded,
  autoplay = false,
  thumbnailURL,
  roundedClassName = "lg:rounded-xl",
  available_to = undefined,
}: VimeoPlayerProps) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!vimeoUrl) return;

    //@ts-ignore-next-line
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
      <div
        className={`absolute top-0 z-10 w-full overflow-hidden opacity-1 ${roundedClassName} `}
      >
        <div className="vimeo-full-width" ref={playerRef}></div>
      </div>

      <div
        className={`flex items-center justify-center h-full overflow-hidden ${roundedClassName} bg-background-200 dark:bg-background-800 `}
      >
        {thumbnailURL && (
          <img
            key={thumbnailURL}
            className="opacity-40 dark:opacity-30"
            src={thumbnailURL}
            alt=""
          />
        )}
        {vimeoUrl ? (
          <PlayCircleIcon className="absolute w-20 h-20 text-brand" />
        ) : (
          <NotAvailableOverlay available_to={available_to} />
        )}
      </div>
    </div>
  );
}

function NotAvailableOverlay({
  available_to,
}: {
  available_to?: AvailableTo | undefined;
}) {
  return (
    <div className="absolute z-20 p-3 bg-white border border-gray-200 max-w-md rounded-lg shadow-2xl shadow-background-700 dark:border- dark:bg-background-800 dark:border-background-600 md:p-10">
      <h3 className="font-bold md:text-2xl text-brand font-lexend">Ops... </h3>
      <p className="mt-2 mb-6 text-sm text-gray-500 dark:text-gray-300 md:text-base">
        {available_to === "logged_in" &&
          "Você precisa estar logado para acessar essa aula"}
        {available_to === "pro" && (
          <span>
            Você precisa ser um membro <ProSpanWrapper>PRO</ProSpanWrapper> para
            acessar essa aula
          </span>
        )}
        {!available_to && "Essa aula não está disponível para você"}
      </p>
      {available_to === "logged_in" && (
        <LinkToLoginWithRedirect className="mt-6 text-gray-800 ">
          <Button
            type="button"
            textSizeClass="text-base"
            className="flex justify-center items-center gap-2 px-4 py-4 w-full"
          >
            <img src="/img/github-logo.svg" alt="" />
            Entre com Github
          </Button>
        </LinkToLoginWithRedirect>
      )}
      {available_to === "pro" && (
        <Link to="/assine" className="w-full inline-block mt-4">
          <button className="mx-auto w-full flex gap-1 justify-center items-center px-4 py-4 text-gray-700 rounded-lg bg-gradient-to-r animate-bg from-amber-200 via-amber-300 to-amber-400">
            <FaCrown className="mr-2 text-amber-500" />
            <span>
              Seja
              <b className="ml-1">PRO </b>
            </span>
          </button>
        </Link>
      )}
    </div>
  );
}
