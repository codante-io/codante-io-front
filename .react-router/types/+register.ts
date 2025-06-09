import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/*": {
    "*": string;
  };
  "/api/challenge": {};
  "/api/set-watched": {};
  "/api/subscribe": {};
  "/comments": {};
  "/plans": {};
  "/reactions": {};
  "/agenda": {};
  "/auth/discord/callback": {};
  "/auth/github": {};
  "/auth/github/callback": {};
  "/forgot-password": {};
  "/login": {};
  "/logout": {};
  "/password-reset/:token": {
    token: string;
  };
  "/register": {};
  "/black-friday": {};
  "/blog": {};
  "/blog/:slug": {
    slug: string;
  };
  "/certificados": {};
  "/certificados/:id": {
    id: string;
  };
  "/components/search-certificate": {};
  "/dashboard": {};
  "/dashboard/certificados": {};
  "/dashboard/mini-projetos": {};
  "/dashboard/submissoes": {};
  "/dashboard/workshops": {};
  "/minha-conta": {};
  "/docs/:slug": {
    slug: string;
  };
  "/politica-de-privacidade": {};
  "/termos-de-uso": {};
  "/mini-projetos": {};
  "/mini-projetos/components/filters": {};
  "/mini-projetos/:slug": {
    slug: string;
  };
  "/mini-projetos/:slug/codigo": {
    slug: string;
  };
  "/mini-projetos/:slug/minha-submissao": {
    slug: string;
  };
  "/mini-projetos/:slug/resolucao": {
    slug: string;
  };
  "/mini-projetos/:slug/submissoes": {
    slug: string;
  };
  "/mini-projetos/:slug/submissoes/:username": {
    slug: string;
    username: string;
  };
  "/mini-projetos/:slug/tutorial": {
    slug: string;
  };
  "/ranking": {};
  "/assine/erro": {};
  "/assine": {};
  "/assine/sucesso": {};
  "/planos": {};
  "/testes-tecnicos": {};
  "/testes-tecnicos/:slug": {
    slug: string;
  };
  "/trilhas": {};
  "/trilhas/:slug": {
    slug: string;
  };
  "/workshops": {};
  "/workshops/:slug": {
    slug: string;
  };
  "/impersonate": {};
  "/undefined": {};
  "/mini-projetos/:challengeSlug/resolucao/:lessonSlug": {
    challengeSlug: string;
    lessonSlug: string;
  };
  "/trilhas/:trackSlug/modulo/:workshopSlug/:lessonSlug": {
    trackSlug: string;
    workshopSlug: string;
    lessonSlug: string;
  };
  "/trilhas/:trackSlug/projeto/:challengeSlug/:lessonSlug": {
    trackSlug: string;
    challengeSlug: string;
    lessonSlug: string;
  };
  "/workshops/:workshopSlug/:slug": {
    workshopSlug: string;
    slug: string;
  };
  "/demo/mini-projetos/:slug": {
    slug: string;
  };
  "/demo/mini-projetos/:slug/minha-submissao": {
    slug: string;
  };
  "/demo/mini-projetos/:slug/resolucao": {
    slug: string;
  };
  "/demo/mini-projetos/:slug/submissoes": {
    slug: string;
  };
  "/demo/mini-projetos/:slug/submissoes/:username": {
    slug: string;
    username: string;
  };
  "/demo/mini-projetos/:slug/tutorial": {
    slug: string;
  };
  "/demo/workshops/:workshopSlug/:slug": {
    workshopSlug: string;
    slug: string;
  };
  "/rinha-frontend": {};
  "/sitemap.xml": {};
  "/workshop-react": {};
};
