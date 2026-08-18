import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bug, Wand2, Layers, MessageSquare, Zap, ArrowRight,
  Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles,
  TrendingUp, Search, RotateCcw, AlertTriangle, FileCode, Check, Eye
} from 'lucide-react';

// ─── Course-specific content ─────────────────────────────────────────────────
const COURSE_DATA = {
  html: {
    label: 'HTML',
    color: '#e34c26',
    gradient: 'linear-gradient(135deg, #e34c26 0%, #f06529 100%)',
    lightBg: '#fff5f2',
    lightBorder: '#fca5a5',
    debugExamples: [
      { title: 'Broken Image Not Displaying', broken: '<img src="photo.jpg" alt="Profile">', prompt: 'Act as a senior HTML developer. My image is not displaying. Code:\n<img src="photo.jpg" alt="Profile">\nThe image is inside a folder called "images". What is wrong?', fix: '<img src="images/photo.jpg" alt="Profile">', explanation: 'The src path was missing the folder prefix "images/".' },
      { title: 'Form Not Submitting', broken: '<form>\n  <input type="text" name="email">\n  <button>Submit</button>\n</form>', prompt: 'Act as an HTML expert. My form is not submitting. Code:\n[paste code]\nI want it to POST to /submit. What attributes am I missing?', fix: '<form action="/submit" method="POST">\n  <input type="text" name="email">\n  <button type="submit">Submit</button>\n</form>', explanation: 'Missing action, method, and explicit button type="submit".' },
      { title: 'Link Opens in Same Tab', broken: '<a href="https://google.com">Visit Google</a>', prompt: 'How do I make an HTML link open in a new tab? My current code:\n<a href="https://google.com">Visit Google</a>', fix: '<a href="https://google.com" target="_blank" rel="noopener noreferrer">Visit Google</a>', explanation: 'Add target="_blank" and rel="noopener noreferrer" for security.' },
    ],
    uiPrompts: [
      { title: 'Navigation Bar', prompt: 'Create a responsive HTML navigation bar with a logo on the left, 5 nav links in the center, and a "Get Started" button on the right. Use semantic HTML5 elements.' },
      { title: 'Hero Section', prompt: 'Generate an HTML hero section with a large heading, a subtitle, two CTA buttons side by side, and a background image placeholder.' },
      { title: 'Contact Form', prompt: 'Create an accessible HTML contact form with: name, email, phone (optional), subject dropdown, message textarea, and a submit button. Include proper labels.' },
      { title: 'Product Card', prompt: 'Build an HTML product card with: image, badge "New Arrival", product name, star rating, price, and "Add to Cart" button.' },
      { title: 'Footer', prompt: 'Generate a 4-column HTML footer with: About section, Quick Links, Contact info, and Social media links. Include a copyright bar at the bottom.' },
      { title: 'Pricing Table', prompt: 'Create an HTML pricing table with 3 plans: Basic, Pro, Enterprise. Each card has a plan name, price, feature list with checkmarks, and a CTA button.' },
    ],
    componentSteps: [
      { step: 1, title: 'Describe the component', prompt: 'I need an HTML accordion component with 3 expandable sections, each with a question and answer.' },
      { step: 2, title: 'Request the structure', prompt: 'Generate the semantic HTML structure for this accordion using details and summary tags for accessibility.' },
      { step: 3, title: 'Ask for improvements', prompt: 'Now add ARIA attributes for better screen reader support and a data-index attribute to each item.' },
      { step: 4, title: 'Get validation tips', prompt: 'Check this HTML for validation issues: missing alt tags, heading hierarchy problems, and missing form labels.' },
    ]
  },
  css: {
    label: 'CSS',
    color: '#264de4',
    gradient: 'linear-gradient(135deg, #264de4 0%, #2965f1 100%)',
    lightBg: '#f0f4ff',
    lightBorder: '#a5b4fc',
    debugExamples: [
      { title: 'Flexbox Not Centering', broken: '.container {\n  display: flex;\n}\n.child {\n  margin: auto;\n}', prompt: 'Act as a CSS expert. My flexbox is not centering children vertically. Code:\n[paste code]\nContainer height is 400px. What am I missing?', fix: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 400px;\n}', explanation: 'Missing justify-content and align-items on the parent container.' },
      { title: 'Z-index Not Working', broken: '.modal {\n  position: relative;\n  z-index: 9999;\n}', prompt: 'My modal with z-index: 9999 still appears behind other elements. Code:\n[paste code]\nWhat is wrong with the z-index stacking?', fix: '.modal {\n  position: fixed;\n  z-index: 9999;\n}', explanation: 'z-index only works on positioned elements. Use position: fixed for modals.' },
      { title: 'Media Query Not Applying', broken: '@media screen and max-width: 768px {\n  .nav { display: none; }\n}', prompt: 'My CSS media query is not working. Code:\n@media screen and max-width: 768px { ... }\nWhat is the syntax error?', fix: '@media screen and (max-width: 768px) {\n  .nav { display: none; }\n}', explanation: 'Media query conditions must be wrapped in parentheses: (max-width: 768px).' },
    ],
    uiPrompts: [
      { title: 'Glassmorphism Card', prompt: 'Generate CSS for a glassmorphism card with frosted glass effect, subtle border, backdrop blur, and a soft shadow. Works on both light and dark backgrounds.' },
      { title: 'Animated Button', prompt: 'Create CSS for a premium button with: gradient background, scale transform on hover, ripple effect on click, and smooth box-shadow transition.' },
      { title: 'Dark Mode Theme', prompt: 'Generate CSS custom properties for a complete dark/light mode theme system with colors for background, text, cards, borders, and accents.' },
      { title: 'Responsive Grid', prompt: 'Create a CSS grid layout: 4 columns on desktop, 2 on tablet (768px), 1 on mobile (480px). Equal height cards.' },
      { title: 'Loading Spinner', prompt: 'Generate pure CSS for a modern loading spinner animation — a circle that rotates with a gradient stroke effect.' },
      { title: 'Gradient Text', prompt: 'Write CSS to create an animated gradient text effect where the gradient shifts colors continuously on an h1 heading.' },
    ],
    componentSteps: [
      { step: 1, title: 'Describe the UI element', prompt: 'I need CSS for a pricing card with a glowing border on hover, a badge at top right, and a featured variant with different background.' },
      { step: 2, title: 'Request base styles', prompt: 'Write the base CSS including layout, typography, and colors. Use CSS custom properties for theming.' },
      { step: 3, title: 'Add interactive states', prompt: 'Add the hover state with a glowing box-shadow, the featured variant class, and badge positioning.' },
      { step: 4, title: 'Make it responsive', prompt: 'Add media queries to make this card stack vertically on mobile screens under 480px.' },
    ]
  },
  js: {
    label: 'JavaScript',
    color: '#ca8a04',
    gradient: 'linear-gradient(135deg, #ca8a04 0%, #d97706 100%)',
    lightBg: '#fffbeb',
    lightBorder: '#fcd34d',
    debugExamples: [
      { title: 'Cannot Read Property of Undefined', broken: 'const user = null;\nconsole.log(user.name);', prompt: 'Act as a JavaScript debugger. Error: "Cannot read properties of undefined (reading name)". Code:\nconst user = null;\nconsole.log(user.name);\nHow do I fix this safely?', fix: 'const user = null;\nconsole.log(user?.name ?? "No name");\n// or use optional chaining:\nif (user) console.log(user.name);', explanation: 'Use optional chaining (?.) and nullish coalescing (??) to safely access properties.' },
      { title: 'Async/Await Not Working', broken: 'function getData() {\n  const data = fetch("/api/users");\n  console.log(data); // prints Promise\n}', prompt: 'My fetch call returns a Promise instead of data. Code:\n[paste code]\nWhy is it not returning actual data?', fix: 'async function getData() {\n  const response = await fetch("/api/users");\n  const data = await response.json();\n  console.log(data);\n}', explanation: 'fetch() returns a Promise. Use async/await and await response.json() to get real data.' },
      { title: 'Array Filter Returns Empty', broken: 'const nums = [1,2,3,4,5];\nconst evens = nums.filter(n => n / 2 === 0);\nconsole.log(evens); // []', prompt: 'My JavaScript filter returns an empty array. Code:\n[paste code]\nI want even numbers. What is wrong with my condition?', fix: 'const nums = [1,2,3,4,5];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens); // [2, 4]', explanation: 'Use modulus (%) not division (/). n % 2 === 0 checks if a number has no remainder.' },
    ],
    uiPrompts: [
      { title: 'Form Validation', prompt: 'Generate JavaScript for form validation: required fields check, email format, password strength (min 8 chars, 1 uppercase, 1 number), and real-time error messages.' },
      { title: 'Fetch with Error Handling', prompt: 'Write a JavaScript function that fetches data from an API URL, handles loading state, handles network errors gracefully, and returns parsed JSON.' },
      { title: 'Local Storage Manager', prompt: 'Create a JavaScript utility class for localStorage with methods: save(), get(), remove(), clear(), has(). Include expiry time support.' },
      { title: 'Debounce Function', prompt: 'Write a JavaScript debounce utility that delays function execution until after a wait time. Include a usage example with a search input.' },
      { title: 'Event Emitter', prompt: 'Generate a simple JavaScript EventEmitter class with on(), off(), emit(), and once() methods. Add JSDoc comments.' },
      { title: 'Infinite Scroll', prompt: 'Write JavaScript to implement infinite scroll — detect when user reaches the page bottom and load more items from an API.' },
    ],
    componentSteps: [
      { step: 1, title: 'Define the feature', prompt: 'I need a JavaScript shopping cart module with: add item, remove item, update quantity, get total, and persist to localStorage.' },
      { step: 2, title: 'Generate the class structure', prompt: 'Create the ShoppingCart class structure with all method signatures and constructor. Use ES6 classes.' },
      { step: 3, title: 'Implement each method', prompt: 'Now implement the addItem(product, qty) method — check if item exists and increase quantity, or add a new entry.' },
      { step: 4, title: 'Add persistence', prompt: 'Add localStorage save/load to the constructor and any method that modifies the cart. Handle JSON parse errors gracefully.' },
    ]
  },
  react: {
    label: 'React',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    lightBg: '#f0f9ff',
    lightBorder: '#bae6fd',
    debugExamples: [
      { title: 'Infinite Re-render Loop (useEffect)', broken: 'const [data, setData] = useState([]);\nuseEffect(() => {\n  fetchData().then(res => setData(res));\n}); // missing dependency array', prompt: 'Act as a React expert. My component is stuck in an infinite re-render loop. Code:\nconst [data, setData] = useState([]);\nuseEffect(() => {\n  fetchData().then(res => setData(res));\n});\nHow do I fix this?', fix: 'const [data, setData] = useState([]);\nuseEffect(() => {\n  fetchData().then(res => setData(res));\n}, []); // empty dependency array runs once on mount', explanation: 'Passing no dependency array to useEffect causes it to run on every render. Since setting state triggers a render, it loops infinitely. Add an empty array [] to run only once, or specify dependencies.' },
      { title: 'State Update Not Reflecting Immediately', broken: 'const [count, setCount] = useState(0);\nconst increment = () => {\n  setCount(count + 1);\n  console.log(count); // prints old value\n};', prompt: 'In my React component, when I update count with setCount and log it immediately, it prints the old value. Code:\nconst [count, setCount] = useState(0);\nconst increment = () => {\n  setCount(count + 1);\n  console.log(count);\n};\nWhy and how do I fix this?', fix: 'const [count, setCount] = useState(0);\nconst increment = () => {\n  setCount(prev => {\n    const next = prev + 1;\n    console.log(next); // correct next value\n    return next;\n  });\n};', explanation: 'React state updates are asynchronous and batched. The state variable does not update until the next render. Use the functional updater or a local variable if you need the updated value immediately.' },
      { title: 'Prop Drilling Access Error', broken: 'function Parent() {\n  return <Child user="Alice" />;\n}\nfunction Child() {\n  return <GrandChild />;\n}\nfunction GrandChild() {\n  return <div>{user}</div>; // user is not defined\n}', prompt: 'I am trying to pass user down but I get user is not defined in GrandChild. Code:\n[paste code]\nHow do I access user without prop drilling through Child?', fix: 'const UserContext = createContext();\nfunction Parent() {\n  return (\n    <UserContext.Provider value="Alice">\n      <Child />\n    </UserContext.Provider>\n  );\n}\nfunction Child() {\n  return <GrandChild />;\n}\nfunction GrandChild() {\n  const user = useContext(UserContext);\n  return <div>{user}</div>;\n}', explanation: 'If you do not pass the prop through Child (prop drilling), GrandChild cannot access it. Use React Context (createContext and useContext) to make values available down the component tree without passing them through intermediary props.' },
    ],
    uiPrompts: [
      { title: 'Responsive Navbar', prompt: 'Create a responsive React navigation bar with state-controlled mobile menu toggle. Include logo on the left, 4 links in the center, and a "Sign In" button on the right. Use standard CSS classes.' },
      { title: 'Interactive Form', prompt: 'Generate a React contact form component managing state for fields: name, email, query type, and message. Implement custom validations and display helper error state text.' },
      { title: 'Dynamic Product Grid', prompt: 'Build a React product gallery component that fetches items, maintains filter state (category, price range), and sorts products by price/popularity.' },
      { title: 'Modal Dialog Component', prompt: 'Create a React modal popup component. Control its open/close state from a parent button, close on clicking outside overlay or pressing escape, and use React Portal.' },
      { title: 'Accordion List', prompt: 'Generate an accordion component in React. Maintain the active expanded section index in state, allowing only one item to be open at a time, with smooth height animations.' },
      { title: 'Tabbed Interface', prompt: 'Create a React tab component with 3 tabs. Maintain selected tab state, dynamically render the active tab content panel, and support keyboard arrow navigation.' },
    ],
    componentSteps: [
      { step: 1, title: 'Define component structure', prompt: 'I want to build a React Task/Todo component with: list of items, status tags, toggle completion, and filter by status (All/Active/Completed).' },
      { step: 2, title: 'Declare state hooks', prompt: 'Write the functional React component shell declaring the state hooks for the list of tasks and the current filter string.' },
      { step: 3, title: 'Implement logic methods', prompt: 'Now write functions to add a task, toggle completion status, delete a task, and filter the items array.' },
      { step: 4, title: 'Render JSX components', prompt: 'Finally, write the JSX structure mapping the tasks list. Add proper keys, conditional classes for completed items, and status filter buttons.' },
    ]
  },
  bootstrap: {
    label: 'Bootstrap',
    color: '#7952b3',
    gradient: 'linear-gradient(135deg, #7952b3 0%, #563d7c 100%)',
    lightBg: '#f5f3ff',
    lightBorder: '#ddd6fe',
    debugExamples: [
      { title: 'Flex Box Centering', broken: '<div class="d-flex">\n  <div class="mx-auto">Centered</div>\n</div>', prompt: 'Act as a Bootstrap expert. Centering elements inside display flex. Code:\n[paste code]\nHow do I center item in both directions?', fix: '<div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">\n  <div>Centered</div>\n</div>', explanation: 'Use justify-content-center and align-items-center on the d-flex container.' }
    ],
    uiPrompts: [
      { title: 'Responsive Row Columns', prompt: 'Generate Bootstrap 5 code for a responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop. Include shadow cards.' }
    ],
    componentSteps: [
      { step: 1, title: 'Describe structure', prompt: 'I want a Bootstrap 5 modal component triggered by a button, containing a form.' }
    ]
  },
  git: {
    label: 'Git',
    color: '#f05032',
    gradient: 'linear-gradient(135deg, #f05032 0%, #f14e32 100%)',
    lightBg: '#fef2f2',
    lightBorder: '#fca5a5',
    debugExamples: [
      { title: 'Detached HEAD State', broken: '# Stuck in detached HEAD\ngit checkout <commit_hash>', prompt: 'How do I recover from a detached HEAD state in Git without losing changes?', fix: 'git checkout main\n# or to save changes:\ngit switch -c my-new-branch', explanation: 'Detached HEAD means you are pointing to a specific commit. Switch back to main or switch to a new branch.' }
    ],
    uiPrompts: [
      { title: 'Git branch strategy', prompt: 'Provide a Git branching strategy guide for a team of 4 developers working on React.' }
    ],
    componentSteps: [
      { step: 1, title: 'Declare workflow', prompt: 'Explain the command sequence to pull remote changes, resolve conflicts, and commit changes.' }
    ]
  },
  json: {
    label: 'JSON',
    color: '#334155',
    gradient: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
    lightBg: '#f8fafc',
    lightBorder: '#cbd5e1',
    debugExamples: [
      { title: 'Invalid JSON String', broken: "{ 'name': 'John', age: 30 }", prompt: 'Why is this JSON invalid? Code:\n{ \'name\': \'John\', age: 30 }', fix: '{\n  "name": "John",\n  "age": 30\n}', explanation: 'JSON requires keys and string values to be wrapped in double quotes. Single quotes are invalid.' }
    ],
    uiPrompts: [
      { title: 'Mock data schema', prompt: 'Generate a nested JSON payload representing a library books database with authors and ISBN values.' }
    ],
    componentSteps: [
      { step: 1, title: 'Format checks', prompt: 'Create a schema validation JSON for user profiles containing email, login timestamp, and status.' }
    ]
  },
  python: {
    label: 'Python',
    color: '#3776ab',
    gradient: 'linear-gradient(135deg, #3776ab 0%, #ffd343 100%)',
    lightBg: '#eff6ff',
    lightBorder: '#bfdbfe',
    debugExamples: [
      { title: 'IndexError Handling', broken: 'items = [1, 2]\nval = items[5]', prompt: 'Write an optimized Python script that safely checks list boundaries to avoid IndexError. Code:\nitems = [1, 2]\nval = items[5]', fix: 'items = [1, 2]\nval = items[5] if len(items) > 5 else None\n# or use try-except:\ntry:\n    val = items[5]\nexcept IndexError:\n    val = None', explanation: 'Check array bounds manually using len() or wrap in try...except IndexError.' }
    ],
    uiPrompts: [
      { title: 'Sentiment CLI Tool', prompt: 'Create a Python script that reads a text file and counts positive/negative words, outputting statistics.' }
    ],
    componentSteps: [
      { step: 1, title: 'Establish structure', prompt: 'Design a Python class representing a BankAccount with deposit, withdraw, and transaction history.' }
    ]
  },
  django: {
    label: 'Django',
    color: '#092e20',
    gradient: 'linear-gradient(135deg, #092e20 0%, #10b981 100%)',
    lightBg: '#f0fdf4',
    lightBorder: '#bbf7d0',
    debugExamples: [
      { title: 'Django N+1 query', broken: 'for book in Book.objects.all():\n    print(book.author.name)', prompt: 'Review this Django view. It triggers N+1 database hits. Code:\n[paste code]\nHow do I fix this?', fix: 'books = Book.objects.select_related(\'author\').all()\nfor book in books:\n    print(book.author.name)', explanation: 'Use select_related(\'author\') to join tables in a single SQL query instead of querying the author for every loop iteration.' }
    ],
    uiPrompts: [
      { title: 'Django ModelForms view', prompt: 'Generate a Django view and model form configuration that processes a student registration record, validating input.' }
    ],
    componentSteps: [
      { step: 1, title: 'Scaffold model', prompt: 'Write a Django model definition for Product and Category linked via ForeignKey, with custom clean hooks.' }
    ]
  },
  devops: {
    label: 'DevOps',
    color: '#2496ed',
    gradient: 'linear-gradient(135deg, #2496ed 0%, #1d4ed8 100%)',
    lightBg: '#f0f9ff',
    lightBorder: '#bae6fd',
    debugExamples: [
      { title: 'Bloated Docker Image', broken: 'FROM node:18\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]', prompt: 'How do I optimize this Dockerfile to minimize node container size?', fix: 'FROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\n\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app . \nCMD ["node", "server.js"]', explanation: 'Use multi-stage builds and lightweight alpine base images to exclude build-only assets from final container.' }
    ],
    uiPrompts: [
      { title: 'GitHub Actions workflow', prompt: 'Create a GitHub Actions CI pipeline configuration file that runs npm run build and npm run test on main branch push.' }
    ],
    componentSteps: [
      { step: 1, title: 'Compose container setup', prompt: 'Write a docker-compose.yml file joining a Node web app container to a Redis cache and MongoDB database.' }
    ]
  }
};

