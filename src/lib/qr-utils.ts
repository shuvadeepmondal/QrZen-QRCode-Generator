import { clamp } from "./utils"

export async function composeWithLogo(
  baseCanvas: HTMLCanvasElement,
  file?: File | null,
  opts?: { radius?: number; scale?: number },
): Promise<HTMLCanvasElement> {
  if (!file) return baseCanvas

  const { radius = 12, scale = 0.18 } = opts ?? {}
  const cw = baseCanvas.width
  const ch = baseCanvas.height

  // Compose on a new canvas to avoid tainting original if needed
  const canvas = document.createElement("canvas")
  canvas.width = cw
  canvas.height = ch
  const ctx = canvas.getContext("2d")!
  ctx.drawImage(baseCanvas, 0, 0)

  // Load logo image
  const url = URL.createObjectURL(file)

  try {
    const img = await loadImage(url)
    const logoW = Math.round(cw * clamp(scale, 0.08, 0.4))
    const logoH = Math.round((img.height / img.width) * logoW)
    const x = Math.round(cw / 2 - logoW / 2)
    const y = Math.round(ch / 2 - logoH / 2)

    // Draw white rounded rect under logo for contrast
    ctx.save()
    roundedRect(ctx, x - 8, y - 8, logoW + 16, logoH + 16, radius)
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.restore()

    // Draw logo clipped to rounded rect
    ctx.save()
    roundedRect(ctx, x, y, logoW, logoH, radius)
    ctx.clip()
    ctx.drawImage(img, x, y, logoW, logoH)
    ctx.restore()
  } finally {
    URL.revokeObjectURL(url)
  }

  return canvas
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}
