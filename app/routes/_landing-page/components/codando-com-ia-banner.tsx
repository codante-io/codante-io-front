import { Link } from "react-router";
import { Calendar, ArrowRight } from "lucide-react";
import { BlurReveal } from "~/components/ui/motion/blur-reveal";

export default function CodandoComIaBanner() {
  return (
    <section className="flex justify-center w-full px-4 md:px-0">
      <BlurReveal className="container flex flex-col w-full">
        <div className="relative w-full rounded-2xl shadow-2xl border-2 border-emerald-300/60 dark:border-emerald-400/70 mb-12 mt-4">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-transparent rounded-2xl overflow-hidden" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[size:50px_50px]" />

          {/* Content */}
          <div className="relative z-10 px-6 md:px-12 py-10 md:py-14 overflow-visible">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Left content */}
              <div className="flex flex-col gap-4 md:gap-6 flex-1 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 w-fit mx-auto lg:mx-0 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white">
                  <span className="text-lg">🔴</span>
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-wider">
                    Novidade: Curso ao Vivo
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold font-lexend text-white drop-shadow-lg leading-tight">
                  Codando com IA
                  <span className="inline-block ml-2">✨</span>
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-white/95 max-w-2xl drop-shadow-md leading-relaxed">
                  Aprenda a integrar IA no seu workflow e nas suas aplicações em
                  TypeScript. Encontros ao vivo com dúvidas respondidas em tempo
                  real.
                </p>

                {/* Bonus Benefit */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-medium">
                  <span className="text-lg">🎁</span>
                  <span>
                    Compre o curso e ganhe <strong>1 ano de Codante PRO</strong>
                  </span>
                </div>

                {/* Date and time */}
                <div className="flex items-center gap-2 justify-center lg:justify-start text-white/95 text-xs md:text-sm font-medium">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>05/11/2025 a 10/12/2025 • 19h às 21h</span>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    to="/codando-com-ia"
                    className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold text-emerald-600 dark:text-emerald-900 bg-white hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 text-sm md:text-base"
                  >
                    <span>Inscreva-se Agora</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                </div>
              </div>

              {/* Right visual - Instructors */}
              <div className="hidden lg:flex items-center justify-center flex-1 relative h-[280px] w-full">
                {/* Ícaro */}
                <div
                  className="absolute z-10 flex flex-col items-center -translate-x-1/2"
                  style={{ left: "calc(50% - 100px)" }}
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 aspect-square">
                    <img
                      src="/img/vendas/icaro.webp"
                      alt="Ícaro Harry"
                      className="w-full h-full rounded-full border-4 border-white/40 shadow-2xl object-cover"
                    />
                  </div>
                  <p className="text-white text-sm font-medium mt-3">
                    Ícaro Harry
                  </p>
                </div>

                {/* Roberto */}
                <div
                  className="absolute z-20 flex flex-col items-center -translate-x-1/2"
                  style={{ left: "calc(50% + 100px)" }}
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 aspect-square">
                    <img
                      src="/img/vendas/cestari.webp"
                      alt="Roberto Cestari"
                      className="w-full h-full rounded-full border-4 border-white/40 shadow-2xl object-cover"
                    />
                  </div>
                  <p className="text-white text-sm font-medium mt-3">
                    Roberto Cestari
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
