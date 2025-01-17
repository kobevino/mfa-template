import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'mydata',
			filename: 'remoteEntry.js',
			exposes: {
				'./App': './src/App',
			},
			shared: ['react', 'react-dom'],
		}),
	],
	build: {
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
	server: {
		port: 3003,
		strictPort: true,
	},
	preview: {
		port: 3003,
		strictPort: true,
	},
});
