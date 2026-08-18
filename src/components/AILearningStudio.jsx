import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Cpu, Database, Terminal, CheckCircle, Sliders, Zap, Bot, Copy, Check, Star, Trophy, HelpCircle, ArrowRight } from 'lucide-react';

// Unified 12-Step Content DB by Course & Module
const COURSE_CONTENTS = {
  // === PYTHON PROGRAMMING ===
  python_course: {
    title: "AI-Powered Python Programming",
    intro: "Learn Python fundamentals, automation, and advanced Object-Oriented Programming (OOP) assisted by professional AI tools.",
    steps: {
      step1: "Python is a high-level language built for readability. In industry, it powers AI engineering, web servers, and automation scripting.",
      step2: "Real companies (Google, Netflix, Instagram) use Python to manage data pipelines, automate repetitive reports, and serve millions of recommendations in 0.05 seconds.",
      step3: "Focus on syntax, indentation rules, loop logic, dynamic variables, and custom methods. Never let AI write logic you don't understand manually first.",
      step4: "Write a function manually that takes a list of integers and returns only the prime numbers. Do not search the web or ask AI.",
      step5: {
        tool: "GitHub Copilot / Claude",
        prompt: "Prompt: 'Write a Python unit test using unittest for a function calculate_primes(numbers) that handles empty lists, negative values, and floats.'",
        output: "def test_empty(self):\n    self.assertEqual(calculate_primes([]), [])",
        error: "AI often ignores edge cases (like strings inside the number list) or writes overly complex regex. Always verify inputs explicitly.",
        best_practice: "Write docstrings manually first, then trigger autocomplete. This gives the AI the perfect context."
      },
      step6: "Open your local IDE. Write a script `analytics.py`, integrate input file safety, and wrap it in a `try...except` exception handler.",
      step7: "Add a feature to your script that prints the timestamp of when the analysis ran using the `datetime` module.",
      step8: "A QA Engineer uses an AI script assistant to generate 50 mock customer profiles for testing a user dashboard API in 2 seconds.",
      step9: "Build a CLI-based Sentiment Analyzer tool that reads customer feedback text files, counts keywords, and categorizes sentiment.",
      step10: "Create a program that downloads stock price CSV data, extracts the average price using a function, and writes results to a local file. Submit your `.py` script.",
      step11: [
        { q: "What is the best way to write prompts for code refactoring?", opts: ["Paste the code and ask 'fix this'", "Provide the code, state the language version, and specify optimization goals (e.g. time complexity)", "Ask AI to rewrite it in another language entirely"], ans: 1 },
        { q: "How should you handle an AI-generated database connection script?", opts: ["Run it directly in production", "Verify connection string security and wrap connection handles in try-except-finally statements", "Assume AI code never has bugs"], ans: 1 }
      ],
      step12: "Commit your Sentiment Analyzer project to GitHub. Add a README.md detailing the prompt engineering workflow you used to optimize the code."
    }
  },

  // === SQL ===
  sql: {
    title: "AI-Assisted Database Administration & SQL",
    intro: "Master relational databases, complex INNER/LEFT joins, aggregates, and query optimization workflows using AI database assistants.",
    steps: {
      step1: "SQL (Structured Query Language) is the standard interface for managing relational databases like PostgreSQL, MySQL, and SQL Server.",
      step2: "Tech firms (Uber, Amazon) query billions of rows daily to track ride histories, stock levels, and user logins using SQL schemas.",
      step3: "Understand SELECT statements, WHERE filters, GROUP BY grouping, HAVING filters, and multi-table relationships.",
      step4: "Write a raw SQL query manually to calculate the average sales group by city from an 'orders' table, showing only cities with sales > 5000.",
      step5: {
        tool: "ChatGPT / vanna.ai",
        prompt: "Prompt: 'Write an optimized PostgreSQL query joining customers, orders, and products to find the top 5 spenders in 2025. Include index suggestions.'",
        output: "SELECT c.name, SUM(o.amount) FROM customers c JOIN orders o ON c.id = o.customer_id ...",
        error: "AI often generates syntactically valid queries that fail due to non-existent column name assumptions or wrong JOIN directions.",
        best_practice: "Always provide your database schema definition (CREATE TABLE statements) in the prompt context."
      },
      step6: "Connect to your SQL playground. Create tables, insert 5 mock rows, and execute an INNER JOIN manually.",
      step7: "Modify your query to retrieve records where the customer has no active orders (LEFT JOIN with NULL filter).",
      step8: "Data analysts use AI text-to-SQL tools to quickly query business performance numbers without writing nested subqueries from scratch.",
      step9: "Create an e-commerce transactional database with index keys and execute optimized queries to generate weekly sales reports.",
      step10: "Write a SQL script defining an orders table, inserting mock records, and calculating aggregations. Submit your SQL queries.",
      step11: [
        { q: "What schema context is critical when asking AI to generate SQL queries?", opts: ["Providing the exact table and column names with their data types", "Only the database name", "The server operating system"], ans: 0 },
        { q: "Which SQL join is best for finding records in table A that do not exist in table B?", opts: ["INNER JOIN", "FULL OUTER JOIN", "LEFT JOIN filtered by WHERE table_b.id IS NULL"], ans: 2 }
      ],
      step12: "Export your database schema. Write an optimization walkthrough explaining how you used AI suggestions to index key fields."
    }
  },

  // === POWER BI ===
  powerbi: {
    title: "AI-Powered Data Visualization & Power BI",
    intro: "Build premium interactive business intelligence dashboards, compile advanced DAX formulas, and run forecasting workflows.",
    steps: {
      step1: "Power BI turns raw databases into rich visual layouts. Learn to build models, write DAX equations, and configure sync slicers.",
      step2: "Corporate dashboards monitor revenue KPIs, HR retention metrics, and factory sensor logs to make million-dollar decisions daily.",
      step3: "Master fact vs. dimension tables, relationships, star schemas, measures vs. calculated columns, and standard line/bar charts.",
      step4: "Calculate year-over-year revenue growth manually using standard DAX functions (`CALCULATE` and `SAMEPERIODLASTYEAR`).",
      step5: {
        tool: "Power BI Copilot / DAX Studio",
        prompt: "Prompt: 'Generate a DAX measure for 3-month rolling average sales, handling blank periods and filtering for online transactions.'",
        output: "RollingAverage = AVERAGEX(DATESINPERIOD('Calendar'[Date], LASTDATE('Calendar'[Date]), -3, MONTH), [Total Sales])",
        error: "AI often outputs DAX expressions with incorrect table names or context limits. Always test measures in a simple visual card first.",
        best_practice: "Clarify your date table name and standard relationship structure when prompting for complex time intelligence formulas."
      },
      step6: "Load the mock sales dataset. Build a star schema relationship layout and create a custom revenue visual indicator.",
      step7: "Add a Power BI Q&A visual element to your report layout, allowing users to query data using natural language search.",
      step8: "A business consultant deploys Power BI anomaly detection to find sales spikes in multi-million record transactional dashboards.",
      step9: "Build a complete HR Attrition Dashboard showing monthly exit percentages, interactive department filters, and AI forecasting.",
      step10: "Publish your dashboard report as a PDF/web link and document the DAX logic you used to calculate key metrics. Submit the file.",
      step11: [
        { q: "What is the difference between a Measure and a Calculated Column in Power BI?", opts: ["Columns evaluate row-by-row during data refresh, while Measures evaluate dynamically on-the-fly inside visual filters", "Measures are calculated during refresh only", "There is no difference"], ans: 0 },
        { q: "How does Power BI Anomaly Detection assist business users?", opts: ["It automatically deletes database rows", "It flags unexpected spikes or dips outside standard deviations and suggests context explanations", "It creates new report pages automatically"], ans: 1 }
      ],
      step12: "Publish your dashboard to your portfolio. Include a write-up detailing the business questions your dashboard layout answers."
    }
  },

  // === AGENTIC AI ===
  agentic_ai: {
    title: "Agentic AI Developer Boot Camp",
    intro: "Build autonomous multi-agent workspaces, design persistent memory tools, and deploy real AI agents (HR, Support, Sales).",
    steps: {
      step1: "Agentic AI is the frontier of artificial intelligence. Unlike simple chatbots, AI agents can plan, call tools, browse, and execute tasks.",
      step2: "Companies employ AI agents to pre-screen hundreds of candidate resumes, handle live customer support tickets, and write daily research files.",
      step3: "Master LLM planning paradigms, tool integration hooks, vector memory storage, agentic prompts, and multi-agent frameworks (CrewAI, LangGraph).",
      step4: "Draw a system architecture layout showing how an autonomous agent accesses web search tools and handles failures manually.",
      step5: {
        tool: "LangChain / CrewAI / Gemini API",
        prompt: "Prompt: 'Design a system prompt for a Research Agent specializing in crypto metrics. Define its role, tools (search, file_write), and warning criteria.'",
        output: "SYSTEM_PROMPT = 'You are an expert researcher. Use search to verify dates...'",
        error: "Agents can get stuck in recursive loop behaviors (calling the same tool repeatedly). Implement iteration limits.",
        best_practice: "Give your agents clear instructions, specific formatting rules, and strict boundary conditions."
      },
      step6: "Write a simple Python script declaring an agent with access to a Google Search API wrapper tool.",
      step7: "Modify your agent script to save its outputs to a local Markdown file using a custom file writer tool.",
      step8: "A tech startup builds an automated customer support agent team that checks incoming user tickets, reads documentation, and drafts answers.",
      step9: "Build a complete autonomous HR Recruiter Agent that takes a job description, reads candidate PDF profiles, and writes rankings.",
      step10: "Develop an autonomous admissions assistant agent. Test its tool executions and submit your codebase link.",
      step11: [
        { q: "What prevents an AI agent from looping infinitely when tools fail?", opts: ["Adding retry count limits and strict output verification tests", "Asking the user to rewrite code", "Buying a faster CPU"], ans: 0 },
        { q: "Which component gives an AI agent the ability to remember past conversation contexts?", opts: ["Database indexing", "Persistent conversational memory (e.g. Window Buffer, Vector database storage)", "Dynamic API keys"], ans: 1 }
      ],
      step12: "Publish your Agentic recruitment system codebase on GitHub. Include an architecture diagram showing the multi-agent planning layout."
    }
  }
};

