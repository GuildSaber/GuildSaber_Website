/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  safelist: [
    {
      pattern: /outline-(easy|normal|hard|expert|expert-plus)/,
    },
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1140px",
      },
    },
    colors: {
      primary: {
        DEFAULT: "#0060D6",
        dark: {
          DEFAULT: "#005BBD",
          25: "#005BBD40",
        },
      },
      secondary: {
        DEFAULT: "#FFA41C",
        dark: {
          DEFAULT: "#FF9900",
          25: "#FF990040",
        },
      },
      muted: "#7E8691",
      error: "#EA4C66",
      success: "#34D399",
      discord: "#5865f2",
      white: "#FFFFFF",
      "expert-plus": "#8f48db",
      expert: "#bf2a42",
      hard: "#ee5e44",
      normal: "#59b0f4",
      easy: "#3cb371",
      gray: {
        900: "#111213",
        800: "#1A1C1E",
        700: "#2E3136",
      },
      transparent: "transparent",
    },
    fontSize: {
      h1: "2.986rem",
      h2: "2.488rem",
      h3: "2.074rem",
      h4: "1.728rem",
      h5: "1.44rem",
      h6: "1.2rem",
      p: "1rem",
      btn: "0.875rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1140px",
    },
    extend: {
      lineHeight: {
        none: "1",
        DEFAULT: "1.8",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        lg: "1rem",
        full: "9999px",
      },
      spacing: {
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        32: "8rem",
      },
    },
  },
  plugins: [],
};
