import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Layers, List, Table, Terminal, ShieldAlert, Cpu, ArrowRight, BookOpen, Code, Sliders, PenTool, CheckCircle, Eye, FileCode2 } from 'lucide-react';
import JSLiveEditor from '../../components/JSLiveEditor';
import JSDayQuizQuestion from '../../components/JSDayQuizQuestion';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SyntaxHighlighter = ({ code, lang = 'js' }) => {
  const lines = code.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', lineHeight: '1.5' }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        // Groups: 1=comment 2=string 3=htmlTag 4=keyword 5=literal 6=builtin 7=number 8=identifier 9=symbol
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9\-]*\s*\/?>?)|(?:\b(let|const|var|function|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|import|export|from|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super)\b)|(?:\b(console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON|Date|RegExp|Error|parseInt|parseFloat|isNaN|alert|prompt)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment)         color = '#8b949e';
          else if (str)        color = '#a5d6ff';
          else if (htmlTag)    color = '#7ee787';
          else if (kw)       { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal)    color = '#d2a8ff';
          else if (builtin)    color = '#ffb454';
          else if (num)        color = '#79c0ff';
          else if (ident)      color = '#e1e4e8';
          else if (sym)        color = '#ff7b72';
          tokens.push(<span key={k++} style={{ color, fontWeight }}>{tok}</span>);
        }
        return (
          <div key={lineIdx} style={{ whiteSpace: 'pre' }}>
            {tokens.length > 0 ? tokens : line}
          </div>
        );
      })}
    </div>
  );
};

