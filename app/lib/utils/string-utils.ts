export function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function generateSimpleLoremIpsum() {
  return (
    "Para que a calda do seu pudim de leite condensado fique perfeita, mantenha sempre a proporção de metade da medida de água para uma medida de açúcar. " +
    "\n- Por exemplo, se você usar 1 xícara de chá de açúcar, a quantidade de água será apenas 1/2 xícara (chá). " +
    "\n- Se você fizer um pudim maior, pode usar 2 xícaras (chá) de açúcar para 1 xícara de água. " +
    "- Seguindo essa dica, não tem como errar! \n\n" +
    "Além disso, é importante cozinhar o pudim em banho-maria para garantir uma textura suave e cremosa. " +
    "Certifique-se de cobrir a forma com papel alumínio para evitar que a superfície do pudim resseque. " +
    "Deixe esfriar completamente antes de desenformar para que mantenha sua forma perfeita."
  );
}
