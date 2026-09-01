import React, { useState, useEffect } from 'react';
import {
  BookOpen, MonitorPlay, Code, LayoutGrid, Layers, PenTool, Briefcase, Sparkles,
  CheckCircle, Sliders, Terminal, Smartphone, Tablet, Monitor, RefreshCw, Star,
  HelpCircle, Eye, EyeOff, ShieldCheck, Award, MessageSquare, AlertCircle, Play, Check,
  Mail, Phone, MapPin, Send, MessageCircle, FileText, CheckSquare, ChevronRight, Trophy
} from 'lucide-react';

export default function WebDesignDay9({ activeTab: propActiveTab = 'intro', onNavigate, openAITutor }) {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'intro');

  useEffect(() => {
    if (propActiveTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate('web_design_day9', tabId);
    }
  };

  const isTabActive = (tabName) => {
    return !activeTab || activeTab === 'intro' ? (tabName === 'intro' || activeTab === tabName) : activeTab === tabName;
  };

  // --- Interactive Syntax-Highlighted Code Editor component with scroll syncing ---
  const LiveSyntaxCodeEditor = ({ value, onChange, language = 'html', rows = 10, label = '' }) => {
    const preRef = React.useRef(null);

    const handleScroll = (e) => {
      if (preRef.current) {
        preRef.current.scrollTop = e.target.scrollTop;
        preRef.current.scrollLeft = e.target.scrollLeft;
      }
    };

    const escapeHTML = (str) =>
      str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

    const highlightCode = (codeStr, lang) => {
      if (!codeStr) return '';
      const escaped = escapeHTML(codeStr);

      if (lang === 'html') {
        const tokenRegex = /(&lt;<!--[\s\S]*?--&gt;)|(&lt;!DOCTYPE html&gt;)|(&lt;\/?[a-zA-Z0-9\-]+)|([a-zA-Z\-]+)(?=\s*=)|("[\s\S]*?"|'[\s\S]*?')/gi;
        return escaped.replace(tokenRegex, (match, comment, doctype, tag, attr, stringVal) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (doctype) return `<span style="color:#c084fc;font-weight:bold;">${doctype}</span>`;
          if (tag) {
            const m = tag.match(/^(&lt;\/?)([a-zA-Z0-9\-]+)$/);
            return m ? `${m[1]}<span style="color:#f43f5e;font-weight:bold;">${m[2]}</span>` : tag;
          }
          if (attr) return `<span style="color:#fbbf24;font-weight:600;">${attr}</span>`;
          if (stringVal) return `<span style="color:#34d399;">${stringVal}</span>`;
          return match;
        });
      }

      if (lang === 'css') {
        const cssTokenRegex = /(\/\*[\s\S]*?\*\/)|([.#][a-zA-Z0-9_\-]+|[a-zA-Z0-9_\-]+(?=\s*\{))|([a-zA-Z\-]+)(?=\s*:)|(:\s*[^;\}]+;)/gi;
        return escaped.replace(cssTokenRegex, (match, comment, selector, prop, val) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (selector) return `<span style="color:#38bdf8;font-weight:bold;">${selector}</span>`;
          if (prop) return `<span style="color:#fb923c;font-weight:600;">${prop}</span>`;
          if (val) return `:<span style="color:#34d399;">${val.slice(1)}</span>`;
          return match;
        });
      }

      if (lang === 'js') {
        const jsTokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)|(\b(?:const|let|var|function|return|if|else|for|while|switch|case|break)\b)|(\b(?:document|window|console|Math|Array|Object|String|Number|Boolean)\b)|(\b[a-zA-Z0-9_$]+\b(?=\s*\()|=>)|(\b[0-9]+\b)/gi;
        return escaped.replace(jsTokenRegex, (match, comment, stringVal, kw, builtin, func, num) => {
          if (comment) return `<span style="color:#7f848e;font-style:italic;">${comment}</span>`;
          if (stringVal) return `<span style="color:#98c379;">${stringVal}</span>`;
          if (kw) return `<span style="color:#c678dd;font-weight:bold;">${kw}</span>`;
          if (builtin) return `<span style="color:#e06c75;font-weight:600;">${builtin}</span>`;
          if (func) return `<span style="color:#61afef;font-weight:bold;">${func}</span>`;
          if (num) return `<span style="color:#d19a66;">${num}</span>`;
          return match;
        });
      }

      return escaped;
    };

    const highlightedHTML = highlightCode(value, language);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {label && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: language === 'html' ? '#ea580c' : language === 'css' ? '#2563eb' : '#d97706', letterSpacing: '0.5px' }}>
              {label}
            </label>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Interactive Editor</span>
          </div>
        )}

        <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#090d16', border: '1px solid #1e293b' }}>
          <pre
            ref={preRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              margin: 0,
              padding: '1rem',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.82rem',
              lineHeight: '1.6',
              color: '#f8fafc',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              pointerEvents: 'none',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
            dangerouslySetInnerHTML={{ __html: highlightedHTML + '\n' }}
          />

          <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            onScroll={handleScroll}
            spellCheck={false}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: `${rows * 1.6}rem`,
              margin: 0,
              padding: '1rem',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.82rem',
              lineHeight: '1.6',
              color: 'transparent',
              caretColor: '#38bdf8',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflow: 'auto',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    );
  };

  const renderSyntaxHighlightedHTML = (codeStr, lang = 'html') => {
    if (!codeStr) return null;
    const escapeHTML = (str) =>
      str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

    const escaped = escapeHTML(codeStr);

    if (lang === 'html') {
      const tokenRegex = /(&lt;<!--[\s\S]*?--&gt;)|(&lt;!DOCTYPE html&gt;)|(&lt;\/?[a-zA-Z0-9\-]+)|([a-zA-Z\-]+)(?=\s*=)|("[\s\S]*?"|'[\s\S]*?')/gi;
      const highlighted = escaped.replace(tokenRegex, (match, comment, doctype, tag, attr, stringVal) => {
        if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
        if (doctype) return `<span style="color:#c084fc;font-weight:bold;">${doctype}</span>`;
        if (tag) {
          const m = tag.match(/^(&lt;\/?)([a-zA-Z0-9\-]+)$/);
          return m ? `${m[1]}<span style="color:#f43f5e;font-weight:bold;">${m[2]}</span>` : tag;
        }
        if (attr) return `<span style="color:#fbbf24;font-weight:600;">${attr}</span>`;
        if (stringVal) return `<span style="color:#34d399;">${stringVal}</span>`;
        return match;
      });
      return (
        <pre
          style={{
            margin: 0,
            fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
            fontSize: '0.83rem',
            lineHeight: '1.6',
            color: '#f8fafc',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    }

    if (lang === 'css') {
      const cssTokenRegex = /(\/\*[\s\S]*?\*\/)|([.#][a-zA-Z0-9_\-]+|[a-zA-Z0-9_\-]+(?=\s*\{))|([a-zA-Z\-]+)(?=\s*:)|(:\s*[^;\}]+;)/gi;
      const highlighted = escaped.replace(cssTokenRegex, (match, comment, selector, prop, val) => {
        if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
        if (selector) return `<span style="color:#38bdf8;font-weight:bold;">${selector}</span>`;
        if (prop) return `<span style="color:#fb923c;font-weight:600;">${prop}</span>`;
        if (val) return `:<span style="color:#34d399;">${val.slice(1)}</span>`;
        return match;
      });
      return (
        <pre
          style={{
            margin: 0,
            fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
            fontSize: '0.83rem',
            lineHeight: '1.6',
            color: '#f8fafc',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    }

    if (lang === 'js') {
      const jsTokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)|(\b(?:const|let|var|function|return|if|else|for|while|switch|case|break)\b)|(\b(?:document|window|console|Math|Array|Object|String|Number|Boolean)\b)|(\b[a-zA-Z0-9_$]+\b(?=\s*\()|=>)|(\b[0-9]+\b)/gi;
      const highlighted = escaped.replace(jsTokenRegex, (match, comment, stringVal, kw, builtin, func, num) => {
        if (comment) return `<span style="color:#7f848e;font-style:italic;">${comment}</span>`;
        if (stringVal) return `<span style="color:#98c379;">${stringVal}</span>`;
        if (kw) return `<span style="color:#c678dd;font-weight:bold;">${kw}</span>`;
        if (builtin) return `<span style="color:#e06c75;font-weight:600;">${builtin}</span>`;
        if (func) return `<span style="color:#61afef;font-weight:bold;">${func}</span>`;
        if (num) return `<span style="color:#d19a66;">${num}</span>`;
        return match;
      });
      return (
        <pre
          style={{
            margin: 0,
            fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
            fontSize: '0.83rem',
            lineHeight: '1.6',
            color: '#abb2bf',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    }

    return <pre style={{ margin: 0, color: '#f8fafc' }}>{codeStr}</pre>;
  };

  // --- Section States ---
  const [targetDevice, setTargetDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [htmlBuildStep, setHtmlBuildStep] = useState(1); // 1 to 4
  const [guidedBuildStage, setGuidedBuildStage] = useState(1); // 1 to 18
  const [explorerSelectedElement, setExplorerSelectedElement] = useState('info'); // 'info' | 'label' | 'input' | 'select' | 'textarea' | 'checkbox' | 'submit'
  const [selectedInputType, setSelectedInputType] = useState('text'); // 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox'

  // Interactive Form Demo State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
    message: '',
    agree: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Code Playground State
  const [playgroundHTML, setPlaygroundHTML] = useState(`<section id="contact" class="contact-section">
  <div class="container">
    <div class="section-header">
      <span class="section-badge">GET IN TOUCH</span>
      <h2>Start Your Project Today</h2>
      <p>Have a question or want to discuss your requirement? Send us a message.</p>
    </div>

    <div class="contact-grid">
      <!-- Contact Info Cards -->
      <div class="contact-info">
        <div class="info-card">
          <div class="icon">📍</div>
          <div>
            <h4>Location</h4>
            <p>Theni, Tamil Nadu</p>
          </div>
        </div>
        <div class="info-card">
          <div class="icon">📞</div>
          <div>
            <h4>Phone</h4>
            <p>+91 98765 43210</p>
          </div>
        </div>
        <div class="info-card">
          <div class="icon">✉</div>
          <div>
            <h4>Email</h4>
            <p>hello@example.com</p>
          </div>
        </div>
      </div>

      <!-- Lead Enquiry Form -->
      <form class="contact-form" id="leadForm">
        <div class="form-group">
          <label for="userName">Name</label>
          <input type="text" id="userName" name="name" placeholder="Enter your full name" required>
        </div>

        <div class="form-group">
          <label for="userEmail">Email</label>
          <input type="email" id="userEmail" name="email" placeholder="name@example.com" required>
        </div>

        <div class="form-group">
          <label for="userPhone">Phone</label>
          <input type="tel" id="userPhone" name="phone" placeholder="+91 98765 43210" required>
        </div>

        <div class="form-group">
          <label for="userRequirement">Requirement</label>
          <select id="userRequirement" name="requirement" required>
            <option value="">Select an option ▼</option>
            <option value="web-dev">Website Development</option>
            <option value="ui-design">UI Design</option>
            <option value="redesign">Website Redesign</option>
            <option value="maintenance">Maintenance</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="userMessage">Message</label>
          <textarea id="userMessage" name="message" rows="4" placeholder="Tell us about your project requirements..." required></textarea>
        </div>

        <div class="form-checkbox">
          <input type="checkbox" id="userAgree" required>
          <label for="userAgree">I agree to be contacted regarding this enquiry.</label>
        </div>

        <button type="submit" class="btn-submit">SEND ENQUIRY</button>
      </form>
    </div>
  </div>
</section>`);

  const [playgroundCSS, setPlaygroundCSS] = useState(`.contact-section {
  padding: 4rem 2rem;
  background: #f8fafc;
  font-family: system-ui, sans-serif;
}
.section-badge {
  color: #ea580c;
  font-weight: 800;
  font-size: 0.8rem;
  text-transform: uppercase;
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  margin-top: 2rem;
}
.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
}
.info-card .icon {
  font-size: 1.5rem;
}
.info-card h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #0f172a;
}
.info-card p {
  margin: 2px 0 0 0;
  color: #64748b;
  font-size: 0.88rem;
}
.contact-form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 14px rgba(0,0,0,0.03);
}
.form-group {
  margin-bottom: 1.25rem;
}
.form-group label {
  display: block;
  font-weight: 700;
  font-size: 0.88rem;
  color: #1e293b;
  margin-bottom: 6px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  box-sizing: border-box;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
}
.form-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: #475569;
}
.btn-submit {
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
}
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}`);

  const [playgroundJS, setPlaygroundJS] = useState(`// Client-side Form Handling
const form = document.getElementById('leadForm');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page reload
  alert('Thank you! Your enquiry has been recorded (Demo Frontend Action).');
});`);

  // Predict the Output Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});

  // Debugging Challenge State
  const [debugSolved, setDebugSolved] = useState(false);

  // 15-Question Final Knowledge Check State
  const [knowledgeCheckAnswers, setKnowledgeCheckAnswers] = useState({});
  const [knowledgeCheckSubmitted, setKnowledgeCheckSubmitted] = useState(false);

  const knowledgeCheckQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of a Contact & Lead Generation section on a website?",
      options: [
        "To provide clear ways for interested visitors to reach out and submit structured enquiries",
        "To show high-resolution background video animations",
        "To hide company contact details from search engines",
        "To replace the website Navbar navigation menu"
      ],
      correct: 0,
      explanation: "A contact section turns passive website visitors into active leads by providing contact details and a structured enquiry form."
    },
    {
      id: 2,
      question: "What is the key difference between a normal form and a lead-generation form?",
      options: [
        "A lead-generation form captures structured project requirements and contact info to convert prospects into customers",
        "A lead-generation form requires 50 mandatory input fields",
        "A normal form cannot have a submit button",
        "A lead-generation form only works on mobile phones"
      ],
      correct: 0,
      explanation: "Lead forms focus on buyer intent by collecting specific project requirements (e.g., service needed, budget, message) alongside contact information."
    },
    {
      id: 3,
      question: "Why should every HTML form field have a matching `<label>` element?",
      options: [
        "Labels clearly describe expected input, improve accessibility for screen readers, and increase clickable hit area",
        "Labels make input text automatically uppercase",
        "Labels automatically submit the form to a database",
        "Labels replace CSS styling sheets"
      ],
      correct: 0,
      explanation: "Labels link to input fields via the `for` attribute (matching `id`), enabling screen readers to announce fields and allowing users to click the text to focus the field."
    },
    {
      id: 4,
      question: "How do you correctly link an HTML `<label>` to an `<input>` field?",
      options: [
        "Set the label's `for` attribute value equal to the input's `id` attribute value",
        "Give both elements the exact same CSS class name",
        "Put the label after the submit button",
        "Use `name` attributes instead of `id`"
      ],
      correct: 0,
      explanation: "Matching `<label for='userEmail'>` with `<input id='userEmail'>` creates an explicit accessibility association in the DOM."
    },
    {
      id: 5,
      question: "What is the advantage of using `<input type='email'>` over `<input type='text'>`?",
      options: [
        "Browsers enforce native email format validation (@ and domain) and trigger email-optimized keyboards on mobile",
        "It automatically sends an instant email from the visitor's computer",
        "It hides input characters with asterisks",
        "It prevents users from typing numbers"
      ],
      correct: 0,
      explanation: "`type='email'` triggers native browser format checks and displays the `@` and `.com` keys on smartphone touch keyboards."
    },
    {
      id: 6,
      question: "Why is `<input type='tel'>` useful for phone number fields?",
      options: [
        "It opens a numeric dial pad keyboard on mobile browsers while marking the semantic purpose of the field",
        "It automatically dials the phone number when typed",
        "It verifies that the phone number is active with telecom operators",
        "It restricts input length to exactly 5 digits"
      ],
      correct: 0,
      explanation: "`type='tel'` brings up a telephone dial pad on mobile screens for easy typing."
    },
    {
      id: 7,
      question: "When should you use a `<select>` dropdown element instead of a text input?",
      options: [
        "When visitors must choose exactly one option from a known, predefined list of choices",
        "When visitors need to type long multi-line paragraphs",
        "When collecting sensitive passwords",
        "When uploading image files"
      ],
      correct: 0,
      explanation: "Dropdowns (`<select>`) standardize input data by limiting selection to fixed valid choices (e.g. Website Dev, UI Design, Maintenance)."
    },
    {
      id: 8,
      question: "What is the correct HTML element for multi-line text input (such as a detailed project message)?",
      options: [
        "<textarea>",
        "<input type='multiline'>",
        "<input type='text' rows='5'>",
        "<p contenteditable='true'>"
      ],
      correct: 0,
      explanation: "The `<textarea>` element allows multi-line text entry and can be sized using `rows` and `cols` attributes."
    },
    {
      id: 9,
      question: "What HTML attribute makes a form input compulsory before submission?",
      options: [
        "required",
        "mandatory='true'",
        "validate='yes'",
        "important"
      ],
      correct: 0,
      explanation: "The boolean `required` attribute prevents form submission if the field is left empty."
    },
    {
      id: 10,
      question: "Why is `e.preventDefault()` essential in JavaScript form submit handlers?",
      options: [
        "It stops the browser's default page refresh behavior so custom JS validation and feedback can execute",
        "It deletes all input data from the user's browser",
        "It closes the browser tab automatically",
        "It encrypts the entire website HTML code"
      ],
      correct: 0,
      explanation: "By default, submitting an HTML form reloads the page. `e.preventDefault()` stops reloading so client-side JavaScript can handle the event."
    },
    {
      id: 11,
      question: "What is the purpose of placeholder text (`placeholder='Enter your name'`)?",
      options: [
        "To provide a brief visual hint or example inside an empty input field",
        "To replace permanent field labels for accessibility",
        "To set the default submitted value of the field",
        "To style field borders with dashed lines"
      ],
      correct: 0,
      explanation: "Placeholders offer temporary hints inside empty fields. They should supplement labels, not replace them."
    },
    {
      id: 12,
      question: "How should a contact section layout adapt from desktop to mobile screens?",
      options: [
        "Stack the 2-column layout (Contact Details top, Form bottom) into a single responsive column",
        "Hide the contact form completely on mobile phones",
        "Shrink all form text to 2px size to force 2 columns",
        "Disable form submit buttons on small viewports"
      ],
      correct: 0,
      explanation: "Using CSS Grid or Flexbox with media queries stacks contact info and form vertically on narrow screens for effortless mobile scrolling."
    },
    {
      id: 13,
      question: "Why must frontend demonstration forms clearly label demo contact info?",
      options: [
        "To manage user expectations and clarify that frontend demo forms do not send live emails without a backend API",
        "To increase Google search ranking artificially",
        "To force visitors to pay subscription fees",
        "To prevent CSS styles from breaking"
      ],
      correct: 0,
      explanation: "Marking contact info as fictional demo content ensures transparency while teaching pure frontend HTML/CSS/JS form design."
    },
    {
      id: 14,
      question: "Which HTML input type is ideal for terms agreement confirmation?",
      options: [
        "<input type='checkbox'>",
        "<input type='radio'>",
        "<input type='button'>",
        "<select>"
      ],
      correct: 0,
      explanation: "Checkboxes (`type='checkbox'`) represent toggleable binary state choices such as 'I agree to be contacted'."
    },
    {
      id: 15,
      question: "What CSS property creates space between stacked form fields?",
      options: [
        "margin-bottom on .form-group containers",
        "border-width on input tags",
        "font-weight on label text",
        "text-align on form titles"
      ],
      correct: 0,
      explanation: "Wrapping each field label and input inside a `.form-group` div with `margin-bottom` ensures clean, readable spacing between fields."
    }
  ];

  const handleFormInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFormSubmitDemo = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Please enter a valid email address.';
    if (!formData.phone.trim()) errors.phone = 'Please enter your phone number.';
    if (!formData.requirement) errors.requirement = 'Please select a requirement option.';
    if (!formData.message.trim()) errors.message = 'Please type a message.';
    if (!formData.agree) errors.agree = 'You must agree to be contacted.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormSubmitted(false);
    } else {
      setFormErrors({});
      setFormSubmitted(true);
    }
  };

  const calculateQuizScore = () => {
    let score = 0;
    knowledgeCheckQuestions.forEach(q => {
      if (knowledgeCheckAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

      {/* Module Title Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: '20px', padding: '2rem', color: 'white', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(30, 27, 75, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          <Sparkles size={16} /> Course Progress: Day 9 of 20 (45%)
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
          Day 9 — Build a Professional Contact &amp; Lead Generation Section
        </h1>
        <p style={{ fontSize: '1rem', color: '#c7d2fe', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
          Learn how to design contact information cards, structured lead enquiry forms, HTML form controls (<code style={{ color: '#fbbf24' }}>input</code>, <code style={{ color: '#fbbf24' }}>select</code>, <code style={{ color: '#fbbf24' }}>textarea</code>, <code style={{ color: '#fbbf24' }}>checkbox</code>), accessibility labels, client-side validation, and responsive form layouts.
        </p>
      </div>

      {/* Main Content Area */}
      <div>

        {/* ==================== TAB 1: INTRO & BUSINESS CONTEXT ==================== */}
        {activeTab === 'intro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Business Question Header */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Real-World Business Question
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 1rem 0' }}>
                "A visitor likes your website. What should they do next?"
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
                A great website doesn't just inform visitors — it guides them to take immediate action! When prospects want your service, they need a clear, effortless way to reach you. A professional <strong>Contact &amp; Lead Generation Section</strong> bridges the gap between interest and business.
              </p>

              {/* 5 Visitor Actions Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
                {[
                  { title: '📞 Call Directly', desc: 'Phone number & click-to-call links' },
                  { title: '✉ Send an Enquiry', desc: 'Structured lead form with details' },
                  { title: '💬 Request a Quote', desc: 'Specific service & requirement dropdowns' },
                  { title: '📅 Book Consultation', desc: 'Direct message & schedule request' },
                  { title: '📍 Visit Location', desc: 'Physical address & office location details' }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#2563eb', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Services vs Pricing vs Contact 3-Way Comparison */}
              <div style={{ background: '#eff6ff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #bfdbfe' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e3a8a', margin: '0 0 0.75rem 0' }}>
                  How Website Sections Work Together
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>SERVICES (Day 5)</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>"What can we do?"</div>
                    <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                      Lists capabilities (Web Design, SEO, Maintenance).
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>PRICING (Day 8)</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>"How much does it cost?"</div>
                    <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                      Structures capabilities into selectable plans (Starter, Pro, Business).
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '2px solid #ea580c' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase' }}>CONTACT (Day 9)</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>"How can you reach us?"</div>
                    <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
                      Provides direct contact channels &amp; lead enquiry submit form.
                    </div>
                  </div>
                </div>

                {/* 🍕 Real-Life Restaurant Analogy */}
                <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e3a8a', marginBottom: '0.75rem' }}>
                    🍕 Real-Life Analogy — Restaurant Customer Journey
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '0.84rem' }}>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <strong style={{ color: '#0284c7' }}>Services:</strong> Sees the food menu (Pizzas, Drinks)
                    </div>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <strong style={{ color: '#2563eb' }}>Pricing:</strong> Sees the Combo Deal price tag (₹299)
                    </div>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #ea580c' }}>
                      <strong style={{ color: '#ea580c' }}>Contact:</strong> Calls phone line or submits table reservation!
                    </div>
                  </div>
                </div>

                {/* 3-Step Visitor Journey */}
                <div style={{ fontSize: '0.86rem', color: '#1e40af', background: '#dbeafe', padding: '10px 14px', borderRadius: '10px', fontWeight: 600 }}>
                  💡 <strong>Why Websites Need Contact Sections:</strong>
                  <ol style={{ margin: '6px 0 0 0', paddingLeft: '1.25rem', fontWeight: 500 }}>
                    <li>Visitors review <strong>Services</strong> to confirm your skills match their need.</li>
                    <li>Visitors review <strong>Pricing</strong> to check budget suitability.</li>
                    <li>Visitors use <strong>Contact</strong> to submit their enquiry and start the real project!</li>
                  </ol>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: TARGET RESULT PREVIEW ==================== */}
        {activeTab === 'visual' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Live Stacked Website Preview */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Continuous Website Stack (Days 1–9)
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    NAVBAR → HERO → ABOUT → SERVICES → PROJECTS → TESTIMONIALS → PRICING → <strong>CONTACT</strong>
                  </span>
                </div>
                <span style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px' }}>
                  ★ Fictional Demo Content
                </span>
              </div>

              {/* Mockup Container */}
              <div style={{ border: '2px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', background: '#ffffff' }}>

                {/* Stack Mini Bar */}
                <div style={{ background: '#0f172a', color: '#94a3b8', padding: '8px 16px', fontSize: '0.75rem', display: 'flex', gap: '16px', fontWeight: 700 }}>
                  <span>NAVBAR ✓</span>
                  <span>HERO ✓</span>
                  <span>ABOUT ✓</span>
                  <span>SERVICES ✓</span>
                  <span>PROJECTS ✓</span>
                  <span>TESTIMONIALS ✓</span>
                  <span>PRICING ✓</span>
                  <span style={{ color: '#38bdf8' }}>CONTACT (TODAY) ★</span>
                </div>

                {/* Live Rendered Day 9 Contact Section Target */}
                <div style={{ padding: '2.5rem 1.5rem', background: '#f8fafc' }}>

                  {/* Section Header */}
                  <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      GET IN TOUCH
                    </span>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 8px 0' }}>
                      Have a question or want to discuss your requirement?
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                      Send us a message and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  {/* 2-Column Grid Layout */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>

                    {/* Left: Contact Info Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                      <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                          📍
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Location</div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Theni, Tamil Nadu</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Fictional Demo Address</div>
                        </div>
                      </div>

                      <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                          📞
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Phone</div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>+91 98765 XXXXX</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Mon-Fri from 9am to 6pm</div>
                        </div>
                      </div>

                      <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                          ✉
                        </div>
                        <div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Email</div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>hello@example.com</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Online Support 24/7</div>
                        </div>
                      </div>

                    </div>

                    {/* Right: Contact Form */}
                    <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1.25rem 0' }}>
                        SEND AN ENQUIRY
                      </h4>

                      {formSubmitted && (
                        <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '1rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                          ✓ Thank you! Your enquiry has been received (Demo Frontend Action).
                        </div>
                      )}

                      <form onSubmit={handleFormSubmitDemo} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        <div>
                          <label htmlFor="demoName" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                            Name <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <input
                            type="text"
                            id="demoName"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleFormInputChange('name', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: formErrors.name ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                          />
                          {formErrors.name && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '2px' }}>{formErrors.name}</div>}
                        </div>

                        <div>
                          <label htmlFor="demoEmail" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                            Email <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <input
                            type="email"
                            id="demoEmail"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => handleFormInputChange('email', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: formErrors.email ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                          />
                          {formErrors.email && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '2px' }}>{formErrors.email}</div>}
                        </div>

                        <div>
                          <label htmlFor="demoPhone" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                            Phone <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <input
                            type="tel"
                            id="demoPhone"
                            placeholder="+91 98765 XXXXX"
                            value={formData.phone}
                            onChange={(e) => handleFormInputChange('phone', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: formErrors.phone ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                          />
                          {formErrors.phone && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '2px' }}>{formErrors.phone}</div>}
                        </div>

                        <div>
                          <label htmlFor="demoRequirement" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                            Requirement <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <select
                            id="demoRequirement"
                            value={formData.requirement}
                            onChange={(e) => handleFormInputChange('requirement', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: formErrors.requirement ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box', background: '#ffffff' }}
                          >
                            <option value="">Select an option ▼</option>
                            <option value="web-dev">Website Development</option>
                            <option value="ui-design">UI Design</option>
                            <option value="redesign">Website Redesign</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="other">Other</option>
                          </select>
                          {formErrors.requirement && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '2px' }}>{formErrors.requirement}</div>}
                        </div>

                        <div>
                          <label htmlFor="demoMessage" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#334155', marginBottom: '4px' }}>
                            Message <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <textarea
                            id="demoMessage"
                            rows={3}
                            placeholder="Tell us about your project requirements..."
                            value={formData.message}
                            onChange={(e) => handleFormInputChange('message', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: formErrors.message ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                          />
                          {formErrors.message && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '2px' }}>{formErrors.message}</div>}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
                          <input
                            type="checkbox"
                            id="demoAgree"
                            checked={formData.agree}
                            onChange={(e) => handleFormInputChange('agree', e.target.checked)}
                            style={{ cursor: 'pointer' }}
                          />
                          <label htmlFor="demoAgree" style={{ fontSize: '0.8rem', color: '#475569', cursor: 'pointer' }}>
                            I agree to be contacted regarding this enquiry.
                          </label>
                        </div>
                        {formErrors.agree && <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>{formErrors.agree}</div>}

                        <button
                          type="submit"
                          style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: 900, fontSize: '0.88rem', cursor: 'pointer', marginTop: '6px' }}
                        >
                          SEND ENQUIRY
                        </button>
                      </form>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Contact Section Explorer */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Interactive Contact Section Explorer
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                Click any component below to see how Contact Details and Form controls work together:
              </p>

              {/* Selector Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {[
                  { id: 'info', label: '📍 Contact Details' },
                  { id: 'label', label: '🏷️ <label> Tags' },
                  { id: 'input', label: '✉️ Input Fields' },
                  { id: 'select', label: '▼ Dropdown <select>' },
                  { id: 'textarea', label: '📝 <textarea>' },
                  { id: 'checkbox', label: '☑ Checkbox' },
                  { id: 'submit', label: '🚀 Submit Button' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setExplorerSelectedElement(item.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      background: explorerSelectedElement === item.id ? '#ea580c' : '#f1f5f9',
                      color: explorerSelectedElement === item.id ? 'white' : '#475569'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Explorer Details Display */}
              <div style={{ background: '#fff7ed', borderRadius: '14px', padding: '1.25rem', border: '1px solid #ffedd5' }}>
                {explorerSelectedElement === 'info' && (
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#c2410c', margin: '0 0 6px 0' }}>Contact Details Cards</h4>
                    <p style={{ fontSize: '0.88rem', color: '#9a3412', margin: 0, lineHeight: 1.6 }}>
                      Provides visitors with immediate alternative communication channels (Location, Phone, Email) so they can reach you directly if they prefer calling over filling forms.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'label' && (
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#c2410c', margin: '0 0 6px 0' }}>&lt;label&gt; Tags (for="inputId")</h4>
                    <p style={{ fontSize: '0.88rem', color: '#9a3412', margin: 0, lineHeight: 1.6 }}>
                      Labels specify what information is expected. Pairing <code style={{ background: '#ffedd5', padding: '2px 4px' }}>for="userName"</code> with <code style={{ background: '#ffedd5', padding: '2px 4px' }}>id="userName"</code> ensures screen readers announce the input and clicking the label focuses the field.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'input' && (
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#c2410c', margin: '0 0 6px 0' }}>Text, Email &amp; Tel Inputs (&lt;input&gt;)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#9a3412', margin: 0, lineHeight: 1.6 }}>
                      Single-line text entry fields. Setting <code style={{ background: '#ffedd5', padding: '2px 4px' }}>type="email"</code> enforces email format checks, while <code style={{ background: '#ffedd5', padding: '2px 4px' }}>type="tel"</code> brings up phone dial pads on smartphones.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'select' && (
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#c2410c', margin: '0 0 6px 0' }}>Dropdown Select (&lt;select&gt; &amp; &lt;option&gt;)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#9a3412', margin: 0, lineHeight: 1.6 }}>
                      Standardizes input choices by letting users pick one item from a fixed list (e.g. Website Dev, UI Design, Maintenance).
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'textarea' && (
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#c2410c', margin: '0 0 6px 0' }}>Multi-Line Text Area (&lt;textarea&gt;)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#9a3412', margin: 0, lineHeight: 1.6 }}>
                      Provides expandable multi-line text input for detailed project explanations, specs, or custom inquiries.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'checkbox' && (
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#c2410c', margin: '0 0 6px 0' }}>Agreement Checkbox (&lt;input type="checkbox"&gt;)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#9a3412', margin: 0, lineHeight: 1.6 }}>
                      Binary toggle confirming consent (e.g. "I agree to be contacted"). Requires explicit user check before form submission.
                    </p>
                  </div>
                )}
                {explorerSelectedElement === 'submit' && (
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#c2410c', margin: '0 0 6px 0' }}>Submit Button (&lt;button type="submit"&gt;)</h4>
                    <p style={{ fontSize: '0.88rem', color: '#9a3412', margin: 0, lineHeight: 1.6 }}>
                      Triggers the form submission event. JavaScript listens for this event to validate input data and show feedback messages.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 3: STEP-BY-STEP HTML BUILDER ==================== */}
        {activeTab === 'html_build' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Step-by-Step Progressive HTML Form Builder
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Build the Contact &amp; Lead Form section incrementally step-by-step:
                  </span>
                </div>

                {/* Step Switchers */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4].map(step => (
                    <button
                      key={step}
                      onClick={() => setHtmlBuildStep(step)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        border: 'none',
                        cursor: 'pointer',
                        background: htmlBuildStep === step ? '#ea580c' : '#f1f5f9',
                        color: htmlBuildStep === step ? 'white' : '#475569'
                      }}
                    >
                      Step {step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Explanations */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', display: 'block', marginBottom: 4 }}>
                    HTML Code (Step {htmlBuildStep} of 4):
                  </label>
                  <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', maxHeight: '350px', overflowY: 'auto' }}>
                    {htmlBuildStep === 1 && renderSyntaxHighlightedHTML(`<section id="contact">
  <!-- Step 1: Create section wrapper with id="contact" connected to Navbar link -->
</section>`)}
                    {htmlBuildStep === 2 && renderSyntaxHighlightedHTML(`<section id="contact">
  <div class="container">
    <span class="badge">GET IN TOUCH</span>
    <h2>Have a question or want to discuss your requirement?</h2>
    <p>Send us a message.</p>
  </div>
</section>`)}
                    {htmlBuildStep === 3 && renderSyntaxHighlightedHTML(`<section id="contact">
  <div class="container">
    <div class="contact-grid">
      <!-- LEFT COLUMN: Contact Details -->
      <div class="contact-info">
        <div class="info-card">📍 Theni, Tamil Nadu</div>
        <div class="info-card">📞 +91 98765 XXXXX</div>
        <div class="info-card">✉ hello@example.com</div>
      </div>
      <!-- RIGHT COLUMN: Form Placeholder -->
    </div>
  </div>
</section>`)}
                    {htmlBuildStep === 4 && renderSyntaxHighlightedHTML(`<section id="contact">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">...</div>
      
      <!-- RIGHT COLUMN: Lead Form -->
      <form class="contact-form" id="leadForm">
        <label for="userName">Name</label>
        <input type="text" id="userName" required>

        <label for="userEmail">Email</label>
        <input type="email" id="userEmail" required>

        <label for="userRequirement">Requirement</label>
        <select id="userRequirement" required>
          <option value="">Select an option ▼</option>
          <option value="web">Website Development</option>
        </select>

        <label for="userMessage">Message</label>
        <textarea id="userMessage" required></textarea>

        <button type="submit">SEND ENQUIRY</button>
      </form>
    </div>
  </div>
</section>`)}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: 4 }}>
                    Unstyled Live Browser Render:
                  </label>
                  <div style={{ background: '#ffffff', border: '2px solid #cbd5e1', borderRadius: '12px', padding: '1rem', minHeight: '260px', fontFamily: 'serif' }}>
                    {htmlBuildStep >= 2 && <div style={{ fontSize: '0.75rem' }}>GET IN TOUCH</div>}
                    {htmlBuildStep >= 2 && <h3 style={{ fontSize: '1.2rem', margin: '4px 0' }}>Have a question?</h3>}
                    {htmlBuildStep >= 3 && (
                      <div style={{ border: '1px solid #ccc', padding: '8px', margin: '8px 0' }}>
                        <div>📍 Theni, Tamil Nadu</div>
                        <div>📞 +91 98765 XXXXX</div>
                        <div>✉ hello@example.com</div>
                      </div>
                    )}
                    {htmlBuildStep >= 4 && (
                      <div style={{ border: '1px solid #ccc', padding: '8px' }}>
                        <div><label>Name:</label> <input type="text" placeholder="Full name" /></div>
                        <div style={{ marginTop: '4px' }}><label>Email:</label> <input type="text" placeholder="Email address" /></div>
                        <div style={{ marginTop: '4px' }}>
                          <label>Requirement:</label>
                          <select><option>Select ▼</option></select>
                        </div>
                        <div style={{ marginTop: '4px' }}><button>[SEND ENQUIRY]</button></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 4: HTML INPUT CONTROLS EXPLORER ==================== */}
        {activeTab === 'inputs_explorer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                HTML Form Controls &amp; Input Types Deep-Dive
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                Select an input type to see its HTML code attributes, mobile browser behavior, and live element preview:
              </p>

              {/* Input Type Selector Tabs */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {[
                  { id: 'text', label: 'type="text" (Name)' },
                  { id: 'email', label: 'type="email" (Email)' },
                  { id: 'tel', label: 'type="tel" (Phone)' },
                  { id: 'select', label: '<select> (Dropdown)' },
                  { id: 'textarea', label: '<textarea> (Multi-line)' },
                  { id: 'checkbox', label: 'type="checkbox" (Consent)' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedInputType(type.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      background: selectedInputType === type.id ? '#2563eb' : '#f1f5f9',
                      color: selectedInputType === type.id ? 'white' : '#475569'
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Input Feature Box */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>

                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', marginBottom: '6px' }}>
                    HTML Code Structure:
                  </div>
                  <div style={{ background: '#090d16', padding: '1rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
                    {selectedInputType === 'text' && renderSyntaxHighlightedHTML(`<label for="userName">Name</label>
<input 
  type="text" 
  id="userName" 
  name="name" 
  placeholder="Enter your full name" 
  required
>`)}
                    {selectedInputType === 'email' && renderSyntaxHighlightedHTML(`<label for="userEmail">Email</label>
<input 
  type="email" 
  id="userEmail" 
  name="email" 
  placeholder="name@example.com" 
  required
>`)}
                    {selectedInputType === 'tel' && renderSyntaxHighlightedHTML(`<label for="userPhone">Phone</label>
<input 
  type="tel" 
  id="userPhone" 
  name="phone" 
  placeholder="+91 98765 XXXXX" 
  required
>`)}
                    {selectedInputType === 'select' && renderSyntaxHighlightedHTML(`<label for="userReq">Requirement</label>
<select id="userReq" name="requirement" required>
  <option value="">Select an option ▼</option>
  <option value="web-dev">Website Development</option>
  <option value="ui-design">UI Design</option>
  <option value="maintenance">Maintenance</option>
</select>`)}
                    {selectedInputType === 'textarea' && renderSyntaxHighlightedHTML(`<label for="userMsg">Message</label>
<textarea 
  id="userMsg" 
  name="message" 
  rows="4" 
  placeholder="Tell us about your project..." 
  required
></textarea>`)}
                    {selectedInputType === 'checkbox' && renderSyntaxHighlightedHTML(`<div class="form-checkbox">
  <input type="checkbox" id="userAgree" required>
  <label for="userAgree">I agree to be contacted.</label>
</div>`)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Element Explanation &amp; Mobile Behavior:
                  </div>
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', lineHeight: 1.6, fontSize: '0.88rem' }}>
                    {selectedInputType === 'text' && (
                      <div>
                        <strong>Standard Single-Line Text:</strong> Used for general textual input such as names or titles. Displays standard alphabetic keyboard on mobile screens.
                      </div>
                    )}
                    {selectedInputType === 'email' && (
                      <div>
                        <strong>Email-Optimized Input:</strong> Triggers native browser validation checking for <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>@</code> and domain format. Displays <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>@</code> and <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>.com</code> keys on touch keyboards.
                      </div>
                    )}
                    {selectedInputType === 'tel' && (
                      <div>
                        <strong>Telephone Input:</strong> Opens a telephone numeric dial pad keyboard on mobile devices for smooth phone number entry. (Note: Does not perform active telecom verification).
                      </div>
                    )}
                    {selectedInputType === 'select' && (
                      <div>
                        <strong>Dropdown Options Menu:</strong> Restricts user selection to a known, predefined set of valid options. Prevents spelling typos and standardizes backend data.
                      </div>
                    )}
                    {selectedInputType === 'textarea' && (
                      <div>
                        <strong>Multi-Line Expandable Field:</strong> Allows multi-line text input. Sized using <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>rows="4"</code> attribute to accommodate detailed project descriptions.
                      </div>
                    )}
                    {selectedInputType === 'checkbox' && (
                      <div>
                        <strong>Binary Choice Checkbox:</strong> Toggleable square checkbox ideal for user consent confirmation ("I agree to terms"). Required attribute enforces check before submit.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 5: FORM VALIDATION & JAVASCRIPT ==================== */}
        {activeTab === 'validation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Form Validation &amp; JavaScript Event Handling
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                How do we handle form submissions without reloading the web page?
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>1. HTML5 Native Validation</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                    Attributes like <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>required</code> and <code style={{ background: '#e2e8f0', padding: '2px 4px' }}>type="email"</code> catch empty or malformed fields natively.
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563eb', marginBottom: '4px' }}>2. e.preventDefault()</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                    Stops default browser page refresh so JavaScript can validate data and display interactive feedback alerts.
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', marginBottom: '4px' }}>3. Frontend Demo Feedback</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                    Displays instant error messages or a success banner to the user. (Note: Data is not sent to a live server without a backend API).
                  </div>
                </div>

              </div>

              {/* JS Event Handler Code Snippet */}
              <div style={{ background: '#090d16', padding: '1.25rem', borderRadius: '14px', border: '1px solid #1e293b' }}>
                {renderSyntaxHighlightedHTML(`// Step 1: Select form element
const leadForm = document.getElementById('leadForm');

// Step 2: Add submit event listener
leadForm.addEventListener('submit', function(e) {
  // Step 3: Prevent default page reload
  e.preventDefault();

  // Step 4: Validate inputs & show feedback message
  const name = document.getElementById('userName').value;
  if(name.trim() !== '') {
    alert('Thank you ' + name + '! Your enquiry has been received (Demo Frontend Action).');
  }
});`, 'js')}
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 6: RESPONSIVE FORM GRID ==================== */}
        {activeTab === 'responsive' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Responsive Form Grid &amp; Viewport Tester
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Test how the 2-column contact section stacks on smaller mobile screens:
                  </span>
                </div>

                {/* Device Switcher */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { id: 'desktop', label: '🖥 Desktop (1200px)' },
                    { id: 'tablet', label: '📱 Tablet (768px)' },
                    { id: 'mobile', label: '📲 Mobile (375px)' }
                  ].map(dev => (
                    <button
                      key={dev.id}
                      onClick={() => setTargetDevice(dev.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        border: 'none',
                        cursor: 'pointer',
                        background: targetDevice === dev.id ? '#2563eb' : '#f1f5f9',
                        color: targetDevice === dev.id ? 'white' : '#475569'
                      }}
                    >
                      {dev.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resizable Preview Screen */}
              <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: targetDevice === 'desktop' ? '100%' : targetDevice === 'tablet' ? '700px' : '360px',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                    GET IN TOUCH
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, margin: '0 0 1rem 0' }}>Have a question?</h3>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: targetDevice === 'mobile' ? '1fr' : '1fr 1.2fr',
                    gap: '1rem'
                  }}>
                    {/* Left: Info */}
                    <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}>
                      <strong>📍 Location:</strong> Theni, Tamil Nadu<br />
                      <strong>📞 Phone:</strong> +91 98765 XXXXX<br />
                      <strong>✉ Email:</strong> hello@example.com
                    </div>

                    {/* Right: Form */}
                    <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}>
                      <div style={{ fontWeight: 800, marginBottom: '6px' }}>SEND ENQUIRY</div>
                      <input type="text" placeholder="Name" style={{ width: '100%', padding: '6px', marginBottom: '6px', boxSizing: 'border-box' }} />
                      <input type="text" placeholder="Email" style={{ width: '100%', padding: '6px', marginBottom: '6px', boxSizing: 'border-box' }} />
                      <button style={{ width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '6px', borderRadius: '6px', fontWeight: 800 }}>SEND</button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 7: GUIDED BUILD (18 STAGES) ==================== */}
        {activeTab === 'guided_build' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Build With Me (18 Guided Stages)
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Follow the 18 progressive stages to construct the complete Contact &amp; Lead Generation Section:
                  </span>
                </div>

                {/* Stage Counter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    disabled={guidedBuildStage === 1}
                    onClick={() => setGuidedBuildStage(prev => Math.max(1, prev - 1))}
                    style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: guidedBuildStage === 1 ? 'not-allowed' : 'pointer', fontWeight: 800 }}
                  >
                    ← Prev
                  </button>
                  <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#ea580c' }}>
                    Stage {guidedBuildStage} / 18
                  </span>
                  <button
                    disabled={guidedBuildStage === 18}
                    onClick={() => setGuidedBuildStage(prev => Math.min(18, prev + 1))}
                    style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: '#ea580c', color: 'white', cursor: guidedBuildStage === 18 ? 'not-allowed' : 'pointer', fontWeight: 800 }}
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Guided Stage Content Display */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e293b', margin: '0 0 8px 0' }}>
                  Stage {guidedBuildStage}: {[
                    'Create Section Wrapper (<section id="contact">)',
                    'Add Container (.container)',
                    'Add Section Header Badge (GET IN TOUCH)',
                    'Add Main Heading (h2)',
                    'Add Section Description (p)',
                    'Create Contact Grid Layout (.contact-grid)',
                    'Add Left Column Container (.contact-info)',
                    'Add Location Info Card (📍 Theni, Tamil Nadu)',
                    'Add Phone Info Card (📞 +91 98765 XXXXX)',
                    'Add Email Info Card (✉ hello@example.com)',
                    'Create Form Container (<form id="leadForm">)',
                    'Add Name Input Field (type="text")',
                    'Add Email Input Field (type="email")',
                    'Add Phone Input Field (type="tel")',
                    'Add Requirement Select Dropdown (<select>)',
                    'Add Message Text Area (<textarea>)',
                    'Add Agreement Checkbox (type="checkbox")',
                    'Add Submit Button & JS Event Handler'
                  ][guidedBuildStage - 1]}
                </h3>

                <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '1rem' }}>
                  {renderSyntaxHighlightedHTML([
                    `<section id="contact" class="contact-section">
  <!-- Contact section wrapper -->
</section>`,
                    `<section id="contact" class="contact-section">
  <div class="container">
    <!-- Centered inner container -->
  </div>
</section>`,
                    `<span class="section-badge">GET IN TOUCH</span>`,
                    `<h2>Have a question or want to discuss your requirement?</h2>`,
                    `<p>Send us a message and our team will get back to you within 24 hours.</p>`,
                    `<div class="contact-grid">
  <!-- 2-column flex or grid container -->
</div>`,
                    `<div class="contact-info">
  <!-- Left column contact cards -->
</div>`,
                    `<div class="info-card">
  <div class="icon">📍</div>
  <div>
    <h4>Location</h4>
    <p>Theni, Tamil Nadu</p>
  </div>
</div>`,
                    `<div class="info-card">
  <div class="icon">📞</div>
  <div>
    <h4>Phone</h4>
    <p>+91 98765 XXXXX</p>
  </div>
</div>`,
                    `<div class="info-card">
  <div class="icon">✉</div>
  <div>
    <h4>Email</h4>
    <p>hello@example.com</p>
  </div>
</div>`,
                    `<form class="contact-form" id="leadForm">
  <!-- Right column lead enquiry form -->
</form>`,
                    `<div class="form-group">
  <label for="userName">Name</label>
  <input type="text" id="userName" name="name" placeholder="Enter your full name" required>
</div>`,
                    `<div class="form-group">
  <label for="userEmail">Email</label>
  <input type="email" id="userEmail" name="email" placeholder="name@example.com" required>
</div>`,
                    `<div class="form-group">
  <label for="userPhone">Phone</label>
  <input type="tel" id="userPhone" name="phone" placeholder="+91 98765 XXXXX" required>
</div>`,
                    `<div class="form-group">
  <label for="userRequirement">Requirement</label>
  <select id="userRequirement" name="requirement" required>
    <option value="">Select an option ▼</option>
    <option value="web-dev">Website Development</option>
    <option value="ui-design">UI Design</option>
  </select>
</div>`,
                    `<div class="form-group">
  <label for="userMessage">Message</label>
  <textarea id="userMessage" name="message" rows="4" placeholder="Tell us about your project..." required></textarea>
</div>`,
                    `<div class="form-checkbox">
  <input type="checkbox" id="userAgree" required>
  <label for="userAgree">I agree to be contacted regarding this enquiry.</label>
</div>`,
                    `<button type="submit" class="btn-submit">SEND ENQUIRY</button>

<script>
document.getElementById('leadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you! Enquiry received (Demo action).');
});
</script>`
                  ][guidedBuildStage - 1])}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 8: LIVE CODE PLAYGROUND ==================== */}
        {activeTab === 'playground' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Live Code Playground
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                Edit HTML, CSS, and JavaScript in real-time to customize your Contact &amp; Lead Form:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <LiveSyntaxCodeEditor
                  label="HTML Code"
                  value={playgroundHTML}
                  onChange={(e) => setPlaygroundHTML(e.target.value)}
                  language="html"
                  rows={14}
                />
                <LiveSyntaxCodeEditor
                  label="CSS Code"
                  value={playgroundCSS}
                  onChange={(e) => setPlaygroundCSS(e.target.value)}
                  language="css"
                  rows={14}
                />
              </div>

              {/* Live Preview Container */}
              <div style={{ border: '2px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ background: '#0f172a', color: 'white', padding: '8px 14px', fontSize: '0.8rem', fontWeight: 800 }}>
                  ▶ LIVE OUTPUT PREVIEW
                </div>
                <style>{playgroundCSS}</style>
                <div dangerouslySetInnerHTML={{ __html: playgroundHTML }} />
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 9: CODE CHALLENGES & DEBUGGING ==================== */}
        {activeTab === 'challenges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Predict Output Challenge */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Predict the Output Challenge
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                What happens when this HTML form code executes in the browser?
              </p>

              <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '1rem' }}>
                {renderSyntaxHighlightedHTML(`<label for="userEmail">Email</label>
<input type="text" id="userEmail" required>`)}
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>
                Question: Why does mobile phone keyboard fail to show the `@` key for this email field?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                {[
                  'Because the field uses type="text" instead of type="email"',
                  'Because the label is missing a class name',
                  'Because HTML forms cannot validate email addresses',
                  'Because CSS background color is missing'
                ].map((opt, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <input type="radio" name="predictQuiz" onChange={() => setQuizAnswers(prev => ({ ...prev, 1: i }))} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Debugging Challenge */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                🐛 Debugging Challenge: Fix the Broken Form Refresh
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                The user clicks "SEND ENQUIRY", but the web page reloads immediately and clears all fields! Why?
              </p>

              <div style={{ background: '#090d16', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '1rem' }}>
                {renderSyntaxHighlightedHTML(`form.addEventListener('submit', function(e) {
  // BUG: Missing e.preventDefault()!
  alert('Form submitted!');
});`, 'js')}
              </div>

              <button
                onClick={() => setDebugSolved(!debugSolved)}
                style={{ background: '#ea580c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
              >
                {debugSolved ? 'Hide Fix' : 'Show Solution'}
              </button>

              {debugSolved && (
                <div style={{ marginTop: '1rem', background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700 }}>
                  ✓ FIX: Call <code style={{ background: '#bbf7d0', padding: '2px 4px' }}>e.preventDefault();</code> at the top of the submit event handler to prevent default browser page reload!
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==================== TAB 10: ASSIGNMENT & AI CHALLENGE ==================== */}
        {activeTab === 'assignment' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Day 9 Assignment: Build a Contact &amp; Lead Generation Section
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                Add a Contact &amp; Lead Form section to your continuous website stack (`NAVBAR → HERO → ABOUT → SERVICES → PROJECTS → TESTIMONIALS → PRICING → CONTACT`):
              </p>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '8px' }}>
                  Deliverable Checklist:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#334155' }}>
                  <div>✓ Create &lt;section id="contact"&gt; connected to Navbar link</div>
                  <div>✓ Add 2-column layout (Left: Contact Details Cards, Right: Lead Form)</div>
                  <div>✓ Include Contact Details (Location, Phone, Email)</div>
                  <div>✓ Build form with Name, Email, Phone, Requirement Dropdown, Message, Checkbox</div>
                  <div>✓ Use proper &lt;label for="..."&gt; and &lt;input id="..."&gt; pairings</div>
                  <div>✓ Add client-side JS submission handling (`e.preventDefault()`)</div>
                  <div>✓ Ensure responsive 1-column stacking on mobile viewports</div>
                </div>
              </div>

              <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e40af', marginBottom: '6px' }}>
                  🤖 AI Challenge Prompt:
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', lineHeight: 1.5 }}>
                  "Generate a custom CSS form style theme with floating labels and subtle glow box-shadow effects on focus for a modern tech agency."
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 11: KNOWLEDGE CHECK & COMPLETION ==================== */}
        {activeTab === 'quiz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Day 9 Knowledge Check (15 Questions)
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Test your understanding of Contact &amp; Lead Generation Sections, HTML forms, input types, and validation:
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#2563eb', background: '#eff6ff', padding: '6px 14px', borderRadius: '20px' }}>
                  Progress Target: 45%
                </div>
              </div>

              {/* Questions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {knowledgeCheckQuestions.map((q, qIndex) => (
                  <div key={q.id} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '10px' }}>
                      {qIndex + 1}. {q.question}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.options.map((opt, optIdx) => {
                        const isSelected = knowledgeCheckAnswers[q.id] === optIdx;
                        const isCorrect = q.correct === optIdx;
                        let btnBg = '#ffffff';
                        let btnBorder = '1px solid #cbd5e1';
                        let btnColor = '#334155';

                        if (knowledgeCheckSubmitted) {
                          if (isCorrect) {
                            btnBg = '#dcfce7';
                            btnBorder = '2px solid #22c55e';
                            btnColor = '#15803d';
                          } else if (isSelected && !isCorrect) {
                            btnBg = '#fee2e2';
                            btnBorder = '2px solid #ef4444';
                            btnColor = '#b91c1c';
                          }
                        } else if (isSelected) {
                          btnBg = '#eff6ff';
                          btnBorder = '2px solid #2563eb';
                          btnColor = '#1d4ed8';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={knowledgeCheckSubmitted}
                            onClick={() => setKnowledgeCheckAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                            style={{
                              textAlign: 'left',
                              padding: '10px 14px',
                              borderRadius: '8px',
                              border: btnBorder,
                              background: btnBg,
                              color: btnColor,
                              fontSize: '0.88rem',
                              fontWeight: isSelected ? 700 : 500,
                              cursor: knowledgeCheckSubmitted ? 'default' : 'pointer'
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {knowledgeCheckSubmitted && (
                      <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#475569', background: '#ffffff', padding: '8px 12px', borderRadius: '6px', borderLeft: '4px solid #2563eb' }}>
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Submit Quiz Action */}
              {!knowledgeCheckSubmitted ? (
                <button
                  onClick={() => setKnowledgeCheckSubmitted(true)}
                  style={{
                    width: '100%',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.85rem 2rem',
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                    marginBottom: '2rem'
                  }}
                >
                  Submit Knowledge Check
                </button>
              ) : (
                <div style={{ background: '#dcfce7', border: '2px solid #22c55e', color: '#15803d', padding: '1rem', borderRadius: '14px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', marginBottom: '2rem' }}>
                  ✓ Quiz Submitted! Score: {calculateQuizScore()} / 15 | Progress: 45% (Day 9 / 20)
                </div>
              )}

              {/* STANDARDIZED GREEN TROPHY COMPLETION SCREEN — ALWAYS VISIBLE */}
              <div style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                borderRadius: '24px',
                padding: '3rem 2rem',
                color: '#ffffff',
                textAlign: 'center',
                boxShadow: '0 20px 30px rgba(4, 120, 87, 0.25)'
              }}>
                <Trophy size={64} style={{ marginBottom: '1rem', opacity: 0.9 }} />
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 0.75rem 0' }}>
                  🎉 Day 9 Completed
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#e0e7ff', margin: '0 0 1.5rem 0' }}>
                  Score: <strong>{calculateQuizScore()} / 15</strong> | Progress: <strong>45% (Day 9 / 20)</strong>
                </p>

                {/* YOU LEARNED Checklist */}
                <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '560px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    YOU LEARNED:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                    <div>✓ Why websites need contact forms</div>
                    <div>✓ Normal forms vs lead generation</div>
                    <div>✓ HTML &lt;form&gt; container</div>
                    <div>✓ Form &lt;label for="..."&gt; accessibility</div>
                    <div>✓ Text input (`type="text"`)</div>
                    <div>✓ Email input (`type="email"`)</div>
                    <div>✓ Phone input (`type="tel"`)</div>
                    <div>✓ Select dropdown (&lt;select&gt;)</div>
                    <div>✓ Multi-line text area (&lt;textarea&gt;)</div>
                    <div>✓ Agreement checkbox (`type="checkbox"`)</div>
                    <div>✓ Client-side validation</div>
                    <div>✓ `e.preventDefault()` handling</div>
                    <div>✓ Contact details cards (Location, Phone, Email)</div>
                    <div>✓ 2-column to 1-column responsive layout</div>
                    <div>✓ Frontend demo disclaimer rules</div>
                  </div>
                </div>

                {/* Progress Summary Cards */}
                <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                    Your Continuous Website So Far:
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                    <div>Day 1: Website layout ✓</div>
                    <div>Day 2: Professional Navbar ✓</div>
                    <div>Day 3: Hero Section ✓</div>
                    <div>Day 4: About Section ✓</div>
                    <div>Day 5: Services Section ✓</div>
                    <div>Day 6: Portfolio / Projects Section ✓</div>
                    <div>Day 7: Testimonials &amp; Trust Section ✓</div>
                    <div>Day 8: Pricing / Plans Section ✓</div>
                    <div>Day 9: Contact &amp; Lead Generation Section ✓</div>
                  </div>
                </div>

                {/* DAY 10 PREVIEW CARD */}
                <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                    🚀 COMING UP IN DAY 10:
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                    Day 10 — Build a Professional Website Footer &amp; Copyright Section
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                    Preview: Multi-Column Footer → Quick Links → Social Icons → Copyright Bar → Back to Top Trigger
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
