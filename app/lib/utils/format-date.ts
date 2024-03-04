export function formatDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateDDMMYYYY(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
