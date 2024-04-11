import { useOutletContext } from "@remix-run/react";
import { FaRegClock } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import type {
  CertificateDashboard,
  Dashboard,
} from "~/lib/models/dashboard.server";

export default function CertificateDashboard() {
  const { certificates }: Dashboard = useOutletContext();

  const publishedCertificates = certificates.filter(
    (certificate) => certificate.status === "published",
  );
  const pendingCertificates = certificates.filter(
    (certificate) => certificate.status === "pending",
  );
  return (
    <>
      <h1 className="text-2xl mb-3">
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

      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-10" />

      <h1 className="text-2xl mb-3">
        Certificados{" "}
        <span className="text-brand-400 font-semibold">pendentes</span>
      </h1>
      <div className="flex flex-col gap-3 items-start justify-start">
        {pendingCertificates.length > 0 ? (
          pendingCertificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              pending
            />
          ))
        ) : (
          <h2 className="dark:text-gray-600 text-gray-400">
            Você não possui{" "}
            <span className="font-semibold">Certificados publicados</span>
          </h2>
        )}
      </div>
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
  }
  return (
    <>
      <Link
        to={`/certificados/${certificate.id}`}
        className="text-lg font-normal text-gray-600 dark:text-gray-200 hover:opacity-65 transition-opacity ease-in-out"
        onClick={(event) => handleClick(event)}
      >
        <span className="text-brand-400 font-semibold">{certificate.id}</span>
        <span> - </span>
        <span className="font-semibold">
          {certificate.certifiable_type === "WorkshopUser"
            ? "Workshop"
            : "Mini Projeto"}
        </span>{" "}
        <span>{certificate.certifiable_name}</span>
      </Link>
    </>
  );
}
