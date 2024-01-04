export async function currentToken() {
  const sessionCookie = window.document.cookie
    .split("; ")
    .find((row) => row.startsWith("codante_session="))
    ?.split("=")[1];

  const session = await sessionStorage.getSession(sessionCookie);

  if (session.has("user")) {
    const { token } = session.get("user");
    return token;
  }
}
