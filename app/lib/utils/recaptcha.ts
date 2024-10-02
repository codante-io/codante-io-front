export async function isUserHuman(
  token: string,
  key: string,
): Promise<boolean> {
  let res;
  const captchData = new URLSearchParams({
    secret: key,
    response: token,
  });

  try {
    res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: captchData,
    });

    res = await res.json();
  } catch {
    return false;
  }

  return res && res.success && res.score > 0.5;
}
