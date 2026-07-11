import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    allowedHosts: [
      "0989-2405-201-4042-a868-8e6-13be-2bc-d474.ngrok-free.app",
    ],
  },
});