import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      { id: 'a', text: 'HyperText Markup Language', correct: true },
      { id: 'b', text: 'Hyperlinks and Text Markup Language', correct: false },
      { id: 'c', text: 'Home Tool Markup Language', correct: false },
      { id: 'd', text: 'Hyper Tool Multi Language', correct: false },
    ]
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    options: [
      { id: 'a', text: '<heading>', correct: false },
      { id: 'b', text: '<head>', correct: false },
      { id: 'c', text: '<h6>', correct: false },
      { id: 'd', text: '<h1>', correct: true },
    ]
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      { id: 'a', text: '<a>', correct: true },
      { id: 'b', text: '<link>', correct: false },
      { id: 'c', text: '<href>', correct: false },
      { id: 'd', text: '<url>', correct: false },
    ]
  },
  {
    question: "How can you make a numbered list?",
    options: [
      { id: 'a', text: '<ul>', correct: false },
      { id: 'b', text: '<ol>', correct: true },
      { id: 'c', text: '<dl>', correct: false },
      { id: 'd', text: '<list>', correct: false },
    ]
  },
  {
    question: "What is the correct HTML for inserting an image?",
    options: [
      { id: 'a', text: '<image src="image.gif" alt="MyImage">', correct: false },
      { id: 'b', text: '<img alt="MyImage">image.gif</img>', correct: false },
      { id: 'c', text: '<img href="image.gif" alt="MyImage">', correct: false },
      { id: 'd', text: '<img src="image.gif" alt="MyImage">', correct: true },
    ]
  },
  {
    question: "Which tag is used to define an emphasized text (italic)?",
    options: [
      { id: 'a', text: '<em>', correct: true },
      { id: 'b', text: '<i>', correct: false },
      { id: 'c', text: '<italic>', correct: false },
      { id: 'd', text: 'Both a and b', correct: true }, // Simplifying, we'll just say em is the semantic one. Wait, let's keep it simple.
    ]
  },
  {
    question: "Which HTML element is used to specify a header for a document or section?",
    options: [
      { id: 'a', text: '<top>', correct: false },
      { id: 'b', text: '<head>', correct: false },
      { id: 'c', text: '<header>', correct: true },
      { id: 'd', text: '<section>', correct: false },
    ]
  }
];

export default function Quiz({ questions = quizQuestions }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fix question 5 option array
  quizQuestions[5].options = [
    { id: 'a', text: '<em>', correct: true },
    { id: 'b', text: '<italic>', correct: false },
    { id: 'c', text: '<emp>', correct: false },
    { id: 'd', text: '<strong>', correct: false },
  ];

  const handleSelect = (option) => {
    if (selected !== null) return; // Prevent multiple selections
    setSelected(option.id);

    const isCorrect = option.correct;
    if (isCorrect) {
      setScore(s => s + 1);
      if (typeof window.JSConfetti !== 'undefined') {
        const confetti = new window.JSConfetti();
        confetti.addConfetti({ emojis: ['🌟', '🏆', '🎉', '💯'], confettiNumber: 30 });
      }
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
      } else {
        setQuizFinished(true);
        if (score + (isCorrect ? 1 : 0) === questions.length) {
          if (typeof window.JSConfetti !== 'undefined') {
            const confetti = new window.JSConfetti();
            confetti.addConfetti({ emojis: ['🔥', '👑', '🚀'], confettiNumber: 150 });
          }
        }
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="panel" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>Quiz Completed!</h3>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>You scored {score} out of {questions.length}</p>
        <button className="btn btn-primary" onClick={restartQuiz}>Retake Quiz</button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="panel" style={{ padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <span>Question {currentQ + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      
      <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>{q.question}</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {q.options.map(opt => {
          let bg = 'white';
          let border = 'var(--surface-border)';
          let color = 'var(--text-primary)';
          
          if (selected !== null) {
            if (opt.correct) {
              bg = 'rgba(16, 185, 129, 0.1)'; // var(--success) light
              border = '#10B981';
            } else if (selected === opt.id) {
              bg = 'rgba(239, 68, 68, 0.1)'; // var(--error) light
              border = '#EF4444';
            }
          }

          return (
            <motion.button
              key={opt.id}
              whileHover={selected === null ? { scale: 1.02, borderColor: 'var(--accent-secondary)' } : {}}
              whileTap={selected === null ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(opt)}
              style={{
                padding: '1.25rem',
                border: '1px solid ' + border,
                borderRadius: 'var(--radius-md)',
                backgroundColor: bg,
                color: color,
                cursor: selected === null ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              disabled={selected !== null}
            >
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'rgba(0,0,0,0.05)',
                fontWeight: 'bold',
                color: 'var(--text-secondary)'
              }}>
                {opt.id.toUpperCase()}
              </span>
              {opt.text}
            </motion.button>
          );
        })}
      </div>
      
      {selected !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 'bold', color: selected === q.options.find(o => o.correct).id ? '#10B981' : '#EF4444' }}
        >
          {selected === q.options.find(o => o.correct).id ? "Correct! Moving to next question..." : "Incorrect! Moving to next question..."}
        </motion.div>
      )}
    </div>
  );
}
