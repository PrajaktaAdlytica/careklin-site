import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { routeMeta, sources } from "../src/data.js";
const configuredOrigin = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'https://careklin-concept.artfullarch32.chatgpt.site';
const siteOrigin = new URL(configuredOrigin.startsWith('http') ? configuredOrigin : `https://${configuredOrigin}`).origin;
const base = readFileSync("dist/index.html", "utf8");
const escape = (s) =>
  s.replace(
    /[&<>\"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
for (const [route, [title, description]] of Object.entries(routeMeta)) {
  const html = base
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escape(title)} | CareKlin</title>`,
    )
    .replace(
      /(<meta name="description" content=")[^"]*("\/?>)/,
      `$1${escape(description)}$2`,
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*("\/?>)/,
      `$1${escape(title)} | CareKlin$2`,
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*("\/?>)/,
      `$1${escape(description)}$2`,
    )
    .replace(
      "</head>",
      `<link rel="canonical" href="${siteOrigin}${route}"/><meta property="og:url" content="${siteOrigin}${route}"/></head>`,
    );
  if (route === "/") writeFileSync("dist/index.html", html);
  else {
    mkdirSync("dist" + route, { recursive: true });
    writeFileSync("dist" + route + "/index.html", html);
  }
}
mkdirSync("dist/pricing", { recursive: true });
writeFileSync("dist/pricing/index.html", base);
writeFileSync("dist/404.html", base);
const rows = sources
  .map(
    (s) =>
      `<article><a href="${s.url}" target="_blank" rel="noreferrer">${escape(s.name)} ↗</a><p>${escape(s.detail)}</p></article>`,
  )
  .join("");
writeFileSync(
  "dist/sources.html",
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><link rel="icon" href="/assets/brand/favicon.svg"><title>Research sources | CareKlin</title><style>@font-face{font-family:Manrope;src:url('/assets/fonts/Manrope.ttf')}body{font:15px/1.7 Manrope,Arial;background:#f8f5ee;color:#141414;max-width:850px;margin:0 auto;padding:40px 24px}a{color:inherit}img{width:170px;margin-bottom:40px}h1{font-size:45px;letter-spacing:-.04em;line-height:1.1}article{padding:25px 0;border-top:1px solid #d8d0c5}article a{font-weight:700}p{color:#605b55;font-size:14px}footer{margin-top:40px;font-size:12px}</style><body><a href="/"><img src="/assets/brand/logo-primary.svg" alt="CareKlin home"></a><small>CONCEPT PREVIEW / RESEARCH CONTEXT</small><h1>Start with the source.</h1><p>These official and vendor sources inform the workflow context. They do not establish CareKlin’s efficacy, compliance, integration capability or an endorsement.</p>${rows}<footer><a href="/evaluation">Evaluation plan</a> · <a href="/legal/privacy">Privacy</a> · <a href="/">Back to CareKlin</a><p>Research-stage concept. All interface records are synthetic. No state pilot is established.</p></footer></body></html>`,
);
writeFileSync("dist/robots.txt", "User-agent: *\nDisallow: /\n");
console.log(
  `Prepared ${Object.keys(routeMeta).length} static route entries, pricing redirect, 404 and source page.`,
);
