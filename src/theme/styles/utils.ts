// ----------------------------------------------------------------------

export const stylesMode = {
  light: '[data-mui-color-scheme="light"] &',
  dark: '[data-mui-color-scheme="dark"] &',
}

export const mediaQueries = {
  upXs: '@media (min-width:0px)',
  upSm: '@media (min-width:600px)',
  upMd: '@media (min-width:900px)',
  upLg: '@media (min-width:1200px)',
  upXl: '@media (min-width:1536px)',
}

/**
 * Set font family
 */
export function setFont(fontName: string): string {
  return `"${fontName}",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
}

/**
 * Converts rem to px
 */
export function remToPx(value: string | number): number {
  return Math.round(parseFloat(value.toString()) * 16)
}

/**
 * Converts px to rem
 */
export function pxToRem(value: number): string {
  return `${value / 16}rem`
}

interface ResponsiveFontSizes {
  sm: number
  md: number
  lg: number
}

/**
 * Responsive font sizes
 */
export function responsiveFontSizes({
  sm,
  md,
  lg,
}: ResponsiveFontSizes): Record<string, { fontSize: string }> {
  return {
    [mediaQueries.upSm]: { fontSize: pxToRem(sm) },
    [mediaQueries.upMd]: { fontSize: pxToRem(md) },
    [mediaQueries.upLg]: { fontSize: pxToRem(lg) },
  }
}

/**
 * Converts a hex color to RGB channels
 */
export function hexToRgbChannel(hex: string): string {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)

  return `${r} ${g} ${b}`
}

interface HexPalette {
  [key: string]: string
}

/**
 * Converts a hex color palette to RGB channels
 */
export function createPaletteChannel(hexPalette: HexPalette): HexPalette {
  const channelPalette: HexPalette = {}

  Object.entries(hexPalette).forEach(([key, value]) => {
    channelPalette[`${key}Channel`] = hexToRgbChannel(value)
  })

  return { ...hexPalette, ...channelPalette }
}

/**
 * Color with alpha channel
 */
export function varAlpha(color: string, opacity: number = 1): string {
  const unsupported =
    color.startsWith('#') ||
    color.startsWith('rgb') ||
    color.startsWith('rgba') ||
    (!color.includes('var') && color.includes('Channel'))

  if (unsupported) {
    throw new Error(`[Alpha]: Unsupported color format "${color}". 
    Supported formats are: 
    - RGB channels: "0 184 217".
    - CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)".
    Unsupported formats are:
    - Hex: "#00B8D9".
    - RGB: "rgb(0, 184, 217)".
    - RGBA: "rgba(0, 184, 217, 1)".
    `)
  }

  return `rgba(${color} / ${opacity})`
}