// ─── Shared helpers ──────────────────────────────────────────────────────────
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ background: copied ? '#059669' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
      {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="learning-card">
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#ca8a04', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const tools = [
  { name: 'ChatGPT', org: 'OpenAI', icon: '🤖', color: '#10a37f', bg: '#f0fdf9', border: '#6ee7b7', url: 'https://chatgpt.com', strengths: ['General coding help', 'Explaining concepts', 'Debugging', 'Code review'], plan: 'Free & Plus ($20/mo)', bestFor: 'All-round coding assistant' },
  { name: 'Gemini', org: 'Google', icon: '✨', color: '#4285f4', bg: '#eff6ff', border: '#93c5fd', url: 'https://gemini.google.com', strengths: ['Google ecosystem', 'Long context', 'Multimodal', 'Real-time web'], plan: 'Free & Advanced', bestFor: 'Research & Google tools' },
  { name: 'GitHub Copilot', org: 'Microsoft', icon: '🐙', color: '#6e40c9', bg: '#f5f3ff', border: '#c4b5fd', url: 'https://github.com/features/copilot', strengths: ['Inline autocomplete', 'IDE integrated', 'Repo-aware', 'Chat in VS Code'], plan: 'Free (students) / $10/mo', bestFor: 'Writing code in VS Code' },
  { name: 'Cursor', org: 'Cursor AI', icon: '⚡', color: '#0284c7', bg: '#eff6ff', border: '#93c5fd', url: 'https://cursor.sh', strengths: ['Full codebase context', 'Inline AI edits', 'Multi-file changes', 'Terminal AI'], plan: 'Free & Pro ($20/mo)', bestFor: 'Full project AI editing' },
  { name: 'Claude', org: 'Anthropic', icon: '🔮', color: '#7c3aed', bg: '#faf5ff', border: '#d8b4fe', url: 'https://claude.ai', strengths: ['Long files', 'Safe outputs', 'Technical writing', 'Code explanation'], plan: 'Free & Pro ($20/mo)', bestFor: 'Complex code analysis' },
  { name: 'v0.dev', org: 'Vercel', icon: '🎨', color: '#0f172a', bg: '#f8fafc', border: '#e2e8f0', url: 'https://v0.dev', strengths: ['UI generation', 'React components', 'Tailwind CSS', 'Live preview'], plan: 'Free & Pro', bestFor: 'Instant UI components' },
];

