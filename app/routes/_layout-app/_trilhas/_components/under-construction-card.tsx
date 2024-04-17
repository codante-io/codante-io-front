import { LuConstruction } from "react-icons/lu";
import { Card } from "~/components/ui/cards/card";

function UnderConstructionCard() {
  return (
    <Card
      border="bright"
      className="relative overflow-visible text-start mb-12 dark:border-amber-400/40 shadow-none border-amber-400/40 dark:bg-transparent"
    >
      <div className="flex flex-col justify-between px-8 py-4 h-full flex-grow">
        <div>
          <div className="mb-2 card-header">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="h-full text-amber-400">
                <LuConstruction className="w-full h-10" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-gray-700 dark:text-gray-50 line-clamp-2">
                  Essa trilha está em construção
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400 border-b border-amber-400">
                  Estamos preparando muita coisa boa!
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm font-light text-gray-600 line-clamp-3 slate-600 dark:text-gray-300 mt-6">
            Você pode acessá-la e fazer os conteúdos disponíveis, mas tenha em
            mente que alguns conteúdos ainda serão gravados.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default UnderConstructionCard;
