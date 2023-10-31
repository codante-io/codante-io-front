import type { RouteMatch } from "@remix-run/react";
import slugify from "slugify";

// export function slugify(str: string) {
//   return str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/[\s_-]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// }

export function getOgGeneratorUrl(title: string, subtitle = "") {
  if (subtitle) {
    return `https://og.codante.io/api/${slugify(subtitle, {
      lower: true,
    })}/${slugify(title, { lower: true })}`;
  }
  return `https://og.codante.io/api/${slugify(title, { lower: true })}`;
}

/**
 * This function returns classes, if there is a path match.
 * @param {RouteMatch[]} mathes - This comes from Remix's useMatch hook.
 * @param {string} path - The path you want to match.
 * @param {string} className - The classes you want to add.
 * @param {string} type - The type of match you want to do. Default is "exact".
 * @returns {string} The classes that you want to add.
 */
export function setActiveClassForPath(
  matches: RouteMatch[],
  path: string,
  className: string,
  type: "exact" | "startsWith" | "endsWith" | "includes" = "exact"
) {
  const pathname = matches[matches.length - 1]?.pathname ?? "";

  if (type === "exact") {
    return pathname === path ? className : "";
  }
  if (type === "startsWith") {
    return pathname.startsWith(path) ? className : "";
  }
  if (type === "endsWith") {
    return pathname.endsWith(path) ? className : "";
  }
  if (type === "includes") {
    return pathname.includes(path) ? className : "";
  }
}