const powerTemplates = [
  { category: 'Debugging', icon: '🐛', color: '#dc2626', templates: ['Act as a [language] debugger. Here is my broken code: [paste code]. The error is: [error message]. Explain the root cause and provide the fixed code with comments.', 'Review this [language] code for bugs and edge cases. Return: 1) List of issues found 2) Fixed code 3) Explanation of each fix.'] },
  { category: 'Code Generation', icon: '⚡', color: '#0284c7', templates: ['Write a [language] function that [does X]. Requirements: [list requirements]. Return clean, well-commented code with a usage example.', 'Generate a complete [component type] in [technology] with: [feature 1], [feature 2], [feature 3]. Follow best practices.'] },
  { category: 'Code Review', icon: '🔍', color: '#059669', templates: ['Review this code as a senior [language] developer. Check for: security issues, performance, readability, edge cases. Format as a bulleted list.', 'Refactor this [language] code to be more readable. Keep the same functionality but improve: variable names, function structure, and add JSDoc comments.'] },
  { category: 'Learning', icon: '📚', color: '#7c3aed', templates: ['Explain [concept] in [language] like I am a beginner. Use a simple analogy, then show a practical code example with line-by-line comments.', 'What is the difference between [concept A] and [concept B] in [language]? Provide: definition of each, when to use which, and a side-by-side code comparison.'] },
];

