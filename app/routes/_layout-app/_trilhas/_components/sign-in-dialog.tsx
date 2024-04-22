import { Link } from "@remix-run/react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

interface SignInDialogProps {
  trigger: React.ReactNode;
  redirectTo?: string;
}

function SignInDialog({ trigger, redirectTo }: SignInDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-11/12 sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle className="text-start text-lg md:text-xl font-medium text-gray-700 dark:text-gray-50">
            Você precisa fazer login para marcar esse item como concluído.
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 dark:text-gray-300">
          Faça login ou cadastre-se gratuitamente na nossa plataforma!
        </p>
        <Link to={`/login?redirectTo=${redirectTo}`} className="w-full">
          <Button className="w-full font-bold">Fazer login</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
