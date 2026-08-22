const TITLE_CASE_MINOR_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "per", "the", "to", "vs"
]);

export function titleCase(value: string) {
  return value
    .split(" ")
    .map((word, index) => {
      if (index > 0 && TITLE_CASE_MINOR_WORDS.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.replace(/\b\w/g, (letter) => letter.toUpperCase());
    })
    .join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function joinUrl(baseUrl: string, path: string) {
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
