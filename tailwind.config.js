const theme = require("./src/config/theme.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [
    /* { pattern: /^swiper-/ } */
  ],
  darkMode: "class",
  prefix: "",
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* text的颜色只需要管前面3种，light、dark、default */
        /* 也就是说正常只要这3种颜色即可，text-xxx */
        /* 如果有时候希望字体颜色跟主题色一样，那么就还会用到 text-primary */
        /* dark可以理解为标题这类primary的文字颜色 */
        /* text可以理解为正文这类普通的文字颜色 */
        /* light可以理解为描述这类secondary的文字颜色 */
        text: theme.colors.default.text_color.default,
        light: theme.colors.default.text_color.light,
        dark: theme.colors.default.text_color.dark,

        /* primary可以理解为主题颜色，例如 text-primary / bg-primary */
        /* secondary可以理解为次要颜色，实际用的不多，例如 text-secondary */
        /* body可以理解为网页大面积的中间正文背景颜色，例如 bg-body */
        /* border可以理解为边框颜色，例如 border-border */
        /* theme-light可以理解为浅色主题，一般用于页面小部分内容的背景色，例如 bg-theme-light */
        /* theme-dark可以理解为深色主题，一般用于页面小部分内容的背景色，例如 bg-theme-dark */
        primary: theme.colors.default.theme_color.primary,
        secondary: theme.colors.default.theme_color.secondary,
        body: theme.colors.default.theme_color.body,
        border: theme.colors.default.theme_color.border,
        "theme-light": theme.colors.default.theme_color.theme_light,
        "theme-dark": theme.colors.default.theme_color.theme_dark,
        darkmode: {
          text: theme.colors.darkmode.text_color.default,
          light: theme.colors.darkmode.text_color.light,
          dark: theme.colors.darkmode.text_color.dark,
          primary: theme.colors.darkmode.theme_color.primary,
          secondary: theme.colors.darkmode.theme_color.secondary,
          body: theme.colors.darkmode.theme_color.body,
          border: theme.colors.darkmode.theme_color.border,
          "theme-light": theme.colors.darkmode.theme_color.theme_light,
          "theme-dark": theme.colors.darkmode.theme_color.theme_dark,
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
  ],
};