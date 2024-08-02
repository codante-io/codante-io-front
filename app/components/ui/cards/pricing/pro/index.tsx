import { useFetcher, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  proPlanDetails,
  proPlanFeatures,
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

  const proPlanWithPrice: PlanDetails = {
    ...proPlanDetails,
    totalPrice: isNaN(currentPrice) ? 0 : currentPrice / 100,
  };

  if (coupon && !coupon?.error) {
    const discountAmount = coupon.discount_amount;
    const discountType = coupon.type;
    proPlanWithPrice.fullPrice = currentPrice / 100;

    if (discountType === "percentage") {
      proPlanWithPrice.totalPrice! -=
        (proPlanWithPrice.totalPrice! * discountAmount) / 100;
    } else {
      proPlanWithPrice.totalPrice! -= discountAmount / 100;
    }
  }
  proPlanWithPrice.monthlyPrice = proPlanWithPrice.totalPrice! / 12;

  return proPlanWithPrice;
}

export default function ProPricingCard() {
  const planDetails = useFetcher<any>();
  const [proPlanInfo, setProPlanInfo] = useState<PlanDetails | null>(null);
  const [searchParams] = useSearchParams();

  const isSubmittingOrLoading =
    planDetails.state === "submitting" || planDetails.state === "loading";

  const invalidCouponError = planDetails?.data?.coupon[0]?.message;

  const validCoupon = !planDetails?.data?.coupon[0]?.error
    ? planDetails?.data?.coupon[0]
    : null;

  useEffect(() => {
    let url = "/plans";

    if (searchParams.has("coupon")) {
      const coupon = searchParams.get("coupon");
      url += `?coupon=${coupon}`;
    }

    planDetails.load(url);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (planDetails.data) {
      const proPlanWithPrice = calculatePromotionPricing(
        planDetails.data.plan,
        planDetails.data.coupon[0],
      );

      setProPlanInfo(proPlanWithPrice);
    }
  }, [planDetails.data, planDetails.state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coupon = new FormData(e.currentTarget).get("couponCode") as string;
    planDetails.load(`/plans?coupon=${coupon}`);
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

      {validCoupon && <CouponChip coupon={validCoupon} />}
      <PriceButtonPro isLoading={!proPlanInfo} coupon={validCoupon?.code} />
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

      <PriceCard.Features features={proPlanFeatures} />
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
