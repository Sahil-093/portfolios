import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function ensureBuildExists() {
  if (!fs.existsSync(DIST_DIR) || !fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.log('📦 No existing build found in dist/. Triggering initial compilation...');
    return new Promise((resolve, reject) => {
      const buildProc = spawn('node', ['src/build.js'], { cwd: ROOT_DIR, stdio: 'inherit' });
      buildProc.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Initial build failed with exit code ${code}`));
      });
    });
  }
  return Promise.resolve();
}

async function startServer() {
  await ensureBuildExists();

  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let reqPath = decodeURIComponent(parsedUrl.pathname);

    // If path ends with slash or is root, serve index.html
    if (reqPath.endsWith('/')) {
      reqPath += 'index.html';
    }

    let filePath = path.join(DIST_DIR, reqPath);

    // If file doesn't exist, check if appending /index.html works
    if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }

    // If still not found, fallback to 404.html
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, '404.html');
      res.statusCode = 404;
    } else {
      res.statusCode = 200;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Internal Server Error: ${err.message}`);
        return;
      }

      res.writeHead(res.statusCode, { 'Content-Type': contentType });
      res.end(data);
      console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${parsedUrl.pathname} -> ${res.statusCode}`);
    });
  });

  server.listen(PORT, () => {
    console.log('='.repeat(55));
    console.log(`🌌 ANTI-GRAVITY LOCAL PREVIEW SERVER ACTIVE`);
    console.log(`🔗 Local URL: http://localhost:${PORT}`);
    console.log(`📁 Serving from: ${DIST_DIR}`);
    console.log('='.repeat(55));
  });
}

startServer().catch((err) => {
  console.error('Failed to start preview server:', err);
});
