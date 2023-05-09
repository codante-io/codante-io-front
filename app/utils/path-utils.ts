export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getOgGeneratorUrl(title: string, subtitle = "") {
  if (subtitle) {
    return `https://og.codante.io/api/${slugify(subtitle)}/${slugify(title)}`;
  }
  return `https://og.codante.io/api/${slugify(title)}`;
}
