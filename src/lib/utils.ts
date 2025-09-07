export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

export function normalizeHex(value: string): string {
  const trimmed = value.trim()
  if (!trimmed.startsWith("#")) return `#${trimmed}`
  return trimmed
}

export function suggestedFileName(content: string): string {
  const clean = content
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/gi, "")
    .toLowerCase()
  return clean ? `qr-${clean.slice(0, 40)}` : "qr-code"
}
