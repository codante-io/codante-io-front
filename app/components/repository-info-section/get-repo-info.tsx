import axios from "axios";

export async function getRepoInfo(repoName: string) {
  const repo = await axios
    .get(`https://api.github.com/repos/codante-io/${repoName}`)
    .then((res) => res.data);

  return { stars: repo.stargazers_count, forks: repo.forks_count };
}
