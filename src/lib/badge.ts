// Generates a small, dependency-free SVG "badge" image (same style as
// shields.io-type badges) for the free, embeddable water hardness widget.
// Kept intentionally simple - no external image libraries, fast to render,
// safe to cache aggressively at the edge.

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function estimateTextWidth(text: string, fontSize: number) {
  return Math.round(text.length * fontSize * 0.62);
}

export function buildHardnessBadgeSvg(cityName: string, rangeLabel: string, classification: string) {
  return buildLabelValueBadgeSvg("Water Hardness", `${cityName}: ${rangeLabel} GPG (${classification})`);
}

export function buildLabelValueBadgeSvg(label: string, value: string) {
  const fontSize = 12;
  const paddingX = 10;
  const labelWidth = estimateTextWidth(label, fontSize) + paddingX * 2;
  const valueWidth = estimateTextWidth(value, fontSize) + paddingX * 2;
  const height = 26;
  const totalWidth = labelWidth + valueWidth;
  const ariaLabel = escapeXml(`${label}: ${value}`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img" aria-label="${ariaLabel}">
  <rect width="${totalWidth}" height="${height}" rx="4" fill="#0F1F1D"/>
  <rect x="${labelWidth}" width="${valueWidth}" height="${height}" rx="4" fill="#F0B429"/>
  <rect x="${labelWidth}" width="6" height="${height}" fill="#F0B429"/>
  <text x="${labelWidth / 2}" y="${height / 2 + 4}" fill="#FFFFFF" font-family="Verdana, Geneva, sans-serif" font-size="${fontSize}" text-anchor="middle">${escapeXml(label)}</text>
  <text x="${labelWidth + valueWidth / 2}" y="${height / 2 + 4}" fill="#0F1F1D" font-family="Verdana, Geneva, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle">${escapeXml(value)}</text>
  <text x="${totalWidth - 4}" y="${height - 4}" fill="#0F1F1D" font-family="Verdana, Geneva, sans-serif" font-size="7" text-anchor="end" opacity="0.5">plumbinghands.com</text>
</svg>`;
}
