import { spawn } from 'child_process';

console.log('🔄 Starting frontend (Vite) and backend (Express) concurrently...');

const server = spawn('node', ['--watch', 'server/server.js'], { stdio: 'inherit', shell: true });
const vite = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });

server.on('exit', (code) => {
  if (code && code !== 0) {
    console.warn(`\n⚠️ Backend server exited with code ${code}.`);
    console.warn('💡 If port 5000 was already in use (EADDRINUSE), run:');
    console.warn('   Get-Process -Name node | Stop-Process -Force   (PowerShell)');
    console.warn('   Or in CMD: taskkill /F /IM node.exe\n');
  }
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
