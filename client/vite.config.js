import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prismjs from "vite-plugin-prismjs";

export default defineConfig({
  plugins: [
    react(),
    prismjs({
      languages: ["javascript", "cpp", "java", "python"],
      plugins: ["line-numbers"],
      theme: "tomorrow",
      css: true,
    }),
  ],
  server: {
    historyApiFallback: true,
  },
});
