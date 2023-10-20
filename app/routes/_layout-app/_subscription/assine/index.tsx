import PriceCard from "~/components/cards/price-card";

export default function AssinePage() {
  return (
    <main className="container mx-auto ">
      <h1 className="mb-10 text-4xl text-center font-lexend">
        Assine o Codante
      </h1>

      <section>
        <div className="container flex flex-col items-center">
          <p className="mt-2 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-7xl">
            Temos o compromisso de oferecer muito conteúdo{" "}
            <span className="italic font-bold">gratuito</span> e de{" "}
            <span className="italic font-bold">qualidade</span>. <br />{" "}
            Considere se tornar um membro Premium para apoiar o projeto e ter
            acesso a mais conteúdos exclusivos.
          </p>
          <section className="flex flex-col justify-center gap-20 mt-10 mb-20 md:flex-row">
            <PriceCard
              price={{
                name: "Gratuito",
                price: 0,
                features: {
                  Comunidade: true,
                  "Mini projetos": true,
                  "Workshops limitados": true,
                  // "Área vip da comunidade": false,
                  // "Resoluções dos mini projetos": false,
                },
              }}
            />
            <PriceCard
              price={{
                name: "Premium",
                banner: "Gratuito por tempo limitado",
                price: 0,
                features: {
                  Comunidade: true,
                  "Mini projetos": true,
                  "Todos os Workshops": true,
                  "Resoluções oficiais dos mini projetos": true,
                  "PRO Badge": true,
                  "Área vip da comunidade": true,
                },
              }}
            />
          </section>
        </div>
      </section>
    </main>
  );
}
