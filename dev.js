import { spawn } from 'child_process';

console.log('🔄 Starting frontend (Vite) and backend (Express) concurrently...');

const server = spawn('node', ['server/server.js'], { stdio: 'inherit', shell: true });
const vite = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });

server.on('exit', (code) => {
  console.log(`Backend server exited with code ${code}. Terminating frontend...`);
  vite.kill();
  process.exit(code || 0);
});

vite.on('exit', (code) => {
  console.log(`Frontend dev server exited with code ${code}. Terminating backend...`);
  server.kill();
  process.exit(code || 0);
});

process.on('SIGINT', () => {
  server.kill();
  vite.kill();
  process.exit(0);
});
