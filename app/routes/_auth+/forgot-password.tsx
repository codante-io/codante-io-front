import { sendPasswordLink } from "~/services/auth.server";

export async function action({request}: {request: Request}) {
  const formData = await request.formData();
  const email = formData.get('email') as string;

  await sendPasswordLink({email});
  return({email})
}

export default function PasswordReset() {
  return (
    <main>
      <h1>Coloque seu novo password</h1>
      <form method="post">
        <label htmlFor="email">Email</label>
        <input name="email" type="email" id="email" className="text-black"/>
        <button type="submit" className="m-3 p-3 bg-blue-900">Enviar Link</button>
      </form>
    </main>
  );
}