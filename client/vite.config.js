import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        //port: 3000,
        port: 5173,
        open: true,
        proxy: {
            '/api': {
                // target: 'http://localhost:3001',
                target: 'http://localhost:5173',
                changeOrigin: true,
                secure: false,
            },
            '/auth': {
                // target: 'http://localhost:3001',
                target: 'http://localhost:5173',
                changeOrigin: true,
                secure: false
            },
        },
    },
    plugins: [react()],
});
