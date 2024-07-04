import { Link } from "@remix-run/react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import { FaCrown } from "react-icons/fa";

interface BecomeProDialogProps {
  trigger: React.ReactNode;
}

function BecomeProDialog({ trigger }: BecomeProDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-11/12 sm:max-w-md rounded-md p-8">
        <DialogHeader>
          <DialogTitle className="text-start text-lg md:text-xl font-medium text-gray-700 dark:text-gray-50">
            Acesso exclusivo para membros <ProSpanWrapper>PRO</ProSpanWrapper>
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 dark:text-gray-300">
          Esse conteúdo é exclusivo para nossos assinantes.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Libere esse e muito mais conteúdo assinando o <b>Codante</b>{" "}
          <ProSpanWrapper>PRO</ProSpanWrapper>.
        </p>
        <DialogFooter>
          <div className="flex gap-2 w-full mt-6">
            <Link to="/assine" className="w-full">
              <Button variant="secondary" className="w-full font-bold">
                Saiba mais
              </Button>
            </Link>
            <Link to="/planos" className="w-full">
              <Button variant="pro" className="w-full font-bold">
                <FaCrown className="mr-2 text-amber-500" />
                Assinar agora
              </Button>
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BecomeProDialog;
