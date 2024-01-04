import { PlayCircleIcon } from "@heroicons/react/24/solid";

type YoutubePlayerProps = {
  youtubeEmbedUrl: string;
  thumbnailURL?: string;
};

export default function YoutubePlayer({
  youtubeEmbedUrl,
  thumbnailURL,
}: YoutubePlayerProps) {
  return (
    <div className="relative aspect-video">
      <div className="absolute top-0 z-10 w-full overflow-hidden opacity-1 lg:rounded-xl">
        <div className="vimeo-full-width">
          <iframe
            width="100%"
            height="400"
            src={youtubeEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="flex items-center justify-center h-full overflow-hidden lg:rounded-xl bg-background-200 dark:bg-background-800 ">
        {thumbnailURL && (
          <img
            key={thumbnailURL}
            className="opacity-40 dark:opacity-30"
            src={thumbnailURL}
            alt=""
          />
        )}

        <PlayCircleIcon className="absolute w-20 h-20 text-brand" />
      </div>
    </div>
  );
}
