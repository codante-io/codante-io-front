import { Form, useLoaderData } from "@remix-run/react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Button from "~/components/form/button";
import Input from "~/components/form/input";
import AuthCard from "~/routes/_auth/auth-card";
import { currentToken, user } from "~/services/auth.server";
import axios from "axios";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get("name") as string;

  let token = await currentToken({ request });
  console.log(token);

  await axios.post(
    "http://codante-app.test/dashboard/change-name",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function loader({ request }: { request: Request }) {
  const userData = await user({ request });
  return userData;
}

export default function Account() {
  const user = useLoaderData();

  return (
    <div className="container mx-auto mt-16">
      <h2 className="text-xl flex items-center">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="text-blue-300 dark:text-blue-800 mr-2 inline-block"
        />{" "}
        Minha Conta
      </h2>

      <AuthCard className="max-w-xl mt-6">
        <Form method="post">
          <Input
            id="name"
            name="name"
            label="Nome"
            type="text"
            value={user.name}
          />
          <div className="mt-6">
            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="mt-8 text-right">
            <Button type="submit">Alterar</Button>
          </div>
        </Form>
      </AuthCard>

      <h2 className="text-xl flex items-center mt-12">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="text-blue-300 dark:text-blue-800 mr-2 inline-block"
        />{" "}
        Alterar Senha
      </h2>
      <AuthCard className="max-w-xl mt-6">
        <Form>
          <Input
            id="password"
            name="password"
            label="Nova Senha"
            type="password"
            autoComplete="off"
          />
          <div className="mt-6">
            <Input
              id="password_confirmation"
              name="password_confirmation"
              label="Confirme a Senha"
              type="password"
              autoComplete="off"
            />
          </div>
          <div className="mt-8 text-right">
            <Button type="submit">Alterar</Button>
          </div>
        </Form>
      </AuthCard>
    </div>
  );
}
