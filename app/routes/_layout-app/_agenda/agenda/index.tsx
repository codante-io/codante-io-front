import type React from "react";

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { metaV1 } from "@remix-run/v1-meta";
import { Card, CardContent } from "~/components/ui/cards/card";

import { BlurReveal } from "~/components/ui/motion/blur-reveal";
import {
  CalendarEvent,
  getPreviousEvents,
  getUpcomingEvents,
} from "~/lib/models/calendar.server";
import { ToggleGroup } from "~/components/ui/toggle-group";
import { ToggleGroupItem } from "~/components/ui/toggle-group";
import { MonitorPlay, PencilRuler } from "lucide-react";
import { RiLiveLine } from "react-icons/ri";
import { cn } from "~/lib/utils/cn";
import { useState } from "react";

// meta function
export function meta(args: any) {
  return metaV1(args, {
    title: "Agenda | Codante.io",
    description: "Acompanhe a agenda de workshops e mini projetos da Codante.",
  });
}

export const loader = async () => {
  /**
   * This calendar feature will need improvements in the future to support a larger list of events.
   * Right now, it just fetches all the events from the database, and it's not paginated.
   */
  const upcoming = await getUpcomingEvents();
  const previous = await getPreviousEvents();

  return json({ upcoming, previous });
};

function getBorderColor(type: string) {
  let borderColor;

  if (type === "challenge") {
    borderColor = "!border-l-amber-400";
  }

  if (type === "workshop") {
    borderColor = "!border-l-brand-400";
  }

  if (type === "challenge-resolution") {
    borderColor = "!border-l-green-500";
  }

  return `border-l-2 ${borderColor}`;
}

export default function Calendar() {
  const events = useLoaderData<typeof loader>();

  const [selectedFilter, setSelectedFilter] = useState<"upcoming" | "previous">(
    "upcoming",
  );

  const [selectedType, setSelectedType] = useState<
    "challenge" | "workshop" | "challenge-resolution" | ""
  >("");

  function isDifferentDateFromPrevious(events: CalendarEvent[], index: number) {
    if (index === 0) return true;
    return (
      format(parseISO(events[index].datetime), "d-MM") !==
      format(parseISO(events[index - 1].datetime), "d-MM")
    );
  }

  function isDifferentYearFromCurrent(date: string) {
    return format(parseISO(date), "yyyy") !== format(new Date(), "yyyy");
  }

  function isCurrentDate(date: string) {
    return format(parseISO(date), "d-MM") === format(new Date(), "d-MM");
  }

  const filteredEvents = events[selectedFilter].filter(
    (event) => selectedType === "" || event.type === selectedType,
  );

  return (
    <main className="container mx-auto">
      <BlurReveal>
        <h1 className="text-5xl font-lexend mb-6">Agenda</h1>
      </BlurReveal>
      <div className="flex gap-4 mb-6 justify-between flex-wrap">
        <ToggleGroup
          type="single"
          defaultValue=""
          value={selectedType}
          onValueChange={(value) =>
            setSelectedType(
              value as "challenge" | "workshop" | "challenge-resolution",
            )
          }
        >
          <ToggleGroupItem value="challenge" aria-label="Toggle challenge">
            <MonitorPlay className="size-4 text-amber-400" />
            Mini Projetos
          </ToggleGroupItem>
          <ToggleGroupItem value="workshop" aria-label="Toggle workshop">
            <RiLiveLine className="size-4 text-brand-400" />
            Workshops
          </ToggleGroupItem>
          <ToggleGroupItem
            value="challenge-resolution"
            aria-label="Toggle challenge resolution"
          >
            <PencilRuler className="size-4 text-green-500" />
            Resoluções de Mini Projetos
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          type="single"
          defaultValue="upcoming"
          className="gap-2"
          value={selectedFilter}
          onValueChange={(value) =>
            setSelectedFilter(value as "upcoming" | "previous")
          }
        >
          <ToggleGroupItem value="previous" aria-label="Toggle previous">
            Eventos passados
          </ToggleGroupItem>
          <ToggleGroupItem value="upcoming" aria-label="Toggle upcoming">
            Próximos eventos
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-6">
        {filteredEvents.map((event, index) => (
          <div className="relative flex gap-2" key={event.id}>
            <Card
              className={cn(
                "md:absolute w-20 top-0 h-20 aspect-square -left-24 opacity-0",
                isDifferentDateFromPrevious(filteredEvents, index) &&
                  "opacity-100",
                isCurrentDate(event.datetime) &&
                  "!bg-background-200 dark:!bg-background-700 !dark:border-background-500 !border-background-400",
              )}
            >
              <CardContent className="bg-grainy w-full h-full flex flex-col items-center justify-center p-0">
                <h1 className="text-3xl font-bold">
                  {format(parseISO(event.datetime), "d")}
                </h1>
                <p className="text-xs dark:text-gray-400 text-gray-600">
                  {format(parseISO(event.datetime), "MMMM", {
                    locale: ptBR,
                  })}
                </p>
                {isDifferentYearFromCurrent(event.datetime) && (
                  <p className="text-xs scale-75 dark:text-gray-500 text-gray-500">
                    {format(parseISO(event.datetime), "(yyyy)", {
                      locale: ptBR,
                    })}
                  </p>
                )}
                {isCurrentDate(event.datetime) && (
                  <p className="text-xs scale-75 dark:text-gray-500 text-gray-500">
                    Hoje
                  </p>
                )}
              </CardContent>
            </Card>

            <Link className="w-full" to={event.url}>
              <Card
                key={event.id}
                className={cn(
                  "overflow-hidden w-full",
                  getBorderColor(event.type),
                )}
              >
                <CardContent className="p-4 flex items-start space-x-4 bg-grainy">
                  <div className="flex items-center gap-2 dark:bg-background-700 rounded-md bg-background-200 size-20 overflow-hidden">
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="object-cover h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <Icon type={event.type} />
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                    <div className="mb-1 text-sm dark:text-gray-400 text-gray-600">
                      {event.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

function Icon({ type }: { type: string }) {
  if (type === "challenge") {
    return <PencilRuler className="size-8 text-amber-400" />;
  }

  if (type === "workshop") {
    return <RiLiveLine className="size-8 text-brand-400" />;
  }

  if (type === "resolution") {
    return <MonitorPlay className="size-8 text-green-500" />;
  }

  return null;
}
