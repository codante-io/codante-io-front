import { sendPasswordLink } from "~/services/auth.server";
import AuthCard from "../auth-card";
import Input from "~/components/form/input";
import Button from "~/components/form/button";
import Spinner from "~/components/spinner";
import { CheckIcon } from "@heroicons/react/24/solid";

import { useState } from "react";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  await sendPasswordLink({ email });
  return { email };
}

export default function PasswordReset() {
  let [status, setStatus] = useState<"idle" | "saving" | "success">("idle");

  return (
    <AuthCard>
      <h1 className="text-lg text-white font-light">Redefinir Senha</h1>
      {/* {status === "idle" || status === "saving" || status === "success" ? ( */}
      <form method="post" className="mt-8">
        <Input
          label="Coloque seu email para redefinir sua senha:"
          name="email"
          id="email"
        ></Input>
        <div className="text-right">
          <Button
            disabled={status !== "idle"}
            type="button"
            className="mt-8 relative transition duration-200"
            onClick={() => setStatus("saving")}
          >
            {status === "saving" && (
              <div className="absolute inset-0 flex justify-center py-2">
                <Spinner />
              </div>
            )}
            {status === "success" && (
              <div className="absolute inset-0 flex justify-center py-2">
                <CheckIcon className="w-5" />
              </div>
            )}
            <span className={status === "idle" ? "" : "invisible"}>
              Redefinir Senha
            </span>
          </Button>
        </div>
      </form>
      {/* ) : (
        <div className="text-slate-400 font-light text-sm mt-8">
          Seu email foi enviado! Verifique sua caixa de entrada e continue por
          lá!
        </div>
      )} */}
    </AuthCard>
  );
}
