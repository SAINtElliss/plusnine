import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import url from 'url';

function apiRoadmapPlugin(): Plugin {
  return {
    name: 'api-roadmap-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const parsedUrl = url.parse(req.url, true);
        if (parsedUrl.pathname === '/api/roadmap' || parsedUrl.pathname === '/api/roadmap/') {
          try {
            const { evaluateRoadmapAccess } = await server.ssrLoadModule('/api/roadmap.ts');

            let key: string | null = (parsedUrl.query.admin as string) || (parsedUrl.query.key as string) || null;
            if (!key && req.headers['x-admin-key']) {
              key = req.headers['x-admin-key'] as string;
            }
            if (!key && typeof req.headers.authorization === 'string' && req.headers.authorization.startsWith('Bearer ')) {
              key = req.headers.authorization.replace('Bearer ', '').trim();
            }

            const data = evaluateRoadmapAccess(key);

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.statusCode = 200;
            res.end(JSON.stringify(data));
          } catch (err: any) {
            console.error('Error in dev /api/roadmap middleware:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err?.message || 'Server error' }));
          }
        } else {
          next();
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiRoadmapPlugin()],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