export default function JSDay2({ activeTab, onNavigate }) {
  const [calcDisplay, setCalcDisplay] = useState('');
  const [activeCodeSection, setActiveCodeSection] = useState('none');
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleContinue = (nextSectionId) => {
    onNavigate('js_module2', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      
      {/* JS OPERATORS */}
      {activeTab === 'js_operators' && (
        <Section key="js_operators" id="js_operators" eyebrow="Syllabus 01" title="JavaScript Operators Explained Individually">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>An **operator** is a special symbol used to perform calculations, comparison checks, or assignments on values. Below is the complete classification, listing every operator individually with examples.</p>

            {/* 1. ARITHMETIC OPERATORS */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>🧮 1. Arithmetic Operators</h3>
            <p>Used to perform standard mathematical calculations on numerical values:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold' }}>+ (Addition)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Adds two numeric values together.</p>
                <SyntaxHighlighter code={`let result = 10 + 5; // result is 15`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold' }}>- (Subtraction)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Subtracts the right value from the left value.</p>
                <SyntaxHighlighter code={`let result = 10 - 5; // result is 5`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold' }}>* (Multiplication)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Multiplies two numeric values.</p>
                <SyntaxHighlighter code={`let result = 4 * 5; // result is 20`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold' }}>/ (Division)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Divides the left value by the right value.</p>
                <SyntaxHighlighter code={`let result = 20 / 4; // result is 5`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold' }}>% (Modulus / Remainder)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Returns the division remainder left over.</p>
                <SyntaxHighlighter code={`let result = 14 % 5; // result is 4`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold' }}>** (Exponentiation)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Raises the base to the power of the exponent.</p>
                <SyntaxHighlighter code={`let result = 2 ** 3; // result is 8`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold' }}>++ (Unary Increment)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Adds one. Can be prefix (<code>++x</code>) or postfix (<code>x++</code>).</p>
                <SyntaxHighlighter code={`let count = 5;
count++; // count is now 6`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ff7b72', fontWeight: 'bold' }}>-- (Unary Decrement)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Subtracts one from the operand.</p>
                <SyntaxHighlighter code={`let count = 5;
--count; // count is now 4`} />
              </div>
            </div>

            {/* 2. ASSIGNMENT OPERATORS */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>📝 2. Assignment Operators</h3>
            <p>Used to store values inside variables. Shorthand arithmetic assignments combine calculations with assignments:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>= (Simple Assignment)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Assigns the right operand value to the left variable.</p>
                <SyntaxHighlighter code={`let name = "Alex";`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>+= (Addition Assignment)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Adds right value to variable and saves result.</p>
                <SyntaxHighlighter code={`let x = 5;
x += 3; // equivalent to x = x + 3`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>-= (Subtraction Assignment)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Subtracts right value from variable and saves result.</p>
                <SyntaxHighlighter code={`let x = 10;
x -= 4; // equivalent to x = x - 4`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>*= (Multiplication Assignment)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Multiplies variable by right value and saves result.</p>
                <SyntaxHighlighter code={`let x = 4;
x *= 3; // equivalent to x = x * 3`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>/= (Division Assignment)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Divides variable by right value and saves result.</p>
                <SyntaxHighlighter code={`let x = 15;
x /= 3; // equivalent to x = x / 3`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>%= (Remainder Assignment)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Modulates variable by right value and saves result.</p>
                <SyntaxHighlighter code={`let x = 12;
x %= 5; // equivalent to x = x % 5`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b', gridColumn: 'span 2' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>**= (Exponentiation Assignment)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Raises variable to the power of the right operand and saves result.</p>
                <SyntaxHighlighter code={`let x = 2;
x **= 3; // equivalent to x = x ** 3`} />
              </div>
            </div>

            {/* 3. COMPARISON OPERATORS */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>🔍 3. Comparison Operators</h3>
            <p>Used to verify relations, returning boolean outputs (<code>true</code> or <code>false</code>):</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#7ee787', fontWeight: 'bold' }}>== (Loose Equal)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Checks equality after coercing variable datatypes.</p>
                <SyntaxHighlighter code={`console.log(5 == "5"); // true`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#7ee787', fontWeight: 'bold' }}>=== (Strict Equal)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Checks equality of both value AND data type without coercion.</p>
                <SyntaxHighlighter code={`console.log(5 === "5"); // false`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#7ee787', fontWeight: 'bold' }}>!= (Loose Not Equal)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Checks inequality after type coercion.</p>
                <SyntaxHighlighter code={`console.log(5 != "6"); // true`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#7ee787', fontWeight: 'bold' }}>!== (Strict Not Equal)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Checks inequality of value or type strictly.</p>
                <SyntaxHighlighter code={`console.log(5 !== "5"); // true`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#7ee787', fontWeight: 'bold' }}>&gt; (Greater Than)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Checks if the left value is greater than the right value.</p>
                <SyntaxHighlighter code={`console.log(12 > 4); // true`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#7ee787', fontWeight: 'bold' }}>&lt; (Less Than)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Checks if the left value is less than the right value.</p>
                <SyntaxHighlighter code={`console.log(3 < 8); // true`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#7ee787', fontWeight: 'bold' }}>&gt;= (Greater Than or Equal)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Checks if the left value is greater than or equal to the right.</p>
                <SyntaxHighlighter code={`console.log(5 >= 5); // true`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#7ee787', fontWeight: 'bold' }}>&lt;= (Less Than or Equal)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Checks if the left value is less than or equal to the right.</p>
                <SyntaxHighlighter code={`console.log(3 <= 5); // true`} />
              </div>
            </div>

            {/* 4. LOGICAL OPERATORS */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>🔌 4. Logical Operators</h3>
            <p>Used to verify multiple boolean conditions:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#79c0ff', fontWeight: 'bold' }}>&& (Logical AND)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Returns true only if both operands evaluate to true.</p>
                <SyntaxHighlighter code={`let result = (5 > 3) && (2 < 4); // true`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#79c0ff', fontWeight: 'bold' }}>|| (Logical OR)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Returns true if at least one operand is true.</p>
                <SyntaxHighlighter code={`let result = (5 > 10) || (2 < 4); // true`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b', gridColumn: 'span 2' }}>
                <code style={{ fontSize: '1rem', color: '#79c0ff', fontWeight: 'bold' }}>! (Logical NOT)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Inverts the boolean state of the operand.</p>
                <SyntaxHighlighter code={`let isLogged = true;
console.log(!isLogged); // false`} />
              </div>
            </div>

            {/* 5. BITWISE OPERATORS */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>⚙ 5. Bitwise Operators</h3>
            <p>Treat operands as 32-bit binary integers, operating on individual bits:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#d2a8ff', fontWeight: 'bold' }}>& (Bitwise AND)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Compares bits; returns 1 if both bits are 1.</p>
                <SyntaxHighlighter code={`let result = 5 & 1; // binary 0101 & 0001 = 0001 (1)`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#d2a8ff', fontWeight: 'bold' }}>| (Bitwise OR)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Compares bits; returns 1 if at least one bit is 1.</p>
                <SyntaxHighlighter code={`let result = 5 | 1; // binary 0101 | 0001 = 0101 (5)`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#d2a8ff', fontWeight: 'bold' }}>^ (Bitwise XOR)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Returns 1 if compared bits are different.</p>
                <SyntaxHighlighter code={`let result = 5 ^ 1; // binary 0101 ^ 0001 = 0100 (4)`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#d2a8ff', fontWeight: 'bold' }}>~ (Bitwise NOT)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Inverts all bits of the operand.</p>
                <SyntaxHighlighter code={`let result = ~5; // returns -6`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#d2a8ff', fontWeight: 'bold' }}>&lt;&lt; (Left Shift)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Shifts bits to the left by the specified amount, filling with 0.</p>
                <SyntaxHighlighter code={`let result = 5 << 1; // returns 10`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#d2a8ff', fontWeight: 'bold' }}>&gt;&gt; (Sign-propagating Right Shift)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Shifts bits right, keeping sign bit.</p>
                <SyntaxHighlighter code={`let result = 5 >> 1; // returns 2`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b', gridColumn: 'span 2' }}>
                <code style={{ fontSize: '1rem', color: '#d2a8ff', fontWeight: 'bold' }}>&gt;&gt;&gt; (Zero-fill Right Shift)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Shifts bits right, filling shifted spaces with 0.</p>
                <SyntaxHighlighter code={`let result = -5 >>> 1; // returns 2147483645`} />
              </div>
            </div>

            {/* 6. STRING & TERNARY OPERATORS */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>🔗 6. String & Ternary Operators</h3>
            <p>Special utility operators used for textual concatenation or shorthand conditional logic:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>+ (String Concatenation)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>Merges two string sequences. Coerces non-strings if present.</p>
                <SyntaxHighlighter code={`let msg = "Hello " + "World!"; // "Hello World!"`} />
              </div>
              <div style={{ background: '#0f172a', padding: '1.2rem', borderRadius: 12, border: '1px solid #1e293b' }}>
                <code style={{ fontSize: '1rem', color: '#ffb454', fontWeight: 'bold' }}>?: (Conditional Ternary)</code>
                <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '0.3rem 0 0.6rem 0' }}>One-liner conditional checking: <code>cond ? trueVal : falseVal</code>.</p>
                <SyntaxHighlighter code={`let access = (age >= 18) ? "Yes" : "No";`} />
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_expressions')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* EXPRESSIONS */}
      {activeTab === 'js_expressions' && (
        <Section key="js_expressions" id="js_expressions" eyebrow="Syllabus 02" title="JavaScript Expressions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>An **expression** is any valid unit of code that evaluates to a single value. Expressions are the primary building blocks of computations and assignments in JavaScript.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '2rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Simple Expressions</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                  Literal values, variables, and basic arithmetic operations that evaluate quickly.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`5;           // Evaluates to 5
"hello";     // Evaluates to "hello"
let x = 10;
x;           // Evaluates to 10
5 + 3;       // Evaluates to 8`} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04' }}>Complex Expressions</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1rem' }}>
                  Expressions calling functions, utilizing variables inside math objects, or creating key-value objects.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let x = 8, y = 16;
let z = Math.sqrt(x * y); // Evaluates to 12.8

Math.random(); // Returns random float 0-1
let obj = { name: "Alice", age: 30 };`} />
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_mistakes')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* COMMON MISTAKES */}
      {activeTab === 'js_mistakes' && (
        <Section key="js_mistakes" id="js_mistakes" eyebrow="Syllabus 03" title="Common Operators Pitfalls">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>JavaScript's dynamic nature makes it flexible, but it introduces subtle bugs that trick beginners. Review these common pitfalls to write clean code:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#fffbeb', borderLeft: '4px solid #d97706', borderRadius: '4px 12px 12px 4px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#9d174d' }}>1. Loose Equality vs Strict Equality with Null/Undefined</h4>
                <p style={{ fontSize: '0.9rem', margin: '0 0 0.8rem 0' }}>
                  Loose equality <code>null == undefined</code> evaluates to <code>true</code>. However, strict equality <code>null === undefined</code> evaluates to <code>false</code> because they represent distinct data types.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`console.log(null == undefined);  // true
console.log(null === undefined); // false`} />
                </div>
              </div>

              <div style={{ padding: '1.5rem', background: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '4px 12px 12px 4px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#991b1b' }}>2. Prefix vs Postfix Unary Increment</h4>
                <p style={{ fontSize: '0.9rem', margin: '0 0 0.8rem 0' }}>
                  Prefix (<code>++x</code>) increments the value immediately and returns the incremented value. Postfix (<code>x++</code>) returns the original value first, and *then* increments it.
                </p>
                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: 8 }}>
                  <SyntaxHighlighter code={`let x = 5;
let y = x++; // y is 5, x is now 6
let z = ++x; // z is 7, x is now 7`} />
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_calculator')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Continue (+10 XP) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* CALCULATOR INTERACTIVE DEMO (WITHOUT FUNCTIONS) */}
      {activeTab === 'js_calculator' && (
        <Section key="js_calculator" id="js_calculator" eyebrow="Syllabus 04" title="Live Coding: Operator-Driven Calculator Program">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Study this calculator program. In accordance with strict guidelines, **no custom JavaScript function wrappers are defined**. Instead, click event listeners directly execute assignments (<code>=</code>) and string concatenation (<code>+</code>) operators to compute results.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '1.5rem', marginTop: '2rem' }}>
              
              {/* CALCULATOR INTERFACE */}
              <div style={{ background: '#1e293b', padding: '1.8rem', borderRadius: 24, boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '100%', maxWidth: '320px', boxSizing: 'border-box', margin: '0 auto' }}>
                
                {/* DISPLAY */}
                <input
                  type="text"
                  value={calcDisplay}
                  readOnly
                  placeholder="0"
                  style={{ width: '100%', height: '60px', background: '#0f172a', border: 'none', borderRadius: 12, color: '#f8fafc', fontFamily: 'monospace', fontSize: '1.8rem', padding: '0 1rem', textAlign: 'right', outline: 'none', marginBottom: '1.5rem', boxSizing: 'border-box' }}
                />

                {/* GRID OF BUTTONS WITH INLINE EXPRESSIONS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  <button 
                    onClick={() => {
                      setCalcDisplay('');
                      setActiveCodeSection('clear');
                    }} 
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
                  >C</button>
                  <button 
                    onClick={() => {
                      setCalcDisplay(prev => prev.slice(0, -1));
                      setActiveCodeSection('delete');
                    }} 
                    style={{ background: '#475569', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
                  >DEL</button>
                  <button 
                    onClick={() => {
                      setCalcDisplay(prev => prev + '%');
                      setActiveCodeSection('append');
                    }} 
                    style={{ background: '#475569', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
                  >%</button>
                  <button 
                    onClick={() => {
                      setCalcDisplay(prev => prev + '/');
                      setActiveCodeSection('append');
                    }} 
                    style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
                  >/</button>

                  <button onClick={() => { setCalcDisplay(prev => prev + '7'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>7</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '8'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>8</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '9'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>9</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '*'); setActiveCodeSection('append'); }} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>*</button>

                  <button onClick={() => { setCalcDisplay(prev => prev + '4'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>4</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '5'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>5</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '6'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>6</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '-'); setActiveCodeSection('append'); }} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>-</button>

                  <button onClick={() => { setCalcDisplay(prev => prev + '1'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>1</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '2'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>2</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '3'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>3</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '+'); setActiveCodeSection('append'); }} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>+</button>

                  <button onClick={() => { setCalcDisplay(prev => prev + '0'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', gridColumn: 'span 2' }}>0</button>
                  <button onClick={() => { setCalcDisplay(prev => prev + '.'); setActiveCodeSection('append'); }} style={{ background: '#334155', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>.</button>
                  <button 
                    onClick={() => {
                      setActiveCodeSection('eval');
                      try {
                        const sanitized = calcDisplay.replace(/[^0-9+\-*/%.()]/g, '');
                        setCalcDisplay(String(eval(sanitized)));
                      } catch (e) {
                        setCalcDisplay('Error');
                      }
                    }} 
                    style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px 0', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
                  >=</button>
                </div>
              </div>

              {/* DYNAMIC LINEAR SOURCE CODE DISPLAY */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', overflowX: 'auto', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><FileCode2 size={12} /> linear_statements.js</span>
                  <SyntaxHighlighter code={`// Live Operator Executions (without custom function wrappers)

${activeCodeSection === 'append' ? '▶ ' : '  '}// 1. Appending Characters:
${activeCodeSection === 'append' ? '▶ ' : '  '}// Uses String Concatenation (+) and Assignment (=) operators
${activeCodeSection === 'append' ? '▶ ' : '  '}display.value = display.value + clickedKey; 

${activeCodeSection === 'delete' ? '▶ ' : '  '}// 2. Delete Last Character:
${activeCodeSection === 'delete' ? '▶ ' : '  '}// Uses String Slicing and Assignment (=) operators
${activeCodeSection === 'delete' ? '▶ ' : '  '}display.value = display.value.slice(0, -1);

${activeCodeSection === 'clear' ? '▶ ' : '  '}// 3. Clear Screen:
${activeCodeSection === 'clear' ? '▶ ' : '  '}// Reassigns display to empty literal string
${activeCodeSection === 'clear' ? '▶ ' : '  '}display.value = "";

${activeCodeSection === 'eval' ? '▶ ' : '  '}// 4. Evaluate Expression:
${activeCodeSection === 'eval' ? '▶ ' : '  '}// Evaluates math operator characters inside display string
${activeCodeSection === 'eval' ? '▶ ' : '  '}display.value = String(eval(display.value));`} />
                </div>
              </div>

            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '2rem', marginBottom: '0.8rem' }}>💾 Mini Project: Copy-Pasteable Source Code</h3>
            <p>To run this project locally on your machine, create a new file named <code>index.html</code>, copy the complete code block below, save it, and double-click to open it in your browser. Notice how all operators are executed inline without a single custom JS function wrapper:</p>

            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: 16, border: '1px solid #1e293b', overflowX: 'auto', marginBottom: '2rem' }}>
              <SyntaxHighlighter lang="html" code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Operator Calculator (No Functions)</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #0f172a;
      font-family: sans-serif;
      margin: 0;
    }
    .calculator {
      background: #1e293b;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      width: 280px;
    }
    #display {
      width: 100%;
      height: 50px;
      background: #0f172a;
      color: #f8fafc;
      font-size: 1.5rem;
      text-align: right;
      padding: 5px 10px;
      border: none;
      border-radius: 8px;
      box-sizing: border-box;
      margin-bottom: 15px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    button {
      padding: 15px;
      font-size: 1.1rem;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background: #334155;
      color: white;
    }
    button:hover { background: #475569; }
    .op { background: #ca8a04; }
    .op:hover { background: #eab308; }
    .clear { background: #ef4444; }
    .clear:hover { background: #f87171; }
    .eq { background: #10b981; }
    .eq:hover { background: #34d399; }
  </style>
</head>
<body>

  <div class="calculator">
    <!-- Value retrieval display input -->
    <input type="text" id="display" readonly placeholder="0">

    <div class="grid">
      <!-- C Button: Assigns empty string -->
      <button class="clear" onclick="document.getElementById('display').value = ''">C</button>
      
      <!-- DEL Button: Slice assignment operator -->
      <button onclick="document.getElementById('display').value = document.getElementById('display').value.slice(0, -1)">DEL</button>
      
      <!-- Modulus operator -->
      <button onclick="document.getElementById('display').value += '%'">%</button>
      
      <!-- Division operator -->
      <button class="op" onclick="document.getElementById('display').value += '/'">/</button>

      <!-- Digit and Operators: Concatenation operations -->
      <button onclick="document.getElementById('display').value += '7'">7</button>
      <button onclick="document.getElementById('display').value += '8'">8</button>
      <button onclick="document.getElementById('display').value += '9'">9</button>
      <button class="op" onclick="document.getElementById('display').value += '*'">*</button>

      <button onclick="document.getElementById('display').value += '4'">4</button>
      <button onclick="document.getElementById('display').value += '5'">5</button>
      <button onclick="document.getElementById('display').value += '6'">6</button>
      <button class="op" onclick="document.getElementById('display').value += '-'">-</button>

      <button onclick="document.getElementById('display').value += '1'">1</button>
      <button onclick="document.getElementById('display').value += '2'">2</button>
      <button onclick="document.getElementById('display').value += '3'">3</button>
      <button class="op" onclick="document.getElementById('display').value += '+'">+</button>

      <button style="grid-column: span 2" onclick="document.getElementById('display').value += '0'">0</button>
      <button onclick="document.getElementById('display').value += '.'">.</button>
      
      <!-- Equal button: Runs evaluation directly -->
      <button class="eq" onclick="try { document.getElementById('display').value = eval(document.getElementById('display').value); } catch(err) { document.getElementById('display').value = 'Error'; }">=</button>
    </div>
  </div>

</body>
</html>`} />
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('js_playground')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Live Coding Lab <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: LIVE CODING PLAYGROUND ════════════════ */}
      {activeTab === 'js_playground' && (
        <Section key="js_playground" id="js_playground" eyebrow="Playground" title="JavaScript Live Coding Lab">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Write your own JavaScript code in the editor on the left and see console logs in the output terminal on the right. Experiment with loops, functions, variables, and math operators!</p>
            <JSLiveEditor dayKey="day2" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ASSIGNMENT */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 2 Assignment: JS Operators">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Practice Tasks</h3>
            <p>Paste your answers in the script input field below. Submit your assignment to save variables.</p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 12, borderLeft: '4px solid #ca8a04', margin: '1.5rem 0' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Task Requirements:</h4>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                <li>Write a statement demonstrating addition assignment (<code>+=</code>) and exponentiation (<code>**</code>) operators.</li>
                <li>Write a JavaScript expression using ternary conditional operators (<code>?:</code>) checking if standard input is null or undefined.</li>
                <li>Explain in a comment block the difference between postfix <code>x++</code> and prefix <code>++x</code> operations.</li>
              </ol>
            </div>

            <textarea
              value={assignmentText}
              onChange={e => setAssignmentText(e.target.value)}
              disabled={assignmentSubmitted}
              placeholder="Paste your code script and explanations here..."
              style={{ width: '100%', height: '180px', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
            />
            
            <button
              onClick={() => setAssignmentSubmitted(true)}
              disabled={assignmentSubmitted || !assignmentText.trim()}
              style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {assignmentSubmitted ? 'Submitted!' : 'Submit Assignment'}
            </button>

            {assignmentSubmitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginTop: '1rem', fontWeight: 600 }}>
                <CheckCircle size={18} /> Assignment submitted successfully!
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ── ARITHMETIC OPERATORS ──────────────────────────────────────── */}
      {activeTab === 'js_arithmetic' && (
        <Section key="js_arithmetic" id="js_arithmetic" eyebrow="Day 2 • Operators" title="Arithmetic Operators">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>➕ What are Arithmetic Operators?</h3>
              <p style={{ opacity: 0.9 }}>Arithmetic operators perform mathematical calculations on numbers — just like a calculator!</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <thead>
                  <tr>
                    {['Operator', 'Name', 'Example', 'Result'].map(h => (
                      <th key={h} style={{ background: '#0284c7', color: 'white', padding: '12px 16px', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['+', 'Addition', '10 + 3', '13'],
                    ['-', 'Subtraction', '10 - 3', '7'],
                    ['*', 'Multiplication', '10 * 3', '30'],
                    ['/', 'Division', '10 / 3', '3.333...'],
                    ['%', 'Modulus (Remainder)', '10 % 3', '1'],
                    ['**', 'Exponentiation', '2 ** 4', '16'],
                    ['++', 'Increment', 'let x=5; x++', '6'],
                    ['--', 'Decrement', 'let x=5; x--', '4'],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0', fontFamily: j === 0 || j === 2 ? 'monospace' : 'inherit', fontWeight: j === 0 ? 800 : 400, color: j === 0 ? '#0284c7' : '#374151', fontSize: j === 0 ? '1.1rem' : '0.9rem' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9, margin: '1.5rem 0' }}>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>let</span> a = <span style={{ color: '#fbbf24' }}>10</span>, b = <span style={{ color: '#fbbf24' }}>3</span>;</div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(a + b);&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// 13</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(a - b);&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// 7</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(a * b);&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// 30</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(a / b);&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// 3.333</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(a % b);&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// 1 (remainder)</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(<span style={{ color: '#fbbf24' }}>2</span> ** <span style={{ color: '#fbbf24' }}>4</span>);&nbsp;<span style={{ color: '#8892b0' }}>// 16 (2^4)</span></div>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#0284c7', borderColor: '#0284c7', marginTop: '1rem' }} onClick={() => onNavigate('js_module2', 'js_assignment_ops')}>
              Next: Assignment Operators <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── ASSIGNMENT OPERATORS ──────────────────────────────────────── */}
      {activeTab === 'js_assignment_ops' && (
        <Section key="js_assignment_ops" id="js_assignment_ops" eyebrow="Day 2 • Operators" title="Assignment Operators">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Assignment operators assign values to variables. The basic one is <code>=</code>, but there are shorthand versions that combine assignment with arithmetic.</p>
            <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <thead>
                  <tr>{['Operator', 'Example', 'Equivalent To', 'Description'].map(h => <th key={h} style={{ background: '#059669', color: 'white', padding: '12px 16px', textAlign: 'left' }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['=', 'x = 5', 'x = 5', 'Assign value'],
                    ['+=', 'x += 3', 'x = x + 3', 'Add and assign'],
                    ['-=', 'x -= 3', 'x = x - 3', 'Subtract and assign'],
                    ['*=', 'x *= 3', 'x = x * 3', 'Multiply and assign'],
                    ['/=', 'x /= 3', 'x = x / 3', 'Divide and assign'],
                    ['%=', 'x %= 3', 'x = x % 3', 'Modulus and assign'],
                    ['**=', 'x **= 2', 'x = x ** 2', 'Exponent and assign'],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                      {row.map((cell, j) => <td key={j} style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0', fontFamily: j < 3 ? 'monospace' : 'inherit', fontWeight: j === 0 ? 800 : 400, color: j === 0 ? '#059669' : '#374151' }}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.9 }}>
              <div><span style={{ color: '#ff7b72', fontWeight: 700 }}>let</span> score = <span style={{ color: '#fbbf24' }}>100</span>;</div>
              <div>score += <span style={{ color: '#fbbf24' }}>10</span>;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// score is now 110</span></div>
              <div>score -= <span style={{ color: '#fbbf24' }}>20</span>;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// score is now 90</span></div>
              <div>score *= <span style={{ color: '#fbbf24' }}>2</span>;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// score is now 180</span></div>
              <div>score /= <span style={{ color: '#fbbf24' }}>3</span>;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8892b0' }}>// score is now 60</span></div>
              <div><span style={{ color: '#c084fc', fontWeight: 700 }}>console</span>.<span style={{ color: '#7ee787' }}>log</span>(score);&nbsp;<span style={{ color: '#8892b0' }}>// 60</span></div>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#059669', borderColor: '#059669', marginTop: '1.5rem' }} onClick={() => onNavigate('js_module2', 'js_comparison')}>
              Next: Comparison Operators <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── COMPARISON OPERATORS ──────────────────────────────────────── */}
      {activeTab === 'js_comparison' && (
        <Section key="js_comparison" id="js_comparison" eyebrow="Day 2 • Operators" title="Comparison Operators">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Comparison operators compare two values and return a <strong>boolean</strong> — either <code>true</code> or <code>false</code>. They are used in conditions (if statements).</p>
            <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <thead>
                  <tr>{['Operator', 'Name', 'Example', 'Result'].map(h => <th key={h} style={{ background: '#7c3aed', color: 'white', padding: '12px 16px', textAlign: 'left' }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['==', 'Equal (loose)', '5 == "5"', 'true'],
                    ['===', 'Strict Equal', '5 === "5"', 'false'],
                    ['!=', 'Not Equal (loose)', '5 != 3', 'true'],
                    ['!==', 'Strict Not Equal', '5 !== "5"', 'true'],
                    ['>', 'Greater Than', '10 > 5', 'true'],
                    ['<', 'Less Than', '10 < 5', 'false'],
                    ['>=', 'Greater or Equal', '5 >= 5', 'true'],
                    ['<=', 'Less or Equal', '4 <= 5', 'true'],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                      {row.map((cell, j) => <td key={j} style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0', fontFamily: j < 3 ? 'monospace' : 'inherit', fontWeight: j === 0 ? 800 : 400, color: j === 0 ? '#7c3aed' : j === 3 ? (cell === 'true' ? '#059669' : '#dc2626') : '#374151' }}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: '12px', padding: '1.25rem' }}>
              <strong style={{ color: '#713f12' }}>⚡ == vs === (Important!):</strong>
              <ul style={{ paddingLeft: '1.5rem', color: '#78350f', lineHeight: 2, marginTop: '8px' }}>
                <li><code>==</code> checks value only — does type conversion: <code>5 == "5"</code> → <strong>true</strong></li>
                <li><code>===</code> checks value AND type — no conversion: <code>5 === "5"</code> → <strong>false</strong></li>
                <li>Always prefer <code>===</code> (strict equality) to avoid unexpected bugs!</li>
              </ul>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', marginTop: '1.5rem' }} onClick={() => onNavigate('js_module2', 'js_logical')}>
              Next: Logical Operators <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── LOGICAL OPERATORS ────────────────────────────────────────── */}
      {activeTab === 'js_logical' && (
        <Section key="js_logical" id="js_logical" eyebrow="Day 2 • Operators" title="Logical Operators">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Logical operators combine multiple boolean expressions. Used in if statements to check multiple conditions at once.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
              {[
                { op: '&&', name: 'AND', rule: 'true ONLY if BOTH sides are true', color: '#0284c7', bg: '#eff6ff', border: '#93c5fd', example: 'age >= 18 && hasID → Both must be true' },
                { op: '||', name: 'OR', rule: 'true if AT LEAST ONE side is true', color: '#059669', bg: '#f0fdf4', border: '#86efac', example: 'isAdmin || isMod → Either is enough' },
                { op: '!', name: 'NOT', rule: 'Reverses/flips a boolean value', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', example: '!isLoggedIn → true becomes false' },
              ].map(item => (
                <div key={item.op} style={{ flex: '1 1 200px', background: item.bg, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '2rem', fontFamily: 'monospace', fontWeight: 800, color: item.color }}>{item.op}</div>
                  <div style={{ fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '8px' }}>{item.rule}</div>
                  <code style={{ fontSize: '0.8rem', color: item.color, background: 'rgba(0,0,0,0.05)', padding: '4px 8px', borderRadius: '4px', display: 'block' }}>{item.example}</code>
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '1rem 0' }}>Truth Tables</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#f8fafc', lineHeight: 1.9 }}>
                <div style={{ color: '#79c0ff', fontWeight: 700 }}>// AND (&&)</div>
                <div><span style={{ color: '#ff7b72' }}>true</span> && <span style={{ color: '#ff7b72' }}>true</span>&nbsp;&nbsp;= <span style={{ color: '#7ee787' }}>true</span></div>
                <div><span style={{ color: '#ff7b72' }}>true</span> && <span style={{ color: '#f87171' }}>false</span> = <span style={{ color: '#f87171' }}>false</span></div>
                <div><span style={{ color: '#f87171' }}>false</span> && <span style={{ color: '#ff7b72' }}>true</span>&nbsp;= <span style={{ color: '#f87171' }}>false</span></div>
                <div><span style={{ color: '#f87171' }}>false</span> && <span style={{ color: '#f87171' }}>false</span>= <span style={{ color: '#f87171' }}>false</span></div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#f8fafc', lineHeight: 1.9 }}>
                <div style={{ color: '#79c0ff', fontWeight: 700 }}>// OR (||)</div>
                <div><span style={{ color: '#ff7b72' }}>true</span> || <span style={{ color: '#ff7b72' }}>true</span>&nbsp;&nbsp;= <span style={{ color: '#7ee787' }}>true</span></div>
                <div><span style={{ color: '#ff7b72' }}>true</span> || <span style={{ color: '#f87171' }}>false</span> = <span style={{ color: '#7ee787' }}>true</span></div>
                <div><span style={{ color: '#f87171' }}>false</span> || <span style={{ color: '#ff7b72' }}>true</span>&nbsp;= <span style={{ color: '#7ee787' }}>true</span></div>
                <div><span style={{ color: '#f87171' }}>false</span> || <span style={{ color: '#f87171' }}>false</span>= <span style={{ color: '#f87171' }}>false</span></div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', marginTop: '1.5rem' }} onClick={() => onNavigate('js_module2', 'js_user_interaction')}>
              Next: alert / prompt / confirm <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── USER INTERACTION ─────────────────────────────────────────── */}
      {activeTab === 'js_user_interaction' && (
        <Section key="js_user_interaction" id="js_user_interaction" eyebrow="Day 2 • User Interaction" title="alert() / prompt() / confirm()">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '16px', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>🖱️ Browser Dialog Functions</h3>
              <p style={{ opacity: 0.9 }}>JavaScript provides 3 built-in functions to interact with users through browser dialog boxes. These are the simplest forms of user input/output.</p>
            </div>
            {[
              { fn: 'alert()', icon: '⚠️', color: '#d97706', bg: '#fffbeb', border: '#fcd34d', desc: 'Displays a message box with an OK button. Used to show information to the user.', code: `alert("Welcome to JavaScript!");\nalert("Your session will expire soon.");`, returns: 'Returns nothing (undefined)' },
              { fn: 'prompt()', icon: '✏️', color: '#0284c7', bg: '#eff6ff', border: '#93c5fd', desc: 'Displays a dialog with a text input field asking the user for input. Returns the typed value as a string.', code: `let name = prompt("What is your name?");\nconsole.log("Hello, " + name);\n\n// With default value:\nlet age = prompt("Enter your age:", "18");`, returns: 'Returns the user\'s input as a String, or null if cancelled' },
              { fn: 'confirm()', icon: '✅', color: '#059669', bg: '#f0fdf4', border: '#86efac', desc: 'Displays a dialog with OK and Cancel buttons. Returns true if OK is clicked, false if Cancel.', code: `let result = confirm("Are you sure you want to delete?");\nif (result) {\n  console.log("Deleted!");\n} else {\n  console.log("Cancelled.");\n}`, returns: 'Returns true (OK) or false (Cancel)' },
            ].map(item => (
              <div key={item.fn} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 800, color: item.color, fontSize: '1.1rem' }}>{item.fn}</div>
                    <div style={{ fontSize: '0.85rem', color: '#374151' }}>{item.desc}</div>
                  </div>
                </div>
                <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#f8fafc', whiteSpace: 'pre', lineHeight: 1.7 }}>{item.code}</div>
                <div style={{ marginTop: '8px', fontSize: '0.82rem', color: item.color, fontWeight: 600 }}>↩️ {item.returns}</div>
              </div>
            ))}
            <button className="btn btn-primary" style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', marginTop: '1rem' }} onClick={() => onNavigate('js_module2', 'quiz')}>
              Next: Quiz <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* ── DAY 2 QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d2" id="quiz_d2" eyebrow="Day 2 • Assessment" title="Day 2 Quiz: Operators & Interaction">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'What does the % (modulus) operator return?', opts: ['The quotient', 'The remainder after division', 'The square root', 'The exponent'], ans: 1 },
              { q: 'What is the difference between == and ===?', opts: ['No difference', '=== also checks data type', '== is stricter', '=== returns a string'], ans: 1 },
              { q: 'What does prompt() return if the user clicks Cancel?', opts: ['false', 'undefined', 'null', 'empty string'], ans: 2 },
              { q: 'Which logical operator returns true only if BOTH conditions are true?', opts: ['||', '!', '&&', '??'], ans: 2 },
              { q: 'What does x += 5 mean?', opts: ['x = 5', 'x = x - 5', 'x = x + 5', 'x = 5 + x only if x is 0'], ans: 2 },
            ].map((item, qi) => (
              <JSDayQuizQuestion key={qi} item={item} qi={qi} buttonColor="#0284c7" />
            ))}
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}