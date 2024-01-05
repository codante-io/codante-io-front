export function abort404() {
  throw new Response("Not Found", {
    status: 404,
  });
}