const getPlaceholderCode = (course) => {
  const placeholders = {
    html: '<!-- Suboptimal HTML example -->\n<div class="header">\n  <img src="logo.png">\n  <h1 style="color: blue;">Welcome</h1>\n</div>',
    css: '/* Suboptimal CSS example */\n.btn {\n  background: #3b82f6;\n  padding: 10px;\n  border-radius: 4px!important;\n}',
    js: '// Suboptimal JavaScript example\nvar total = 0;\nfunction add(x, y) {\n  total = x + y;\n  return eval("x + y");\n}',
    bootstrap: '<!-- Nesting containers in Bootstrap -->\n<div class="container">\n  <div class="container">\n    <div class="col-6">Grid Column</div>\n  </div>\n</div>',
    git: '# Git command history\ngit add .\ngit commit -m "fix"\ngit push -f origin main',
    json: '// Bad JSON quotes and trailing comma\n{\n  \'name\': \'Alice\',\n  \'role\': \'student\',\n}',
    react: '// Missing dependencies and direct state mutation\nfunction CountCard() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    console.log("Count changed:", count);\n  });\n  return <button onClick={() => { count = count + 1 }}>Click</button>;\n}',
    python: '# Missing exception handling and suboptimal list appending\ndef find_squares(numbers):\n    squares = []\n    for n in numbers:\n        squares.append(n * n)\n    return squares',
    django: '# N+1 query vulnerability in Django view\ndef book_list(request):\n    books = Book.objects.all()\n    return render(request, "books.html", {"books": books})',
    devops: '# Bloated Dockerfile layer cache\nFROM ubuntu:latest\nRUN apt-get update && apt-get install -y git curl python3\nCOPY . /app\nCMD ["python3", "/app/main.py"]'
  };
  return placeholders[course] || '// Paste your code here to begin the AI Code Review...';
};

