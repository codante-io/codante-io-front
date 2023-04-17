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
import { login, register } from "~/services/auth.server";

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  let name = formData.get("name") as string;
  let passwordConfirmation = formData.get("password_confirmation") as string;

  let { errors, redirector } = await register({
    request,
    name,
    email,
    password,
    passwordConfirmation,
  });

  return errors || redirector;
}

export default function Register() {
  let [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const { colorMode } = useColorMode();

  let initialOpened = Boolean(searchParams.get("opened") ?? false);

  const [opened, setOpened] = useState(initialOpened);
  let errors = useActionData();

  return (
    <div className="dark:bg-[#0e141a]  min-h-screen text-white pt-32">
      <div className="h-[45px] mb-16">
        <img
          src={colorMode === "light" ? "/codante-light.svg" : "/codante.svg"}
          alt=""
          className="w-72 mx-auto "
        />
      </div>

      <div className="mx-auto max-w-md md:w-[450px]">
        <div
          className={`${
            opened ? "hidden" : ""
          } dark:bg-[#17212B] shadow bg-white border-[1.5px] border-gray-300 dark:border-slate-700 p-8 px-10 rounded-2xl max-w-md md:w-[450px]`}
        >
          <Form action="/auth/github" method="post">
            <button className="rounded bg-gray-700 text-white p-4 w-full flex items-center justify-center gap-4">
              <img src="/img/github-logo.svg" alt="" />
              Cadastre com GitHub
            </button>
          </Form>
        </div>

        <div
          className={`${
            opened ? "" : "hidden"
          } dark:bg-[#17212B] bg-white border border-gray-300 dark:border-slate-700 p-10 rounded-2xl max-w-md md:w-[450px]`}
        >
          <form method="POST" className="flex flex-col">
            <Input
              name="name"
              id="name"
              label="Nome"
              type="text"
              className="mb-4"
            />
            <Input
              name="email"
              id="email"
              label="Email"
              type="email"
              className="mb-4"
            />
            <Input
              name="password"
              id="password"
              label="Senha"
              type="password"
              className="mb-4"
            />
            <Input
              name="password_confirmation"
              id="password_confirmation"
              label="Confirme sua Senha"
              type="password"
              className="mb-2"
            />
            <div>
              <Link
                to={`/login${opened && "?" + searchParams.toString()}`}
                className="underline text-xs font-light text-gray-400"
              >
                Já possui cadastro? Faça login!
              </Link>
            </div>
            <div className="min-h-[16px] mt-2">
              {errors && <div className="text-red-400 text-xs">{errors}</div>}
            </div>
            <div className="text-right">
              <Button type="submit">Cadastre-se</Button>
            </div>
          </form>
        </div>
        <p
          className={` text-xs font-light text-slate-500 mb-2 text-right mt-4`}
        >
          ... ou, se preferir, cadastre-se{" "}
          <button
            className="underline"
            onClick={() => {
              setOpened(!opened);
              navigator(opened ? "" : "?opened=true");
            }}
          >
            com {opened ? "github" : "email e senha"}
          </button>
        </p>
      </div>
    </div>
  );
}
