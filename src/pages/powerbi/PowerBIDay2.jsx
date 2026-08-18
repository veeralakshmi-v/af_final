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

export default function PowerBIDay2({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module2', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'what_why' && (
        <Section key="what_why" id="what_why" eyebrow="Introduction" title="What & Why PowerBI">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>What is Power BI?</h3>
            <p><strong>Power BI</strong> is a Business Intelligence (BI) tool created by Microsoft for analyzing and visualizing data.</p>
            <p style={{ marginBottom: '2rem' }}>It is a collection of software services, apps, and connectors that work together to turn your unrelated sources of data into coherent, visually immersive, and interactive insights.</p>
            
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Why use Power BI?</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.8, color: '#475569', marginBottom: '2rem' }}>
              <li><strong>Connects to multiple data sources:</strong> Excel, SQL databases, Cloud APIs, and web pages.</li>
              <li><strong>Performs real-time analysis:</strong> Stream data directly to dashboards.</li>
              <li><strong>Creates interactive dashboards:</strong> Visuals filter and slice each other dynamically.</li>
              <li><strong>Automates reports:</strong> Schedule data refreshes and email reports automatically.</li>
              <li><strong>AI Copilot Integration:</strong> Use natural language prompts to generate instant dashboards and reports.</li>
            </ul>

            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI Superpower: Microsoft Copilot & Q&A Visuals
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                Power BI is natively infused with AI! You can double-click on any empty report canvas and type in English: *"Show total revenue by country as a map"*. The AI Q&A engine instantly creates the interactive visual for you without manual drag-and-drop!
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6', marginBottom: '1rem' }}>
              <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>Key Features</h4>
              <p style={{ margin: 0, color: '#475569' }}>Interactive Report Authoring, DAX Data Analysis Functions, Flexible Tiles, Q&A Question Box, Help & Feedback Button, and Customizable Dashboards.</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('architecture')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'architecture' && (
        <Section key="architecture" id="architecture" eyebrow="The Blueprint" title="BI Architecture">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>What is Business Intelligence (BI)?</h3>
            <p style={{ marginBottom: '2rem' }}>At its core, Business Intelligence is the process of converting <strong>raw data</strong> into <strong>actionable insights</strong>.</p>

            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Power BI Architecture Overview</h3>
            
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b' }}>1. Data Sources</span>
                <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontSize: '0.9rem' }}>Excel files, SQL Databases, APIs, Web URLs.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b' }}>2. ETL (Extract, Transform, Load)</span>
                <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontSize: '0.9rem' }}>Power Query is used to clean and shape the incoming data.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b' }}>3. Data Modeling & DAX</span>
                <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontSize: '0.9rem' }}>Building relationships between tables and writing Data Analysis Expressions (DAX) for complex calculations.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b' }}>4. Visualization & Reports</span>
                <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontSize: '0.9rem' }}>Dragging and dropping charts to build the actual dashboard (Power BI Desktop).</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b' }}>5. Publishing & Sharing</span>
                <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontSize: '0.9rem' }}>Uploading the report to the Power BI Service (Cloud) to share with stakeholders.</p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('install_interface')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'install_interface' && (
        <Section key="install_interface" id="install_interface" eyebrow="Getting Set Up" title="Installation & Interface">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Installing Power BI Desktop</h3>
            <p>Power BI Desktop is a free application you install on your local computer that lets you connect to, transform, and visualize your data.</p>
            <ol style={{ paddingLeft: '20px', lineHeight: 1.8, color: '#475569', marginBottom: '2.5rem' }}>
              <li>Open the Microsoft Store on Windows 10/11.</li>
              <li>Search for "Power BI Desktop".</li>
              <li>Click "Install" or "Get".</li>
              <li>Launch the application once installed!</li>
            </ol>

            <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>The Power BI Interface</h3>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <img src="/images/powerbi_interface.png" alt="Power BI Interface" style={{ maxWidth: '500px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>1. The Ribbon</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0 }}>Located at the top, similar to Excel. Used to Get Data, Transform Data, add Text Boxes, and configure report settings.</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>2. Left Navigation Bar</h4>
                <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '0.95rem' }}>
                  <li><strong>Report View:</strong> The default canvas for building dashboards.</li>
                  <li><strong>Data View:</strong> Inspect raw data in a spreadsheet format.</li>
                  <li><strong>Model View:</strong> Build relationships between different tables.</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>3. The Right Panes</h4>
                <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '0.95rem' }}>
                  <li><strong>Data Pane (Fields):</strong> Shows all loaded tables and columns.</li>
                  <li><strong>Visualizations Pane:</strong> Select chart types and format them.</li>
                  <li><strong>Filters Pane:</strong> Apply conditions to slice the data.</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>4. The Canvas</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0 }}>The massive blank white space in the middle where you drag and drop visuals to build your report.</p>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('data_ops')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'data_ops' && (
        <Section key="data_ops" id="data_ops" eyebrow="Core Operations" title="Importing, Types & Refreshing">
          <div className="panel">
            <p style={{ marginBottom: '2rem' }}>Before building charts, you must bring data into the system, ensure it is formatted correctly, and set it up to update automatically.</p>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#3b82f6', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '0.9rem' }}>1</span>
                Importing Data
              </h3>
              <p style={{ color: '#475569', marginBottom: '0.5rem' }}>To bring data into Power BI:</p>
              <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8 }}>
                <li>Click <strong>Get Data</strong> on the Home ribbon.</li>
                <li>Select your source (Excel Workbook, Text/CSV, SQL Server, Web, etc.).</li>
                <li>Click <strong>Load</strong> to bring it directly into the Data model, OR click <strong>Transform Data</strong> to open Power Query Editor and clean it first.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#10b981', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '0.9rem' }}>2</span>
                Power BI Data Types
              </h3>
              <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Every column in Power BI must have a specific Data Type assigned so the engine knows how to aggregate or display it:</p>
              <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8 }}>
                <li><strong>Text:</strong> Standard text strings.</li>
                <li><strong>Whole Number / Decimal Number:</strong> For math operations (Sum, Average).</li>
                <li><strong>Date / Time / Date/Time:</strong> Crucial for Time Intelligence functions (e.g., Year-over-Year comparisons).</li>
                <li><strong>True/False:</strong> Boolean logic.</li>
              </ul>
              <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginTop: '1rem' }}>
                <p style={{ margin: 0, color: '#991b1b', fontSize: '0.9rem' }}><strong>Warning:</strong> If a column with numbers is accidentally formatted as "Text", Power BI will not allow you to sum or average it!</p>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#f59e0b', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '0.9rem' }}>3</span>
                Refreshing Data
              </h3>
              <p style={{ color: '#475569', marginBottom: '0.5rem' }}>When the source file (e.g., the underlying Excel sheet) is updated, Power BI does not update instantly. You must instruct it to refresh.</p>
              <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8 }}>
                <li><strong>Manual Refresh:</strong> Click the "Refresh" button on the Home ribbon in Power BI Desktop to fetch the latest data.</li>
                <li><strong>Scheduled Refresh:</strong> Once published to the Power BI Service (Cloud), you can configure a gateway to automatically refresh the dataset daily or hourly.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('charts')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'charts' && (
        <Section key="charts" id="charts" eyebrow="Visuals" title="Charts in PowerBI">
          <div className="panel">
            <p style={{ marginBottom: '2rem' }}>Power BI offers a vast array of built-in visuals. Here is a breakdown of the core categories you will use.</p>

            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Standard Charts</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '2rem', color: '#475569', lineHeight: 1.8 }}>
              <li><strong>Clustered Bar/Column Chart:</strong> Compares values across categories using horizontal/vertical bars.</li>
              <li><strong>Stacked Bar/Column Chart:</strong> Displays the contribution of each value to a total.</li>
              <li><strong>100% Stacked Chart:</strong> Represents values as percentages of a total.</li>
              <li><strong>Line Chart:</strong> Displays trends over time using connected data points.</li>
              <li><strong>Area Chart / Stacked Area:</strong> A line chart with the area underneath filled in.</li>
              <li><strong>Combo Chart (Line and Column):</strong> Combines a line and column chart for dual-axis comparisons.</li>
              <li><strong>Ribbon Chart:</strong> Visualizes rank changes over time.</li>
            </ul>

            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Specialized & Proportion Charts</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '2rem', color: '#475569', lineHeight: 1.8 }}>
              <li><strong>Pie & Donut Charts:</strong> Shows proportions using a circular graph (Donut has a hollow center).</li>
              <li><strong>Treemap:</strong> Uses nested rectangles to represent hierarchical data.</li>
              <li><strong>Waterfall Chart:</strong> Shows incremental positive and negative changes between a start and end value.</li>
              <li><strong>Scatter & Bubble Chart:</strong> Displays relationships between numerical values on a coordinate system.</li>
              <li><strong>Map & Filled Map (Choropleth):</strong> Plots geographical data and colors regions based on values.</li>
            </ul>

            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Data & Advanced Analytics</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '2rem', color: '#475569', lineHeight: 1.8 }}>
              <li><strong>Card & Multi-Row Card:</strong> Displays a single total or KPI value prominently.</li>
              <li><strong>Gauge Chart:</strong> Shows progress toward a goal using a circular dial.</li>
              <li><strong>Table & Matrix:</strong> Displays raw data in grids (Matrix supports expanding hierarchies).</li>
              <li><strong>Slicer:</strong> A visual filter placed directly on the canvas allowing users to click and refine data.</li>
              <li><strong>Decomposition Tree & Key Influencers:</strong> AI-powered tools that drill into details and identify factors affecting a metric.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment')}>Continue (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'assignment' && (
        <Section key="assignment" id="assignment" eyebrow="Day 2 Assessment" title="Mini Project & Assignment">
          <div className="panel">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Mini Project</span>
                Navigate the UI
              </h3>
              <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}><strong>Scenario:</strong> You've just been hired as a Data Analyst. Your manager asks you to set up your environment and verify you know how to use it.</p>
              <p style={{ color: '#475569', marginBottom: '1rem' }}><strong>Task:</strong> If you haven't already, install Power BI Desktop. Open a blank report and complete the following scavenger hunt:</p>
              <ul style={{ color: '#475569', paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>1. Find the <strong>Get Data</strong> button. Which ribbon tab is it on?</li>
                <li>2. Find the <strong>Visualizations Pane</strong>. Where is it located on the screen?</li>
                <li>3. Locate the <strong>Model View</strong> icon. Describe what it looks like.</li>
              </ul>
            </div>

            <div style={{ background: '#f0fdf4', padding: '2rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <h3 style={{ color: '#166534', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#22c55e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Assignment</span>
                Chart Selection Guide
              </h3>
              <p style={{ color: '#166534', marginBottom: '1.5rem' }}>Match the business scenario to the correct Power BI Chart type.</p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #86efac' }}>
                  <strong>1. Comparing total sales revenue across 5 different countries.</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }}>
                      <option>Select Chart Type...</option>
                      <option>Clustered Bar Chart</option>
                      <option>Line Chart</option>
                      <option>Pie Chart</option>
                    </select>
                  </div>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #86efac' }}>
                  <strong>2. Showing the monthly website traffic trend over the last year.</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }}>
                      <option>Select Chart Type...</option>
                      <option>Card Visual</option>
                      <option>Line Chart</option>
                      <option>Scatter Chart</option>
                    </select>
                  </div>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #86efac' }}>
                  <strong>3. Displaying a single, massive number for "Total Active Users".</strong>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }}>
                      <option>Select Chart Type...</option>
                      <option>Gauge Chart</option>
                      <option>Card Visual</option>
                      <option>Matrix</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#fef2f2', padding: '2rem', borderRadius: '12px', border: '1px solid #fca5a5', marginTop: '2rem' }}>
              <h3 style={{ color: '#991b1b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>Practical Exercise</span>
                Dataset Transformation
              </h3>
              <p style={{ color: '#991b1b', marginBottom: '0.5rem' }}><strong>Dataset:</strong> Superstore Sales</p>
              <p style={{ color: '#991b1b', marginBottom: '1.5rem' }}><strong>Task:</strong> Download the famous "Superstore Sales" dataset from <strong>Kaggle.com</strong>. Import the raw CSV or Excel file into Power BI. Use the Power Query Editor to clean and transform the data (e.g. check data types, rename columns) so it is ready for visualization.</p>
              
              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #f87171' }}>
                <textarea placeholder="List the specific transformation steps you applied to the Superstore Sales dataset..." style={{ width: '100%', minHeight: '100px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', resize: 'vertical' }}></textarea>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Day 2 Completed!')}>Submit & Complete Day 2 🎉</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
