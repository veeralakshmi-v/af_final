import Prism from 'prismjs';
if (typeof window !== 'undefined') {
  window.Prism = Prism;

  // Auto-reload on stale dynamic import chunk following a new production deployment
  window.addEventListener('vite:preloadError', (event) => {
    console.warn('Vite preload error detected. Auto-reloading for latest deployment assets...', event);
    window.location.reload();
  });
}

import React, { Component } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './responsive.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);

    const errorMsg = error?.toString() || '';
    const isChunkError = 
      errorMsg.includes('Failed to fetch dynamically imported module') ||
      errorMsg.includes('Importing a module script failed') ||
      errorMsg.includes('error loading dynamically imported module');

    if (isChunkError) {
      const lastReload = sessionStorage.getItem('last_chunk_reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('last_chunk_reload', now.toString());
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.toString() || '';
      const isChunkError = 
        errorMsg.includes('Failed to fetch dynamically imported module') ||
        errorMsg.includes('Importing a module script failed') ||
        errorMsg.includes('error loading dynamically imported module');

      if (isChunkError) {
        return (
          <div style={{ padding: '2rem', background: '#F8FAFC', color: '#0F172A', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '500px', background: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', textAlign: 'center', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '56px', height: '56px', background: '#EFF6FF', color: '#1E40AF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '24px' }}>
                🔄
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
                New Update Available
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                A newer version of the AlphaFly course content has just been deployed. Please refresh your page to load the latest interactive lessons.
              </p>
              <button
                onClick={() => {
                  sessionStorage.removeItem('last_chunk_reload');
                  window.location.reload();
                }}
                style={{
                  padding: '0.75rem 2rem',
                  background: '#1E40AF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                Refresh Now
              </button>
            </div>
          </div>
        );
      }

      return (
        <div style={{ padding: '2rem', background: '#FEE2E2', color: '#991B1B', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h1>Something went wrong.</h1>
          <h2 style={{ color: '#DC2626' }}>{this.state.error && this.state.error.toString()}</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', marginTop: '1rem', background: '#FEF2F2', padding: '1rem', borderRadius: '8px' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1.5rem', padding: '0.65rem 1.5rem', background: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
