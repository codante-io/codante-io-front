"use client";

import * as React from "react";

import { Button } from "./button";
import type { ButtonVariantProps, ButtonVariantSize } from "./button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { useMediaQuery } from "~/lib/hooks/use-media-query";

interface ResponsiveDialogProps {
  children: React.ReactNode;
  triggerLabel?: string;
  title: string;
  description: string;
  drawerCancelLabel?: string;
  triggerButtonVariant?: ButtonVariantProps;
  triggerButtonSize?: ButtonVariantSize;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResponsiveDialog({
  children,
  triggerLabel,
  title,
  description,
  drawerCancelLabel = "Cancelar",
  triggerButtonVariant = "default",
  triggerButtonSize = "default",
  open,
  onOpenChange,
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button size={triggerButtonSize} variant={triggerButtonVariant}>
            {triggerLabel}
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-describedby="responsive-dialog-description"
          className="sm:max-w-[425px]"
        >
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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button size={triggerButtonSize} variant={triggerButtonVariant}>
          {triggerLabel}
        </Button>
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
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
