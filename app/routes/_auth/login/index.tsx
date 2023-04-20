import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/form/button";
import Input from "~/components/form/input";
import { useColorMode } from "~/contexts/color-mode-context";
import { login } from "~/services/auth.server";
import AuthCard from "../auth-card";

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  let { errors, redirector } = await login({ request, email, password });

  // toast

  return errors || redirector;
}

export default function Login() {
  let [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const { colorMode } = useColorMode();

  let initialOpened = Boolean(searchParams.get("opened") ?? false);

  const [opened, setOpened] = useState(initialOpened);
  const errors = useActionData();

  // return redirect()

  return (
    <>
      <div className="h-[45px] mb-10 hidden sm:block">
        <img
          src={colorMode === "light" ? "/codante-light.svg" : "/codante.svg"}
          alt=""
          className="w-72 mx-auto mb-16"
        />
      </div>
      <div className="mx-auto max-w-md md:w-[450px]">
        <AuthCard className={opened ? "hidden" : ""}>
          <Form action="/auth/github" method="post">
            <button className="rounded bg-gray-700 text-white p-4 w-full flex items-center justify-center gap-4">
              <img src="/img/github-logo.svg" alt="" />
              Entrar com GitHub
            </button>
          </Form>
        </AuthCard>

        <AuthCard className={opened ? "" : "hidden"}>
          <Form method="POST" className="flex flex-col ">
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
                className="underline text-xs font-light text-gray-500"
              >
                Esqueceu sua senha?
              </Link>
              <span className="text-blue-500 font-light"> &#8226; </span>
              <Link
                to="/register"
                className="underline text-xs font-light text-gray-500"
              >
                Não possui Cadastro?
              </Link>
            </div>
            <div className="text-red-400 text-xs mt-2 min-h-4 mb-3">
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
              navigator(opened ? "" : "?opened=true");
            }}
          >
            {opened ? "github" : "email e senha"}
          </button>
        </p>
      </div>
    </>
  );
}
