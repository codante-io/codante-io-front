import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import invariant from "tiny-invariant";
import { getUserProfile } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import ProfileHeader from "../components/profile-header";
import ProfileStats from "../components/profile-stats";
import ProfileChallenges from "../components/profile-challenges";
import ProfileCertificates from "../components/profile-certificates";

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data?.profile) {
    return [{ title: "Perfil não encontrado | Codante.io" }];
  }

  const { profile } = data;
  const name = formatName(profile.user.name);
  const title = `${name} | Codante.io`;
  const description = `Veja o perfil de ${name} no Codante. ${profile.stats.completed_challenge_count} mini-projetos concluídos, ${profile.stats.points} pontos.`;
  const imageUrl = getOgGeneratorUrl(name, "Perfil");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    {
      property: "og:url",
      content: `https://codante.io/perfil/${params.github_user}`,
    },
    { property: "og:type", content: "profile" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.github_user, "params.github_user is required");

  const profile = await getUserProfile(params.github_user);

  if (!profile) {
    throw new Response("Not Found", { status: 404 });
  }

  return { profile };
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="container mx-auto py-20 text-center">
        <p className="mb-6 text-lg font-light text-brand">404</p>
        <h1 className="mb-6 text-3xl font-bold font-lexend dark:text-gray-300">
          Perfil não encontrado
        </h1>
        <p className="mb-10 dark:text-gray-400">
          Não encontramos nenhum usuário com esse nome.
        </p>
        <Link className="text-sm font-medium text-brand" to="/">
          <span aria-hidden="true">&larr;</span> Voltar para a Home
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-20 text-center">
      <p className="mb-6 text-lg font-light text-brand">Erro</p>
      <h1 className="mb-6 text-3xl font-bold font-lexend dark:text-gray-300">
        Algo deu errado
      </h1>
      <Link className="text-sm font-medium text-brand" to="/">
        <span aria-hidden="true">&larr;</span> Voltar para a Home
      </Link>
    </main>
  );
}

export default function UserProfilePage() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto py-10">
      <ProfileHeader user={profile.user} />
      <ProfileStats stats={profile.stats} />
      <ProfileChallenges
        challenges={profile.completed_challenges}
        githubUser={profile.user.github_user}
      />
      <ProfileCertificates certificates={profile.certificates} />
    </main>
  );
}
