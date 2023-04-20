import { currentToken } from "../../../services/auth.server";
import axios from "../../../services/axios.server";

type changePasswordParams = {
  request: Request;
  password: string;
  passwordConfirmation: string;
};

type changeNameParams = {
  request: Request;
  name: string;
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
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error: any) {
    // console.log(error.response?.data);
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
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error: any) {
    console.log(error.response?.data);
    return {
      errors: Object.values(error?.response?.data?.errors).flat(),
      message: error.response?.data?.message,
    };
  }
}
