import { Link } from "@remix-run/react";
import { HiMiniArrowSmallRight, HiMiniPlayCircle } from "react-icons/hi2";

// thumbnail

function NextLessonPreview({
  lessonName,
  lessonNumber,
  lessonUrl,
  thumbnailUrl,
  type = "keep-watching",
}: {
  lessonName: string;
  lessonNumber: number;
  lessonUrl: string;
  thumbnailUrl?: string;
  type?: "keep-watching" | "watch-now";
}) {
  return (
    <Link
      to={lessonUrl}
      className={`relative flex items-center justify-center aspect-video overflow-hidden rounded-xl bg-background-200 dark:bg-background-800 group dark:border-none border-2`}
    >
      {thumbnailUrl && <img className="opacity-70" src={thumbnailUrl} alt="" />}

      <div className="absolute z-10 opacity-90 sm:opacity-70 group-hover:opacity-90 scale-100 group-hover:scale-110 transition-all duration-300">
        <HiMiniPlayCircle className="sm:w-28 sm:h-28 h-16 w-16 text-brand-500" />
      </div>

      <div className="flex absolute w-full bottom-0 z-10 bg-background-100 px-4 dark:bg-background-800 justify-end dark:border-t-2 border-background-200 dark:border-background-700 pb-0 group-hover:pb-1 transition-all">
        <div className="flex items-center justify-between sm:p-4 p-2 right-0">
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-xs sm:text-lg font-semibold text-gray-800 dark:text-gray-50">
                {type === "watch-now"
                  ? "Assistir agora"
                  : "Continuar assistindo"}
                <HiMiniArrowSmallRight className="inline-block" />
              </h3>
              <p className="text-xs sm:text-sm font-light text-gray-500 dark:text-gray-300">
                <b className="sm:text-xs text-[10px] text-brand-500">
                  {lessonNumber}.
                </b>{" "}
                {lessonName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NextLessonPreview;
