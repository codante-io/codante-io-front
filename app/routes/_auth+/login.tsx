import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { useState } from "react";
import Input from "~/components/form/input";
import { useColorMode } from "~/contexts/color-mode-context";
import { login } from "~/services/auth.server";

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  let { errors, redirector } = await login({ request, email, password });

  return errors || redirector;
}

export default function Login() {
  let [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const { colorMode } = useColorMode();

  let initialOpened = Boolean(searchParams.get("opened") ?? false);

  const [opened, setOpened] = useState(initialOpened);
  let errors = useActionData();

  return (
    <div className="dark:bg-[#0e141a]  min-h-screen text-white flex items-center justify-center">
      <div className="flex flex-col">
        <img
          src={colorMode === "light" ? "/codante-light.svg" : "/codante.svg"}
          alt=""
          className="w-72 mx-auto mb-16"
        />
        <div
          className={`${
            opened ? "hidden" : ""
          } dark:bg-[#17212B] shadow bg-white border-[1.5px] border-gray-300 dark:border-slate-700 p-10 rounded-2xl max-w-md md:w-[450px]`}
        >
          <Form action="/auth/github" method="post">
            <button className="rounded bg-gray-700 text-white p-4 w-full flex items-center justify-center gap-4">
              <img src="/img/github-logo.svg" alt="" />
              Login with GitHub
            </button>
          </Form>
        </div>

        <div
          className={`${
            opened ? "" : "hidden"
          } dark:bg-[#17212B] bg-white border-[1.5px] border-gray-300 dark:border-slate-700 p-10 rounded-2xl max-w-md md:w-[450px]`}
        >
          <form method="POST" className="flex flex-col ">
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
            <Link
              to="/forgot-password"
              className="underline text-xs font-light text-gray-400"
            >
              Esqueceu sua senha?
            </Link>
            <button
              type="submit"
              className="mt-10 rounded dark:bg-gray-600 bg-gray-500 text-white p-4 border-b-4 dark:border-b-gray-700 border-b-gray-600 w-full flex items-center justify-center gap-4"
            >
              Login
            </button>
          </form>
          {errors && <div className="text-red-500 text-xs mt-3">{errors}</div>}
        </div>
        <p
          className={` text-xs font-light text-slate-400 mb-2 text-right mt-4`}
        >
          ... ou, se preferir, faça{" "}
          <button
            className="underline"
            onClick={() => {
              setOpened(!opened);
              navigator(opened ? "" : "?opened=true");
            }}
          >
            login com {opened ? "github" : "email e senha"}
          </button>
        </p>
      </div>
    </div>
  );
}
