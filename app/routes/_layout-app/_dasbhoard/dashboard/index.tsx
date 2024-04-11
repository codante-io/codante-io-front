import {
  Link,
  Outlet,
  json,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { PiCertificateLight } from "react-icons/pi";
import { MdComputer } from "react-icons/md";
import { getDashboardData } from "~/lib/models/dashboard.server";

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  return json({
    dashboardData: await getDashboardData(request),
  });
}

export default function Dashboard() {
  const { dashboardData } = useLoaderData<typeof loader>();
  // console.log(dashboardData);

  const location = useLocation();

  const tabs: {
    name: string;
    icon: React.ReactNode;
    href: string;
    current: boolean;
  }[] = [
    {
      name: "Workshops",
      href: "workshops",
      icon: <MdComputer />,
      current: location.pathname.includes("workshops"),
    },
    {
      name: "Mini Projetos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13 8V4q0-.425.288-.713T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9h-6q-.425 0-.713-.288T13 8ZM3 12V4q0-.425.288-.713T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13H4q-.425 0-.713-.288T3 12Zm10 8v-8q0-.425.288-.713T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21h-6q-.425 0-.713-.288T13 20ZM3 20v-4q0-.425.288-.713T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21H4q-.425 0-.713-.288T3 20Zm2-9h4V5H5v6Zm10 8h4v-6h-4v6Zm0-12h4V5h-4v2ZM5 19h4v-2H5v2Zm4-8Zm6-4Zm0 6Zm-6 4Z"
          ></path>
        </svg>
      ),
      href: "mini-projetos",
      current: location.pathname.includes("mini-projetos"),
    },
    {
      name: "Certificados",
      href: "certificados",
      icon: <PiCertificateLight />,
      current: location.pathname.includes("certificados"),
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col container mx-auto">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-col gap-4 bg-muted/40 md:gap-8">
        <div className="mx-auto grid w-full gap-2">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </div>
        <div className="mx-auto grid w-full items-start gap-2 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={`w-fit ${
                  tab.current ? "font-semibold" : ""
                } flex items-center gap-2`}
                aria-current={tab.current ? "page" : undefined}
              >
                <span className={tab.current ? "text-brand" : ""}>
                  {tab.icon}
                </span>
                {tab.name}
              </Link>
            ))}
          </nav>
          <div className="grid gap-6 mt-5 md:mt-0">
            <Outlet context={dashboardData} />
          </div>
        </div>
      </main>
    </div>
  );
}
