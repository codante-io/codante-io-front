import { Link } from "react-router";
import type { ProfileCertificate } from "~/lib/models/user.server";
import { formatDate } from "~/lib/utils/format-date";

export default function ProfileCertificates({
  certificates,
}: {
  certificates: ProfileCertificate[];
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold font-lexend dark:text-gray-50 mb-6">
        Certificados
      </h2>
      {certificates.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Nenhum certificado ainda.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Link
              key={cert.id}
              to={`/certificados/${cert.id}`}
              prefetch="intent"
              className="flex items-center gap-4 rounded-xl border border-background-200 dark:border-background-600 bg-background-50 dark:bg-background-800 p-4 hover:border-background-500 hover:shadow-lg transition-all"
            >
              <div className="flex-shrink-0 text-2xl">📜</div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {cert.metadata?.certifiable_source_name ?? "Certificado"}
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {formatDate(cert.created_at)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
