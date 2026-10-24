import { getQuestionsByDay } from './spokoHrQuestions.js';

export const DAILY_MOCK_SELECTIONS = {
  1: [1, 3, 4, 6, 8, 10, 11, 13, 18, 20], // 10 questions for Day 1
  2: [21, 22, 23, 25, 26, 27, 29, 32, 35, 40], // 10 questions for Day 2
  3: [41, 42, 43, 44, 46, 48, 50, 51, 56, 59], // 10 questions for Day 3 (STAR method)
  4: [61, 62, 63, 64, 65, 68, 71, 74, 76, 80], // 10 questions for Day 4 (Salary & tough questions)
  5: [81, 82, 83, 86, 87, 88, 91, 93, 98, 100] // 10 questions for Day 5 (Professionalism & Final)
};

export function getMockQuestionsForDay(dayNumber) {
  const d = Number(dayNumber);
  const selectedIds = DAILY_MOCK_SELECTIONS[d] || DAILY_MOCK_SELECTIONS[1];
  const allDayQs = getQuestionsByDay(d);
  return selectedIds.map((id, index) => {
    const found = allDayQs.find(q => q.id === id);
    return {
      index: index + 1,
      id: found?.id || id,
      question: found?.question || `Question ${id}`,
      whyHRAsks: found?.whyHRAsks || '',
      fresherAnswer: found?.fresherAnswer || '',
      experiencedAnswer: found?.experiencedAnswer || '',
      answerTips: found?.answerTips || [],
      commonMistake: found?.commonMistake || '',
      personalisationGuidance: found?.personalisationGuidance || ''
    };
  });
}

/**
 * Intelligent AI Answer Evaluator
 * Evaluates the student's answer based on length, structure, keywords, STAR method (for Day 3), and professional tone.
 */
export function evaluateStudentAnswer(question, studentAnswer, dayNumber) {
  const answer = (studentAnswer || '').trim();
  const wordCount = answer ? answer.split(/\s+/).length : 0;

  if (wordCount === 0) {
    return {
      score: 0,
      feedback: 'No answer provided. Please articulate your response to be evaluated.',
      strengths: [],
      improvements: ['Submit an answer with key examples and details.']
    };
  }

  // 1. Length & Substance Evaluation (0 to 3 points)
  let substanceScore = 0;
  if (wordCount >= 35 && wordCount <= 180) substanceScore = 3;
  else if (wordCount >= 20 && wordCount < 35) substanceScore = 2;
  else if (wordCount > 180) substanceScore = 2.5; // Slightly too long
  else substanceScore = 1; // Too brief

  // 2. Keyword & Structure Relevance (0 to 4 points)
  let structureScore = 1.5;
  const lowerAns = answer.toLowerCase();

  // Day 3 checks for STAR method keywords
  if (dayNumber === 3) {
    const hasSTAR = lowerAns.includes('situation') || lowerAns.includes('task') || lowerAns.includes('action') || lowerAns.includes('result') || lowerAns.includes('when') || lowerAns.includes('because') || lowerAns.includes('so i') || lowerAns.includes('outcome');
    if (hasSTAR) structureScore += 1.5;
    if (lowerAns.includes('team') || lowerAns.includes('project') || lowerAns.includes('resolved') || lowerAns.includes('learned')) structureScore += 1;
  } else if (dayNumber === 4) {
    // Salary & work preference checks
    if (lowerAns.includes('market') || lowerAns.includes('growth') || lowerAns.includes('responsibility') || lowerAns.includes('standard') || lowerAns.includes('flexible')) structureScore += 1.5;
    if (!lowerAns.includes('money only') && !lowerAns.includes('just want cash')) structureScore += 1;
  } else {
    // General days
    if (lowerAns.includes('example') || lowerAns.includes('experience') || lowerAns.includes('project') || lowerAns.includes('skills') || lowerAns.includes('contribute')) structureScore += 1.5;
    if (lowerAns.includes('company') || lowerAns.includes('team') || lowerAns.includes('learning')) structureScore += 1;
  }

  structureScore = Math.min(4, structureScore);

  // 3. Professional Tone & Specificity (0 to 3 points)
  let toneScore = 2;
  // Penalize extreme filler words or unprofessional phrases
  const unprofessionalWords = ['dunno', 'idk', 'whatever', 'hate', 'stupid', 'boring', 'lazy'];
  const hasUnprofessional = unprofessionalWords.some(w => lowerAns.includes(w));
  if (hasUnprofessional) toneScore -= 1.5;

  // Reward numbers, percentages, metrics, timeframes
  const hasMetrics = /\d+%|\d+\s*(years|months|weeks|days|hours|members|users|projects|usd|inr|lpa)/i.test(answer);
  if (hasMetrics) toneScore += 1;

  toneScore = Math.max(0.5, Math.min(3, toneScore));

  const totalItemScore = Math.round((substanceScore + structureScore + toneScore) * 10) / 10;
  const finalScore = Math.min(10, Math.max(2, totalItemScore));

  // Generate personalized feedback
  let feedback = '';
  const strengths = [];
  const improvements = [];

  if (finalScore >= 8.5) {
    feedback = 'Outstanding response! Well-structured, professional, and provides concrete evidence without rambling.';
    strengths.push('Crisp articulation', 'Effective professional tone');
    if (hasMetrics) strengths.push('Good use of quantifiable metrics');
  } else if (finalScore >= 7) {
    feedback = 'Solid answer with good foundational points. Adding more specific examples or metrics would elevate it to executive quality.';
    strengths.push('Relevant key points addressed');
    improvements.push('Add a specific metric or quantifiable result', 'Ensure delivery sounds conversational');
  } else {
    feedback = 'Answer is a bit brief or generic. Expand with a real personal example or structured situation-to-outcome framework.';
    improvements.push('Elaborate with concrete examples', 'Avoid generic claims by backing up with achievements');
  }

  return {
    score: finalScore,
    feedback,
    strengths,
    improvements
  };
}

