import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Section = ({ id, eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="learning-card"
  >
    <div style={{ marginBottom: '1.5rem' }}>
      <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function PowerBIDay1({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module1', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Getting Started" title="Introduction to Data Visualization">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>What is Data Visualization?</h3>
            <p>Data visualization is the graphical representation of information and data. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data.</p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6', marginBottom: '2rem' }}>
              <p style={{ margin: 0, color: '#1e293b' }}>Data visualization tools like <strong>Power BI</strong> improve and automate the visual communication process for accuracy and detail. It translates complex, high-volume, or numerical data into a visual representation that is much easier for humans to process and understand.</p>
            </div>

            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI-Powered Data Analytics Superpower
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                In this AI-powered masterclass, you don't just analyze data manually. You will learn how to use **ChatGPT and Microsoft Copilot** to formulate KPI definitions, automate Exploratory Data Analysis (EDA), and uncover hidden business insights in seconds!
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('analytics_vs_analysis')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'analytics_vs_analysis' && (
        <Section key="analytics_vs_analysis" id="analytics_vs_analysis" eyebrow="Terminology" title="Analytics vs Analysis">
          <div className="panel">
            <p style={{ marginBottom: '2rem' }}>These two terms are often used interchangeably, but they mean different things in the world of data.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                <h4 style={{ color: '#0369a1', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Data Analysis</h4>
                <p style={{ color: '#0f172a', fontWeight: 'bold', marginBottom: '1rem' }}>Looking at the Past ⏪</p>
                <p style={{ color: '#334155', fontSize: '0.95rem' }}>Extracting insights from historical data. It helps answer questions about what happened, why it happened, and what can be learned. (e.g., KPI reporting, sales trends)</p>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '1rem' }}><strong>Tools:</strong> Excel, SQL, Basic Power BI</p>
              </div>

              <div style={{ background: '#fdf4ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f5d0fe' }}>
                <h4 style={{ color: '#a21caf', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Data Analytics</h4>
                <p style={{ color: '#0f172a', fontWeight: 'bold', marginBottom: '1rem' }}>Looking at the Future ⏩</p>
                <p style={{ color: '#334155', fontSize: '0.95rem' }}>Using data for predictions and decision-making. It aims to make predictions, optimize processes, and drive strategic goals. (e.g., Predicting customer churn)</p>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '1rem' }}><strong>Tools:</strong> Python, R, TensorFlow</p>
              </div>

            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <img src="/images/analytics.png" alt="Data Analysis vs Analytics" style={{ maxWidth: '600px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('kpi_intro')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'kpi_intro' && (
        <Section key="kpi_intro" id="kpi_intro" eyebrow="Fundamentals" title="What is a KPI?">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Key Performance Indicators</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '1.1rem' }}>
              A <strong>KPI (Key Performance Indicator)</strong> is a measurable value that demonstrates how effectively a company is achieving key business objectives.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Why are KPIs important?</h4>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                  <li>They provide a quick summary of business health.</li>
                  <li>They help teams focus on what matters most.</li>
                  <li>In Power BI, they are often displayed as large numbers at the top of a dashboard (using Card visuals).</li>
                </ul>
              </div>

              <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Examples of KPIs</h4>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                  <li><strong>Sales:</strong> Total Revenue, Profit Margin, Customer Acquisition Cost.</li>
                  <li><strong>HR:</strong> Attrition Rate, Average Employee Tenure, Time to Hire.</li>
                  <li><strong>Marketing:</strong> Conversion Rate, Cost Per Click, Website Traffic.</li>
                </ul>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('data_types')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'data_types' && (
        <Section key="data_types" id="data_types" eyebrow="Foundations" title="Types of Data">
          <div className="panel">
            <p style={{ marginBottom: '2rem' }}>Before visualizing data, you must understand what kind of data you are dealing with. Data can be categorized in several different ways.</p>

            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>1. Based on Structure</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '2rem', color: '#475569', lineHeight: 1.8 }}>
              <li><strong>Structured Data:</strong> Highly organized in rows & columns (e.g., SQL tables, Excel sheets). <em>Power BI loves this!</em></li>
              <li><strong>Semi-Structured Data:</strong> Partially organized but lacks strict schema (e.g., JSON, XML).</li>
              <li><strong>Unstructured Data:</strong> No predefined format, very hard to analyze directly (e.g., Videos, Images, Social Media posts).</li>
            </ul>

            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <img src="/images/data_types.png" alt="Types of Data" style={{ maxWidth: '600px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            </div>

            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>2. Based on Measurement (Statistical)</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>Quantitative (Numerical) Data:</strong> Numbers used for calculations (Sales, Age).</p>
              <ul style={{ paddingLeft: '20px', marginBottom: '1rem', color: '#475569', fontSize: '0.95rem' }}>
                <li><em>Discrete:</em> Countable, no fractions (Number of employees).</li>
                <li><em>Continuous:</em> Any value in a range (Height, Weight, Prices).</li>
              </ul>
              
              <p style={{ marginBottom: '0.5rem' }}><strong>Qualitative (Categorical) Data:</strong> Groups or labels (Gender, Department).</p>
              <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '0.95rem' }}>
                <li><em>Nominal:</em> Categories without order (Eye color, Country).</li>
                <li><em>Ordinal:</em> Categories with a meaningful order (Ratings: Bad → Good).</li>
              </ul>
            </div>

            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>3. Based on Source & Time</h3>
            <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8 }}>
              <li><strong>Primary vs Secondary:</strong> Collected firsthand (Surveys) vs pre-collected (Government Reports).</li>
              <li><strong>Cross-Sectional vs Time Series:</strong> Collected at a single point in time vs collected over a period of time (Monthly Sales).</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('process')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'process' && (
        <Section key="process" id="process" eyebrow="Workflow" title="The Data Analysis Process">
          <div className="panel">
            
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>The Universal 5-Step Process</h3>
            <ol style={{ paddingLeft: '20px', lineHeight: 2, color: '#475569', marginBottom: '3rem', fontSize: '1.1rem' }}>
              <li><strong>Define Business Problem:</strong> What exactly are we trying to analyze or solve?</li>
              <li><strong>Collect Data:</strong> Gathering data from Excel, SQL databases, or APIs.</li>
              <li><strong>Clean & Prepare Data:</strong> Handling missing values, removing duplicates, formatting.</li>
              <li><strong>Analyze Data:</strong> Finding charts, trends, and correlations.</li>
              <li><strong>Visualize & Report:</strong> Creating final dashboards and sharing insights.</li>
            </ol>

            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>The Power BI Process</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <strong>1. Connect</strong> → Import data from multiple sources.
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <strong>2. Transform</strong> → Clean, prepare, and shape data (using Power Query).
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <strong>3. Model</strong> → Define relationships between tables & create DAX formulas.
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <strong>4. Visualize</strong> → Build interactive dashboards & reports.
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <strong>5. Publish & Deploy</strong> → Share via Power BI Service and manage enterprise solutions.
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('methods')}>Continue (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'methods' && (
        <Section key="methods" id="methods" eyebrow="Advanced" title="Methods & Stages">
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>The 5 Methods of Analysis</h3>
            
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
                <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>1. Descriptive Analysis</span> <br/>
                <em>What happened?</em> (e.g., Total sales this year)
              </div>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>2. Diagnostic Analysis</span> <br/>
                <em>Why did it happen?</em> (e.g., Why did sales drop last month?)
              </div>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
                <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>3. Predictive Analysis</span> <br/>
                <em>What will happen next?</em> (e.g., Future sales forecast based on trends)
              </div>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>4. Prescriptive Analysis</span> <br/>
                <em>What should we do?</em> (e.g., Offer discounts to high-churn risk customers)
              </div>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
                <span style={{ color: '#ec4899', fontWeight: 'bold' }}>5. Cognitive Analysis</span> <br/>
                <em>AI-powered recommendations</em> (e.g., Intelligent Chatbots for customer service)
              </div>
            </div>

            <div style={{ background: '#e0f2fe', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bae6fd' }}>
              <h4 style={{ color: '#0369a1', marginBottom: '1rem' }}>The 5 Levels of Data Handling</h4>
              <ol style={{ paddingLeft: '20px', margin: 0, color: '#0c4a6e', lineHeight: 1.8 }}>
                <li><strong>Data Collection</strong> (Gathering raw data)</li>
                <li><strong>Data Cleaning</strong> (Fixing errors and missing values)</li>
                <li><strong>Exploratory Data Analysis (EDA)</strong> (Discovering patterns)</li>
                <li><strong>Modeling</strong> (Applying algorithms)</li>
                <li><strong>Interpretation</strong> (Making decisions based on findings)</li>
              </ol>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Day 1 Assessment" title="Mini Project & Assignment">
          <div className="panel">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Mini Project</span>
                Define the Analysis Process
              </h3>
              <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}><strong>Scenario:</strong> A popular retail clothing store, "StyleHub", has noticed a 15% drop in sales over the last quarter. The CEO has handed you their sales database and asked you to figure out what is happening.</p>
              <p style={{ color: '#475569', marginBottom: '1rem' }}><strong>Task:</strong> Write a brief 5-step proposal outlining how you will tackle this using the universal Data Analysis process.</p>
              <ul style={{ color: '#475569', paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>Step 1: What is the specific business problem?</li>
                <li>Step 2: What data do you need to collect?</li>
                <li>Step 3: What might you need to clean?</li>
                <li>Step 4: What kind of analysis method will you use (Descriptive, Diagnostic, etc.)?</li>
                <li>Step 5: How will you present it?</li>
              </ul>
            </div>

            <div style={{ background: '#fffbeb', padding: '2rem', borderRadius: '12px', border: '1px solid #fde68a' }}>
              <h3 style={{ color: '#92400e', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#f59e0b', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Assignment</span>
                Data Detective
              </h3>
              <p style={{ color: '#92400e', marginBottom: '1.5rem' }}>Classify the following 5 data points based on their structure and measurement type.</p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                  <strong>1. A folder full of thousands of customer review emails.</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Structure (e.g. Unstructured)" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '200px' }} />
                  </div>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                  <strong>2. An Excel column containing Employee Ages (e.g., 25, 34, 42).</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Measurement (e.g. Numerical - Discrete)" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }} />
                  </div>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                  <strong>3. A SQL Database tracking daily transactions.</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Structure (e.g. Structured)" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '200px' }} />
                  </div>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                  <strong>4. Customer survey responses rating service from "Poor" to "Excellent".</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Measurement (e.g. Categorical - Ordinal)" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#f0fdf4', padding: '2rem', borderRadius: '12px', border: '1px solid #bbf7d0', marginTop: '2rem' }}>
              <h3 style={{ color: '#166534', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#22c55e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Practical Exercise</span>
                Dataset Analysis
              </h3>
              <p style={{ color: '#166534', marginBottom: '0.5rem' }}><strong>Dataset:</strong> Student Marks</p>
              <p style={{ color: '#166534', marginBottom: '1.5rem' }}><strong>Task:</strong> Go to <strong>Kaggle.com</strong> and search for a "Student Performance" or "Student Marks" dataset. Download the CSV file, import it into your analysis tool, and analyze the average, highest, and lowest scores across the class.</p>
              
              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #86efac' }}>
                <textarea placeholder="Write down your findings or the steps you took to find the average, highest, and lowest scores..." style={{ width: '100%', minHeight: '100px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', resize: 'vertical' }}></textarea>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Day 1 Completed!')}>Submit & Complete Day 1 🎉</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
