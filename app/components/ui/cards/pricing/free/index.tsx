import {
  freePlanDetails as planDetails,
  freePlanFeatures,
} from "~/components/ui/cards/pricing/data";
import PriceButtonFree from "~/components/ui/cards/pricing/free/button";
import PriceCard from "~/components/ui/cards/pricing/price-card";

export default function FreePricingCard() {
  return (
    <PriceCard>
      <PriceCard.Title>{planDetails.name}</PriceCard.Title>

      <PriceCard.Pricing {...planDetails} />

      <PriceButtonFree />

      <PriceCard.Divider />

      <PriceCard.Features features={freePlanFeatures} />
    </PriceCard>
  );
}
