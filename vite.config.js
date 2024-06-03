import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		global: "globalThis",
	},
	resolve: {
		alias: {
			"./runtimeConfig": "./runtimeConfig.browser",
			"@": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [react()],
	server: {
		port: 5200,
		strictPort: true,
	},
});
