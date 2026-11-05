// Fetch Roboto Mono as TTF at build time (plain fetch gets truetype from
// Google Fonts). Callers fall back to the default font on failure.
export async function loadRobotoMono(weight: 400 | 700): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@${weight}&display=swap`
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("font url not found");
  return fetch(url).then((r) => r.arrayBuffer());
}
