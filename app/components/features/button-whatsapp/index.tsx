import { BsWhatsapp } from "react-icons/bs";
import React from "react";
import { cn } from "~/lib/utils/cn";

type Props = {
  className?: string;
  textSizeClass?: string;
  onlyWrapper?: boolean;
};

export default function WhatsButton({
  className = "",
  onlyWrapper = false,
}: Props) {
  const whatsUrl = `https://wa.me/551631700669?text=Quero%20saber%20mais%20da%20codante`;

  return (
    <a
      href={whatsUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        !onlyWrapper &&
          "fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300",
        className,
      )}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <BsWhatsapp className="w-6 h-6" />
    </a>
  );
}
