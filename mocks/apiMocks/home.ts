export const homeMock = {
  avatar_section: {
    user_count: 2000,
    avatars: [
      {
        avatar_url: "https://avatars.githubusercontent.com/u/82961472?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/31007200?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/127998890?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/94383038?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/20816564?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/78622036?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/38104901?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/93102647?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/117099025?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/49620303?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/78565756?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/16943171?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/77516067?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/124837417?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/59520975?v=4",
        badge: "pro",
      },
      {
        avatar_url: "https://avatars.githubusercontent.com/u/116373947?v=4",
        badge: "pro",
      },
    ],
  },
  live_streaming_workshop: null,
  featured_workshops: [
    {
      id: 57,
      name: "React Server Components",
      slug: "react-server-components",
      short_description:
        "Em 2023 vemos os React Server Components tomarem vida com o lan\u00e7amento do NextJS 13. Vamos ver essa e todas as outras formas modernas de renderizarmos nossas aplica\u00e7\u00f5es react",
      description:
        "Em 2023 vemos os React Server Components tomarem vida com o lan\u00e7amento do NextJS 13.\r\nEssa \u00e9 mais uma - nova - forma de renderizar aplica\u00e7\u00f5es React. Nesse Workshop vamos mergulhar nas principais formas de renderiza\u00e7\u00e3o de uma aplica\u00e7\u00e3o React:\r\n\r\n* CSR - Client Side Rendering\r\n* SSG - Static Site Generation\r\n* ISR - Incremental Static Regeneration\r\n* SSR - Server Side Rendering\r\n* RSC - React Server Components\r\n\r\nTamb\u00e9m vamos falar das principais m\u00e9tricas que s\u00e3o afetadas pelas diferentes estrat\u00e9gias de renderiza\u00e7\u00e3o:\r\n\r\n* Time to First Byte\r\n* First Contentful Paint\r\n* Largest Contentful Paint\r\n* Time to Interactive\r\n* Cumulative Layout Shift\r\n\r\nE \u00e9 claro, vamos demonstrar as vantagens, limita\u00e7\u00f5es e as raz\u00f5es pelas quais voc\u00ea deve j\u00e1 entender como \u00e9 que essa nova forma de escrever React funciona.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/workshops/cover-images/83452f5ba6aa0ccb4b7b09c952df7108.jpg",
      video_url: "https://player.vimeo.com/video/848115292",
      difficulty: 3,
      duration_in_minutes: null,
      status: "published",
      is_standalone: 1,
      lesson_sections: [
        { name: "Introdu\u00e7\u00e3o", lessons: [277, 278] },
        {
          name: "Formas de Renderizar React",
          lessons: [279, 280, 281, 282, 283, 284, 285, 286, 287, 288],
        },
        {
          name: "React Server Components",
          lessons: [289, 290, 291, 292, 293, 294],
        },
      ],
      lessons: [
        {
          id: 277,
          name: "Apresenta\u00e7\u00e3o - Server Components",
          description:
            "O instrutor Cestari se apresenta e apresenta o workshop",
          content: null,
          available_to: "all",
          user_can_view: true,
          video_url: "https://player.vimeo.com/video/848035207",
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701553551-e1766ff0967c52f745ad80377112a24e68389155a74375bde9fb1d36db1ca044-d_1920x1080?r=pad",
          duration_in_seconds: 383,
          slug: "apresentacao-server-components",
          section: "Introdu\u00e7\u00e3o",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:49.000000Z",
          user_completed: false,
        },
        {
          id: 278,
          name: "M\u00e9tricas de Performance na Web",
          description:
            "Vamos falar sobre as principais m\u00e9tricas de performance na web: TTFB, FCP, LCP, TTI, e CLS. O instrutor tamb\u00e9m mostra como podemos medi-las usando o Lighthouse do Google Chrome.",
          content: null,
          available_to: "all",
          user_can_view: true,
          video_url: "https://player.vimeo.com/video/848036140",
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701556171-95bb0c9ce10d9ebdaf24f08fa53452f1d658f35e7f2639866e2f9bcd405531d9-d_1920x1080?r=pad",
          duration_in_seconds: 693,
          slug: "metricas-de-performance-na-web",
          section: "Introdu\u00e7\u00e3o",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:49.000000Z",
          user_completed: false,
        },
        {
          id: 279,
          name: "Diferentes estrat\u00e9gias para renderizar React",
          description:
            "Aqui vamos ver em alto n\u00edvel quais s\u00e3o as diferentes estrat\u00e9gias de renderizar uma aplica\u00e7\u00e3o react",
          content: null,
          available_to: "all",
          user_can_view: true,
          video_url: "https://player.vimeo.com/video/848038077",
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701556482-48b0bf22eee7c6ebf0085d7007ba7e51719805a962d66fc67a66e02e31ed6ce8-d_1920x1080?r=pad",
          duration_in_seconds: 169,
          slug: "diferentes-estrategias-para-renderizar-react",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:50.000000Z",
          user_completed: false,
        },
        {
          id: 280,
          name: "Client Side Rendering - CSR",
          description:
            "Renderiza\u00e7\u00e3o no Cliente (CSR) \u00e9 a forma tradicional de renderizar uma aplica\u00e7\u00e3o React. Vamos ver os pontos positivos e negativos dessa estrat\u00e9gia.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701558691-0f202c633a527672633302582522d32a2f34a49008e9cf59db2c188f4ece7184-d_1920x1080?r=pad",
          duration_in_seconds: 553,
          slug: "client-side-rendering-csr",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:51.000000Z",
          user_completed: false,
        },
        {
          id: 281,
          name: "Client Side Rendering - Pr\u00e1tica",
          description:
            "Vamos criar uma aplica\u00e7\u00e3o React simples com Vite. Ser\u00e1 dado \u00eanfase \u00e0 fun\u00e7\u00e3o render() do ReactDOM no ponto de entrada da aplica\u00e7\u00e3o React.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701559593-5b2da60cff57e8b03b5ce9f58a97e7b1486f93d08aa3c8a363a9dca1095a1451-d_1920x1080?r=pad",
          duration_in_seconds: 300,
          slug: "client-side-rendering-pratica",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:52.000000Z",
          user_completed: false,
        },
        {
          id: 282,
          name: "Static Site Generation - SSG",
          description:
            'Essa estrat\u00e9gia \u00e9 comum na chamada "JAMStack\u201d que foi popularizada com ferramentas como Gatsby e NextJS. Vamos entender como ela funciona.',
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701561132-ad75593dd42b84fbf1b3609543ae81126e8b5ad64d588f466c2da63fb0ca04e9-d_1920x1080?r=pad",
          duration_in_seconds: 497,
          slug: "static-site-generation-ssg",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:52.000000Z",
          user_completed: false,
        },
        {
          id: 283,
          name: "SPA e MPA vs CSR e SSR",
          description:
            "Vamos fazer uma breve desambigua\u00e7\u00e3o entre single page application e multi page application bem como client side rendering e server side rendering",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701561647-ecd166bfe655254f12300906c3a95ee9dc2b16976d3c9c3eb6f85470e23105f6-d_1920x1080?r=pad",
          duration_in_seconds: 270,
          slug: "spa-e-mpa-vs-csr-e-ssr",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:53.000000Z",
          user_completed: false,
        },
        {
          id: 284,
          name: "Static Site Generation - Pr\u00e1tica",
          description:
            "Vamos criar uma p\u00e1gina de letras de m\u00fasicas usando SSG no NextJS 13.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701564734-fb60ae20be636b55b8ccf66f2497b4633dba360b387580ff1bc2309ef18dadcd-d_1920x1080?r=pad",
          duration_in_seconds: 926,
          slug: "static-site-generation-pratica",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:54.000000Z",
          user_completed: false,
        },
        {
          id: 285,
          name: "SSG com Incremental Static Regeneration",
          description:
            "A estrat\u00e9gia de ISR resolve alguns problemas importantes da estrat\u00e9gia de SSG (Static Site Generation).",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701565425-f1dd7aaeb550bf0c1785e024b67071eb9488406b865e43421219da952cea69fb-d_1920x1080?r=pad",
          duration_in_seconds: 230,
          slug: "ssg-com-incremental-static-regeneration",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:55.000000Z",
          user_completed: false,
        },
        {
          id: 286,
          name: "Server Side Rendering - SSR",
          description:
            "Vamos ver as vantagens e desvantagens nessa estrat\u00e9gia que tem se tornado mais popular nos \u00faltimos anos.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701567434-5e0e5ca5ad20bfd352fc72c0335037ac6a2339c5fc92e27511473bd69a9faf58-d_1920x1080?r=pad",
          duration_in_seconds: 663,
          slug: "server-side-rendering-ssr",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:55.000000Z",
          user_completed: false,
        },
        {
          id: 287,
          name: "Server Side Rendering - Pr\u00e1tica",
          description: "Exerc\u00edcio Pr\u00e1tico de SSR",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701568737-0ccd5382c2367d13ad81818a317c0b9712f519321318df279d06683d589fee78-d_1920x1080?r=pad",
          duration_in_seconds: 355,
          slug: "server-side-rendering-pratica",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:56.000000Z",
          user_completed: false,
        },
        {
          id: 288,
          name: "O que \u00e9 Hydration no React",
          description:
            "Vamos entender o que \u00e9 Hydration e qual a raz\u00e3o de sua necessidade. Vamos entender tamb\u00e9m o que \u00e9 o erro de Hydration Mismatch fazendo uma pequena p\u00e1gina.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701571146-060f37781b1b9b48f7814f68c1a325cc50289b1491a311f6ad397ee475d57f78-d_1920x1080?r=pad",
          duration_in_seconds: 764,
          slug: "o-que-e-hydration-no-react",
          section: "Formas de Renderizar React",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:57.000000Z",
          user_completed: false,
        },
        {
          id: 289,
          name: "React Server Components - Intro",
          description:
            "Uma introdu\u00e7\u00e3o sobre quais problemas os Server Components resolvem no React e onde podemos utiliz\u00e1-los",
          content: null,
          available_to: "all",
          user_can_view: true,
          video_url: "https://player.vimeo.com/video/848049209",
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701572164-ff9a8f026820d74fa2a5ff224785e4d337f79a7464912f4bf667708cf80219c5-d_1920x1080?r=pad",
          duration_in_seconds: 347,
          slug: "react-server-components-intro",
          section: "React Server Components",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:58.000000Z",
          user_completed: false,
        },
        {
          id: 290,
          name: "Exemplo de um Blog",
          description:
            "Vamos entender como o React iria renderizar um blog com Client Side Rendering e Server Side Rendering, para compararmos essas estrat\u00e9gias com o RSC.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701573038-9de8d31b1f15b371d0a0a18e7fb53a3fcc807eeaedb188c9c9a973886e0fe51f-d_1920x1080?r=pad",
          duration_in_seconds: 260,
          slug: "exemplo-de-um-blog",
          section: "React Server Components",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:59.000000Z",
          user_completed: false,
        },
        {
          id: 291,
          name: "Exemplo em Server Components",
          description:
            "Vamos ver agora o exemplo pr\u00e9vio, agora com Server Components.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701609683-61ff1a6f5f7e7ad737af1407a047404cbed0f4c162b02472a6844d191d4a83c6-d_1920x1080?r=pad",
          duration_in_seconds: 374,
          slug: "exemplo-em-server-components",
          section: "React Server Components",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:25:59.000000Z",
          user_completed: false,
        },
        {
          id: 292,
          name: "Limita\u00e7\u00f5es e Possibilidades dos RSC",
          description:
            "O Roberto Cestari lista o que podemos fazer e o que n\u00e3o podemos fazer com React Server Components",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701610056-93a9369159a253224e199bc3f150117ae2b58b73b6cc7a0389fa151dd8bb4b27-d_1920x1080?r=pad",
          duration_in_seconds: 155,
          slug: "limitacoes-e-possibilidades-dos-rsc",
          section: "React Server Components",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:26:00.000000Z",
          user_completed: false,
        },
        {
          id: 293,
          name: "Pr\u00e1tica - Implementando Server Components",
          description:
            "Vamos ver como podemos usar o poder do servidor para uma aplica\u00e7\u00e3o de Lista Telef\u00f4nica com busca e url compartilh\u00e1vel.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701613812-e7f6d94775a67503525925a5924b90f5e3607a9e60afc0ac41230b602dcc9a91-d_1920x1080?r=pad",
          duration_in_seconds: 1178,
          slug: "pratica-implementando-server-components",
          section: "React Server Components",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:26:01.000000Z",
          user_completed: false,
        },
        {
          id: 294,
          name: "Finaliza\u00e7\u00e3o - Server Components",
          description: "Finaliza\u00e7\u00e3o do workshop",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url:
            "https://i.vimeocdn.com/video/1701613434-4a6d1c3bf870073aadb62e52344dff2d9ba5b9b17193dd0cf9dbed837901054e-d_1920x1080?r=pad",
          duration_in_seconds: 16,
          slug: "finalizacao-server-components",
          section: "React Server Components",
          created_at: "2023-07-24T17:22:39.000000Z",
          updated_at: "2023-09-15T18:26:02.000000Z",
          user_completed: false,
        },
      ],
      instructor: {
        id: 2,
        name: "Roberto Cestari",
        company: "Codante.io",
        email: "robertotcestari@gmail.com",
        bio: "Fundador e Professor no Codante.io.\r\n\r\nFoi Tech Lead de front-end e professor especialista em React.\r\n\r\nFormado e Mestre pela USP e formado pela FGV - EAESP.  \r\n\r\nFundador e desenvolvedor da plataforma Trilhante, uma das maiores empresas de educa\u00e7\u00e3o jur\u00eddica do pa\u00eds.",
        avatar_url: "https://avatars.githubusercontent.com/u/14261421",
        slug: "roberto-cestari",
        links: [
          { url: "https://github.com/robertotcestari", type: "github" },
          { url: "https://twitter.com/robertotcestari", type: "twitter" },
          {
            url: "https://www.linkedin.com/in/robertotcestari/",
            type: "linkedin",
          },
          { url: "https://cestari.codes", type: "website" },
        ],
        created_at: "2023-05-03T12:07:20.000000Z",
        updated_at: "2023-05-17T18:09:29.000000Z",
      },
      tags: [
        {
          id: 153,
          name: "React",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:25.000000Z",
          updated_at: "2023-05-06T18:01:25.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Workshop",
            taggable_id: 57,
            tag_id: 153,
          },
        },
      ],
      streaming_url: null,
      resources: [
        {
          url: "https://github.com/codante-io/workshop-rsc-pagina-de-musicas",
          name: "Exemplo - SSG",
          type: "github",
        },
        {
          url: "https://github.com/codante-io/workshop-rsc-lista-telefonica",
          name: "Exemplo - Server Components",
          type: "github",
        },
      ],
      created_at: "2023-07-13T22:40:18.000000Z",
      updated_at: "2023-10-20T15:55:36.000000Z",
      published_at: "2023-07-14T13:00:00.000000Z",
    },
    {
      id: 61,
      name: "Introdu\u00e7\u00e3o ao GraphQL",
      slug: "introducao-ao-graphql",
      short_description:
        "Aprenda GraphQL para resolver problemas de integra\u00e7\u00e3o entre servi\u00e7os Back-end e Front-end em navegadores web e dispositivos m\u00f3veis.",
      description:
        "GraphQL \u00e9 uma tecnologia desenvolvida no Facebook para resolver problemas de integra\u00e7\u00e3o entre servi\u00e7os back-end e front-end. O seu prop\u00f3sito \u00e9 ser um intermedi\u00e1rio entre fontes de dados e clientes, podendo ser dispositivos m\u00f3veis ou navegadores web.\r\n\r\n## T\u00f3picos que ser\u00e3o abordados\r\n\r\nAlguns t\u00f3picos que ser\u00e3o abordados nesse Workshop:\r\n\r\n- GraphQL Client-Side;\r\n- Fundamentos do GraphQL\r\n\t- Query;\r\n\t- Mutation\r\n\t- Subscription\r\n- Apollo React\r\n- Cache\r\n- Optimistic UI\r\n- Diretivas e Fragmentos\r\n\r\n## Pr\u00e9-requisitos\r\n\r\nPara aproveitar ao m\u00e1ximo esse Workshop \u00e9 recomendado que voc\u00ea tenha conhecimento b\u00e1sico em **JavaScript** e **React**.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/workshops/cover-images/0dccb3ef54c4f4b856c61e7a9c113057.jpg",
      video_url: null,
      difficulty: 2,
      duration_in_minutes: null,
      status: "published",
      is_standalone: 1,
      lesson_sections: [
        { name: "Introdu\u00e7\u00e3o", lessons: [377, 378, 379] },
        {
          name: "GraphQL na Pr\u00e1tica",
          lessons: [380, 381, 382, 383, 384, 385, 386, 387, 388],
        },
        {
          name: "GraphQL com Apollo",
          lessons: [389, 390, 391, 392, 393, 394, 395, 396, 397],
        },
      ],
      lessons: [
        {
          id: 377,
          name: "Apresenta\u00e7\u00e3o do Instrutor",
          description:
            "O Lucas Viana se apresenta e apresenta a estrutura do Workshop",
          content: null,
          available_to: "all",
          user_can_view: true,
          video_url: "https://player.vimeo.com/video/890234890",
          thumbnail_url: null,
          duration_in_seconds: 201,
          slug: "apresentacao-do-instrutor-1",
          section: "Introdu\u00e7\u00e3o",
          created_at: "2023-12-01T11:15:57.000000Z",
          updated_at: "2023-12-01T11:15:57.000000Z",
          user_completed: false,
        },
        {
          id: 378,
          name: "Contexto do GraphQL",
          description:
            "Vamos voltar \u00e0 hist\u00f3ria e entender o contexto no qual o GraphQL surgiu e quais problemas resolvia",
          content: null,
          available_to: "all",
          user_can_view: true,
          video_url: "https://player.vimeo.com/video/890235374",
          thumbnail_url: null,
          duration_in_seconds: 369,
          slug: "contexto-do-graphql",
          section: "Introdu\u00e7\u00e3o",
          created_at: "2023-12-01T11:14:48.000000Z",
          updated_at: "2023-12-01T11:14:48.000000Z",
          user_completed: false,
        },
        {
          id: 379,
          name: "O que \u00e9 GraphQL e sua Aplica\u00e7\u00e3o",
          description:
            "O Lucas traz uma defini\u00e7\u00e3o para o que \u00e9 GraphQL, al\u00e9m de falar o que GraphQL n\u00e3o \u00e9.",
          content: null,
          available_to: "all",
          user_can_view: true,
          video_url: "https://player.vimeo.com/video/890236295",
          thumbnail_url: null,
          duration_in_seconds: 526,
          slug: "o-que-e-graphql-e-sua-aplicacao",
          section: "Introdu\u00e7\u00e3o",
          created_at: "2023-12-01T11:14:48.000000Z",
          updated_at: "2023-12-01T11:14:48.000000Z",
          user_completed: false,
        },
        {
          id: 380,
          name: "Nossa primeira Query com GraphQL",
          description:
            "Vamos utilizar a API do Rick & Morty para treinarmos os primeiros passos com o GraphQL",
          content: null,
          available_to: "all",
          user_can_view: true,
          video_url: "https://player.vimeo.com/video/890237533",
          thumbnail_url: null,
          duration_in_seconds: 300,
          slug: "nossa-primeira-query-com-graphql",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:48.000000Z",
          updated_at: "2023-12-01T11:14:48.000000Z",
          user_completed: false,
        },
        {
          id: 381,
          name: "Principais bibliotecas de GraphQL",
          description:
            "As 3 principais bibliotecas que utilizam GraphQL s\u00e3o apresentadas nessa aula. O Lucas tamb\u00e9m traz o exemplo da nova API do Github que utiliza GraphQL.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 235,
          slug: "principais-bibliotecas-de-graphql",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:48.000000Z",
          updated_at: "2023-12-01T11:14:48.000000Z",
          user_completed: false,
        },
        {
          id: 382,
          name: "Possibilidade de usos",
          description:
            "Vamos ver as diferentes formas de utiliza\u00e7\u00e3o do GraphQL e a possibilidade de operar conjuntamente com APIs Rest.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 62,
          slug: "possibilidade-de-usos",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 383,
          name: "Dica: Nomeando Opera\u00e7\u00f5es",
          description:
            "Porque \u00e9 importante que as opera\u00e7\u00f5es sejam nomeadas no GraphQL",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 56,
          slug: "dica:-nomeando-operacoes",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 384,
          name: "Entendendo um Schema",
          description:
            "Vamos subir uma API pr\u00f3pria de livros e autores para treinarmos outras opera\u00e7\u00f5es bem como entender como s\u00e3o definidos Schemas. O instrutor tamb\u00e9m tira algumas d\u00favidas que surgiram.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 454,
          slug: "entendendo-um-schema",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 385,
          name: "Criando uma mutation",
          description:
            "Agora iremos ver como funciona uma mutation usando a API de livros que foi apresentada anteriormente.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 182,
          slug: "criando-uma-mutation",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 386,
          name: "Vari\u00e1veis e Fragments no GraphQL",
          description:
            "Vamos otimizar nossas opera\u00e7\u00f5es utilizando vari\u00e1veis e fragments no GraphQL.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 501,
          slug: "variaveis-e-fragments-no-graphql",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 387,
          name: "GraphQL \u00e9 uma chamada HTTP",
          description:
            "Vamos ver o que acontece em uma requisi\u00e7\u00e3o do GraphQL. No fim do dia, \u00e9 apenas uma chamada HTTP. O instrutor aproveita tamb\u00e9m para tirar uma d\u00favida.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 209,
          slug: "graphql-e-uma-chamada-http",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 388,
          name: "Resolvers",
          description:
            "A interliga\u00e7\u00e3o entre as opera\u00e7\u00f5es  e a base de dados \u00e9 feita pelos resolvers. Vamos ver como eles s\u00e3o estruturados no lado do servidor.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 478,
          slug: "resolvers",
          section: "GraphQL na Pr\u00e1tica",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 389,
          name: "Come\u00e7ando com o Apollo Client",
          description:
            "Vamos consumir nossa API GraphQL com um frontend em React",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 1198,
          slug: "comecando-com-o-apollo-client",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 390,
          name: "Queries no React",
          description:
            "Vamos executar a primeira query dentro de um componente React.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 827,
          slug: "queries-no-react",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 391,
          name: "Query com o useLazyQuery",
          description:
            "O useQuery \u00e9 executado quando o componente \u00e9 renderizado e n\u00e3o \u00e9 adequado para ser usado em eventos (como clique de bot\u00e3o, por exemplo). Para isso, vamos ver o useLazyQuery.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 156,
          slug: "query-com-o-uselazyquery",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 392,
          name: "Uma Mutation em um formul\u00e1rio no React",
          description:
            "Vamos criar a primeira mutation para cadastrar autores na nossa aplica\u00e7\u00e3o",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 628,
          slug: "uma-mutation-em-um-formulario-no-react",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 393,
          name: "Atualizando o cache no Apollo",
          description:
            "Em algumas situa\u00e7\u00f5es o cache do Apollo \u00e9 atualizado de forma autom\u00e1tica. Em outras, precisamos fazer de forma manual. Nesta aula \u00e9 proposto um exerc\u00edcio para resolver o problema de cache do createAuthor",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 512,
          slug: "atualizando-o-cache-no-apollo",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 394,
          name: "Resolvendo o problema de atualiza\u00e7\u00e3o do cache",
          description:
            "Vamos ver a resolu\u00e7\u00e3o do exerc\u00edcio para atualiza\u00e7\u00e3o do cache.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 148,
          slug: "resolvendo-o-problema-de-atualizacao-do-cache",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 395,
          name: "Optimistic UI com Apollo",
          description:
            "Para deixar uma experi\u00eancia mais fluida, vamos utilizar essa estrat\u00e9gia de `UI otimista` que \u00e9 facilmente implement\u00e1vel com o Apollo.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 655,
          slug: "optimistic-ui-com-apollo",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 396,
          name: "Schema no cliente",
          description:
            "Guardando informa\u00e7\u00f5es no cliente pode ser uma estrat\u00e9gia importante e \u00e9 poss\u00edvel com o Apollo.",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 484,
          slug: "schema-no-cliente",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
        {
          id: 397,
          name: "Criando um cadastro para Livros",
          description:
            "Vamos finalizar nossa aplica\u00e7\u00e3o criando agora um formul\u00e1rio de cadastro de Livros que vai utilizar a lista de autores em um select",
          content: null,
          available_to: "pro",
          user_can_view: false,
          video_url: null,
          thumbnail_url: null,
          duration_in_seconds: 0,
          slug: "criando-um-cadastro-para-livros",
          section: "GraphQL com Apollo",
          created_at: "2023-12-01T11:14:49.000000Z",
          updated_at: "2023-12-01T11:14:49.000000Z",
          user_completed: false,
        },
      ],
      instructor: {
        id: 58,
        name: "Lucas Viana",
        company: "Arcotech",
        email: "contato@lucasviana.dev",
        bio: "-",
        avatar_url:
          "https://media.licdn.com/dms/image/D4D03AQE6zqTtY6Hs_A/profile-displayphoto-shrink_800_800/0/1695493176845?e=1703116800&v=beta&t=AbeXsE7HJwTUEDf77rE_jCNfaP1EgTbn0frj9HkPQWQ",
        slug: "lucas-viana",
        links: [
          { url: "https://github.com/mechamobau", type: "github" },
          { url: "https://twitter.com/mechamobau", type: "twitter" },
          {
            url: "https://www.linkedin.com/in/mechamobau/",
            type: "linkedin",
          },
          { url: "https://lucasviana.dev", type: "website" },
        ],
        created_at: "2023-10-17T13:56:37.000000Z",
        updated_at: "2023-10-17T13:58:47.000000Z",
      },
      tags: [
        {
          id: 158,
          name: "GraphQL",
          color: "#5282FF",
          created_at: "2023-08-07T13:15:58.000000Z",
          updated_at: "2023-08-07T13:15:58.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Workshop",
            taggable_id: 61,
            tag_id: 158,
          },
        },
      ],
      streaming_url: "https://youtube.com/embed/uvQXIj1Q4e4",
      resources: null,
      created_at: "2023-10-17T13:57:12.000000Z",
      updated_at: "2023-12-01T11:17:00.000000Z",
      published_at: "2023-11-17T17:00:00.000000Z",
    },
  ],
  featured_challenges: [
    {
      id: 33,
      name: "Gerenciador de h\u00e1bitos com Next.js",
      slug: "gerenciador-de-habitos-com-nextjs",
      short_description:
        "Aprenda a vers\u00e3o 13+ do Next criando esse app super \u00fatil! Utilize Server Components e Server Actions para aprender mais sobre essas tecnologias.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/img/challenge-icons/habits.png",
      status: "published",
      difficulty: 3,
      has_solution: true,
      tags: [
        {
          id: 152,
          name: "NextJS",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:22.000000Z",
          updated_at: "2023-05-06T18:01:22.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 33,
            tag_id: 152,
          },
        },
        {
          id: 153,
          name: "React",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:25.000000Z",
          updated_at: "2023-05-06T18:01:25.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 33,
            tag_id: 153,
          },
        },
      ],
      avatars: [
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/124027908?v=4",
          name: "GabrielNeves",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/146659695?v=4",
          name: "Efrain de freitas",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/85948415?v=4",
          name: "Igor Montezuma ",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/69250823?v=4",
          name: "MicaelTargino",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/25716217?v=4",
          name: "Alexandre Morais",
          badge: "pro",
        },
      ],
      enrolled_users_count: 87,
      current_user_is_enrolled: false,
      weekly_featured_start_date: null,
      solution_publish_date: null,
      is_weekly_featured: false,
    },
    {
      id: 32,
      name: "Drag and Drop com React e Framer Motion",
      slug: "drag-and-drop-com-react-e-framer-motion",
      short_description:
        "Utilize o Framer Motion e construa uma playlist em que voc\u00ea poder\u00e1 mudar a ordem das m\u00fasicas utilizando drag and drop!",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/cover-images/06c067ad0396ba71209e6c3fe7f1c407.png",
      status: "published",
      difficulty: 2,
      has_solution: false,
      tags: [
        {
          id: 153,
          name: "React",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:25.000000Z",
          updated_at: "2023-05-06T18:01:25.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 32,
            tag_id: 153,
          },
        },
        {
          id: 154,
          name: "Framer Motion",
          color: "#5282FF",
          created_at: "2023-05-08T06:45:16.000000Z",
          updated_at: "2023-05-08T06:45:16.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 32,
            tag_id: 154,
          },
        },
      ],
      avatars: [
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/96087111?v=4",
          name: "MaateusMDS",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/94622701?v=4",
          name: "Vin\u00edcius Teixeira",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/115299313?v=4",
          name: "pxulin",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/130366472?v=4",
          name: "caiovictor021",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/55001968?v=4",
          name: "THIAGO CREDICO",
          badge: "pro",
        },
      ],
      enrolled_users_count: 6,
      current_user_is_enrolled: false,
      weekly_featured_start_date: null,
      solution_publish_date: null,
      is_weekly_featured: false,
    },
    {
      id: 30,
      name: "Blog pessoal com Next.js e MDX",
      slug: "blog-pessoal-com-nextjs-e-mdx",
      short_description:
        "Crie o seu blog pessoal utilizando Next.JS. Aproveite para entender o funcionamento de arquivos MDX na cria\u00e7\u00e3o das suas postagens.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/cover-images/8ec1580c167b3f831efec951f44ab9d5.png",
      status: "published",
      difficulty: 2,
      has_solution: true,
      tags: [
        {
          id: 152,
          name: "NextJS",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:22.000000Z",
          updated_at: "2023-05-06T18:01:22.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 30,
            tag_id: 152,
          },
        },
      ],
      avatars: [
        {
          avatar_url: "https://avatars.githubusercontent.com/u/2374998?v=4",
          name: "Renato Davis",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/78622334?v=4",
          name: "Felipe Muller",
          badge: "admin",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/55001968?v=4",
          name: "THIAGO CREDICO",
          badge: "pro",
        },
        {
          avatar_url: "https://avatars.githubusercontent.com/u/4016200?v=4",
          name: "nelohenriq",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/120220035?v=4",
          name: "Nathan Mota",
          badge: "pro",
        },
      ],
      enrolled_users_count: 11,
      current_user_is_enrolled: false,
      weekly_featured_start_date: null,
      solution_publish_date: null,
      is_weekly_featured: false,
    },
    {
      id: 29,
      name: "Lista de pa\u00edses com NextJS",
      slug: "lista-de-paises-next",
      short_description:
        "Aprenda Next 13 implementando uma lista de pa\u00edses usando NextJS.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/img/challenge-icons/countries.png",
      status: "published",
      difficulty: 2,
      has_solution: true,
      tags: [
        {
          id: 152,
          name: "NextJS",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:22.000000Z",
          updated_at: "2023-05-06T18:01:22.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 29,
            tag_id: 152,
          },
        },
        {
          id: 153,
          name: "React",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:25.000000Z",
          updated_at: "2023-05-06T18:01:25.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 29,
            tag_id: 153,
          },
        },
      ],
      avatars: [
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/72472248?v=4",
          name: "Douglas Ferreira",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/91747323?v=4",
          name: "Daniel Nogueira",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/121769123?v=4",
          name: "Caique Prado",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/62753843?v=4",
          name: "Guilherme Gualberto Souza",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/36008926?v=4",
          name: "Paulo Robson",
          badge: "pro",
        },
      ],
      enrolled_users_count: 82,
      current_user_is_enrolled: false,
      weekly_featured_start_date: null,
      solution_publish_date: null,
      is_weekly_featured: false,
    },
    {
      id: 28,
      name: "Toast notification animado",
      slug: "mp-toast-notification-tailwind",
      short_description:
        "Prepare-se para adicionar um toque especial \u00e0s suas notifica\u00e7\u00f5es! Neste mini projeto, voc\u00ea ir\u00e1 criar um Toast Notification animado usando Tailwind CSS.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/img/challenge-icons/toast.png",
      status: "published",
      difficulty: 1,
      has_solution: true,
      tags: [
        {
          id: 149,
          name: "Javascript",
          color: "#5282FF",
          created_at: "2023-05-05T15:17:02.000000Z",
          updated_at: "2023-05-05T15:17:02.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 28,
            tag_id: 149,
          },
        },
        {
          id: 150,
          name: "CSS",
          color: "#5282FF",
          created_at: "2023-05-05T15:17:07.000000Z",
          updated_at: "2023-05-05T15:17:07.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 28,
            tag_id: 150,
          },
        },
        {
          id: 151,
          name: "Tailwind",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:11.000000Z",
          updated_at: "2023-05-06T18:01:11.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 28,
            tag_id: 151,
          },
        },
      ],
      avatars: [
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/94622701?v=4",
          name: "Vin\u00edcius Teixeira",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/84564275?v=4",
          name: "Robledo Junior",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/113312585?v=4",
          name: "Pablo Landim de S\u00e1 ",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/89220518?v=4",
          name: "Leonardo",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/97991895?v=4",
          name: "JOAO ALBERTO NO DA SILVA",
          badge: "pro",
        },
      ],
      enrolled_users_count: 20,
      current_user_is_enrolled: false,
      weekly_featured_start_date: null,
      solution_publish_date: null,
      is_weekly_featured: false,
    },
    {
      id: 27,
      name: "Toggle de dark mode animado",
      slug: "mp-toggle-dark-mode",
      short_description:
        "Crie um toggle de dark mode com anima\u00e7\u00e3o suave usando o framework de CSS Tailwind.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/img/challenge-icons/dark-mode.png",
      status: "published",
      difficulty: 1,
      has_solution: true,
      tags: [
        {
          id: 149,
          name: "Javascript",
          color: "#5282FF",
          created_at: "2023-05-05T15:17:02.000000Z",
          updated_at: "2023-05-05T15:17:02.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 27,
            tag_id: 149,
          },
        },
        {
          id: 150,
          name: "CSS",
          color: "#5282FF",
          created_at: "2023-05-05T15:17:07.000000Z",
          updated_at: "2023-05-05T15:17:07.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 27,
            tag_id: 150,
          },
        },
        {
          id: 151,
          name: "Tailwind",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:11.000000Z",
          updated_at: "2023-05-06T18:01:11.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 27,
            tag_id: 151,
          },
        },
      ],
      avatars: [
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/11057411?v=4",
          name: "Dilenio Enderle",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/72669481?v=4",
          name: "Raphael Baere de S\u00e1 Oliveira",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/83774878?v=4",
          name: "Erickson Siqueira da Silva",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/122630565?v=4",
          name: "Ronaldo Cerenza",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/114376105?v=4",
          name: "Vitor Dalvi",
          badge: "pro",
        },
      ],
      enrolled_users_count: 41,
      current_user_is_enrolled: false,
      weekly_featured_start_date: null,
      solution_publish_date: null,
      is_weekly_featured: false,
    },
    {
      id: 26,
      name: "Tela de login mais bonita do mundo",
      slug: "mp-tela-login-tailwind",
      short_description:
        "Crie uma tela de login incrivelmente bonita e responsiva usando o framework Tailwind CSS.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/img/challenge-icons/login.png",
      status: "published",
      difficulty: 1,
      has_solution: true,
      tags: [
        {
          id: 150,
          name: "CSS",
          color: "#5282FF",
          created_at: "2023-05-05T15:17:07.000000Z",
          updated_at: "2023-05-05T15:17:07.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 26,
            tag_id: 150,
          },
        },
        {
          id: 151,
          name: "Tailwind",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:11.000000Z",
          updated_at: "2023-05-06T18:01:11.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 26,
            tag_id: 151,
          },
        },
      ],
      avatars: [
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/11843888?v=4",
          name: "Fernando D'luccas",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/70420128?v=4",
          name: "Italo G\u00f3es",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/78622334?v=4",
          name: "Felipe Muller",
          badge: "admin",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/48574942?v=4",
          name: "Lennon Xavier",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/89647303?v=4",
          name: "Nath\u00e1lia Alves",
          badge: "pro",
        },
      ],
      enrolled_users_count: 189,
      current_user_is_enrolled: false,
      weekly_featured_start_date: null,
      solution_publish_date: null,
      is_weekly_featured: false,
    },
    {
      id: 34,
      name: "Lista de avatares com TailwindCSS",
      slug: "lista-avatares-tailwindcss",
      short_description:
        "Pratique Tailwind construindo uma lista de avatares simples e bonita.",
      image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/img/challenge-icons/avatars.png",
      status: "published",
      difficulty: 1,
      has_solution: false,
      tags: [
        {
          id: 151,
          name: "Tailwind",
          color: "#5282FF",
          created_at: "2023-05-06T18:01:11.000000Z",
          updated_at: "2023-05-06T18:01:11.000000Z",
          deleted_at: null,
          pivot: {
            taggable_type: "App\\Models\\Challenge",
            taggable_id: 34,
            tag_id: 151,
          },
        },
      ],
      avatars: [
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/55001968?v=4",
          name: "THIAGO CREDICO",
          badge: "pro",
        },
        {
          avatar_url:
            "https://avatars.githubusercontent.com/u/94622701?v=4",
          name: "Vin\u00edcius Teixeira",
          badge: "pro",
        },
        {
          avatar_url: "https://avatars.githubusercontent.com/u/6475893?v=4",
          name: "\u00cdcaro Harry",
          badge: "admin",
        },
      ],
      enrolled_users_count: 3,
      current_user_is_enrolled: false,
      weekly_featured_start_date: null,
      solution_publish_date: null,
      is_weekly_featured: false,
    },
  ],
  featured_testimonials: [
    {
      name: "Thiago Credico",
      body: "Conheci o Codante enquanto procurava aprimorar minhas habilidades como Dev. Me identifiquei demais com o projeto Open Source, com a metodologia de ensino e com a did\u00e1tica que \u00e9 bastante moderna, m\u00e3o-na-massa e direta ao ponto! Confio plenamente no Codante e estou muito feliz em fazer parte disso! \u2764\ufe0f",
      avatar_url:
        "https://s3-sa-east-1.amazonaws.com/codante/testimonials/avatars/866058fe9e4b237b6c4d74908511dea7.webp",
      social_media_link: "https://www.linkedin.com/in/thiago-credico/",
      social_media_nickname: "@thigocredico",
      featured: "landing",
    },
    {
      name: "Bruno Alves",
      body: "Eu fui um dos primeiros assinantes do Codante. A qualidade dos instrutores e a possibilidade de ter uma assinatura vital\u00edcia fez com que eu n\u00e3o tivesse d\u00favidas!",
      avatar_url: "https://avatars.githubusercontent.com/u/18636020?v=4",
      social_media_link: "https://www.linkedin.com/in/alvesbrunolog/",
      social_media_nickname: "@alvesbrunolog",
      featured: "landing",
    },
    {
      name: "Keyla Costa Dalseco",
      body: "O Codante me ajudou a aprimorar meus conhecimentos t\u00e9cnicos em frontend, al\u00e9m de que pude aprender muitas tecnologias e frameworks que podem ser utilizados no dia a dia. A plataforma possui muitas ideias de projetos e oficinas para moldar esse conhecimento.",
      avatar_url: "https://avatars.githubusercontent.com/u/112834431?v=4",
      social_media_link: "http://www.linkedin.com/in/keyla-costa-dalseco",
      social_media_nickname: "@keyladalseco",
      featured: "landing",
    },
    {
      name: "Mariana Saraiva",
      body: "Dois professores sensacionais que me mostraram o caminho do frontend! Sucesso para voc\u00eas! Estou acompanhando este projeto de perto!",
      avatar_url:
        "https://media.licdn.com/dms/image/D4D03AQGCUqSHfzpU6Q/profile-displayphoto-shrink_800_800/0/1677941992441?e=1706140800&v=beta&t=RfiPs6y5ugzvPjLChM3A93IXDFM0LJZaC_d86de4g0A",
      social_media_link: "https://www.linkedin.com/in/marianascmoura/",
      social_media_nickname: "@marianascmoura",
      featured: "landing",
    },
    {
      name: "Bruno Hauck",
      body: "Eu era Tech Manager focado em gest\u00e3o de projetos agora estou procurando novamente uma vaga para dev ent\u00e3o vou fazer workshops e bootcamps gratuitos para aprimorar e voltar para o mercado DEV.",
      avatar_url: "https://avatars.githubusercontent.com/u/7753598?v=4",
      social_media_link: "https://www.youtube.com/@mentornerd",
      social_media_nickname: "@mentornerd",
      featured: "landing",
    },
  ],
  featured_submissions: [
    {
      id: 528,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-tela-login-tailwind/113312585.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/113312585?v=4",
        name: "Pablo Landim de S\u00e1 ",
        badge: null,
      },
      challenge: {
        name: "Tela de login mais bonita do mundo",
        slug: "mp-tela-login-tailwind",
      },
      user_github_user: "PabloLSa",
    },
    {
      id: 1251,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-tela-login-tailwind/112664623.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/112664623?v=4",
        name: "Jo\u00e3o Pedro Santana",
        badge: null,
      },
      challenge: {
        name: "Tela de login mais bonita do mundo",
        slug: "mp-tela-login-tailwind",
      },
      user_github_user: "santanajoao",
    },
    {
      id: 546,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-tela-login-tailwind/42043818.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/42043818?v=4",
        name: "MattTrovao",
        badge: null,
      },
      challenge: {
        name: "Tela de login mais bonita do mundo",
        slug: "mp-tela-login-tailwind",
      },
      user_github_user: "MattTrovao",
    },
    {
      id: 732,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/115600640.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/115600640?v=4",
        name: "Marcus Evandro Galv\u00e3o Boni",
        badge: null,
      },
      challenge: {
        name: "Lista de pa\u00edses com NextJS",
        slug: "lista-de-paises-next",
      },
      user_github_user: "Marcus-Boni",
    },
    {
      id: 927,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/rinha-frontend/42651514.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/42651514?v=4",
        name: "N\u00edcolas Gabriel",
        badge: null,
      },
      challenge: {
        name: "Rinha de Frontend - 2023",
        slug: "rinha-frontend",
      },
      user_github_user: "Nick-Gabe",
    },
    {
      id: 1268,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/clone-orkut/111543335.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/111543335?v=4",
        name: "Thiago Magno",
        badge: null,
      },
      challenge: { name: "Clone do Orkut", slug: "clone-orkut" },
      user_github_user: "thgmagno",
    },
    {
      id: 1282,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/reconhecimento-facial-com-react-e-tensorflow/92534179-6bVYmEFwEP.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/92534179?v=4",
        name: "Jonathan K.",
        badge: null,
      },
      challenge: {
        name: "Reconhecimento facial com React e TensorFlow",
        slug: "reconhecimento-facial-com-react-e-tensorflow",
      },
      user_github_user: "jonathankarlinski",
    },
    {
      id: 1095,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/landing-page-meow-cafe/106566106.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/106566106?v=4",
        name: "Matheus Oliveira Monteiro",
        badge: null,
      },
      challenge: {
        name: "Landing Page do Meow Caf\u00e9",
        slug: "landing-page-meow-cafe",
      },
      user_github_user: "1Maatheus",
    },
    {
      id: 1098,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-tela-login-tailwind/121460275.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/121460275?v=4",
        name: "Matheus Ramos",
        badge: null,
      },
      challenge: {
        name: "Tela de login mais bonita do mundo",
        slug: "mp-tela-login-tailwind",
      },
      user_github_user: "ramosmat",
    },
    {
      id: 534,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-toggle-dark-mode/88989762.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/88989762?v=4",
        name: "Pedro  Lima",
        badge: null,
      },
      challenge: {
        name: "Toggle de dark mode animado",
        slug: "mp-toggle-dark-mode",
      },
      user_github_user: "PedroPDIN",
    },
    {
      id: 705,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/pomodoro-timer-com-javascript/55001968.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/55001968?v=4",
        name: "THIAGO CREDICO",
        badge: null,
      },
      challenge: {
        name: "Pomodoro Timer com JavaScript",
        slug: "pomodoro-timer-com-javascript",
      },
      user_github_user: "thiagocredico",
    },
    {
      id: 718,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/blog-pessoal-com-nextjs-e-mdx/78622334.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/78622334?v=4",
        name: "Felipe Muller",
        badge: null,
      },
      challenge: {
        name: "Blog pessoal com Next.js e MDX",
        slug: "blog-pessoal-com-nextjs-e-mdx",
      },
      user_github_user: "felipemuller20",
    },
    {
      id: 684,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/input-de-cartao-de-credito/55001968.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/55001968?v=4",
        name: "THIAGO CREDICO",
        badge: null,
      },
      challenge: {
        name: "Input de cart\u00e3o de cr\u00e9dito",
        slug: "input-de-cartao-de-credito",
      },
      user_github_user: "thiagocredico",
    },
    {
      id: 447,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-tela-login-tailwind/83774878.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/83774878?v=4",
        name: "Erickson Siqueira da Silva",
        badge: null,
      },
      challenge: {
        name: "Tela de login mais bonita do mundo",
        slug: "mp-tela-login-tailwind",
      },
      user_github_user: "EricksonSiqueira",
    },
    {
      id: 1262,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-toast-notification-tailwind/111543335.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/111543335?v=4",
        name: "Thiago Magno",
        badge: null,
      },
      challenge: {
        name: "Toast notification animado",
        slug: "mp-toast-notification-tailwind",
      },
      user_github_user: "thgmagno",
    },
    {
      id: 578,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/gerenciador-de-habitos-com-nextjs/106566391.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/106566391?v=4",
        name: "ISRAEL VINICIUS PEREIRA",
        badge: null,
      },
      challenge: {
        name: "Gerenciador de h\u00e1bitos com Next.js",
        slug: "gerenciador-de-habitos-com-nextjs",
      },
      user_github_user: "IsraelViPe",
    },
    {
      id: 683,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-toggle-dark-mode/83774878.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/83774878?v=4",
        name: "Erickson Siqueira da Silva",
        badge: null,
      },
      challenge: {
        name: "Toggle de dark mode animado",
        slug: "mp-toggle-dark-mode",
      },
      user_github_user: "EricksonSiqueira",
    },
    {
      id: 1265,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/mp-toast-notification-tailwind/67079657.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/67079657?v=4",
        name: "Jhollyfer Rodrigues",
        badge: null,
      },
      challenge: {
        name: "Toast notification animado",
        slug: "mp-toast-notification-tailwind",
      },
      user_github_user: "indiodev",
    },
    {
      id: 1219,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/rinha-frontend/20709086.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/20709086?v=4",
        name: "Lais Frig\u00e9rio",
        badge: null,
      },
      challenge: {
        name: "Rinha de Frontend - 2023",
        slug: "rinha-frontend",
      },
      user_github_user: "laisfrigerio",
    },
    {
      id: 712,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/49536612.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/49536612?v=4",
        name: "Joseph",
        badge: null,
      },
      challenge: {
        name: "Lista de pa\u00edses com NextJS",
        slug: "lista-de-paises-next",
      },
      user_github_user: "Khufos",
    },
    {
      id: 583,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/gerenciador-de-habitos-com-nextjs/55001968.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/55001968?v=4",
        name: "THIAGO CREDICO",
        badge: null,
      },
      challenge: {
        name: "Gerenciador de h\u00e1bitos com Next.js",
        slug: "gerenciador-de-habitos-com-nextjs",
      },
      user_github_user: "thiagocredico",
    },
    {
      id: 1281,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/drag-and-drop-com-react-e-framer-motion/111543335.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/111543335?v=4",
        name: "Thiago Magno",
        badge: null,
      },
      challenge: {
        name: "Drag and Drop com React e Framer Motion",
        slug: "drag-and-drop-com-react-e-framer-motion",
      },
      user_github_user: "thgmagno",
    },
    {
      id: 1234,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/calendario-minimalista-com-javascript/112664623.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/112664623?v=4",
        name: "Jo\u00e3o Pedro Santana",
        badge: null,
      },
      challenge: {
        name: "Calend\u00e1rio minimalista com JavaScript",
        slug: "calendario-minimalista-com-javascript",
      },
      user_github_user: "santanajoao",
    },
    {
      id: 549,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/75846766.png",
      avatar: {
        avatar_url: "https://avatars.githubusercontent.com/u/75846766?v=4",
        name: "sumoyama",
        badge: null,
      },
      challenge: {
        name: "Lista de pa\u00edses com NextJS",
        slug: "lista-de-paises-next",
      },
      user_github_user: "sumoyama",
    },
  ],
  plan_info: {
    id: 1,
    name: "Codante - Vital\u00edcio",
    price_in_cents: 58800,
    slug: "codante-vitalicio",
  },
}