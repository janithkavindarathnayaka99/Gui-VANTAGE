/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        "colors": {
            "on-primary-fixed-variant": "#374e00",
            "on-tertiary-container": "#576676",
            "secondary-container": "#3131c0",
            "on-secondary-fixed": "#07006c",
            "error": "#ffb4ab",
            "on-secondary": "#1000a9",
            "primary-container": "#b7f700",
            "inverse-on-surface": "#313030",
            "tertiary-fixed": "#d4e4f7",
            "surface-container-lowest": "#0e0e0e",
            "background": "#050505",
            "on-tertiary-fixed-variant": "#394857",
            "on-tertiary": "#233240",
            "surface-container": "#201f1f",
            "on-secondary-fixed-variant": "#2f2ebe",
            "on-primary-container": "#506e00",
            "primary": "#ffffff",
            "on-surface-variant": "#c2caad",
            "surface-variant": "#353534",
            "on-error": "#690005",
            "surface-tint": "#a0d800",
            "inverse-primary": "#4b6700",
            "surface-container-highest": "#353534",
            "outline-variant": "#434933",
            "on-secondary-container": "#b0b2ff",
            "primary-fixed-dim": "#a0d800",
            "error-container": "#93000a",
            "surface": "#131313",
            "primary-fixed": "#b7f700",
            "on-primary": "#253600",
            "tertiary-container": "#d4e4f7",
            "tertiary-fixed-dim": "#b8c8da",
            "tertiary": "#ffffff",
            "surface-container-low": "#1c1b1b",
            "secondary": "#c0c1ff",
            "surface-container-high": "#2a2a2a",
            "secondary-fixed": "#e1e0ff",
            "on-background": "#e5e2e1",
            "on-primary-fixed": "#141f00",
            "secondary-fixed-dim": "#c0c1ff",
            "on-surface": "#e5e2e1",
            "on-error-container": "#ffdad6",
            "surface-bright": "#3a3939",
            "on-tertiary-fixed": "#0d1d2a",
            "outline": "#8c9479",
            "inverse-surface": "#e5e2e1",
            "surface-dim": "#131313"
        },
        "borderRadius": {
            "DEFAULT": "0.125rem",
            "lg": "0.25rem",
            "xl": "0.5rem",
            "full": "0.75rem"
        },
        "spacing": {
            "base": "8px",
            "margin-desktop": "64px",
            "gutter": "24px",
            "margin-mobile": "16px",
            "container-max": "1440px"
        },
        "fontFamily": {
            "body-md": ["Inter", "sans-serif"],
            "label-caps": ["Inter", "sans-serif"],
            "headline-md": ["Manrope", "sans-serif"],
            "title-sm": ["Manrope", "sans-serif"],
            "display-lg": ["Manrope", "sans-serif"]
        },
        "fontSize": {
            "body-md": ["1rem", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
            "label-caps": ["0.75rem", {"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "600"}],
            "headline-md": ["2.25rem", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
            "title-sm": ["1.25rem", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "500"}],
            "display-lg": ["4.5rem", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "700"}]
        }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
