import { Form, useOutletContext } from "react-router";
import { redirect } from "react-router";
import NotFound from "~/components/features/error-handling/not-found";
import { impersonate, type User } from "~/lib/models/user.server";
import { Button } from "~/components/ui/button";
import { commitSession, getSession } from "~/lib/services/auth.server";
import Input from "~/components/features/form/input";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;

  const session = await getSession(request.headers.get("Cookie"));
  const newToken = await impersonate(request, userId);

  let newSession;

  if (newToken) {
    session.set("user", {
      token: newToken,
    });
    newSession = await commitSession(session);
  }

  if (newSession) {
    return redirect("/", {
      headers: {
        "Set-Cookie": newSession,
      },
    });
  }
}

export default function ImpersonatePage() {
  const { user } = useOutletContext<{
    user: User;
  }>();

  if (!user || !user.is_admin) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col container mx-auto">
      <h1 className="text-2xl mb-8 mt-8 md:mt-0">Impersonate</h1>
      <Form method="post" className="w-full sm:w-96">
        <Input name="userId" id="userId" label="ID do Usuário" />
        <Button className="my-2">Impersonate</Button>
      </Form>
    </div>
  );
}
