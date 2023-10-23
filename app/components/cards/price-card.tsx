import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import PriceButton from "./price-button";
import classNames from "~/utils/class-names";

export default function PriceCard({
  price,
}: {
  // @TODO: change this to price when the API is ready
  price: any;
}) {
  type Feature = Record<string, boolean>;

  return (
    <article className="relative w-[400px] bg-white dark:bg-background-800 shadow-md rounded-2xl py-6 px-8 pt-3 font-lexend border-[1.5px] border-gray-300 dark:border-background-600">
      {price?.banner && <CardItemRibbon text={price?.banner} />}

      <div className="mb-8 card-header">
        <h2
          className={classNames(
            "mb-1 text-xl text-center"
            // price?.name.startsWith('PRO') ? 'text-amber-400' : 'text-gray-700 dark:text-gray-50',
          )}
        >
          {price?.name.startsWith("PRO") ? (
            <>
              <span className="text-amber-400">{`PRO `}</span>
              <span className="text-gray-900 dark:text-gray-50">
                {price?.name.slice(3)}
              </span>
            </>
          ) : (
            <span className="text-gray-900 dark:text-gray-50">
              {price?.name}
            </span>
          )}
        </h2>
      </div>

      <div className="h-[150px] flex flex-col justify-center items-center">
        <p className="mb-2 text-sm text-center text-gray-900 font-extralight slate-600 dark:text-gray-50">
          {price.fullPrice && (
            <span className="opacity-50">
              {`de `}
              <span className="line-through">{`R$ ${price.fullPrice}`}</span>
            </span>
          )}
        </p>

        <p className="mb-2 text-center text-gray-900 text-md font-extralight slate-600 dark:text-gray-50">
          <span className="opacity-50">
            {price.installments > 1 && `${price.installments}x`}
          </span>{" "}
          <span className="text-5xl font-semibold">R${price?.price}</span>
        </p>

        <p className="mb-12 text-sm text-center text-gray-900 font-extralight slate-600 dark:text-gray-50">
          {price.immediateSettlementAmount && (
            <span className="opacity-50">{`à vista R$ ${price.immediateSettlementAmount}`}</span>
          )}
        </p>
      </div>

      <PriceButton plan={price?.name} />

      <div className="h-[1px] bg-background-500/30 w-1/2 mx-auto my-6" />

      {/* Seção de vantagens */}
      {Object.entries<Record<string, Feature>>(price?.features || {}).map(
        ([section, feature], index) => (
          <section key={index}>
            <h3 className="text-xs text-brand-400">{section}</h3>
            <ul className="mt-1 mb-5 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-50">
              {Object.entries<Feature>(feature)?.map(
                ([featureName, isAvailable], index) => (
                  <li className="text-start gap-x-3" key={index}>
                    {isAvailable ? (
                      <div className="flex items-center">
                        <AiOutlineCheck className="w-4 h-5 mr-5 text-green-600 dark:text-green-300" />
                        <span className="">{featureName}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <AiOutlineClose className="w-4 h-5 mr-5 text-red-500" />
                        <span className="font-light line-through opacity-50">
                          {featureName}
                        </span>
                      </div>
                    )}
                  </li>
                )
              )}
            </ul>
          </section>
        )
      )}
    </article>
  );
}
