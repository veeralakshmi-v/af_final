import React, { useState } from 'react';
import { Play, Sparkles, HelpCircle, AlertTriangle, Eye, Award } from 'lucide-react';

export default function SeabornAIPlayground({ dayId, presets, challenges }) {
  const [code, setCode] = useState(presets[0]?.code || '');
  const [activePreset, setActivePreset] = useState(presets[0]?.name || '');
  const [consoleLog, setConsoleLog] = useState('');
  const [aiTip, setAiTip] = useState(null);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [challengeStatus, setChallengeStatus] = useState({});
  const [renderedPlot, setRenderedPlot] = useState(null);

  const renderMockGraph = (type) => {
    const titleMatch = code.match(/plt\.title\(['"](.*?)['"]\)/) || code.match(/set_title\(['"](.*?)['"]\)/);
    const chartTitle = titleMatch ? titleMatch[1] : 'Seaborn Figure Output';

    const xLabelMatch = code.match(/plt\.xlabel\(['"](.*?)['"]\)/) || code.match(/set_xlabel\(['"](.*?)['"]\)/);
    const xLabel = xLabelMatch ? xLabelMatch[1] : 'X-Axis';

    const yLabelMatch = code.match(/plt\.ylabel\(['"](.*?)['"]\)/) || code.match(/set_ylabel\(['"](.*?)['"]\)/);
    const yLabel = yLabelMatch ? yLabelMatch[1] : 'Y-Axis';

    switch (type) {
      case 'pairplot':
        return (
          <svg width="240" height="170" viewBox="0 0 280 200" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            {/* Grid layout of 2x2 pair plots */}
            <rect x="25" y="25" width="100" height="70" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 35 85 Q 75 35 115 85" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            
            <rect x="155" y="25" width="100" height="70" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="180" cy="70" r="3" fill="#6366f1" />
            <circle cx="210" cy="40" r="4" fill="#3b82f6" />
            <circle cx="230" cy="55" r="3" fill="#6366f1" />

            <rect x="25" y="110" width="100" height="70" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="50" cy="140" r="3.5" fill="#6366f1" />
            <circle cx="80" cy="160" r="4" fill="#3b82f6" />
            <circle cx="95" cy="130" r="3" fill="#6366f1" />

            <rect x="155" y="110" width="100" height="70" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 165 170 Q 205 120 245 170" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          </svg>
        );
      case 'jointplot':
        return (
          <svg width="240" height="170" viewBox="0 0 280 200" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            {/* Center Scatter */}
            <rect x="40" y="50" width="170" height="110" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="80" cy="120" r="4" fill="#4f46e5" />
            <circle cx="110" cy="100" r="4" fill="#4f46e5" />
            <circle cx="150" cy="80" r="4" fill="#4f46e5" />
            {/* Top Marginal */}
            <path d="M 40 45 Q 120 15 210 45" fill="none" stroke="#818cf8" strokeWidth="1.5" />
            {/* Right Marginal */}
            <path d="M 215 50 Q 245 105 215 160" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          </svg>
        );
      case 'heatmap':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            {/* Heatmap Grid */}
            <rect x="50" y="35" width="60" height="40" fill="#f87171" stroke="#fff" />
            <text x="80" y="58" textAnchor="middle" fontSize="9" fill="#fff">1.00</text>
            <rect x="110" y="35" width="60" height="40" fill="#fca5a5" stroke="#fff" />
            <text x="140" y="58" textAnchor="middle" fontSize="9" fill="#fff">0.75</text>
            <rect x="170" y="35" width="60" height="40" fill="#93c5fd" stroke="#fff" />
            <text x="200" y="58" textAnchor="middle" fontSize="9" fill="#fff">-0.30</text>

            <rect x="50" y="75" width="60" height="40" fill="#fca5a5" stroke="#fff" />
            <text x="80" y="98" textAnchor="middle" fontSize="9" fill="#fff">0.75</text>
            <rect x="110" y="75" width="60" height="40" fill="#f87171" stroke="#fff" />
            <text x="140" y="98" textAnchor="middle" fontSize="9" fill="#fff">1.00</text>
            <rect x="170" y="75" width="60" height="40" fill="#cbd5e1" stroke="#fff" />
            <text x="200" y="98" textAnchor="middle" fontSize="9" fill="#475569">0.05</text>

            <rect x="50" y="115" width="60" height="40" fill="#93c5fd" stroke="#fff" />
            <text x="80" y="138" textAnchor="middle" fontSize="9" fill="#fff">-0.30</text>
            <rect x="110" y="115" width="60" height="40" fill="#cbd5e1" stroke="#fff" />
            <text x="140" y="138" textAnchor="middle" fontSize="9" fill="#475569">0.05</text>
            <rect x="170" y="115" width="60" height="40" fill="#f87171" stroke="#fff" />
            <text x="200" y="138" textAnchor="middle" fontSize="9" fill="#fff">1.00</text>
          </svg>
        );
      case 'violinplot':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            {/* Violin 1 */}
            <path d="M 80 140 Q 60 95 80 50 Q 100 95 80 140 Z" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.5" />
            <line x1="80" y1="60" x2="80" y2="130" stroke="#1e293b" strokeWidth="3" />
            <circle cx="80" cy="95" r="2.5" fill="#fff" />
            {/* Violin 2 */}
            <path d="M 180 140 Q 155 95 180 40 Q 205 95 180 140 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
            <line x1="180" y1="55" x2="180" y2="125" stroke="#1e293b" strokeWidth="3" />
            <circle cx="180" cy="90" r="2.5" fill="#fff" />
          </svg>
        );
      case 'swarm':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            {/* Swarm column points */}
            <circle cx="90" cy="130" r="4.5" fill="#10b981" />
            <circle cx="80" cy="115" r="4.5" fill="#10b981" />
            <circle cx="100" cy="115" r="4.5" fill="#10b981" />
            <circle cx="90" cy="100" r="4.5" fill="#10b981" />
            <circle cx="90" cy="85" r="4.5" fill="#10b981" />

            <circle cx="180" cy="120" r="4.5" fill="#f59e0b" />
            <circle cx="170" cy="105" r="4.5" fill="#f59e0b" />
            <circle cx="190" cy="105" r="4.5" fill="#f59e0b" />
            <circle cx="180" cy="90" r="4.5" fill="#f59e0b" />
          </svg>
        );
      case 'regression':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <rect x="40" y="35" width="220" height="115" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            {/* Shaded Confidence Intervals */}
            <path d="M 40 145 L 260 70 L 260 55 L 40 135 Z" fill="#818cf8" opacity="0.3" />
            {/* Dots */}
            <circle cx="80" cy="120" r="4.5" fill="#475569" />
            <circle cx="130" cy="100" r="4.5" fill="#475569" />
            <circle cx="180" cy="70" r="4.5" fill="#475569" />
            <circle cx="220" cy="80" r="4.5" fill="#475569" />
            {/* Trendline */}
            <line x1="40" y1="140" x2="260" y2="62" stroke="#3730a3" strokeWidth="2.5" />
          </svg>
        );
      case 'bar':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <rect x="70" y="70" width="30" height="80" fill="#4f46e5" rx="2" />
            <line x1="85" y1="50" x2="85" y2="90" stroke="#000" strokeWidth="1.5" />
            <line x1="80" y1="50" x2="90" y2="50" stroke="#000" strokeWidth="1.5" />

            <rect x="170" y="50" width="30" height="100" fill="#4f46e5" rx="2" />
            <line x1="185" y1="35" x2="185" y2="65" stroke="#000" strokeWidth="1.5" />
            <line x1="180" y1="35" x2="190" y2="35" stroke="#000" strokeWidth="1.5" />
          </svg>
        );
      case 'boxplot':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <rect x="100" y="60" width="80" height="60" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
            <line x1="100" y1="90" x2="180" y2="90" stroke="#3730a3" strokeWidth="2.5" />
            <line x1="140" y1="40" x2="140" y2="140" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="120" y1="40" x2="160" y2="40" stroke="#4f46e5" strokeWidth="1.5" />
            <line x1="120" y1="140" x2="160" y2="140" stroke="#4f46e5" strokeWidth="1.5" />
          </svg>
        );
      case 'histogram':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <rect x="60" y="130" width="25" height="20" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="85" y="100" width="25" height="50" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="110" y="70" width="25" height="80" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="135" y="50" width="25" height="100" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="160" y="80" width="25" height="70" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="185" y="110" width="25" height="40" fill="#a5b4fc" stroke="#6366f1" />
            <rect x="210" y="135" width="25" height="15" fill="#a5b4fc" stroke="#6366f1" />
            <path d="M 60 140 Q 135 40 210 140" fill="none" stroke="#ef4444" strokeWidth="2" />
          </svg>
        );
      case 'line':
      default:
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#cbd5e1" />
            <path d="M 50 130 L 100 90 L 150 110 L 200 60 L 250 40" fill="none" stroke="#6366f1" strokeWidth="2.5" />
            <circle cx="50" cy="130" r="3" fill="#6366f1" />
            <circle cx="100" cy="90" r="3" fill="#6366f1" />
            <circle cx="150" cy="110" r="3" fill="#6366f1" />
            <circle cx="200" cy="60" r="3" fill="#6366f1" />
            <circle cx="250" cy="40" r="3" fill="#6366f1" />
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
    setConsoleLog('>>> Running Seaborn plotting engine...\n');
    setRenderedPlot(null);
    setTimeout(() => {
      const hasImport = code.includes('import seaborn as sns') || code.includes('import seaborn');
      if (!hasImport) {
        setConsoleLog(prev => prev + "ModuleNotFoundError: No module named 'seaborn'\n❌ Execution Failed!\n(Hint: Make sure to include \"import seaborn as sns\" at the top)");
        return;
      }

      let plotType = null;
      if (code.includes('pairplot')) plotType = 'pairplot';
      else if (code.includes('jointplot')) plotType = 'jointplot';
      else if (code.includes('heatmap')) plotType = 'heatmap';
      else if (code.includes('violinplot')) plotType = 'violinplot';
      else if (code.includes('swarmplot') || code.includes('stripplot')) plotType = 'swarm';
      else if (code.includes('boxplot')) plotType = 'boxplot';
      else if (code.includes('barplot') || code.includes('countplot')) plotType = 'bar';
      else if (code.includes('histplot') || code.includes('kdeplot') || code.includes('displot') || code.includes('ecdfplot')) plotType = 'histogram';
      else if (code.includes('regplot') || code.includes('lmplot')) plotType = 'regression';
      else if (code.includes('scatterplot') || code.includes('relplot')) plotType = 'scatter';
      else if (code.includes('lineplot')) plotType = 'line';
      setRenderedPlot(plotType);

      // Check current active challenge criteria
      const currentChallenge = challenges[activeChallengeIdx];
      let challengePassed = false;
      let mockOutput = '';

      if (dayId === 'day1') {
        if (currentChallenge.id === 'ch1_sns_relplot') {
          if ((code.includes('sns.relplot(') || code.includes('sns.scatterplot(')) && code.includes('data=')) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Seaborn relational scatter plot rendered with style hue mapping]';
          } else {
            mockOutput = '[Error: Relational plot or scatter plot call missing. Hint: use sns.relplot(x="StudyHours", y="Grade", data=df)]';
          }
        }
      } else if (dayId === 'day2') {
        if (currentChallenge.id === 'ch2_sns_dist') {
          if (code.includes('sns.histplot(') || code.includes('sns.kdeplot(') || code.includes('sns.displot(')) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Frequency distribution plot generated successfully with kernel density estimation]';
          } else {
            mockOutput = '[Error: Distribution plotting command missing. Hint: use sns.histplot(data=df, x="Salary", kde=True)]';
          }
        } else if (currentChallenge.id === 'ch2_sns_categorical') {
          if (code.includes('sns.boxplot(') || code.includes('sns.violinplot(') || code.includes('sns.barplot(')) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Categorical comparison plot rendered separating values by department]';
          } else {
            mockOutput = '[Error: Categorical plot command missing. Hint: use sns.boxplot(x="Department", y="Salary", data=df)]';
          }
        }
      } else if (dayId === 'day3') {
        if (currentChallenge.id === 'ch3_sns_heatmap') {
          if (code.includes('sns.heatmap(') && (code.includes('.corr()') || code.includes('corr'))) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Correlation matrix annotated heatmap rendered with coolwarm palette]';
          } else {
            mockOutput = '[Error: Heatmap or correlation matrix configuration missing. Hint: use sns.heatmap(df.corr(), annot=True)]';
          }
        }
      } else if (dayId === 'day4') {
        if (currentChallenge.id === 'ch4_sns_capstone') {
          if (code.includes('sns.heatmap(') && (code.includes('sns.pairplot(') || code.includes('pairplot')) && code.includes('plt.savefig(')) {
            challengePassed = true;
            mockOutput = '🎉 Capstone Customer Insights Dashboard successfully compiled!\nGenerated outputs: correlation heatmaps, distributions, and demographic pair plots.\nReports saved: "customer_dashboard.png"';
          } else {
            mockOutput = '[Error: Capstone criteria incomplete. Make sure to draw heatmaps, pairplots, and save the dashboard using plt.savefig()]';
          }
        }
      }

      if (challengePassed) {
        setChallengeStatus(prev => ({ ...prev, [currentChallenge.id]: 'passed' }));
        setConsoleLog(prev => prev + mockOutput + '\n\n🎉 Challenge Passed! Excellent work.\n>>> Execution Successful!');
      } else {
        // Just print standard preset output if it matches the preset code
        const matchingPreset = presets.find(p => p.name === activePreset);
        if (matchingPreset && code.trim() === matchingPreset.code.trim()) {
          setConsoleLog(prev => prev + matchingPreset.output + '\n>>> Execution Successful!');
        } else {
          setConsoleLog(prev => prev + mockOutput + '\n\n>>> Execution finished with notes.');
        }
      }
    }, 800);
  };

  const handleAiHint = () => {
    const currentChallenge = challenges[activeChallengeIdx];
    setAiTip({
      title: '💡 AI Teacher Hint',
      content: currentChallenge.hint,
      type: 'hint'
    });
  };

  const handleExplainError = () => {
    const hasImport = code.includes('import seaborn as sns') || code.includes('import seaborn');
    if (!hasImport) {
      setAiTip({
        title: '⚠️ AI Error Explanation',
        content: 'Your code is missing "import seaborn as sns". In Python, external libraries must be imported before their properties or methods can be accessed.',
        type: 'error'
      });
      return;
    }

    const currentChallenge = challenges[activeChallengeIdx];
    const isPassing = challengeStatus[currentChallenge.id] === 'passed';
    if (isPassing) {
      setAiTip({
        title: '✅ AI Code Check',
        content: 'Your code compiled successfully and solved the challenge! No syntax errors or logical conflicts were detected.',
        type: 'success'
      });
    } else {
      setAiTip({
        title: '🐞 AI Error Diagnosis',
        content: `It looks like you are working on "${currentChallenge.title}". Ensure your code imports Pandas and Seaborn correctly, loads a dataset structure, and calls the exact functions requested in the challenge description.`,
        type: 'error'
      });
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      
      {/* Sidebar presets and challenges selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>
            Code Presets
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {presets.map(p => (
              <button
                key={p.name}
                onClick={() => handleSelectPreset(p)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: activePreset === p.name ? '#6366f1' : '#e2e8f0',
                  background: activePreset === p.name ? '#eff6ff' : '#ffffff',
                  color: activePreset === p.name ? '#4f46e5' : '#334155',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>
            Interactive Challenges
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {challenges.map((ch, idx) => {
              const isPassed = challengeStatus[ch.id] === 'passed';
              const isActive = activeChallengeIdx === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChallengeIdx(idx);
                    setConsoleLog('');
                    setAiTip(null);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: isActive ? '#f59e0b' : isPassed ? '#10b981' : '#e2e8f0',
                    background: isActive ? '#fef3c7' : isPassed ? '#ecfdf5' : '#ffffff',
                    color: isActive ? '#b45309' : isPassed ? '#047857' : '#334155',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {idx + 1}. {ch.title}
                  </span>
                  {isPassed && <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Editor & Console */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Challenge details card */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={18} color="#f59e0b" /> {challenges[activeChallengeIdx].title}
          </h4>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
            {challenges[activeChallengeIdx].desc}
          </p>
        </div>

        {/* Python Sandbox Textarea */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '8px', overflow: 'hidden', border: '1px solid #1e293b' }}>
          <div style={{ padding: '8px 12px', background: '#1e293b', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>main.py</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleAiHint}
                style={{ background: 'transparent', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <HelpCircle size={14} /> AI Hint
              </button>
              <button
                onClick={handleExplainError}
                style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <AlertTriangle size={14} /> Explain Code/Error
              </button>
            </div>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: '100%',
              minHeight: '220px',
              background: '#0f172a',
              color: '#a5b4fc',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              lineHeight: 1.6
            }}
          />

          <div style={{ padding: '8px 12px', background: '#1e293b', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleRunCode}
              style={{
                background: '#4f46e5',
                color: '#ffffff',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#4338ca'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#4f46e5'}
            >
              <Play size={14} /> Run Script
            </button>
          </div>
        </div>

        {/* AI Tips widget */}
        {aiTip && (
          <div style={{
            background: aiTip.type === 'error' ? '#fef2f2' : aiTip.type === 'hint' ? '#fffbeb' : '#f0fdf4',
            border: '1px solid',
            borderColor: aiTip.type === 'error' ? '#fecaca' : aiTip.type === 'hint' ? '#fef3c7' : '#bbf7d0',
            padding: '1rem',
            borderRadius: '8px',
            color: aiTip.type === 'error' ? '#991b1b' : aiTip.type === 'hint' ? '#92400e' : '#166534',
            fontSize: '0.88rem',
            lineHeight: 1.5
          }}>
            <strong style={{ display: 'block', marginBottom: '4px' }}>{aiTip.title}:</strong>
            <span>{aiTip.content}</span>
          </div>
        )}

        {/* Sandbox Console Output logs */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '1rem', borderRadius: '8px', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', minHeight: '100px' }}>
          {consoleLog || '>>> Sandbox compiler idle. Click "Run Script" to build charts.'}
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
      </div>
    </div>
  );
}
