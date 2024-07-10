import { SitemapStream, streamToPromise } from "sitemap";
import { sitemapPages } from "./static-pages";
import { environment } from "~/lib/models/environment";
import axios from "axios";

export async function loader() {
  const baseUrl = "https://codante.io"; // Ensure you use the correct domain
  const sitemap = new SitemapStream({ hostname: baseUrl });
  let sitemapApiUrl = `${environment().API_HOST}/sitemap`;

  // // get static pages from static-pages.ts
  for (const page of sitemapPages) {
    sitemap.write({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }

  // get dynamic pages from from backend
  const sitemapItems = (await axios.get(sitemapApiUrl)).data;

  for (const item of sitemapItems) {
    sitemap.write({
      url: item.url,
      changefreq: item.changefreq,
      priority: item.priority,
    });
  }

  // workshops ✅
  // mini-projetos ✅
  // aulas ✅
  // resolucoes ✅
  // testes técnicos ✅
  // página codigo fonte e página submissão ✅
  // pegar todas as trilhas ✅ (de forma estática)

  sitemap.end(); // Signal the end of the sitemap

  const smStream = await streamToPromise(sitemap);

  // // 5. Return XML Response
  return new Response(smStream.toString(), {
    headers: {
      "Content-Type": "application/xml",
      "cache-control": "public, max-age=21600",
    },
  });
}
