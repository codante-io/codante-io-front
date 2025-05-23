import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router";
import { useState } from "react";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import { login, sessionStorage } from "~/lib/services/auth.server";
import AuthCard from "../auth-card";
import LoadingButton from "~/components/features/form/loading-button";
import type { LoaderFunctionArgs } from "react-router";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import type { MetaFunction } from "react-router";

export function links() {
  return [
    {
      rel: "canonical",
      href: "https://codante.io/login",
    },
  ];
}

export const meta: MetaFunction = () => {
  const title = "Login | Codante.io";
  const description =
    "Entre para ter acesso a todas as funcionalidades da plataforma.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirectTo") as string;

  const { errors, redirector } = await login({
    request,
    email,
    password,
    redirectTo,
  });

  return errors || redirector;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // await authenticator.isAuthenticated(request, {
  //   successRedirect: "/",
  // });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const user = session.get("user");
  if (user) {
    return redirect("/");
  }

  // vamos pegar o redirectTo da query string
  // para passar como parâmetro hidden para o form
  const redirectTo = new URL(request.url).searchParams.get("redirectTo");
  return { redirectTo };
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const transition = useNavigation();

  const status = transition.state;

  const navigator = useNavigate();
  const { colorMode } = useColorMode();

  const initialOpened = Boolean(searchParams.get("opened") ?? false);

  const [opened, setOpened] = useState(initialOpened);
  const errors = useActionData();

  // vamos pegar o redirectTo da query string
  // para passar como parâmetro hidden para o form
  const loaderData = useLoaderData<typeof loader>();
  const redirectTo = loaderData?.redirectTo ?? "/";

  return (
    <>
      <div className="h-[45px] mb-10 hidden sm:block">
        <img
          src={colorMode === "light" ? "/codante-light.svg" : "/codante.svg"}
          alt=""
          className="mx-auto mb-16 w-72"
        />
      </div>
      <div className="mx-auto max-w-md md:w-[450px]">
        <AuthCard className={opened ? "hidden" : ""}>
          <Form action={`/auth/github`} method="get">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <LoadingButton
              status={status}
              type="submit"
              size="xl"
              className="relative w-full text-white transition duration-200  rounded-lg *:flex *:items-center *:justify-center *:w-full *:gap-4 *:p-2 *:text-white *:transition *:duration-200 *:text-lg hover:bg-opacity-90 bg-background-700 "
            >
              <img src="/img/github-logo.svg" alt="" />
              Entrar com GitHub
            </LoadingButton>
          </Form>
        </AuthCard>

        <AuthCard className={opened ? "" : "hidden"}>
          <h1 className="mb-8 text-lg text-gray-700 dark:text-gray-50">
            Login
          </h1>
          <Form method="POST" className="flex flex-col ">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" className="mb-8" />
            <Label htmlFor="password">Senha</Label>
            <Input
              name="password"
              id="password"
              type="password"
              className="mb-2"
            />
            <div>
              <Link
                to="/forgot-password"
                className="text-xs font-light text-gray-500 underline"
              >
                Esqueceu sua senha?
              </Link>
              <span className="font-light text-blue-500"> &#8226; </span>
              <Link
                to="/register"
                className="text-xs font-light text-gray-500 underline"
              >
                Não possui Cadastro?
              </Link>
            </div>
            <div className="mt-2 mb-3 text-xs text-red-400 min-h-4">
              {errors as any}
            </div>
            <div className="text-right">
              <Button type="submit">Login</Button>
            </div>
          </Form>
        </AuthCard>
        <p
          className={`text-center sm:text-left text-sm font-light text-gray-600 dark:text-gray-400 mb-2 mt-4`}
        >
          ... ou entre com{" "}
          <button
            className="underline"
            onClick={() => {
              setOpened(!opened);
              navigator(
                opened
                  ? `?redirectTo=${redirectTo}`
                  : `?opened=true&redirectTo=${redirectTo}`,
              );
            }}
          >
            {opened ? "Github" : "email e senha"}
          </button>
        </p>
      </div>
      <div className="px-1 mt-6 mb-4">
        <p className="text-xs font-normal text-center text-gray-500 sm:text-justify">
          Ao entrar ou se cadastrar você está de acordo com a nossa{" "}
          <Link
            to="/politica-de-privacidade"
            className="hover:underline underline-offset-2 hover:opacity-70"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </>
  );
}
