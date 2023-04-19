import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import CardItemRibbon from "~/components/cards/card-item-ribbon";

export default function PriceCard({
  price,
}: {
  // @TODO: change this to price when the API is ready
  price: any;
}) {
  return (
    <article className="relative w-[300px] bg-white dark:bg-gray-dark shadow-md rounded-2xl py-6 px-10 pt-3 font-lexend border-[1.5px] border-gray-300 dark:border-slate-600">
      {price?.banner && <CardItemRibbon text={price?.banner} />}

      <div className="card-header mb-8">
        <h2 className="text-lg text-slate-600 dark:text-white mb-1 text-center">
          {price?.name}
        </h2>
      </div>

      <p className="slate-600 font-light text-xl mb-12 dark:text-white text-gray-900">
        R$<span className="font-bold text-7xl">{price?.price}</span>
      </p>

      <button className="bg-green-700 text-white rounded-md p-2 w-full">
        Cadastre-se
      </button>
      <div className="h-[1px] bg-slate-500/30 w-full my-4" />

      <ul className="mt-8 space-y-3 text-sm leading-6 dark:text-white text-slate-600">
        {Object.entries(price?.features)?.map(
          ([feature, isAvailable], index) => (
            <li className="flex text-start gap-x-3" key={index}>
              {isAvailable ? (
                <AiOutlineCheck color="#5282FF" className="mr-2 h-6 w-5" />
              ) : (
                <AiOutlineClose color="#F4B4AB" className="mr-2 h-6 w-5" />
              )}
              {feature}
            </li>
          )
        )}
      </ul>
    </article>
  );
}
