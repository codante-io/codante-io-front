export type PlanFeature = {
  title: string;
  info?: string;
  isAvailable: boolean;
};

export type PlanFeaturesByCategory = {
  [key: string]: PlanFeature[];
}[];

export type PlanDetails = {
  name: "Gratuito" | "Vitalício" | "Anual";
  installments: number;
  fullPrice?: number;
  monthlyPrice?: number;
  totalPrice?: number;
};
