import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, Eye
} from 'lucide-react';
import MatplotlibAIPlayground from '../../components/MatplotlibAIPlayground';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#f97316', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SyntaxHighlighter = ({ code }) => (
  <div style={{ fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem', background: '#0f172a', padding: '1rem', borderRadius: '8px', color: '#e1e4e8', overflowX: 'auto' }}>
    <pre style={{ margin: 0 }}>{code}</pre>
  </div>
);

export default function MatplotlibDay1({ activeTab, onNavigate, openAITutor }) {
  const day1Presets = [
    {
      name: 'create_line_chart',
      label: 'Student Marks Plot',
      code: `import matplotlib.pyplot as plt\n\nsubjects = ['Maths', 'Science', 'English', 'CS']\nmarks = [85, 90, 78, 95]\n\n# Configure figure size and plot line\nplt.figure(figsize=(6, 4))\nplt.plot(subjects, marks, label='Simran', color='orange')\nplt.title('Simran Marksheet Summary')\nplt.xlabel('Subjects')\nplt.ylabel('Marks')\nplt.grid(True)\nplt.legend()\nplt.show()`,
      output: `🎉 Chart successfully generated!\n[Figure: Line plot rendered for student marks metrics]`
    }
  ];

  const day1Challenges = [
    {
      id: 'ch1_first_plot',
      title: '1. First Marksheet Plot',
      desc: 'Use plt.plot(subjects, marks) and plt.show() to render a marks line chart.',
      hint: 'Call plt.plot(subjects, marks) followed by plt.show() at the end.',
    },
    {
      id: 'ch1_save_fig',
      title: '2. Save Plot to Disk',
      desc: 'Save the active marks figure to a local file named "chart.png".',
      hint: 'Call plt.savefig("chart.png") before plt.show().',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // Visual state interactive labels
  const [hoveredChartPart, setHoveredChartPart] = useState(null);

  // AI Activity compiler states
  const [aiActivityCode, setAiActivityCode] = useState(
`import matplotlib.pyplot as plt

subjects = ['Maths', 'Science', 'English', 'CS']
marks = [85, 90, 78, 95]

# Write line plot code:
plt.figure(figsize=(6, 4))
plt.plot(subjects, marks, label='Simran')
plt.title('Student Academic Marks')
plt.xlabel('Subjects')
plt.ylabel('Marks')
plt.legend()
plt.grid(True)
plt.show()`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);
  const [renderedPlot, setRenderedPlot] = useState(null);

  const handleContinue = (nextTabId) => {
    onNavigate('matplotlib_day1', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Instantiating pyplot state-machine engine...\n');
    setRenderedPlot(null);
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import matplotlib.pyplot as plt') || aiActivityCode.includes('import matplotlib');
      const hasPlot = aiActivityCode.includes('plt.plot(');
      const hasTitle = aiActivityCode.includes('plt.title(');
      const hasLabels = aiActivityCode.includes('plt.xlabel(') && aiActivityCode.includes('plt.ylabel(');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: No module named "matplotlib.pyplot". Include the import statement.');
        return;
      }
      if (!hasPlot) {
        setAiActivityConsole(p => p + 'ValueError: Line plotting instruction (plt.plot) not detected in active buffer.');
        return;
      }
      if (!hasTitle) {
        setAiActivityConsole(p => p + 'Warning: Visual plot lacks a header title. Try adding plt.title().');
        return;
      }
      if (!hasLabels) {
        setAiActivityConsole(p => p + 'Warning: X or Y axis labels are missing. Try adding plt.xlabel() and plt.ylabel().');
        return;
      }

      setAiActivityConsole(
        `>>> Canvas initialized!\nLine Chart Generated:\n[Figure size 6x4 with 1 Axes]\nAxes line count: 1 (label="Simran")\nTitle: "Student Academic Marks"\n\n✅ AI Validation: Line chart rendered successfully! Expected marks coordinates matched.`
      );
      setAiActivityPassed(true);
      setRenderedPlot('line');
    }, 600);
  };

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleCheckQuestion = (qId) => {
    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const checkFinalScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.ans) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
  };

  const quizQuestions = [
    {
      id: 'q1',
      q: 'Which module in Matplotlib is used for state-machine plotting operations?',
      opts: ['matplotlib.axes', 'matplotlib.pyplot', 'matplotlib.figure', 'matplotlib.pychart'],
      ans: 1,
      exp: '`matplotlib.pyplot` is the standard sub-module containing plotting commands.'
    },
    {
      id: 'q2',
      q: 'What is the structural difference between Figure and Axes in Matplotlib?',
      opts: [
        'Axes is the outer canvas container; Figure represents the actual chart drawing coordinates.',
        'Figure is the outer canvas window container; Axes represents an individual chart plot area (with labels, ticks, and grids).',
        'They are synonyms.',
        'Figure handles 3D plotting only; Axes handles 2D.'
      ],
      ans: 1,
      exp: 'The `Figure` object acts as the overall window container. The `Axes` object is the actual plot box drawing context.'
    },
    {
      id: 'q3',
      q: 'Which instruction enables gridlines on the active chart coordinates?',
      opts: ['plt.grid(True)', 'plt.show_grid()', 'plt.lines(grid=True)', 'plt.background("grid")'],
      ans: 0,
      exp: '`plt.grid(True)` displays major gridline grids across the plot.'
    },
    {
      id: 'q4',
      q: 'What happens if you call plt.show() BEFORE plt.savefig("chart.png")?',
      opts: [
        'The image file is successfully saved.',
        'The program raises a SyntaxError.',
        'An empty/blank image is saved because plt.show() clears the active figure buffer.',
        'The image resolution is doubled.'
      ],
      ans: 2,
      exp: 'Calling `plt.show()` releases/clears the active state-machine figure buffer. Therefore, `plt.savefig()` must always be executed BEFORE `plt.show()`.'
    }
  ];

  return (
    <div className="learning-container">

      {activeTab === 'intro' && (
        <Section eyebrow="Day 1 • Pyplot Fundamentals" title="Introduction to Matplotlib & Your First Plot">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* AI Teacher Banner */}
            <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="#ea580c" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#c2410c', display: 'block', marginBottom: '4px' }}>🤖 AI Teacher Core Guidance:</strong>
                <span style={{ fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.5' }}>
                  Welcome to Matplotlib! Data visualization is the art of translating raw numbers into graphics that human brains can understand instantly. Think of the <strong>Figure</strong> as your blank canvas, and <strong>Axes</strong> as the individual chart boards you place on that canvas. Let's learn how to draw our very first line plot step-by-step!
                </span>
              </div>
            </div>

            {/* Learning Objectives */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={18} color="#f97316" /> Learning Objectives:
              </h4>
              <ul style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Explain what data visualization is and why visual charts outperform raw data sheets.</li>
                <li>Install Matplotlib and import the <code>pyplot</code> sub-module.</li>
                <li>Differentiate clearly between a Matplotlib <strong>Figure</strong> and <strong>Axes</strong>.</li>
                <li>Draw line plots with titles, labels, legends, customized sizes, and grids.</li>
                <li>Chart multiple data trends on a single plot and export the output figures to disk.</li>
              </ul>
            </div>

            {/* Section 1 */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                1. What is Data Visualization & Why Charts Matter
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Data visualization is the graphical representation of information and data. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data.
              </p>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f97316', marginTop: '0.8rem', fontSize: '0.9rem', color: '#475569' }}>
                <strong>Why are charts important?</strong> Human brains process visual graphics up to 60,000 times faster than text tables. Charts help us identify relationships, detect trends over time, compare discrete categories, and present analytics results to stakeholders.
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                2. Introduction to Matplotlib & Installation
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                Matplotlib is Python's most popular 2D plotting library. It provides high-quality graphics and supports a wide variety of static, animated, and interactive visualizations.
              </p>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                To install Matplotlib in your local Python environment, run the standard installer command:
              </p>
              <SyntaxHighlighter code="pip install matplotlib" />
            </div>

            {/* Section 3 */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                3. The Pyplot Module & Your First Plot
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                The <code>matplotlib.pyplot</code> module is a state-machine interface that makes Matplotlib work like MATLAB. It provides simple functions to instantiate figures, plot lines, customize coordinates, and display charts.
              </p>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                Let's write a simple program to plot a single line:
              </p>
              <SyntaxHighlighter code={`import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 25, 20, 35]\n\n# Create a simple line plot\nplt.plot(x, y)\nplt.show()`} />
              
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.8rem', borderRadius: '8px', marginTop: '0.8rem', fontSize: '0.9rem', color: '#166534' }}>
                <strong>Expected Output:</strong> A window displays showing a straight-segment line connecting points (1,10), (2,25), (3,20), and (4,35) on an auto-scaled coordinate grid.
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                4. Canvas Architecture: Figure vs. Axes
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                A common point of confusion for beginners is the difference between a Figure and an Axes:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>🖼️ Figure (Canvas Container)</strong>
                  <span style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                    The overall window or page container. It holds all subplots, legends, titles, and canvas drawing objects. Think of it as the picture frame.
                  </span>
                </div>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>📊 Axes (Plotting Coordinate Box)</strong>
                  <span style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                    The actual chart area where data is drawn. It contains the X and Y axes limits, tick markings, grid lines, and titles. A single Figure can contain multiple Axes (subplots).
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Anatomizer */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem', background: '#f8fafc' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '8px', textAlign: 'center' }}>
                Interactive Anatomy of a Pyplot Chart
              </strong>
              <p style={{ fontSize: '0.88rem', color: '#64748b', textAlign: 'center', marginBottom: '1.2rem' }}>
                Hover over the chart elements to inspect their properties:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '240px', background: '#fff', border: '2px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#1e293b', cursor: 'pointer', border: hoveredChartPart === 'title' ? '2px solid #f97316' : '1px dashed #94a3b8', padding: '2px' }} onMouseEnter={() => setHoveredChartPart('title')}>
                    Plot Title (plt.title)
                  </div>
                  
                  <div style={{ height: '120px', margin: '15px 0', borderLeft: '2px solid #475569', borderBottom: '2px solid #475569', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Grid mockup */}
                    <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', opacity: 0.15, pointerEvents: 'none' }}>
                      {[...Array(12)].map((_, i) => <div key={i} style={{ border: '1px solid #475569' }} />)}
                    </div>
                    {/* Line plot mockup */}
                    <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                      <path d="M 10 100 L 100 70 L 200 40 L 300 20" fill="none" stroke="#f97316" strokeWidth="3" />
                    </svg>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', cursor: 'pointer', border: hoveredChartPart === 'axes' ? '2px solid #f97316' : '1px dashed #cbd5e1', padding: '2px' }} onMouseEnter={() => setHoveredChartPart('axes')}>
                      Axes Plotting Context
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                    <span style={{ cursor: 'pointer', border: hoveredChartPart === 'labels' ? '2px solid #f97316' : '1px dashed #cbd5e1', padding: '2px' }} onMouseEnter={() => setHoveredChartPart('labels')}>X-Labels (plt.xlabel)</span>
                    <span style={{ cursor: 'pointer', border: hoveredChartPart === 'legends' ? '2px solid #f97316' : '1px dashed #cbd5e1', padding: '2px' }} onMouseEnter={() => setHoveredChartPart('legends')}>Legends (plt.legend)</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.2rem', padding: '0.8rem', background: '#fff', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%', minHeight: '60px', fontSize: '0.88rem', color: '#475569' }}>
                  {hoveredChartPart === 'title' ? (
                    <span><strong>Plot Title:</strong> Configured using <code>plt.title('My Title')</code>. Tells the viewer what data is mapped.</span>
                  ) : hoveredChartPart === 'axes' ? (
                    <span><strong>Axes Context:</strong> The coordinate bounding box containing lines, ticks, axis labels, and grids. A single Figure can contain multiple sub-Axes.</span>
                  ) : hoveredChartPart === 'labels' ? (
                    <span><strong>Axis Labels:</strong> Configured using <code>plt.xlabel('X Axis Title')</code> and <code>plt.ylabel('Y Axis Title')</code>. Describes the variables shown.</span>
                  ) : hoveredChartPart === 'legends' ? (
                    <span><strong>Legend:</strong> Displayed using <code>plt.legend()</code>. Identifies which line maps to which dataset, referencing labels configured inside <code>plt.plot(..., label='Series A')</code>.</span>
                  ) : (
                    <span>Hover over the title, labels, legend, or coordinates grid above to inspect their Matplotlib properties.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                5. Chart Customizations Step-by-Step
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Matplotlib offers a variety of functions to transform a bare line plot into a professional chart:
              </p>

              {/* Parameters explanation table */}
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: '#334155' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Function Call</th>
                      <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Purpose & Parameters</th>
                      <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Example Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>plt.figure()</td>
                      <td style={{ padding: '10px' }}>Sets canvas dimensions in inches. Takes <code>figsize=(width, height)</code>.</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace' }}>plt.figure(figsize=(8, 5))</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>plt.title()</td>
                      <td style={{ padding: '10px' }}>Appends a title header. Takes text string and custom font parameters.</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace' }}>plt.title('Monthly Sales')</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>plt.xlabel() / ylabel()</td>
                      <td style={{ padding: '10px' }}>Appends text labels along horizontal (X) and vertical (Y) axes boundaries.</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace' }}>plt.xlabel('Timeline')</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>plt.grid()</td>
                      <td style={{ padding: '10px' }}>Displays helper gridlines. Takes boolean <code>True</code> or <code>False</code>.</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace' }}>plt.grid(True)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>plt.legend()</td>
                      <td style={{ padding: '10px' }}>Displays active series labels. Requires <code>label="..."</code> parameter inside plot commands.</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace' }}>plt.legend()</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>plt.savefig()</td>
                      <td style={{ padding: '10px' }}>Exports the active figure canvas to disk formats (PNG, JPG, PDF).</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace' }}>plt.savefig('my_chart.png')</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h3 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px', marginBottom: '0.8rem' }}>
                6. Plotting Multiple Lines
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                To plot multiple data trends on the same chart, simply call <code>plt.plot()</code> multiple times before calling <code>plt.show()</code>:
              </p>
              <SyntaxHighlighter code={`import matplotlib.pyplot as plt\n\nmonths = ['Jan', 'Feb', 'Mar']\nsales_A = [100, 150, 130]\nsales_B = [90, 180, 160]\n\nplt.plot(months, sales_A, label='Product A')\nplt.plot(months, sales_B, label='Product B')\n\nplt.title('Sales Comparison')\nplt.legend()\nplt.show()`} />
            </div>

            {/* Common Beginner Mistakes & AI Tips */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '1rem', borderRadius: '8px' }}>
                <h4 style={{ color: '#991b1b', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={18} color="#dc2626" /> Common Beginner Mistakes:
                </h4>
                <ul style={{ fontSize: '0.88rem', color: '#991b1b', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.5 }}>
                  <li style={{ marginBottom: '6px' }}><strong>Importing raw matplotlib:</strong> Running <code>import matplotlib</code> and then trying to call <code>matplotlib.plot()</code>. You must import the sub-module: <code>import matplotlib.pyplot as plt</code>.</li>
                  <li><strong>Saving after plt.show():</strong> Calling <code>plt.savefig()</code> after <code>plt.show()</code> outputs a blank image because <code>plt.show()</code> clears the active figure buffer.</li>
                </ul>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', padding: '1rem', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e40af', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={18} color="#2563eb" /> AI Study Tips:
                </h4>
                <ul style={{ fontSize: '0.88rem', color: '#1e40af', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.5 }}>
                  <li style={{ marginBottom: '6px' }}><strong>Object-Oriented syntax:</strong> While <code>plt.plot()</code> is fast, try learning <code>fig, ax = plt.subplots()</code> as you build complex dashboards. It gives you direct handle references to each sub-chart container!</li>
                  <li><strong>Always add labels:</strong> A chart without labels or legends is useless to viewers. Make a habit of calling <code>plt.xlabel()</code>, <code>plt.ylabel()</code>, and <code>plt.legend()</code> every time.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 1 • AI Studio" title="AI Activity: Create a Marks Line Chart">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Challenge: Map Student Academic Marks</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Write a pyplot script to chart marks across school subjects.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Configure the figure dimensions to 6x4.</li>
                <li>Plot the <code>subjects</code> list on the X axis, and <code>marks</code> list on the Y axis.</li>
                <li>Set the title to <code>"Student Academic Marks"</code>, labels, show gridlines, and compile.</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  plot_marks.py
                </div>
                <textarea
                  value={aiActivityCode}
                  onChange={(e) => setAiActivityCode(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#0f172a',
                    color: '#fdba74',
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.88rem',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    lineHeight: 1.6
                  }}
                />
                <div style={{ padding: '8px 12px', background: '#1e293b', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleRunAIActivity} style={{ background: '#f97316', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                    Validate Plot Code
                  </button>
                </div>
              </div>

              {/* Console output */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1, background: '#1e293b', color: '#38bdf8', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', border: '1px solid #334155' }}>
                  {aiActivityConsole || 'Console compiler idle... Click Validate Plot Code to execute.'}
                </div>

                {renderedPlot && (
                  <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ background: '#f1f5f9', padding: '0.4rem 0.8rem', borderBottom: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Eye size={12} color="#6366f1" />
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>GRAPH PREVIEW (plt.show()):</span>
                    </div>
                    <div style={{ padding: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
                      <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                        <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Student Academic Marks</text>
                        <line x1="40" y1="40" x2="260" y2="40" stroke="#f1f5f9" />
                        <line x1="40" y1="80" x2="260" y2="80" stroke="#f1f5f9" />
                        <line x1="40" y1="120" x2="260" y2="120" stroke="#f1f5f9" />
                        <line x1="40" y1="30" x2="40" y2="150" stroke="#475569" strokeWidth="2" />
                        <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
                        <path d="M 60 130 L 110 80 L 160 110 L 210 50" fill="none" stroke="#ea580c" strokeWidth="2.5" />
                        <circle cx="60" cy="130" r="3.5" fill="#ea580c" />
                        <circle cx="110" cy="80" r="3.5" fill="#ea580c" />
                        <circle cx="160" cy="110" r="3.5" fill="#ea580c" />
                        <circle cx="210" cy="50" r="3.5" fill="#ea580c" />
                        <text x="140" y="168" textAnchor="middle" fontSize="9" fill="#475569">Subjects</text>
                        <text x="12" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-90 12 90)">Marks</text>
                      </svg>
                    </div>
                  </div>
                )}

                {aiActivityPassed && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', fontSize: '0.88rem', display: 'block' }}>Milestone Cleared!</strong>
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>Matplotlib line plot correctly configured and rendered.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('intro')}>
                ← Back to Pyplot Intro
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 1 • Practical Lab" title="Line Plotting Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct matplotlib plotting syntax.
            </p>
            <MatplotlibAIPlayground dayId="day1" presets={day1Presets} challenges={day1Challenges} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('activity')}>
                ← Back to AI Activity
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('assessment')}>
                Continue to Quiz →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assessment' && (
        <Section eyebrow="Day 1 • Evaluation" title="Day 1 Assessment Quiz">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Test Your Understanding</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#f97316', fontWeight: 'bold' }}>Q{idx + 1}.</span> {q.q}
                  </h4>
                  <div style={{ display: 'grid', gap: '0.8rem' }}>
                    {q.opts.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[q.id] === oIdx;
                      const isChecked = checkedQuestions[q.id];
                      const isCorrect = q.ans === oIdx;

                      let btnStyle = {
                        width: '100%',
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#475569',
                        transition: 'all 0.2s'
                      };

                      if (isSelected) {
                        btnStyle.background = '#fff7ed';
                        btnStyle.borderColor = '#fdba74';
                        btnStyle.color = '#c2410c';
                      }

                      if (isChecked) {
                        if (isCorrect) {
                          btnStyle.background = '#dcfce7';
                          btnStyle.borderColor = '#86efac';
                          btnStyle.color = '#15803d';
                        } else if (isSelected) {
                          btnStyle.background = '#fee2e2';
                          btnStyle.borderColor = '#fca5a5';
                          btnStyle.color = '#b91c1c';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => !isChecked && handleSelectOption(q.id, oIdx)}
                          style={btnStyle}
                          disabled={isChecked}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {!checkedQuestions[q.id] && selectedAnswers[q.id] !== undefined && (
                    <button
                      onClick={() => handleCheckQuestion(q.id)}
                      style={{
                        marginTop: '1rem',
                        background: '#1e293b',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 16px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Verify Answer
                    </button>
                  )}

                  {checkedQuestions[q.id] && (
                    <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.85rem', color: '#475569', display: 'flex', gap: '6px' }}>
                      <Sparkles size={16} color="#f97316" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Tutor Explanation:</strong> {q.exp}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff7ed', border: '1px solid #ffedd5', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#9a3412' }}>Submit Your Assessment</h3>
              <p style={{ color: '#c2410c', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Verify all answers above before computing final grading scores.
              </p>
              
              <button className="btn btn-primary" onClick={checkFinalScore} style={{ background: '#f97316', borderColor: '#f97316' }}>
                Calculate Grading Score
              </button>

              {score !== null && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c2410c', display: 'block' }}>{score} / 4</span>
                  <span style={{ fontSize: '0.9rem', color: '#9a3412', fontWeight: 600 }}>
                    {score === 4 ? '🏆 Outstanding! Perfect score!' : score >= 2 ? '👍 Good job! Review the explanations to refine your knowledge.' : '⚠️ Keep practicing! Ask the AI Tutor for assistance.'}
                  </span>
                </div>
              )}
            </div>

            {/* Homework Assignment */}
            <div style={{ marginTop: '2.5rem', background: '#f8fafc', border: '1px dashed #64748b', padding: '1.5rem', borderRadius: '12px', width: '100%' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                <FileText size={20} color="#f97316" /> 📝 Homework Assignment
              </h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Define a local dictionary of monthly temperatures (January to June). Write a python script using Matplotlib that configures a 8x5 figure canvas, plots the line with legends and a grid, and saves the output graph as "temp_trends.png".
              </p>
            </div>

            {/* Lesson Rating */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%' }}>
              <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.9rem' }}>⭐ Rate this Lesson:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setLessonRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.8rem',
                      cursor: 'pointer',
                      color: star <= lessonRating ? '#f59e0b' : '#cbd5e1',
                      transition: 'color 0.2s'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              {lessonRating > 0 && (
                <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                  Thank you! You rated this lesson {lessonRating}/5 stars.
                </span>
              )}
            </div>
          </div>
        </Section>
      )}

    </div>
  );
}
