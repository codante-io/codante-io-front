export function isAlert(firstChild: React.ReactElement) {
  if (firstChild.props.children[0].startsWith("Dica"))
    return { color: "#22c55e", text: "Dica", imgPath: "/icons/bulb-icons.svg" };
  if (firstChild.props.children[0].startsWith("Informação"))
    return {
      color: "#3b82f6",
      text: "Informação",
      imgPath: "/icons/info.svg",
    };
  if (firstChild.props.children[0].startsWith("Importante"))
    return {
      color: "#a855f7",
      text: "Importante",
      imgPath: "/icons/icon-important.svg",
    };
  if (firstChild.props.children[0].startsWith("Aviso"))
    return {
      color: "#fde047",
      text: "Aviso",
      imgPath: "/icons/warning.svg",
    };
  if (firstChild.props.children[0].startsWith("Cuidado"))
    return {
      color: "#ef4444",
      text: "Cuidado",
      imgPath: "/icons/caution.svg",
    };
  return false;
}

export function processMarkdown(markdown: string): string {
  const replacements = {
    "\\[!Tip\\]": "Dica",
    "\\[!Note\\]": "Informação",
    "\\[!Important\\]": "Importante",
    "\\[!Warning\\]": "Aviso",
    "\\[!Caution\\]": "Cuidado",
  };

  let processedMarkdown = markdown;

  for (const [key, value] of Object.entries(replacements)) {
    processedMarkdown = processedMarkdown.replace(new RegExp(key, "gi"), value);
  }

  return processedMarkdown;
}
