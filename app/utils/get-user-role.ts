export default function getUserRole(
  user: { is_admin?: boolean; is_pro?: boolean } | null,
) {
  if (!user) return undefined;

  if (user?.is_admin) {
    return "admin";
  }
  if (user?.is_pro) {
    return "pro";
  }
  return undefined;
}
