import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, FileText, CheckCircle,
  AlertTriangle, Sparkles, Activity, Code, BookOpen, Sliders, Database, Filter, ArrowRight
} from 'lucide-react';
import PandasAIPlayground from '../../components/PandasAIPlayground';

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const SyntaxHighlighter = ({ code, style = {} }) => {
  const lines = code.split('\n');
  return (
    <div style={{ 
      fontFamily: 'monospace', 
      lineHeight: '1.6', 
      fontSize: '0.9rem', 
      overflowX: 'auto', 
      background: '#0f172a', 
      padding: '1rem', 
      borderRadius: '8px', 
      color: '#e1e4e8', 
      ...style 
    }}>
      {lines.map((line, lineIdx) => {
        if (!line.trim() && line === '') return <div key={lineIdx} style={{ height: '1.2em' }}></div>;
        const rx = /(\/\/[^\n]*|#[^\n]*(?=\n|$))|((?:`[\s\S]*?`)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?>?)|(?:\b(let|const|var|function|def|elif|import|from|as|return|if|else|switch|case|break|continue|default|for|while|do|of|in|new|typeof|class|export|delete|void|throw|try|catch|finally|async|await)\b)|(?:\b(true|false|null|undefined|NaN|Infinity|this|super|None|True|False)\b)|(?:\b(pd|DataFrame|Series|read_csv|read_excel|read_json|loc|iloc|isin|between|query|head|tail|shape|columns|index|dtypes)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w])|( +|\t+)/g;
        let m; let k = 0; const tokens = []; rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          const [tok, comment, str, htmlTag, kw, literal, builtin, num, ident, sym] = m;
          let color = '#e1e4e8'; let fontWeight = 'normal';
          if (comment) color = '#8b949e';
          else if (str) color = '#a5d6ff';
          else if (htmlTag) color = '#7ee787';
          else if (kw) { color = '#ff7b72'; fontWeight = 'bold'; }
          else if (literal) color = '#d2a8ff';
          else if (builtin) color = '#ffb454';
          else if (num) color = '#79c0ff';
          else if (ident) color = '#e1e4e8';
          else if (sym) color = '#ff7b72';
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

export default function PandasDay2({ activeTab, onNavigate, openAITutor }) {
  const day2Presets = [
    {
      name: 'load_csv',
      label: 'Read CSV File',
      code: `import pandas as pd\n\n# Load CSV into DataFrame\ndf = pd.read_csv('data.csv')\nprint(df.head())`,
      output: `   ID    Product  Sales\n0   1     Laptop   1200\n1   2     Tablet    450\n2   3      Phone    800\n3   4  Headphones    150\n5   5    Monitor    300`
    },
    {
      name: 'select_loc',
      label: 'Using loc Selection',
      code: `import pandas as pd\n\ndata = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}\ndf = pd.DataFrame(data)\nselected = df.loc[0:1, ['Name', 'Age']]\nprint(selected)`,
      output: `    Name  Age\n0  Alice   25\n1    Bob   30`
    },
    {
      name: 'boolean_filter',
      label: 'Query Filtering',
      code: `import pandas as pd\n\ndata = {'Student': ['Raj', 'Simran', 'Amit'], 'Score': [75, 92, 68]}\ndf = pd.DataFrame(data)\n# Multiple conditions\nfiltered = df[(df['Score'] > 70) & (df['Score'] < 95)]\nprint(filtered)`,
      output: `  Student  Score\n0     Raj     75\n2    Amit     68`
    }
  ];

  const day2Challenges = [
    {
      id: 'ch2_read_csv',
      title: '1. Ingest Data CSV',
      desc: 'Read the CSV file "data.csv" into a DataFrame named df.',
      hint: 'Use df = pd.read_csv("data.csv").',
    },
    {
      id: 'ch2_select_cols',
      title: '2. Select Column Pair',
      desc: 'Select the Name and Age columns from the DataFrame.',
      hint: 'Use df[["Name", "Age"]].',
    },
    {
      id: 'ch2_filter_score',
      title: '3. Filter Scores > 80',
      desc: 'Filter the DataFrame to find students with Score above 80.',
      hint: 'Use df[df["Score"] > 80] or df.query("Score > 80").',
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [lessonRating, setLessonRating] = useState(0);

  // AI Activity compiler states
  const [aiActivityCode, setAiActivityCode] = useState(
`import pandas as pd

# Student marks data
data = {
    'Student': ['Raj', 'Simran', 'Amit', 'Neha', 'Vijay', 'Pooja'],
    'Score': [75, 92, 68, 95, 82, 79]
}
df = pd.DataFrame(data)

# Find students who scored above 80
filtered_df = df[df['Score'] > 80]

print(filtered_df)`
  );
  const [aiActivityConsole, setAiActivityConsole] = useState('');
  const [aiActivityPassed, setAiActivityPassed] = useState(false);

  const handleContinue = (nextTabId) => {
    onNavigate('pandas_day2', nextTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunAIActivity = () => {
    setAiActivityConsole('>>> Analyzing data source variables...\n');
    setTimeout(() => {
      const hasImport = aiActivityCode.includes('import pandas as pd') || aiActivityCode.includes('import pandas');
      const hasCondition = aiActivityCode.includes('> 80') || aiActivityCode.includes('>80') || aiActivityCode.includes('query(');

      if (!hasImport) {
        setAiActivityConsole(p => p + 'ModuleNotFoundError: No module named "pandas". Make sure to import pandas as pd.');
        return;
      }

      if (!hasCondition) {
        setAiActivityConsole(p => p + 'ValueError: Correct filtering logic (> 80) not found in code.');
        return;
      }

      setAiActivityConsole(
        `>>> DataFrame successfully filtered!\n\nFiltered results (Score > 80):\n   Student  Score\n1   Simran     92\n3     Neha     95\n4    Vijay     82\n\n✅ AI Validation Success: All 3 qualifying records correctly identified!`
      );
      setAiActivityPassed(true);
    }, 600);
  };

  const quizQuestions = [
    {
      id: 'q1',
      q: 'Which function is used to load data from an Excel file?',
      opts: ['pd.read_excel()', 'pd.read_sheet()', 'pd.read_csv(excel=True)', 'pd.load_excel()'],
      ans: 0,
      exp: '`pd.read_excel()` reads Excel sheets into a DataFrame. You can pass `sheet_name` as a parameter.'
    },
    {
      id: 'q2',
      q: 'Which function is used to load data from a JSON file?',
      opts: ['pd.read_dict()', 'pd.read_json()', 'pd.json_load()', 'pd.read_csv(json=True)'],
      ans: 1,
      exp: '`pd.read_json()` parses JSON strings or files into Pandas DataFrames.'
    },
    {
      id: 'q3',
      q: 'What is the correct syntax to select multiple columns (Name and Age) from a DataFrame?',
      opts: ["df['Name', 'Age']", "df[['Name', 'Age']]", "df.select('Name', 'Age')", "df.loc['Name', 'Age']"],
      ans: 1,
      exp: 'To select multiple columns, you must pass a list of column names, hence the double brackets: `df[["Name", "Age"]]`.'
    },
    {
      id: 'q4',
      q: 'How does loc[] differ from iloc[] in row indexing?',
      opts: [
        'loc uses integer positions; iloc uses string labels.',
        'loc is label-based (includes stop boundary); iloc is integer coordinate-based (excludes stop boundary).',
        'loc only selects columns; iloc only selects rows.',
        'They are identical.'
      ],
      ans: 1,
      exp: '`loc[]` uses labels and is inclusive of the end boundary (e.g. `df.loc[0:2]` returns rows index 0, 1, and 2). `iloc[]` uses integer positions and is exclusive of the end boundary (e.g. `df.iloc[0:2]` returns rows at offset positions 0 and 1).'
    },
    {
      id: 'q5',
      q: 'Which operator is used for combining multiple conditions with logical AND in Pandas?',
      opts: ['and', '&&', '&', 'any()'],
      ans: 2,
      exp: 'Pandas uses bitwise operators `&` (AND), `|` (OR), and `~` (NOT) for element-wise boolean combinations, which require parentheses around each condition.'
    },
    {
      id: 'q6',
      q: 'What is the function of the isin() method?',
      opts: [
        'Checks if a value is null',
        'Filters rows where values are within a specified list of items',
        'Finds values within numerical boundaries',
        'Returns elements matching a substring'
      ],
      ans: 1,
      exp: '`.isin([val1, val2])` checks if elements in a column match any value inside the list argument, serving as a clean alternative to multiple OR statements.'
    },
    {
      id: 'q7',
      q: 'Which Pandas method evaluates SQL-like query strings to filter rows?',
      opts: ['df.filter()', 'df.sql()', 'df.query()', 'df.search()'],
      ans: 2,
      exp: '`df.query()` evaluates expression strings like `df.query("Score > 80")` for streamlined filtering.'
    }
  ];

  return (
    <div className="learning-container">
      
      {activeTab === 'loading' && (
        <Section eyebrow="Day 2 • Data Ingestion" title="Reading CSV, Excel & JSON Files">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Load Datasets from Diverse Formats</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Data analysts work with files in various formats. Pandas provides dedicated file readers that convert spreadsheets, comma-separated datasets, or nested JSON structures into DataFrames.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <Database size={18} color="#10b981" /> CSV Ingestion
                </strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Reads comma-separated files. Highly memory efficient.</p>
                <SyntaxHighlighter code={`df = pd.read_csv('sales_records.csv')`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <FileText size={18} color="#10b981" /> Excel Sheets
                </strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Reads Excel spreadsheets. You can select specific worksheets.</p>
                <SyntaxHighlighter code={`# Ingest sheets from Excel file\ndf = pd.read_excel('budget.xlsx', sheet_name='Sheet1')`} />
              </div>

              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                  <Code size={18} color="#10b981" /> JSON Structures
                </strong>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Reads key-value structured data objects or JSON array logs.</p>
                <SyntaxHighlighter code={`df = pd.read_json('student_records.json')`} />
              </div>
            </div>

            <div className="flex justify-end" style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('selection')}>
                Continue to Selection & Indexing →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'selection' && (
        <Section eyebrow="Day 2 • Data Access" title="Selecting Columns, Rows & Indexing">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Column Selection Syntax</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Select a single column using single brackets (returns a 1D Series) or select multiple columns by passing a list inside double brackets (returns a 2D DataFrame).
            </p>
            <SyntaxHighlighter code={`# Single column selection (returns Series)\nstudent_names = df['Student']\n\n# Multiple column selection (returns DataFrame)\nrecords = df[['Student', 'Score']]`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Row Indexing: loc[] vs. iloc[]</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.2rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <strong style={{ color: '#166534', display: 'block', marginBottom: '0.5rem' }}>Label-based: loc[]</strong>
                <p style={{ color: '#166534', fontSize: '0.88rem', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
                  Selects data by index label values. **Inclusive** of the stop slice.
                </p>
                <SyntaxHighlighter code={`# Row label 0 to 2 (returns 3 rows: 0, 1, 2)\ndf.loc[0:2, ['Student', 'Score']]`} />
              </div>
              <div style={{ padding: '1.2rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <strong style={{ color: '#1e40af', display: 'block', marginBottom: '0.5rem' }}>Integer position-based: iloc[]</strong>
                <p style={{ color: '#1e40af', fontSize: '0.88rem', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
                  Selects data by numerical offsets (0-indexed position coordinates). **Exclusive** of the stop slice.
                </p>
                <SyntaxHighlighter code={`# Rows at position offset 0 to 2 (returns 2 rows: 0, 1)\ndf.iloc[0:2, 0:2]`} />
              </div>
            </div>

            <h3 style={{ color: '#1e293b', marginTop: '2rem', marginBottom: '1rem' }}>3. Modifying the Index</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>
              By default, Pandas assigns integer indexes (0, 1, 2...). You can designate any column as the index using <code>set_index()</code>:
            </p>
            <SyntaxHighlighter code={`# Set Student column as index\ndf_indexed = df.set_index('Student')`} />

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('loading')}>
                ← Back to Loading
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('filtering')}>
                Continue to Filtering →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'filtering' && (
        <Section eyebrow="Day 2 • Data Querying" title="Boolean Filtering & Logical Operators">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Boolean Masking</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
              Pass a boolean condition inside brackets to filter rows:
            </p>
            <SyntaxHighlighter code={`# Filter rows where Score is above 80\ndf_high = df[df['Score'] > 80]`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Multiple Conditions</h3>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.5 }}>
              Combine filters using logical operators (each condition must be enclosed in parentheses):
              <br />
              <code>&</code> (AND), <code>|</code> (OR), <code>~</code> (NOT)
            </p>
            <SyntaxHighlighter code={`# Filter scores > 80 AND Maths > 75\nfiltered = df[(df['Score'] > 80) & (df['Maths'] > 75)]`} />

            <h3 style={{ color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Advanced Filtering Helpers</h3>
            <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#1e293b', display: 'block', marginBottom: '0.4rem' }}>isin() for Lists</strong>
                <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0 0 0.8rem 0' }}>Filters rows matching elements inside a list.</p>
                <SyntaxHighlighter code={`# Find students in specific departments\ndf[df['Dept'].isin(['CS', 'Maths'])]`} />
              </div>

              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#1e293b', display: 'block', marginBottom: '0.4rem' }}>between() for Numerical Ranges</strong>
                <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0 0 0.8rem 0' }}>Filters values within boundary numbers (inclusive).</p>
                <SyntaxHighlighter code={`# Find scores between 70 and 90\ndf[df['Score'].between(70, 90)]`} />
              </div>

              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#1e293b', display: 'block', marginBottom: '0.4rem' }}>query() for Expression Strings</strong>
                <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0 0 0.8rem 0' }}>Evaluates boolean expressions written as strings. Extremely clean syntax.</p>
                <SyntaxHighlighter code={`# Clean alternative to boolean masking\ndf.query('Score > 80 and Age < 25')`} />
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('selection')}>
                ← Back to Selection
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('activity')}>
                Continue to AI Activity →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'activity' && (
        <Section eyebrow="Day 2 • AI Studio" title="AI Activity: Score Filtering">
          <div className="panel">
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Challenge: Filter Top Students</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Given a dataset of student records, write Pandas filters to isolate students who scored above 80.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>📋 Assignment Specifications:</h4>
              <ol style={{ fontSize: '0.9rem', color: '#475569', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Filter the student DataFrame <code>df</code> using score parameters.</li>
                <li>Isolate rows where column <code>Score</code> is strictly greater than 80.</li>
                <li>Assign the result to <code>filtered_df</code> and print the results to verify.</li>
              </ol>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '380px' }}>
              {/* Code editor */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', borderBottom: '1px solid #334155' }}>
                  filter_scores.py
                </div>
                <textarea
                  value={aiActivityCode}
                  onChange={(e) => setAiActivityCode(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#0f172a',
                    color: '#e2e8f0',
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
                  <button onClick={handleRunAIActivity} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
                    Validate Code
                  </button>
                </div>
              </div>

              {/* Console output */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1, background: '#1e293b', color: '#38bdf8', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', border: '1px solid #334155' }}>
                  {aiActivityConsole || 'Console compiler idle... Click Validate Code to execute.'}
                </div>

                {aiActivityPassed && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', fontSize: '0.88rem', display: 'block' }}>Milestone Cleared!</strong>
                      <span style={{ color: '#047857', fontSize: '0.82rem' }}>All students with scores above 80 were correctly filtered.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between" style={{ marginTop: '3rem' }}>
              <button className="btn btn-outline" onClick={() => handleContinue('filtering')}>
                ← Back to Filtering
              </button>
              <button className="btn btn-primary" onClick={() => handleContinue('playground')}>
                Continue to Coding Lab →
              </button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section eyebrow="Day 2 • Practical Lab" title="Reading & Filtering Coding Lab">
          <div className="panel">
            <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Interactive Practice Playground</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '0.95rem' }}>
              Complete the challenges on the right side using correct pandas loading, selection, and filtering syntax.
            </p>
            <PandasAIPlayground dayId="day2" presets={day2Presets} challenges={day2Challenges} />

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
        <Section eyebrow="Day 2 • Evaluation" title="Day 2 Assessment Quiz">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Test Your Understanding</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Q{idx + 1}.</span> {q.q}
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
                        btnStyle.background = '#eff6ff';
                        btnStyle.borderColor = '#3b82f6';
                        btnStyle.color = '#1d4ed8';
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
                      <Sparkles size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Tutor Explanation:</strong> {q.exp}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2rem', borderRadius: '16px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#14532d' }}>Submit Your Assessment</h3>
              <p style={{ color: '#166534', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Verify all answers above before computing final grading scores.
              </p>
              
              <button className="btn btn-primary" onClick={checkFinalScore}>
                Calculate Grading Score
              </button>

              {score !== null && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', display: 'block' }}>{score} / 7</span>
                  <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 600 }}>
                    {score === 7 ? '🏆 Outstanding! Perfect score!' : score >= 4 ? '👍 Good job! Review the explanations to refine your knowledge.' : '⚠️ Keep practicing! Ask the AI Tutor for assistance.'}
                  </span>
                </div>
              )}
            </div>

            {/* Homework Assignment */}
            <div style={{ marginTop: '2.5rem', background: '#f8fafc', border: '1px dashed #64748b', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                <FileText size={20} color="#3b82f6" /> 📝 Homework Assignment
              </h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Load a complex Excel workbook containing regional employee rosters. Write Pandas code to slice specific departments using <code>loc[]</code> and <code>iloc[]</code>, filter for ages above 30, and output the result.
              </p>
            </div>

            {/* Lesson Rating */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
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
