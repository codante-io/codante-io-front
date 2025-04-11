import { Outlet, useLoaderData } from "react-router";
import { GoogleReCaptchaProvider } from "@wojtekmaj/react-recaptcha-v3";
import { environment } from "~/lib/models/environment";

export async function loader() {
  const { RECAPTCHA_SITE_KEY } = environment();

  return { ENV: { RECAPTCHA_SITE_KEY } };
}

export default function AuthLayout() {
  const {
    ENV: { RECAPTCHA_SITE_KEY },
  } = useLoaderData<typeof loader>();

  return (
    <div className="bg-transparent text-white sm:pt-12 ">
      <div className="mx-auto max-w-md md:w-[450px] px-2 py-12 ">
        <GoogleReCaptchaProvider
          reCaptchaKey={RECAPTCHA_SITE_KEY}
          scriptProps={{
            async: false,
            defer: true,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          <Outlet />
        </GoogleReCaptchaProvider>
      </div>
    </div>
  );
}
