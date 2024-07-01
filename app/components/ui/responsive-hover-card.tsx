import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useMediaQuery } from "~/lib/hooks/use-media-query";

interface ResponsiveHoverCardProps {
  trigger: React.ReactNode;
  cardContent: React.ReactNode;
  behavior?: "hover" | "click";
}

export function ResponsiveHoverCard({
  trigger,
  cardContent,
  behavior = "hover",
}: ResponsiveHoverCardProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [hideOnMobile, setHideOnMobile] = React.useState(false);
  React.useEffect(() => {
    setHideOnMobile(isMobile);
  }, [isMobile]);

  if (hideOnMobile || behavior === "click") {
    return (
      <Popover>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent sideOffset={10}>{cardContent}</PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger>{trigger}</HoverCardTrigger>
      <HoverCardContent>{cardContent}</HoverCardContent>
    </HoverCard>
  );
}
