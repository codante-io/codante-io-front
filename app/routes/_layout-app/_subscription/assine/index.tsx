import PriceCard from "~/components/cards/price-card";

export default function AssinePage() {
  return (
    <main className="container mx-auto ">
      <h1 className="mb-10 text-4xl text-center font-lexend">
        <span className="border-b-2 border-amber-400">Assine</span> o Codante
      </h1>

      <section>
        <div className="container flex flex-col items-center">
          <p className="mt-2 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-7xl">
            Assine nosso{" "}
            <span className="text-brand-400">
              plano vitalício com valor promocional de lançamento
            </span>{" "}
            <span className="font-bold text-brand-400">
              por tempo limitado.
            </span>{" "}
            Sem assinaturas. Pague apenas uma vez, acesse para sempre.
          </p>

          <section className="flex flex-col justify-center gap-20 mt-10 mb-20 md:flex-row">
            <PriceCard
              price={{
                name: "Gratuito",
                price: 0,
                installments: 0,
                features: {
                  "Mini Projetos": {
                    "Acesso a todos os Mini Projetos": true,
                    "Submeta sua resolução": true,
                    "Resolução Oficial com vídeo": false,
                    Certificado: false,
                  },
                  Workshops: {
                    "Acesso limitado aos workshops": true,
                    "Acesso a todos os workshops": false,
                    Certificado: false,
                  },
                  "Outras vantagens": {
                    "Acesso à Comunidade": true,
                    "Canais PRO da Comunidade": false,
                    "Pro Badge": false,
                    "Acesso ao Ranking Premiado": false,
                  },
                },
              }}
            />
            <PriceCard
              price={{
                name: "PRO (Vitalício)",
                fullPrice: 948,
                banner: "Oferta de lançamento",
                immediateSettlementAmount: 588,
                price: 49,
                installments: 12,
                features: {
                  "Mini Projetos": {
                    "Acesso a todos os Mini Projetos": true,
                    "Submeta sua resolução": true,
                    "Resolução Oficial com vídeo": true,
                    Certificado: true,
                  },
                  Workshops: {
                    "Acesso a todos os workshops": true,
                    Certificado: true,
                  },
                  "Outras vantagens": {
                    "Pro Badge": true,
                    "Canais PRO da Comunidade": true,
                    "Acesso ao Ranking Premiado": true,
                    "Plano Vitalício: pague uma vez, tenha para sempre": true,
                  },
                },
              }}
            />
          </section>
        </div>
      </section>
    </main>
  );
}
