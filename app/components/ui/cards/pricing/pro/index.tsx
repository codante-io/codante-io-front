import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  proPlanDetails,
  proPlanFeatures,
} from "~/components/ui/cards/pricing/data";
import PriceCard from "~/components/ui/cards/pricing/price-card";
import { PlanDetails } from "~/components/ui/cards/pricing/pricing.d";
import PriceButtonPro from "~/components/ui/cards/pricing/pro/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Plan } from "~/lib/models/plan.server";

function calculatePromotionPricing(planInfo: Plan) {
  const promotionInfo = JSON.parse(planInfo.details || "{}");

  const currentPrice =
    planInfo.price_in_cents +
    promotionInfo?.content_count * 100 +
    promotionInfo?.user_raised_count * 100 * 10;

  const proPlanWithPrice: PlanDetails = {
    ...proPlanDetails,
    totalPrice: isNaN(currentPrice) ? 0 : currentPrice / 100,
    monthlyPrice: isNaN(currentPrice) ? 0 : currentPrice / 100 / 12, // truncate 2 decimals
  };

  return proPlanWithPrice;
}

export default function ProPricingCard() {
  const planDetails = useFetcher<any>();
  const [proPlanInfo, setProPlanInfo] = useState<PlanDetails | null>(null);

  const isSubmittingOrLoading =
    planDetails.state === "submitting" || planDetails.state === "loading";

  useEffect(() => {
    planDetails.load("/planos");
  }, []);

  useEffect(() => {
    if (planDetails.data) {
      const proPlanWithPrice = calculatePromotionPricing(planDetails.data.plan);

      setProPlanInfo(proPlanWithPrice);
    }
  }, [planDetails.data, planDetails.state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coupon = new FormData(e.currentTarget).get("couponCode") as string;
    planDetails.load(`/planos?coupon=${coupon}`);
  };

  return (
    <PriceCard className="border-blue-300 dark:border-brand shadow-blue-200 dark:shadow-blue-400 shadow-2xl hover:dark:shadow-blue-300 border-4 bg-white">
      <PriceCard.Ribbon text="Oferta de lançamento" />
      <PriceCard.Title isLoading={!proPlanInfo}>
        <span className="px-1 dark:font-normal rounded text-white  dark:text-amber-400 dark:bg-transparent bg-amber-400 drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.4)]">
          PRO
        </span>
        <span className="text-gray-800 dark:text-gray-50">
          ({proPlanInfo?.name})
        </span>
      </PriceCard.Title>

      <PriceCard.Pricing {...proPlanInfo} isLoading={!proPlanInfo} />

      <PriceButtonPro isLoading={!proPlanInfo} />
      <PriceCard.Coupon
        onSubmit={handleSubmit}
        isLoading={isSubmittingOrLoading}
        error={planDetails?.data?.coupon[0]?.message}
      />

      <PriceCard.Divider />

      <PriceCard.Features features={proPlanFeatures} />
    </PriceCard>
  );
}
