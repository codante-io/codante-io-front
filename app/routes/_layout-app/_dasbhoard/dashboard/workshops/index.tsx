import { Link, useOutletContext } from "@remix-run/react";
import type { User } from "~/lib/models/user.server";

import type { Workshop } from "~/lib/models/workshop.server";

export default function WorkshopsDashboard() {
  const user: User = useOutletContext();
  const workshopUsers = user.workshop_users;
  // console.log(workshopUsers);
  return (
    <>
      <div className="">
        <h1 className="text-2xl mb-3">
          Workshops{" "}
          <span className="font-semibold text-brand-400">em andamento</span>
        </h1>
        <div className="flex flex-wrap gap-6 items-center">
          {workshopUsers.length > 0
            ? workshopUsers
                .filter((workshopUser) => workshopUser.status !== "completed")
                .map((workshopUser) => (
                  <WorkshopCard key={workshopUser.id} workshop={workshopUser} />
                ))
            : "não há"}
        </div>

        <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-10" />
        <h1 className="text-2xl mb-3">
          Workshops{" "}
          <span className="font-semibold text-brand-400">concluídos</span>
        </h1>
        <div className="flex flex-wrap gap-6 items-center">
          {workshopUsers.length > 0
            ? workshopUsers
                .filter((workshopUser) => workshopUser.status === "completed")
                .map((workshopUser) => (
                  <WorkshopCard key={workshopUser.id} workshop={workshopUser} />
                ))
            : "não há"}
        </div>
      </div>
    </>
  );
}

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <article className="w-full flex flex-col justify-center items-center xl:max-w-[292px] max-w-[298px]">
      <Link
        to={`/workshops/${workshop.slug}`}
        className="relative flex-col w-full flex-grow flex max-w-xl border-[1.5px] border-background-200 dark:border-background-600 rounded-2xl overflow-hidden bg-background-50 shadow dark:bg-background-700 mb-4  hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow sm:h-[225px]"
      >
        <div
          style={{
            backgroundImage: `url(${
              workshop.workshop_image || "/img/computer.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-40 rounded-t-xl shadow-[inset_0_-190px_50px_-100px_theme('colors.background.50')] dark:shadow-[inset_0_-190px_50px_-100px_theme('colors.background.700')] "
        ></div>

        <div className="flex flex-col justify-between flex-1 px-6 py-4 -mt-10 text-left md:mt-0 h-[400px] overflow-hidden">
          <div>
            <div className="mb-8">
              <h2 className="mb-1 font-light text-gray-700 dark:text-gray-50 font-lexend ">
                {workshop.workshop_name}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
