import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Layers, Database, Sparkles, RefreshCw, Settings, CheckCircle, ArrowRight, Play, Trash2, Copy, FileText, Plus, X } from 'lucide-react';
import { CodeBlock, highlightJS } from '../../utils/codeHighlight';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function ReactDay2({ activeTab, onNavigate }) {
  // Food agenda state
  const [food, setFood] = useState('');
  const [agenda, setAgenda] = useState(['Apple', 'Banana', 'Orange']);

  // Reusable button alert state
  const [buttonClickMessage, setButtonClickMessage] = useState('');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizChecked, setQuizChecked] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  const handleContinue = (nextTabId) => {
    onNavigate('react_module2', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddFood = () => {
    if (food.trim() === '') return;
    setAgenda([...agenda, food.trim()]);
    setFood('');
  };

  const handleDeleteFood = (indexToDelete) => {
    setAgenda(agenda.filter((_, idx) => idx !== indexToDelete));
  };

  const handleQuizAnswer = (key, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [key]: optionIdx }));
  };

  const quizQuestions = [
    {
      key: 'q1',
      question: 'React components must return how many parent elements?',
      options: [
        'As many as needed',
        'None',
        'Exactly one parent element',
        'At least two parent elements'
      ],
      correct: 2,
      explanation: 'React components must return exactly one parent element. If you need multiple children, you can wrap them inside a single Fragment (<></> or <React.Fragment>) or a <div>.'
    },
    {
      key: 'q2',
      question: 'Which naming convention is recommended for naming React components?',
      options: [
        'camelCase',
        'PascalCase',
        'kebab-case',
        'snake_case'
      ],
      correct: 1,
      explanation: 'React components must be named using PascalCase (UpperCamelCase), where each word begins with an uppercase letter, to distinguish them from standard HTML tags.'
    },
    {
      key: 'q3',
      question: 'What is the primary benefit of React Fragments (<> ... </>)?',
      options: [
        'They automatically build extra container nodes in the browser DOM.',
        'They group child components without adding extra nodes to the DOM, avoiding clutter.',
        'They handle background API calls.',
        'They style text headings automatically.'
      ],
      correct: 1,
      explanation: 'The main benefit of a Fragment is to group child components and render them without adding unnecessary extra nodes (like wrappers) to the DOM.'
    }
  ];

  return (
    <AnimatePresence mode="wait">
      
      {/* 1. INTRO TO COMPONENTS */}
      {activeTab === 'intro_components' && (
        <Section key="intro_components" id="intro_components" eyebrow="React JS • Module 01" title="Introduction to Components">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '1.5rem' }}>
              A component is a reusable piece of UI in React. It is written as a JavaScript function that returns JSX layout code.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', margin: '2rem 0', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>Important Aspects of Components:</h4>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem' }}>
                  <li><strong>Re-usability:</strong> We can reuse a component used in one area of the application in another area. This speeds up development and helps avoid cluttering of code.</li>
                  <li><strong>Nested components:</strong> A component can contain within itself, several more components. This helps in creating more complex design and interaction elements.</li>
                  <li><strong>Render method:</strong> In its minimal form, a component must define a render method (or return statement in functional components) specifying how it renders to the DOM.</li>
                  <li><strong>Passing Props (Properties):</strong> A component can also receive props. These are properties that its parent passes to specify particular values.</li>
                </ul>
              </div>

              {/* Deconstruction Example mockup */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', background: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h5 style={{ margin: '0 0 1rem 0', fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Facebook Login Page Decomposed</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                  <div style={{ padding: '0.4rem', border: '1px dashed #818cf8', background: '#f5f3ff', borderRadius: '8px', color: '#6366f1', textAlign: 'center', fontWeight: 'bold' }}>&lt;IconComponent /&gt;</div>
                  <div style={{ padding: '0.4rem', border: '1px dashed #10b981', background: '#ecfdf5', borderRadius: '8px', color: '#059669', textAlign: 'center', fontWeight: 'bold' }}>&lt;ImageComponent /&gt;</div>
                  <div style={{ padding: '0.4rem', border: '1px dashed #ca8a04', background: '#fef9c3', borderRadius: '8px', color: '#a16207', textAlign: 'center', fontWeight: 'bold' }}>&lt;CredentialsComponent /&gt;</div>
                  <div style={{ padding: '0.4rem', border: '1px dashed #ef4444', background: '#fee2e2', borderRadius: '8px', color: '#ef4444', textAlign: 'center', fontWeight: 'bold' }}>&lt;SignUpComponent /&gt;</div>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('functional_components')}>
              Next: Functional Components <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 2. FUNCTIONAL COMPONENTS */}
      {activeTab === 'functional_components' && (
        <Section key="functional_components" id="functional_components" eyebrow="React JS • Module 02" title="Functional Components">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Functional components are the bedrock of React simplicity. They are stateless, focusing on presenting UI elements without managing state or lifecycle methods. These components are ideal for scenarios where complexity is unnecessary.
            </p>

            <div className="grid-2col" style={{ margin: '2rem 0' }}>
              <div>
                <CodeBlock title="Simple Functional Component" code={`// Standard Functional Component
const Greeting = () => {
  return <h1>Hello, React!</h1>;
};`} />
              </div>
              <div>
                <CodeBlock title="Functional Component with Props" code={`// Receiving props parameters
const WelcomeMessage = (props) => {
  return <p>Welcome, {props.name}!</p>;
};`} />
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  Here, WelcomeMessage is a functional component that receives a name prop and displays a personalized welcome message.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, margin: '2rem 0 1rem 0' }}>Rules of Functional Components:</h3>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem' }}>
              <li>📌 Component name <strong>must start with a Capital letter</strong> (e.g. <code>Greeting</code>, not <code>greeting</code>).</li>
              <li>📌 Must return <strong>one parent element</strong> (e.g. wrapped in a parent `div` or React Fragment).</li>
              <li>📌 Can use <strong>props & hooks</strong> (props pass data downwards, hooks manage lifecycle/state operations).</li>
              <li>✔️ Functional components are <strong>most used</strong> in modern React.</li>
            </ul>

            <button className="btn btn-primary" style={{ marginTop: '2rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('nesting_reusability')}>
              Next: Nesting & Reusability <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 3. NESTING & REUSABILITY */}
      {activeTab === 'nesting_reusability' && (
        <Section key="nesting_reusability" id="nesting_reusability" eyebrow="React JS • Module 03" title="Nesting & Component Reusability">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>
              In React, we can nest components inside within one another. This helps in creating more complex User Interfaces. The components that are nested inside parent components are called child components. Import and Export keywords facilitate nesting of the components.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', margin: '2rem 0' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>Export vs Import:</h4>
                <p>• <strong>Export:</strong> This keyword is used to export a particular module or file and use it in another module.</p>
                <p>• <strong>Import:</strong> This keyword is used to import a particular module or file and use it in the existing module.</p>

                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, margin: '1.5rem 0 0.8rem 0' }}>Component Composition:</h4>
                <p style={{ fontSize: '0.9rem' }}>
                  Component composition is the practice of combining multiple smaller components to create a more complex UI. In React, components can be nested inside each other, allowing developers to create a hierarchical structure.
                </p>
              </div>

              <div>
                <CodeBlock title="Nesting Syntax (Parent & Child)" code={`import React from 'react';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div>
      <Header />
      <main>Page Content</main>
      <Footer />
    </div>
  );
}

export default App;`} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginTop: '2.5rem' }}>Interactive Reusability Demonstration</h3>
            <p>Below is a working implementation of a reusable Button component receiving text and color props:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', margin: '1.5rem 0', alignItems: 'center' }}>
              <div>
                <CodeBlock title="Button.jsx (Child)" code={`import React from 'react';

function Button({ text, color }) {
  return (
    <button style={{
      backgroundColor: color,
      padding: '10px 20px',
      margin: '5px',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      {text}
    </button>
  );
}`} />
              </div>

              {/* Live Mock Render */}
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem', background: '#f8fafc', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#0f172a', fontWeight: 'bold' }}>Live Component Reusability Render</h4>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <button onClick={() => setButtonClickMessage('Login button clicked!')} style={{ backgroundColor: 'green', padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 600 }}>Login</button>
                  <button onClick={() => setButtonClickMessage('Register button clicked!')} style={{ backgroundColor: 'blue', padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 600 }}>Register</button>
                  <button onClick={() => setButtonClickMessage('Delete button clicked!')} style={{ backgroundColor: 'red', padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                  <button onClick={() => setButtonClickMessage('Submit button clicked!')} style={{ backgroundColor: 'purple', padding: '10px 20px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 600 }}>Submit</button>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem', fontSize: '0.82rem', color: '#475569', minHeight: '34px', fontFamily: 'monospace' }}>
                  {buttonClickMessage || 'Click buttons to see props reuse action!'}
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('naming_rules')}>
              Next: Component Naming Rules <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 4. COMPONENT NAMING RULES */}
      {activeTab === 'naming_rules' && (
        <Section key="naming_rules" id="naming_rules" eyebrow="React JS • Module 04" title="Component Naming Rules">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '2rem' }}>
              Consistency is vital when constructing React layouts. Adhere to these naming conventions to ensure readability and standard conformity:
            </p>

            <div className="grid-2col" style={{ margin: '1.5rem 0' }}>
              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontWeight: 800 }}>1. Components: PascalCase</h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#475569' }}>
                  When naming React components, use PascalCase (UpperCamelCase), where each word begins with an uppercase letter. This convention distinguishes React components from regular HTML tags.
                </p>
                <CodeBlock title="Correct Component Naming" code={`const Header = () => {
  return <div>...</div>;
};`} />
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontWeight: 800 }}>2. Props: camelCase</h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#475569' }}>
                  For prop parameters, utilize camelCase, where the first word is in lowercase and subsequent words begin with an uppercase letter.
                </p>
                <CodeBlock title="Correct Props Naming" code={`const Card = (props) => {
  return <div>{props.cardTitle}</div>;
};`} />
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981', fontWeight: 800 }}>3. Events: handleEvent</h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#475569' }}>
                  When defining event handler methods, prefix the function name with "handle" followed by the event name.
                </p>
                <CodeBlock title="Correct Event Handlers" code={`const handleClick = () => {
  // handle click logic
};
return <button onClick={handleClick}>Click Me</button>;`} />
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981', fontWeight: 800 }}>4. State: descriptive and concise</h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#475569' }}>
                  When defining state variables, employ descriptive and concise names that reflect the data they represent.
                </p>
                <CodeBlock title="Correct State Hooks" code={`const [count, setCount] = useState(0);`} />
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04', fontWeight: 800 }}>5. CSS Classes: kebab-case</h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#475569' }}>
                  For defining CSS classes in JSX, use kebab-case (lowercase with hyphens) to maintain consistency with standard stylesheet practices.
                </p>
                <CodeBlock title="Correct CSS Classes" code={`return <div className="card-container">...</div>;`} />
              </div>

              <div style={{ border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: 12, background: 'white' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ca8a04', fontWeight: 800 }}>6. File Names: camelCase or kebab-case</h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#475569' }}>
                  For React component file names, adhere to either camelCase or kebab-case. Choose a consistent style and maintain it across all files.
                </p>
                <CodeBlock title="Correct File Names" code={`// camelCase structure
HeaderComponent.js

// kebab-case structure
card-component.js`} />
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('fragments')}>
              Next: Fragments <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 5. FRAGMENTS */}
      {activeTab === 'fragments' && (
        <Section key="fragments" id="fragments" eyebrow="React JS • Module 05" title="Fragments">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>
              The main idea behind the fragment is to group the child components and render on UI as one return statement can't return multiple elements. Also, it avoids the creation of extra nodes that happen while using the div instead of Fragments.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', margin: '2rem 0', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.8rem' }}>Fragment Guidelines:</h4>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.92rem' }}>
                  <li>JSX can have **only one parent** element.</li>
                  <li>If we need multiple children, we must wrap them inside a single Fragment tag <code>&lt;&gt; ... &lt;/&gt;</code> or <code>&lt;React.Fragment&gt; ... &lt;/React.Fragment&gt;</code>.</li>
                  <li><code>&lt;&gt;</code> syntax acts as a structural placeholder representing a Fragment.</li>
                  <li>If we use a <code>&lt;div&gt;</code> wrapper instead of a Fragment, an additional container <code>&lt;div&gt;</code> tag will be generated inside the browser DOM hierarchy tree.</li>
                  <li>We can easily check this structural difference using the browser's developer inspect mode.</li>
                </ul>
              </div>

              {/* Code comparison box */}
              <div>
                <CodeBlock title="With Fragment tag" code={`function Fun() {
  return (
    <>
      <h2>React Title</h2>
      <p>This is a description</p>
    </>
  );
}`} />
                <CodeBlock title="Without Fragment (using div tag)" code={`function Fun() {
  return (
    <div>
      <h2>React Title</h2>
      <p>This is a description</p>
    </div>
  );
}`} />
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '2rem', backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('mini_project')}>
              Next: Mini Project: Food Agenda <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 6. MINI PROJECT */}
      {activeTab === 'mini_project' && (
        <Section key="mini_project" id="mini_project" eyebrow="Hands-On Practice • Module 06" title="Mini Project: Food Item Agenda">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <p>
              In this mini-project, we build a React application named **Food Item Agenda** from scratch using component state hooks to capture new item inputs, append them to a list, and delete items.
            </p>

            <div style={{ margin: '2rem 0' }}>
              {/* Step-by-Step Tutorial Details */}
              <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>Step-by-Step Implementation:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                    <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0f172a' }}>Step 1: Create the Component File</strong>
                    <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                      Create a new file named <code>src/FoodAgenda.jsx</code> inside your project directory.
                    </p>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                    <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0f172a' }}>Step 2: Add State Variables & Functions</strong>
                    <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                      Add two state hooks: <code>food</code> (to hold input string) and <code>agenda</code> (to hold array list). Implement <code>addFood</code> to append items using the spread operator, and <code>deleteFood</code> to filter items out by index.
                    </p>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                    <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0f172a' }}>Step 3: Write the Component Code</strong>
                    <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                      Write the complete component code matching input value bindings, list mappings, and export statements:
                    </p>
                    <CodeBlock title="src/FoodAgenda.jsx" code={`import React, { useState } from 'react';

export default function FoodAgenda() {
  const [food, setFood] = useState("");
  const [agenda, setAgenda] = useState(["Apple", "Banana"]);

  const addFood = () => {
    if (food.trim() === "") return;
    setAgenda([...agenda, food.trim()]);
    setFood("");
  };

  const deleteFood = (indexToDelete) => {
    setAgenda(agenda.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Food Item Agenda</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={food} 
          onChange={(e) => setFood(e.target.value)} 
          placeholder="Enter food item..." 
        />
        <button onClick={addFood}>Add</button>
      </div>
      <ul>
        {agenda.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteFood(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`} />
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                    <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0f172a' }}>Step 4: Import and Render in App.jsx</strong>
                    <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.8rem' }}>
                      Import your new component inside <code>src/App.jsx</code> and mount it inside the parent layout:
                    </p>
                    <CodeBlock title="src/App.jsx" code={`import React from 'react';
import FoodAgenda from './FoodAgenda';

function App() {
  return (
    <div>
      <FoodAgenda />
    </div>
  );
}

export default App;`} />
                  </div>
                </div> {/* Closes the flex column parent */}

              {/* Working Interactive Playground Widget */}
              <div style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
                border: '1px solid #cbd5e1', 
                borderRadius: '24px', 
                padding: '2rem', 
                boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
                margin: '3rem auto 1.5rem auto',
                maxWidth: '500px',
                width: '100%'              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Food Agenda Builder
                  </h4>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '20px' }}>
                    {agenda.length} {agenda.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    placeholder="Enter food item (e.g. Pizza)..."
                    style={{ 
                      flex: 1, 
                      padding: '0.7rem 1rem', 
                      border: '2px solid #cbd5e1', 
                      borderRadius: '12px', 
                      fontSize: '0.88rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddFood} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      padding: '0.7rem 1.2rem', 
                      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '12px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)'
                    }}
                  >
                    <Plus size={16} /> Add
                  </motion.button>
                </div>

                <div style={{ background: '#f1f5f9', borderRadius: '16px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span>Active Planner List</span>
                    {agenda.length > 0 && (
                      <button 
                        onClick={() => setAgenda([])} 
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <Trash2 size={12} /> Clear All
                      </button>
                    )}
                  </div>
                  
                  <AnimatePresence mode="popLayout">
                    {agenda.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
                      >
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '1.5rem' }}>🍉</div>
                        <span>Your agenda is currently empty. Add some delicious food!</span>
                      </motion.div>
                    ) : (
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {agenda.map((item, index) => (
                          <motion.li 
                            key={item + '-' + index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            layout
                            style={{ 
                              padding: '0.75rem 1rem', 
                              background: '#ffffff', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px', 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              fontSize: '0.88rem',
                              fontWeight: 600,
                              color: '#334155',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '1rem' }}>🥗</span>
                              <span>{item}</span>
                            </div>
                            <button 
                              onClick={() => handleDeleteFood(index)} 
                              style={{ 
                                background: '#fee2e2', 
                                border: 'none', 
                                color: '#ef4444', 
                                cursor: 'pointer', 
                                padding: '6px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                            >
                              <X size={14} />
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </AnimatePresence>
                </div>
              </div> {/* Closes playground widget card */}
            </div> {/* Closes outer wrapper div */}

            <button className="btn btn-primary" style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }} onClick={() => handleContinue('quiz')}>
              Next: Check Your Knowledge (Quiz) <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}

      {/* 7. QUIZ */}
      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Assessment" title="Day 2 Quiz: React Components">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map((q, qIdx) => (
                <div key={q.key} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                    Q{qIdx + 1}: {q.question}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.key] === optIdx;
                      const isCorrect = optIdx === q.correct;
                      return (
                        <button
                          key={optIdx}
                          disabled={quizChecked}
                          onClick={() => handleQuizAnswer(q.key, optIdx)}
                          style={{
                            textAlign: 'left',
                            background: isSelected 
                              ? (quizChecked ? (isCorrect ? '#dcfce7' : '#fee2e2') : '#e0e7ff') 
                              : '#ffffff',
                            color: isSelected 
                              ? (quizChecked ? (isCorrect ? '#15803d' : '#b91c1c') : '#312e81') 
                              : '#334155',
                            border: '1px solid',
                            borderColor: isSelected 
                              ? (quizChecked ? (isCorrect ? '#86efac' : '#fca5a5') : '#818cf8') 
                              : '#cbd5e1',
                            borderRadius: '10px',
                            padding: '0.75rem 1rem',
                            cursor: quizChecked ? 'default' : 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSelected ? 700 : 500,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>{opt}</span>
                          {quizChecked && isCorrect && <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓ Correct</span>}
                          {quizChecked && isSelected && !isCorrect && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗ Incorrect</span>}
                        </button>
                      );
                    })}
                  </div>
                  {quizChecked && (
                    <div style={{ marginTop: '1rem', padding: '0.8rem 1rem', background: '#eff6ff', borderRadius: '10px', fontSize: '0.82rem', color: '#1e40af', lineHeight: 1.45 }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              {!quizChecked ? (
                <button
                  onClick={() => setQuizChecked(true)}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="btn btn-primary"
                  style={{ opacity: Object.keys(quizAnswers).length < quizQuestions.length ? 0.6 : 1, backgroundColor: '#2563eb', borderColor: '#2563eb' }}
                >
                  Submit & Check Answers
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizChecked(false);
                    }}
                    className="btn btn-outline"
                  >
                    Reset Quiz
                  </button>
                  <button
                    onClick={() => handleContinue('assignment')}
                    className="btn btn-primary"
                    style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }}
                  >
                    Continue to Assignment <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>

          </div>
        </Section>
      )}

      {/* 8. ASSIGNMENT */}
      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Homework" title="Day 2 Assignment">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.7 }}>
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Review & Practice: Components Composition & Reusability</h3>
            <p>To reinforce what you've learned today, complete the following assignment tasks:</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #4f46e5', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', fontWeight: 800 }}>Task 1: Nesting Components (Header, Main, Footer)</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                Create separate functional components: <code>Header.jsx</code>, <code>MainContent.jsx</code>, and <code>Footer.jsx</code>. Export them using the default export keyword, and import them inside a single wrapper parent component <code>App.jsx</code> to create a structured web application.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', fontWeight: 800 }}>Task 2: Reusable Card with Props</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                Build a reusable component named <code>Card.jsx</code> that accepts three props: <code>title</code>, <code>desc</code>, and <code>bgColor</code>. Render three separate instances of this Card in your app layout, passing unique text inputs and color specifications (e.g. green, blue, purple) to verify props binding.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #ca8a04', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b', fontWeight: 800 }}>Task 3: Food Agenda Expansion</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0 }}>
                Expand the **Food Item Agenda** mini-project by adding an additional "Clear All" button. This button should invoke a function that clears all elements in the agenda list array at once, resetting the list back to an empty state.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2.5rem' }}>
              <button className="btn btn-primary" onClick={() => alert('React Day 2 Assignment Submitted successfully!')} style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }}>
                Submit Assignment
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* Lightbox Modal */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: '2rem'
          }}
        >
          <img 
            src={zoomedImage} 
            alt="Zoomed Diagram" 
            style={{ 
              maxWidth: '95%', 
              maxHeight: '95%', 
              borderRadius: '16px', 
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }} 
          />
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '2rem',
            color: '#94a3b8',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            background: 'rgba(255,255,255,0.15)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            pointerEvents: 'none'
          }}>
            Click anywhere to close
          </div>
        </div>
      )}

    </AnimatePresence>
  );
}