/**
 * Calculates overall mock interview grade and rubric scores out of 100
 */
export function calculateOverallMockResult(questionResults, dayNumber, dayTopic) {
  const totalQuestions = questionResults.length || 10;
  const rawSum = questionResults.reduce((sum, item) => sum + (Number(item.score) || 0), 0);
  const totalScore = Math.round((rawSum / (totalQuestions * 10)) * 100);

  let grade = 'B';
  if (totalScore >= 90) grade = 'S';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 60) grade = 'C';
  else grade = 'Needs Practice';

  // Rubric breakdown
  const clarityScore = Math.round((totalScore / 100) * 25);
  const contentScore = Math.round((totalScore / 100) * 35);
  const confidenceScore = Math.round((totalScore / 100) * 20);
  const structureScore = Math.round((totalScore / 100) * 20);

  // Compile strengths & improvements
  const allStrengths = new Set();
  const allImprovements = new Set();
  questionResults.forEach(r => {
    (r.strengths || []).forEach(s => allStrengths.add(s));
    (r.improvements || []).forEach(i => allImprovements.add(i));
  });

  if (allStrengths.size === 0) allStrengths.add('Demonstrated willingness to practice and complete the session');
  if (allImprovements.size === 0) allImprovements.add('Maintain steady pacing and continue practicing aloud');

  let overallFeedback = '';
  if (totalScore >= 85) {
    overallFeedback = `Excellent performance on ${dayTopic}! The student communicates with clarity, structured reasoning, and high professional maturity. Highly recommended for live corporate interviews.`;
  } else if (totalScore >= 70) {
    overallFeedback = `Good performance on ${dayTopic}. Concepts and intent are understood well. Focus on adding quantifiable results, practicing with a timer, and eliminating hesitations.`;
  } else {
    overallFeedback = `Needs more structured practice on ${dayTopic}. Focus on studying the sample fresher/experienced answers and rehearse aloud before attempting the next mock session.`;
  }

  return {
    day: Number(dayNumber),
    topic: dayTopic,
    totalScore,
    percentage: totalScore,
    grade,
    clarityScore,
    contentScore,
    confidenceScore,
    structureScore,
    overallFeedback,
    strengths: Array.from(allStrengths).slice(0, 4),
    improvements: Array.from(allImprovements).slice(0, 4),
    questions: questionResults,
    attemptedAt: new Date().toISOString()
  };
}
