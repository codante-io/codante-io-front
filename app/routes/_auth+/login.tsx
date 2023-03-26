import { Form, Link, useActionData } from '@remix-run/react';
import { login } from '~/services/auth.server';

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let email = formData.get('email') as string;
  let password = formData.get('password') as string;

  let { errors, redirector } = await login({ request, email, password });

  return errors || redirector;
}

export default function Login() {
  let errors = useActionData();

  return (
    <div className="bg-gray-800 min-h-screen text-white flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl">Login</h1>
        {errors && <div className="text-red-500">{errors}</div>}
        <form method="POST" className="text-gray-900 flex flex-col">
          <input type="email" name="email" className="mb-3" />
          <input type="password" name="password" />
          <button type="submit" className="bg-blue-200 mt-10">
            login
          </button>
        </form>
        <Link to="/">Home</Link>
        <div>
          <h1>Login com githubssss</h1>
          <Form action="/auth/github" method="post">
            <button className='mt-4 rounded bg-blue-900 text-white p-4'>Login with GitHub</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
