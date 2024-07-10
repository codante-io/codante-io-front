type SitemapPagesItem = {
  name: string;
  url: string;
  changefreq?: string;
  priority?: number;
};

export const sitemapPages: SitemapPagesItem[] = [
  {
    name: "Home",
    url: "/",
    changefreq: "weekly",
    priority: 1,
  },
  {
    name: "Workshops",
    url: "/workshops",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    name: "Mini Projetos",
    url: "/mini-projetos",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    name: "Trilhas",
    url: "/trilhas",
    priority: 0.9,
  },
  {
    name: "Trilhas",
    url: "/trilhas/next-js",
  },
  {
    name: "Seja Pro",
    url: "/assine",
    priority: 0.9,
  },
  {
    name: "Planos e Preços",
    url: "/planos",
    priority: 0.9,
  },
  {
    name: "Testes Técnicos",
    url: "/testes-tecnicos",
    priority: 0.8,
  },
  {
    name: "Blog",
    url: "/blog",
    priority: 0.9,
  },
];
