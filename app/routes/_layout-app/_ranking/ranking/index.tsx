import { Link, useLoaderData, useSearchParams } from "react-router";
import { BsFillHeartFill, BsTools } from "react-icons/bs";
import { FaMedal, FaCalendar } from "react-icons/fa";
import { getRanking } from "~/lib/models/ranking.server";
import {
  FirstPlace,
  SecondPlace,
  ThirdPlace,
} from "~/components/features/ranking/ranking-badges";
import classNames from "~/lib/utils/class-names";
import UserAvatar from "~/components/ui/user-avatar";
import type { MetaFunction } from "react-router";

// meta function
export const meta: MetaFunction = () => {
  const title = "Ranking | Codante.io";
  const description =
    "Veja o ranking dos usuários do Codante. Quem será que está no topo?";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];
};

export async function loader({ request }: { request: Request }) {
  // get montly query parameter
  const monthly = new URL(request.url).searchParams.get("monthly");

  const rankingUsers = await getRanking(monthly);

  return {
    rankingUsers,
  };
}

export default function RankingList() {
  const loaderData = useLoaderData<typeof loader>();
  const rankingUsers = loaderData.rankingUsers;
  const [searchParams] = useSearchParams();

  // get search params

  return (
    <main className="container mx-auto text-center">
      <h1 className="mb-10 text-3xl md:text-4xl text-center font-lexend">
        Ranking
        {searchParams.get("monthly") && <CurrentMonth />}
      </h1>

      <section className="flex gap-4 mb-4">
        <Link
          to={"/ranking"}
          className={classNames(
            searchParams.get("monthly") === null
              ? "bg-background-150 dark:bg-background-800 dark:text-gray-50 text-gray-800 font-semibold"
              : "text-gray-500 hover:text-gray-700",
            "rounded-full px-3 py-2.5 text-sm flex items-center gap-2",
          )}
        >
          <span
            className={searchParams.get("monthly") === null ? "text-brand" : ""}
          >
            <FaMedal />
          </span>
          Geral
        </Link>
        <Link
          to={"/ranking?monthly=true"}
          className={classNames(
            searchParams.get("monthly")
              ? "bg-background-150 dark:bg-background-800 dark:text-gray-50 text-gray-800 font-semibold"
              : "text-gray-500 hover:text-gray-700",
            "rounded-full px-3 py-2.5 text-sm flex items-center gap-2",
          )}
        >
          <span className={searchParams.get("monthly") ? "text-brand" : ""}>
            <FaCalendar />
          </span>
          Mensal
        </Link>
      </section>
      <ul className="flex flex-col gap-4">
        {rankingUsers?.map((rankingUser, index) => (
          <li
            key={index}
            className="relative w-full p-1 overflow-hidden min-h-[100px] h-64 md:h-auto group/border rounded-xl"
          >
            <div className="absolute gap-8 md:gap-0 z-10 flex flex-col md:flex-row items-center justify-between p-6 pb-4 inset-px dark:bg-background-700 bg-background-50 rounded-xl dark:border-background-600 border-[1.5px] border-background-200">
              <div className="flex flex-col items-center gap-2 md:gap-8 basis-1/2 md:flex-row">
                <div className="basis-10">
                  {index === 0 ? (
                    <FirstPlace />
                  ) : index === 1 ? (
                    <SecondPlace />
                  ) : index === 2 ? (
                    <ThirdPlace />
                  ) : (
                    <span className="flex items-center justify-center border rounded-full w-7 h-7 border-background-200 dark:border-background-600 md:border-0">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <UserAvatar
                    avatar={rankingUser.avatar}
                    className="w-10 h-10"
                  />
                  <span className="text-xl font-semibold text-gray-800 dark:text-white">
                    {rankingUser.avatar.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 basis-1/2 text-end">
                <div className="flex flex-col items-end w-20 gap-1 line-clamp-2">
                  <span className="flex items-center text-xl">
                    <BsTools className="inline-block w-4 h-4 mr-2 text-brand-500" />
                    {rankingUser.completed_challenge_count}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-end">
                    mini-projetos concluídos
                  </span>
                </div>
                <div className="flex flex-col items-end w-20 gap-1 line-clamp-2">
                  <span className="flex items-center text-xl">
                    <BsFillHeartFill className="inline-block w-4 h-4 mr-2 text-brand-500" />
                    {rankingUser.received_reaction_count}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-end">
                    reações recebidas
                  </span>
                </div>
                <div className="w-[0.5px] h-12 bg-gray-400 dark:bg-gray-700 mx-4"></div>

                <div className="flex flex-col items-end justify-end gap-1">
                  <span className="text-3xl">{rankingUser.points}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    pontos
                  </span>
                </div>
              </div>
            </div>
            <span
              aria-hidden="true"
              className={classNames(
                "absolute -z-0 inset-0 group/border scale-x-[1.5] blur-xs before:absolute before:inset-0 before:h-10 before:top-[45%] before:w-full before:bg-[conic-gradient(var(--tw-gradient-stops))] group-hover/border:visible invisible  before:via-transparent before:to-transparent group-hover/border:before:animate-rotate-bg",
                index === 0 && "before:from-amber-400",
                index === 1 && "before:from-slate-300",
                index === 2 && "before:from-amber-700",
              )}
            ></span>
          </li>
        ))}
      </ul>
    </main>
  );
}

function CurrentMonth() {
  return (
    <span className="text-3xl font-normal text-gray-500 first-letter:uppercase">
      {" "}
      (
      <span className="capitalize">
        {new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date())}
      </span>
      /{new Date().getFullYear().toString().slice(-2)})
    </span>
  );
}
