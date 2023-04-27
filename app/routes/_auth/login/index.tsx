import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/form/button";
import Input from "~/components/form/input";
import { useColorMode } from "~/contexts/color-mode-context";
import { login } from "~/services/auth.server";
import AuthCard from "../auth-card";
import { authenticator } from "~/services/github-auth.server";
import LoadingButton from "~/components/form/loading-button";

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  let redirectTo = formData.get("redirectTo") as string;

  let { errors, redirector } = await login({
    request,
    email,
    password,
    redirectTo,
  });

  return errors || redirector;
}

export async function loader({ request }: { request: Request }) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  // vamos pegar o redirectTo da query string
  // para passar como parâmetro hidden para o form
  const redirectTo = new URL(request.url).searchParams.get("redirectTo");
  return { redirectTo };
}

export default function Login() {
  let [searchParams] = useSearchParams();
  const transition = useNavigation();

  const status = transition.state;
  console.log(status);

  const navigator = useNavigate();
  const { colorMode } = useColorMode();

  let initialOpened = Boolean(searchParams.get("opened") ?? false);

  const [opened, setOpened] = useState(initialOpened);
  const errors = useActionData();

  // vamos pegar o redirectTo da query string
  // para passar como parâmetro hidden para o form
  const loaderData = useLoaderData();
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
              className="relative w-full text-white transition duration-200  rounded-lg [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:w-full [&>*]:gap-4 [&>*]:p-2 [&>*]:text-white [&>*]:transition [&>*]:duration-200 [&>*]:text-lg hover:bg-opacity-90 bg-gray-700 "
            >
              <img src="/img/github-logo.svg" alt="" />
              Entrar com GitHub
            </LoadingButton>
          </Form>
        </AuthCard>

        <AuthCard className={opened ? "" : "hidden"}>
          <Form method="POST" className="flex flex-col ">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Input
              name="email"
              id="email"
              label="Email"
              type="email"
              className="mb-8"
            />
            <Input
              name="password"
              id="password"
              label="Senha"
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
              {errors}
            </div>
            <div className="text-right">
              <Button type="submit">Login</Button>
            </div>
          </Form>
        </AuthCard>
        <p className={` text-xs font-light text-slate-500 mb-2 mt-4`}>
          ... ou, se preferir, entre com{" "}
          <button
            className="underline"
            onClick={() => {
              setOpened(!opened);
              navigator(
                opened
                  ? `?redirectTo=${redirectTo}`
                  : `?opened=true&redirectTo=${redirectTo}`
              );
            }}
          >
            {opened ? "github" : "email e senha"}
          </button>
        </p>
      </div>
    </>
  );
}
