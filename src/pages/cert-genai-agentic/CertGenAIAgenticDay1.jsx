import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Cpu, Bot, Sparkles, Layers, Terminal, Database, Shield,
  Workflow, Code, CheckCircle, Zap, Award, ArrowRight, HelpCircle,
  Trophy, BookOpen, Clock, Calendar, Check, ExternalLink, RefreshCw,
  ChevronRight, Play, Eye, FileCode, Server, Sliders, AlertCircle,
  Coffee, Compass, Send, Lightbulb, MessageSquare, ShieldCheck,
  Heart, ThumbsUp, ShoppingBag, Plane, GraduationCap, Utensils
} from 'lucide-react';
import bannerImg from '../../assets/generative_ai_day1_banner.png';
import mlImg from '../../assets/ml_patterns_diagram.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

const SUB_TABS = [
  { id: 'orientation', label: '🧭 Course Orientation & Roadmap', icon: <Compass size={16} /> },
  { id: 'comparison', label: '⚖️ ML vs DL vs Gen AI', icon: <Layers size={16} /> },
  { id: 'aistack', label: '🏗️ Real-World AI Stack', icon: <Server size={16} /> },
  { id: 'simulator', label: '⚡ Interactive Paradigm Simulator', icon: <Cpu size={16} /> },
  { id: 'pythonready', label: '🐍 Python API Readiness', icon: <Terminal size={16} /> },
  { id: 'quiz', label: '✍️ Knowledge Check', icon: <HelpCircle size={16} /> },
  { id: 'assignment', label: '📝 Day 1 Assignment', icon: <Award size={16} /> }
];

const QUIZ_QUESTIONS = [
  {
    q: 'In simple everyday words, what makes Generative AI different from traditional computer programs or Machine Learning?',
    opts: [
      'Generative AI can create brand-new, original content (writing poems, coding apps, drawing art) instead of just predicting a single number or checking a strict rule.',
      'Generative AI is just a giant spreadsheet formula that adds numbers together.',
      'Generative AI only works when there is no internet connection.',
      'Traditional ML can talk like a human, while Generative AI can only output True or False.'
    ],
    ans: 0,
    explanation: 'Exactly! While Traditional ML calculates probabilities or predicts numbers (like predicting tomorrow\'s temperature), Generative AI actually creates new, high-quality human-like text, code, images, and solutions!'
  },
  {
    q: 'What is the easiest way to understand "Deep Learning" using a human senses analogy?',
    opts: [
      'It is like a calculator that only adds and subtracts numbers.',
      'It acts like human eyes and ears: multi-layer neural networks that recognize faces in photos, understand spoken words, and detect patterns in complex raw data.',
      'It is a special brand of computer monitor designed for video games.',
      'It is a tool used strictly for sending automatic marketing emails.'
    ],
    ans: 1,
    explanation: 'Spot on! Deep Learning mimics the layers of neurons in our brains to process rich sensory data like pictures (computer vision) and sound (speech recognition) without needing humans to hand-code every detail.'
  },
  {
    q: 'What is the main difference between a standard Chatbot (like ChatGPT) and an "Agentic AI" system?',
    opts: [
      'Chatbots only speak English, while Agents only speak Python.',
      'A chatbot gives you text answers, while an Agentic AI can actually take action in the real world: browsing web pages, using calculators, booking tickets, and calling external APIs.',
      'There is zero difference; they are identical tools.',
      'An Agentic AI does not use language models at all.'
    ],
    ans: 1,
    explanation: 'You got it! A standard chatbot stops at answering your question. An Agentic AI takes action—it plans steps, checks databases, clicks buttons, and accomplishes the full goal for you autonomously!'
  },
  {
    q: 'In the 6-Layer AI Stack, why do we need Layer 3 (Memory, Documents & Vector Databases / RAG)?',
    opts: [
      'To charge the battery of your laptop.',
      'Because models like GPT-4 don\'t know your private company files or personal notes, so this layer gives the AI a searchable notebook of your private documents to read before answering.',
      'To replace the computer keyboard with a microphone.',
      'To delete all previous chat messages permanently.'
    ],
    ans: 1,
    explanation: 'Perfect! Pre-trained models only know public internet data up to their cutoff date. This knowledge layer (RAG) feeds the AI your exact company PDFs, contracts, and documents so it answers with 100% accurate facts!'
  },
  {
    q: 'What is the best analogy for an "API" in Python when working with AI models?',
    opts: [
      'A printer cable connected to your desk.',
      'A waiter in a restaurant: your Python code gives the waiter your order (prompt), the waiter takes it to the kitchen (AI servers), and brings back your meal (the AI response).',
      'A video game controller that only moves characters left and right.',
      'A mathematical equation that solves quadratic roots.'
    ],
    ans: 1,
    explanation: 'Great analogy! An API simply acts as the messenger (waiter) that connects your local Python code to giant supercomputers hosting OpenAI, Claude, or Google Gemini.'
  }
];

