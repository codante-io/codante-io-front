import { Link } from "@remix-run/react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { NewButton } from "~/components/ui/new-button";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";

interface BecomeProDialogProps {
  trigger: React.ReactNode;
}

function BecomeProDialog({ trigger }: BecomeProDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-11/12 sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle className="text-start text-lg md:text-xl font-medium text-gray-700 dark:text-gray-50">
            Acesso exclusivo para membros <ProSpanWrapper>PRO</ProSpanWrapper>
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 dark:text-gray-300">
          Nossas trilhas são exclusivas para nossos assinantes.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Considere se inscrever para ter acesso a esse e mais conteúdos
          exclusivos.
        </p>
        <Link to="/assine" className="w-full">
          <NewButton variant="pro" className="w-full font-bold">
            Saiba mais
          </NewButton>
        </Link>
      </DialogContent>
    </Dialog>
  );
}

export default BecomeProDialog;
