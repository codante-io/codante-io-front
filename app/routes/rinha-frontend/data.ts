export const faqs = [
  {
    question: 'O que é a "Rinha de Frontend"?',
    answer:
      'É um desafio de código inspirado pela "Rinha de Backend" no qual os participantes devem resolver um desafio de código usando a sua stack de preferência.',
  },
  {
    question: "Quem pode participar?",
    answer:
      "Qualquer pessoa que tenha conhecimento em desenvolvimento web e queira participar, independente da senioridade. Você não precisa resolver o desafio completo para participar, basta enviar uma solução que cumpre parte dos requisitos.",
  },
  {
    question: "O desafio é muito difícil. Não sei se consigo resolver.",
    answer:
      "Nós escolhemos uma aplicação desafiadora para poder levar os participantes ao limite. No entanto, mesmo se você está começando agora, você consegue desenvolver uma solução que cumpre parte dos requisitos. Não desista!",
  },
  {
    question: "Quais são os critérios de avaliação?",
    answer:
      'O primeiro critério de avaliação é o maior tamanho de JSON que seu app consegue carregar, com base nos arquivos disponibilizados. Depois disso os critérios são "Correctness" (se o app funciona como esperado), "Performance" e "Acessibilidade". Os detalhes da avaliação estão disponíveis no repositório do desafio.',
  },
  {
    question: "Quem fará a avaliação e o ranking?",
    answer:
      "A avaliação e classificação dos resultados será feita pelos apoiadores e organizadores do evento. Entre em contato caso você queira ser um apoiador.",
  },
  {
    question: "Como será avaliado o desempenho e acessibilidade da aplicação?",
    answer:
      'Usaremos "Time to Next Interaction", "Core Web Vitals", "Lighthouse Results" e "Accessibility Checks".',
  },
  {
    question:
      "Há alguma restrição sobre a stack, lib ou framework a ser usado?",
    answer:
      "Não, você é livre para escolher qualquer um. No entanto, a aplicação deve rodar inteiramente no lado do cliente e não pode ser uma cópia de outra e nem utilizar bibliotecas que façam o que o desafio pede.",
  },
  {
    question: "Posso usar SSR ou Server Components para resolver o desafio?",
    answer: "Não, a aplicação deve rodar inteiramente no lado do cliente.",
  },
  {
    question: "Qual é o prazo final para submissão?",
    answer: "Aceitaremos submissões até 10/11/2023 às 23:59.",
  },
  {
    question: "Como posso tirar dúvidas ou pedir ajuda?",
    answer:
      "Abra uma ISSUE no repositório com prefixo [DÚVIDA], [AJUDA] ou [SUGESTÃO].",
  },
  {
    question: "Haverá premiação?",
    answer:
      "Sim, as 5 melhores soluções serão premiadas com um gift card da Kabum. 1º lugar: R$ 200,00; 2º lugar: R$ 150,00; 3º lugar: R$ 100,00; 4º lugar: R$ 50,00; 5º lugar: R$ 50,00.",
  },
];

export const techs = [
  { name: "angular", position: [30, 45] },
  { name: "astro", position: [90, 40] },
  { name: "javascript", position: [10, 30] },
  { name: "react", position: [23, 15] },
  { name: "svelte", position: [80, 10] },
  { name: "vue", position: [70, 30] },
];

export const steps = [
  {
    title: "Cadastre-se e participe.",
    description: "Você terá acesso a um repositório com um desafio de código.",
    img: "img/rinha/steps/repo.png",
    alt: "Screenshot de um repositório do GitHub",
  },
  {
    title: "Desenvolva seu código.",
    description: "Resolva o desafio utilizando a sua stack preferida.",
    img: "img/rinha/steps/techs.png",
    alt: "Imagem com várias tecnologias de front-end (Vue, Angular, React, Astro, JQuery)",
  },
  {
    title: "Envie a sua solução.",
    description:
      "Faça deploy do seu código e preencha o formulário de submissão.",
    img: "img/rinha/steps/coding.png",
    alt: "Ilustração de uma pessoa programando",
  },
  {
    title: "Compartilhe sua solução.",
    description: "Compartilhe a sua solução nas redes sociais!",
    img: "img/rinha/steps/share.png",
    alt: "Ilustração com várias logos de redes sociais (Twitter, Facebook, Instagram, LinkedIn)",
  },
  {
    title: "Aguarde o resultado.",
    description:
      "Faremos a avaliação manual e classificação das soluções submetidas.",
    img: "img/rinha/steps/calendar.png",
    alt: "Ilustração de uma pessoa ao lado de um calendário",
  },
  {
    title: "Comemore!",
    description: "As 5 melhores soluções serão premiadas.",
    img: "img/rinha/steps/winner.png",
    alt: "Ilustração de duas pessoas comemorando ao lado de um troféu",
  },
];

export const supporters = [
  {
    name: "Felippe Regazzio",
    img: "img/rinha/felippe-regazzio.png",
    url: "https://twitter.com/felipperegazio",
  },
  {
    name: "Codante",
    img: "cdnt.svg",
    url: "https://codante.io",
  },
];
