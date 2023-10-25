import type { PlanDetails, PlanFeaturesByCategory } from "./pricing-types";

export const freePlanDetails: PlanDetails = {
  name: "Gratuito",
  price: 0,
  installments: 0,
};

export const proPlanDetails: PlanDetails = {
  name: "PRO (Vitalício)",
  fullPrice: 948,
  banner: "Oferta de lançamento",
  immediateSettlementAmount: 588,
  price: 49,
  installments: 12,
};

export const proPlanFeatures: PlanFeaturesByCategory = [
  {
    "Mini Projetos": [
      {
        title: "Acesso a todos os Mini Projetos",
        info: "Acesse todos os mini projetos disponíveis",
        isAvailable: true,
      },
      {
        title: "Submeta sua resolução",
        info: "Submeta sua resolução para o mini projeto",
        isAvailable: true,
      },
      {
        title: "Resolução Oficial com vídeo",
        info: "Assista a resolução oficial do mini projeto em vídeo",
        isAvailable: true,
      },
      {
        title: "Certificado",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: true,
      },
    ],
  },
  {
    Workshops: [
      {
        title: "Acesso a todos os workshops",
        info: "Obtenha acesso a todos os workshops disponíveis",
        isAvailable: true,
      },
      {
        title: "Certificado",
        info: "Obtenha um certificado de conclusão do workshop",
        isAvailable: true,
      },
    ],
  },
  {
    "Outras vantagens": [
      {
        title: "Pro Badge",
        info: "Obtenha um badge de PRO na comunidade",
        isAvailable: true,
      },
      {
        title: "Canais PRO da Comunidade",
        info: "Acesse os canais exclusivos da comunidade PRO",
        isAvailable: true,
      },
      {
        title: "Acesso ao Ranking Premiado",
        info: "Participe do ranking premiado da comunidade",
        isAvailable: true,
      },
      {
        title: "Plano Vitalício: pague uma vez, tenha para sempre",
        isAvailable: true,
      },
    ],
  },
];

export const freePlanFeatures: PlanFeaturesByCategory = [
  {
    "Mini Projetos": [
      {
        title: "Acesso a todos os Mini Projetos",
        info: "Acesse todos os mini projetos disponíveis. lorem ipsum dolor sit amet consectetur adipisicing elit.",
        isAvailable: true,
      },
      {
        title: "Submeta sua resolução",
        info: "Submeta sua resolução para o mini projeto",
        isAvailable: true,
      },
      {
        title: "Resolução Oficial com vídeo",
        info: "Assista a resolução oficial do mini projeto em vídeo",
        isAvailable: false,
      },
      {
        title: "Certificado",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: false,
      },
    ],
  },
  {
    Workshops: [
      {
        title: "Acesso limitado aos workshops",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: true,
      },
      {
        title: "Acesso a todos os workshops",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: false,
      },
      {
        title: "Certificado",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: false,
      },
    ],
  },
  {
    "Outras Vantagens": [
      {
        title: "Acesso à Comunidade",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: true,
      },
      {
        title: "Canais PRO da Comunidade",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: false,
      },
      {
        title: "Pro Badge",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: false,
      },
      {
        title: "Acesso ao Ranking Premiado",
        info: "Obtenha um certificado de conclusão do mini projeto",
        isAvailable: false,
      },
    ],
  },
];
