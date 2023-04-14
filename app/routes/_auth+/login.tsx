import { Form, Link, useActionData } from "@remix-run/react";
import { useState } from "react";
import { login } from "~/services/auth.server";

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  let { errors, redirector } = await login({ request, email, password });

  return errors || redirector;
}

export default function Login() {
  const [opened, setOpened] = useState(false);
  let errors = useActionData();

  return (
    <div className="dark:bg-[#0e141a]  min-h-screen text-white flex items-center justify-center">
      <div className="flex flex-col">
        <img src="/codante.svg" alt="" className="w-72 mx-auto mb-16" />
        {/* <p className="text-sm font-light text-slate-400 mb-2">
          Login com Github
        </p> */}
        <div
          className={`${
            opened ? "hidden" : ""
          } bg-[#17212B] border-[1.5px] dark:border-slate-700 p-10 rounded-2xl max-w-md md:w-[450px]`}
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
          } bg-[#17212B] border-[1.5px] dark:border-slate-700 p-10 rounded-2xl max-w-md md:w-[450px]`}
        >
          {errors && <div className="text-red-500">{errors}</div>}
          <form method="POST" className="text-gray-900 flex flex-col ">
            <label className="text-slate-300 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="rounded p-2 mb-8 dark:bg-[#0e141a] border dark:border-slate-700 dark:text-white "
              id="email"
              type="email"
              name="email"
            />
            <label className="text-slate-300 text-sm mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="rounded p-2 mb-8 dark:bg-[#0e141a] border dark:border-slate-700 dark:text-white "
            />
            <button type="submit" className="bg-blue-200 mt-10">
              login
            </button>
          </form>
          <Link to="/forgot-password">Esqueci minha senha</Link>
          <div></div>
        </div>
        <p
          className={` text-xs font-light text-slate-400 mb-2 text-right mt-4`}
        >
          ... ou, se preferir, faça{" "}
          <button
            className="underline"
            onClick={() => {
              setOpened(!opened);
            }}
          >
            login com {opened ? "github" : "email e senha"}
          </button>
        </p>
      </div>
    </div>
  );
}
