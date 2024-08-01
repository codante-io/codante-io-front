export type PlanFeature = {
  title: string;
  info?: string;
  isAvailable: boolean;
};

export type PlanFeaturesByCategory = {
  [key: string]: PlanFeature[];
}[];

export type PlanDetails = {
  name: "Gratuito" | "Vitalício";
  installments: number;
  fullPrice?: number;
  monthlyPrice?: number;
  totalPrice?: number;
};
