import { currentToken } from "../../../../services/auth.server";
import axios from "../../../../services/axios.server";

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
  const token = await currentToken({ request });

  try {
    await axios.post(
      "/dashboard/change-password",
      { password, password_confirmation: passwordConfirmation },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (error: any) {
    return {
      errors: Object.values(error?.response?.data?.errors).flat(),
      message: error.response?.data?.message,
    };
  }
}

export async function changeName({ request, name }: changeNameParams) {
  const token = await currentToken({ request });

  try {
    await axios.post(
      "/dashboard/change-name",
      { name },
      { headers: { Authorization: `Bearer ${token}` } },
    );
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
}: {
  request: Request;
  showBadge: boolean;
}) {
  const token = await currentToken({ request });

  try {
    await axios.post(
      "/dashboard/update-settings",
      { show_badge: showBadge },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (error: any) {
    return { errors: Object.values(error?.response?.data?.errors).flat() };
  }
}

export async function changeLinkedinUrl({
  request,
  linkedin,
}: changeLinkedinUrlParams) {
  const token = await currentToken({ request });

  try {
    await axios.post(
      "/dashboard/change-linkedin-url",
      { linkedin_url: linkedin },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (error: any) {
    return {
      errors: Object.values(error?.response?.data?.errors).flat(),
      message: error.response?.data?.message,
    };
  }
}
