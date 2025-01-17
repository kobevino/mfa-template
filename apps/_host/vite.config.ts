import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'host',
			remotes: {
				health: 'http://localhost:3001/assets/remoteEntry.js',
				insurance: 'http://localhost:3002/assets/remoteEntry.js',
				mydata: 'http://localhost:3003/assets/remoteEntry.js',
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
		port: 3000,
		strictPort: true,
	},
	preview: {
		port: 3000,
		strictPort: true,
	},
});
