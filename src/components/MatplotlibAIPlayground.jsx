import React, { useState } from 'react';
import { Play, Sparkles, HelpCircle, AlertTriangle, Eye, Award } from 'lucide-react';

export default function MatplotlibAIPlayground({ dayId, presets, challenges }) {
  const [code, setCode] = useState(presets[0]?.code || '');
  const [activePreset, setActivePreset] = useState(presets[0]?.name || '');
  const [consoleLog, setConsoleLog] = useState('');
  const [aiTip, setAiTip] = useState(null);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [challengeStatus, setChallengeStatus] = useState({});
  const [renderedPlot, setRenderedPlot] = useState(null);

  const parseChartConfig = (codeText) => {
    const titleMatch = codeText.match(/title\(['"](.*?)['"]\)/);
    const chartTitle = titleMatch ? titleMatch[1] : 'Plotted Output';

    const xLabelMatch = codeText.match(/xlabel\(['"](.*?)['"]\)/);
    const xLabel = xLabelMatch ? xLabelMatch[1] : 'X-Axis';
    const yLabelMatch = codeText.match(/ylabel\(['"](.*?)['"]\)/);
    const yLabel = yLabelMatch ? yLabelMatch[1] : 'Y-Axis';

    const colorMatch = codeText.match(/color\s*=\s*['"](.*?)['"]/);
    const chosenColor = colorMatch ? colorMatch[1] : '#f97316';
    const edgeMatch = codeText.match(/edgecolor\s*=\s*['"](.*?)['"]/);
    const chosenEdgeColor = edgeMatch ? edgeMatch[1] : 'none';

    const lines = codeText.split('\n');
    let categories = [];
    let values = [];

    lines.forEach(line => {
      const stringListMatch = line.match(/^\s*[a-zA-Z0-9_]+\s*=\s*\[\s*(['"].*?['"](?:\s*,\s*['"].*?['"])*)\s*\]/);
      if (stringListMatch && categories.length === 0) {
        categories = stringListMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''));
      }
      const numListMatch = line.match(/^\s*[a-zA-Z0-9_]+\s*=\s*\[\s*([0-9\s.,-]+)\s*\]/);
      if (numListMatch && values.length === 0) {
        values = numListMatch[1].split(',').map(Number).filter(n => !isNaN(n));
      }
    });

    if (categories.length === 0) categories = ['Jan', 'Feb', 'Mar', 'Apr'];
    if (values.length === 0) values = [1200, 1500, 1800, 2200];

    return { chartTitle, xLabel, yLabel, chosenColor, chosenEdgeColor, categories, values };
  };

  const renderMockGraph = (type) => {
    const { chartTitle, xLabel, yLabel, chosenColor, chosenEdgeColor, categories, values } = parseChartConfig(code);

    switch (type) {
      case 'subplots':
        return (
          <svg width="240" height="170" viewBox="0 0 280 200" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <rect x="25" y="35" width="100" height="130" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="25" y1="135" x2="125" y2="55" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="75" y="50" textAnchor="middle" fontSize="9" fill="#64748b">ax[0]</text>
            <rect x="155" y="35" width="100" height="130" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="170" y="95" width="20" height="70" fill={chosenColor} />
            <rect x="210" y="65" width="20" height="100" fill={chosenColor} />
            <text x="205" y="50" textAnchor="middle" fontSize="9" fill="#64748b">ax[1]</text>
          </svg>
        );
      case 'bar':
        const barCount = Math.min(categories.length, values.length, 6);
        const barMax = Math.max(...values.slice(0, barCount), 1);
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="40" x2="260" y2="40" stroke="#f1f5f9" />
            <line x1="40" y1="80" x2="260" y2="80" stroke="#f1f5f9" />
            <line x1="40" y1="120" x2="260" y2="120" stroke="#f1f5f9" />
            <line x1="40" y1="30" x2="40" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            {Array.from({ length: barCount }).map((_, i) => {
              const barHeight = (values[i] / barMax) * 110;
              const barWidth = Math.min(35, 180 / barCount);
              const xPos = 50 + i * (190 / barCount) + (190 / barCount - barWidth) / 2;
              const yPos = 150 - barHeight;
              return (
                <g key={i}>
                  <rect x={xPos} y={yPos} width={barWidth} height={barHeight} fill={chosenColor} stroke={chosenEdgeColor} rx="2" />
                  <text x={xPos + barWidth / 2} y="162" textAnchor="middle" fontSize="9" fill="#64748b">{categories[i]}</text>
                </g>
              );
            })}
            <text x="140" y="176" textAnchor="middle" fontSize="9" fill="#475569">{xLabel}</text>
            <text x="12" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-90 12 90)">{yLabel}</text>
          </svg>
        );
      case 'barh':
        const barhCount = Math.min(categories.length, values.length, 6);
        const barhMax = Math.max(...values.slice(0, barhCount), 1);
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="50" y1="30" x2="50" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="50" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            {Array.from({ length: barhCount }).map((_, i) => {
              const barWidth = (values[i] / barhMax) * 190;
              const barHeight = Math.min(25, 100 / barhCount);
              const yPos = 35 + i * (110 / barhCount) + (110 / barhCount - barHeight) / 2;
              return (
                <g key={i}>
                  <rect x="50" y={yPos} width={barWidth} height={barHeight} fill={chosenColor} stroke={chosenEdgeColor} rx="2" />
                  <text x="42" y={yPos + barHeight / 2 + 3} textAnchor="end" fontSize="9" fill="#64748b">{categories[i]}</text>
                </g>
              );
            })}
            <text x="140" y="168" textAnchor="middle" fontSize="9" fill="#475569">{xLabel}</text>
            <text x="12" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-90 12 90)">{yLabel}</text>
          </svg>
        );
      case 'scatter':
        const scatCount = Math.min(values.length, 10);
        const scatMax = Math.max(...values.slice(0, scatCount), 1);
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <rect x="40" y="35" width="220" height="115" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            {Array.from({ length: scatCount }).map((_, i) => {
              const xPos = 60 + i * (180 / (scatCount - 1 || 1));
              const yPos = 135 - (values[i] / scatMax) * 90;
              return (
                <circle key={i} cx={xPos} cy={yPos} r="6" fill={chosenColor} opacity="0.8" />
              );
            })}
            <text x="140" y="168" textAnchor="middle" fontSize="9" fill="#475569">{xLabel}</text>
            <text x="12" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-90 12 90)">{yLabel}</text>
          </svg>
        );
      case 'histogram':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <rect x="50" y="130" width="20" height="20" fill={chosenColor} stroke={chosenEdgeColor} />
            <rect x="72" y="110" width="20" height="40" fill={chosenColor} stroke={chosenEdgeColor} />
            <rect x="94" y="80" width="20" height="70" fill={chosenColor} stroke={chosenEdgeColor} />
            <rect x="116" y="50" width="20" height="100" fill={chosenColor} stroke={chosenEdgeColor} />
            <rect x="138" y="40" width="20" height="110" fill={chosenColor} stroke={chosenEdgeColor} />
            <rect x="160" y="60" width="20" height="90" fill={chosenColor} stroke={chosenEdgeColor} />
            <rect x="182" y="90" width="20" height="60" fill={chosenColor} stroke={chosenEdgeColor} />
            <rect x="204" y="120" width="20" height="30" fill={chosenColor} stroke={chosenEdgeColor} />
            <rect x="226" y="135" width="20" height="15" fill={chosenColor} stroke={chosenEdgeColor} />
            {code.includes('kde=True') && (
              <path d="M 50 140 Q 94 60 138 42 T 226 142" fill="none" stroke="#ef4444" strokeWidth="2" />
            )}
            <text x="140" y="168" textAnchor="middle" fontSize="9" fill="#475569">{xLabel}</text>
          </svg>
        );
      case 'boxplot':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="140" y1="40" x2="140" y2="140" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="3,3" />
            <rect x="100" y="60" width="80" height="60" fill="#e0e7ff" stroke={chosenColor} strokeWidth="2" />
            <line x1="100" y1="90" x2="180" y2="90" stroke="#ef4444" strokeWidth="2.5" />
            <line x1="120" y1="40" x2="160" y2="40" stroke="#0f172a" strokeWidth="2" />
            <line x1="120" y1="140" x2="160" y2="140" stroke="#0f172a" strokeWidth="2" />
            <circle cx="140" cy="25" r="3" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <text x="140" y="168" textAnchor="middle" fontSize="9" fill="#475569">{xLabel}</text>
          </svg>
        );
      case 'pie':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <g transform="translate(140, 95)">
              <path d="M 0 0 L 0 -60 A 60 60 0 0 1 51 30 Z" fill={chosenColor} stroke="#fff" strokeWidth="1.5" />
              <path d="M 0 0 L 51 30 A 60 60 0 0 1 -51 30 Z" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              <path d="M 0 0 L -51 30 A 60 60 0 0 1 0 -60 Z" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
              {(code.includes('Circle') || code.includes('centre_circle')) && (
                <circle cx="0" cy="0" r="36" fill="#ffffff" />
              )}
            </g>
          </svg>
        );
      case 'stem':
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="120" x2="260" y2="120" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="70" y1="120" x2="70" y2="60" stroke={chosenColor} strokeWidth="1.5" strokeDasharray={code.includes('linefmt') && code.includes('--') ? '3,3' : '0'} />
            <circle cx="70" cy="60" r="4" fill={chosenColor} />
            <line x1="120" y1="120" x2="120" y2="40" stroke={chosenColor} strokeWidth="1.5" strokeDasharray={code.includes('linefmt') && code.includes('--') ? '3,3' : '0'} />
            <circle cx="120" cy="40" r="4" fill={chosenColor} />
            <line x1="170" y1="120" x2="170" y2="90" stroke={chosenColor} strokeWidth="1.5" strokeDasharray={code.includes('linefmt') && code.includes('--') ? '3,3' : '0'} />
            <circle cx="170" cy="90" r="4" fill={chosenColor} />
            <line x1="220" y1="120" x2="220" y2="50" stroke={chosenColor} strokeWidth="1.5" strokeDasharray={code.includes('linefmt') && code.includes('--') ? '3,3' : '0'} />
            <circle cx="220" cy="50" r="4" fill={chosenColor} />
          </svg>
        );
      case 'line':
      default:
        const lineCount = Math.min(categories.length, values.length, 8);
        const lineMax = Math.max(...values.slice(0, lineCount), 1);
        const points = [];
        for (let i = 0; i < lineCount; i++) {
          const xPos = 60 + i * (180 / (lineCount - 1 || 1));
          const yPos = 140 - (values[i] / lineMax) * 90;
          points.push({ x: xPos, y: yPos, label: categories[i] });
        }
        const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        return (
          <svg width="240" height="170" viewBox="0 0 280 180" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <text x="140" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{chartTitle}</text>
            <line x1="40" y1="40" x2="260" y2="40" stroke="#f1f5f9" />
            <line x1="40" y1="80" x2="260" y2="80" stroke="#f1f5f9" />
            <line x1="40" y1="120" x2="260" y2="120" stroke="#f1f5f9" />
            <line x1="40" y1="30" x2="40" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="40" y1="150" x2="260" y2="150" stroke="#475569" strokeWidth="2" />
            <path d={pathD} fill="none" stroke={chosenColor} strokeWidth="2.5" />
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="3.5" fill={chosenColor} />
                <text x={p.x} y="162" textAnchor="middle" fontSize="9" fill="#64748b">{p.label}</text>
              </g>
            ))}
            <text x="140" y="176" textAnchor="middle" fontSize="9" fill="#475569">{xLabel}</text>
            <text x="12" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-90 12 90)">{yLabel}</text>
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
    setConsoleLog('>>> Running plotting engine...\n');
    setRenderedPlot(null);
    setTimeout(() => {
      const hasImport = code.includes('import matplotlib.pyplot as plt') || code.includes('import matplotlib');
      if (!hasImport) {
        setConsoleLog(prev => prev + "ModuleNotFoundError: No module named 'matplotlib.pyplot'\n❌ Execution Failed!\n(Hint: Make sure to include \"import matplotlib.pyplot as plt\" at the top)");
        return;
      }

      let plotType = null;
      if (code.includes('subplots(')) plotType = 'subplots';
      else if (code.includes('barh(')) plotType = 'barh';
      else if (code.includes('bar(')) plotType = 'bar';
      else if (code.includes('scatter(')) plotType = 'scatter';
      else if (code.includes('hist(')) plotType = 'histogram';
      else if (code.includes('boxplot(')) plotType = 'boxplot';
      else if (code.includes('pie(')) plotType = 'pie';
      else if (code.includes('stem(')) plotType = 'stem';
      else if (code.includes('errorbar(')) plotType = 'errorbar';
      else if (code.includes('stackplot(')) plotType = 'stackplot';
      else if (code.includes('plot(')) plotType = 'line';
      setRenderedPlot(plotType);

      // Check current active challenge criteria
      const currentChallenge = challenges[activeChallengeIdx];
      let challengePassed = false;
      let mockOutput = '';

      if (dayId === 'day1') {
        if (currentChallenge.id === 'ch1_first_plot') {
          if (code.includes('plt.plot(') && (code.includes('plt.show()') || code.includes('plt.savefig('))) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Line plot rendered for student marks metrics]';
          } else {
            mockOutput = '[Error: Plotting call or display call missing. Hint: use plt.plot(x, y) and plt.show()]';
          }
        } else if (currentChallenge.id === 'ch1_save_fig') {
          if (code.includes('plt.savefig(') || code.includes('savefig(')) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[File Saved: Output figure written as "chart.png" successfully]';
          } else {
            mockOutput = '[Error: Save figure instruction missing. Hint: use plt.savefig("chart.png")]';
          }
        }
      } else if (dayId === 'day2') {
        if (currentChallenge.id === 'ch2_bar_chart') {
          if (code.includes('plt.bar(') || code.includes('plt.barh(')) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Bar chart rendered for sales values]';
          } else {
            mockOutput = '[Error: Bar plot command missing. Hint: use plt.bar(months, sales)]';
          }
        } else if (currentChallenge.id === 'ch2_scatter_plot') {
          if (code.includes('plt.scatter(')) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Scatter distribution plot created matching markers/colors]';
          } else {
            mockOutput = '[Error: Scatter plot command missing. Hint: use plt.scatter(height, weight)]';
          }
        }
      } else if (dayId === 'day3') {
        if (currentChallenge.id === 'ch3_histogram') {
          if (code.includes('plt.hist(') && (code.includes('bins=') || code.includes('bins ='))) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Frequency distribution histogram rendered with custom bins]';
          } else {
            mockOutput = '[Error: Histogram or bins parameter missing. Hint: use plt.hist(scores, bins=10)]';
          }
        } else if (currentChallenge.id === 'ch3_boxplot') {
          if (code.includes('plt.boxplot(')) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Statistical box-and-whisker plot created with outliers identified]';
          } else {
            mockOutput = '[Error: Box plot command missing. Hint: use plt.boxplot(exam_scores)]';
          }
        }
      } else if (dayId === 'day4') {
        if (currentChallenge.id === 'ch4_subplots') {
          if (code.includes('plt.subplots(') || code.includes('plt.subplot(')) {
            challengePassed = true;
            mockOutput = '🎉 Dashboard generated successfully!\n[Figure: Subplot grid instantiated containing multiple ax elements]';
          } else {
            mockOutput = '[Error: Subplots division missing. Hint: use fig, axes = plt.subplots(2, 1)]';
          }
        } else if (currentChallenge.id === 'ch4_annotate') {
          if (code.includes('plt.annotate(') || code.includes('ax.annotate(')) {
            challengePassed = true;
            mockOutput = '🎉 Chart successfully generated!\n[Figure: Custom text annotations placed at specific coordinate landmarks]';
          } else {
            mockOutput = '[Error: Text annotations missing. Hint: use plt.annotate("Max Sales", xy=(x_val, y_val))]';
          }
        }
      } else if (dayId === 'day5') {
        if (currentChallenge.id === 'ch5_capstone') {
          if (code.includes('plt.savefig(') && (code.includes('groupby') || code.includes('pivot_table')) && code.includes('plt.subplots(')) {
            challengePassed = true;
            mockOutput = '🎉 Capstone Sales Analytics Dashboard successfully compiled!\nGenerated outputs: line, bar, pie, and box subplots.\nReports saved: "sales_dashboard.png"';
          } else {
            mockOutput = '[Error: Capstone criteria incomplete. Make sure to create subplots, aggregate data using Pandas, and save the output dashboard figure.]';
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
    const hasImport = code.includes('import matplotlib.pyplot as plt') || code.includes('import matplotlib');
    if (!hasImport) {
      setAiTip({
        title: '⚠️ AI Error Explanation',
        content: 'Your code is missing "import matplotlib.pyplot as plt". In Python, external libraries must be imported before their properties or methods can be accessed.',
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
        title: '💡 AI Debug Helper',
        content: `To solve "${currentChallenge.title}", look at your code structure. You need to use: ${currentChallenge.hint}`,
        type: 'error'
      });
    }
  };

  const handleCodeReview = () => {
    let feedback = '';
    let rating = 'Beginner';

    if (code.includes('plt.show()') && code.includes('plt.savefig(')) {
      feedback = '⚠️ Optimization Warning: Calling plt.show() before plt.savefig() will output an empty image! This is because plt.show() clears the active figure buffer. Always save the figure first, then display it.';
      rating = 'Intermediate (Sequence Conflict)';
    } else if (code.includes('plt.subplots(') || code.includes('subplots(')) {
      feedback = '✔️ Clean Code: Excellent choice! Using the Object-Oriented Interface (fig, ax = plt.subplots()) instead of the State-Machine (pyplot) is the industry best practice for handling layouts and complex visual settings.';
      rating = 'Excellent (Object-Oriented Matplotlib)';
    } else {
      feedback = 'Good start! Try exploring chart customizations like gridlines, annotations, and customized label parameters to make charts professional.';
      rating = 'Satisfactory';
    }

    setAiTip({
      title: '🚀 AI Code Review',
      content: `Rating: ${rating}\n\n${feedback}`,
      type: 'review'
    });
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', padding: '1.2rem', marginTop: '1rem' }}>
      <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={20} color="#f97316" /> AI-Powered Matplotlib Arena &amp; Challenges
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        
        {/* Editor column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>TRY IT YOURSELF EDITOR:</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {presets.map(p => (
                  <button
                    key={p.name}
                    onClick={() => handleSelectPreset(p)}
                    style={{
                      background: activePreset === p.name ? '#ffedd5' : '#fff',
                      color: activePreset === p.name ? '#ea580c' : '#64748b',
                      border: '1px solid #cbd5e1',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: '100%',
                height: '240px',
                fontFamily: 'monospace',
                fontSize: '0.88rem',
                background: '#0f172a',
                color: '#fdba74',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                resize: 'vertical',
                outline: 'none',
                lineHeight: '1.5'
              }}
            />
          </div>

          {/* AI Helper actions row */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleRunCode} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
              <Play size={14} /> Run Code
            </button>
            <button onClick={handleAiHint} style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
              <HelpCircle size={14} /> AI Hint
            </button>
            <button onClick={handleExplainError} style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid #ffedd5', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
              <AlertTriangle size={14} /> Explain My Error
            </button>
            <button onClick={handleCodeReview} style={{ background: '#faf5ff', color: '#9333ea', border: '1px solid #f3e8ff', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
              <Eye size={14} /> AI Code Review
            </button>
          </div>

          {/* AI Advisor output popover */}
          {aiTip && (
            <div style={{ 
              background: aiTip.type === 'hint' ? '#eff6ff' : aiTip.type === 'error' ? '#fff7ed' : aiTip.type === 'success' ? '#f0fdf4' : '#faf5ff',
              border: `1px solid ${aiTip.type === 'hint' ? '#bfdbfe' : aiTip.type === 'error' ? '#ffedd5' : aiTip.type === 'success' ? '#bbf7d0' : '#e9d5ff'}`,
              color: aiTip.type === 'hint' ? '#1e40af' : aiTip.type === 'error' ? '#9a3412' : aiTip.type === 'success' ? '#166534' : '#581c87',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              lineHeight: 1.6
            }}>
              <strong style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>{aiTip.title}</strong>
              <div style={{ whiteSpace: 'pre-line' }}>{aiTip.content}</div>
            </div>
          )}
        </div>

        {/* Challenge panel / terminal column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Day challenges list */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.8rem', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#475569', marginBottom: '0.6rem' }}>
              <Award size={16} color="#eab308" /> PRACTICE MINI-CHALLENGE:
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {challenges.map((ch, idx) => {
                const passed = challengeStatus[ch.id] === 'passed';
                const active = activeChallengeIdx === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChallengeIdx(idx);
                      setAiTip(null);
                    }}
                    style={{
                      background: active ? '#fff' : 'transparent',
                      border: active ? '1px solid #cbd5e1' : '1px solid transparent',
                      borderRadius: '6px',
                      padding: '0.4rem 0.6rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      fontWeight: active ? 600 : 400
                    }}>
                    <span style={{ color: active ? '#0f172a' : '#64748b' }}>
                      {idx + 1}. {ch.title}
                    </span>
                    {passed ? (
                      <span style={{ color: '#10b981', fontWeight: 700 }}>✅ Solved</span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Pending</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.8rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.6rem', lineHeight: '1.4' }}>
              <strong>Goal:</strong> {challenges[activeChallengeIdx].desc}
            </div>
          </div>

          {/* Execution terminal */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ background: '#f1f5f9', padding: '0.4rem 0.8rem', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>PLOTTER ENGINE CONSOLE:</span>
              <button onClick={() => { setConsoleLog(''); setRenderedPlot(null); }} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.68rem' }}>Clear</button>
            </div>
            <pre style={{
              background: '#1e293b',
              color: '#38bdf8',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              padding: '0.8rem',
              margin: 0,
              flex: 1,
              whiteSpace: 'pre-wrap',
              minHeight: '140px'
            }}>
              {consoleLog || 'Click "Run Code" above to render figures...'}
            </pre>
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
    </div>
  );
}
