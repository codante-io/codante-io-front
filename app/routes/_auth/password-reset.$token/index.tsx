import { useLoaderData } from "@remix-run/react";
import { resetPassword } from "~/services/auth.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("password_confirmation") as string;

  const { errors, redirector } = await resetPassword({
    email,
    token,
    password,
    passwordConfirmation,
  });

  return errors || redirector;
}

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { token: string };
}) {
  const token = params.token;
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  if (!email) {
    throw new Error("Email is required");
  }
  return { email, token };
}

export default function PasswordReset() {
  const { token, email } = useLoaderData<typeof loader>();
  return (
    <>
      <h1>Coloque seu novo password</h1>
      <form method="post">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="token" value={token} />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          id="password"
          className="text-black"
        />
        <label htmlFor="password_confirmation">Password Confirmation</label>
        <input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
          className="text-black"
        />
        <button type="submit" className="m-3 p-3 bg-blue-900">
          Reset Password
        </button>
      </form>
    </>
  );
}
