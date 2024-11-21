import { useFetcher, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  yearlyPlanDetails,
  yearlyPlanFeatures,
} from "~/components/ui/cards/pricing/data";
import PriceCard from "~/components/ui/cards/pricing/price-card";
import PriceButtonPro from "~/components/ui/cards/pricing/pro/button";
import type { PlanDetails } from "~/components/ui/cards/pricing/pricing.d";
import type { Coupon, Plan } from "~/lib/models/plan.server";

function calculatePromotionPricing(planInfo: Plan, coupon: Coupon) {
  const promotionInfo = JSON.parse(planInfo.details || "{}");

  const currentPrice =
    planInfo.price_in_cents +
    promotionInfo?.content_count * 100 +
    promotionInfo?.user_raised_count * 100 * 10;

  const yearlyPlanWithPrice: PlanDetails = {
    ...yearlyPlanDetails,
    totalPrice: isNaN(currentPrice) ? 0 : currentPrice / 100,
  };

  if (coupon && !coupon?.error) {
    const discountAmount = coupon.discount_amount;
    const discountType = coupon.type;
    yearlyPlanWithPrice.fullPrice = currentPrice / 100;

    if (discountType === "percentage") {
      yearlyPlanWithPrice.totalPrice! -=
        (yearlyPlanWithPrice.totalPrice! * discountAmount) / 100;
    } else {
      yearlyPlanWithPrice.totalPrice! -= discountAmount / 100;
    }
  }
  yearlyPlanWithPrice.monthlyPrice = yearlyPlanWithPrice.totalPrice! / 12;

  return yearlyPlanWithPrice;
}

export default function YearlyPricingCard() {
  const planDetails = useFetcher<any>();
  const [yearlyPlanInfo, setYearlyPlanInfo] = useState<PlanDetails | null>(
    null,
  );
  const [searchParams] = useSearchParams();

  const isSubmittingOrLoading =
    planDetails.state === "submitting" || planDetails.state === "loading";

  const invalidCouponError = planDetails?.data?.coupon[0]?.message;

  const validCoupon = !planDetails?.data?.coupon[0]?.error
    ? planDetails?.data?.coupon[0]
    : null;

  useEffect(() => {
    let url = `/plans?plan_id=2`;

    if (searchParams.has("coupon")) {
      const coupon = searchParams.get("coupon");
      url += `?coupon=${coupon}`;
    }

    planDetails.load(url);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (planDetails.data) {
      const yearlyPlanWithPrice = calculatePromotionPricing(
        planDetails.data.plan,
        planDetails.data.coupon[0],
      );

      setYearlyPlanInfo(yearlyPlanWithPrice);
    }
  }, [planDetails.data, planDetails.state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coupon = new FormData(e.currentTarget).get("couponCode") as string;
    planDetails.load(`/plans?coupon=${coupon}`);
  };

  return (
    <PriceCard className="border-blue-300 dark:border-brand border bg-white">
      <PriceCard.Title isLoading={!yearlyPlanInfo}>
        <span className="px-1 dark:font-normal rounded text-white  dark:text-amber-400 dark:bg-transparent bg-amber-400 drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.4)]">
          PRO
        </span>
        <span className="text-gray-800 dark:text-gray-50">
          ({yearlyPlanInfo?.name})
        </span>
      </PriceCard.Title>

      <PriceCard.Pricing {...yearlyPlanInfo} isLoading={!yearlyPlanInfo} />

      {validCoupon && <CouponChip coupon={validCoupon} />}
      <PriceButtonPro isLoading={!yearlyPlanInfo} coupon={validCoupon?.code} />
      <PriceCard.Coupon
        onSubmit={handleSubmit}
        isLoading={isSubmittingOrLoading}
        error={invalidCouponError}
        success={
          validCoupon
            ? `Cupom ${validCoupon.code} aplicado com sucesso!`
            : undefined
        }
      />

      <PriceCard.Divider />

      <PriceCard.Features features={yearlyPlanFeatures} />
    </PriceCard>
  );
}

function CouponChip({ coupon }: { coupon: Coupon }) {
  const couponDiscont =
    coupon.type === "percentage"
      ? `${coupon.discount_amount}%`
      : `R$${(coupon.discount_amount / 100).toFixed(0)}`;

  return (
    <div className="font-light text-xs text-center -mt-6 mb-6">
      <span>
        Você ganhou{" "}
        <b className="underline decoration-brand-400">{couponDiscont}</b> de
        desconto com o cupom{" "}
        <b className="underline decoration-brand-400">{coupon.code}</b>!
      </span>
    </div>
  );
}