// Fallback dynamic database generator
const getFallbackContent = (topicId, courseId) => {
  const name = topicId.replace(/_/g, ' ').toUpperCase();
  
  // Default values
  let title = `AI-Powered ${name} Studio`;
  let intro = `Master the fundamentals of ${name} and build professional AI-assisted workflows.`;
  let step1 = `Fundamentals: ${name} is a key industry standard used to build modern database logic, clean metrics, and digital tools.`;
  let step2 = `Corporate use cases: Enterprise systems utilize this concept to speed up feature delivery, clean analytics, and monitor performance.`;
  let step3 = `Learn from scratch: Focus on basic operations, parameters, structure, and safe execution rules.`;
  let step4 = `Solve this manually: Write down the code logic or formula to solve a basic problem without using any AI generator.`;
  let tool = "AI Assistant (GPT/Claude/Copilot)";
  let prompt = `Prompt: 'Explain how to implement and optimize ${name} with clean code and error safety.'`;
  let output = `// AI generated placeholder snippet for ${name}`;
  let error = "AI can generate outdated API arguments or deprecation warnings. Always cross-reference against current docs.";
  let best_practice = "Keep your prompts focused and provide clear input samples with expected output formats.";
  let step6 = "Hands-on coding: Create a new file on your system, insert your manual logic, and run it.";
  let step7 = "Mini challenge: Extend your script to handle input verification checks.";
  let step8 = "Real-world context: A developer uses AI autocomplete suggestions to write repetitive code patterns in 2 seconds.";
  let step9 = "Mini project: Build a functional utility tool that integrates this feature and logs operations.";
  let step10 = "Assignment: Code a complete implementation including test cases. Submit your file/script.";
  let step11 = [
    { q: `What is a primary rule when using AI to write ${name} logic?`, opts: ["Never read the code", "Understand the code manually first and review the outputs carefully", "Assume it is always 100% correct"], ans: 1 },
    { q: "How can you improve AI code output quality?", opts: ["Write vague prompts", "Provide specific schemas, input data, and expected output guidelines in your prompt", "Ask multiple questions at once"], ans: 1 }
  ];
  let step12 = "Save your workspace file to your personal portfolio directory.";

  // Overwrites by Day / Topic
  if (topicId === 'genai_day1') {
    title = "AI-Powered Gen AI Day 1 Studio";
    intro = "Learn AI vs ML vs DL concepts and build system prompts for business tasks.";
    step1 = "AI covers all mimicking models. ML is pattern-based learning. DL is layered network processing. Gen AI is content generation from prompts.";
    step2 = "Corporate offices use system prompts to automate user responses, index support guides, and summarize daily documents.";
    step3 = "Key requirements: Understand structural instruction design, role assignments, boundaries, and formatting instructions.";
    step4 = "Draft a system prompt manually for a Helpdesk Bot. State its target persona and three rules it must follow.";
    tool = "ChatGPT / Gemini / Claude";
    prompt = "Prompt: 'Write a system prompt template for a Customer Support Assistant. It must only answer shipping questions, translate answers to Spanish, and never reveal internal API keys.'";
    output = "SYSTEM_PROMPT = 'You are a helpdesk agent... Translate to Spanish...'";
    error = "AI prompts without clear limits will hallucinate facts or let users bypass safety boundaries (prompt injection).";
    best_practice = "Use explicit negative constraints (e.g., 'Do NOT answer queries outside this topic') in system instructions.";
    step6 = "Create a local prompt catalog file. Add three custom role prompts (Developer, HR Recruiter, Teacher).";
    step7 = "Extend your Recruiter prompt so it automatically outputs rankings in a clean JSON format.";
    step8 = "An operations manager drafts a standard system prompt catalog to verify daily warehouse logs in seconds.";
    step9 = "Build a local markdown file containing five template prompts ready for daily corporate tasks.";
    step10 = "Assignment: Write a custom System Prompt catalog containing two corporate role definitions with strict safety constraints. Submit your prompt text file.";
    step11 = [
      { q: "Why should system prompts have negative constraints?", opts: ["To make them longer", "To restrict the model from hallucinating or answering unauthorized queries", "To decrease execution speed"], ans: 1 },
      { q: "Which instruction defines the output structure of a prompt?", opts: ["Role play setting", "Formatting instruction (e.g. JSON structured output)", "Context tokens definition"], ans: 1 }
    ];
    step12 = "Commit your prompt template catalog to your personal GitHub portfolio repository.";
  }
  else if (topicId === 'genai_day2') {
    title = "AI-Powered Gen AI Day 2 Studio";
    intro = "Trace the attention formulas and model architectures from Google's 2017 paper.";
    step1 = "Symbolic AI used manual If-Else trees. Deep Learning uses backpropagation. The 2017 Transformer paper introduced parallel self-attention.";
    step2 = "Enterprise translation tools and code editors process massive text files in parallel using self-attention mechanisms.";
    step3 = "Key requirements: Understand the concept of tokens, positional encoding, and self-attention weightings.";
    step4 = "Draw a simple attention matrix manually for the sentence 'The animal didn't cross the street because it was tired'. Link 'it' to its target.";
    tool = "GitHub Copilot / Claude 3.5";
    prompt = "Prompt: 'Explain how positional encoding works in the Transformer architecture in simple words. Compare it to recurrent steps.'";
    output = "Positional encoding adds vector values to word embeddings so the model knows the exact order of words...";
    error = "AI models can hallucinate structural transformer explanations. Double check attention mechanism definitions.";
    best_practice = "State the paper name ('Attention Is All You Need') explicitly in your context prompts for high-fidelity responses.";
    step6 = "Write a basic text analyzer script in your playground counting characters and predicting simulated token arrays.";
    step7 = "Extend your script to handle input spaces and estimate standard API cost rates ($ per 1K tokens).";
    step8 = "A devops specialist automates log file summarization by feeding error tracks directly to custom LLM context windows.";
    step9 = "Build a local token calculation sheet estimating cost schedules for processing 10,000 corporate feedback logs.";
    step10 = "Assignment: Create a visual timeline slide detailing the shift from RNNs to Self-Attention models. Submit your explanation document.";
    step11 = [
      { q: "Which paper introduced the Transformer architecture?", opts: ["ImageNet Classification", "Attention Is All You Need (Google 2017)", "Word2Vec Representations"], ans: 1 },
      { q: "What is positional encoding in transformers?", opts: ["It counts how many sentences are processed", "It injects numerical order vectors so the network understands the sequence of words", "It deletes duplicate words"], ans: 1 }
    ];
    step12 = "Save your visual Transformer timeline slides to your GitHub portfolio.";
  }
  else if (topicId.startsWith('git_module')) {
    const dayNum = topicId.replace('git_module', '');
    const gitTopics = {
      '1': { name: 'Git Local Basics', tool: 'Git Console CLI', prompt: 'Explain the difference between working directory, staging index, and commits.' },
      '2': { name: 'GitHub & Remote Collaboration', tool: 'Git Remote Manager', prompt: 'Write prompts to resolve git merge conflicts between branches.' }
    };
    
    const info = gitTopics[dayNum] || { name: `Git Day ${dayNum}`, tool: 'Git Bash', prompt: 'Explain git command operations.' };
    
    title = `AI-Powered ${info.name} Studio`;
    intro = `Master ${info.name} command syntax and configure AI-assisted staging workflows.`;
    step1 = `Git is a distributed version control system that records codebase changes locally.`;
    step2 = `DevOps pipelines and corporate platforms (GitLab, GitHub, Bitbucket) use Git hooks to trigger automated tests on code push.`;
    step3 = `Checklist: Master initialization, staging area checks, commit snapshot logs, and branch rollbacks.`;
    step4 = `Write a command manually that adds index.html to your local staging directory without using AI guides.`;
    tool = info.tool;
    prompt = `Prompt: '${info.prompt} Write a step-by-step console guide.'`;
    output = `$ git status\nOn branch main\nChanges to be committed:\n  new file: index.html`;
    error = "AI engines can sometimes confuse command options (like suggesting deprecated flags or syntax). Always run --help locally to verify.";
    best_practice = "State your local shell environment (e.g. bash, PowerShell, zsh) when prompting for git configuration setups.";
    step6 = "Launch your Git terminal window in your workspace folder.";
    step7 = "Run git status checks and configure global developer name keys.";
    step8 = "A release engineer uses AI scripts to draft descriptive release notes based on commit log strings in 2 seconds.";
    step9 = "Build a local repository outline staging and committing three project revision files.";
    step10 = `Assignment: Create a cheat-sheet guide detailing Git commands used during initialization. Save it as git_sheet.md. Submit your file.`;
    step11 = [
      { q: "Which command lists all remote repository connection details?", opts: ["git remote -v", "git connection list", "git push status"], ans: 0 },
      { q: "What does the -m flag signify in a git commit command?", opts: ["Metadata allocation", "Message descriptive comment", "Merge tracking"], ans: 1 }
    ];
    step12 = "Publish your cheat-sheet guidelines to your GitHub profile workspace.";
  }
  else if (topicId.startsWith('react_module')) {
    const dayNum = topicId.replace('react_module', '');
    const reactTopics = {
      '1': { name: 'React Introduction & JSX', tool: 'Babel / Vite', prompt: 'Create a JSX card showing user profiles.' },
      '2': { name: 'Components & Render Tree', tool: 'React Developer Tools', prompt: 'Generate functional React button components.' },
      '3': { name: 'Props & Dynamic Arguments', tool: 'ES6 Destructuring helper', prompt: 'Write custom component parameters mapping.' },
      '4': { name: 'State (useState)', tool: 'React State Debugger', prompt: 'Create an interactive click counter component.' },
      '5': { name: 'Event Handling', tool: 'Synthetic Events console', prompt: 'Handle form click submissions safely.' },
      '6': { name: 'Conditional Rendering', tool: 'Ternary evaluator', prompt: 'Render loading states dynamically.' },
      '7': { name: 'Lists & Keys', tool: 'Array mapper console', prompt: 'Map product lists to list elements.' },
      '8': { name: 'Controlled Components', tool: 'Form state mapper', prompt: 'Bind text inputs to react state.' },
      '9': { name: 'useEffect Hook & Lifecycle', tool: 'Effect cleaner checks', prompt: 'Fetch API records on component mount.' },
      '10': { name: 'API Integrations & Axios', tool: 'REST client simulator', prompt: 'Execute Axios CRUD posts.' },
      '11': { name: 'React Router Routing', tool: 'Client Router emulator', prompt: 'Configure page route paths.' },
      '12': { name: 'Hooks Optimization', tool: 'useMemo & useCallback', prompt: 'Prevent redundant component rendering recalculations.' },
      '13': { name: 'State Management (Context)', tool: 'Context Provider wrapper', prompt: 'Manage global themes color state.' },
      '14': { name: 'Project Architecture Layout', tool: 'Webpack / Rolldown modules', prompt: 'Structure feature folder hierarchies.' },
      '15': { name: 'Build & Production Deploy', tool: 'Vercel CLI / Netlify', prompt: 'Deploy React static builds.' }
    };
    
    const info = reactTopics[dayNum] || { name: `React Topic Day ${dayNum}`, tool: 'Copilot', prompt: 'Explain React component patterns.' };
    
    title = `AI-Powered ${info.name} Studio`;
    intro = `Master ${info.name} logic and deploy professional AI-assisted workflows.`;
    step1 = `React framework builds modern Single Page Applications (SPAs) using a declarative component tree layout.`;
    step2 = `Industry projects (Facebook, Airbnb, Netflix) deploy React to manage complex client-side state transitions fluidly.`;
    step3 = `Checklist: Master virtual DOM renders, local state hooks, clean layout templates, and modular design.`;
    step4 = `Write a functional React component rendering an 'h1' title tag manually without using AI generators.`;
    tool = info.tool;
    prompt = `Prompt: '${info.prompt} Include custom css modules styling and type checks.'`;
    output = `import React from 'react';\n\nexport default function CustomView() {\n  return <div>Component UI</div>;\n}`;
    error = "AI models can output outdated React syntax (like class lifecycle hooks or wrong hook import syntax). Double-check hooks dependency declarations.";
    best_practice = "Always request modern React functional components with clean React hook declarations.";
    step6 = "Launch your editor. Scaffold a new React component file under your components directory.";
    step7 = "Extend your component style rules and bind it to parent state parameters.";
    step8 = "A software architect prompts AI templates to generate rapid UI layouts and layout code blocks.";
    step9 = "Build an interactive mockup UI screen utilizing this day's React features.";
    step10 = `Assignment: Code a complete React component implementing ${info.name}. Save it to your workspace. Submit the file.`;
    step11 = [
      { q: "What is React's Virtual DOM primarily used for?", opts: ["Styling elements", "Reconciling state updates to minimize slow actual DOM re-renders", "Executing server queries"], ans: 1 },
      { q: "Where should you import standard React Hooks from?", opts: ["The standard 'react' package", "Local html files", "The browser window directly"], ans: 0 }
    ];
    step12 = "Commit your React day components to your developer portfolio directory.";
  }
  else if (topicId === 'module1') {
    title = "AI-Powered HTML Basics Studio";
    intro = "Build semantic document layouts and organize lists, links, and media.";
    step1 = "HTML is the semantic building block of the web. Modern web development relies on proper tagging and clear structural hierarchy.";
    step2 = "SEO crawlers and screen readers read semantic tag arrangements (`<header>`, `<section>`, `<article>`) to rank and access web pages.";
    step3 = "Checklist: Master paragraph elements, lists, layout divs, image tags, anchor links, and clean semantic structural tags.";
    step4 = "Write a HTML code snippet manually representing an ordered list of your three favorite technical skills, wrapped in a `<section>` tag.";
    tool = "GitHub Copilot / Cursor";
    prompt = "Prompt: 'Create a semantic HTML layout for a product detail card. Include an image, title, rating, description, and buy button. Use only semantic elements.'";
    output = "<article class='product-card'>\n  <header>...</header>\n  <main>...</main>\n</article>";
    error = "AI assistants frequently inject deprecated tags or over-use div containers. Verify structure against HTML5 semantic rules.";
    best_practice = "In your prompt, request clean, unstyled, valid HTML5 semantic syntax to ensure structure is independent of styling.";
    step6 = "Open your editor. Build `index.html` structure with header, main content wrapper, and footer details.";
    step7 = "Extend your layout to include an embedded image and a link pointing to an external website.";
    step8 = "A frontend developer drafts rapid wireframes by prompting AI to output semantic structural code blocks in seconds.";
    step9 = "Build a semantic mock news article layout displaying headings, images, paragraphs, and list items.";
    step10 = "Assignment: Create a clean Semantic HTML structure representing a personal developer portfolio. Save it as index.html. Submit your code file.";
    step11 = [
      { q: "Which tag is best for representing a self-contained blog post layout?", opts: ["<div>", "<section>", "<article>"], ans: 2 },
      { q: "What is the purpose of the alt attribute on an img tag?", opts: ["It styles the image size", "It provides a text description for screen readers and search engines", "It links to a stylesheet"], ans: 1 }
    ];
    step12 = "Commit your `index.html` structure to your developer portfolio repository on GitHub.";
  }
  else if (topicId === 'module3') {
    title = "AI-Powered CSS Foundations Studio";
    intro = "Style layouts using inline, internal, and external stylesheets.";
    step1 = "CSS handles colors, spacing, typography, and page alignment. A solid grasp of selectors is key to mastering web styling.";
    step2 = "Modern web apps rely on responsive, fast-loading stylesheets to ensure smooth user interactions across screen sizes.";
    step3 = "Checklist: Master CSS syntax, select by class and ID, manage font families, border sizes, margins, paddings, and background elements.";
    step4 = "Write a CSS selector block manually that sets a blue background, white text, and 12px padding on all elements with class '.btn'.";
    tool = "Copilot / ChatGPT";
    prompt = "Prompt: 'Write CSS variables for a theme palette containing primary, secondary, text, and background colors. Explain selector precedence.'";
    output = ":root {\n  --primary-color: #3b82f6;\n  --background-color: #f8fafc;\n}";
    error = "AI models often write overly specific CSS selectors that break design updates, or hallucinate properties. Check style priorities.";
    best_practice = "Ask the model to use CSS Custom Properties (variables) for consistent and maintainable global color palettes.";
    step6 = "Create a `style.css` stylesheet. Link it to an HTML index file, and style card headers with specific color classes.";
    step7 = "Introduce hover transition effects on button elements to provide visual cursor feedbacks.";
    step8 = "UI engineers build color-theme engines by fetching variable overrides from AI prompt designs.";
    step9 = "Build a styled corporate profile card featuring custom fonts, margins, and curved border layouts.";
    step10 = "Assignment: Write a custom stylesheet linked to your portfolio layout. Implement custom colors, borders, and margins. Submit your style.css sheet.";
    step11 = [
      { q: "Which selector has the highest styling priority?", opts: ["Class selector (.header)", "ID selector (#header)", "Tag selector (header)"], ans: 1 },
      { q: "How do padding and margin differ?", opts: ["Padding is space inside the border; Margin is space outside the border", "Margin is space inside; Padding is space outside", "They are identical properties"], ans: 0 }
    ];
    step12 = "Commit your stylesheet to your GitHub project folder, linking it cleanly inside index.html.";
  }
  else if (topicId === 'sql_module1') {
    title = "AI-Assisted Relational Database Studio";
    intro = "Design normalized tables, declare primary/foreign keys, and model relations.";
    step1 = "Relational databases structure records into tables linked by key constraints. Normalization prevents duplicate entries.";
    step2 = "Databases back every modern login, bank ledger, and shopping cart transaction safely by enforcing relational validation rules.";
    step3 = "Checklist: Understand schemas, primary keys, foreign key references, data types, and simple CREATE TABLE syntax.";
    step4 = "Write a DDL statement manually to create a table 'customers' with fields customer_id (integer primary key) and name (text).";
    tool = "Vanna.ai / ChatGPT";
    prompt = "Prompt: 'Write a DDL schema for a simple orders table linked to a customers table via foreign keys. Ensure customer deletions cascade.'";
    output = "CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  customer_id INT REFERENCES customers(id) ON DELETE CASCADE\n);";
    error = "AI often forgets table deletion order constraints or defaults to invalid data type assignments. Always verify schema keys.";
    best_practice = "State your target relational engine (PostgreSQL, MySQL, SQLite) explicitly in your database prompts.";
    step6 = "Write a SQL setup script declaring a Customer and Orders database relationship schema.";
    step7 = "Extend your script to add check constraints ensuring that values (such as price) are always positive.";
    step8 = "A database administrator automates migration scripting by feeding schema configurations to AI assistants.";
    step9 = "Build a mock relational schema model for a local library catalog management system.";
    step10 = "Assignment: Create a SQL relational schema script containing two linked tables with foreign key constraints. Submit your DDL commands.";
    step11 = [
      { q: "What is a Foreign Key constraint?", opts: ["A random index number", "A key field in a table that references the Primary Key of another table to link records", "A key that links servers"], ans: 1 },
      { q: "Which command creates a new table structure?", opts: ["INSERT INTO", "SELECT", "CREATE TABLE"], ans: 2 }
    ];
    step12 = "Commit your database schema script files to your repository database folder.";
  }
  else if (topicId.startsWith('python_day')) {
    const dayNum = topicId.replace('python_day', '');
    title = `AI-Powered Python Day ${dayNum} Studio`;
    intro = `Master specific Python structures, execution environments, and coding rules.`;
    step1 = `Python is dynamic, highly structured, and supports Object-Oriented code structures. Learn core paradigms for Day ${dayNum}.`;
    step2 = `Corporate applications run backend APIs, automation runners, and predictive analysis blocks using Day ${dayNum} operations.`;
    step3 = `Checklist: Verify scope variables, logical comparison operations, formatting layouts, and clean console logging paths.`;
    step4 = `Write a manual Python script demonstrating clean logic for Day ${dayNum} rules without calling any AI autocomplete helpers.`;
    tool = "GitHub Copilot / ChatGPT";
    prompt = `Prompt: 'Write an optimized Python function implementing Day ${dayNum} rules. Include clear exception handlers.'`;
    output = `def calculate_data():\n    try:\n        # Day ${dayNum} core execution\n        pass\n    except Exception as e:\n        print(e)`;
    error = "AI can emit type mismatch errors or skip boundary parameters (like None references). Always typecheck operations.";
    best_practice = "Define expected parameter types and input types inside your prompts to help compile clean code.";
    step6 = `In your local IDE, create python_day${dayNum}_exercise.py and code the fundamental logic.`;
    step7 = `Wrap functions in boundary trackers to print clean debugging traces.`;
    step8 = `Engineering teams automate unit testing routines by asking AI assistants to mock object metrics.`;
    step9 = `Construct a dynamic CLI tool execution block integrating Day ${dayNum} logic layers.`;
    step10 = `Assignment: Write a custom Python script demonstrating the core programming tasks for Day ${dayNum}. Ensure exceptions are handled safely. Submit your .py code.`;
    step11 = [
      { q: "What is an essential practice when checking AI-generated code outputs?", opts: ["Execute it without reading", "Carefully review, test key boundaries manually, and verify structural syntax", "Delete it and write everything from scratch"], ans: 1 },
      { q: "How can you improve target code parameters returned by LLMs?", opts: ["Omit boundary conditions", "Define data types, specify constraints, and ask for structured comments inside the code block", "Avoid templates"], ans: 1 }
    ];
    step12 = `Save your Day ${dayNum} Python exercises to your personal GitHub repository folder.`;
  }

  return {
    title,
    intro,
    steps: {
      step1,
      step2,
      step3,
      step4,
      step5: {
        tool,
        prompt,
        output,
        error,
        best_practice
      },
      step6,
      step7,
      step8,
      step9,
      step10,
      step11,
      step12
    }
  };
};

