import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const getRemoteUrls = (mode: string) => {
  const isProd = mode === 'production';
  
  return {
    health: isProd 
      ? 'http://mfa-health.s3-website.ap-northeast-2.amazonaws.com/assets/remoteEntry.js'
      : 'http://localhost:3001/assets/remoteEntry.js',
    insurance: isProd
      ? 'http://mfa-insurance.s3-website.ap-northeast-2.amazonaws.com/assets/remoteEntry.js'
      : 'http://localhost:3002/assets/remoteEntry.js',
    mydata: isProd
      ? 'http://mfa-mydata.s3-website.ap-northeast-2.amazonaws.com/assets/remoteEntry.js'
      : 'http://localhost:3003/assets/remoteEntry.js',
  };
};

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  
  return {
    plugins: [
			react(),
			federation({
				name: 'shell',
				// remotes: {
				// 	health: 'http://localhost:3001/assets/remoteEntry.js',
				// 	insurance: 'http://localhost:3002/assets/remoteEntry.js',
				// 	mydata: 'http://localhost:3003/assets/remoteEntry.js',
				// },
				remotes: getRemoteUrls(mode),
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
			port: 3000,
			strictPort: true,
		},
		preview: {
			port: 3000,
			strictPort: true
		},
  }
})

// export default defineConfig({
// 	plugins: [
// 		react(),
// 		federation({
// 			name: 'shell',
// 			remotes: {
// 				health: 'http://localhost:3001/assets/remoteEntry.js',
// 				insurance: 'http://localhost:3002/assets/remoteEntry.js',
// 				mydata: 'http://localhost:3003/assets/remoteEntry.js',
// 			},
// 			shared: ['react', 'react-dom', 'react-router-dom'],
// 		}),
// 	],
// 	build: {
// 		modulePreload: false,
// 		target: 'esnext',
// 		minify: false,
// 		cssCodeSplit: false,
// 	},
// 	server: {
// 		port: 3000,
// 		strictPort: true,
// 	},
// 	preview: {
// 		port: 3000,
// 		strictPort: true,
// 	},
// });
