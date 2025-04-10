import type { PlanDetails, PlanFeaturesByCategory } from "./pricing.d";

export const freePlanDetails: PlanDetails = {
  name: "Gratuito",
  monthlyPrice: 0,
  installments: 0,
};

export const proPlanDetails: PlanDetails = {
  name: "Vitalício",
  installments: 12,
};

export const yearlyPlanDetails: PlanDetails = {
  name: "Anual",
  fullPrice: 948,
  installments: 12,
};

export const yearlyPlanFeatures: PlanFeaturesByCategory = [
  {
    "Mini Projetos": [
      {
        title: "Acesso a todos os Mini Projetos",
        isAvailable: true,
      },
      {
        title: "Submeta sua resolução",
        isAvailable: true,
      },
      {
        title: "Tutorial de resolução de projetos",
        info: "Nós disponibilizamos nossa resolução oficial dos Mini Projetos em vídeo para os membros PRO",
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
        info: "Obtenha um badge de PRO na comunidade e na plataforma. Você poderá desabilitar essa funcionalidade, se quiser.",
        isAvailable: true,
      },
      {
        title: "Canais PRO da Comunidade",
        info: "Acesse os canais exclusivos da comunidade PRO no Discord, com prioridade nas respostas",
        isAvailable: true,
      },
      {
        title: "Plano Anual: tenha acesso a todos os conteúdos por 12 meses",
        isAvailable: true,
      },
    ],
  },
];

export const proPlanFeatures: PlanFeaturesByCategory = [
  {
    "Mini Projetos": [
      {
        title: "Acesso a todos os Mini Projetos",
        isAvailable: true,
      },
      {
        title: "Submeta sua resolução",
        isAvailable: true,
      },
      {
        title: "Tutorial de resolução de projetos",
        info: "Nós disponibilizamos resolução oficial dos Mini Projetos em vídeo para membros PRO",
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
        info: "Obtenha um badge de PRO na comunidade e na plataforma. Você poderá desabilitar essa funcionalidade, se quiser.",
        isAvailable: true,
      },
      {
        title: "Canais PRO da Comunidade",
        info: "Acesse os canais exclusivos da comunidade PRO no Discord, com prioridade nas respostas",
        isAvailable: true,
      },

      {
        title:
          "Plano Vitalício: pague uma vez, tenha acesso enquanto o Codante existir",
        isAvailable: true,
      },
    ],
  },
];

export const freePlanFeatures: PlanFeaturesByCategory = [
  {
    "Mini Projetos": [
      {
        title: "Acesso aos Mini Projetos gratuitos",
        isAvailable: true,
      },
      {
        title: "Acesso aos Mini Projetos em destaque",
        isAvailable: true,
      },
      {
        title: "Acesso a todos os Mini Projetos",
        isAvailable: false,
      },
      {
        title: "Certificado",
        isAvailable: false,
      },
    ],
  },
  {
    Workshops: [
      {
        title: "Acesso limitado aos workshops",
        info: "Acesse os workshops gratuitos e aprenda com a gente!",
        isAvailable: true,
      },
      {
        title: "Acesso a todos os workshops",
        isAvailable: false,
      },
      {
        title: "Certificado",
        isAvailable: false,
      },
    ],
  },
  {
    "Outras Vantagens": [
      {
        title: "Acesso à Comunidade",
        info: "Acesso à nossa comunidade no Discord",
        isAvailable: true,
      },
      {
        title: "Canais PRO da Comunidade",
        isAvailable: false,
      },
      {
        title: "Pro Badge",
        isAvailable: false,
      },
    ],
  },
];