export default function AILearningStudio({ activeCourse, activeModuleId, openAITutor }) {
  const [activeStep, setActiveStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Retrieve course content or fallback
  const courseData = COURSE_CONTENTS[activeCourse] || getFallbackContent(activeModuleId, activeCourse);
  const steps = courseData.steps;

  // Handle slide transitions
  const nextStep = () => {
    if (activeStep < 12) {
      setActiveStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completeStep = (stepNum) => {
    if (!completed[stepNum]) {
      setCompleted(prev => ({ ...prev, [stepNum]: true }));
      setXp(prev => prev + 15);
    }
  };

  // Quick tracks
  const tracks = [
    { name: "📘 Learn Fundamentals", range: [1, 2, 3] },
    { name: "💻 AI Collaboration", range: [4, 5, 6] },
    { name: "🎯 Real-World Projects", range: [7, 8, 9] },
    { name: "🏆 Graduation", range: [10, 11, 12] }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '3rem' }}>
      
      {/* HEADER BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white', padding: '2rem 2.5rem', borderRadius: '20px', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(124,58,237,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, color: '#f5f3ff', marginBottom: '0.8rem' }}>
            <Bot size={14} color="#fef08a" /> AlphaFly AI-Powered Technical Bootcamp
          </div>
          <h2 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 800 }}>{courseData.title}</h2>
          <p style={{ color: '#e0e7ff', margin: '0.4rem 0 0 0', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '650px' }}>{courseData.intro}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '1rem 1.5rem', borderRadius: '16px', textAlign: 'center', minWidth: '90px' }}>
          <span style={{ display: 'block', fontSize: '0.8rem', color: '#e0e7ff', fontWeight: 600 }}>Earned rewards</span>
          <strong style={{ fontSize: '1.8rem', color: '#fbbf24', fontWeight: 900 }}>{xp} XP</strong>
        </div>
      </div>

      {/* TRACK PROGRESS BAR */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: '#f1f5f9', padding: '0.6rem 1rem', borderRadius: '14px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {tracks.map((track, i) => {
          const isActive = track.range.includes(activeStep);
          return (
            <button 
              key={i} 
              onClick={() => setActiveStep(track.range[0])}
              style={{ background: isActive ? '#7c3aed' : 'transparent', color: isActive ? 'white' : '#64748b', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.83rem', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
            >
              <span>{track.name}</span>
            </button>
          );
        })}
      </div>

      {/* 12 STEP NUMBERS SLIDER */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map(num => {
          const isCurrent = num === activeStep;
          const isDone = completed[num];
          return (
            <button
              key={num}
              onClick={() => setActiveStep(num)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: isCurrent ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                background: isCurrent ? '#7c3aed' : isDone ? '#dcfce7' : 'white',
                color: isCurrent ? 'white' : isDone ? '#10b981' : '#475569',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: isCurrent ? '0 4px 10px rgba(124,58,237,0.25)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {isDone && !isCurrent ? '✓' : num}
            </button>
          );
        })}
      </div>

      {/* ACTIVE STEP CARD */}
      <div className="learning-card" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.2rem', background: 'white', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        
        {/* Step details header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ textTransform: 'uppercase', color: '#7c3aed', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '1px' }}>Step {activeStep} of 12</span>
            <span style={{ fontSize: '0.85rem', color: completed[activeStep] ? '#10b981' : '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              {completed[activeStep] ? '✓ Step Completed (+15 XP)' : '⏳ Action Required (+15 XP)'}
            </span>
          </div>

          {/* RENDERING STEP 1: INTRODUCTION */}
          {activeStep === 1 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>1️⃣ Concept Introduction</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step1}</p>
            </div>
          )}

          {/* RENDERING STEP 2: WHY LEARN THIS? */}
          {activeStep === 2 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>2️⃣ Real-World Industry Application</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step2}</p>
            </div>
          )}

          {/* RENDERING STEP 3: LEARN THE FUNDAMENTALS */}
          {activeStep === 3 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>3️⃣ Core Fundamentals Checklist</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step3}</p>
            </div>
          )}

          {/* RENDERING STEP 4: MANUAL PRACTICE */}
          {activeStep === 4 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>4️⃣ Manual Coding Practice (No AI allowed!)</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '1rem' }}>Solve this task on paper or locally without AI generators to build muscle memory:</p>
              <div style={{ background: '#f8fafc', borderLeft: '4px solid #f59e0b', padding: '1rem 1.2rem', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.92rem', color: '#1e293b' }}>
                {steps.step4}
              </div>
            </div>
          )}

          {/* RENDERING STEP 5: AI ASSISTANT & PROMPT ENGINEERING */}
          {activeStep === 5 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>5️⃣ AI Co-pilot Integration & Prompt Design</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1rem' }}>Learn how professionals collaborate with AI helpers like <strong>{steps.step5.tool}</strong> to write test-cases, optimize complexity, and document scripts.</p>
              
              {/* Copiable prompt */}
              <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 10, padding: '1rem', marginBottom: '1rem', position: 'relative' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#7c3aed', display: 'block', fontWeight: 700, marginBottom: '0.3rem' }}>Copy Prompt to ChatGPT/Claude</span>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e1b4b', paddingRight: '40px', fontStyle: 'italic' }}>{steps.step5.prompt}</p>
                <button onClick={() => copyText(steps.step5.prompt)} style={{ position: 'absolute', right: '10px', top: '10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.3rem', cursor: 'pointer' }}>
                  {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} color="#7c3aed" />}
                </button>
              </div>

              {/* Warnings and best practices */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '0.8rem 1rem', borderRadius: 8 }}>
                  <strong style={{ fontSize: '0.85rem', color: '#991b1b', display: 'block', marginBottom: '0.2rem' }}>⚠️ Common AI Mistake / Hallucination</strong>
                  <span style={{ fontSize: '0.8rem', color: '#7f1d1d', lineHeight: 1.5 }}>{steps.step5.error}</span>
                </div>
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '0.8rem 1rem', borderRadius: 8 }}>
                  <strong style={{ fontSize: '0.85rem', color: '#166534', display: 'block', marginBottom: '0.2rem' }}>✨ Prompt Best Practice</strong>
                  <span style={{ fontSize: '0.8rem', color: '#064e3b', lineHeight: 1.5 }}>{steps.step5.best_practice}</span>
                </div>
              </div>
            </div>
          )}

          {/* RENDERING STEP 6: HANDS-ON CODING */}
          {activeStep === 6 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>6️⃣ Guided Practice Exercises</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step6}</p>
            </div>
          )}

          {/* RENDERING STEP 7: MINI CHALLENGE */}
          {activeStep === 7 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>7️⃣ Speed Mini Challenge</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step7}</p>
            </div>
          )}

          {/* RENDERING STEP 8: REAL-WORLD SCENARIO */}
          {activeStep === 8 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>8️⃣ Corporate Workflow Scenario</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step8}</p>
            </div>
          )}

          {/* RENDERING STEP 9: MINI PROJECT */}
          {activeStep === 9 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>9️⃣ Mini Portfolio Project</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step9}</p>
            </div>
          )}

          {/* RENDERING STEP 10: ASSIGNMENT */}
          {activeStep === 10 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>🔟 Assignment Task</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step10}</p>
            </div>
          )}

          {/* RENDERING STEP 11: AI QUIZ */}
          {activeStep === 11 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>11️⃣ Interactive AI & Code Assessment</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
                {steps.step11.map((item, qi) => (
                  <div key={qi} style={{ background: '#f8fafc', padding: '1rem', borderRadius: 10, border: '1px solid #cbd5e1' }}>
                    <p style={{ fontWeight: 600, color: '#1e293b', margin: '0 0 0.5rem 0' }}>{qi + 1}. {item.q}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.4rem' }}>
                      {item.opts.map((opt, oi) => {
                        const isSelected = quizAnswers[qi] === oi;
                        const isCorrect = oi === item.ans;
                        let bg = "white";
                        let border = "1px solid #cbd5e1";
                        if (quizSubmitted) {
                          if (isCorrect) { bg = "#dcfce7"; border = "1.5px solid #10b981"; }
                          else if (isSelected) { bg = "#fee2e2"; border = "1.5px solid #ef4444"; }
                        } else if (isSelected) {
                          bg = "#e0f2fe"; border = "1.5px solid #0ea5e9";
                        }
                        return (
                          <button
                            key={oi}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                            style={{ background: bg, border: border, padding: '0.5rem 0.8rem', borderRadius: 8, cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.85rem' }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {!quizSubmitted ? (
                  <button className="btn btn-primary" onClick={() => setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length < steps.step11.length} style={{ width: '130px', marginTop: '0.5rem' }}>Submit Answers</button>
                ) : (
                  <button className="btn btn-outline" onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }} style={{ width: '130px', marginTop: '0.5rem' }}>Retry Quiz</button>
                )}
              </div>
            </div>
          )}

          {/* RENDERING STEP 12: PORTFOLIO TASK */}
          {activeStep === 12 && (
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>12️⃣ Portfolio Compilation Task</h3>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8 }}>{steps.step12}</p>
            </div>
          )}

        </div>

        {/* Action button controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={prevStep} 
            disabled={activeStep === 1}
            style={{ padding: '0.5rem 1.2rem' }}
          >
            Back
          </button>
          
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {!completed[activeStep] && (
              <button 
                className="btn btn-outline" 
                onClick={() => completeStep(activeStep)}
                style={{ borderColor: '#10b981', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <Trophy size={14} /> Mark Step Completed (+15 XP)
              </button>
            )}
            
            <button 
              className="btn btn-primary" 
              onClick={activeStep === 12 ? () => alert("Portfolio saved successfully! Course module completed with high honors!") : nextStep}
              style={{ background: '#7c3aed', borderColor: '#7c3aed', padding: '0.5rem 1.4rem', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {activeStep === 12 ? "Graduated! 🎓" : "Continue"} <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* QUICK FLOATING QUESTION */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          className="btn btn-outline"
          onClick={() => openAITutor(`How can I write better prompts or debug code for active module: ${activeModuleId}?`)}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Bot size={16} color="#7c3aed" /> Ask AI Tutor: Prompt Guidelines
        </button>
      </div>

    </div>
  );
}
