import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import CardItemRibbon from "~/components/ui/cards/card-item-ribbon";
import { BsInfoCircle } from "react-icons/bs";
import TooltipWrapper from "~/components/ui/tooltip";
import type { PlanFeaturesByCategory } from "./pricing.d";
import { Button } from "../../button";
import { useEffect, useState } from "react";
import { Input } from "../../input";
import { cn } from "~/lib/utils/cn";
import { Skeleton } from "~/components/ui/skeleton";
import { CgSpinner } from "react-icons/cg";

const PriceCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <article
      className={cn(
        "border-gray-300 dark:border-background-600 border-[1.5px] bg-white shadow-2xl relative md:w-[450px] dark:bg-background-800 rounded-2xl py-6 px-8 pt-3 font-lexend w-full shrink-0 grow-0 transition-all",
        className,
      )}
    >
      {children}
    </article>
  );
};

const PriceCardRibbon = ({ text }: { text: string }) => {
  return <CardItemRibbon text={text} />;
};

const PriceCardTitle = ({
  children,
  className,
  isLoading,
}: {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}) => {
  return (
    <h2
      className={cn(
        "mb-9 text-xl text-center text-gray-800 dark:text-gray-50",
        className,
      )}
    >
      {isLoading ? <Skeleton className="h-6 w-24 mx-auto" /> : children}
    </h2>
  );
};

interface PriceCardPricingProps {
  fullPrice?: number;
  installments?: number;
  monthlyPrice?: number;
  totalPrice?: number;
  isLoading?: boolean;
}

const PriceCardPricing = ({
  fullPrice,
  installments,
  monthlyPrice,
  totalPrice,
  isLoading,
}: PriceCardPricingProps) => {
  const formattedMonthlyPrice = Number.isInteger(monthlyPrice)
    ? monthlyPrice
    : monthlyPrice?.toFixed(2);

  return (
    <div className="h-[150px] flex flex-col justify-center items-center">
      {isLoading ? (
        <Skeleton className="h-16 w-full mx-auto" />
      ) : (
        <>
          <p className="mb-2 text-sm text-center text-gray-800 font-extralight slate-600 dark:text-gray-50">
            {fullPrice && (
              <span className="opacity-50">
                {`de `}
                <span className="line-through">{`R$ ${fullPrice}`}</span>
              </span>
            )}
          </p>

          <p className="mb-2 text-center text-gray-800 text-md font-extralight slate-600 dark:text-gray-50">
            <span className="opacity-50">
              {installments !== undefined &&
                installments > 1 &&
                `${installments}x`}
            </span>{" "}
            <span className="text-5xl font-semibold">
              R$
              {formattedMonthlyPrice}
            </span>
          </p>

          <p className="mb-12 text-sm text-center text-gray-900 font-extralight slate-600 dark:text-gray-50">
            {totalPrice && (
              <span className="opacity-50">{`à vista R$ ${Number.isInteger(totalPrice) ? totalPrice : totalPrice.toFixed(2)}`}</span>
            )}
          </p>
        </>
      )}
    </div>
  );
};

const PriceCardCoupon = ({
  onSubmit,
  isLoading,
  error,
  success,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  error?: string;
  success?: string;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (success) {
      setOpen(false);
    }
  }, [success]);

  if (open) {
    return (
      <form onSubmit={onSubmit} className="">
        <div className="flex items-center gap-2 mt-4">
          <Input
            className="h-9 font-light dark:bg-transparent border-[1.5px]"
            placeholder="Código do Cupom"
            name="couponCode"
          />
          <Button
            variant="outline"
            size="sm"
            type="submit"
            className="dark:border-background-700 w-24"
          >
            {isLoading ? (
              <CgSpinner className="animate-spin text-center inline-block h-5 w-5" />
            ) : (
              "Aplicar"
            )}
          </Button>
        </div>

        {error && (
          <span className="text-red-700 text-xs font-light m-3">{error}</span>
        )}
      </form>
    );
  }
  return (
    <div className="text-right">
      {!open && (
        <Button
          type="button"
          variant={"link"}
          onClick={() => setOpen(true)}
          className="inline-block text-xs font-light group "
        >
          <span className="text-gray-400 group-hover:text-white">
            {success ? "Alterar cupom" : "Possui cupom?"}
          </span>
        </Button>
      )}
    </div>
  );
};

const PriceCardDivider = () => (
  <div className="h-[1px] bg-background-500/30 w-1/2 mx-auto my-6" />
);

function PriceCardFeatureItem({
  feature,
}: {
  feature: { title: string; isAvailable: boolean; info?: string };
}) {
  return (
    <li className="text-start" key={feature.title}>
      <div className="text-[13px] md:text-[14px] flex items-center gap-x-1">
        {feature.isAvailable ? (
          <>
            <AiOutlineCheck className="flex-shrink-0 w-3 h-3 mr-2 text-green-600 md:w-5 md:h-5 md:mr-5 dark:text-green-300" />
            <span className="font-light">{feature.title}</span>
          </>
        ) : (
          <>
            <AiOutlineClose className="w-3 h-3 mr-2 text-red-500 md:w-5 md:h-5 md:mr-5" />
            <span className="font-light line-through opacity-50">
              {feature.title}
            </span>
          </>
        )}
        {feature.info && (
          <span className="items-center hidden md:flex">
            <TooltipWrapper text={feature.info}>
              <BsInfoCircle className="ml-1 text-gray-300 hover:text-gray-500 dark:hover:text-background-300 dark:text-background-600" />
            </TooltipWrapper>
          </span>
        )}
      </div>
    </li>
  );
}

const PriceCardFeatures = ({
  features,
}: {
  features: PlanFeaturesByCategory;
}) =>
  features.map((category) => {
    const categoryName = Object.keys(category)[0];
    return (
      <section key={categoryName}>
        <h3 className="text-xs text-brand-400">{categoryName}</h3>
        <ul className="mt-1 mb-5 space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-50">
          {category[categoryName].map((feature) => {
            return (
              <PriceCardFeatureItem key={feature.title} feature={feature} />
            );
          })}
        </ul>
      </section>
    );
  });

PriceCard.Ribbon = PriceCardRibbon;
PriceCard.Title = PriceCardTitle;
PriceCard.Pricing = PriceCardPricing;
PriceCard.Coupon = PriceCardCoupon;
PriceCard.Divider = PriceCardDivider;
PriceCard.Features = PriceCardFeatures;

export default PriceCard;
