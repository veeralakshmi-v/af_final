import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';

export default function LiveEditor({
  initialHtml = `<h1>My Portfolio</h1>\n<p class="subtitle">Welcome to my first styled page!</p>\n<button>Click Me</button>`,
  initialCss = `body {\n  font-family: sans-serif;\n  text-align: center;\n  margin-top: 50px;\n}\nh1 { color: #3b82f6; }\n.subtitle { color: #94a3b8; }\nbutton {\n  background: #10b981;\n  color: white; border: none;\n  padding: 10px 20px; border-radius: 8px;\n}`,
  includeBootstrap = false
}) {
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [activeTab, setActiveTab] = useState('html');
  const [srcDoc, setSrcDoc] = useState('');

  const htmlTextareaRef = useRef(null);
  const cssTextareaRef = useRef(null);
  const htmlHighlightRef = useRef(null);
  const cssHighlightRef = useRef(null);

  // Sync state if props change
  useEffect(() => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
  }, [initialHtml, initialCss]);

  const handleReset = () => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
  };

  const handleRun = () => {
    updatePreview();
  };

  useEffect(() => {
    updatePreview();
    // eslint-disable-next-line
  }, [htmlCode, cssCode]);

  const updatePreview = () => {
    const combined = `
      ${includeBootstrap ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">' : ''}
      <style>${cssCode}</style>
      ${htmlCode}
      ${includeBootstrap ? '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>' : ''}
    `;
    setSrcDoc(combined);
  };

  const handleScroll = (type) => {
    if (type === 'html' && htmlTextareaRef.current && htmlHighlightRef.current) {
      htmlHighlightRef.current.scrollTop = htmlTextareaRef.current.scrollTop;
      htmlHighlightRef.current.scrollLeft = htmlTextareaRef.current.scrollLeft;
    } else if (type === 'css' && cssTextareaRef.current && cssHighlightRef.current) {
      cssHighlightRef.current.scrollTop = cssTextareaRef.current.scrollTop;
      cssHighlightRef.current.scrollLeft = cssTextareaRef.current.scrollLeft;
    }
  };

  const htmlHighlighted = Prism.highlight(htmlCode, Prism.languages.markup, 'markup');
  const cssHighlighted = Prism.highlight(cssCode, Prism.languages.css, 'css');

  return (
    <div style={{
      background: 'var(--surface-color)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ background: 'rgba(0,0,0,0.05)', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Workspace
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" onClick={handleReset}>Reset</button>
          <button className="btn btn-primary" onClick={handleRun}>Run</button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '500px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--surface-border)' }}>
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.03)', borderBottom: '1px solid var(--surface-border)' }}>
            <div 
              onClick={() => setActiveTab('html')}
              style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '600', borderBottom: '2px solid transparent', color: activeTab === 'html' ? 'var(--accent-secondary)' : 'var(--text-secondary)', borderBottomColor: activeTab === 'html' ? 'var(--accent-secondary)' : 'transparent', background: activeTab === 'html' ? 'rgba(0,0,0,0.05)' : 'transparent' }}
            >
              index.html
            </div>
            <div 
              onClick={() => setActiveTab('css')}
              style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '600', borderBottom: '2px solid transparent', color: activeTab === 'css' ? 'var(--accent-secondary)' : 'var(--text-secondary)', borderBottomColor: activeTab === 'css' ? 'var(--accent-secondary)' : 'transparent', background: activeTab === 'css' ? 'rgba(0,0,0,0.05)' : 'transparent' }}
            >
              styles.css
            </div>
          </div>
          
          <div style={{ flex: 1, position: 'relative', background: '#1e1e1e' }}>
            {/* HTML Editor */}
            <div style={{ display: activeTab === 'html' ? 'block' : 'none', height: '100%' }}>
              <textarea
                ref={htmlTextareaRef}
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                onScroll={() => handleScroll('html')}
                spellCheck={false}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1rem',
                  fontFamily: '"Fira Code", monospace', fontSize: '14px', lineHeight: 1.5,
                  border: 'none', margin: 0, color: 'transparent', caretColor: 'white',
                  background: 'transparent', resize: 'none', outline: 'none', zIndex: 2, whiteSpace: 'pre'
                }}
              />
              <pre aria-hidden="true" ref={htmlHighlightRef} style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1rem',
                fontFamily: '"Fira Code", monospace', fontSize: '14px', lineHeight: 1.5,
                border: 'none', margin: 0, color: '#d4d4d4', zIndex: 1, pointerEvents: 'none', overflow: 'hidden'
              }} dangerouslySetInnerHTML={{ __html: htmlHighlighted }} />
            </div>

            {/* CSS Editor */}
            <div style={{ display: activeTab === 'css' ? 'block' : 'none', height: '100%' }}>
              <textarea
                ref={cssTextareaRef}
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                onScroll={() => handleScroll('css')}
                spellCheck={false}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1rem',
                  fontFamily: '"Fira Code", monospace', fontSize: '14px', lineHeight: 1.5,
                  border: 'none', margin: 0, color: 'transparent', caretColor: 'white',
                  background: 'transparent', resize: 'none', outline: 'none', zIndex: 2, whiteSpace: 'pre'
                }}
              />
              <pre aria-hidden="true" ref={cssHighlightRef} style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1rem',
                fontFamily: '"Fira Code", monospace', fontSize: '14px', lineHeight: 1.5,
                border: 'none', margin: 0, color: '#d4d4d4', zIndex: 1, pointerEvents: 'none', overflow: 'hidden'
              }} dangerouslySetInnerHTML={{ __html: cssHighlighted }} />
            </div>
          </div>
        </div>
        
        <iframe title="preview" srcDoc={srcDoc} style={{ width: '100%', height: '100%', border: 'none', background: 'white' }} />
      </div>
    </div>
  );
}
