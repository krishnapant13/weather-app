/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.jsx", "./src/**/*.js", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff6600",
        // Add more custom colors if needed
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans"],
        // Add custom font families here
      },
      fontSize: {
        "2xl": "1.75rem",
        // Add custom font sizes here
      },
      spacing: {
        7: "1.75rem",
        // Add custom spacing values here
      },
      // Add more theme customizations as needed
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "focus"],
      textColor: ["hover", "focus"],
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "821px": "821px",
        "1300px": "1300px",
        "400px": "400px",
      },
      // Add more extended variants as needed
    },
  },
  plugins: [
    // Add any Tailwind CSS plugins you want to use here
  ],
};