const analyzeCode = (code, course) => {
  let readability = 85;
  let performance = 80;
  let security = 90;
  let summary = "";
  const issues = [];
  let refactored = "";

  const trimmed = code.trim();
  if (!trimmed) {
    return null;
  }

  if (course === 'html') {
    summary = "The HTML code provides a reasonable layout structure, but lacks some accessibility considerations and semantic markup optimization.";
    if (!trimmed.includes('<header>') && !trimmed.includes('<main>') && !trimmed.includes('<footer>')) {
      issues.push({ line: 1, type: 'warning', msg: 'Use semantic HTML5 elements (<header>, <main>, <footer>) instead of generic <div> tags to improve SEO and screen reader accessibility.' });
      readability -= 10;
    }
    if (trimmed.includes('<img') && !trimmed.includes('alt=')) {
      issues.push({ line: 2, type: 'danger', msg: 'Image tag <img> is missing the alt attribute, which breaks web content accessibility guidelines (WCAG) for visually impaired users.' });
      security -= 15;
    }
    if (trimmed.includes('style=')) {
      issues.push({ line: 4, type: 'info', msg: 'Avoid inline styles. Inline styles violate separation of concerns; move styles to a linked style.css sheet.' });
      readability -= 5;
    }
    refactored = code.replace(/<div class="header">/g, '<header class="header">')
                     .replace(/<div class="footer">/g, '<footer class="footer">')
                     .replace(/<img ([^>]+)>/g, '<img $1 alt="Optimized Image Description">');
  } 
  else if (course === 'css') {
    summary = "The CSS code is functional, but relies on absolute sizing or lacks transition smoothing for interactive elements.";
    if (trimmed.includes('px') && !trimmed.includes('rem') && !trimmed.includes('em')) {
      issues.push({ line: 1, type: 'warning', msg: 'Prefer relative font/spacing units (rem or em) instead of absolute pixel units (px) to support browser zoom and responsive typography.' });
      readability -= 8;
    }
    if (trimmed.includes(':hover') && !trimmed.includes('transition')) {
      issues.push({ line: 3, type: 'info', msg: 'Add a transition property (e.g., transition: all 0.2s ease) to elements with :hover states to ensure a smooth, professional micro-animation.' });
      performance -= 5;
    }
    if (trimmed.includes('!important')) {
      issues.push({ line: 5, type: 'danger', msg: 'Avoid using !important keyword. It breaks natural CSS specificity cascading rules and makes stylesheet maintenance extremely difficult.' });
      readability -= 15;
    }
    refactored = code.replace(/px;/g, 'rem; /* Consider converting pixels to rem (e.g. 16px = 1rem) */')
                     .replace(/!important/g, '');
  }
  else if (course === 'js') {
    summary = "The JavaScript logic runs successfully, but uses outdated scoping conventions and has potential scope/type vulnerability issues.";
    if (trimmed.includes('var ')) {
      issues.push({ line: 1, type: 'warning', msg: 'Use block-scoped variable declarations (let or const) instead of function-scoped "var" to prevent variable hoisting and leakage.' });
      readability -= 10;
    }
    if (trimmed.includes('eval(')) {
      issues.push({ line: 2, type: 'danger', msg: 'CRITICAL SECURITY RISK: Never use eval(). Executing strings as code exposes your application to Arbitrary Code Execution and XSS exploits.' });
      security -= 40;
    }
    if (trimmed.includes('==') && !trimmed.includes('===')) {
      issues.push({ line: 4, type: 'info', msg: 'Use strict equality operators (===) instead of abstract equality (==) to prevent unexpected type coercion bugs.' });
      performance -= 5;
    }
    refactored = code.replace(/var /g, 'const ')
                     .replace(/==/g, '===')
                     .replace(/eval\(([^)]+)\)/g, 'JSON.parse($1) /* Avoid eval, parse data securely */');
  }
  else if (course === 'bootstrap') {
    summary = "The Bootstrap implementation properly structures the layout, but some grids are non-responsive or duplicate containers.";
    if (trimmed.includes('container') && (trimmed.match(/container/g) || []).length > 1) {
      issues.push({ line: 1, type: 'warning', msg: 'Avoid nesting containers. Bootstrap columns and rows should be placed within a single container wrapper; nested containers cause layout issues.' });
      readability -= 12;
    }
    if (trimmed.includes('col-') && !trimmed.includes('col-md-') && !trimmed.includes('col-sm-')) {
      issues.push({ line: 3, type: 'info', msg: 'Include responsive grid breakpoint class modifiers (e.g. col-12 col-md-6) to ensure cards stack correctly on mobile screen sizes.' });
      readability -= 8;
    }
    refactored = code.replace(/class="container"/g, 'class="container-fluid"')
                     .replace(/col-6/g, 'col-12 col-md-6');
  }
  else if (course === 'git') {
    summary = "The Git commands list standard version control workflow operations, but lack clean configuration or feature branch checks.";
    if (trimmed.includes('git push -f') || trimmed.includes('--force')) {
      issues.push({ line: 1, type: 'danger', msg: 'Force-pushing (git push -f) can overwrite remote repository history and delete work committed by teammates. Use git push --force-with-lease.' });
      security -= 25;
    }
    if (trimmed.includes('git add .') && !trimmed.includes('.gitignore')) {
      issues.push({ line: 3, type: 'warning', msg: 'Using git add . without a configured .gitignore file will stage temporary files, credentials, node_modules, and cache files.' });
      security -= 15;
    }
    refactored = code.replace(/git push -f/g, 'git push --force-with-lease')
                     .replace(/git add \./g, '# Make sure to configure .gitignore first\ngit add .');
  }
  else if (course === 'json') {
    summary = "The JSON string has correct field mappings, but verify double-quoting and standard compliance properties.";
    if (trimmed.includes("'")) {
      issues.push({ line: 1, type: 'danger', msg: 'Strict JSON grammar requires double quotes (") for all key names and string values. Single quotes (\') will throw SyntaxErrors when parsed.' });
      security -= 20;
    }
    if (trimmed.endsWith(',') || trimmed.includes(',\n}') || trimmed.includes(',\n]')) {
      issues.push({ line: 2, type: 'danger', msg: 'Trailing commas are not permitted in JSON structures. Remove the comma at the end of the last key-value definition.' });
      readability -= 10;
    }
    refactored = code.replace(/'/g, '"');
  }
  else if (course === 'react') {
    summary = "The React component is structurally correct, but has common state management or side-effect dependency optimization flags.";
    if (trimmed.includes('useEffect') && !trimmed.includes('}, []') && !trimmed.includes('}, [')) {
      issues.push({ line: 1, type: 'warning', msg: 'useEffect hook is missing the dependency array. It will execute on every render cycle, leading to potential performance drops and infinite loops.' });
      performance -= 25;
    }
    if (trimmed.includes('useState') && trimmed.includes('state =')) {
      issues.push({ line: 3, type: 'danger', msg: 'Direct state mutation detected. Never assign state values directly. Always use the setter function (e.g. setState()) to trigger component re-render.' });
      performance -= 15;
    }
    refactored = code.replace(/useEffect\(\(\) => {([\s\S]+?)}\)/g, 'useEffect(() => {\n$1\n}, [])')
                     .replace(/state = /g, 'setState(newVal) // Do not mutate state directly');
  }
  else if (course === 'python') {
    summary = "The Python code executes correctly, but lacks error exceptions handling and could optimize list comprehension complexity.";
    if (trimmed.includes('def ') && !trimmed.includes('try:') && !trimmed.includes('except')) {
      issues.push({ line: 1, type: 'warning', msg: 'The function lacks explicit Exception Handling. Wrap database/file connection calls or mathematical operations in a try...except block to prevent runtime crashes.' });
      security -= 15;
    }
    if (trimmed.includes('for ') && trimmed.includes('.append(')) {
      issues.push({ line: 3, type: 'info', msg: 'Performance optimization: Consider using list comprehension (e.g. [x for x in items]) instead of loops appending to a list to write cleaner and faster code.' });
      performance -= 10;
    }
    refactored = "try:\n    # Refactored function implementation\n" + code.replace(/\n/g, '\n    ') + "\nexcept Exception as e:\n    print(f'Error encountered: {e}')";
  }
  else if (course === 'django') {
    summary = "The Django view logic maps routes successfully, but contains database query performance hits.";
    if (trimmed.includes('.objects.all()') && !trimmed.includes('select_related') && !trimmed.includes('prefetch_related')) {
      issues.push({ line: 1, type: 'warning', msg: 'Potential N+1 database queries warning. Use select_related() for foreign keys or prefetch_related() for many-to-many properties to minimize queries.' });
      performance -= 25;
    }
    if (trimmed.includes('HttpResponse') && trimmed.includes('HTML')) {
      issues.push({ line: 2, type: 'info', msg: 'Use render(request, "template.html", context) instead of writing raw HTML strings in HttpResponse views to decouple design from business logic.' });
      readability -= 8;
    }
    refactored = code.replace(/\.objects\.all\(\)/g, '.objects.select_related().all()');
  }
  else if (course === 'devops') {
    summary = "The DevOps pipeline configuration handles files correctly, but contains container footprint optimizations.";
    if (trimmed.includes('FROM ubuntu') || trimmed.includes('FROM debian')) {
      issues.push({ line: 1, type: 'info', msg: 'Footprint optimization: Use lightweight alpine image variants (e.g. node:18-alpine or python:3.9-slim) to minimize Docker image sizes and decrease deploy times.' });
      performance -= 15;
    }
    if (trimmed.includes('RUN apt-get install') && !trimmed.includes('--no-install-recommends')) {
      issues.push({ line: 3, type: 'warning', msg: 'Add --no-install-recommends to apt-get install calls to avoid caching unnecessary build packages inside the Docker layer.' });
      performance -= 10;
    }
    refactored = code.replace(/FROM ubuntu/g, 'FROM alpine:latest')
                     .replace(/apt-get install -y/g, 'apt-get install -y --no-install-recommends');
  }

  // Ensure scores remain logical
  readability = Math.max(20, Math.min(100, readability));
  performance = Math.max(20, Math.min(100, performance));
  security = Math.max(20, Math.min(100, security));

  if (issues.length === 0) {
    issues.push({ line: 0, type: 'success', msg: 'No obvious issues found! The code adheres to basic standards and structures. Great job!' });
    refactored = code;
  }

  return { readability, performance, security, summary, issues, refactored };
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIPowerTools({ activeTab, onNavigate, course = 'js' }) {
  const cd = COURSE_DATA[course] || COURSE_DATA.js;
  const [expandedDebug, setExpandedDebug] = useState(null);
  const [promptParts, setPromptParts] = useState({ role: '', task: '', context: '', format: '' });
  const [builtPrompt, setBuiltPrompt] = useState('');

  const [codeToReview, setCodeToReview] = useState(() => getPlaceholderCode(course));
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);

  // Sync when course changes
  React.useEffect(() => {
    setCodeToReview(getPlaceholderCode(course));
    setReviewResult(null);
  }, [course]);

  const handleReviewTrigger = () => {
    setIsReviewing(true);
    setTimeout(() => {
      const result = analyzeCode(codeToReview, course);
      setReviewResult(result);
      setIsReviewing(false);
    }, 1500);
  };

  const buildPrompt = () => {
    const parts = [];
    if (promptParts.role) parts.push(`Act as ${promptParts.role}.`);
    if (promptParts.context) parts.push(`Context: ${promptParts.context}.`);
    if (promptParts.task) parts.push(`Task: ${promptParts.task}.`);
    if (promptParts.format) parts.push(`Return your response as: ${promptParts.format}.`);
    setBuiltPrompt(parts.join('\n'));
  };

  const univTemplate = `Act as a senior ${cd.label} developer and debugging expert.\n\nI have the following broken code:\n[PASTE YOUR CODE HERE]\n\nThe error I'm getting is:\n[PASTE THE ERROR MESSAGE]\n\nExpected behavior: [WHAT SHOULD HAPPEN]\nActual behavior: [WHAT IS HAPPENING]\n\nPlease:\n1. Identify the root cause of the bug\n2. Provide the corrected code\n3. Explain what was wrong and why\n4. Suggest how to prevent this bug in future`;

  return (
    <AnimatePresence mode="wait">

      {/* ── AI DEBUGGING ─────────────────────────────────────────────────── */}
      {activeTab === 'ai_debugging' && (
        <Section key="ai_debugging" eyebrow={`${cd.label} • AI Power Tools`} title="🐛 AI Debugging">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', background: 'rgba(167,139,250,0.25)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '-20px', left: '40%', width: '100px', height: '100px', background: 'rgba(196,181,253,0.15)', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '12px', display: 'flex', border: '1px solid rgba(255,255,255,0.3)' }}><Bug size={28} color="white" /></div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'white' }}>AI-Powered Debugging</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '0.9rem' }}>Fix bugs in seconds using AI — not hours of Googling</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Paste broken code', 'Describe the error', 'Get instant fix + explanation'].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🎯 Universal AI Debugging Prompt Template</h3>
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}><CopyButton text={univTemplate} /></div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#f8fafc', lineHeight: 2, whiteSpace: 'pre' }}>{univTemplate}</div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🔍 Real {cd.label} Bug Examples — Click to Expand</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cd.debugExamples.map((ex, i) => (
                <div key={i} style={{ border: `1px solid ${expandedDebug === i ? '#dc2626' : '#e2e8f0'}`, borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s' }}>
                  <div onClick={() => setExpandedDebug(expandedDebug === i ? null : i)}
                    style={{ background: expandedDebug === i ? '#fef2f2' : '#f8fafc', padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ background: '#dc2626', color: 'white', borderRadius: '8px', padding: '4px 10px', fontSize: '0.8rem', fontWeight: 700 }}>BUG {i + 1}</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{ex.title}</span>
                    </div>
                    {expandedDebug === i ? <ChevronUp size={18} color="#dc2626" /> : <ChevronDown size={18} />}
                  </div>
                  {expandedDebug === i && (
                    <div style={{ padding: '1.25rem', borderTop: '1px solid #fee2e2' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: '6px', fontSize: '0.9rem' }}>❌ Broken Code</div>
                          <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#fca5a5', whiteSpace: 'pre', lineHeight: 1.7 }}>{ex.broken}</div>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#059669', marginBottom: '6px', fontSize: '0.9rem' }}>✅ Fixed Code</div>
                          <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#86efac', whiteSpace: 'pre', lineHeight: 1.7 }}>{ex.fix}</div>
                        </div>
                      </div>
                      <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#78350f' }}>
                        <strong>💡 What was wrong:</strong> {ex.explanation}
                      </div>
                      <div style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', position: 'relative' }}>
                        <div style={{ fontWeight: 700, color: '#94a3b8', marginBottom: '8px', fontSize: '0.85rem' }}>📋 AI Prompt to use:</div>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{ex.prompt}</div>
                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}><CopyButton text={ex.prompt} /></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── AI UI GENERATION ─────────────────────────────────────────────── */}
      {activeTab === 'ai_ui_gen' && (
        <Section key="ai_ui_gen" eyebrow={`${cd.label} • AI Power Tools`} title="🎨 AI UI Generation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: cd.gradient, borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0.75rem' }}>
                <Wand2 size={32} color="white" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'white' }}>Generate UI with AI Prompts</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.7 }}>Describe what you want → AI writes the {cd.label} code → You customize. Build faster than ever.</p>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📐 The UI Generation Prompt Formula</h3>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#374151', lineHeight: 1.8 }}>
              Create a <span style={{ color: '#7c3aed', fontWeight: 800 }}>[component type]</span> in <span style={{ color: '#059669', fontWeight: 800 }}>{cd.label}</span> with <span style={{ color: '#dc2626', fontWeight: 800 }}>[features]</span>. Style it with <span style={{ color: '#d97706', fontWeight: 800 }}>[design style]</span>. Make it <span style={{ color: '#0284c7', fontWeight: 800 }}>[responsive/accessible/animated]</span>.
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>⚡ Ready-to-Use {cd.label} UI Prompts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {cd.uiPrompts.map((item, i) => (
                <div key={i} style={{ background: cd.lightBg, border: `1px solid ${cd.lightBorder}`, borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 800, color: cd.color, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} /> {item.title}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '12px', lineHeight: 1.6 }}>{item.prompt}</p>
                  <CopyButton text={item.prompt} />
                </div>
              ))}
            </div>

            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.5rem', color: 'white' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', color: '#fbbf24' }}>💡 Pro Tips for Better UI Generation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Be specific about dimensions — e.g., "400px wide card with 24px padding"', 'Mention color schemes — e.g., "use blue #0284c7 as primary color"', 'Ask for variants — e.g., "also provide a dark mode version"', 'Request accessibility — e.g., "include ARIA labels and keyboard navigation"', 'Iterate step by step — Start simple, then ask for more features one at a time'].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#fbbf24', fontWeight: 800, flexShrink: 0 }}>→</span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ── AI COMPONENT DEVELOPMENT ─────────────────────────────────────── */}
      {activeTab === 'ai_component' && (
        <Section key="ai_component" eyebrow={`${cd.label} • AI Power Tools`} title="🧩 AI Component Development">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0.75rem' }}>
                <Layers size={32} color="white" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'white' }}>Build Components with AI Assistance</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.7 }}>Use AI as your pair programmer — go from idea to working component step-by-step with iterative prompting.</p>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🔄 The AI Component Development Workflow</h3>
            <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {['💡 Idea', '📝 Prompt', '⚡ Generate', '👀 Review', '🔧 Refine', '✅ Done'].map((step, i, arr) => (
                <React.Fragment key={i}>
                  <div style={{ background: i % 2 === 0 ? '#f0fdf4' : '#eff6ff', border: `2px solid ${i % 2 === 0 ? '#86efac' : '#93c5fd'}`, borderRadius: '12px', padding: '12px 16px', textAlign: 'center', minWidth: '90px', flexShrink: 0 }}>
                    <div style={{ fontSize: '1.4rem' }}>{step.split(' ')[0]}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151', marginTop: '4px' }}>{step.split(' ').slice(1).join(' ')}</div>
                  </div>
                  {i < arr.length - 1 && <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', color: '#94a3b8', flexShrink: 0 }}><ArrowRight size={16} /></div>}
                </React.Fragment>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🎯 Worked Example: Build a {cd.label} Component Step by Step</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {cd.componentSteps.map((item, i) => (
                <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ background: '#0f172a', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ background: '#059669', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{item.step}</span>
                    <span style={{ color: '#f1f5f9', fontWeight: 700 }}>Step {item.step}: {item.title}</span>
                  </div>
                  <div style={{ padding: '1rem', background: '#f8fafc' }}>
                    <div style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.7, position: 'relative' }}>
                      {item.prompt}
                      <div style={{ position: 'absolute', top: '8px', right: '8px' }}><CopyButton text={item.prompt} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 800, color: '#713f12', marginBottom: '1rem' }}>🔄 Iteration Tips — Getting Better Results</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { tag: '✅ DO', text: 'Build one feature at a time', ok: true },
                  { tag: '❌ AVOID', text: 'Asking for everything at once', ok: false },
                  { tag: '✅ DO', text: 'Provide context in follow-up messages', ok: true },
                  { tag: '❌ AVOID', text: 'Starting a new chat for each question', ok: false },
                  { tag: '✅ DO', text: 'Ask AI to explain what it generated', ok: true },
                  { tag: '❌ AVOID', text: 'Copying code without understanding it', ok: false },
                ].map((item, i) => (
                  <div key={i} style={{ background: item.ok ? '#f0fdf4' : '#fef2f2', border: `1px solid ${item.ok ? '#86efac' : '#fca5a5'}`, borderRadius: '8px', padding: '10px 14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: item.ok ? '#166534' : '#991b1b', fontSize: '0.8rem', flexShrink: 0 }}>{item.tag}</span>
                    <span style={{ fontSize: '0.88rem', color: '#374151' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ── AI PROMPT ENGINEERING ────────────────────────────────────────── */}
      {activeTab === 'ai_prompt_eng' && (
        <Section key="ai_prompt_eng" eyebrow={`${cd.label} • AI Power Tools`} title="💬 AI Prompt Engineering">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0.75rem' }}>
                <MessageSquare size={32} color="white" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'white' }}>Master the Art of AI Prompting</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.7 }}>The quality of AI output is directly proportional to the quality of your prompt. Learn to prompt like a pro.</p>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🧬 Anatomy of a Perfect Coding Prompt</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { part: 'ROLE', color: '#0284c7', desc: 'Tell AI who it should act as', example: `"Act as a senior ${cd.label} developer with 10 years of experience."`, icon: '👨‍💻' },
                { part: 'CONTEXT', color: '#059669', desc: 'Provide relevant background info', example: '"I am building a portfolio website. I am a beginner."', icon: '🎯' },
                { part: 'TASK', color: '#dc2626', desc: 'Be specific about what you need', example: `"Generate a responsive ${cd.label} navigation bar with 5 links and a mobile hamburger menu."`, icon: '📋' },
                { part: 'FORMAT', color: '#7c3aed', desc: 'Specify how you want the output', example: '"Return complete code with comments. Then list 3 ways to improve it."', icon: '📝' },
              ].map(item => (
                <div key={item.part} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: item.color, color: 'white', borderRadius: '8px', padding: '8px 12px', fontWeight: 800, fontSize: '0.78rem', flexShrink: 0, textAlign: 'center', minWidth: '66px' }}>
                    <div style={{ fontSize: '1.2rem' }}>{item.icon}</div>
                    {item.part}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.desc}</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: item.color, background: `${item.color}12`, padding: '6px 10px', borderRadius: '6px', lineHeight: 1.5 }}>{item.example}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>📊 Weak vs Powerful Prompts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { bad: `"fix my ${cd.label} code"`, good: `"Act as a ${cd.label} debugger. My code throws [error]. Here is the code: [paste]. Please identify the bug, explain why it happens, and provide the fix with comments."` },
                { bad: '"make a button"', good: `"Generate ${cd.label} for a primary action button with: hover animation, focus ring for accessibility, disabled state, and a loading spinner variant."` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#dc2626', marginBottom: '8px', fontSize: '0.85rem' }}>❌ WEAK PROMPT</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#374151' }}>{item.bad}</div>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#059669', marginBottom: '8px', fontSize: '0.85rem' }}>✅ POWERFUL PROMPT</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#374151', lineHeight: 1.7 }}>{item.good}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🛠️ Interactive Prompt Builder</h3>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {[
                  { key: 'role', label: '👨‍💻 Role', placeholder: `e.g., senior ${cd.label} developer` },
                  { key: 'context', label: '🎯 Context', placeholder: 'e.g., building a portfolio website' },
                  { key: 'task', label: '📋 Task', placeholder: `e.g., create a responsive ${cd.label} navbar` },
                  { key: 'format', label: '📝 Output Format', placeholder: 'e.g., complete code with comments' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#374151', marginBottom: '6px', fontSize: '0.9rem' }}>{field.label}</label>
                    <input value={promptParts[field.key]} onChange={e => setPromptParts(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
              <button onClick={buildPrompt} style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <Wand2 size={16} /> Build My Prompt
              </button>
              {builtPrompt && (
                <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1rem', position: 'relative' }}>
                  <div style={{ color: '#f1f5f9', fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{builtPrompt}</div>
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}><CopyButton text={builtPrompt} /></div>
                </div>
              )}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>⚡ Power Prompt Templates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {powerTemplates.map((cat, ci) => (
                <div key={ci} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ background: cat.color, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
                    <span style={{ color: 'white', fontWeight: 800 }}>{cat.category}</span>
                  </div>
                  {cat.templates.map((t, ti) => (
                    <div key={ti} style={{ padding: '1rem', background: '#f8fafc', borderBottom: ti < cat.templates.length - 1 ? '1px solid #e2e8f0' : 'none', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#374151', flex: 1, lineHeight: 1.7 }}>{t}</div>
                      <CopyButton text={t} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── AI PRODUCTIVITY TOOLS ────────────────────────────────────────── */}
      {activeTab === 'ai_productivity' && (
        <Section key="ai_productivity" eyebrow={`${cd.label} • AI Power Tools`} title="⚡ AI Productivity Tools">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0.75rem' }}>
                <Zap size={32} color="#fbbf24" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'white' }}>Top AI Tools for {cd.label} Developers</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.7 }}>The right AI tools can 10x your coding speed. Here's your complete toolkit.</p>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🛠️ Your AI Developer Toolkit</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {tools.map((tool, i) => (
                <div key={i} style={{ background: tool.bg, border: `1px solid ${tool.border}`, borderRadius: '16px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '2.5rem', flexShrink: 0, lineHeight: 1 }}>{tool.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{tool.name}</span>
                      <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>by {tool.org}</span>
                      <span style={{ background: `${tool.color}20`, color: tool.color, borderRadius: '20px', padding: '2px 10px', fontSize: '0.78rem', fontWeight: 700, border: `1px solid ${tool.border}` }}>{tool.plan}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '8px' }}><strong>Best for:</strong> {tool.bestFor}</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {tool.strengths.map((s, si) => <span key={si} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '3px 10px', fontSize: '0.8rem', color: '#374151' }}>✓ {s}</span>)}
                    </div>
                  </div>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer"
                    style={{ background: tool.color, color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Try <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>🔧 VS Code + AI Extensions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { ext: 'GitHub Copilot', desc: 'Real-time AI code completion. Press Tab to accept.', step: 'Install → Sign in with GitHub → Start coding', rating: '⭐⭐⭐⭐⭐' },
                { ext: 'Copilot Chat', desc: 'Ask AI about your code in a sidebar chat panel.', step: 'Comes with Copilot → Open Chat Panel', rating: '⭐⭐⭐⭐⭐' },
                { ext: 'Error Lens', desc: 'Shows error messages inline on the problematic line.', step: 'Install → Errors appear automatically', rating: '⭐⭐⭐⭐' },
                { ext: 'Prettier', desc: 'Auto-formats your code on save for consistent style.', step: 'Install → Set as default formatter → Format on Save', rating: '⭐⭐⭐⭐⭐' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>{item.ext}</span>
                    <span style={{ fontSize: '0.8rem' }}>{item.rating}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '8px' }}>{item.desc}</p>
                  <div style={{ background: '#0f172a', borderRadius: '6px', padding: '6px 10px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#86efac' }}>{item.step}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '12px', padding: '1.5rem', color: 'white' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} /> AI-Powered {cd.label} Daily Workflow
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { time: '🧠 Planning', tip: `Use ChatGPT/Gemini: "Plan the ${cd.label} structure for [feature]. Break it into small tasks."` },
                  { time: '⚡ Coding', tip: 'Use GitHub Copilot in VS Code for real-time inline autocomplete as you type.' },
                  { time: '🐛 Debugging', tip: 'Paste error + code into ChatGPT with the debugging template above. Get instant fixes.' },
                  { time: '🔍 Review', tip: 'Ask AI: "Review this code for bugs, performance issues, and best practices."' },
                  { time: '📚 Learning', tip: 'Ask AI: "Explain what this code does line by line." Learn while you build.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, fontWeight: 700, color: '#fbbf24', minWidth: '100px' }}>{item.time}</span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ── AI CODE REVIEWER (REVICOT) ────────────────────────────────────── */}
      {activeTab === 'ai_code_review' && (
        <Section key="ai_code_review" eyebrow={`${cd.label} • AI Power Tools`} title="🔍 AI Code Reviewer (Revicot)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Intro Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '2rem', color: 'white', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0.8rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
                  <Search size={24} color="#fbbf24" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'white' }}>Revicot AI Code Review Bot</h3>
                  <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.88rem' }}>Instant static code analysis for readability, security loopholes, and performance optimizations.</p>
                </div>
              </div>
            </div>

            {/* Editor Area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* Code Input Panel */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.2rem', boxShadow: 'var(--shadow-md)', border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileCode size={16} color="#60a5fa" />
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>{cd.label} Review Workspace</span>
                  </div>
                  <button 
                    onClick={() => setCodeToReview(getPlaceholderCode(course))}
                    style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RotateCcw size={12} /> Reset to Example
                  </button>
                </div>
                
                <textarea
                  value={codeToReview}
                  onChange={(e) => setCodeToReview(e.target.value)}
                  style={{
                    width: '100%',
                    height: '240px',
                    background: '#1e293b',
                    color: '#f8fafc',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.88rem',
                    border: '1px solid #334155',
                    borderRadius: '10px',
                    padding: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Paste your source code snippet here..."
                />
                
                <button
                  onClick={handleReviewTrigger}
                  disabled={isReviewing || !codeToReview.trim()}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 24px',
                    fontWeight: 700,
                    width: '100%',
                    marginTop: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(16,185,129,0.2)',
                    opacity: (!codeToReview.trim()) ? 0.6 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  {isReviewing ? (
                    <>
                      <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                      Analyzing with Revicot Bot...
                    </>
                  ) : (
                    <>
                      <Search size={16} /> Run AI Code Review
                    </>
                  )}
                </button>
              </div>

              {/* Review Guidance Info */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
                <h4 style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 0.8rem 0', fontSize: '0.95rem' }}>🔍 Reviewing Criteria</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Readability', desc: 'Checks naming conventions, code layout structures, spacing rules, and semantic tags.' },
                    { label: 'Performance', desc: 'Identifies loops inefficiencies, unneeded database query overheads, and bloated files sizes.' },
                    { label: 'Security Loophole', desc: 'Flags deprecated parameters usage, SQL injections risks, eval scoping risks, or direct state modifications.' }
                  ].map(rule => (
                    <div key={rule.label} style={{ fontSize: '0.85rem' }}>
                      <strong style={{ color: '#0f172a', display: 'block' }}>{rule.label}</strong>
                      <span style={{ color: '#475569', lineHeight: 1.4 }}>{rule.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Display */}
            {reviewResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '2.5rem', borderTop: '2px dashed #e2e8f0', paddingTop: '2.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                  <Sparkles size={20} color="#10b981" />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Revicot Review Results</h3>
                </div>

                {/* Score Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                  {[
                    { label: 'Readability', score: reviewResult.readability, color: '#3b82f6' },
                    { label: 'Performance', score: reviewResult.performance, color: '#10b981' },
                    { label: 'Security', score: reviewResult.security, color: '#ef4444' },
                  ].map(scoreCard => {
                    const statusColor = scoreCard.score >= 90 ? '#10b981' : scoreCard.score >= 70 ? '#f59e0b' : '#ef4444';
                    return (
                      <div key={scoreCard.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{scoreCard.label}</span>
                        <div style={{ 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          background: '#f8fafc', 
                          border: `5px solid #e2e8f0`,
                          borderTopColor: statusColor,
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 900,
                          color: '#0f172a',
                          marginBottom: '0.5rem'
                        }}>
                          {scoreCard.score}%
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: statusColor }}>
                          {scoreCard.score >= 90 ? 'Excellent' : scoreCard.score >= 70 ? 'Satisfactory' : 'Needs Work'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Summary */}
                <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '2rem', fontSize: '0.92rem', color: '#1e3a8a', lineHeight: 1.6 }}>
                  <strong>🤖 Revicot Assessment Summary:</strong> {reviewResult.summary}
                </div>

                {/* Issues List */}
                <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1rem', fontSize: '1.05rem' }}>⚠️ Identified Issues ({reviewResult.issues.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                  {reviewResult.issues.map((issue, idx) => {
                    const iconColor = issue.type === 'danger' ? '#ef4444' : issue.type === 'warning' ? '#f59e0b' : '#3b82f6';
                    const iconBg = issue.type === 'danger' ? '#fef2f2' : issue.type === 'warning' ? '#fffbeb' : '#eff6ff';
                    return (
                      <div key={idx} style={{ display: 'flex', gap: '12px', background: iconBg, border: `1px solid ${issue.type === 'danger' ? '#fca5a5' : issue.type === 'warning' ? '#fde047' : '#bfdbfe'}`, borderRadius: '12px', padding: '1rem' }}>
                        <div style={{ display: 'flex', flexShrink: 0 }}><AlertTriangle size={18} color={iconColor} /></div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            {issue.line > 0 && <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#1e293b', color: 'white', borderRadius: '4px', padding: '2px 6px' }}>LINE {issue.line}</span>}
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: iconColor }}>{issue.type}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5 }}>{issue.msg}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Refactored Code Block */}
                <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.2rem', border: '1px solid #1e293b', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="#10b981" />
                      <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Refactored & Optimized Code</span>
                    </div>
                    <CopyButton text={reviewResult.refactored} />
                  </div>
                  <pre style={{
                    margin: 0,
                    padding: '1rem',
                    background: '#1e293b',
                    borderRadius: '10px',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.82rem',
                    color: '#86efac',
                    overflowX: 'auto',
                    lineHeight: 1.6
                  }}>{reviewResult.refactored}</pre>
                </div>

              </motion.div>
            )}

          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
