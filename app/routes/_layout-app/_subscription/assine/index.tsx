import PriceCard from "~/components/cards/price-card";

export default function AssinePage() {
  return (
    <main className="container mx-auto ">
      <h1 className="mb-10 text-4xl text-center font-lexend">
        <span className="font-bold border-b-4 border-amber-400">Assine</span> o
        Codante
      </h1>

      <section>
        <div className="container flex flex-col items-center">
          <p className="mt-2 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-3xl">
            Assine nosso{" "}
            <span className="text-brand-400">
              plano vitalício com valor promocional de lançamento
            </span>{" "}
            <span className="font-bold underline text-brand-400">
              por tempo limitado
            </span>
            . Sem assinaturas. Pague apenas uma vez, acesse para sempre.
          </p>

          <section className="flex flex-col justify-center gap-20 mt-10 mb-20 md:flex-row">
            <PriceCard
              featuresByCategory={[
                {
                  "Mini Projetos": [
                    {
                      title: "Acesso a todos os Mini Projetos",
                      info: "Acesse todos os mini projetos disponíveis. lorem ipsum dolor sit amet consectetur adipisicing elit.",
                      isAvailable: true,
                    },
                    {
                      title: "Submeta sua resolução",
                      info: "Submeta sua resolução para o mini projeto",
                      isAvailable: true,
                    },
                    {
                      title: "Resolução Oficial com vídeo",
                      info: "Assista a resolução oficial do mini projeto em vídeo",
                      isAvailable: false,
                    },
                    {
                      title: "Certificado",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: false,
                    },
                  ],
                },
                {
                  Workshops: [
                    {
                      title: "Acesso limitado aos workshops",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: true,
                    },
                    {
                      title: "Acesso a todos os workshops",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: false,
                    },
                    {
                      title: "Certificado",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: false,
                    },
                  ],
                },
                {
                  "Outras Vantagens": [
                    {
                      title: "Acesso à Comunidade",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: true,
                    },
                    {
                      title: "Canais PRO da Comunidade",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: false,
                    },
                    {
                      title: "Pro Badge",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: false,
                    },
                    {
                      title: "Acesso ao Ranking Premiado",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: false,
                    },
                  ],
                },
              ]}
              data={{
                name: "Gratuito",
                price: 0,
                installments: 0,
              }}
            />
            <PriceCard
              data={{
                name: "PRO (Vitalício)",
                fullPrice: 948,
                banner: "Oferta de lançamento",
                immediateSettlementAmount: 588,
                price: 49,
                installments: 12,
              }}
              featuresByCategory={[
                {
                  "Mini Projetos": [
                    {
                      title: "Acesso a todos os Mini Projetos",
                      info: "Acesse todos os mini projetos disponíveis",
                      isAvailable: true,
                    },
                    {
                      title: "Submeta sua resolução",
                      info: "Submeta sua resolução para o mini projeto",
                      isAvailable: true,
                    },
                    {
                      title: "Resolução Oficial com vídeo",
                      info: "Assista a resolução oficial do mini projeto em vídeo",
                      isAvailable: true,
                    },
                    {
                      title: "Certificado",
                      info: "Obtenha um certificado de conclusão do mini projeto",
                      isAvailable: true,
                    },
                  ],
                },
                {
                  Workshops: [
                    {
                      title: "Acesso a todos os workshops",
                      info: "Obtenha acesso a todos os workshops disponíveis",
                      isAvailable: true,
                    },
                    {
                      title: "Certificado",
                      info: "Obtenha um certificado de conclusão do workshop",
                      isAvailable: true,
                    },
                  ],
                },
                {
                  "Outras vantagens": [
                    {
                      title: "Pro Badge",
                      info: "Obtenha um badge de PRO na comunidade",
                      isAvailable: true,
                    },
                    {
                      title: "Canais PRO da Comunidade",
                      info: "Acesse os canais exclusivos da comunidade PRO",
                      isAvailable: true,
                    },
                    {
                      title: "Acesso ao Ranking Premiado",
                      info: "Participe do ranking premiado da comunidade",
                      isAvailable: true,
                    },
                    {
                      title:
                        "Plano Vitalício: pague uma vez, tenha para sempre",
                      info: "Adquira o plano vitalício da comunidade PRO",
                      isAvailable: true,
                    },
                  ],
                },
              ]}
            />
          </section>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="mb-10 text-4xl text-center font-lexend">
          Perguntas{" "}
          <span className="font-bold border-b-4 border-amber-400">
            Frequentes
          </span>
        </h2>
      </section>
    </main>
  );
}
