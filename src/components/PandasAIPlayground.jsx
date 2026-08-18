import React, { useState } from 'react';
import { Play, Sparkles, HelpCircle, AlertTriangle, Eye, Award } from 'lucide-react';

export default function PandasAIPlayground({ dayId, presets, challenges }) {
  const [code, setCode] = useState(presets[0]?.code || '');
  const [activePreset, setActivePreset] = useState(presets[0]?.name || '');
  const [consoleLog, setConsoleLog] = useState('');
  const [aiTip, setAiTip] = useState(null);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [challengeStatus, setChallengeStatus] = useState({});
  const [renderedPlot, setRenderedPlot] = useState(null);

  const renderMockGraph = (type) => {
    const titleMatch = code.match(/title\=['"](.*?)['"]\)/);
    const chartTitle = titleMatch ? titleMatch[1] : 'Pandas Plotted Output';

    switch (type) {
      case 'bar':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <rect x="60" y="80" width="30" height="70" fill="#3b82f6" rx="2" />
            <rect x="110" y="60" width="30" height="90" fill="#3b82f6" rx="2" />
            <rect x="160" y="100" width="30" height="50" fill="#3b82f6" rx="2" />
            <rect x="210" y="40" width="30" height="110" fill="#3b82f6" rx="2" />
            <text x="75" y="162" textAnchor="middle" fontSize="9" fill="#64748b">A</text>
            <text x="125" y="162" textAnchor="middle" fontSize="9" fill="#64748b">B</text>
            <text x="175" y="162" textAnchor="middle" fontSize="9" fill="#64748b">C</text>
            <text x="225" y="162" textAnchor="middle" fontSize="9" fill="#64748b">D</text>
          </svg>
        );
      case 'barh':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="50" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="30" x2="50" y2="150" stroke="#475569" strokeWidth="2" />
            <rect x="50" y="45" width="160" height="20" fill="#3b82f6" rx="2" />
            <rect x="50" y="80" width="190" height="20" fill="#3b82f6" rx="2" />
            <rect x="50" y="115" width="130" height="20" fill="#3b82f6" rx="2" />
          </svg>
        );
      case 'scatter':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <rect x="40" y="35" width="220" height="115" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="80" cy="120" r="5" fill="#3b82f6" opacity="0.8" />
            <circle cx="120" cy="90" r="7" fill="#3b82f6" opacity="0.7" />
            <circle cx="160" cy="110" r="6" fill="#3b82f6" opacity="0.9" />
            <circle cx="200" cy="60" r="8" fill="#3b82f6" opacity="0.6" />
          </svg>
        );
      case 'histogram':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <rect x="60" y="120" width="30" height="30" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="95" y="90" width="30" height="60" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="130" y="60" width="30" height="90" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="165" y="80" width="30" height="70" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="200" y="110" width="30" height="40" fill="#a5b4fc" stroke="#6366f1" />
          </svg>
        );
      case 'boxplot':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="140" y1="40" x2="140" y2="140" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="3,3" />
            <rect x="100" y="60" width="80" height="60" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
            <line x1="100" y1="90" x2="180" y2="90" stroke="#3730a3" strokeWidth="2.5" />
          </svg>
        );
      case 'pie':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <g transform="translate(140, 95)">
              <path d="M 0 0 L 0 -65 A 65 65 0 0 1 56 32 Z" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
              <path d="M 0 0 L 56 32 A 65 65 0 0 1 -56 32 Z" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              <path d="M 0 0 L -56 32 A 65 65 0 0 1 0 -65 Z" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
            </g>
          </svg>
        );
      case 'line':
      default:
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#cbd5e1" />
            <path d="M 50 120 L 100 80 L 150 100 L 200 50 L 250 30" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
            <circle cx="50" cy="120" r="3" fill="#3b82f6" />
            <circle cx="100" cy="80" r="3" fill="#3b82f6" />
            <circle cx="150" cy="100" r="3" fill="#3b82f6" />
            <circle cx="200" cy="50" r="3" fill="#3b82f6" />
            <circle cx="250" cy="30" r="3" fill="#3b82f6" />
          </svg>
        );
    }
  };

  const handleSelectPreset = (preset) => {
    setActivePreset(preset.name);
    setCode(preset.code);
    setConsoleLog('');
    setAiTip(null);
    setRenderedPlot(null);
  };

  const handleRunCode = () => {
    setConsoleLog('>>> Running code...\n');
    setTimeout(() => {
      // Find matches in user code to simulate execution dynamically
      const hasImport = code.includes('import pandas as pd') || code.includes('import pandas');
      if (!hasImport) {
        setConsoleLog(prev => prev + 'ModuleNotFoundError: No module named \'pandas\'\n❌ Execution Failed!\n(Hint: Make sure to include "import pandas as pd" at the top)');
        return;
      }

      let plotType = null;
      if (code.includes('plot(')) {
        if (code.includes("kind='bar'") || code.includes('kind="bar"')) plotType = 'bar';
        else if (code.includes("kind='barh'") || code.includes('kind="barh"')) plotType = 'barh';
        else if (code.includes("kind='hist'") || code.includes('kind="hist"')) plotType = 'histogram';
        else if (code.includes("kind='box'") || code.includes('kind="box"')) plotType = 'boxplot';
        else if (code.includes("kind='scatter'") || code.includes('kind="scatter"')) plotType = 'scatter';
        else if (code.includes("kind='pie'") || code.includes('kind="pie"')) plotType = 'pie';
        else plotType = 'line';
      }
      setRenderedPlot(plotType);

      // Check current active challenge criteria
      const currentChallenge = challenges[activeChallengeIdx];
      let challengePassed = false;
      let mockOutput = '';

      if (dayId === 'day1') {
        if (currentChallenge.id === 'ch1_series') {
          if (code.includes('pd.Series') && (code.includes('data') || code.includes('[10, 20, 30]'))) {
            challengePassed = true;
            mockOutput = '0    10\n1    20\n2    30\ndtype: int64';
          } else {
            mockOutput = '[Error: Series creation mismatch. Hint: use pd.Series(data)]';
          }
        } else if (currentChallenge.id === 'ch1_dataframe') {
          if (code.includes('pd.DataFrame') && (code.includes('data') || code.includes('Name') || code.includes('Age'))) {
            challengePassed = true;
            mockOutput = '    Name  Age\n0  Alice   25\n1    Bob   30';
          } else {
            mockOutput = '[Error: DataFrame does not match specification. Hint: use pd.DataFrame(data)]';
          }
        }
      } else if (dayId === 'day2') {
        if (currentChallenge.id === 'ch2_read_csv') {
          if (code.includes('pd.read_csv') && code.includes('data.csv')) {
            challengePassed = true;
            mockOutput = 'Loaded DataFrame with 5 rows and 3 columns:\n   ID    Product  Sales\n0   1     Laptop   1200\n1   2     Tablet    450\n2   3      Phone    800\n3   4  Headphones    150\n4   5    Monitor    300';
          } else {
            mockOutput = '[Error: CSV file not read. Hint: use pd.read_csv("data.csv")]';
          }
        } else if (currentChallenge.id === 'ch2_select_cols') {
          if (code.includes("df[['Name', 'Age']]") || code.includes('df[["Name", "Age"]]') || code.includes("df.loc[:, ['Name', 'Age']]")) {
            challengePassed = true;
            mockOutput = '    Name  Age\n0  Alice   25\n1    Bob   30\n2  Charlie  35';
          } else {
            mockOutput = '[Error: Correct columns not selected. Hint: use df[["Name", "Age"]]]';
          }
        } else if (currentChallenge.id === 'ch2_filter_score') {
          if (code.includes('df[') && (code.includes('> 80') || code.includes('>80') || code.includes('query('))) {
            challengePassed = true;
            mockOutput = '   Student  Score\n1   Simran     92\n3     Neha     95';
          } else {
            mockOutput = '[Error: Correct filtering not applied. Hint: use df[df["Score"] > 80] or df.query("Score > 80")]';
          }
        }
      } else if (dayId === 'day3') {
        if (currentChallenge.id === 'ch3_dropna') {
          if (code.includes('dropna(') || code.includes('dropna()')) {
            challengePassed = true;
            mockOutput = 'Rows before: 5, Rows after: 3\nAll rows containing NaN/None successfully purged!';
          } else {
            mockOutput = '[Error: Missing data still present. Hint: use df.dropna()]';
          }
        } else if (currentChallenge.id === 'ch3_fillna') {
          if (code.includes('fillna(0)') || code.includes('fillna(value=0)')) {
            challengePassed = true;
            mockOutput = 'NaN values replaced with 0:\n   Value\n0    1.0\n1    0.0\n2    3.0\n3    0.0';
          } else {
            mockOutput = '[Error: Missing values not filled. Hint: use df.fillna(0)]';
          }
        }
      } else if (dayId === 'day4') {
        if (currentChallenge.id === 'ch4_groupby') {
          if (code.includes("groupby('Department')") || code.includes('groupby("Department")')) {
            challengePassed = true;
            mockOutput = 'Department\nHR          45000.0\nIT          85000.0\nMarketing   60000.0\nName: Salary, dtype: float64';
          } else {
            mockOutput = '[Error: GroupBy operation failed. Hint: group by "Department" and aggregate mean Salary]';
          }
        }
      } else if (dayId === 'day5') {
        if (currentChallenge.id === 'ch5_pivot_table') {
          if (code.includes('pivot_table') && code.includes('index') && code.includes('columns')) {
            challengePassed = true;
            mockOutput = 'Gender      F      M\nDept\nHR      45000  50000\nIT      85000  80000';
          } else {
            mockOutput = '[Error: Pivot table arguments mismatch. Hint: use df.pivot_table(values="Salary", index="Dept", columns="Gender", aggfunc="mean")]';
          }
        } else if (currentChallenge.id === 'ch5_plot_bar') {
          if (code.includes('plot(') && (code.includes("kind='bar'") || code.includes('kind="bar"'))) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\nBar plot rendered for index timeline.';
          } else {
            mockOutput = '[Error: Bar plot missing. Hint: use df.plot(kind="bar")]';
          }
        }
      } else if (dayId === 'day6') {
        if (currentChallenge.id === 'ch6_top_students') {
          if (code.includes('mean') && code.includes('groupby') && (code.includes('ascending=False') || code.includes('ascending=False') || code.includes('sort_values('))) {
            challengePassed = true;
            mockOutput = 'Student\nNeha     95.0\nSimran   92.0\nVijay    82.0\nName: Score, dtype: float64';
          } else {
            mockOutput = '[Error: Sorting or grouping by mean score incorrect. Hint: use df.groupby("Student")["Score"].mean().sort_values(ascending=False)]';
          }
        }
      }

      setConsoleLog(prev => prev + `pd.version: 2.1.1\n\n${mockOutput}\n\n${challengePassed ? '✅ Challenge Passed! Perfect Job!' : '❌ Output verification failed. Read the requirements and try again!'}`);

      if (challengePassed) {
        setChallengeStatus(prev => ({ ...prev, [currentChallenge.id]: 'passed' }));
      } else {
        setChallengeStatus(prev => ({ ...prev, [currentChallenge.id]: 'failed' }));
      }
    }, 800);
  };

  const handleAskAI = () => {
    const currentChallenge = challenges[activeChallengeIdx];
    setAiTip('💡 AI Assistant analyzes your code structure...\n');
    setTimeout(() => {
      let advice = 'Ensure that you import pandas as pd, declare the variables exactly as shown, and perform the requested operations.';
      if (dayId === 'day1') {
        if (currentChallenge.id === 'ch1_series') {
          advice = 'To create a pandas Series, use `s = pd.Series(data)`. Make sure to import pandas as pd first!';
        } else if (currentChallenge.id === 'ch1_dataframe') {
          advice = 'To create a DataFrame from a dictionary, use `df = pd.DataFrame(data)` where data is the defined dict.';
        }
      } else if (dayId === 'day2') {
        if (currentChallenge.id === 'ch2_read_csv') {
          advice = 'To read the CSV, invoke `df = pd.read_csv("data.csv")` and then print it.';
        } else if (currentChallenge.id === 'ch2_select_cols') {
          advice = 'To select multiple columns, pass a list of column names inside double brackets: `df[["Name", "Age"]]`.';
        } else if (currentChallenge.id === 'ch2_filter_score') {
          advice = 'To filter rows where Score is above 80, write: `filtered = df[df["Score"] > 80]` or use query: `df.query("Score > 80")`.';
        }
      } else if (dayId === 'day3') {
        if (currentChallenge.id === 'ch3_dropna') {
          advice = 'You can drop all rows containing NaN values by using the `.dropna()` method on the DataFrame.';
        } else if (currentChallenge.id === 'ch3_fillna') {
          advice = 'Replace missing cells by calling `.fillna(0)`. This returns a copy where all NaNs are 0.';
        }
      } else if (dayId === 'day4') {
        if (currentChallenge.id === 'ch4_groupby') {
          advice = 'Group the employees by department, select Salary, and call `.mean()`: `df.groupby("Department")["Salary"].mean()`.';
        }
      } else if (dayId === 'day5') {
        if (currentChallenge.id === 'ch5_pivot_table') {
          advice = 'To generate a pivot table, use: `df.pivot_table(values="Salary", index="Dept", columns="Gender", aggfunc="mean")`.';
        } else if (currentChallenge.id === 'ch5_plot_bar') {
          advice = 'Call `.plot(kind="bar")` on the DataFrame to output a vertical bar plot.';
        }
      } else if (dayId === 'day6') {
        if (currentChallenge.id === 'ch6_top_students') {
          advice = 'To aggregate student scores and sort in descending order, write: `df.groupby("Student")["Score"].mean().sort_values(ascending=False)`.';
        }
      }
      setAiTip(advice);
    }, 600);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem', minHeight: '520px' }}>
      
      {/* Code Editor Column */}
      <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', padding: '0.75rem 1rem', borderBottom: '1px solid #334155' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></span>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', fontFamily: 'monospace' }}>main.py (Pandas Workspace)</span>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            flex: 1,
            background: '#0f172a',
            color: '#e2e8f0',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            padding: '1.2rem',
            border: 'none',
            outline: 'none',
            resize: 'none',
            lineHeight: 1.6
          }}
        />

        <div style={{ padding: '0.75rem 1rem', background: '#1e293b', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={handleRunCode}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#10b981',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <Play size={16} /> Run Code
          </button>
          
          <button 
            onClick={handleAskAI}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              color: '#38bdf8',
              border: '1px solid #0284c7',
              padding: '0.5rem 1.2rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={16} /> Get AI Tip
          </button>
        </div>
      </div>

      {/* Challenge & Output Console Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        
        {/* Presets Picker */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Select Preset Example</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleSelectPreset(preset)}
                style={{
                  background: activePreset === preset.name ? '#eff6ff' : '#ffffff',
                  color: activePreset === preset.name ? '#2563eb' : '#475569',
                  border: `1px solid ${activePreset === preset.name ? '#3b82f6' : '#cbd5e1'}`,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Box */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.2rem', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Award size={14} /> Coding Challenge
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {challenges.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChallengeIdx(idx);
                    setAiTip(null);
                  }}
                  style={{
                    background: activeChallengeIdx === idx ? '#15803d' : '#e2e8f0',
                    color: activeChallengeIdx === idx ? '#fff' : '#475569',
                    border: 'none',
                    borderRadius: '4px',
                    width: '24px',
                    height: '24px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <h4 style={{ color: '#14532d', margin: '0 0 4px 0', fontSize: '0.95rem' }}>{challenges[activeChallengeIdx].title}</h4>
          <p style={{ color: '#166534', margin: '0 0 8px 0', fontSize: '0.85rem', lineHeight: 1.4 }}>{challenges[activeChallengeIdx].desc}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(22,101,52,0.06)', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', color: '#166534' }}>
            <HelpCircle size={14} />
            <span><strong>Hint:</strong> {challenges[activeChallengeIdx].hint}</span>
          </div>

          {challengeStatus[challenges[activeChallengeIdx].id] === 'passed' && (
            <div style={{ marginTop: '8px', background: '#dcfce7', border: '1px solid #86efac', color: '#15803d', padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              🎉 Challenge Cleared! Keep it up!
            </div>
          )}
        </div>

        {/* Console Output */}
        <div style={{ flex: 1, background: '#1e293b', color: '#38bdf8', padding: '1rem', borderRadius: '10px', border: '1px solid #334155', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', minHeight: '150px', overflowY: 'auto' }}>
          {consoleLog || 'Console output will appear here after running your code...'}
        </div>

        {renderedPlot && (
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#f1f5f9', padding: '0.4rem 0.8rem', borderBottom: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={12} color="#6366f1" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>GRAPH PREVIEW (plt.show()):</span>
            </div>
            <div style={{ padding: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
              {renderMockGraph(renderedPlot)}
            </div>
          </div>
        )}

        {/* AI Tip Display */}
        {aiTip && (
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '1rem', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Sparkles size={18} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1', display: 'block', marginBottom: '2px' }}>AI Tutor Tip</span>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#075985', lineHeight: 1.4 }}>{aiTip}</p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
