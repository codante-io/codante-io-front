import { Title } from "~/routes/_layout-raw/_player/components/sidebar/types";

interface ConfigItem {
  name: string;
  slug: string;
}

interface Trackable {
  slug: string;
}

interface Track extends ConfigItem {
  trackables: Trackable[];
}

interface Config {
  workshop?: ConfigItem;
  challenge?: ConfigItem;
  track?: Track;
}

export default function makeTitles(config: Config): Title[] {
  // se config.workshop existir, mas config.track não existir, retorna o array com workshop.
  if (config.workshop && !config.track) {
    return [
      {
        type: "home",
        subTitle: "Todos",
        url: "/workshops",
        title: "Workshops",
      },
      {
        type: "workshop",
        title: config.workshop.name as string,
        subTitle: "Workshop",
        url: `/workshops/${config.workshop.slug}`,
      },
    ];
  }

  // se config.challenge existir, mas config.track não existir, retorna o array com challenge.

  if (config.challenge && !config.track) {
    return [
      {
        type: "home",
        subTitle: "Todos",
        url: "/mini-projetos",
        title: "Mini Projetos",
      },
      {
        type: "challenge",
        title: config.challenge.name,
        subTitle: "Mini-Projeto",
        url: `/mini-projetos/${config.challenge.slug}`,
      },
    ];
  }

  // se config.track existir, mas config.module não existir, retorna o array com track.
  if (config.track && config.workshop) {
    const moduleNumber =
      config.track.trackables.findIndex(
        (trackable) => trackable.slug === config.workshop?.slug,
      ) + 1;

    return [
      {
        type: "track",
        title: config.track.name,
        subTitle: "Trilha",
        url: `/trilhas/${config.track.slug}`,
      },
      {
        type: "workshop",
        title: config.workshop.name,
        subTitle: `${moduleNumber}. Módulo`,
        url: `/trilhas/${config.track.slug}/modulo-${moduleNumber}`,
      },
    ];
  }

  if (config.track && config.challenge) {
    const moduleNumber =
      config.track.trackables.findIndex(
        (trackable) => trackable.slug === config.challenge?.slug,
      ) + 1;

    return [
      {
        type: "track",
        title: config.track.name,
        subTitle: "Trilha",
        url: `/trilhas/${config.track.slug}`,
      },
      {
        type: "module",
        title: config.challenge.name,
        subTitle: `${moduleNumber}. Projeto`,
        url: `/trilhas/${config.track.slug}/modulo-${moduleNumber}`,
      },
    ];
  }

  return [];
}
