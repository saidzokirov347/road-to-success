import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon/*'],
			manifest: {
				name: 'The Mastery Path',
				short_name: 'MasteryApp',
				description: 'An app to guide your Road To Success.',
				start_url: '/',
				display: 'standalone',
				background_color: '#012B36',
				theme_color: '#000000',
				orientation: 'portrait',
				icons: [
					{
						src: '/favicon/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/favicon/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/favicon/apple-touch-icon.png',
						sizes: '180x180',
						type: 'image/png',
					},
				],
			},
		}),
	],
})
