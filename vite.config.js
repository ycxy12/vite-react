/*
 * @Author: yc
 * @Date: 2024-11-22 19:34:21
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 16:49:11
 * @Description: vite
 */
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
		port: 1217,
		open: true, //运行 npm run serve 时自动打开浏览器
		cors: true,
		// https: false,
		proxy: {
			"/api": {
				target: "https://ycxy12.usemock.com", // useMock 17719317581 q1111111
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	plugins: [
		react(),
		// * 使用 svg 图标
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), "src/assets/icons")],
			symbolId: "icon-[dir]-[name]",
		}),
	],
	esbuild: {
		pure: ["console.log", "debugger"], // 删除生产环境 console
	},
})
