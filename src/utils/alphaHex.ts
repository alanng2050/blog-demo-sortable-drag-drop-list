export const alphaHex = (hex: string, opacity: number) => {
  const alpha = Math.round(opacity * 255).toString(16)
  return `${hex}${alpha}`
}