const PARADIGM_EXAMPLES = {
  food: {
    title: 'Food Delivery & Restaurant App (Zomato / Swiggy)',
    icon: <Utensils size={18} />,
    problem: 'How do different AI technologies help you order and enjoy dinner?',
    ml: {
      title: 'Traditional ML (The Predictor / Calculator)',
      concept: 'Predicts numbers based on past historical table data.',
      action: 'Analyzes past traffic, distance, and restaurant prep times to predict: "Your delivery will arrive in 34 minutes."',
      output: 'Estimated Delivery Time: 34 Mins (Confidence: 94%)'
    },
    dl: {
      title: 'Deep Learning (The Human Eyes & Ears)',
      concept: 'Understands images and messy sensory data.',
      action: 'Scans customer photos of delivery packages or food dishes to verify quality and recognize menu items automatically.',
      output: 'Image Recognized: "Crispy Paneer Butter Masala (99% Match)"'
    },
    genai: {
      title: 'Generative AI (The Creative Chef & Writer)',
      concept: 'Creates brand-new human-like text and customized ideas.',
      action: 'You type: "I have eggs, spinach, and sourdough. Give me a 10-minute dinner recipe." It creates a gourmet recipe step-by-step.',
      output: 'Creates: Custom "10-Minute Spinach & Poached Egg Bruschetta" with cooking instructions.'
    },
    agentic: {
      title: 'Agentic AI (The Autonomous Personal Butler)',
      concept: 'Takes multi-step actions and accomplishes goals across different apps.',
      action: 'You say: "Order my favorite Thai curry dinner for 8 PM and pay using Google Pay." It finds the restaurant, selects the items, applies promo discounts, places the order, and updates your calendar.',
      output: 'Done Autonomously: Order placed, $18.50 paid, delivery tracking link sent to your WhatsApp!'
    }
  },
  vacation: {
    title: 'Planning a Vacation Trip to Goa or Paris',
    icon: <Plane size={18} />,
    problem: 'How do different AI technologies help you plan a holiday?',
    ml: {
      title: 'Traditional ML (The Predictor / Calculator)',
      concept: 'Forecasts prices and probabilities from historical trends.',
      action: 'Scans 100,000 flight tickets from last year and alerts you: "Flight prices will rise by 25% next week. Book now!"',
      output: 'Price Alert: "Buy now — lowest fare expected for July"'
    },
    dl: {
      title: 'Deep Learning (The Human Eyes & Ears)',
      concept: 'Processes visual scenes, passports, and sounds.',
      action: 'Uses phone camera to scan your passport page, instantly extracting name, passport number, and expiry date without typing.',
      output: 'Passport Verified & Auto-Filled in 0.2 seconds'
    },
    genai: {
      title: 'Generative AI (The Creative Writer / Guide)',
      concept: 'Writes detailed guides, advice, and ideas from scratch.',
      action: 'Drafts a complete 4-day personalized travel itinerary with hidden cafes, photography spots, and packing checklists.',
      output: 'Generates: "4-Day Sun & Heritage Goa Itinerary" tailored for families with kids.'
    },
    agentic: {
      title: 'Agentic AI (The Full-Service Travel Agent)',
      concept: 'Coordinates flights, hotels, and emails independently.',
      action: 'You say: "Plan a 3-day weekend trip to Goa under $400." The agent searches Skyscanner for flights, selects a top-rated Airbnb, books both, and emails the hotel confirmation to your family.',
      output: 'Done Autonomously: Flight booked, Airbnb reserved, receipts emailed, and calendar invites created!'
    }
  },
  study: {
    title: 'College Homework & Learning New Skills',
    icon: <GraduationCap size={18} />,
    problem: 'How do different AI technologies assist students in studying?',
    ml: {
      title: 'Traditional ML (The Predictor / Calculator)',
      concept: 'Calculates performance scores and recommended study hours.',
      action: 'Analyzes your quiz test scores over the last 3 months and predicts: "You have an 88% chance of scoring Grade A in Math."',
      output: 'Progress Forecast: Grade A Expected (Review Chapter 4)'
    },
    dl: {
      title: 'Deep Learning (The Human Eyes & Ears)',
      concept: 'Reads messy handwriting and spoken teacher lectures.',
      action: 'You take a photo of your messy handwritten chemistry notes; deep learning converts your handwriting into clean digital text.',
      output: 'Handwritten Notes Transcribed to Clean PDF Document'
    },
    genai: {
      title: 'Generative AI (The 24/7 Patient Tutor)',
      concept: 'Explains complex topics in simple words and analogies.',
      action: 'You ask: "Explain Quantum Physics like I am 8 years old." It creates a fun story with cartoon analogies and generates practice questions.',
      output: 'Generates: Simple bedtime story explaining quantum superposition with magic coins.'
    },
    agentic: {
      title: 'Agentic AI (The Autonomous Study Partner)',
      concept: 'Conducts deep research, verifies facts, and schedules flashcards.',
      action: 'You say: "Prepare me for tomorrow\'s Python exam." It searches Wikipedia, compiles a 5-page revision booklet, creates 20 flashcards, tests you, and marks what you got wrong.',
      output: 'Done Autonomously: Study guide drafted, quiz administered, and weak spots reviewed!'
    }
  }
};

const AI_STACK_LAYERS_BEGINNER = [
  {
    layer: 6,
    name: 'Layer 6: The User Interface (Apps & Chatbots)',
    color: '#ec4899',
    badge: 'The Steering Wheel',
    layman: 'The friendly screen where everyday humans chat, click, and interact with AI.',
    analogy: 'Like the touchscreen dashboard in a modern car. It is what you see and touch.',
    example: 'ChatGPT web app, Claude.ai, mobile apps, WhatsApp bots, or internal company dashboards.',
    tools: ['Streamlit', 'Next.js / React', 'WhatsApp / Slack Bots', 'Gradio']
  },
  {
    layer: 5,
    name: 'Layer 5: The Safety Inspector (Guardrails & Quality Check)',
    color: '#8b5cf6',
    badge: 'The Safety Belt',
    layman: 'Makes sure the AI is polite, tells the truth, does not leak passwords, and does not invent fake facts.',
    analogy: 'Like the quality control inspector at a food factory checking every snack before it leaves.',
    example: 'Blocking a user from asking how to make computer viruses, or preventing an AI bank assistant from revealing someone else\'s account balance.',
    tools: ['NeMo Guardrails', 'LangSmith', 'Prompt Shields', 'Content Filters']
  },
  {
    layer: 4,
    name: 'Layer 4: The Hands & Feet (Agent Tools & Frameworks)',
    color: '#10b981',
    badge: 'The Hands & Tools',
    layman: 'Gives the AI hands so it can browse Google, use a calculator, run Python code, or send emails.',
    analogy: 'A brain alone cannot type an email or open a door. This layer gives the AI brain arms and tools to do real work!',
    example: 'An AI assistant using Google Search to check today\'s weather or querying your company SQL database to check today\'s sales.',
    tools: ['LangChain', 'CrewAI', 'n8n', 'Flowise', 'Tool Calling APIs']
  },
  {
    layer: 3,
    name: 'Layer 3: The Memory & Files (Vector Databases & RAG)',
    color: '#3b82f6',
    badge: 'The Digital Notebook',
    layman: 'Gives the AI a digital library containing your private company PDFs, manuals, and customer records.',
    analogy: 'Imagine taking an open-book exam: the AI opens your exact PDF handbook to read the answer so it never makes things up.',
    example: 'A university AI assistant that reads the entire 200-page college rulebook and answers tuition questions accurately.',
    tools: ['Pinecone', 'ChromaDB', 'PDF Parsers', 'Embeddings (Text-to-Numbers)']
  },
  {
    layer: 2,
    name: 'Layer 2: The Brain (Foundation Models)',
    color: '#f59e0b',
    badge: 'The Intelligent Brain',
    layman: 'The giant AI models trained on millions of books and internet pages that understand and speak human language.',
    analogy: 'Like hiring an extraordinarily well-read genius who speaks 50 languages and understands coding, science, and history.',
    example: 'OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google (Gemini 1.5), and Meta (Llama 3.3).',
    tools: ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'Llama 3', 'DeepSeek']
  },
  {
    layer: 1,
    name: 'Layer 1: The Engine & Power (Chips & Cloud Infrastructure)',
    color: '#64748b',
    badge: 'The Engine Powerhouse',
    layman: 'The ultra-powerful computer chips (NVIDIA GPUs) and cloud servers that give AI the raw electric muscle to run.',
    analogy: 'Like the high-performance V8 engine in a racecar or the electricity powering a major city.',
    example: 'Thousands of NVIDIA H100 GPU chips running inside Microsoft Azure, Amazon AWS, or Google Cloud datacenters.',
    tools: ['NVIDIA H100 / Blackwell GPUs', 'AWS Cloud', 'Microsoft Azure', 'Google Cloud']
  }
];

