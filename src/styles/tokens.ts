/**
 * Centralized Design System Tokens for LKL Platform
 * Aligned with Section 12, 13, and 84 of the Constitution.
 */

export const tokens = {
  colors: {
    primary: {
      default: "#166534", // Brand Green
      hover: "#14532d",
      subtle: "#f0fdf4",
      border: "#86efac",
    },
    secondary: {
      default: "#d97706", // Brand Gold
      hover: "#b45309",
      subtle: "#fffbeb",
      border: "#fde68a",
    },
    surface: {
      canvas: "#fafaf9",
      card: "#ffffff",
      muted: "#f5f5f4",
      elevated: "#ffffff",
    },
    text: {
      primary: "#1c1917",
      secondary: "#57534e",
      muted: "#78716c",
      inverted: "#ffffff",
    },
    border: {
      subtle: "#e7e5e4",
      default: "#d6d3d1",
      focus: "#16a34a",
    },
    status: {
      success: "#15803d",
      warning: "#d97706",
      error: "#dc2626",
      info: "#0284c7",
    },
  },
  typography: {
    fontFamily: "var(--font-cairo), system-ui, sans-serif",
    sizes: {
      display: "text-3xl md:text-5xl font-extrabold leading-tight",
      h1: "text-2xl md:text-4xl font-bold leading-snug",
      h2: "text-xl md:text-3xl font-bold leading-snug",
      h3: "text-lg md:text-2xl font-semibold leading-normal",
      h4: "text-base md:text-xl font-semibold leading-normal",
      bodyLarge: "text-base md:text-lg leading-relaxed",
      body: "text-sm md:text-base leading-relaxed",
      bodySmall: "text-xs md:text-sm leading-normal",
      caption: "text-xs leading-normal",
    },
  },
  radius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  },
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },
  containers: {
    standard: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    narrow: "max-w-4xl mx-auto px-4 sm:px-6",
    wide: "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
  },
};
