import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Terminal, PenTool, Layers, Zap, RefreshCw } from 'lucide-react';
import JSLiveEditor from '../../components/JSLiveEditor';
import JSDayQuizQuestion from '../../components/JSDayQuizQuestion';

// ─────────────────────────────────────────────────────────────────────────────
// Syntax Highlighter
// ─────────────────────────────────────────────────────────────────────────────
const SyntaxHighlighter = ({ code }) => {
  const lines = code.split('\n');
  return (
    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.6 }}>
      {lines.map((line, idx) => {
        // Comments
        if (line.trim().startsWith('//')) {
          return <div key={idx} style={{ color: '#64748b' }}>{line}</div>;
        }
        return <div key={idx}>{line}</div>;
      })}
    </pre>
  );
};

const Section = ({ children, eyebrow, title }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.25 }}
    className="section-card"
  >
    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const CB = ({ code }) => (
  <div style={{ background: '#0f172a', padding: '1.2rem 1.5rem', borderRadius: 12, overflowX: 'auto', margin: '0.8rem 0', border: '1px solid #1e293b' }}>
    <SyntaxHighlighter code={code} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function JSDay7({ activeTab, onNavigate }) {
  const go = (tab) => { onNavigate('js_module7', tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // ── Product List State ──
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Laptop', price: 89999, category: 'Electronics' },
    { id: 2, name: 'Running Shoes', price: 4999, category: 'Footwear' },
    { id: 3, name: 'Coffee Mug', price: 499, category: 'Kitchen' },
    { id: 4, name: 'Bluetooth Headphones', price: 7999, category: 'Electronics' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // ── Student List State ──
  const [students, setStudents] = useState([
    { name: 'Alice', marks: 92 },
    { name: 'Bob', marks: 45 },
    { name: 'Charlie', marks: 78 },
    { name: 'Diana', marks: 61 },
    { name: 'Evan', marks: 38 },
  ]);
  const [newName, setNewName] = useState('');
  const [newMarks, setNewMarks] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name');

  const [submitted, setSubmitted] = useState(false);
  const [assignVal, setAssignVal] = useState('');

  const addStudent = () => {
    const m = Number(newMarks);
    if (newName.trim() && !isNaN(m) && m >= 0 && m <= 100) {
      setStudents(prev => [...prev, { name: newName.trim(), marks: m }]);
      setNewName(''); setNewMarks('');
    }
  };
  const removeStudent = (idx) => setStudents(prev => prev.filter((_, i) => i !== idx));

  const filteredStudents = students
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortKey === 'name' ? a.name.localeCompare(b.name) : b.marks - a.marks);

  const classAvg = students.length ? (students.reduce((s, st) => s + st.marks, 0) / students.length).toFixed(1) : 0;
  const topStudent = students.length ? students.reduce((a, b) => a.marks > b.marks ? a : b) : null;

  return (
    <AnimatePresence mode="wait">

      {/* ════════════ TAB: STRING METHODS ════════════ */}
      {activeTab === 'js_string_methods' && (
        <Section eyebrow="Syllabus 01" title="JavaScript String Methods">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Strings are primitive values in JavaScript, but JavaScript provides built-in wrapper methods to search, modify, and manipulate string text easily.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. Changing Case</h3>
            <p>Convert text to uppercase or lowercase:</p>
            <CB code={`let text = "Hello World";
console.log(text.toUpperCase()); // "HELLO WORLD"
console.log(text.toLowerCase()); // "hello world"`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. Searching & Checking Content</h3>
            <p>Check if a string includes a substring, starts with, or ends with a specific sequence:</p>
            <CB code={`let message = "Welcome to JavaScript!";

console.log(message.includes("Java")); // true
console.log(message.startsWith("Wel")); // true
console.log(message.indexOf("to")); // 8`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>3. Extracting Parts & Replacing</h3>
            <p>Extract sections using <code>slice()</code> or replace characters using <code>replace()</code>:</p>
            <CB code={`let str = "Apple, Banana, Mango";
// slice(start, end)
console.log(str.slice(7, 13)); // "Banana"

let text = "I love Java!";
console.log(text.replace("Java", "JS")); // "I love JS!"`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>4. Splitting & Trimming</h3>
            <p>Split a string into an array, or trim whitespace from the ends:</p>
            <CB code={`let fruitsStr = "Apple,Banana,Mango";
let fruitsArr = fruitsStr.split(",");
console.log(fruitsArr); // ["Apple", "Banana", "Mango"]

let dirtyText = "   hello   ";
console.log(dirtyText.trim()); // "hello"`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_array_iteration')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Array Iteration <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: ARRAY ITERATION ════════════ */}
      {activeTab === 'js_array_iteration' && (
        <Section eyebrow="Syllabus 02" title="Array Iteration Methods">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>Array iteration refers to running a function over each element of an array. Unlike classic loops, iteration methods are more readable and expressive.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>1. find() & findIndex()</h3>
            <p>Finds the first element that satisfies a condition, or its index:</p>
            <CB code={`let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

let user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }

let idx = users.findIndex(u => u.name === "Bob");
console.log(idx); // 1`} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>2. some() & every()</h3>
            <p>Check if <em>any</em> or <em>all</em> elements pass a condition (returns true or false):</p>
            <CB code={`let ages = [18, 22, 16, 30];

// Are any users underage?
let hasUnderage = ages.some(age => age < 18);
console.log(hasUnderage); // true

// Are all users adults?
let allAdults = ages.every(age => age >= 18);
console.log(allAdults); // false`} />

            <div style={{ background: '#f8fafc', padding: '1.2rem 1.5rem', borderRadius: 12, border: '1px solid #cbd5e1', margin: '1.5rem 0' }}>
              <strong>Looping with for...of vs Iteration Methods:</strong>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.4rem' }}>
                While <code>for...of</code> is a standard block loop, iteration helpers like <code>find()</code>, <code>some()</code>, and <code>every()</code> accept inline predicate callbacks to execute evaluation code in a single line.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_map_filter')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: map() & filter() <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: MAP & FILTER ════════════ */}
      {activeTab === 'js_map_filter' && (
        <Section eyebrow="Syllabus 03" title="map(), filter() & forEach()">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>These three methods are the most commonly used array iteration tools in modern JavaScript, particularly when building web user interfaces (like in React).</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ border: '1px solid #bfdbfe', background: '#eff6ff', padding: '1rem', borderRadius: 12 }}>
                <strong style={{ color: '#1e40af' }}>1. forEach()</strong>
                <p style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>Executes a function on each element. It does <strong>not</strong> return a new array.</p>
              </div>
              <div style={{ border: '1px solid #c084fc', background: '#faf5ff', padding: '1rem', borderRadius: 12 }}>
                <strong style={{ color: '#6b21a8' }}>2. map()</strong>
                <p style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>Creates a <strong>new array</strong> with the results of calling a function on every element.</p>
              </div>
              <div style={{ border: '1px solid #86efac', background: '#f0fdf4', padding: '1rem', borderRadius: 12 }}>
                <strong style={{ color: '#166534' }}>3. filter()</strong>
                <p style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>Creates a <strong>new array</strong> containing only elements that pass a condition.</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem' }}>Example Comparisons</h3>
            <CB code={`let numbers = [1, 2, 3, 4];

// forEach — just prints
numbers.forEach(n => console.log(n * 2)); 

// map — returns doubled numbers
let doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]

// filter — returns only numbers greater than 2
let filtered = numbers.filter(n => n > 2);
console.log(filtered); // [3, 4]`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_product_list')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Product List Catalog <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════ TAB: PRODUCT LIST MINI PROJECT ════════════ */}
      {activeTab === 'js_product_list' && (
        <Section eyebrow="Mini Project" title="Interactive Product Catalog">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>This mini project showcases how to use <code>.filter()</code> and <code>.map()</code> to build an interactive searchable catalog of products.</p>
            
            {/* Search and Filters */}
            <div style={{ background: '#f8fafc', padding: '1.2rem', border: '1px solid #cbd5e1', borderRadius: 12, display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
              <input placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1, minWidth: '150px' }} />
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, minWidth: '130px' }}>
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Footwear">Footwear</option>
                <option value="Kitchen">Kitchen</option>
              </select>
            </div>

            {/* List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {products
                .filter(p => {
                  const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchCat = filterCategory === 'All' || p.category === filterCategory;
                  return matchSearch && matchCat;
                })
                .map(p => (
                  <div key={p.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>{p.category}</span>
                    <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>{p.name}</strong>
                    <div style={{ color: '#ca8a04', fontWeight: 800 }}>₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                ))}
            </div>

            {/* Source Code */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '2rem' }}>📋 Source Code</h3>
            <CB code={`let products = [
  { id: 1, name: 'Premium Laptop', price: 89999, category: 'Electronics' },
  { id: 2, name: 'Running Shoes', price: 4999, category: 'Footwear' },
  { id: 3, name: 'Coffee Mug', price: 499, category: 'Kitchen' }
];

// 1. Filter products by search and category
let query = "${searchQuery}";
let category = "${filterCategory}";

let filtered = products.filter(p => {
  let matchSearch = p.name.toLowerCase().includes(query.toLowerCase());
  let matchCat = category === "All" || p.category === category;
  return matchSearch && matchCat;
});

// 2. Render list using map
let listHTML = filtered.map(p => {
  return \`<div>\${p.name} - ₹\${p.price}</div>\`;
}).join("");`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_miniproject5')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Student List Manager <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB: STUDENT LIST MANAGER (MINI PROJECT) ════════════════ */}
      {activeTab === 'js_miniproject5' && (
        <Section eyebrow="Mini Project" title="Student List Manager">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>This mini project combines <strong>Math Functions</strong> (to compute average) and <strong>Array Methods</strong> (to add/remove students) to build a school grade list tracker.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', margin: '1.5rem 0', alignItems: 'start' }}>
              <div>
                {/* Add student form */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input placeholder="Student name..." value={newName} onChange={e => setNewName(e.target.value)}
                    style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 2 }} />
                  <input placeholder="Marks..." type="number" value={newMarks} onChange={e => setNewMarks(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addStudent()}
                    style={{ padding: '0.5rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1 }} />
                  <button onClick={addStudent} style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Add</button>
                </div>

                {/* Filter and Search */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input placeholder="Search name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8, flex: 1 }} />
                  <select value={sortKey} onChange={e => setSortKey(e.target.value)}
                    style={{ padding: '0.4rem 0.7rem', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                    <option value="name">Sort by Name</option>
                    <option value="marks">Sort by Marks (High-Low)</option>
                  </select>
                </div>

                {/* Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
                      <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left' }}>Student Name</th>
                      <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>Marks</th>
                      <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>Grade</th>
                      <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>Status</th>
                      <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((st, idx) => {
                      let grade = 'F';
                      if (st.marks >= 90) grade = 'A+';
                      else if (st.marks >= 80) grade = 'A';
                      else if (st.marks >= 70) grade = 'B';
                      else if (st.marks >= 60) grade = 'C';
                      else if (st.marks >= 50) grade = 'D';

                      return (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: st.marks < 50 ? '#fff5f5' : 'transparent' }}>
                          <td style={{ padding: '0.6rem 0.8rem', fontWeight: 600 }}>{st.name}</td>
                          <td style={{ padding: '0.6rem 0.8rem', textAlign: 'center', fontWeight: 700 }}>{st.marks}</td>
                          <td style={{ padding: '0.6rem 0.8rem', textAlign: 'center', fontWeight: 700, color: st.marks >= 50 ? '#16a34a' : '#dc2626' }}>{grade}</td>
                          <td style={{ padding: '0.6rem 0.8rem', textAlign: 'center', fontWeight: 700, color: st.marks >= 50 ? '#16a34a' : '#dc2626' }}>
                            {st.marks >= 50 ? 'Pass' : 'Fail'}
                          </td>
                          <td style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>
                            <button onClick={() => removeStudent(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 600 }}>Remove</button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No students found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Stats card */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a', fontWeight: 800 }}>📊 Grade Stats</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                  <div>Total Students: <strong>{students.length}</strong></div>
                  <div>Class Average: <strong style={{ color: '#ca8a04' }}>{classAvg}%</strong></div>
                  {topStudent && (
                    <div>Top Scorer: <strong>{topStudent.name}</strong> ({topStudent.marks}%)</div>
                  )}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>📋 Source Code</h3>
            <CB code={`let students = [\n  { name: "Alice", marks: 92 },\n  { name: "Bob", marks: 45 }\n];\n\n// 1. Add student\nstudents.push({ name: "Charlie", marks: 78 });\n\n// 2. Find Class Average\nlet sum = students.reduce((total, st) => total + st.marks, 0);\nlet avg = sum / students.length;\nconsole.log("Average Marks:", avg.toFixed(1));\n\n// 3. Find Top Student\nlet top = students.reduce((max, st) => st.marks > max.marks ? st : max, students[0]);\nconsole.log("Top Scorer:", top.name);`} />

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('js_playground')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
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
            <JSLiveEditor dayKey="day7" />
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── DAY 7 QUIZ ─────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz_d7" id="quiz_d7" eyebrow="Day 7 • Assessment" title="Day 7 Quiz: String & Array Methods">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {[
              { q: 'Which method returns the length of a string?', opts: ['length()', 'size', 'length', 'count'], ans: 2 },
              { q: 'Which string method checks if a substring exists within a string?', opts: ['contains()', 'search()', 'includes()', 'find()'], ans: 2 },
              { q: 'How does map() differ from forEach()?', opts: ['map() does not loop', 'map() returns a new array, while forEach() returns undefined', 'forEach() returns a new array, while map() returns undefined', 'There is no difference'], ans: 1 },
              { q: 'Which array method returns only elements that pass a specific test condition?', opts: ['map()', 'filter()', 'find()', 'reduce()'], ans: 1 },
              { q: 'What does array.some() return?', opts: ['The matching element', 'A new array', 'A boolean (true or false)', 'An index number'], ans: 2 },
            ].map((item, qi) => (
              <JSDayQuizQuestion key={qi} item={item} qi={qi} buttonColor="#ca8a04" />
            ))}
            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ backgroundColor: '#ca8a04', borderColor: '#ca8a04' }}>
                Next: Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ════════════════ TAB 5: ASSIGNMENT ════════════════ */}
      {activeTab === 'assignment' && (
        <Section eyebrow="Homework" title="Day 7 Assignment: String & Array Methods">
          <div className="panel" style={{ color: '#334155' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>📝 Tasks</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { no: 1, task: 'Write a function that accepts a string, converts it to uppercase, and checks if it contains the word "JAVASCRIPT".' },
                { no: 2, task: 'Use .slice() to extract the domain name from an email address (e.g., extract "gmail.com" from "user@gmail.com").' },
                { no: 3, task: 'Create an array of 5 names. Use .forEach() to log each name along with its index.' },
                { no: 4, task: 'Create an array of numbers. Use .map() to return a new array where each number is squared.' },
                { no: 5, task: 'Create an array of products with prices. Use .filter() to return only products that cost less than ₹1,000.' },
                { no: 6, task: 'Build an interactive webpage where users can input text and see its length, word count, and whether it includes a search query live.' }
              ].map(t => (
                <div key={t.no} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <span style={{ background: '#ca8a04', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{t.no}</span>
                  <span style={{ fontSize: '0.92rem', color: '#334155' }}>{t.task}</span>
                </div>
              ))}
            </div>

            <textarea
              value={assignVal}
              onChange={e => setAssignVal(e.target.value)}
              disabled={submitted}
              placeholder="Paste your code and answers here..."
              style={{ width: '100%', height: '200px', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: 12, fontFamily: 'monospace', outline: 'none', resize: 'none', boxSizing: 'border-box', fontSize: '0.9rem' }}
            />

            <button
              onClick={() => setSubmitted(true)}
              disabled={submitted || !assignVal.trim()}
              style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '.8rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {submitted ? 'Submitted ✅' : 'Submit Assignment'}
            </button>

            {submitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', marginTop: '1rem', fontWeight: 600 }}>
                <CheckCircle size={18} /> Assignment submitted successfully!
              </div>
            )}
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
