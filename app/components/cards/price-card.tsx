import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import PriceButton from "./price-button";
import classNames from "~/utils/class-names";
import { BsInfoCircle } from "react-icons/bs";
import TooltipWrapper from "../tooltip";

export default function PriceCard({
  data,
  featuresByCategory,
}: {
  // @TODO: change this to price when the API is ready
  data: {
    name: "Gratuito" | "PRO (Vitalício)";
    price: number;
    installments: number;
    fullPrice?: number;
    immediateSettlementAmount?: number;
    banner?: string;
  };
  featuresByCategory: {
    [key: string]: {
      title: string;
      info: string;
      isAvailable: boolean;
    }[];
  }[];
}) {
  return (
    <article
      className={classNames(
        data?.name.startsWith("PRO")
          ? "border-brand shadow-lg dark:shadow-blue-400 dark:shadow-2xl hover:dark:shadow-blue-300 border-4 bg-white"
          : "border-gray-300 dark:border-background-600 border-[1.5px] bg-white shadow-2xl",
        "relative w-[450px]  dark:bg-background-800   rounded-2xl py-6 px-8 pt-3 font-lexend "
      )}
    >
      {data?.banner && <CardItemRibbon text={data?.banner} />}

      <div className="mb-8 card-header">
        <h2
          className={classNames(
            "mb-1 text-xl text-center"
            // data?.name.startsWith('PRO') ? 'text-amber-400' : 'text-gray-700 dark:text-gray-50',
          )}
        >
          {data?.name.startsWith("PRO") ? (
            <>
              <span className="px-1 dark:font-normal rounded text-white  dark:text-amber-400 dark:bg-transparent bg-amber-400 drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.4)]">{`PRO`}</span>
              <span className="text-gray-800 dark:text-gray-50">
                {data?.name.slice(3)}
              </span>
            </>
          ) : (
            <span className="text-gray-800 dark:text-gray-50">
              {data?.name}
            </span>
          )}
        </h2>
      </div>

      <div className="h-[150px] flex flex-col justify-center items-center">
        <p className="mb-2 text-sm text-center text-gray-800 font-extralight slate-600 dark:text-gray-50">
          {data.fullPrice && (
            <span className="opacity-50">
              {`de `}
              <span className="line-through">{`R$ ${data.fullPrice}`}</span>
            </span>
          )}
        </p>

        <p className="mb-2 text-center text-gray-800 text-md font-extralight slate-600 dark:text-gray-50">
          <span className="opacity-50">
            {data.installments > 1 && `${data.installments}x`}
          </span>{" "}
          <span className="text-5xl font-semibold">R${data?.price}</span>
        </p>

        <p className="mb-12 text-sm text-center text-gray-900 font-extralight slate-600 dark:text-gray-50">
          {data.immediateSettlementAmount && (
            <span className="opacity-50">{`à vista R$ ${data.immediateSettlementAmount}`}</span>
          )}
        </p>
      </div>

      <PriceButton plan={data.name} />

      <div className="h-[1px] bg-background-500/30 w-1/2 mx-auto my-6" />

      {/* Seção de vantagens */}
      {featuresByCategory.map((category) => {
        const categoryName = Object.keys(category)[0];
        return (
          <section key={categoryName}>
            <h3 className="text-xs text-brand-400">{categoryName}</h3>
            <ul className="mt-1 mb-5 space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-50">
              {category[categoryName].map((feature) => {
                return <FeatureItem key={feature.title} feature={feature} />;
              })}
            </ul>
          </section>
        );
      })}
    </article>
  );
}

function FeatureItem({
  feature,
}: {
  feature: { title: string; isAvailable: boolean; info: string };
}) {
  return (
    <li className="text-start" key={feature.title}>
      <div className="flex items-center gap-x-1">
        {feature.isAvailable ? (
          <>
            <AiOutlineCheck className="flex-shrink-0 w-5 h-5 mr-5 text-green-600 dark:text-green-300" />
            <span className="font-light">{feature.title}</span>
          </>
        ) : (
          <>
            <AiOutlineClose className="w-5 h-5 mr-5 text-red-500" />
            <span className="font-light line-through opacity-50">
              {feature.title}
            </span>
          </>
        )}
        {feature.info && (
          <span className="flex items-center">
            <TooltipWrapper text={feature.info}>
              <BsInfoCircle className="ml-1 text-background-600" />
            </TooltipWrapper>
          </span>
        )}
      </div>
    </li>
  );
}
