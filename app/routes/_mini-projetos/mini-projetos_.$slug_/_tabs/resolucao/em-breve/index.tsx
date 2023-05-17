import { useOutletContext } from "@remix-run/react";
import type { ChallengeCardInfo } from "~/models/challenge.server";
import { getPublishedDateAndTime } from "~/utils/interval";

export default function Soon() {
  const { challenge } = useOutletContext<{ challenge: ChallengeCardInfo }>();
  const [publishedDate, publishedTime] = getPublishedDateAndTime(
    challenge.published_at
  );

  return (
    <div className="container ">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Resolução em breve!
      </h1>
      <div className="text-sm text-gray-500">
        <p>
          Este Mini Projeto ainda não foi resolvido por um de nossos
          instrutores.
        </p>
        {publishedDate && (
          <p className="mt-1">
            Você poderá acompanhar a resolução no dia{" "}
            <strong className="text-gray-900 dark:text-gray-50">
              {publishedDate}
              {publishedTime && ", às " + publishedTime}
            </strong>
          </p>
        )}
      </div>
      <div className="py-12 pt-20 mx-auto text-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="text-black/[.04] dark:text-white/[.02] inline-block w-40"
        >
          <path
            fill="currentColor"
            d="M0 24C0 10.7 10.7 0 24 0h336c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v19c0 40.3-16 79-44.5 107.5L225.9 256l81.5 81.5C336 366 352 404.7 352 445v19h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8v-19c0-40.3 16-79 44.5-107.5l81.6-81.5l-81.6-81.5C48 146 32 107.3 32 67V48h-8C10.7 48 0 37.3 0 24zm110.5 347.5c-3.9 3.9-7.5 8.1-10.7 12.5h184.4c-3.2-4.4-6.8-8.6-10.7-12.5L192 289.9l-81.5 81.5zM284.2 128C297 110.4 304 89 304 67V48H80v19c0 22.1 7 43.4 19.8 61h184.4z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
