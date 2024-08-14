import { createAxios } from "~/lib/services/axios.server";

type changePasswordParams = {
  request: Request;
  password: string;
  passwordConfirmation: string;
};

type changeNameParams = {
  request: Request;
  name: string;
};

type changeLinkedinUrlParams = {
  request: Request;
  linkedin: string;
};

export async function changePassword({
  request,
  password,
  passwordConfirmation,
}: changePasswordParams) {
  const axios = await createAxios(request);

  try {
    await axios.post("/dashboard/change-password", {
      password,
      password_confirmation: passwordConfirmation,
    });
  } catch (error: any) {
    return {
      errors: Object.values(error?.response?.data?.errors).flat(),
      message: error.response?.data?.message,
    };
  }
}

export async function changeName({ request, name }: changeNameParams) {
  const axios = await createAxios(request);

  try {
    await axios.post("/dashboard/change-name", { name });
  } catch (error: any) {
    return {
      errors: Object.values(error?.response?.data?.errors).flat(),
      message: error.response?.data?.message,
    };
  }
}

export async function changeSettings({
  request,
  showBadge,
  avatar,
}: {
  request: Request;
  showBadge?: boolean;
  avatar?: Blob;
}) {
  const axios = await createAxios(request);

  try {
    await axios.post("/dashboard/update-settings", {
      show_badge: showBadge,
      avatar,
    });
  } catch (error: any) {
    return { errors: Object.values(error?.response?.data?.errors).flat() };
  }
}

export async function changeLinkedinUrl({
  request,
  linkedin,
}: changeLinkedinUrlParams) {
  const axios = await createAxios(request);

  try {
    await axios.post("/dashboard/change-linkedin-url", {
      linkedin_user: linkedin,
    });
  } catch (error: any) {
    return {
      errors: Object.values(error?.response?.data?.errors).flat(),
      message: error.response?.data?.message,
    };
  }
}
