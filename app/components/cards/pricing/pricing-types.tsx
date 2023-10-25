export type PlanFeature = {
  title: string;
  info?: string;
  isAvailable: boolean;
};

export type PlanFeaturesByCategory = {
  [key: string]: PlanFeature[];
}[];

export type PlanDetails = {
  name: "Gratuito" | "PRO (Vitalício)";
  price: number;
  installments: number;
  fullPrice?: number;
  immediateSettlementAmount?: number;
  banner?: string;
};
