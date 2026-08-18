import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function FloatingAITutor({ isOpen, onOpen, onClose, initialQuestion, activeCourse }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your AI Tutor. Need help with HTML or CSS?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handledQuestionRef = useRef('');

  useEffect(() => {
    let greeting = "Hi! I'm your AI Tutor. Need help with HTML or CSS?";
    if (activeCourse === 'python_course' || activeCourse === 'python_fullstack') {
      greeting = "Hi! I'm your AI Python Tutor. I can explain syntax, debug code, or teach you OOP/APIs. What are we building today?";
    } else if (activeCourse === 'sql' || activeCourse === 'summer_sql') {
      greeting = "Hi! I'm your AI SQL Database Tutor. Need help writing queries, joins, or database design?";
    } else if (activeCourse === 'powerbi') {
      greeting = "Hi! I'm your AI Power BI & Analytics Tutor. Need help with DAX formulas, data modeling, or styling reports?";
    }
    setMessages([{ role: 'ai', text: greeting }]);
  }, [activeCourse]);

  const generateAIResponse = (question) => {
    const lowerQ = question.toLowerCase();

    // Python-specific response handling
    if (activeCourse === 'python_course' || activeCourse === 'python_fullstack' || lowerQ.includes('python') || lowerQ.includes('class ') || lowerQ.includes('def ')) {
      if (lowerQ.includes('variable') || lowerQ.includes('data type') || lowerQ.includes('types')) {
        return "Python is dynamically typed. It has 11 built-in data types grouped into categories like Numeric (int, float, complex), Sequence (list, tuple, range), Mapping (dict), Set (set, frozenset), Boolean (bool), and Binary (bytes, bytearray, memoryview). Use type(x) to inspect any variable's type at runtime!";
      }
      if (lowerQ.includes('list') || lowerQ.includes('tuple') || lowerQ.includes('dictionary') || lowerQ.includes('dict') || lowerQ.includes('set')) {
        return "Python collections: 1) Lists: Ordered, mutable, allowing duplicate items (e.g. `[1, 2, 2]`). 2) Tuples: Ordered, immutable, faster than lists (e.g. `(10, 20)`). 3) Sets: Unordered, mutable, no duplicate items (e.g. `{'red', 'blue'}`). 4) Dictionaries: Unordered key:value pairs (e.g. `{'name': 'Alice', 'age': 25}`).";
      }
      if (lowerQ.includes('oop') || lowerQ.includes('class') || lowerQ.includes('object') || lowerQ.includes('__init__') || lowerQ.includes('self')) {
        return "Object-Oriented Programming (OOP) in Python uses 'class' to define blueprints and 'object' to instantiate them. The `__init__` method is the constructor that runs automatically when a new object is created. `self` represents the instance of the class and is used to access variables belonging to that class.";
      }
      if (lowerQ.includes('inheritance')) {
        return "Inheritance allows a child class to inherit attributes and methods from a parent class. Python supports: 1) Single (one parent), 2) Multiple (more than one parent class, e.g. `class Child(ParentA, ParentB)`), 3) Multilevel (grandparent -> parent -> child), 4) Hierarchical (one parent -> multiple child classes), and 5) Hybrid.";
      }
      if (lowerQ.includes('encapsulation')) {
        return "Encapsulation restricts direct access to some of an object's components. In Python, prefixing attributes/methods with a single underscore (e.g. `_x`) indicates they are protected, while double underscores (e.g. `__x`) triggers name mangling to make them private. You can use getter and setter methods to access and modify them safely.";
      }
      if (lowerQ.includes('abstraction') || lowerQ.includes('polymorphism')) {
        return "Abstraction hides complex implementation details and only shows essential features, using abstract base classes (ABC module) and `@abstractmethod`. Polymorphism allows different classes to have methods with the same name but different behaviors (e.g. a `draw()` method behaving differently for a Circle vs a Square).";
      }
      if (lowerQ.includes('function') || lowerQ.includes('def ') || lowerQ.includes('lambda') || lowerQ.includes('args') || lowerQ.includes('kwargs')) {
        return "Functions are defined using `def function_name(params):`. Python also supports: 1) Lambda functions: Anonymous, single-line functions (e.g. `lambda x: x * 2`). 2) `*args`: Passes a variable number of non-keyword arguments (as a tuple). 3) `**kwargs`: Passes a variable number of keyword arguments (as a dictionary).";
      }
      if (lowerQ.includes('loop') || lowerQ.includes('for') || lowerQ.includes('while') || lowerQ.includes('break') || lowerQ.includes('continue')) {
        return "Loops repeat code execution: 1) `for` loop: Iterates over sequences (lists, ranges). 2) `while` loop: Executes as long as a condition is True. 3) `break` terminates the loop completely. 4) `continue` skips the current iteration and jumps to the next one.";
      }
      if (lowerQ.includes('api') || lowerQ.includes('requests') || lowerQ.includes('json') || lowerQ.includes('module')) {
        return "Python modules are reusable files (`.py`) containing functions/classes. You can use the pre-installed Standard Library or external libraries like `requests` (installed via pip) to connect to REST APIs. Make HTTP calls (GET, POST) and parse the response with `.json()` to convert it into a Python dictionary.";
      }
      if (lowerQ.includes('file') || lowerQ.includes('exception') || lowerQ.includes('try') || lowerQ.includes('except')) {
        return "Use `with open('file.txt', 'r') as f:` for safe file reading and writing. Handle runtime errors using `try...except...finally` blocks. This prevents your program from crashing by catching exceptions like `ValueError`, `FileNotFoundError`, or custom exceptions.";
      }
      return "That's a great Python question! Whether you are a beginner learning variables and loops, or an intermediate developer mastering Object-Oriented programming (OOP), API requests, or exception safety, I'm here to help. Ask me about specific code structures or paste your traceback error!";
    }

    // SQL-specific response handling
    if (activeCourse === 'sql' || activeCourse === 'summer_sql' || lowerQ.includes('sql') || lowerQ.includes('query') || lowerQ.includes('select') || lowerQ.includes('join')) {
      if (lowerQ.includes('join')) {
        return "SQL Joins are used to combine rows from two or more tables based on a related column: 1) INNER JOIN: Returns matching rows in both tables. 2) LEFT JOIN: Returns all rows from left table and matching rows from right. 3) RIGHT JOIN: Returns all rows from right and matching from left. 4) FULL JOIN: Returns all rows when there is a match in either.";
      }
      if (lowerQ.includes('group by') || lowerQ.includes('aggregate') || lowerQ.includes('having')) {
        return "Aggregate functions (SUM, AVG, COUNT, MIN, MAX) perform math on columns. Use `GROUP BY` to group results by one or more columns, and use `HAVING` (instead of WHERE) to filter grouped rows based on aggregate conditions.";
      }
      if (lowerQ.includes('subquery') || lowerQ.includes('view') || lowerQ.includes('index')) {
        return "Advanced SQL: 1) Subquery: A query nested inside another statement. 2) View: A virtual table based on the result-set of a SELECT query. 3) Index: A database structure used to speed up queries, though it slows down write operations.";
      }
      return "I can help you build SQL queries! Ask me about SELECT statements, WHERE clauses, GROUP BY aggregations, multi-table JOINs, subqueries, views, or database constraints.";
    }

    // Power BI-specific response handling
    if (activeCourse === 'powerbi' || lowerQ.includes('powerbi') || lowerQ.includes('dax') || lowerQ.includes('modeling')) {
      if (lowerQ.includes('dax') || lowerQ.includes('calculate') || lowerQ.includes('measure')) {
        return "DAX (Data Analysis Expressions) is the formula language in Power BI. 1) Calculated columns: Evaluated row-by-row during data refresh. 2) Measures: Dynamically evaluated on-the-fly based on filters. The `CALCULATE` function is the most powerful tool in DAX, letting you modify the filter context of calculations.";
      }
      if (lowerQ.includes('power query') || lowerQ.includes('editor') || lowerQ.includes('transform')) {
        return "Power Query Editor is the ETL (Extract, Transform, Load) engine in Power BI. You can clean data, rename columns, pivot/unpivot, merge queries (like SQL JOINs), and append queries (like SQL UNIONs) before loading data into your model.";
      }
      if (lowerQ.includes('modeling') || lowerQ.includes('relationship') || lowerQ.includes('schema')) {
        return "Data Modeling involves creating relationships between tables. A Star Schema (a central Fact table connected to surrounding Dimension tables) is the recommended best practice. Snowflake Schema is a variation where dimension tables are normalized.";
      }
      return "I'm your Power BI expert assistant. Ask me about DAX expressions (CALCULATE, SUMX, RELATED), Power Query cleaning steps, relationships, star schemas, or report design and interactive visual selections.";
    }

    // NLP keyword fallback grouping
    if (lowerQ.includes('how') || lowerQ.includes('what') || lowerQ.includes('why') || lowerQ.includes('explain') || lowerQ.includes('help')) {
      const topics = [
        { keys: ['oop', 'object', 'class', 'method', 'self', '__init__', 'constructor', 'destructor', 'inheritance', 'encapsulation', 'abstraction', 'polymorphism'], response: "In Python, Object-Oriented Programming (OOP) is built around classes (blueprints) and objects (instances). Constructors (`__init__`) set up initial state, `self` represents the instance itself, and destructors (`__del__`) cleanup resources. Advanced concepts include Inheritance (sharing state/behavior), Encapsulation (hiding data using access specifiers like name mangling `__`), Abstraction (hiding details using ABCs), and Polymorphism (defining multiple forms of methods)." },
        { keys: ['variable', 'type', 'list', 'tuple', 'dict', 'set', 'str', 'int', 'float', 'casting'], response: "Python features dynamic typing. Basic variables store numbers, strings, and booleans. Sequences include lists `[1, 2]` (mutable), tuples `(1, 2)` (immutable), sets `{1, 2}` (unique values), and dictionaries `{'k': 'v'}` (mappings). Type casting (like `int()` or `str()`) converts one type to another explicitly." },
        { keys: ['loop', 'for', 'while', 'range', 'break', 'continue', 'condition', 'if', 'elif', 'else'], response: "Control structures route code flow: `if/elif/else` runs blocks conditionally. Loops repeat actions: `for` iterates over sequences, `while` runs as long as conditions hold. Control loops with `break` (exit) and `continue` (skip iteration)." },
        { keys: ['api', 'requests', 'json', 'http', 'get', 'post', 'module', 'library'], response: "Python connects to APIs via the external `requests` library. Call `requests.get(url)` to load data, and call `response.json()` to parse JSON directly into Python dictionaries. Custom `.py` files can be imported as modules." },
        { keys: ['file', 'open', 'read', 'write', 'exception', 'try', 'except', 'finally', 'error'], response: "Always use `with open('file.txt', 'r') as f:` to auto-close files. Handle run-time errors safely using `try...except...finally` blocks to catch exceptions (like ValueError) and prevent crash tracebacks." }
      ];
      
      for (const topic of topics) {
        if (topic.keys.some(k => lowerQ.includes(k))) {
          return topic.response + "\n\nWould you like me to write a code snippet showing this in action?";
        }
      }
    }

    // Check for specific tag queries like "what is <code>" or "what does the p tag do"
    const tagMatch = lowerQ.match(/<([a-z0-9]+)>/) || lowerQ.match(/\b([a-z0-9]+)\s+tag\b/);
    if (tagMatch) {
      const tag = tagMatch[1];
      const definitions = {
        'doctype': 'Tells the browser which version of HTML the page is written in.',
        'html': 'The root element of an HTML page. All other elements must be descendants of this tag.',
        'head': 'Contains meta-information about the HTML document, such as its title, linked CSS, and scripts.',
        'title': "Specifies a title for the HTML page, which is shown in the browser's title bar or page tab.",
        'body': "Defines the document's body, and is a container for all the visible contents.",
        'h1': 'Defines the most important heading on the page.',
        'h2': 'Defines a second-level heading.',
        'p': 'Defines a paragraph of text.',
        'strong': 'Defines important text. Browsers typically render it in bold.',
        'em': 'Defines emphasized text. Browsers typically render it in italics.',
        'u': 'Defines text that should be underlined.',
        'mark': 'Defines text that should be highlighted or marked for reference.',
        'blockquote': 'Defines a section that is quoted from another source.',
        'ul': 'Defines an unordered (bulleted) list.',
        'ol': 'Defines an ordered (numbered) list.',
        'li': 'Defines a list item inside a <ul> or <ol>.',
        'hr': 'Defines a thematic break (horizontal rule) in an HTML page.',
        'img': 'Used to embed an image in an HTML page. It requires a "src" attribute.',
        'a': 'Defines a hyperlink, which is used to link from one page to another.',
        'code': 'The <code> tag is used to display a snippet of computer code. Browsers usually render it in a monospace font.',
        'div': 'The <div> tag is a generic container used to group other HTML elements together, usually for styling purposes.',
        'span': 'The <span> tag is an inline container used to mark up a part of a text or a document.'
      };
      
      if (definitions[tag]) {
        return `The <${tag}> tag: ${definitions[tag]}`;
      } else {
        return `The <${tag}> tag is an HTML element, but I don't have a specific definition for it yet. Try using it in the Live Lab!`;
      }
    }
    
    if (lowerQ.includes("formatting tag") || lowerQ.includes("format text")) {
      return "HTML has several tags for formatting text! Some common ones are: <strong> for bold, <em> for italics, <u> for underline, <mark> for highlighting, and <blockquote> for quotes. You also have <h1> through <h6> for headings, and <p> for paragraphs.";
    }
    if (lowerQ.includes("structure") || lowerQ.includes("skeleton") || lowerQ.includes("boilerplate")) {
      return "Every HTML document needs a basic structure. It starts with <!DOCTYPE html>, followed by an <html> tag. Inside that, you have a <head> (for metadata and title) and a <body> (where all your visible content goes).";
    }
    if (lowerQ.includes("what is html") || lowerQ.includes("explain html")) {
      return "HTML stands for HyperText Markup Language. It's the standard language for creating web pages. Think of it as the skeleton of a website, providing the structure, while CSS provides the styling (the skin/clothes).";
    }
    if (lowerQ.includes("live lab") || lowerQ.includes("not working") || lowerQ.includes("debug") || lowerQ.includes("fix my code")) {
      return "If your code isn't working in the Live Lab, check for a few things: 1) Make sure all your tags are properly closed (like </p>). 2) Check for typos in tag names. 3) If you're writing CSS, ensure you have the correct selectors and semicolons at the end of each rule!";
    }
    if (lowerQ.includes("css") || lowerQ.includes("style")) {
      return "CSS (Cascading Style Sheets) is used to style your HTML. You can change colors, fonts, layouts, and more! In our Live Lab, you can write CSS in the CSS tab and it will automatically apply to the HTML.";
    }
    if (lowerQ.includes("hello") || lowerQ.includes("hi") || lowerQ.includes("hey")) {
      return "Hello there! I'm your AI Tutor. Feel free to ask me anything about the lessons you're working on today.";
    }

    return "That's a great question! I'm your interactive AI Tutor. Try asking me specific questions about code examples, tags, properties, or functions in our course today!";
  };

  useEffect(() => {
    if (isOpen && initialQuestion && initialQuestion !== handledQuestionRef.current) {
      handledQuestionRef.current = initialQuestion;
      setMessages(prev => [...prev, { role: 'user', text: initialQuestion }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: generateAIResponse(initialQuestion)
        }]);
      }, 1000);
    }
  }, [isOpen, initialQuestion]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: generateAIResponse(input)
      }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={onOpen}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--accent-secondary)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg), 0 10px 25px rgba(37,99,235,0.4)',
              zIndex: 9999,
              transition: 'transform 0.2s'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot size={32} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '350px',
            height: '500px',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg), 0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid var(--surface-border)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'var(--accent-secondary)',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopLeftRadius: 'var(--radius-lg)',
            borderTopRightRadius: 'var(--radius-lg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <Bot size={20} />
              AI Tutor
            </div>
            <button 
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat History */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: '#F9FAFB'
          }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-end',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '0.5rem'
                }}
              >
                {msg.role === 'ai' && (
                  <div style={{ background: 'var(--accent-primary)', color: 'white', padding: '0.4rem', borderRadius: '50%', display: 'flex' }}>
                    <Bot size={16} />
                  </div>
                )}
                <div style={{
                  maxWidth: '80%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: msg.role === 'user' ? 'var(--accent-secondary)' : 'white',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)',
                  fontSize: '0.95rem',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : 'var(--radius-md)',
                  borderBottomLeftRadius: msg.role === 'ai' ? '4px' : 'var(--radius-md)',
                  border: msg.role === 'ai' ? '1px solid var(--surface-border)' : 'none'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form 
            onSubmit={handleSend}
            style={{
              padding: '1rem',
              background: 'white',
              borderTop: '1px solid var(--surface-border)',
              display: 'flex',
              gap: '0.5rem'
            }}
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--surface-border)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button 
              type="submit"
              style={{
                background: 'var(--accent-secondary)',
                color: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 3px 0 var(--accent-secondary-dark)',
                transform: 'translateY(-2px)'
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)'; e.currentTarget.style.boxShadow = '0 0 0'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 3px 0 var(--accent-secondary-dark)'; }}
            >
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
