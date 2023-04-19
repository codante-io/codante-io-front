import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/form/button";
import Input from "~/components/form/input";
import { useColorMode } from "~/contexts/color-mode-context";
import { login, register } from "~/services/auth.server";
import AuthCard from "../auth-card";
import Spinner from "~/components/spinner";
import { CheckIcon } from "@heroicons/react/24/outline";

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
          className="w-72 mx-auto "
        />
      </div>

      <AuthCard>
        <h1 className="text-lg text-slate-700 dark:text-white mb-8">
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
              className="underline text-xs font-light text-gray-500"
            >
              Já possui cadastro? Faça login!
            </Link>
          </div>
          <div className="min-h-[16px] mt-2">
            {errors && <div className="text-red-400 text-xs">{errors}</div>}
          </div>
          <div className="text-right">
            <Button
              disabled={status !== "idle" || isSuccessfulSubmission}
              type="submit"
              className="mt-8 relative transition duration-200 "
            >
              {status === "submitting" && (
                <div className="absolute inset-0 flex justify-center py-2">
                  <Spinner />
                </div>
              )}
              {isSuccessfulSubmission && (
                <div className="absolute inset-0 flex justify-center py-2">
                  <CheckIcon className="w-5" />
                </div>
              )}
              <span
                className={
                  status === "idle" && !isSuccessfulSubmission
                    ? ""
                    : "invisible"
                }
              >
                Cadastre-se
              </span>
            </Button>
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
