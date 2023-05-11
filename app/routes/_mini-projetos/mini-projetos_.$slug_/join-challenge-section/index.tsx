import { Form, useLocation, useNavigation } from "@remix-run/react";
import { AiOutlineCheck } from "react-icons/ai";
import LoadingButton from "~/components/form/loading-button";

export default function JoinChallengeSection({
  className = "",
  initialSteps,
  user,
  slug,
}: {
  className?: string;
  initialSteps?: any;
  user?: any;
  slug: string;
}) {
  const location = useLocation();
  const navigation = useNavigation();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <article
      className={`${className} relative w-full bg-white dark:bg-gray-dark shadow-md rounded-lg p-4 pt-3 font-inter border-[1.5px] border-gray-300 dark:border-slate-600`}
    >
      <>
        <nav aria-label="Progress" className="m-4">
          <ol className="overflow-hidden">
            {initialSteps?.map(
              (
                step: {
                  name: string;
                  status: string;
                  description: string;
                  intent: string;
                  button: string;
                },
                stepIndex: number
              ) => (
                <li
                  key={step.name}
                  className={classNames(
                    stepIndex !== initialSteps.length - 1 ? "pb-10" : "",
                    "relative"
                  )}
                >
                  {step.status === "complete" ? (
                    <>
                      {stepIndex !== initialSteps.length - 1 ? (
                        <div
                          className="absolute left-3 top-3 -ml-px mt-0.5 h-full w-0.5 bg-blue-300 dark:bg-blue-900"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start group">
                        <span className="flex items-center h-9">
                          <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-blue-300 rounded-full dark:bg-blue-900 group-hover:bg-blue-400 dark:group-hover:bg-blue-950">
                            <AiOutlineCheck
                              className="w-3 h-3 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                        <span className="flex flex-col min-w-0 ml-4">
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {step.description}
                          </span>
                        </span>
                      </div>
                    </>
                  ) : step.status === "current" ? (
                    <>
                      {stepIndex !== initialSteps.length - 1 ? (
                        <div
                          className="absolute left-3 top-3 -ml-px mt-0.5 h-full w-0.5 bg-gray-300 dark:bg-gray-400"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div
                        className="relative flex items-start group"
                        aria-current="step"
                      >
                        <span
                          className="flex items-center h-9"
                          aria-hidden="true"
                        >
                          <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 rounded-full border-brand">
                            <span className="h-2.5 w-2.5 rounded-full bg-brand animate-pulse" />
                          </span>
                        </span>
                        <span className="flex flex-col min-w-0 ml-4">
                          <span className="text-sm font-bold">{step.name}</span>
                          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: step.description,
                              }}
                            ></span>
                          </span>
                          <Form method="post" action={`/mini-projetos/${slug}`}>
                            <input
                              type="hidden"
                              name="redirectTo"
                              value={location.pathname}
                            />
                            <input type="hidden" name="user" value={user} />
                            <LoadingButton
                              status={navigation.state}
                              type="submit"
                              className="my-4"
                              name="intent"
                              value={step.intent}
                            >
                              {step.button}
                            </LoadingButton>
                          </Form>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      {stepIndex !== initialSteps.length - 1 ? (
                        <div
                          className="absolute left-3 top-3 -ml-px mt-0.5 h-full w-0.5 bg-gray-300 dark:bg-gray-400"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start group">
                        <span
                          className="flex items-center h-9"
                          aria-hidden="true"
                        >
                          <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                            {" "}
                            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 bg-gray-300 dark:bg-gray-400" />
                          </span>
                        </span>
                        <span className="flex flex-col min-w-0 ml-4">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {step.name}
                          </span>
                          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {step.description}
                          </span>
                        </span>
                      </div>
                    </>
                  )}
                </li>
              )
            )}
          </ol>
        </nav>
      </>
    </article>
  );
}
