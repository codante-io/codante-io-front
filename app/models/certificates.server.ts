import axios from "axios";
import { currentToken } from "~/services/auth.server";

export type Certificate = {
  user_id: string;
  source_type: 'workshop' | 'challenge';
  source_id: string;
  metadata?: string;
  status?: string;
};

export async function requestCertificate(
  request: Request,
  certificateInfo: Certificate,
) {
  const token = await currentToken({ request });
  const { user_id, source_type, source_id, metadata = undefined, status = undefined } = certificateInfo;
  console.log(certificateInfo)

  try {
    await axios.post(
      "/certificate",
      { user_id, source_type, source_id, metadata, status },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (error: any) {
    console.log(error)
    return error;
  }
}