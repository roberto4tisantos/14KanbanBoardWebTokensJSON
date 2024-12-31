import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        // port: 3000,
        // port: 5173,
        port: 3001,        
        open: true,
        proxy: {
            '/api': {
                // target: 'http://localhost:5173',
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            },
            '/auth': {
                // target: 'http://localhost:5173',
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
                logLevel: 'debug', // Enable debug logging for proxy
            },
        },
    },
    plugins: [react()],
});