export default function CertGenAIAgenticDay1({ activeTab: propActiveTab = 'orientation', onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'orientation');

  useEffect(() => {
    if (propActiveTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('genai_agentic_m1', tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [selectedParadigmProblem, setSelectedParadigmProblem] = useState('food');
  const [activeStackLayer, setActiveStackLayer] = useState(AI_STACK_LAYERS_BEGINNER[4]); // Layer 2 default

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Live API Simulator State (for Beginner Python Tab)
  const [simPromptIndex, setSimPromptIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simOutput, setSimOutput] = useState(null);

  const samplePrompts = [
    {
      label: '🌱 Explain Gravity simply',
      prompt: 'Explain what gravity is in 2 simple sentences for a 6-year-old child.',
      reply: 'Gravity is like invisible super-glue made by the Earth that keeps our feet on the ground so we don\'t float away into the clouds! When you throw a ball in the air, gravity is the gentle hand that pulls it back down to you.',
      tokens: 46,
      time: '0.4s'
    },
    {
      label: '💼 Write a polite Leave Request',
      prompt: 'Write a short 3-sentence email to my manager requesting leave for Friday.',
      reply: 'Subject: Leave Request - Friday, Nov 28\n\nHi Sarah,\nI would like to request a day off this coming Friday for personal reasons. All my priority tasks for the week are completed, and I will be available on phone in case of any urgent blockers. Thank you for understanding!',
      tokens: 68,
      time: '0.6s'
    },
    {
      label: '🍕 Restaurant Recommendation',
      prompt: 'Suggest 2 healthy dinner alternatives to fast-food pizza.',
      reply: '1. Cauliflower Crust Veggie Pizza: Delivers the same savory crunch and melted cheese with 70% fewer refined carbs.\n2. Warm Mediterranean Quinoa Bowl: Packed with roasted cherry tomatoes, feta cheese, and olives for delicious Italian flavors with high protein.',
      tokens: 58,
      time: '0.5s'
    }
  ];

  const handleRunSimulator = () => {
    setIsSimulating(true);
    setSimOutput(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSimOutput(samplePrompts[simPromptIndex]);
    }, 700);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (quizAnswers[idx] === q.ans) score++;
    });
    return score;
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: 1200, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* 🚀 TOP HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
        borderRadius: 20,
        padding: '2.5rem 2rem',
        color: '#ffffff',
        marginBottom: '2rem',
        boxShadow: '0 15px 35px -10px rgba(15, 23, 42, 0.45)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.78rem',
              padding: '4px 14px',
              borderRadius: 20,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(236, 72, 153, 0.35)'
            }}>
              🎓 3-Month Industry Certification (60 Days)
            </span>
            <span style={{ background: 'rgba(255,255,255,0.12)', color: '#e2e8f0', fontSize: '0.8rem', padding: '4px 12px', borderRadius: 20, fontWeight: 600 }}>
              Cognitive AI Development Track
            </span>
            <span style={{ background: '#10b981', color: '#022c22', fontSize: '0.78rem', padding: '3px 10px', borderRadius: 20, fontWeight: 800 }}>
              Day 1 — Beginner Friendly
            </span>
          </div>

          <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 1rem 0', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
            Certification in Generative AI &amp; Agentic AI
          </h1>
          <p style={{ color: '#e2e8f0', fontSize: '1.05rem', margin: 0, maxWidth: 850, lineHeight: 1.6 }}>
            <strong>Welcome to Day 1!</strong> No prior AI experience needed. Today you will understand how AI works, why Generative AI is transforming our world, and how autonomous AI agents get real work done.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#93c5fd' }}>
              <Clock size={16} /> <strong>Daily Commitment:</strong> 45–60 Mins
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#86efac' }}>
              <Trophy size={16} /> <strong>Total Duration:</strong> 60 Days (3 Months)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: '#fbcfe8' }}>
              <Sparkles size={16} /> <strong>Zero Math Prerequisites:</strong> We start from scratch
            </div>
          </div>
        </div>

        {/* Decorative Background Blob */}
        <div style={{
          position: 'absolute',
          right: -50,
          bottom: -50,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(99,102,241,0.05) 70%, transparent 100%)',
          pointerEvents: 'none',
          filter: 'blur(30px)'
        }}></div>
      </div>

      {/* 🧭 NAVIGATION SUB-TABS */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 10,
        marginBottom: '2rem',
        borderBottom: '2px solid #e2e8f0'
      }}>
        {SUB_TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.65rem 1.15rem',
                borderRadius: 12,
                border: 'none',
                background: isActive ? '#0f172a' : '#f1f5f9',
                color: isActive ? '#ffffff' : '#475569',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 12px rgba(15, 23, 42, 0.2)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: COURSE ORIENTATION & 60-DAY ROADMAP */}
      {/* ========================================================= */}
      {activeTab === 'orientation' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">

          {/* Friendly Beginner Reassurance Card */}
          <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#16a34a', color: 'white', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={24} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#166534', fontWeight: 800 }}>
                🌱 Feeling brand new to AI? Take a breath — you are in the perfect place!
              </h3>
              <p style={{ margin: 0, color: '#15803d', fontSize: '0.92rem', lineHeight: 1.5 }}>
                You don't need complex mathematics or a computer science degree. If you know how to type on a smartphone or browser, you have everything you need. We explain every concept with real-world analogies, interactive tools, and plain human English.
              </p>
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Compass size={22} style={{ color: '#ec4899' }} /> The 3 Eras of Computing: Where We Are Today
            </h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.7, margin: '0 0 1.5rem 0' }}>
              To understand why everyone is excited about Generative &amp; Agentic AI, look at how computers have evolved over the last 30 years:
            </p>

            {/* 3 Eras Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.25rem' }}>
                <span style={{ background: '#64748b', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: 12 }}>ERA 1 (1990s–2010s)</span>
                <h4 style={{ margin: '8px 0 6px 0', color: '#0f172a', fontSize: '1.05rem', fontWeight: 800 }}>Strict Programming</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  Humans had to write strict, rigid rules for everything. If a human forgot a single semicolon, the entire program stopped working.
                </p>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 14, padding: '1.25rem' }}>
                <span style={{ background: '#2563eb', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: 12 }}>ERA 2 (2012–2022)</span>
                <h4 style={{ margin: '8px 0 6px 0', color: '#1e3a8a', fontSize: '1.05rem', fontWeight: 800 }}>Pattern Recognition (ML &amp; DL)</h4>
                <p style={{ margin: 0, color: '#1e40af', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  Computers learned to recognize patterns from millions of past examples (e.g., face unlock on your phone, recommending movies on Netflix).
                </p>
              </div>

              <div style={{ background: '#fdf2f8', border: '2px solid #fbcfe8', borderRadius: 14, padding: '1.25rem', boxShadow: '0 4px 12px rgba(236,72,153,0.1)' }}>
                <span style={{ background: '#ec4899', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: 12 }}>ERA 3 (TODAY: 2023–2026+)</span>
                <h4 style={{ margin: '8px 0 6px 0', color: '#831843', fontSize: '1.05rem', fontWeight: 800 }}>Generative &amp; Agentic AI</h4>
                <p style={{ margin: 0, color: '#9d174d', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  Computers can now create original human-quality writing, code, and graphics — and <strong>act like digital coworkers</strong> who can use web tools and finish real tasks!
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '2rem 0 1rem 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={20} color="#6366f1" /> Your Simple 3-Month Learning Journey (60 Days)
            </h3>

            {/* 3-Month Journey Timeline Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>

              {/* Month 1 Card */}
              <div style={{ background: '#fdf2f8', border: '2px solid #fbcfe8', borderRadius: 14, padding: '1.5rem', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ background: '#ec4899', color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20 }}>
                    MONTH 1 (DAYS 1–20)
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#be185d' }}>⭐ Start Here</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#831843' }}>
                  Learning to Talk to AI &amp; APIs
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#9d174d', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  Discover how AI brains think, write powerful instructions (Prompt Engineering) that get perfect answers every time, and connect simple Python scripts to AI APIs.
                </p>
                <div style={{ background: 'white', borderRadius: 10, padding: '10px 12px', fontSize: '0.82rem', color: '#831843', border: '1px solid #fbcfe8' }}>
                  🎯 <strong>You will build:</strong> Your first automated AI chatbot that answers questions using Python code.
                </div>
              </div>

              {/* Month 2 Card */}
              <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 14, padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ background: '#16a34a', color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20 }}>
                    MONTH 2 (DAYS 21–40)
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d' }}>Step 2</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#14532d' }}>
                  Giving AI Your Private Files &amp; Memory
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#166534', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  Learn how to give the AI your own private PDF documents, company handbooks, and notes so it answers with 100% accuracy (RAG), and create visual workflows with n8n &amp; Flowise.
                </p>
                <div style={{ background: 'white', borderRadius: 10, padding: '10px 12px', fontSize: '0.82rem', color: '#14532d', border: '1px solid #bbf7d0' }}>
                  🎯 <strong>You will build:</strong> A "Chat with your PDF" assistant that reads 100-page documents in seconds.
                </div>
              </div>

              {/* Month 3 Card */}
              <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 14, padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ background: '#2563eb', color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20 }}>
                    MONTH 3 (DAYS 41–60)
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1d4ed8' }}>Graduation</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a' }}>
                  Building Teams of Autonomous AI Coworkers
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#1e40af', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                  Build teams of AI agents that work together (e.g., one agent researches, one writes, and one fact-checks) using frameworks like CrewAI and LangGraph.
                </p>
                <div style={{ background: 'white', borderRadius: 10, padding: '10px 12px', fontSize: '0.82rem', color: '#1e3a8a', border: '1px solid #bfdbfe' }}>
                  🎯 <strong>You will build:</strong> An autonomous team of AI agents that conducts market research and drafts reports on its own.
                </div>
              </div>

            </div>
          </div>

          {/* Banner Diagram Embed */}
          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              🖼️ How Everything Fits Together: The Big Picture
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.86rem', margin: '0 0 1rem 0' }}>
              From simple language models to smart assistants that can use tools and take action.
            </p>
            <img
              src={bannerImg}
              alt="Generative & Agentic AI Blueprint"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => handleTabChange('comparison')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Next: Traditional ML vs DL vs Gen AI <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: TRADITIONAL ML VS DEEP LEARNING VS GENERATIVE AI */}
      {/* ========================================================= */}
      {activeTab === 'comparison' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">

          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Layers size={22} style={{ color: '#2563eb' }} /> The 4 Types of AI Explained in Plain English
            </h2>
            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              People often mix up Machine Learning, Deep Learning, and Generative AI. Here is the easiest way to understand the difference forever using the <strong>Kitchen &amp; Chef Analogy</strong>:
            </p>

            {/* 4 Cards Analogy */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>

              {/* 1. Traditional ML */}
              <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', padding: '4px 8px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800 }}>TYPE 1</span>
                  <span style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.95rem' }}>Traditional ML</span>
                </div>
                <div style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '0.88rem', marginBottom: 6 }}>
                  "The Calculator / Predictor" 📊
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#1e40af', lineHeight: 1.5 }}>
                  <strong>What it does:</strong> Looks at past spreadsheets and predicts a single number or category.
                  <br /><br />
                  <strong>Real Life:</strong> Predicting house prices, spam filter ("Spam or Not Spam?"), or your Uber fare.
                </p>
              </div>

              {/* 2. Deep Learning */}
              <div style={{ background: '#f5f3ff', border: '2px solid #ddd6fe', borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ background: '#7c3aed', color: 'white', padding: '4px 8px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800 }}>TYPE 2</span>
                  <span style={{ fontWeight: 800, color: '#5b21b6', fontSize: '0.95rem' }}>Deep Learning</span>
                </div>
                <div style={{ fontWeight: 700, color: '#6d28d9', fontSize: '0.88rem', marginBottom: 6 }}>
                  "The Human Eyes &amp; Ears" 👁️
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#5b21b6', lineHeight: 1.5 }}>
                  <strong>What it does:</strong> Uses artificial brain cells (neural networks) to understand messy pictures, sounds, and video.
                  <br /><br />
                  <strong>Real Life:</strong> Face Unlock on iPhone, self-driving cars spotting pedestrians, Siri hearing your voice.
                </p>
              </div>

              {/* 3. Generative AI */}
              <div style={{ background: '#fdf2f8', border: '2px solid #fbcfe8', borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ background: '#ec4899', color: 'white', padding: '4px 8px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800 }}>TYPE 3</span>
                  <span style={{ fontWeight: 800, color: '#831843', fontSize: '0.95rem' }}>Generative AI</span>
                </div>
                <div style={{ fontWeight: 700, color: '#be185d', fontSize: '0.88rem', marginBottom: 6 }}>
                  "The Creative Master Writer" 🎨
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#9d174d', lineHeight: 1.5 }}>
                  <strong>What it does:</strong> Creates brand-new, original content (essays, computer code, images, poems) from your prompt.
                  <br /><br />
                  <strong>Real Life:</strong> ChatGPT writing an email, Midjourney creating a logo, GitHub Copilot coding a website.
                </p>
              </div>

              {/* 4. Agentic AI */}
              <div style={{ background: '#faf5ff', border: '2px solid #c084fc', borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ background: '#9333ea', color: 'white', padding: '4px 8px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 800 }}>TYPE 4</span>
                  <span style={{ fontWeight: 800, color: '#581c87', fontSize: '0.95rem' }}>Agentic AI</span>
                </div>
                <div style={{ fontWeight: 700, color: '#7e22ce', fontSize: '0.88rem', marginBottom: 6 }}>
                  "The Autonomous Coworker" 🤖
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#6b21a8', lineHeight: 1.5 }}>
                  <strong>What it does:</strong> Doesn't just give you words — it takes real actions, plans steps, clicks tools, and finishes tasks.
                  <br /><br />
                  <strong>Real Life:</strong> Booking flights, querying live databases, writing and sending emails to clients on its own.
                </p>
              </div>

            </div>

            {/* Beginner Comparison Table */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem 0' }}>
              📊 Quick Comparison at a Glance
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 14px', fontWeight: 800, color: '#0f172a' }}>Aspect</th>
                    <th style={{ padding: '12px 14px', fontWeight: 800, color: '#2563eb' }}>Traditional ML</th>
                    <th style={{ padding: '12px 14px', fontWeight: 800, color: '#7c3aed' }}>Deep Learning</th>
                    <th style={{ padding: '12px 14px', fontWeight: 800, color: '#ec4899' }}>Generative &amp; Agentic AI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#334155' }}>Primary Superpower</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Predicting a number / category</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Seeing pictures &amp; hearing sounds</td>
                    <td style={{ padding: '12px 14px', color: '#be185d', fontWeight: 700 }}>Creating original content &amp; taking action</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#334155' }}>What you give it (Input)</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Clean spreadsheets with numbers</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Photos, videos, audio recordings</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Plain human language prompts</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#334155' }}>What it gives you (Output)</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>A single score (e.g. 84% probability)</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Identifies object ("Cat", "Stop Sign")</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Full articles, software code, actions taken</td>
                  </tr>
                  <tr style={{ background: '#fafafa' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#334155' }}>Famous Examples</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Credit card fraud alerts, spam filter</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>Face ID, Google Translate voice, Tesla vision</td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>ChatGPT, Claude, Cursor, Devin, AutoGPT</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Rule of Thumb Box */}
            <div style={{ background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 14, padding: '1.25rem' }}>
              <div style={{ fontWeight: 800, color: '#92400e', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Lightbulb size={20} color="#d97706" /> Golden Rule for Beginners:
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#78350f', lineHeight: 1.6 }}>
                • Need to forecast next month's sales numbers? ➡️ <strong>Use Traditional ML</strong><br />
                • Need to verify customer photo IDs or read road signs? ➡️ <strong>Use Deep Learning</strong><br />
                • Need to draft emails, summarize long PDFs, or write computer code? ➡️ <strong>Use Generative AI</strong><br />
                • Need an assistant to research flights, book the hotel, and email the tickets? ➡️ <strong>Use Agentic AI!</strong>
              </p>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('orientation')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to Orientation
            </button>
            <button
              onClick={() => handleTabChange('aistack')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Explore the 6 AI Building Blocks <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: THE REAL-WORLD PRODUCTION AI STACK (6 LAYERS) */}
      {/* ========================================================= */}
      {activeTab === 'aistack' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">

          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Server size={22} style={{ color: '#10b981' }} /> The 6 Building Blocks of Every AI Application
                </h2>
                <p style={{ color: '#475569', fontSize: '0.94rem', margin: 0, lineHeight: 1.5 }}>
                  Think of building an AI application like building a modern car. Click on any layer below to see how each part works together:
                </p>
              </div>
              <span style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700 }}>
                Simple Building Blocks
              </span>
            </div>

            {/* Interactive Stack Visualizer */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.4fr)', gap: '1.5rem', marginTop: '1.5rem' }}>

              {/* Stack Layers Clickable Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {AI_STACK_LAYERS_BEGINNER.map(item => {
                  const isSelected = activeStackLayer.layer === item.layer;
                  return (
                    <div
                      key={item.layer}
                      onClick={() => setActiveStackLayer(item)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: 12,
                        background: isSelected ? `${item.color}10` : '#f8fafc',
                        border: `2px solid ${isSelected ? item.color : '#e2e8f0'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? `0 4px 12px ${item.color}20` : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: item.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.8rem'
                        }}>
                          {item.layer}
                        </span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isSelected ? item.color : '#0f172a' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {item.badge}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={18} style={{ color: isSelected ? item.color : '#94a3b8' }} />
                    </div>
                  );
                })}
              </div>

              {/* Selected Layer Detailed Panel */}
              <div style={{
                background: '#fafafa',
                border: `2px solid ${activeStackLayer.color}40`,
                borderRadius: 14,
                padding: '1.75rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ background: activeStackLayer.color, color: 'white', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 12 }}>
                    LAYER {activeStackLayer.layer}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>
                    {activeStackLayer.badge}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                  {activeStackLayer.name}
                </h3>

                {/* Plain English Explanation */}
                <div style={{ background: 'white', borderRadius: 10, padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.86rem', display: 'block', marginBottom: 4 }}>
                    💡 What It Means In Simple English:
                  </strong>
                  <p style={{ margin: 0, color: '#334155', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {activeStackLayer.layman}
                  </p>
                </div>

                {/* Relatable Analogy */}
                <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '1rem', border: '1px solid #bbf7d0', marginBottom: '1rem' }}>
                  <strong style={{ color: '#166534', fontSize: '0.86rem', display: 'block', marginBottom: 4 }}>
                    🚗 Real-World Car Analogy:
                  </strong>
                  <p style={{ margin: 0, color: '#15803d', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    {activeStackLayer.analogy}
                  </p>
                </div>

                {/* Everyday Example */}
                <div style={{ background: '#eff6ff', borderRadius: 10, padding: '1rem', border: '1px solid #bfdbfe', marginBottom: '1rem' }}>
                  <strong style={{ color: '#1e40af', fontSize: '0.86rem', display: 'block', marginBottom: 4 }}>
                    ✨ Everyday Example:
                  </strong>
                  <p style={{ margin: 0, color: '#1d4ed8', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    {activeStackLayer.example}
                  </p>
                </div>

                {/* Famous Tools */}
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>
                    Popular Tools In This Layer:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {activeStackLayer.tools.map((t, i) => (
                      <span key={i} style={{ background: '#e2e8f0', color: '#1e293b', fontSize: '0.78rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('comparison')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to Comparison
            </button>
            <button
              onClick={() => handleTabChange('simulator')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Try the Everyday Paradigm Simulator <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: INTERACTIVE PARADIGM SIMULATOR */}
      {/* ========================================================= */}
      {activeTab === 'simulator' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">

          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Cpu size={22} style={{ color: '#ec4899' }} /> Interactive AI Paradigm Simulator
            </h2>
            <p style={{ color: '#475569', fontSize: '0.94rem', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
              Pick an everyday real-world situation below to see how each type of AI handles it differently:
            </p>

            {/* Problem Selection Pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              {Object.keys(PARADIGM_EXAMPLES).map(key => {
                const isSelected = selectedParadigmProblem === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedParadigmProblem(key)}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: 12,
                      border: isSelected ? '2px solid #ec4899' : '1px solid #cbd5e1',
                      background: isSelected ? '#fdf2f8' : '#ffffff',
                      color: isSelected ? '#be185d' : '#334155',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: isSelected ? '0 3px 10px rgba(236,72,153,0.15)' : 'none'
                    }}
                  >
                    {PARADIGM_EXAMPLES[key].icon} {PARADIGM_EXAMPLES[key].title}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Comparison Cards */}
            {(() => {
              const current = PARADIGM_EXAMPLES[selectedParadigmProblem];
              return (
                <div>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                    <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>🎯 The Challenge: </strong>
                    <span style={{ color: '#475569', fontSize: '0.92rem' }}>{current.problem}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>

                    {/* ML Approach */}
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ background: '#2563eb', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>1</span>
                        <span style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.9rem' }}>Traditional ML</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#1d4ed8', marginBottom: 6, fontWeight: 700 }}>{current.ml.title}</div>
                      <p style={{ fontSize: '0.82rem', color: '#1e40af', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                        {current.ml.action}
                      </p>
                      <div style={{ background: 'white', padding: '8px 10px', borderRadius: 8, fontSize: '0.8rem', color: '#1e3a8a', fontWeight: 700, border: '1px solid #bfdbfe' }}>
                        📌 Output: {current.ml.output}
                      </div>
                    </div>

                    {/* Deep Learning Approach */}
                    <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 12, padding: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ background: '#7c3aed', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>2</span>
                        <span style={{ fontWeight: 800, color: '#5b21b6', fontSize: '0.9rem' }}>Deep Learning</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6d28d9', marginBottom: 6, fontWeight: 700 }}>{current.dl.title}</div>
                      <p style={{ fontSize: '0.82rem', color: '#5b21b6', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                        {current.dl.action}
                      </p>
                      <div style={{ background: 'white', padding: '8px 10px', borderRadius: 8, fontSize: '0.8rem', color: '#5b21b6', fontWeight: 700, border: '1px solid #ddd6fe' }}>
                        📌 Output: {current.dl.output}
                      </div>
                    </div>

                    {/* Generative AI Approach */}
                    <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: 12, padding: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ background: '#ec4899', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>3</span>
                        <span style={{ fontWeight: 800, color: '#831843', fontSize: '0.9rem' }}>Generative AI</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#be185d', marginBottom: 6, fontWeight: 700 }}>{current.genai.title}</div>
                      <p style={{ fontSize: '0.82rem', color: '#9d174d', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                        {current.genai.action}
                      </p>
                      <div style={{ background: 'white', padding: '8px 10px', borderRadius: 8, fontSize: '0.8rem', color: '#831843', fontWeight: 700, border: '1px solid #fbcfe8' }}>
                        📌 Output: {current.genai.output}
                      </div>
                    </div>

                    {/* Agentic AI Approach */}
                    <div style={{ background: '#faf5ff', border: '2px solid #a855f7', borderRadius: 12, padding: '1.25rem', boxShadow: '0 4px 12px rgba(168,85,247,0.12)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ background: '#9333ea', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>4</span>
                        <span style={{ fontWeight: 800, color: '#581c87', fontSize: '0.9rem' }}>Agentic AI (Autonomous)</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#7e22ce', marginBottom: 6, fontWeight: 700 }}>{current.agentic.title}</div>
                      <p style={{ fontSize: '0.82rem', color: '#6b21a8', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                        {current.agentic.action}
                      </p>
                      <div style={{ background: '#9333ea', padding: '8px 10px', borderRadius: 8, fontSize: '0.8rem', color: 'white', fontWeight: 700 }}>
                        🚀 Action: {current.agentic.output}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('aistack')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to AI Stack
            </button>
            <button
              onClick={() => handleTabChange('pythonready')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Try the Python API Quickstart <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: PYTHON API READINESS & LIVE SANDBOX */}
      {/* ========================================================= */}
      {activeTab === 'pythonready' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">

          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Terminal size={22} style={{ color: '#10b981' }} /> Understanding AI APIs (Explained Simply)
            </h2>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Never worked with an API before? Don't worry! Here is what an API actually is in everyday life:
            </p>

            {/* The Restaurant Waiter Analogy Card */}
            <div style={{ background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#92400e', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Coffee size={20} color="#d97706" /> The Restaurant Waiter Analogy
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: 'white', borderRadius: 10, padding: '10px 14px', border: '1px solid #fde68a' }}>
                  <div style={{ fontWeight: 800, color: '#78350f', fontSize: '0.85rem' }}>1. You (The Customer)</div>
                  <div style={{ fontSize: '0.8rem', color: '#92400e', marginTop: 4 }}>Your simple Python program running on your laptop.</div>
                </div>
                <div style={{ background: 'white', borderRadius: 10, padding: '10px 14px', border: '1px solid #fde68a' }}>
                  <div style={{ fontWeight: 800, color: '#78350f', fontSize: '0.85rem' }}>2. The Waiter (The API)</div>
                  <div style={{ fontSize: '0.8rem', color: '#92400e', marginTop: 4 }}>Takes your order (prompt) across the internet to the AI servers.</div>
                </div>
                <div style={{ background: 'white', borderRadius: 10, padding: '10px 14px', border: '1px solid #fde68a' }}>
                  <div style={{ fontWeight: 800, color: '#78350f', fontSize: '0.85rem' }}>3. The Kitchen (OpenAI / Claude)</div>
                  <div style={{ fontSize: '0.8rem', color: '#92400e', marginTop: 4 }}>The supercomputer cooks the answer and hands it to the waiter.</div>
                </div>
                <div style={{ background: 'white', borderRadius: 10, padding: '10px 14px', border: '1px solid #fde68a' }}>
                  <div style={{ fontWeight: 800, color: '#78350f', fontSize: '0.85rem' }}>4. The Food (The Response)</div>
                  <div style={{ fontSize: '0.8rem', color: '#92400e', marginTop: 4 }}>The waiter brings your hot answer back to your Python screen!</div>
                </div>
              </div>
            </div>

            {/* Interactive In-Browser API Test Simulator */}
            <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Play size={18} color="#2563eb" /> Live Browser Simulation: Try Calling an AI API!
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#64748b' }}>
                    No setup or API key needed today! Test how a Python API request works right here:
                  </p>
                </div>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>
                  Live Interactive Demo
                </span>
              </div>

              {/* Sample Prompt Selector */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSimPromptIndex(idx);
                      setSimOutput(null);
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: simPromptIndex === idx ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      background: simPromptIndex === idx ? '#eff6ff' : 'white',
                      color: simPromptIndex === idx ? '#1e40af' : '#475569',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* The Simulated Code Window */}
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', color: '#f8fafc', fontFamily: 'monospace', fontSize: '0.84rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                <span style={{ color: '#64748b' }}># 1. Your Prompt sent to OpenAI API:</span><br />
                prompt = <span style={{ color: '#a7f3d0' }}>"{samplePrompts[simPromptIndex].prompt}"</span><br /><br />
                <span style={{ color: '#64748b' }}># 2. Simulated Python Call:</span><br />
                response = client.chat.completions.create(model=<span style={{ color: '#a7f3d0' }}>"gpt-4o"</span>, messages=[&#123;"role": "user", "content": prompt&#125;])
              </div>

              <button
                onClick={handleRunSimulator}
                disabled={isSimulating}
                style={{
                  background: isSimulating ? '#94a3b8' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 8,
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: isSimulating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: '1rem'
                }}
              >
                {isSimulating ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
                {isSimulating ? 'Waiting for AI Kitchen to respond...' : '🚀 Send API Request to AI'}
              </button>

              {/* Simulated Output Card */}
              {simOutput && (
                <div style={{ background: '#ffffff', border: '2px solid #86efac', borderRadius: 10, padding: '1.25rem', boxShadow: '0 4px 12px rgba(22,163,74,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ color: '#166534', fontWeight: 800, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle size={16} color="#16a34a" /> 200 OK — Response Received!
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      ⚡ Speed: {simOutput.time} | 🪙 Tokens: {simOutput.tokens}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {simOutput.reply}
                  </div>
                </div>
              )}

            </div>

            {/* Gentle 3-Step Local Setup Guide */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '2rem 0 1rem 0' }}>
              🛠️ Preparing Your Computer (Step-by-Step for Day 2)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 4 }}>
                  Step 1: Download &amp; Install Python
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#475569' }}>
                  If you don't have Python yet, download it for free from <a href="https://python.org" target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 700 }}>python.org</a>. Make sure to check the box that says <strong>"Add Python to PATH"</strong> during installation.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 4 }}>
                  Step 2: What is an API Key?
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#475569' }}>
                  An API Key is like a secret digital VIP pass given to you by OpenAI or Google. It tells their servers: "This is a genuine learner, let them use the model." You keep it secret just like your email password.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 4 }}>
                  Step 3: What We Will Do in Day 2
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                  Tomorrow in Day 2, we will look under the hood of Large Language Models (LLMs): how they read words as "tokens", how context windows work, and write our first real Python script together!
                </p>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('simulator')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to Simulator
            </button>
            <button
              onClick={() => handleTabChange('quiz')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Take Day 1 Friendly Quiz <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: KNOWLEDGE ASSESSMENT (QUIZ) */}
      {/* ========================================================= */}
      {activeTab === 'quiz' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">

          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <HelpCircle size={22} style={{ color: '#6366f1' }} /> Day 1 Knowledge Check Quiz
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
                  No stress! Test what you learned today in 5 simple questions. You can retake it anytime.
                </p>
              </div>
              {quizSubmitted && (
                <div style={{
                  background: calculateScore() >= 4 ? '#dcfce7' : '#fee2e2',
                  color: calculateScore() >= 4 ? '#166534' : '#991b1b',
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontWeight: 800,
                  fontSize: '0.9rem'
                }}>
                  Score: {calculateScore()} / {QUIZ_QUESTIONS.length} ({Math.round((calculateScore() / QUIZ_QUESTIONS.length) * 100)}%)
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {QUIZ_QUESTIONS.map((question, qIdx) => {
                const selected = quizAnswers[qIdx];
                return (
                  <div key={qIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: 10, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#6366f1' }}>Q{qIdx + 1}.</span> {question.q}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {question.opts.map((opt, optIdx) => {
                        let optStyle = {
                          padding: '10px 14px',
                          borderRadius: 8,
                          fontSize: '0.88rem',
                          border: '1px solid #cbd5e1',
                          background: 'white',
                          cursor: quizSubmitted ? 'default' : 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s'
                        };

                        if (selected === optIdx) {
                          optStyle.borderColor = '#6366f1';
                          optStyle.background = '#eef2ff';
                          optStyle.fontWeight = 700;
                        }

                        if (quizSubmitted) {
                          if (optIdx === question.ans) {
                            optStyle.borderColor = '#16a34a';
                            optStyle.background = '#dcfce7';
                            optStyle.color = '#14532d';
                            optStyle.fontWeight = 700;
                          } else if (selected === optIdx) {
                            optStyle.borderColor = '#dc2626';
                            optStyle.background = '#fee2e2';
                            optStyle.color = '#991b1b';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            style={optStyle}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div style={{ marginTop: 10, background: '#f1f5f9', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem', color: '#334155' }}>
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              {!quizSubmitted ? (
                <button
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  onClick={() => setQuizSubmitted(true)}
                  style={{
                    background: Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length ? '#2563eb' : '#94a3b8',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 10,
                    border: 'none',
                    fontWeight: 800,
                    cursor: Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length ? 'pointer' : 'not-allowed'
                  }}
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  style={{ background: '#f1f5f9', color: '#334155', padding: '0.65rem 1.25rem', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  Retake Quiz
                </button>
              )}
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => handleTabChange('pythonready')}
              style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.25rem', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              ← Back to Python Readiness
            </button>
            <button
              onClick={() => handleTabChange('assignment')}
              style={{ background: '#0f172a', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Go to Day 1 Practical Assignment <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: DAY 1 PRACTICAL ASSIGNMENT & TASKS */}
      {/* ========================================================= */}
      {activeTab === 'assignment' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit">

          <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Award size={22} style={{ color: '#16a34a' }} /> Day 1 Practical Assignment &amp; Self-Reflection
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
                  Take a few minutes to reflect on what you learned today, write your thoughts, and submit for instructor evaluation.
                </p>
              </div>
              <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '4px 14px', borderRadius: 20, fontWeight: 700, fontSize: '0.82rem' }}>
                4 Guided Questions
              </span>
            </div>

            {/* Practical Task Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>1</span>
                  Task 1: Identify Everyday AI in Your Life
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  Name at least 2 AI tools or features you have seen or used (e.g. ChatGPT, Apple Siri, Netflix movie suggestions, Gmail spam filter, Google Lens). Based on what you learned today, explain whether each one is Traditional ML, Deep Learning, or Generative AI.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>2</span>
                  Task 2: Chatbot vs. Autonomous Agent
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  In your own simple words, explain the difference between asking ChatGPT a question versus having an Agentic AI assistant (Hint: remember the Chef vs. Personal Butler analogy!).
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>3</span>
                  Task 3: Your Dream AI Coworker
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  Think of one boring, repetitive task in your daily life, college, or job (e.g., sorting invoices, organizing study notes, replying to standard emails). Describe how you would want an autonomous AI agent to do it for you.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>4</span>
                  Task 4: Your 60-Day Learning Commitment
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  Write down your personal learning goal for this 60-day certification. What kind of AI project or career milestone are you aiming to achieve by the end of this course?
                </p>
              </div>

            </div>

            {/* Call to Action Banner to Submit on Assignment Page */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              border: '2px solid #86efac',
              borderRadius: 14,
              padding: '1.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h3 style={{ margin: '0 0 0.35rem 0', color: '#14532d', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle size={20} color="#16a34a" /> Ready to Submit Your Day 1 Reflection?
                </h3>
                <p style={{ margin: 0, color: '#166534', fontSize: '0.9rem', maxWidth: 650, lineHeight: 1.5 }}>
                  Submitting your reflection unlocks your Day 1 milestone and queues your submission in the Instructor Evaluation Panel for review.
                </p>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('genai_agentic_m1', 'assignment')}
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.85rem 1.75rem',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                Open Day 1 Submission Form <ArrowRight size={18} />
              </button>
            </div>

          </div>

        </motion.div>
      )}

    </div>
  );
}
