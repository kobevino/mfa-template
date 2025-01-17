import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'health',
			filename: 'remoteEntry.js',
			exposes: {
				'./App': './src/App.tsx',
			},
			shared: ['react', 'react-dom', 'react-router-dom'],
		}),
	],
	build: {
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
	server: {
		port: 3001,
		strictPort: true,
	},
	preview: {
		port: 3001,
		strictPort: true,
	},
});
