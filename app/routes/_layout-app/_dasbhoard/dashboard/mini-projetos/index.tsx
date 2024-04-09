import { Link, useNavigate, useOutletContext } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import type { ChallengeUser } from "~/lib/models/user.server";

export default function ChallengeDashboard() {
  const challengeUser: ChallengeUser = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-normal">
            Mini Projetos <span className="font-semibold">concluídos</span>
          </CardTitle>
          <CardDescription>Mini Projetos que você já concluiu.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="flex flex-wrap gap-4 items-center justify-center">
            {challengeUser.length > 0
              ? challengeUser
                  .filter((challenge) => challenge.completed === 1)
                  .map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex items-center justify-center flex-col gap-1"
                    >
                      <div
                        className={`group flex m-1 items-center justify-center h-44 bg-opacity-20 rounded-t-xl dark:bg-opacity-40 bg-background-600 overflow-hidden`}
                      >
                        <img
                          src={challenge.challenge_image}
                          className={`inline-block -mb-3 h-full object-cover ${
                            challenge.status === "soon"
                              ? "group-hover:animate-tada"
                              : "group-hover:animate-float"
                          }`}
                          alt=""
                        />
                      </div>
                      <h3 className="font-semibold text-center">
                        {challenge.challenge_name}
                      </h3>
                    </div>
                  ))
              : "não há"} */}
          {/* break */}
          {/* <div className="flex flex-wrap gap-4 items-center justify-center">
            {challengeUser.length > 0
              ? challengeUser
                  .filter((challenge) => challenge.completed === 1)
                  .map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex sm:w-80 sm:h-56 pt-2 items-center justify-center flex-col gap-1 cursor-pointer bg-gray-100 dark:bg-gray-800 rounded px-2 group overflow-hidden dark:border-gray-700 border border-gray-300"
                      onClick={() =>
                        navigate(`/mini-projetos/${challenge.slug}`)
                      }
                    >
                      <h3 className="font-light text-center">
                        {challenge.challenge_name}
                      </h3>
                      <img
                        src={challenge.challenge_image}
                        className="sm:max-w-xs -mb-4 group-hover:animate-float"
                        alt=""
                      />
                    </div>
                  ))
              : "não há"}
          </div> */}
          {/* break */}
          {/* {challengeUser.length > 0 ? (
            <ul>
              {challengeUser
                .filter((challenge) => challenge.completed === 1)
                .map((challenge) => (
                  <li
                    key={challenge.id}
                    className="flex items-center justify-between hover:text-brand-400 hover:opacity-80"
                  >
                    <Link to={`/mini-projetos/${challenge.slug}`}>
                      {challenge.challenge_name}
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            "não há"
          )} */}
          {/* break
           */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {challengeUser.length > 0
              ? challengeUser
                  .filter((challenge) => challenge.completed === 1)
                  .map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex sm:w-80 sm:h-56 pt-2 items-center justify-center flex-col gap-1 cursor-pointer bg-gray-100 dark:bg-gray-800 rounded px-2 group overflow-hidden dark:border-gray-700 border border-gray-300"
                      onClick={() =>
                        navigate(`/mini-projetos/${challenge.slug}`)
                      }
                    >
                      <h3 className="font-light text-center">
                        {challenge.challenge_name}
                      </h3>
                      <img
                        src={challenge.challenge_image}
                        className="sm:max-w-xs -mb-4 group-hover:animate-float"
                        alt=""
                      />
                    </div>
                  ))
              : "não há"}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-normal">
            Mini Projetos <span className="font-semibold">em andamento</span>
          </CardTitle>
          <CardDescription>
            Mini Projetos que você iniciou mas não concluiu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {challengeUser.length > 0
              ? challengeUser
                  .filter((challenge) => challenge.completed === 0)
                  .map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex sm:w-80 sm:h-56 pt-2 items-center justify-center flex-col cursor-pointer bg-gray-100 dark:bg-gray-800 rounded px-2 group overflow-hidden dark:border-gray-700 border border-gray-300"
                      onClick={() =>
                        navigate(`/mini-projetos/${challenge.slug}`)
                      }
                    >
                      <h3 className="font-light text-center">
                        {challenge.challenge_name}
                      </h3>
                      <img
                        src={challenge.challenge_image}
                        className="sm:max-w-xs -mb-4 group-hover:animate-float"
                        alt=""
                      />
                    </div>
                  ))
              : "não há"}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
