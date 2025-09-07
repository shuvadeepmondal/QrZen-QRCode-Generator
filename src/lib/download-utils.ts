export function downloadPNG(canvas: HTMLCanvasElement | null, baseName: string): void {
  if (!canvas) return

  const link = document.createElement("a")
  link.download = `${baseName}.png`
  link.href = canvas.toDataURL("image/png")
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function downloadSVG(svgText: string, baseName: string): void {
  if (!svgText) return

  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.download = `${baseName}.svg`
  link.href = url
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export async function copyImageToClipboard(dataUrl: string): Promise<boolean> {
  try {
    const response = await fetch(dataUrl)
    const blob = await response.blob()

    // @ts-ignore - ClipboardItem is not in TS lib in some environments
    const item = new ClipboardItem({ [blob.type]: blob })
    await navigator.clipboard.write([item])
    return true
  } catch (error) {
    console.warn("Clipboard image copy not supported:", error)
    return false
  }
}
