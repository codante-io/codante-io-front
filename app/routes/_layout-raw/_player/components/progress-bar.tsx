import { Link, useOutletContext } from "@remix-run/react";
import toast from "react-hot-toast";
import { PiCertificateLight } from "react-icons/pi";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import type { Lesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import type { WorkshopUser } from "~/lib/models/workshop.server";
import { formatDateDDMMYYYY } from "~/lib/utils/format-date";

export default function ProgressBar({
  lessons,
  showStatus = false,
  workshopUser,
}: {
  lessons: Lesson[];
  showStatus?: boolean;
  workshopUser?: WorkshopUser;
}) {
  const { user } = useOutletContext<{
    user: User;
  }>();

  const completedPercentage =
    (lessons.filter((l) => l.user_completed).length * 100) / lessons.length;

  const isCompleted = completedPercentage >= 100;

  function handleSubmit() {
    toast((t) => (
      <div onClick={() => toast.dismiss(t.id)} className="flex flex-col gap-2">
        <p>
          Apenas membros <ProSpanWrapper>PRO</ProSpanWrapper> podem solicitar
          certificados.
        </p>
        <Link
          to="/assine"
          className="w-fit underline dark:text-gray-500 text-gray-400 text-sm"
        >
          Ver planos
        </Link>
      </div>
    ));
  }
  return (
    <>
      <div className="pr-4 mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className={`${
              isCompleted ? "bg-green-600" : "dark:bg-brand-400 bg-brand-300"
            } h-2.5 rounded-full`}
            style={{
              width: `${completedPercentage}%`,
            }}
          />
        </div>
      </div>
      {showStatus && (
        <div className="flex gap-3 items-center mt-5">
          <p className="dark:text-gray-400 text-gray-600 text-xs">
            {workshopUser?.completed_at &&
              `Você completou esse Workshop em ${formatDateDDMMYYYY(
                workshopUser?.completed_at,
              )}.`}
            {workshopUser?.certificate ? (
              <Link
                className="flex gap-2 hover:opacity-80 items-center w-fit dark:text-gray-400 text-gray-600 text-sm mt-2"
                to={`/certificados/${workshopUser?.certificate.id}`}
                onClick={(event) => {
                  if (!user.is_pro) {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
              >
                <PiCertificateLight className="text-lg" />
                Certificado
              </Link>
            ) : (
              <span className="">
                {completedPercentage === 0
                  ? "Você ainda não assistiu nenhuma aula."
                  : `Você já assistiu ${Math.round(completedPercentage)}% desse
                Workshop.`}
              </span>
            )}
          </p>
        </div>
      )}
    </>
  );
}
