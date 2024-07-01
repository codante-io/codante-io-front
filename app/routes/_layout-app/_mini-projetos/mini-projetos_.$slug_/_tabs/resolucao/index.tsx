import { useOutletContext, useNavigate } from "@remix-run/react";
import type { Challenge } from "~/lib/models/challenge.server";
import NextLessonPreview from "~/components/features/workshop/next-lesson-preview";
import TitleIcon from "~/components/ui/title-icon";
import ProgressBar from "~/routes/_layout-raw/_player/components/progress-bar";
import InstructorCard from "~/components/ui/cards/instructor-card";
import WorkshopLessonsHeader from "~/components/features/workshop/workshop-lessons-header";
import WorkshopLessonsList from "~/components/features/workshop/workshop-lessons-list";

export default function Resolution() {
  const context = useOutletContext<{ challenge: Challenge }>();
  const navigate = useNavigate();
  const challenge = context?.challenge;
  const workshop = challenge?.workshop;
  // const lesson = workshop?.lessons[0];
  // const slug = lesson?.slug;

  if (!challenge?.has_solution) {
    return navigate(`/mini-projetos/${challenge?.slug}`);
  }

  return (
    <>
      <div className="container">
        {workshop && (
          <div className="flex flex-wrap lg:flex-nowrap lg:gap-14">
            <div className="w-full">
              <NextLessonPreview
                workshop={workshop}
                nextLesson={workshop?.lessons[0]}
              />
            </div>

            <div className="lg:w-3/5 space-y-12">
              {/* Progress Bar & Certificate */}
              {workshop.workshop_user && (
                <div className="">
                  <div className="flex items-center">
                    <TitleIcon className="inline-block w-3 h-3 mr-2" />
                    <h3 className="inline-block mt-0 text-lg font-light">
                      <span className="font-bold">Progresso</span>
                    </h3>
                  </div>
                  <ProgressBar
                    lessons={workshop.lessons}
                    showStatus={true}
                    workshopUser={workshop.workshop_user}
                  />
                </div>
              )}
              {/* Instrutor */}
              <div>
                <div className="flex items-center">
                  <TitleIcon className="inline-block w-3 h-3 mr-2" />
                  <h3 className="inline-block mt-0 text-lg font-light">
                    Seu <span className="font-bold">Instrutor</span>
                  </h3>
                </div>
                <InstructorCard instructor={workshop.instructor} />
              </div>

              {/* Aulas */}
              <div className="">
                {workshop.lessons.length > 0 && (
                  <div>
                    <WorkshopLessonsHeader workshop={workshop} showResources />
                    <WorkshopLessonsList activeIndex={-1} workshop={workshop} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* <section className="flex w-full gap-4 md:gap-8 items-start md:justify-start md:items-center md:flex-row ">
          <CardButton
            name="Vídeo"
            icon={
              <VideoCameraIcon className="md:w-10 w-8 group-hover:text-brand-400 text-background-200 dark:text-gray-700 transition-colors" />
            }
            onClick={() =>
              navigate(`/mini-projetos/${challenge?.slug}/resolucao/${slug}`)
            }
          />
          <CardButton
            name="Código"
            icon={
              <CodeBracketIcon className="md:w-10 w-8 group-hover:text-brand-400 text-background-200 dark:text-gray-700 transition-colors" />
            }
            onClick={() =>
              navigate(`/mini-projetos/${challenge?.slug}/resolucao-codigo`)
            }
          />
        </section> */}
      </div>
    </>
  );
}

// function CardButton({
//   name,
//   icon,
//   onClick,
// }: {
//   name: string;
//   icon: any;
//   onClick: any;
// }) {
//   return (
//     <Card
//       asChild
//       className="dark:bg-background-800/30 hover:dark:bg-background-800/80 transition-colors"
//       hover={"brand"}
//       rounded={"2xl"}
//     >
//       <button
//         className={`w-full flex flex-col-reverse md:flex-row items-center justify-between cursor-pointer  hover:dark:bg-background-800/100 group  px-4 py-4 md:py-10 sm:px-10 gap-4 md:gap-0`}
//         onClick={onClick}
//       >
//         <p className="flex flex-col text-center md:text-left">
//           <span className="text-xs md:text-sm dark:text-gray-500 text-gray-500">
//             Acessar a resolução em
//           </span>
//           <span>
//             <span className="md:text-2xl text-xl dark:text-white text-gray-700">
//               {name}
//             </span>
//           </span>
//         </p>
//         {icon}
//       </button>
//     </Card>
//   );
// }
