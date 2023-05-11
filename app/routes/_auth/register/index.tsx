import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import Input from "~/components/form/input";
import { useColorMode } from "~/contexts/color-mode-context";
import { register } from "~/services/auth.server";
import AuthCard from "../auth-card";

import LoadingButton from "~/components/form/loading-button";

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
  let errors = useActionData();

  const transition = useNavigation();
  const { colorMode } = useColorMode();

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  return (
    <>
      <div className="h-[45px] mb-10 hidden md:block">
        <img
          src={colorMode === "light" ? "/codante-light.svg" : "/codante.svg"}
          alt=""
          className="mx-auto w-72 "
        />
      </div>

      <AuthCard>
        <h1 className="mb-8 text-lg text-slate-700 dark:text-white">
          Cadastre-se
        </h1>
        <Form method="POST" className="flex flex-col">
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
              to="/login"
              className="text-xs font-light text-gray-500 underline"
            >
              Já possui cadastro? Faça login!
            </Link>
          </div>
          <div className="min-h-[16px] mt-2">
            {errors && <div className="text-xs text-red-400">{errors}</div>}
          </div>
          <div className="text-right">
            <LoadingButton
              status={status}
              isSuccessfulSubmission={isSuccessfulSubmission}
              type="submit"
              className="relative mt-8 transition duration-200 "
            >
              Cadastre-se
            </LoadingButton>
          </div>
        </Form>
      </AuthCard>
      <p className={` text-xs font-light text-slate-500 mb-2 text-right mt-4`}>
        ... ou, se preferir, entre com{" "}
        <Link to="/login" className="underline">
          github
        </Link>
      </p>
    </>
  );
}
