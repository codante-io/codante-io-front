import { useOutletContext } from "@remix-run/react";
import { FaRegClock } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import type {
  CertificateDashboard,
  Dashboard,
} from "~/lib/models/dashboard.server";
import { Clock } from "lucide-react";
import { PiCertificate } from "react-icons/pi";
import type { User } from "~/lib/models/user.server";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import { FaCrown } from "react-icons/fa";

export default function CertificateDashboard() {
  const { dashboardData, user }: { dashboardData: Dashboard; user: User } =
    useOutletContext();
  const certificates = dashboardData.certificates;

  const publishedCertificates = certificates.filter(
    (certificate) => certificate.status === "published",
  );
  const pendingCertificates = certificates.filter(
    (certificate) => certificate.status === "pending",
  );

  if (!user.is_pro) return <ProBanner />;
  return (
    <>
      <h1 className="text-2xl mb-8">
        Certificados{" "}
        <span className="text-brand-400 font-semibold">publicados</span>
      </h1>
      <div className="flex flex-col gap-3 items-start justify-start">
        {publishedCertificates.length > 0 ? (
          publishedCertificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))
        ) : (
          <h2 className="dark:text-gray-600 text-gray-400">
            Você não possui{" "}
            <span className="font-semibold">Certificados publicados</span>
          </h2>
        )}
      </div>

      {pendingCertificates.length > 0 &&
        pendingCertificates.map((certificate) => (
          <>
            <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-10" />
            <h1 className="text-2xl mb-3">
              Certificados{" "}
              <span className="text-brand-400 font-semibold">pendentes</span>
            </h1>
            <div className="flex flex-col gap-3 items-start justify-start">
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                pending
              />
            </div>
          </>
        ))}
    </>
  );
}

function CertificateCard({
  certificate,
  pending = false,
}: {
  certificate: CertificateDashboard;
  pending?: boolean;
}) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (pending) {
      event?.preventDefault();
      return waitingToast();
    }
  }
  return (
    <>
      <Link
        to={`/certificados/${certificate.id}`}
        className="flex items-center gap-1 font-normal text-gray-600 dark:text-gray-200 hover:opacity-65 transition-opacity ease-in-out text-sm sm:text-base"
        onClick={(event) => handleClick(event)}
      >
        <p className="flex items-center gap-1 flex-shrink-0">
          {pending ? (
            <Clock className="w-3 h-3 text-yellow-300 sm:mr-2" />
          ) : (
            <PiCertificate className="w-4 h-4 text-brand-400 mr-2" />
          )}
          <span className="font-semibold flex items-center">
            {certificate.certifiable_type === "WorkshopUser"
              ? "Workshop"
              : "MP"}
          </span>{" "}
          <span className="max-w-[150px] sm:max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
            {certificate.certifiable_name}
          </span>
        </p>
      </Link>
    </>
  );
}

function waitingToast() {
  return toast((t) => (
    <div
      onClick={() => toast.dismiss(t.id)}
      className="flex flex-row items-center gap-5"
    >
      <FaRegClock className="text-yellow-400 w-10" />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold flex">
          Esse certificado foi solicitado e a submissão está sendo avaliada!
        </p>
        <p className="text-sm">A análise pode levar até 3 dias úteis.</p>
      </div>
    </div>
  ));
}

function ProBanner() {
  return (
    <div className="absolute z-20 p-3 bg-white border border-gray-200 rounded-lg shadow-2xl shadow-background-700 dark:bg-background-800 dark:border-background-600 md:p-10 mx-3 mt-10 sm:m-10">
      <h3 className="font-bold md:text-2xl text-brand font-lexend">Ops... </h3>
      <span>
        Você precisa ser um membro <ProSpanWrapper>PRO</ProSpanWrapper> para ter
        acesso aos certificados.
      </span>
      <Link to="/assine" className="w-full inline-block mt-4">
        <button className="mx-auto w-full flex gap-1 justify-center items-center px-4 py-4 text-gray-700 rounded-lg bg-gradient-to-r animate-bg from-amber-200 via-amber-300 to-amber-400">
          <FaCrown className="mr-2 text-amber-500" />
          <span>
            Seja
            <b className="ml-1">PRO </b>
          </span>
        </button>
      </Link>
    </div>
  );
}
