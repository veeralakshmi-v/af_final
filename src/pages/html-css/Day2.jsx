import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveEditor from '../../components/LiveEditor';
import Quiz from '../../components/Quiz';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

// Reusable Section Component with Framer Motion
const Section = ({ id, eyebrow, title, children }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="learning-card"
      style={{ marginBottom: '3rem' }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {eyebrow}
        </span>
        <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};

export default function Day2({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    if (typeof window.JSConfetti !== 'undefined') {
      const confetti = new window.JSConfetti();
      confetti.addConfetti({ emojis: ['🎉', '💎', '⭐'], confettiNumber: 30 });
    }
    onNavigate('module2', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tableCode = `<table border="1">
  <tr>
    <th>Name</th>
    <th>Math</th>
    <th>Science</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>95</td>
    <td>92</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>88</td>
    <td>85</td>
  </tr>
</table>`;

  const advancedTableCode = `<table border="1" style="width: 100%; border-collapse: collapse; text-align: center;">
  <thead>
    <tr>
      <th rowspan="2">Student Name</th>
      <th colspan="2">Subject Grades</th>
    </tr>
    <tr>
      <th>Mathematics</th>
      <th>Science</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>95</td>
      <td>92</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>88</td>
      <td>85</td>
    </tr>
    <tr>
      <td colspan="2" style="font-weight: bold; text-align: right;">Class Average:</td>
      <td style="font-weight: bold;">90</td>
    </tr>
  </tbody>
</table>`;

  const metaCode = `<head>
  <!-- UTF-8 character encoding -->
  <meta charset="UTF-8">
  
  <!-- Viewport scaling for mobile responsive layout -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Page Description (seen in Search Results) -->
  <meta name="description" content="Learn Web Development and AI with AlphaFly Course LMS.">
  
  <!-- Search Engine Keywords -->
  <meta name="keywords" content="HTML, CSS, Web Design, LMS">
  
  <title>AlphaFly Course LMS</title>
</head>`;

  const iframeCode = `<!-- Embed an external website/page -->
<iframe 
  src="https://example.com" 
  width="100%" 
  height="200" 
  style="border: 2px solid #3b82f6; border-radius: 8px;">
</iframe>`;

  const semanticIframesCode = `<article style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; background: #f8fafc;">
  <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 10px;">
    <h3 style="margin: 0; color: #1e293b;">Understanding Semantic HTML</h3>
    <small style="color: #64748b;">Published on HTML Learning Blog</small>
  </header>
  <p style="color: #475569; line-height: 1.6; margin: 0 0 10px 0;">
    Semantic HTML introduces meaning to the webpage rather than just presentation.
  </p>
  <aside style="background: #e0f2fe; padding: 10px; border-left: 4px solid #0284c7; border-radius: 4px;">
    <p style="margin: 0; color: #0369a1; font-size: 0.9rem;">
      <strong>Tip:</strong> Search engines reward semantic markup with better SEO!
    </p>
  </aside>
</article>`;

  const nonSemanticCode = `<!-- <div> is a block-level container (starts on new line, full width) -->
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
  <h3 style="margin: 0 0 8px 0; color: #1e293b;">Product Card (&lt;div&gt;)</h3>
  <p style="margin: 0; color: #475569; line-height: 1.6;">
    Product status: 
    <!-- <span> is an inline container (stays within text on same line) -->
    <span style="color: #16a34a; background: #dcfce7; padding: 2px 8px; border-radius: 4px; font-weight: bold;">In Stock</span>
    &nbsp;|&nbsp; Price: 
    <span style="color: #2563eb; font-size: 1.15rem; font-weight: bold;">$29.99</span>
  </p>
</div>

<!-- Another <div> starts on its own new line below -->
<div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 12px; color: #92400e;">
  <strong>Notice (&lt;div&gt;):</strong> Use <span style="text-decoration: underline; font-weight: bold;">&lt;span&gt;</span> for inline words and <span style="text-decoration: underline; font-weight: bold;">&lt;div&gt;</span> for block containers!
</div>`;

  const mediaCode = `<!-- Audio Example -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<!-- Video Example -->
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>`;

  // --- FORMS SECTION CODE BLOCKS ---

  const formsIntroCode = `<!-- The <form> tag wraps all form elements.
  action : Where to send the data (URL)
  method : "get" (visible in URL) or "post" (hidden, secure)
  autocomplete : "on" or "off" -->
<form action="/submit" method="post" autocomplete="on">
  ...
</form>`;

  const textInputsCode = `<!-- Text-based Input Types -->
<label for="name">Full Name:</label>
<input type="text" id="name" name="name" placeholder="John Doe" required>

<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="you@example.com" required>

<label for="password">Password:</label>
<input type="password" id="password" name="password" minlength="8" required>

<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000">

<label for="website">Website URL:</label>
<input type="url" id="website" name="website" placeholder="https://example.com">

<label for="search">Search:</label>
<input type="search" id="search" name="search" placeholder="Search here...">`;

  const numericInputsCode = `<!-- Number & Range Inputs -->
<label for="age">Age:</label>
<input type="number" id="age" name="age" min="1" max="120" step="1" value="25">

<label for="price">Price ($):</label>
<input type="number" id="price" name="price" min="0" max="10000" step="0.01">

<label for="volume">Volume:</label>
<input type="range" id="volume" name="volume" min="0" max="100" step="10" value="50">`;

  const dateTimeInputsCode = `<!-- Date & Time Inputs -->
<label for="dob">Date of Birth:</label>
<input type="date" id="dob" name="dob" min="1900-01-01" max="2025-12-31">

<label for="appt">Appointment Time:</label>
<input type="time" id="appt" name="appt" min="09:00" max="18:00">

<label for="meeting">Meeting (Date + Time):</label>
<input type="datetime-local" id="meeting" name="meeting">

<label for="month">Birth Month:</label>
<input type="month" id="month" name="month">

<label for="week">Work Week:</label>
<input type="week" id="week" name="week">`;

  const choiceInputsCode = `<!-- Radio Buttons (pick one) -->
<fieldset>
  <legend>Gender:</legend>
  <input type="radio" id="male" name="gender" value="male">
  <label for="male">Male</label>
  <input type="radio" id="female" name="gender" value="female">
  <label for="female">Female</label>
  <input type="radio" id="other" name="gender" value="other">
  <label for="other">Other</label>
</fieldset>

<!-- Checkboxes (pick many) -->
<fieldset>
  <legend>Interests:</legend>
  <input type="checkbox" id="html" name="skills" value="html">
  <label for="html">HTML</label>
  <input type="checkbox" id="css" name="skills" value="css">
  <label for="css">CSS</label>
  <input type="checkbox" id="js" name="skills" value="js">
  <label for="js">JavaScript</label>
</fieldset>`;

  const selectCode = `<!-- Dropdown Select -->
<label for="country">Country:</label>
<select id="country" name="country" required>
  <option value="">-- Select --</option>
  <optgroup label="Asia">
    <option value="in">India</option>
    <option value="jp">Japan</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="uk">UK</option>
    <option value="de">Germany</option>
  </optgroup>
</select>

<!-- Multi-Select (hold Ctrl/Cmd to pick many) -->
<label for="langs">Languages:</label>
<select id="langs" name="langs" multiple size="4">
  <option value="en">English</option>
  <option value="ta">Tamil</option>
  <option value="hi">Hindi</option>
  <option value="fr">French</option>
</select>`;

  const textareaCode = `<!-- Textarea: multi-line text input -->
<label for="bio">Bio:</label>
<textarea 
  id="bio" 
  name="bio" 
  rows="4" 
  cols="40"
  maxlength="300"
  placeholder="Tell us about yourself..."
  required>
</textarea>`;

  const datalistCode = `<!-- Datalist: input with autocomplete suggestions -->
<label for="browser">Favourite Browser:</label>
<input list="browsers" id="browser" name="browser" placeholder="Type to search">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
  <option value="Opera">
</datalist>`;

  const fileColorHiddenCode = `<!-- File Upload -->
<label for="avatar">Profile Picture:</label>
<input type="file" id="avatar" name="avatar" accept="image/*">

<!-- Multiple File Upload -->
<label for="docs">Documents:</label>
<input type="file" id="docs" name="docs" accept=".pdf,.docx" multiple>

<!-- Color Picker -->
<label for="theme">Theme Color:</label>
<input type="color" id="theme" name="theme" value="#3b82f6">

<!-- Hidden Input (user can't see, but data is sent) -->
<input type="hidden" name="user_id" value="12345">`;

  const buttonTypesCode = `<!-- Button Types -->

<!-- submit: sends the form data -->
<button type="submit">Submit Form</button>

<!-- reset: clears all form fields -->
<button type="reset">Reset Form</button>

<!-- button: does nothing by default, used with JavaScript -->
<button type="button" onclick="alert('Clicked!')">Click Me</button>

<!-- Input-based buttons (older style) -->
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="image" src="btn.png" alt="Submit Image Button">`;

  const formAttributesCode = `<!-- Key Form Attributes -->
<input type="text"
  required            <!-- field must be filled -->
  placeholder="Name" <!-- hint text inside the box -->
  readonly            <!-- can see but cannot edit -->
  disabled            <!-- greyed out, not submitted -->
  autofocus           <!-- auto-focus when page loads -->
  autocomplete="off"  <!-- disable browser autofill -->
  pattern="[A-Za-z]+" <!-- regex validation -->
  minlength="3"       <!-- minimum character count -->
  maxlength="50"      <!-- maximum character count -->
  name="username"
  id="username">`;

  const meterProgressCode = `<!-- Meter: display a value within a range (e.g., disk usage) -->
<label>Storage Used:</label>
<meter value="70" min="0" max="100" low="30" high="80" optimum="50">70%</meter>

<!-- Progress: show task completion (e.g., upload %) -->
<label>Upload Progress:</label>
<progress value="45" max="100">45%</progress>

<!-- Output: result of a calculation -->
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" value="10"> +
  <input type="number" id="b" value="5"> =
  <output name="result" for="a b">15</output>
</form>`;

  // Shared CSS injected into every form preview pane for clean alignment
  const FP = `<style>
    .fp label{display:block;font-weight:600;font-size:13px;margin-bottom:3px;margin-top:10px;font-family:sans-serif;}
    .fp label:first-child{margin-top:0;}
    .fp input:not([type=radio]):not([type=checkbox]):not([type=range]):not([type=color]):not([type=file]):not([type=submit]):not([type=reset]):not([type=image]){display:block;width:auto;max-width:300px;padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;margin-bottom:4px;}
    .fp input[type=number]{max-width:130px;}
    .fp input[type=range]{display:block;max-width:240px;margin-bottom:4px;}
    .fp input[type=color]{width:40px;height:30px;border:1px solid #cbd5e1;border-radius:4px;cursor:pointer;padding:2px;display:block;margin-bottom:4px;}
    .fp select{display:block;min-width:180px;max-width:280px;padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;margin-bottom:4px;}
    .fp textarea{display:block;max-width:300px;padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;font-family:sans-serif;resize:vertical;}
    .fp fieldset{border:1px solid #cbd5e1;border-radius:8px;padding:10px 14px;margin-bottom:8px;}
    .fp fieldset legend{font-weight:700;font-size:13px;padding:0 5px;}
    .fp fieldset label{display:inline-flex;align-items:center;gap:5px;margin-right:14px;font-weight:400;cursor:pointer;}
    .fp fieldset input[type=radio],.fp fieldset input[type=checkbox]{display:inline;width:auto;padding:0;margin:0;}
    .fp button{padding:7px 16px;border:none;border-radius:6px;cursor:pointer;font-size:13px;margin-right:8px;margin-bottom:6px;}
    .fp input[type=submit],.fp input[type=reset]{padding:7px 16px;border-radius:5px;cursor:pointer;margin-right:6px;font-size:13px;}
    .fp meter,.fp progress{display:block;width:240px;height:16px;margin-bottom:4px;}
    .fp output{font-size:18px;font-weight:700;color:#2563eb;vertical-align:middle;}
    .fp small{color:#64748b;font-weight:400;}
  </style><div class="fp">`;
  const FPend = `</div>`;

  const projectCode = `<form style="max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
  <h2 style="text-align: center; color: #333;">Event Registration</h2>
  
  <label>Full Name:</label><br>
  <input type="text" required style="width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 15px;"><br>
  
  <label>Email Address:</label><br>
  <input type="email" required style="width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 15px;"><br>
  
  <label>Ticket Type:</label><br>
  <select style="width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 15px;">
    <option>General Admission - $50</option>
    <option>VIP Pass - $100</option>
    <option>Student - $25</option>
  </select><br>
  
  <button type="submit" style="width: 100%; padding: 10px; background-color: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">Register Now</button>
</form>`;

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'tables' && (
        <Section key="tables" id="tables" eyebrow="Layout" title="HTML Tables">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Tables allow you to arrange data into rows and columns using <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code> (table row), <code>&lt;th&gt;</code> (table header), and <code>&lt;td&gt;</code> (table cell).</p>

          <div className="code-example-box">
            <div className="code-header">Basic Table: Student Marks Summary</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(tableCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, overflowX: 'auto', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div dangerouslySetInnerHTML={{ __html: tableCode }} style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: '2.5rem', marginBottom: '0.75rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>Advanced Tables: Merging Cells</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>For more complex layouts, HTML cells support merging using two key attributes:</p>
          <ul style={{ paddingLeft: '2rem', marginBottom: '1.5rem', listStyleType: 'disc', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li style={{ display: 'list-item', marginBottom: '0.5rem' }}>
              <strong><code>colspan</code></strong>: Merges columns horizontally. For example, <code>&lt;td colspan="2"&gt;</code> spans across two columns.
            </li>
            <li style={{ display: 'list-item', marginBottom: '0.5rem' }}>
              <strong><code>rowspan</code></strong>: Merges rows vertically. For example, <code>&lt;th rowspan="2"&gt;</code> spans down across two rows.
            </li>
          </ul>

          <div className="code-example-box">
            <div className="code-header">Advanced Table: Cell Merging Summary</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(advancedTableCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, overflowX: 'auto', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div dangerouslySetInnerHTML={{ __html: advancedTableCode }} style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          <div className="card-actions" style={{ marginTop: '2.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('semantic')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'semantic' && (
        <Section key="semantic" id="semantic" eyebrow="Structure" title="Semantic & Non-Semantic Tags">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            HTML elements are fundamentally divided into two categories: <strong>Semantic tags</strong> (which provide clear meaning to both browsers and search engines) and <strong>Non-Semantic tags</strong> (generic containers used for layout and CSS styling).
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>1. Semantic HTML5 Tags (Meaningful Structure)</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.8' }}>
            <strong>Semantic tags</strong> clearly describe their purpose and the role of the content inside them. Examples include <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code>, and <code>&lt;footer&gt;</code>. They improve <strong>SEO</strong> (search engine indexing) and <strong>accessibility</strong> (screen readers for assistive tech).
          </p>

          <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
            <div className="code-header">Semantic Structure: &lt;article&gt;, &lt;header&gt;, &lt;aside&gt;</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(semanticIframesCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, overflowX: 'auto', padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: semanticIframesCode }} />
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: '2.5rem', marginBottom: '0.75rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>2. Non-Semantic HTML Tags (Generic Containers: &lt;div&gt; &amp; &lt;span&gt;)</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.8' }}>
            <strong>Non-semantic tags</strong> tell nothing about the content they hold. They have no default meaning or appearance, making them ideal as building blocks for CSS styling and layout manipulation:
          </p>
          <ul style={{ paddingLeft: '2rem', marginBottom: '1.5rem', listStyleType: 'disc', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <li style={{ display: 'list-item', marginBottom: '0.5rem' }}>
              <strong><code>&lt;div&gt;</code> (Division)</strong>: A <strong>block-level</strong> element. It always starts on a <strong>new line</strong> and takes up the full width available (100%). Used to group large sections, create cards, and structure layouts (Grid &amp; Flexbox).
            </li>
            <li style={{ display: 'list-item', marginBottom: '0.5rem' }}>
              <strong><code>&lt;span&gt;</code></strong>: An <strong>inline</strong> element. It does <strong>not</strong> start on a new line and only occupies as much width as its content. Used to style, color, or highlight a specific word, phrase, badge, or icon inside a paragraph.
            </li>
          </ul>

          <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
            <div className="code-header">Non-Semantic Containers: &lt;div&gt; and &lt;span&gt;</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(nonSemanticCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ minWidth: 0, overflowX: 'auto', padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: nonSemanticCode }} />
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: '2.5rem', marginBottom: '0.75rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>3. Key Differences: Semantic vs Non-Semantic</h3>
          <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1e293b', border: '1px solid #cbd5e1', width: '22%' }}>Feature</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1e293b', border: '1px solid #cbd5e1', width: '39%' }}>Semantic Tags</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1e293b', border: '1px solid #cbd5e1', width: '39%' }}>Non-Semantic Tags</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, border: '1px solid #cbd5e1', color: '#1e293b' }}>Meaning</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Describes the content purpose (e.g., <code>&lt;article&gt;</code>, <code>&lt;nav&gt;</code>).</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>No meaning; purely a generic container (e.g., <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>).</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, border: '1px solid #cbd5e1', color: '#1e293b' }}>SEO &amp; Crawlers</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Search engines understand page hierarchy and rank content better.</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Treated as generic styling boxes without contextual value.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, border: '1px solid #cbd5e1', color: '#1e293b' }}>Accessibility</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Screen readers easily navigate page landmarks for visually impaired users.</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Screen readers provide no landmarks or extra context.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, border: '1px solid #cbd5e1', color: '#1e293b' }}>Best Used For</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Page structure, navigation, headers, footers, main article content.</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>CSS styling, flexbox/grid layout wrappers, and inline text highlights.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: '2.5rem', marginBottom: '0.75rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>4. Key Differences: &lt;div&gt; vs &lt;span&gt;</h3>
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1e293b', border: '1px solid #cbd5e1', width: '22%' }}>Feature</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1e293b', border: '1px solid #cbd5e1', width: '39%' }}>&lt;div&gt; (Division)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#1e293b', border: '1px solid #cbd5e1', width: '39%' }}>&lt;span&gt; (Span)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, border: '1px solid #cbd5e1', color: '#1e293b' }}>Display Mode</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}><strong>Block-level</strong> (<code>display: block</code>)</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}><strong>Inline</strong> (<code>display: inline</code>)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, border: '1px solid #cbd5e1', color: '#1e293b' }}>Line Behavior</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Always starts on a <strong>new line</strong> and takes full container width (100%).</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Stays <strong>on the same line</strong>; takes only width of its text content.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, border: '1px solid #cbd5e1', color: '#1e293b' }}>Content Allowed</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Can hold other block elements, inline elements, and text.</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Can only contain text and other inline elements.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 600, border: '1px solid #cbd5e1', color: '#1e293b' }}>Common Purpose</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Grouping sections, creating cards, layout wrappers, flex/grid containers.</td>
                  <td style={{ padding: '12px 16px', border: '1px solid #cbd5e1', color: '#475569' }}>Styling specific words, badges, price tags, text coloring, and highlights.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card-actions" style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('meta_iframes')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'meta_iframes' && (
        <Section key="meta_iframes" id="meta_iframes" eyebrow="Head & Embeds" title="Meta Tags & Iframes">
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>1. Meta Tags (Document Metadata)</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}><strong>Meta tags</strong> provide metadata about the HTML document (like description, character encoding, keywords, and author). They are placed inside the <code>&lt;head&gt;</code> element and are invisible on the screen, but critical for browser rendering and Search Engine Optimization (SEO).</p>

          <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
            <div className="code-header">Common Meta Tags inside &lt;head&gt;</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(metaCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', background: '#f8fafc' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', fontSize: '0.85rem' }}>
                  <strong style={{ color: '#2563eb', display: 'block', marginBottom: '0.25rem' }}>Google Search Result Preview:</strong>
                  <h4 style={{ margin: 0, color: '#1a0dab', fontSize: '1.1rem', cursor: 'pointer', textDecoration: 'underline' }}>AlphaFly Course LMS</h4>
                  <span style={{ color: '#006621', fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem' }}>https://alphaflytheni.vercel.app</span>
                  <p style={{ margin: 0, color: '#545454', fontSize: '0.8rem' }}>Learn Web Development and AI with AlphaFly Course LMS. Discover structured courses, quizzes, and live lab exercises...</p>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                  Note: Search engines parse the meta description tag to build search engine snippets.
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>2. Iframes (Inline Frames)</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>An <strong>Iframe</strong> (inline frame) is used to embed another document or webpage entirely within the current HTML page. This is commonly used for embedding interactive maps, third-party widgets, or external tools.</p>

          <div className="code-example-box" style={{ marginBottom: '2.5rem' }}>
            <div className="code-header">Iframe Embed Code</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(iframeCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: '100%' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.5rem' }}>Live Embedded Preview:</div>
                  <iframe
                    src="https://example.com"
                    width="100%"
                    height="180"
                    title="Iframe Live Demo"
                    style={{ border: '2px solid #3b82f6', borderRadius: '8px', background: 'white' }}>
                  </iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="card-actions" style={{ marginTop: '2.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('media')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'media' && (
        <Section key="media" id="media" eyebrow="Multimedia" title="Media Elements">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>HTML5 makes it incredibly easy to embed audio and video directly into the browser without third-party plugins.</p>
          <div className="code-example-box">
            <div className="code-header">Audio & Video Tags</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
              <div className="preview-pane" style={{ background: '#f9fafb', padding: '1.5rem', borderBottom: '1px solid var(--surface-border)', borderLeft: 'none' }}>
                <div dangerouslySetInnerHTML={{ __html: mediaCode }} />
              </div>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(mediaCode, Prism.languages.markup, 'markup') }} style={{ margin: 0 }}></pre>
              </div>
            </div>
          </div>
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('forms')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'forms' && (
        <Section key="forms" id="forms" eyebrow="Input" title="HTML Forms">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>HTML Forms collect user input and send it to a server. They are built with the <code>&lt;form&gt;</code> tag and filled with various input elements. Below is a complete reference of all important form tags.</p>

          {/* 1. The <form> tag */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>1. The &lt;form&gt; Tag &amp; Attributes</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>The <code>&lt;form&gt;</code> element wraps all inputs. Key attributes: <code>action</code> (URL to send data), <code>method</code> (<code>get</code> or <code>post</code>), <code>autocomplete</code>.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">The &lt;form&gt; Tag</div>
            <div className="code-content">
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(formsIntroCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>
          </div>

          {/* 2. Text-based inputs */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>2. Text-Based Input Types</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>These inputs accept text in different formats: plain text, email, password, phone, URL, and search.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">Text Inputs: text, email, password, tel, url, search</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(textInputsCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + textInputsCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 3. Numeric & Range */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>3. Numeric &amp; Range Inputs</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}><code>type="number"</code> accepts numeric values with optional <code>min</code>, <code>max</code>, <code>step</code>. <code>type="range"</code> renders a slider.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">number, range</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(numericInputsCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + numericInputsCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 4. Date & Time */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>4. Date &amp; Time Inputs</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>HTML5 provides native date/time pickers: <code>date</code>, <code>time</code>, <code>datetime-local</code>, <code>month</code>, and <code>week</code>.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">date, time, datetime-local, month, week</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(dateTimeInputsCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + dateTimeInputsCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 5. Radio & Checkboxes with fieldset/legend */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>5. Radio Buttons, Checkboxes, Fieldset &amp; Legend</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}><code>radio</code> — pick one from a group (same <code>name</code>). <code>checkbox</code> — pick multiple. <code>&lt;fieldset&gt;</code> groups related inputs; <code>&lt;legend&gt;</code> gives the group a title.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">radio, checkbox, fieldset, legend</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(choiceInputsCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + choiceInputsCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 6. Select, Optgroup */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>6. Select, Option &amp; Optgroup</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}><code>&lt;select&gt;</code> creates a dropdown. <code>&lt;option&gt;</code> adds items. <code>&lt;optgroup&gt;</code> groups options. Add <code>multiple</code> to allow multi-selection.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">select, option, optgroup, multiple</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(selectCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + selectCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 7. Textarea */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>7. Textarea</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}><code>&lt;textarea&gt;</code> is a multi-line text input. Use <code>rows</code> and <code>cols</code> to control size, and <code>maxlength</code> to cap characters.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">textarea</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(textareaCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + textareaCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 8. Datalist */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>8. Datalist (Autocomplete Suggestions)</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}><code>&lt;datalist&gt;</code> pairs with an <code>&lt;input&gt;</code> via its <code>list</code> attribute to provide autocomplete suggestions while keeping free-text entry possible.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">datalist</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(datalistCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + datalistCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 9. File, Color, Hidden */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>9. File Upload, Color Picker &amp; Hidden Input</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}><code>type="file"</code> lets users upload files (use <code>accept</code> to filter, <code>multiple</code> for multiple files). <code>type="color"</code> shows a color picker. <code>type="hidden"</code> stores data invisibly.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">file, color, hidden</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(fileColorHiddenCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + fileColorHiddenCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 10. Button Types */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>10. Button Types</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>The <code>&lt;button&gt;</code> element has three types: <code>submit</code> (sends the form), <code>reset</code> (clears fields), and <code>button</code> (custom JS action). Always specify <code>type</code>!</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">button type="submit", type="reset", type="button"</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(buttonTypesCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + buttonTypesCode + FPend }} />
              </div>
            </div>
          </div>

          {/* 11. Form Validation Attributes */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>11. Important Form Attributes</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>HTML provides built-in validation without JavaScript using attributes like <code>required</code>, <code>pattern</code>, <code>min</code>, <code>max</code>, <code>minlength</code>, <code>maxlength</code>, <code>readonly</code>, <code>disabled</code>, <code>autofocus</code>.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">required, placeholder, readonly, disabled, pattern, autofocus, autocomplete</div>
            <div className="code-content">
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(formAttributesCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
            </div>
          </div>

          {/* 12. Meter, Progress, Output */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>12. Meter, Progress &amp; Output</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}><code>&lt;meter&gt;</code> shows a scalar value in a range (like storage usage). <code>&lt;progress&gt;</code> shows task completion. <code>&lt;output&gt;</code> displays the result of a calculation.</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">meter, progress, output</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 0 }}>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(meterProgressCode, Prism.languages.markup, 'markup') }}></pre>
              </div>
              <div className="preview-pane" style={{ padding: '1.5rem' }}>
                <div dangerouslySetInnerHTML={{ __html: FP + meterProgressCode + FPend }} />
              </div>
            </div>
          </div>

          <div className="card-actions" style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('playground')}>Continue (+10 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'playground' && (
        <Section key="playground" id="playground" eyebrow="Live Lab" title="Live Coding Lab">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Experiment with tables, forms, and media elements in real-time!</p>
          <LiveEditor />
          <div className="card-actions" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project')}>Continue (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'project' && (
        <Section key="project" id="project" eyebrow="Mini Project" title="Event Registration Form">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Combine everything from Day 2 to build a comprehensive, beautiful registration form!</p>
          <div className="code-example-box" style={{ marginBottom: '2rem' }}>
            <div className="code-header">registration.html</div>
            <div className="code-content" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
              <div className="preview-pane" style={{ background: '#f9fafb', padding: '2rem', display: 'flex', justifyContent: 'center', borderLeft: 'none', borderBottom: '1px solid var(--surface-border)' }}>
                <div dangerouslySetInnerHTML={{ __html: projectCode }} style={{ width: '100%' }} />
              </div>
              <div className="code-pane" style={{ minWidth: 0, overflowX: 'auto' }}>
                <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(projectCode, Prism.languages.markup, 'markup') }} style={{ margin: 0 }}></pre>
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleContinue('quiz')}>Continue to Quiz (+20 XP)</button>
          </div>
        </Section>
      )}

      {activeTab === 'quiz' && (
        <Section key="quiz" id="quiz" eyebrow="Final Step" title="Day 2 Knowledge Check">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Let's see what you've learned about layouts, media, and forms!</p>
          <Quiz questions={day2QuizQuestions} />
        </Section>
      )}

    </AnimatePresence>
  );
}
