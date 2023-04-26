import { Link } from "@remix-run/react";
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

      <div className="mb-8 card-header">
        <h2 className="mb-1 text-lg text-center text-slate-600 dark:text-white">
          {price?.name}
        </h2>
      </div>

      <p className="mb-12 text-xl font-light text-gray-900 slate-600 dark:text-white">
        R$<span className="font-bold text-7xl">{price?.price}</span>
      </p>

      <Link to="/login">
        <button className="w-full p-2 text-white bg-green-700 rounded-md">
          Cadastre-se
        </button>
      </Link>
      <div className="h-[1px] bg-slate-500/30 w-full my-4" />

      <ul className="mt-8 space-y-3 text-sm leading-6 dark:text-white text-slate-600">
        {Object.entries(price?.features)?.map(
          ([feature, isAvailable], index) => (
            <li className="flex text-start gap-x-3" key={index}>
              {isAvailable ? (
                <AiOutlineCheck color="#5282FF" className="w-5 h-6 mr-2" />
              ) : (
                <AiOutlineClose color="#F4B4AB" className="w-5 h-6 mr-2" />
              )}
              {feature}
            </li>
          )
        )}
      </ul>
    </article>
  );
}
