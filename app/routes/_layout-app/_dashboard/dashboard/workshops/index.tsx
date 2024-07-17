import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import { Separator } from "~/components/ui/separator";
import useLazyLoading from "~/lib/hooks/use-lazy-loading";
import { getDashboardWorkshops } from "~/lib/models/dashboard.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // get workshop data
  const workshops = await getDashboardWorkshops(request);

  const completedWorkshops = workshops.filter(
    (workshop) => workshop.pivot?.status === "completed",
  );

  const ongoingWorkshops = workshops.filter(
    (workshop) => workshop.pivot?.status !== "completed",
  );

  return { workshops, completedWorkshops, ongoingWorkshops };
}

export default function WorkshopsDashboard() {
  const loaderData = useLoaderData<typeof loader>();
  const { completedWorkshops, ongoingWorkshops } = loaderData;

  useLazyLoading();

  return (
    <div className="text-center md:text-start">
      <div className="">
        <h1 className="text-2xl mb-8 mt-8 md:mt-0">
          Workshops{" "}
          <span className="font-semibold text-brand-400">em andamento</span>
        </h1>
        <div className="grid justify-center w-full grid-cols-1 gap-4 px-0 md:grid-cols-2 lg:grid-cols-3">
          {ongoingWorkshops && ongoingWorkshops.length > 0 ? (
            ongoingWorkshops.map((workshop) => (
              <WorkshopCard size={"sm"} key={workshop.id} workshop={workshop} />
            ))
          ) : (
            <h2 className="dark:text-gray-600 text-gray-400">
              Você não possui{" "}
              <span className="font-semibold">Workshops em andamento</span>
            </h2>
          )}
        </div>

        <Separator orientation="horizontal" className="my-5 mt-12" />
        <h1 className="text-2xl mb-8">
          Workshops{" "}
          <span className="font-semibold text-brand-400">concluídos</span>
        </h1>
        <div className="grid justify-center w-full grid-cols-1 gap-4 px-0 md:grid-cols-2 lg:grid-cols-3">
          {completedWorkshops && completedWorkshops.length > 0 ? (
            completedWorkshops.map((workshop) => (
              <WorkshopCard size={"sm"} key={workshop.id} workshop={workshop} />
            ))
          ) : (
            <h2 className="dark:text-gray-600 text-gray-400">
              Você não concluiu nenhum{" "}
              <span className="font-semibold">Workshop</span>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}

// function WorkshopCard({ workshop }: { workshop: WorkshopUserDashboard }) {
//   return (
//     <article className="w-full flex flex-col justify-center items-center xl:max-w-[292px] max-w-[298px]">
//       <Link
//         to={`/workshops/${workshop.workshop_slug}`}
//         className="relative flex-col w-full flex-grow flex max-w-xl border-[1.5px] border-background-200 dark:border-background-600 rounded-2xl overflow-hidden bg-background-50 shadow dark:bg-background-700 mb-4  hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow sm:h-[225px]"
//       >
//         <div
//           style={{
//             backgroundImage: `url(${
//               workshop.workshop_image || "/img/computer.jpg"
//             })`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           className="w-full h-40 rounded-t-xl shadow-[inset_0_-190px_50px_-100px_theme('colors.background.50')] dark:shadow-[inset_0_-190px_50px_-100px_theme('colors.background.700')] "
//         ></div>

//         <div className="flex flex-col justify-between flex-1 px-6 py-4 -mt-10 text-left md:mt-0 h-[400px] overflow-hidden">
//           <div>
//             <div className="mb-8">
//               <h2 className="mb-1 font-light text-gray-700 dark:text-gray-50 font-lexend ">
//                 {workshop.workshop_name}
//               </h2>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }
