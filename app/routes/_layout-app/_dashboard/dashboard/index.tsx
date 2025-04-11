import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useEffect } from "react";
import { MdComputer, MdOutlineUpload } from "react-icons/md";
import { PiCertificateLight } from "react-icons/pi";
import NotFound from "~/components/features/error-handling/not-found";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getDashboardData } from "~/lib/models/dashboard.server";
import type { User } from "~/lib/models/user.server";

export async function loader({ request }: { request: Request }) {
  return { dashboardData: await getDashboardData(request) };
}

export default function Dashboard() {
  const { dashboardData } = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User }>();

  const navigate = useNavigate();
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
      name: "Submissões",
      href: "submissoes",
      icon: <MdOutlineUpload />,
      current: location.pathname.includes("submissoes"),
    },
    {
      name: "Certificados",
      href: "certificados",
      icon: <PiCertificateLight />,
      current: location.pathname.includes("certificados"),
    },
  ];

  useEffect(() => {
    if (
      (location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/") &&
      user
    ) {
      navigate("/dashboard/workshops");
    }
  }, [location, navigate, user]);

  if (!user) return <NotFound />;

  return (
    <div className="flex min-h-screen w-full flex-col container mx-auto">
      <main className="flex min-h-[calc(100vh-(--spacing(16)))] flex-col gap-4 bg-muted/40 md:gap-8">
        <div className="mx-auto grid w-full gap-2">
          <h1 className="text-center md:text-start text-3xl font-semibold">
            Dashboard
          </h1>
        </div>
        <div className="mx-auto grid w-full items-start gap-2 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          {/* navbar when md or bigger */}
          <nav className="md:grid gap-4 text-sm text-muted-foreground hidden">
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
          {/* navbar when sm or xs */}
          <nav className="text-sm w-full md:hidden mt-6 flex justify-center">
            <Select
              onValueChange={(value) => {
                navigate(`/dashboard/${value}`);
              }}
            >
              <SelectTrigger className="max-w-full">
                <SelectValue
                  placeholder={
                    tabs.find((tab) => tab.current)
                      ? tabs.find((tab) => tab.current)?.name
                      : "Workshops"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Dashboard</SelectLabel>
                  {tabs.map((tab) => (
                    <SelectItem value={tab.href} key={tab.href}>
                      <span>{tab.name ? tab.name : "Workshops"}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </nav>

          <div className="">
            <Outlet context={{ dashboardData, user }} />
          </div>
        </div>
      </main>
    </div>
  );
}
