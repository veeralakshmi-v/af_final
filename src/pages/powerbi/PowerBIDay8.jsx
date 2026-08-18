import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Sliders, Eye, Layers, Zap, CheckCircle, Palette, Sparkles, Brain, Radio, Terminal, FileText, FileCode2, Activity, Play, RefreshCw, BarChart2, Layout, Settings, Target } from 'lucide-react';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: '#0f172a' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function PowerBIDay8({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module8', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {/* 1. INTRO TAB */}
      {activeTab === 'intro_day8' && (
        <Section key="intro_day8" id="intro_day8" eyebrow="Day 8 Overview" title="AI, Scripting & Live Connections in Data Analytics">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)', padding: '2.5rem', borderRadius: '20px', color: 'white', marginBottom: '2.5rem', boxShadow: '0 10px 25px rgba(124, 58, 237, 0.25)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, color: '#f5f3ff', marginBottom: '1rem' }}>
                <Sparkles size={16} color="#a78bfa" /> Day 8 AI & Advanced Analytics
              </div>
              <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontWeight: 800 }}>Mastering AI-Powered Data Workflows</h3>
              <p style={{ fontSize: '1.1rem', color: '#e9d5ff', margin: 0, lineHeight: 1.7, maxWidth: '750px' }}>
                Welcome to the AI integration masterclass! Today, you will explore the 6 key pillars of AI in Data Analytics, learn Python scripting, and configure stock-market-style live API dashboard feeds.
              </p>
            </div>

            <div style={{ background: '#fffbeb', borderLeft: '5px solid #d97706', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', color: '#92400e' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🧠 The AI-Powered Analytics Advantage
              </h4>
              <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                Traditional manual data cleansing, dashboard structuring, and trend reporting take hours. By leveraging modern AI prompt engineering, machine learning visuals, and automated narratives, you can complete enterprise-grade BI pipelines at 10x speed.
              </p>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1.2rem' }}>The 6 Pillars of AI in Data Analytics:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {[
                { title: '📝 1. AI Prompt Engineering', desc: 'Mastering prompts to generate perfect DAX formulas, M-code scripts, and dashboard layouts.' },
                { title: '🧹 2. AI Data Cleaning', desc: 'Automating data transformations, splitting messy fields, and batch sentiment labeling.' },
                { title: '📐 3. AI Dashboard Creation', desc: 'Designing optimized visual layouts using wireframes and dynamic bookmarks.' },
                { title: '📊 4. AI Data Visualization', desc: 'Using Key Influencers and Decomposition Trees for instant root-cause analysis.' },
                { title: '📖 5. AI Report Generation', desc: 'Auto-generating dynamic summary narratives that update live with slicer filters.' },
                { title: '🔮 6. AI Insight Generation', desc: 'Predicting future sales with Forecasting and flagging anomalous pricing outliers.' }
              ].map((p, idx) => (
                <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #7c3aed' }}>
                  <strong style={{ color: '#6d28d9', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{p.title}</strong>
                  <span style={{ color: '#64748b', fontSize: '0.95rem' }}>{p.desc}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_prompt_engineering')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Start AI Masterclass &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 2. AI PROMPT ENGINEERING TAB */}
      {activeTab === 'ai_prompt_engineering' && (
        <Section key="ai_prompt_engineering" id="ai_prompt_engineering" eyebrow="AI Data Analytics • Pillar 1" title="AI Prompt Engineering for Business Intelligence">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Prompt Engineering is the foundation of working with Large Language Models (LLMs) like ChatGPT, Claude, and Gemini. As a data analyst, you can write precise instructions to get flawless DAX code, Power Query M-code, or visual layout wireframes.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', fontWeight: 800 }}>⚡ The Core Prompting Formula for Analysts</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', marginBottom: '0.3rem' }}>1. Define the Role</strong>
                  Tell the AI who it is (e.g. <em>"Act as an expert Power BI Developer..."</em>).
                </div>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', marginBottom: '0.3rem' }}>2. Explain the Schema</strong>
                  Provide exact table names and column descriptions.
                </div>
                <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#7c3aed', display: 'block', marginBottom: '0.3rem' }}>3. Set Clear Constraints</strong>
                  Specify what to avoid (e.g. <em>"Handle division-by-zero errors using DIVIDE..."</em>).
                </div>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 800 }}>📋 Copy-Pasteable AI Prompt Templates:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>Formula Builder: DAX Measure</strong>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 1rem 0' }}>Generate clean DAX calculations for MoM, YoY, or dynamic rankings.</p>
                <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: '180px', overflowY: 'auto' }}>
{`Act as an expert Power BI Developer.
I have a sales table named 'SalesData' with columns:
- 'OrderDate' (Date format)
- 'SalesAmount' (Numeric format)

Please write a DAX measure to calculate Month-over-Month (MoM) Sales Growth Percentage. If the previous month has no sales, handle it using the DIVIDE function to avoid division-by-zero errors. Explain the DAX formula step-by-step.`}
                </div>
              </div>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#7c3aed', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>Transformation Builder: Power Query M-Code</strong>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 1rem 0' }}>Generate advanced M-code script blocks for custom columns or splits.</p>
                <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: '180px', overflowY: 'auto' }}>
{`Act as an expert in Power Query M-code.
I have a column named 'ProductDetails' containing values like "Laptop_1200_Blue" and "Mouse_25_Black".
I need to split this column into three separate columns: [Product_Name], [Price] (Number), and [Color].
Write the M-code step to perform this transformation. Also, explain how to paste this in the Advanced Editor.`}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_data_cleaning')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: AI Data Cleaning &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 3. AI DATA CLEANING TAB */}
      {activeTab === 'ai_data_cleaning' && (
        <Section key="ai_data_cleaning" id="ai_data_cleaning" eyebrow="AI Data Analytics • Pillar 2" title="AI-Powered Data Cleaning & ETL Transformations">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Data cleaning is often the most time-consuming part of analytics. Using AI, you can generate M-code to split columns, format dates, remove null values, or even connect live API endpoints for batch text analysis.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              
              {/* Method 1: AI Prompted M-Code */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#7c3aed', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>
                  🧹 1. AI-Generated M-Code for ETL
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Simply prompt your web-based AI assistant to write M-code for column splitting, null replacements, or complex text formatting, then paste it directly into the <strong>Advanced Editor</strong> in Power Query.
                </p>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #7c3aed', fontSize: '0.85rem', color: '#475569' }}>
                  <strong>Key tip:</strong> Copy your query's initial steps (from the Advanced Editor) and paste them as context in ChatGPT so it fits your exact table format.
                </div>
              </div>

              {/* Method 2: Batch AI API Cleaning */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#2563eb', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>
                  🤖 2. Batch AI API Cleaning inside Power Query
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  For batch text processing (like scoring sentiment or categorizing 1,000 product reviews automatically), you can connect Power Query directly to the OpenAI API using a Blank Query:
                </p>
                <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '0.8rem', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'monospace', maxHeight: '160px', overflowY: 'auto' }}>
{`(ReviewText as text) =>
let
    ApiKey = "Bearer YOUR_OPENAI_API_KEY",
    Url = "https://api.openai.com/v1/chat/completions",
    Headers = [#"Content-Type" = "application/json", #"Authorization" = ApiKey],
    Payload = [
        model = "gpt-3.5-turbo",
        messages = {
            [role = "system", content = "Sentiment label only: Positive, Neutral, or Negative"],
            [role = "user", content = ReviewText]
        },
        temperature = 0
    ],
    Source = Json.Document(Web.Contents(Url, [Headers = Headers, Content = Json.FromValue(Payload)])),
    Result = Source[choices]{0}[message][content]
in
    Result`}
                </div>
              </div>

            </div>

            {/* Local Python Text Processing */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🐍 3. Offline Local AI Cleaning using Python & TextBlob
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                If you want free, unlimited AI calculations without paying for API keys, you can run a local Python sentiment model right inside the Power Query transformation engine (requires <code>pip install textblob</code>):
              </p>
              <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '1.2rem', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre' }}>
{`# 1. Open Power Query -> Transform tab -> Run Python Script
# 2. Paste the following script:
from textblob import TextBlob

# Apply polarity score (-1 to +1) to clean and score text data
dataset['Sentiment_Score'] = dataset['ReviewText'].apply(lambda x: TextBlob(str(x)).sentiment.polarity)`}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_dashboard_creation')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: AI Dashboard Creation &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 4. AI DASHBOARD CREATION TAB */}
      {activeTab === 'ai_dashboard_creation' && (
        <Section key="ai_dashboard_creation" id="ai_dashboard_creation" eyebrow="AI Data Analytics • Pillar 3" title="AI Dashboard Creation & Visual Layout Strategy">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Creating a production-ready dashboard requires organizing charts and KPIs in a structured layout that guides the viewer's eyes. You can prompt AI to generate a UI/UX wireframe plan before building.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              
              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>
                  📐 AI recommended Layout Grid
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Executives read reports in a Z-Pattern. Place items accordingly:
                  <br/>• <strong>Top Row:</strong> Global Slicers and high-level KPI cards (Sales, Profit, Orders).
                  <br/>• <strong>Middle Row:</strong> Temporal trend charts (Line chart) and categorical bar charts.
                  <br/>• <strong>Bottom Row:</strong> Detailed drill-down transactional tables and data export buttons.
                </p>
              </div>

              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#7c3aed', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>
                  📋 Prompt for Visual Layout Strategy
                </h4>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                  Paste this into ChatGPT to map out your dashboard design:
                </p>
                <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '0.8rem', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`Act as a UI/UX expert specialized in Power BI dashboard design.
I am building a Sales Dashboard. My main metrics are: Revenue, Profit Margin, and Order Volume.
Please suggest a clean visual grid layout, a corporate color scheme, and recommend the best chart types for each visual.`}
                </div>
              </div>

            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2rem', borderRadius: '16px', color: '#1e3a8a', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#1e40af', margin: '0 0 1rem 0', fontWeight: 800 }}>⚡ Advanced Dashboard Interactivity</h3>
              <p style={{ fontSize: '1rem', lineHeight: 1.6, margin: '0 0 1.2rem 0' }}>
                Make your dashboards dynamic and engaging by configuring bookmarks, buttons, and synchronized slicers:
              </p>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
                <li><strong>Bookmarks & Buttons:</strong> Capture the state of your visual filters, hide/show specific charts, and map them to interactive buttons (e.g. creating a Toggle Button to switch between a Bar Chart and a Table View).</li>
                <li><strong>Sync Slicers:</strong> Keep your filters synchronized across multiple pages of your report so the user does not have to re-select categories when navigating pages.</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_data_visualization')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: AI Data Visualization &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 5. AI DATA VISUALIZATION TAB */}
      {activeTab === 'ai_data_visualization' && (
        <Section key="ai_data_visualization" id="ai_data_visualization" eyebrow="AI Data Analytics • Pillar 4" title="Power BI Built-in AI Data Visualization Visuals">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Power BI Desktop provides advanced, local machine learning calculations out-of-the-box. You don't need any Python code or premium Azure workspace to unlock these smart visuals:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              
              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#7c3aed', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>
                  🔑 Key Influencers
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  Runs local regression models to explain correlation metrics (e.g., *what factors cause product sales to increase?*). Drag the target column to "Analyze" and potential driver fields to "Explain by" to automatically rank correlations.
                </p>
              </div>

              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#7c3aed', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>
                  🌳 Decomposition Tree
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  A root-cause tree analyzer. Click the lightbulb icon to find the dimension contributing the highest or lowest variance. Users can dynamically choose how they expand and drill down categories.
                </p>
              </div>

            </div>

            {/* Q&A Synonym Setup */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                💬 Q&A Visual & Data Model Synonym Settings
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                The Q&A Visual lets users ask natural language questions (e.g. <em>"Show total sales by category in a pie chart"</em>) and automatically generates that visual. To make it smart, map your data model's column names to common synonyms:
              </p>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #7c3aed', fontSize: '0.92rem', lineHeight: 1.6 }}>
                <strong>How to configure synonyms:</strong>
                <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: 0 }}>
                  <li>Go to the **Model View** (left-hand sidebar panel in Power BI).</li>
                  <li>Click on a table (e.g. `Customers`) and expand the **Properties Pane** on the right.</li>
                  <li>Click **Synonyms** to expand the synonyms manager.</li>
                  <li>Under the `CustomerName` field, type common equivalents: <code>client, buyer, subscriber, account</code>.</li>
                  <li>Now, if a user types *"Sales by buyer"*, Q&A will map "buyer" to the `CustomerName` column and return the correct chart!</li>
                </ol>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_report_generation')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: AI Report Generation &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 6. AI REPORT GENERATION TAB */}
      {activeTab === 'ai_report_generation' && (
        <Section key="ai_report_generation" id="ai_report_generation" eyebrow="AI Data Analytics • Pillar 5" title="AI Report Generation & Smart Narratives">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Smart Narratives automatically build a text summary description of your dataset. To make it a true executive briefing tool, you can insert dynamic calculations directly inside the text paragraph.
            </p>

            {/* Smart Narratives Dynamic Value */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📝 Inserting Dynamic Calculated Variables in Reports
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Instead of just displaying static numbers, let the text change when a user clicks dashboard slicers:
              </p>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #7c3aed', fontSize: '0.92rem', lineHeight: 1.6 }}>
                <strong>Steps to add dynamic variables inside report text:</strong>
                <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: 0 }}>
                  <li>Double-click inside the Smart Narrative text block where you want to add a live number.</li>
                  <li>Click the <strong style={{ color: '#7c3aed' }}>+ Value</strong> button in the formatting pop-up.</li>
                  <li>In the query input box, write a simple question or a DAX measure name (e.g. <code>Total Sales MoM %</code>).</li>
                  <li>Name the variable (e.g. <code>GrowthMetric</code>) and click **Save**.</li>
                  <li>The value is now styled inside your text and updates dynamically whenever page filters or slicers are clicked!</li>
                </ol>
              </div>
            </div>

            {/* Enterprise Standards */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0' }}>🔒 Row-Level Security (RLS) & Sharing Standards</h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Configure Row-Level Security (RLS) to ensure regional managers only view data relevant to their market:
                <br/>• **Configure Roles:** Go to Modeling &rarr; Manage Roles, and define DAX filters (e.g. <code>[Region] = "East"</code>).
                <br/>• **Test Security:** Click **View As** inside Desktop to view report as a specific role.
                <br/>• **Publish to Cloud:** Share report via Power BI Service and map Active Directory groups to roles.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('ai_insight_generation')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: AI Insight Generation &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 7. AI INSIGHT GENERATION TAB */}
      {activeTab === 'ai_insight_generation' && (
        <Section key="ai_insight_generation" id="ai_insight_generation" eyebrow="AI Data Analytics • Pillar 6" title="AI Insight Generation & Predictive Analytics">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              AI Insight Generation goes beyond describing what happened in the past. It automatically flags anomalies, details the root cause of spikes, and models predictions of future values.
            </p>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📈 Outliers (Anomalies) & Forecasts via the Analytics Pane
              </h3>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Create a <strong>Line Chart</strong> with a Date on the X-axis and Sales on the Y-axis, then open the **Analytics Pane** (represented by a magnifying glass icon next to formatting options):
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#1e3a8a', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎯 Find Outliers (Add Anomaly)</strong>
                  <span style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Toggle **Find Anomalies** to On. Power BI calculates expected standard deviations. Points outside the boundary are marked. Hovering over a dot shows an AI explanation box explaining what dimensions caused the spike (e.g. *"90% of the anomaly was driven by Product category 'Electronics'"*).
                  </span>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#1e3a8a', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🔮 Run Predictive Models (Forecast)</strong>
                  <span style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Toggle **Forecast** to On. Select how many intervals to project (e.g. 14 Days), input seasonality adjustments (e.g. 7 days for weekly peaks), and set confidence intervals (e.g. 95%). Power BI draws a shaded range predicting future values.
                  </span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('python_powerbi')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Python Scripting &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 8. PYTHON IN POWER BI TAB */}
      {activeTab === 'python_powerbi' && (
        <Section key="python_powerbi" id="python_powerbi" eyebrow="Advanced Scripting" title="Integrating Python with Power BI">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Python can be integrated into Power BI to load, transform, and visualize data. Even without deep Python programming knowledge, you can use basic scripts to expand your dashboard capabilities.
            </p>

            {/* Beginner-friendly Python library foundations */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '2.5rem', borderRadius: '20px', marginBottom: '3rem', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)' }}>
              <h3 style={{ color: '#38bdf8', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🎓 Python Library Foundations (For Data Analysts)
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                If you have never coded in Python before, don't worry! Power BI uses Python behind the scenes to process spreadsheets and draw charts. To do this, it relies on two essential helper packages (called "libraries"):
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <strong style={{ color: '#38bdf8', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🐼 1. Pandas (The Spreadsheet Engine)</strong>
                  <span style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    In Python, spreadsheets are called <strong>DataFrames</strong>. Pandas is the library that lets Python read, filter, and modify tables. Think of Pandas as an invisible Excel engine running inside your code.
                  </span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <strong style={{ color: '#a855f7', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📊 2. Matplotlib (The Drawing Canvas)</strong>
                  <span style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    This is Python's charting library. It lets you plot points, lines, bars, and grids. Matplotlib acts as the virtual paint brush that draws the charts which Power BI displays on your report canvas.
                  </span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <strong style={{ color: '#4ade80', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>✨ 3. Seaborn (The Visual Beautifier)</strong>
                  <span style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Seaborn is built on top of Matplotlib. It automatically adds clean color palettes, professional grid lines, and premium styling to your charts with zero extra effort.
                  </span>
                </div>
              </div>

              {/* Step-by-Step Installation */}
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
                <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '0.6rem', fontSize: '1.05rem' }}>⚡ Quick Setup: Installing Libraries on Your PC</strong>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                  Before writing Python in Power BI, you must install Python on your computer and download these libraries.
                </p>
                <ol style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.2rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
                  <li>Open your computer's <strong>Command Prompt</strong> (on Windows, search for <code>cmd</code> in the start menu).</li>
                  <li>Type or paste the following command and press Enter:</li>
                </ol>
                <div style={{ background: '#090d16', color: '#4ade80', padding: '0.8rem 1.2rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid #1e293b' }}>
                  pip install pandas matplotlib seaborn
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>
                  Once finished, open Power BI and ensure Python is enabled under <strong>File &rarr; Options and Settings &rarr; Options &rarr; Python scripting</strong>.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
              
              {/* Load Data Section */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: '#0f172a', fontSize: '1.3rem', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🐍 1. Python as a Data Source (Load Data)
                  </h4>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                    Instead of importing an Excel or CSV file, you can write a simple Python script to create data. Power BI runs the script and loads the result as a standard table!
                  </p>
                  
                  <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '1.2rem', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre', marginBottom: '1.2rem' }}>
{`# 1. Define raw data records (Python Dictionary)
sales_records = {
    'Product': ['Laptop', 'Mouse', 'Keyboard'],
    'Sales': [1200, 25, 75],
    'Quantity': [5, 12, 8]
}

# 2. Import the Pandas library
import pandas as pd

# 3. Convert records into a spreadsheet-like table
df = pd.DataFrame(sales_records)`}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #7c3aed', fontSize: '0.88rem', color: '#334155' }}>
                  <strong>🔍 Line-by-Line Explanation:</strong>
                  <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                    <li><code>sales_records = ...</code>: Creates a structured set of columns and rows in Python memory.</li>
                    <li><code>import pandas as pd</code>: Loads the Pandas library and nicknames it <code>pd</code> to save typing.</li>
                    <li><code>df = pd.DataFrame(sales_records)</code>: Converts our raw data into a formatted table (DataFrame) called <code>df</code>. Power BI will detect <code>df</code> and load it as a table!</li>
                  </ul>
                </div>
              </div>

              {/* Transformations Section */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: '#0f172a', fontSize: '1.3rem', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    ⚙️ 2. Python for Transformations
                  </h4>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                    Inside Power Query, you can click <strong>Run Python Script</strong>. Power BI automatically feeds your current table into a variable named <code>dataset</code>.
                  </p>
                  
                  <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '1.2rem', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre', marginBottom: '1.2rem' }}>
{`# Power BI automatically preloads:
# dataset = pandas.DataFrame(...)

# Create a new column named 'Double_Quantity'
# by multiplying the 'Quantity' column by 2
dataset['Double_Quantity'] = dataset['Quantity'] * 2`}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #7c3aed', fontSize: '0.88rem', color: '#334155' }}>
                  <strong>🔍 Line-by-Line Explanation:</strong>
                  <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0 0 0', lineHeight: 1.5 }}>
                    <li><code>dataset</code>: The automatic name Power BI gives to your active table. It is already a Pandas DataFrame.</li>
                    <li><code>dataset['Double_Quantity'] = ...</code>: Tells Python to create a brand new column named <code>Double_Quantity</code> in our spreadsheet.</li>
                    <li><code>dataset['Quantity'] * 2</code>: Selects the existing <code>Quantity</code> column, multiplies every number by 2, and saves it into the new column.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Python Visuals */}
            <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '20px', border: '1px solid #cbd5e1', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
                📊 3. Building Python Visuals (Matplotlib & Seaborn)
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '1rem', marginBottom: '1.5rem' }}>
                You can drag a <strong>Python Visual</strong> onto your report canvas. Drag the fields you want to plot (like Sales and Profit) into the values section, and write a simple script:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#0f172a', color: '#a5d6ff', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre' }}>
{`# 1. Import drawing and styling libraries
import matplotlib.pyplot as plt
import seaborn as sns

# 2. Apply a clean, modern Seaborn visual theme
sns.set_theme(style="whitegrid")

# 3. Create a scatter plot comparing Sales vs Profit
sns.scatterplot(data=dataset, x='Sales', y='Profit', color='purple', s=100)

# 4. Add customized labels and title
plt.title('Sales vs Profit Analysis', fontsize=14, fontweight='bold')
plt.xlabel('Total Sales ($)', fontsize=12)
plt.ylabel('Net Profit ($)', fontsize=12)

# 5. Tell Power BI to draw the plot on screen
plt.show()`}
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.92rem', color: '#334155' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.8rem' }}>🔍 Line-by-Line Visual Script Explanation:</strong>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                    <li><code>import matplotlib.pyplot as plt</code>: Loads the core Matplotlib graphing engine and nicknames it <code>plt</code>.</li>
                    <li><code>import seaborn as sns</code>: Loads Seaborn for prettier, modern-looking charts and nicknames it <code>sns</code>.</li>
                    <li><code>sns.set_theme(...)</code>: Changes the graph styling from default grey to a clean, executive white grid.</li>
                    <li><code>sns.scatterplot(...)</code>: Plots our data points. <code>data=dataset</code> reads our columns, <code>x='Sales'</code> and <code>y='Profit'</code> set the axes, <code>color='purple'</code> sets dot colors, and <code>s=100</code> increases dot sizes.</li>
                    <li><code>plt.title(...) / plt.xlabel(...)</code>: Customizes the labels with professional font sizing and weights.</li>
                    <li><code>plt.show()</code>: <strong>Crucial final step!</strong> This command takes the drawing we built and renders it as an image inside our Power BI report canvas.</li>
                  </ul>
                </div>
              </div>

              <div style={{ background: '#fffbeb', borderLeft: '5px solid #d97706', padding: '1.2rem', borderRadius: '8px', color: '#b45309', fontSize: '0.95rem' }}>
                <strong>⚠️ Note:</strong> To make Python scripting work, you must have Python installed on your PC. In Power BI, go to <strong>File &rarr; Options and Settings &rarr; Options &rarr; Python scripting</strong> and make sure the directory matches your local installation path.
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('live_connections')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Live Connections &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 9. LIVE CONNECTIONS & DIRECTQUERY TAB */}
      {activeTab === 'live_connections' && (
        <Section key="live_connections" id="live_connections" eyebrow="Enterprise Data Architecture" title="Storage Modes: Import, DirectQuery & Live Connection">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              When connecting to database servers or online web links, Power BI offers different <strong>Storage Modes</strong>. Selecting the right connection mode determines if your dashboard is static or updates live in real-time.
            </p>

            {/* Comparison Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1', borderTop: '5px solid #3b82f6' }}>
                <h4 style={{ color: '#1e40af', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>📥 1. Import Mode</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Loads a snapshot copy of the data directly into Power BI's memory. Fast visual speeds, but requires manual or scheduled refresh to update.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>🚀 **Performance:** Fastest (data is inside RAM).</li>
                  <li>🔄 **Freshness:** Static until refresh is triggered.</li>
                  <li>⚖️ **Limits:** 1 GB file size limit for Pro accounts.</li>
                </ul>
              </div>

              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1', borderTop: '5px solid #f59e0b' }}>
                <h4 style={{ color: '#b45309', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>⚡ 2. DirectQuery Mode</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  No data is saved in Power BI. Every time a user interacts with a visual or clicks a filter, Power BI queries the live database source directly.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>🚀 **Performance:** Depends on the backend database's speed.</li>
                  <li>🔄 **Freshness:** 100% live and real-time.</li>
                  <li>⚖️ **Limits:** Perfect for massive database datasets.</li>
                </ul>
              </div>

              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1', borderTop: '5px solid #10b981' }}>
                <h4 style={{ color: '#047857', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>🔗 3. Live Connection</h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Connects to a pre-built centralized semantic model already published in the cloud (Power BI Service) or Analysis Services.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  <li>🚀 **Performance:** Very fast (uses cloud server compute).</li>
                  <li>🔄 **Freshness:** Live connection to central shared models.</li>
                  <li>⚖️ **Limits:** Report layout only (no new table additions allowed).</li>
                </ul>
              </div>
            </div>

            {/* Comparison Table */}
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.2rem 1.5rem', borderBottom: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>Storage Mode Matrix</h4>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 'bold', color: '#475569' }}>Feature</th>
                    <th style={{ padding: '12px 16px', fontWeight: 'bold', color: '#1e40af' }}>Import Mode</th>
                    <th style={{ padding: '12px 16px', fontWeight: 'bold', color: '#b45309' }}>DirectQuery</th>
                    <th style={{ padding: '12px 16px', fontWeight: 'bold', color: '#047857' }}>Live Connection</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>Data Location</td>
                    <td style={{ padding: '12px 16px', color: '#1e40af' }}>Power BI Memory (RAM)</td>
                    <td style={{ padding: '12px 16px', color: '#b45309' }}>Source Database Engine</td>
                    <td style={{ padding: '12px 16px', color: '#047857' }}>Analysis Services / Cloud Model</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>Query Performance</td>
                    <td style={{ padding: '12px 16px', color: '#1e40af' }}>⚡ Instantaneous (In-Memory)</td>
                    <td style={{ padding: '12px 16px', color: '#b45309' }}>🐢 Variable (Depends on DB Server)</td>
                    <td style={{ padding: '12px 16px', color: '#047857' }}>⚡ Fast (Offloaded Engine)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>Max File Size</td>
                    <td style={{ padding: '12px 16px', color: '#1e40af' }}>Limited (1GB / 100GB)</td>
                    <td style={{ padding: '12px 16px', color: '#b45309' }}>Unlimited (Petabytes)</td>
                    <td style={{ padding: '12px 16px', color: '#047857' }}>Unlimited (Central Server handles)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* How to Build Live Dashboard & Live Links */}
            <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', color: '#1e3a8a' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem', color: '#1d4ed8', fontWeight: 800 }}>
                🔗 Step-by-Step: Build a Live Dashboard
              </h4>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#1e3a8a' }}>
                Follow these exact steps to connect to a live dataset and configure it to auto-refresh dynamically without user interaction:
              </p>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', color: '#334155', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                <strong>Step 1: Obtain a Live Web Link</strong><br/>
                We will use the following live links for practice (we have provided alternatives in case one is blocked by your local network):
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0 1rem 0' }}>
                  <li>
                    <strong>Standard File Live Link (Excel):</strong><br/>
                    • Option A (Official MS Direct): <a href="https://go.microsoft.com/fwlink/?LinkID=521962" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>Microsoft Financial Sample Link</a><br/>
                    • Option B (Github Raw): <a href="https://raw.githubusercontent.com/pjfanning/excel-streaming-reader-sample/main/Sample-Sales-Data.xlsx" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>Github Sample Sales Excel URL</a>
                  </li>
                  <li style={{ marginTop: '0.8rem' }}>
                    <strong>Real-Time API Live Link (JSON):</strong><br/>
                    • Option A (Coinbase Crypto Ticker): <a href="https://api.exchange.coinbase.com/products/BTC-USD/ticker" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>Coinbase BTC Ticker API URL</a> (updates live!)<br/>
                    • Option B (Binance Crypto Ticker): <a href="https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>Binance BTC Price API URL</a> (updates live!)
                  </li>
                </ul>

                <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1rem', borderRadius: '8px', marginTop: '1rem', color: '#92400e', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  📈 <strong>Share Market Style Real-Time Tickers:</strong> Unlike static Excel spreadsheets, the JSON API links above are live financial market feeds. They update <strong>second-by-second</strong> with live trades. Connecting Power BI to these URLs allows you to observe real-time chart movements whenever a page refresh is triggered!
                </div>

                <strong>Step 2: Connect Power BI to the Live Web Link</strong>
                <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                  <li>Open Power BI Desktop. In the Home tab ribbon, click <strong>Get Data &rarr; Web</strong>.</li>
                  <li>Paste the live API link or file URL above, and click <strong>OK</strong>.</li>
                  <li>Select the tables you wish to import, click <strong>Load</strong>.</li>
                </ol>

                <strong>Step 3: Turn on Automatic Page Refresh (APR)</strong>
                <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                  <li>Design your charts (e.g. Card visual representing Bitcoin price, and Bar chart for sales).</li>
                  <li>Click on the empty canvas background so no visuals are selected.</li>
                  <li>Open the <strong>Format Page Pane</strong> (the paint roller icon).</li>
                  <li>Scroll down and toggle <strong>Page Refresh</strong> to <strong>On</strong>.</li>
                  <li>Set the refresh frequency interval (e.g. <strong>Every 5 seconds</strong>). Now your dashboard will automatically query the live link and update in real-time on the screen!</li>
                </ol>

                <strong>Step 4: Publish to Power BI Service</strong>
                <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: 0 }}>
                  <li>Click <strong>Publish</strong> to upload the dashboard to your cloud workspace.</li>
                  <li>In the Power BI Cloud Service, go to your dataset settings.</li>
                  <li>Configure credentials and set up **Scheduled Refresh** (daily or hourly) so the dashboard continues to fetch data live in the cloud.</li>
                </ol>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment_day8')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Day 8 Mini Project &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 10. ASSIGNMENT TAB */}
      {activeTab === 'assignment_day8' && (
        <Section key="assignment_day8" id="assignment_day8" eyebrow="Day 8 Practice" title="Day 8 Mini Project: AI & Advanced Analytics">
          <div className="panel">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🏆 Your Day 8 Assignment Mission
              </h3>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Take your interactive dashboard design to the next level by building advanced AI metrics, live stock-like connections, and diagnostics:
              </p>

              <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={22} color="#10b981" />
                  <span style={{ color: '#334155', fontSize: '0.95rem' }}><strong>Step 1: Real-Time API Dashboard:</strong> Connect to Coinbase or Binance live ticker API using Get Data &rarr; Web, and configure Automatic Page Refresh (APR) to update every 5 seconds.</span>
                </div>

                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={22} color="#10b981" />
                  <span style={{ color: '#334155', fontSize: '0.95rem' }}><strong>Step 2: Analytics Pane Features:</strong> Create a daily pricing line chart, go to the Analytics pane, and enable 14-day forecasting and anomaly markers.</span>
                </div>

                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={22} color="#10b981" />
                  <span style={{ color: '#334155', fontSize: '0.95rem' }}><strong>Step 3: Smart Narrative Custom Metrics:</strong> Insert a Smart Narrative visual, click `+ Value`, and build custom calculated text variables.</span>
                </div>

                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={22} color="#10b981" />
                  <span style={{ color: '#334155', fontSize: '0.95rem' }}><strong>Step 4: RLS Security:</strong> Set up a Role based on a specific territory (e.g. Region = "East") and test it using View As.</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)', padding: '3rem', borderRadius: '24px', color: 'white', boxShadow: '0 15px 35px rgba(124, 58, 237, 0.25)' }}>
              <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontWeight: 800 }}>Ready for Your Final Capstone Projects?</h3>
              <p style={{ color: '#e9d5ff', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                You have completed the entire Power BI software training! Now it's time to build your professional portfolio by working on the Day 9 real-world Capstone projects.
              </p>
              <button className="btn btn-primary" onClick={() => onNavigate('powerbi_module9', 'ai_retail_capstone')} style={{ padding: '1.1rem 2.8rem', fontSize: '1.15rem', background: '#facc15', borderColor: '#facc15', color: '#0f172a', fontWeight: 800, borderRadius: '30px', boxShadow: '0 4px 15px rgba(250, 204, 21, 0.4)' }}>
                Proceed to Day 9: Final AI Projects 🚀
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
