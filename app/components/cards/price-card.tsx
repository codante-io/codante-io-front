import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function PriceCard({
  price,
}: {
  // @TODO: change this to price when the API is ready
  price: any;
}) {
  return (
    <article className="relative w-[300px] bg-white dark:bg-gray-900 shadow-md rounded-2xl py-6 px-10 pt-3 font-lexend border-[1.5px] border-gray-300 dark:border-slate-600">
      {price?.banner && (
        <div className="w-36 aspect-square absolute -top-2 -right-2 overflow-hidden rounded-sm">
          <div className="absolute top-0 left-0 bg-blue-500 h-2 w-2"></div>
          <div className="absolute bottom-0 right-0 bg-blue-500 h-2 w-2"></div>
          <span className="w-[210px] px-8 py-1.5 bg-blue-300 text-blue-900 font-semibold uppercase text-xs tracking-wider block w-square-diagonal text-center absolute bottom-0 right-0 rotate-45 origin-bottom-right shadow-sm hover:bg-blue-300">
            {price.banner}
          </span>
        </div>
      )}

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
