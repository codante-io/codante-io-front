export function formatDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
