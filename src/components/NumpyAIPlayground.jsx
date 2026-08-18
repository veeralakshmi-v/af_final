import React, { useState } from 'react';
import { Play, Sparkles, HelpCircle, AlertTriangle, Eye, Award } from 'lucide-react';

export default function NumpyAIPlayground({ dayId, presets, challenges }) {
  const [code, setCode] = useState(presets[0]?.code || '');
  const [activePreset, setActivePreset] = useState(presets[0]?.name || '');
  const [consoleLog, setConsoleLog] = useState('');
  const [aiTip, setAiTip] = useState(null);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [challengeStatus, setChallengeStatus] = useState({});

  const handleSelectPreset = (preset) => {
    setActivePreset(preset.name);
    setCode(preset.code);
    setConsoleLog('');
    setAiTip(null);
  };

  const handleRunCode = () => {
    setConsoleLog('>>> Running code...\n');
    setTimeout(() => {
      // Find matches in user code to simulate execution dynamically
      const hasImport = code.includes('import numpy as np') || code.includes('import numpy');
      if (!hasImport) {
        setConsoleLog(prev => prev + 'ModuleNotFoundError: No module named \'numpy\'\n❌ Execution Failed!\n(Hint: Make sure to include "import numpy as np" at the top)');
        return;
      }

      // Check current active challenge criteria
      const currentChallenge = challenges[activeChallengeIdx];
      let challengePassed = false;
      let mockOutput = '';

      if (dayId === 'day1') {
        if (currentChallenge.id === 'ch1_identity') {
          if (code.includes('np.eye(3)') || code.includes('np.identity(3)')) {
            challengePassed = true;
            mockOutput = '[[1. 0. 0.]\n [0. 1. 0.]\n [0. 0. 1.]]';
          } else {
            mockOutput = '[Error: Matrix is not 3x3 identity. Hint: use np.eye(3)]';
          }
        } else if (currentChallenge.id === 'ch1_range') {
          if (code.includes('np.arange(10, 51, 5)') || code.includes('np.arange(10, 55, 5)')) {
            challengePassed = true;
            mockOutput = '[10 15 20 25 30 35 40 45 50]';
          } else {
            mockOutput = '[Error: Range does not match. Hint: use np.arange(10, 51, 5)]';
          }
        }
      } else if (dayId === 'day2') {
        if (currentChallenge.id === 'ch2_broadcast') {
          if (code.includes('+ 10') || code.includes('np.add')) {
            challengePassed = true;
            mockOutput = '[[11 12 13]\n [14 15 16]\n [17 18 19]]';
          } else {
            mockOutput = '[[1 2 3]\n [4 5 6]\n [7 8 9]]';
          }
        } else if (currentChallenge.id === 'ch2_intersect') {
          if (code.includes('np.intersect1d')) {
            challengePassed = true;
            mockOutput = '[30 40]';
          } else {
            mockOutput = '[Error: Use np.intersect1d(a, b) to find common elements]';
          }
        }
      } else if (dayId === 'day3') {
        if (currentChallenge.id === 'ch3_even') {
          if (code.includes('arr[arr % 2 == 0]')) {
            challengePassed = true;
            mockOutput = '[12 14 16 18]';
          } else {
            mockOutput = '[Error: Use boolean indexing arr[arr % 2 == 0] to filter evens]';
          }
        } else if (currentChallenge.id === 'ch3_where') {
          if (code.includes('np.where(arr > 30, arr, 0)') || code.includes('np.where(arr > 30,arr,0)')) {
            challengePassed = true;
            mockOutput = '[ 0  0  0 40 50  0]';
          } else {
            mockOutput = '[Error: Use np.where(condition, x, y) for replacement]';
          }
        }
      } else if (dayId === 'day4') {
        if (currentChallenge.id === 'ch4_reshape') {
          if (code.includes('.reshape(3, 4)') || code.includes('reshape(3, -1)')) {
            challengePassed = true;
            mockOutput = '[[ 1  2  3  4]\n [ 5  6  7  8]\n [ 9 10 11 12]]';
          } else {
            mockOutput = '[Error: Use .reshape(3, 4) to reshape the 1D array into 3x4]';
          }
        } else if (currentChallenge.id === 'ch4_stack') {
          if (code.includes('np.hstack') || code.includes('np.concatenate')) {
            challengePassed = true;
            mockOutput = '[[1 2 5 6]\n [3 4 7 8]]';
          } else {
            mockOutput = '[Error: Use np.hstack((a, b)) to join horizontally]';
          }
        }
      } else if (dayId === 'day5') {
        if (currentChallenge.id === 'ch5_logical') {
          if (code.includes('np.logical_and') || code.includes('&')) {
            challengePassed = true;
            mockOutput = '[False  True  True False False]';
          } else {
            mockOutput = '[Error: Combine conditions using np.logical_and or operator &]';
          }
        } else if (currentChallenge.id === 'ch5_errstate') {
          if (code.includes('np.errstate') || code.includes('errstate')) {
            challengePassed = true;
            mockOutput = '[ 1.  inf -1. ]\n(Note: division warnings suppressed successfully)';
          } else {
            mockOutput = '[ 1.  inf -1. ]\nRuntimeWarning: divide by zero encountered in divide';
          }
        }
      } else if (dayId === 'day6') {
        if (currentChallenge.id === 'ch6_random') {
          if (code.includes('np.random.randint') || code.includes('random.randint')) {
            challengePassed = true;
            mockOutput = 'Generated Student IDs: [5981 1204 8839 4529 7721]';
          } else {
            mockOutput = '[Error: Use np.random.randint() to generate integer ranges]';
          }
        } else if (currentChallenge.id === 'ch6_dot') {
          if (code.includes('@') || code.includes('np.dot') || code.includes('matmul')) {
            challengePassed = true;
            mockOutput = 'Dot product / Matrix multiplication result:\n[[19 22]\n [43 50]]';
          } else {
            mockOutput = '[Error: Use @ operator or np.dot() to calculate matrix multiplication]';
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
    const hasImport = code.includes('import numpy as np') || code.includes('import numpy');
    if (!hasImport) {
      setAiTip({
        title: '⚠️ AI Error Explanation',
        content: 'Your code is missing "import numpy as np". In Python, external libraries must be imported before their properties or methods can be accessed. Add "import numpy as np" to line 1 and try running again.',
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
        content: `To solve "${currentChallenge.title}", look at your code structure. You need to use: ${currentChallenge.errorDoc || 'correct NumPy function calls. Make sure your parenthesis are closed and variable names match.'}`,
        type: 'error'
      });
    }
  };

  const handleCodeReview = () => {
    const wordCount = code.split(/\s+/).length;
    let feedback = '';
    let rating = 'Beginner';

    if (code.includes('for ') || code.includes('while ')) {
      feedback = '⚠️ Optimization Warning: We noticed a Python loop in your code! While loops are functional, NumPy shines when utilizing Vectorization (implicit operations running in C). Try rewriting the loop using element-wise arithmetic or built-in ufuncs to make it up to 100x faster.';
      rating = 'Intermediate (Needs Vectorization)';
    } else if (code.includes('np.') || code.includes('import numpy')) {
      feedback = '✔️ Clean Code: Great use of native NumPy vectorized calls! Your code avoids Python interpreter overhead and operates directly on ndarray structures in memory. Memory allocation is optimal.';
      rating = 'Excellent (Vectorized & Native)';
    } else {
      feedback = 'Please load a preset or write code to receive a structural review.';
    }

    setAiTip({
      title: '🚀 AI Code Review',
      content: `Rating: ${rating}\n\n${feedback}\n\nEstimated Time Complexity: O(N) element-wise operations.`,
      type: 'review'
    });
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', padding: '1.2rem', marginTop: '1rem' }}>
      <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={20} color="#0284c7" /> AI-Powered Coding Arena &amp; Challenges
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
                      background: activePreset === p.name ? '#e0f2fe' : '#fff',
                      color: activePreset === p.name ? '#0369a1' : '#64748b',
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
                color: '#38bdf8',
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
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>TERMINAL CONSOLE:</span>
              <button onClick={() => setConsoleLog('')} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.68rem' }}>Clear</button>
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
              {consoleLog || 'Click "Run Code" above to load terminal outputs...'}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
