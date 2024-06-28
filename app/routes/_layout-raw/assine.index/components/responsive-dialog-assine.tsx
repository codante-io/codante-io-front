import * as React from "react";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useMediaQuery } from "~/lib/hooks/use-media-query";

interface ResponsiveDialogProps {
  children: React.ReactNode;
  triggerLabel?: string;
  title: string;
  description: string;
  drawerCancelLabel?: string;
  open?: boolean;
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
}

export function ResponsiveDialog({
  children,
  title,
  description,
  drawerCancelLabel = "Cancelar",
  open,
  onOpenChange,
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const scroll = () => {
    const section = document.querySelector("#price-card");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            scroll();
          }
          if (onOpenChange) {
            onOpenChange(isOpen);
          }
        }}
      >
        <DialogTrigger asChild>
          <button className="relative inline-flex items-center justify-center text-lg lg:text-2xl px-10 py-4 overflow-hidden font-medium text-gray-100 bg-brand-500 rounded-lg group w-full lg:w-7/12">
            <div className="absolute w-0 h-0 transition-all duration-500 ease-out bg-background-700 rounded-full group-hover:w-[105%] group-hover:h-56"></div>
            <div className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></div>
            <span className="relative">
              Quero ter acesso ao <span className="font-bold">Codante</span>{" "}
              <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-500">
                PRO
              </span>
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          scroll();
        }
        if (onOpenChange) {
          onOpenChange(isOpen);
        }
      }}
    >
      <DrawerTrigger asChild>
        <button
          // onClick={scroll}
          className="relative inline-flex items-center justify-center text-lg lg:text-2xl px-10 py-4 overflow-hidden font-medium text-gray-100 bg-brand-500 rounded-lg group w-full lg:w-7/12"
        >
          <div className="absolute w-0 h-0 transition-all duration-500 ease-out bg-background-700 rounded-full group-hover:w-[105%] group-hover:h-56"></div>
          <div className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></div>
          <span className="relative">
            Quero ter acesso ao <span className="font-bold">Codante</span>{" "}
            <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-500">
              PRO
            </span>
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="secondary">{drawerCancelLabel}</Button>
          </DrawerClose>{" "}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
