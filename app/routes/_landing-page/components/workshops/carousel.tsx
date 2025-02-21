import { Carousel } from "~/components/ui/carousel";

export default function CarouselWorkshops() {
  const slideData = [
    {
      src: "/img/landing-page/workshop1.webp",
      alt: "Imagem do professor Ícaro no workshop de Introdução ao React",
    },
    {
      src: "/img/landing-page/workshop2.webp",
      alt: "Imagem da turma presencial no workshop de Introdução ao React",
    },
    {
      src: "/img/landing-page/workshop3.webp",
      alt: "Imagem do professor Roberto Cestari tomando um café",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full min-h-[60vmin]">
      <Carousel slides={slideData} autoPlay />
    </div>
  );
}
