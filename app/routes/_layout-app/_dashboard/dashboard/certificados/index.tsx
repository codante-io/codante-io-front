import { useOutletContext } from "react-router";
import { FaRegClock } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router";
import type {
  CertificateDashboard,
  Dashboard,
} from "~/lib/models/dashboard.server";
import { Clock } from "lucide-react";
import { PiCertificate } from "react-icons/pi";
import type { User } from "~/lib/models/user.server";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import { FaCrown } from "react-icons/fa";
import { Card } from "~/components/ui/cards/card";
import { Separator } from "~/components/ui/separator";

export default function CertificateDashboard() {
  const { dashboardData, user }: { dashboardData: Dashboard; user: User } =
    useOutletContext();
  const certificates = dashboardData.certificates;

  let publishedCertificates;
  let pendingCertificates;

  if (certificates) {
    publishedCertificates = certificates.filter(
      (certificate) => certificate.status === "published",
    );
    pendingCertificates = certificates.filter(
      (certificate) => certificate.status === "pending",
    );
  }

  if (!user.is_pro)
    return (
      <>
        <h1 className="text-2xl mb-8 mt-8 md:mt-0">Certificados </h1>
        <ProBanner />
      </>
    );
  return (
    <div className="text-center md:text-start">
      <h1 className="text-2xl mb-8 mt-8 md:mt-0">
        Certificados{" "}
        <span className="text-brand-400 font-semibold">publicados</span>
      </h1>
      <div className="flex flex-col gap-3 md:items-start items-center justify-center md:justify-start">
        {publishedCertificates && publishedCertificates.length > 0 ? (
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

      {pendingCertificates &&
        pendingCertificates.length > 0 &&
        pendingCertificates.map((certificate) => (
          <div key={certificate.id}>
            <Separator orientation="horizontal" className="my-5" />
            <h1 className="text-2xl mb-3">
              Certificados{" "}
              <span className="text-brand-400 font-semibold">pendentes</span>
            </h1>
            <div className="flex flex-col gap-3 md:items-start items-center justify-center md:justify-start">
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                pending
              />
            </div>
          </div>
        ))}
    </div>
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
        title={certificate.certifiable_name}
      >
        <p className="flex items-center gap-1 shrink-0">
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
          <span className="max-w-[185px] sm:max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
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
    <Card className="p-3 sm:p-8 max-w-[500px]">
      <h3 className="font-bold text-xl text-brand font-lexend mb-2">Ops...</h3>
      <span>
        Apenas membros <ProSpanWrapper>PRO</ProSpanWrapper> podem acessar os
        Certificados.
      </span>
      <Link to="/assine" className="w-full inline-block mt-4">
        <button className="cursor-pointer mx-auto w-full flex gap-1 justify-center items-center px-4 py-4 text-gray-700 rounded-lg bg-linear-to-r animate-bg from-amber-200 via-amber-300 to-amber-400">
          <FaCrown className="mr-2 text-amber-500" />
          <span>
            Seja
            <b className="ml-1">PRO </b>
          </span>
        </button>
      </Link>
    </Card>
  );
}
