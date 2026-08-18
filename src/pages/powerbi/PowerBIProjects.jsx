import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Target, CheckCircle, Database, Layout, Store, PenTool, BarChart3, TrendingUp, Activity, Download, Zap } from 'lucide-react';
import LiveDashboard from '../dashboards/LiveDashboard';
import Project1Dashboard from '../dashboards/Project1Dashboard';
import Project2Dashboard from '../dashboards/Project2Dashboard';
import Project3Dashboard from '../dashboards/Project3Dashboard';

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

export default function PowerBIProjects({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module9', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {(activeTab === 'ai_retail_capstone' || activeTab === 'bytemart_demo') && (
        <Section key="ai_retail_capstone" id="ai_retail_capstone" eyebrow="Day 9 Live Interactive Capstone" title="AI-Powered 360° Tech Retail & E-Commerce Analytics">
          <div className="panel" style={{ padding: '0', marginBottom: '2rem' }}>
            <LiveDashboard />
          </div>

          <div className="panel">
            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 Day 9 AI Capstone Requirement
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                In this final capstone, you must incorporate **at least 2 AI Native Visuals** (Key Influencers or Smart Narratives) and use **Microsoft Copilot or ChatGPT** to optimize your DAX performance!
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>How to Build This Dashboard</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '1.1rem' }}>
              <strong>Scenario:</strong> You are analyzing tech retail and e-commerce sales for a high-growth consumer electronics brand. Follow these steps to build the 4-page executive AI dashboard above.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#eff6ff', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Database size={24} color="#3b82f6" />
                  <h3 style={{ margin: 0, color: '#1e3a8a', fontSize: '1.25rem' }}>Step 1: Data Acquisition</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Click the <strong>Download Tech Retail Dataset (CSV)</strong> button at the top of the dashboard to download <code>tech_retail_ai_dataset.csv</code>.</li>
                    <li>Open Power BI Desktop, click <strong>Get Data</strong>, and load the CSV file.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f5f3ff', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PenTool size={24} color="#8b5cf6" />
                  <h3 style={{ margin: 0, color: '#4c1d95', fontSize: '1.25rem' }}>Step 2: Power Query (Data Cleaning)</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Open the Power Query Editor.</li>
                    <li>Ensure data types are correct: Dates for `Order Date`, Fixed Decimal for `Revenue`, `Cost`, and `Profit`.</li>
                    <li>Create a custom column to extract the 'Month' from the Order Date to enable the dropdown slicer.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f0fdf4', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Target size={24} color="#10b981" />
                  <h3 style={{ margin: 0, color: '#14532d', fontSize: '1.25rem' }}>Step 3: Data Modeling & DAX</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <p style={{ color: '#475569', marginBottom: '1rem' }}>Create these core DAX measures to recreate the KPIs in the dashboard:</p>
                  <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
                    <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#0f172a' }}>
                      <strong style={{ color: '#0284c7' }}>Total Revenue</strong> = SUM(Sales[Revenue])
                    </li>
                    <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#0f172a' }}>
                      <strong style={{ color: '#0284c7' }}>Total Profit</strong> = SUM(Sales[Profit])
                    </li>
                    <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#0f172a' }}>
                      <strong style={{ color: '#0284c7' }}>Profit Margin %</strong> = DIVIDE([Total Profit], [Total Revenue], 0)
                    </li>
                    <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#0f172a' }}>
                      <strong style={{ color: '#0284c7' }}>Total Orders</strong> = DISTINCTCOUNT(Sales[OrderID])
                    </li>
                    <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#0f172a' }}>
                      <strong style={{ color: '#0284c7' }}>Total Units Sold</strong> = SUM(Sales[Quantity])
                    </li>
                    <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', color: '#0f172a' }}>
                      <strong style={{ color: '#0284c7' }}>Average Order Value</strong> = DIVIDE([Total Revenue], [Total Orders], 0)
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#fffbeb', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Layout size={24} color="#d97706" />
                  <h3 style={{ margin: 0, color: '#92400e', fontSize: '1.25rem' }}>Step 4: Dashboard Visualization</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Recreate the 4 pages using standard visuals: Area Charts for trends, Bar Charts for categories, and Pie Charts for proportions.</li>
                    <li>Add Slicers (like the Month dropdown) to allow the user to filter the data interactively.</li>
                    <li>Use shapes and text boxes to create a clean header navigation.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <div className="card-actions" style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => handleContinue('project1')}>Next Project: Sales Dashboard</button>
          </div>
        </Section>
      )}

      {activeTab === 'project1' && (
        <Section key="project1" id="project1" eyebrow="Project 2: AI Capstone" title="AI E-Commerce Sales Executive Dashboard">
          <div className="panel" style={{ padding: '0', marginBottom: '2rem' }}>
            <Project1Dashboard />
          </div>
          
          <div className="panel">
            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI Project Superpower: Key Influencers & ChatGPT DAX
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                In this capstone, you will use **ChatGPT/Copilot** to write your year-over-year DAX time-intelligence formulas. You must also embed an **AI Key Influencers Visual** on Page 2 to discover what customer demographics and payment methods drive high-value orders over $500!
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>How to Build This AI Dashboard</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '1.1rem' }}>
              <strong>Scenario:</strong> A regional e-commerce company needs an AI-infused dashboard for their executive team to track sales performance, identify top-selling categories, and predict seasonal growth spikes.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#eff6ff', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Database size={24} color="#3b82f6" />
                  <h3 style={{ margin: 0, color: '#1e3a8a', fontSize: '1.25rem' }}>1. Data Preparation (Power Query AI)</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Download the <a href="https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce" target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Brazilian E-Commerce Public Dataset by Olist</a> from Kaggle. Import the relevant raw CSV files.</li>
                    <li>Clean column names and use Power Query's **Column From Examples (AI)** to extract clean State and City abbreviations without typing manual formulas.</li>
                    <li>Fix data types (ensure dates are actual Dates, and currency is Decimal/Fixed Decimal).</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f5f3ff', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Target size={24} color="#8b5cf6" />
                  <h3 style={{ margin: 0, color: '#4c1d95', fontSize: '1.25rem' }}>2. Data Modeling & ChatGPT DAX</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Create a **Star Schema** connecting your Sales table to Products, Customers, and a dedicated Date table using Power BI's **AI Autodetect Relationships**.</li>
                    <li>Use ChatGPT/Copilot to generate clean DAX measures: <code>Total Sales = SUM(Sales[Amount])</code> and <code>Total Profit = SUM(Sales[Profit])</code>.</li>
                    <li>Use AI assistants to generate advanced time-intelligence formulas using <code>CALCULATE</code> and <code>SAMEPERIODLASTYEAR</code>.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f0fdf4', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Layout size={24} color="#10b981" />
                  <h3 style={{ margin: 0, color: '#14532d', fontSize: '1.25rem' }}>3. Standard Visualization</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Build a clean layout with **KPI cards** showing Total Sales and Year-over-Year Growth %.</li>
                    <li>Add a Line Chart showing Sales over time (Month and Year).</li>
                    <li>Add a Matrix showing Category performance (Rows: Category, Columns: Total Sales, Total Profit).</li>
                    <li>Include a Date Slicer for interactivity.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#fffbeb', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Zap size={24} color="#d97706" />
                  <h3 style={{ margin: 0, color: '#92400e', fontSize: '1.25rem' }}>4. Native AI Visuals Integration (Mandatory)</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>**AI Key Influencers:** Add a Key Influencers visual to analyze what drives repeat customer purchases and high reviews (5-star ratings).</li>
                    <li>**AI Q&A Visual:** Add an interactive Q&A natural language box so executives can type questions like *"What is the top product category in Sao Paulo?"* and get instant chart answers.</li>
                    <li>**Smart Narratives:** Add a Smart Narrative text box that automatically writes a dynamic 3-bullet executive summary of sales trends!</li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('project2')}>Next Project: AI HR Attrition 🚀</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'project2' && (
        <Section key="project2" id="project2" eyebrow="Project 3: AI Capstone" title="AI HR Employee Attrition & Demographics Dashboard">
          <div className="panel" style={{ padding: '0', marginBottom: '2rem' }}>
            <Project2Dashboard />
          </div>
          
          <div className="panel">
            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI Project Superpower: Key Influencers & Anomaly Detection
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                Why are top performers leaving? You will use an **AI Key Influencers Visual** to rank whether Overtime, Low Salary, or Poor Management is the #1 cause of employee turnover! You will also use **AI Anomaly Detection** to flag abnormal departure spikes in specific departments!
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>How to Build This AI Dashboard</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '1.1rem' }}>
              <strong>Scenario:</strong> An HR leadership team wants an AI-powered dashboard to understand why employees are quitting, predict flight risks, and analyze diversity demographics.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#eff6ff', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Database size={24} color="#3b82f6" />
                  <h3 style={{ margin: 0, color: '#1e3a8a', fontSize: '1.25rem' }}>1. Data Preparation (Power Query AI)</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Download the <a href="https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset" target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>IBM HR Analytics Employee Attrition</a> dataset from Kaggle.</li>
                    <li>Use Power Query's **AI Insights (Text Analytics)** to analyze exit interview survey comments and tag employee sentiment (Positive, Neutral, Negative).</li>
                    <li>Handle null values in the `Termination Date` column by replacing them with "Active".</li>
                    <li>Extract the Hire Year from the Hire Date column using AI pattern matching.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f5f3ff', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Target size={24} color="#8b5cf6" />
                  <h3 style={{ margin: 0, color: '#4c1d95', fontSize: '1.25rem' }}>2. Data Modeling & ChatGPT DAX</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Establish relationships between Employees, Departments, and a Date table using **AI Autodetect**.</li>
                    <li>Use ChatGPT to write a **Calculated Column** using <code>SWITCH()</code> to group employees into Age Buckets ("18-25", "26-35", "36-45", "45+").</li>
                    <li>Ask AI Copilot to generate measures for <code>Total Employees</code>, <code>Total Terminations</code>, and <code>Attrition Rate %</code>.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f0fdf4', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Layout size={24} color="#10b981" />
                  <h3 style={{ margin: 0, color: '#14532d', fontSize: '1.25rem' }}>3. Standard Visualization</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Create interactive Donut charts for Gender and Age demographics.</li>
                    <li>Add a Clustered Bar Chart showing Attrition by Department.</li>
                    <li>Include Slicers for filtering by Department and Hire Year.</li>
                    <li>Ensure colors represent clean executive HR guidelines.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#fffbeb', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Zap size={24} color="#d97706" />
                  <h3 style={{ margin: 0, color: '#92400e', fontSize: '1.25rem' }}>4. Native AI Visuals Integration (Mandatory)</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>**AI Key Influencers:** Add a Key Influencers visual set to *Analyze: Attrition* and *Explain by: Overtime, Salary Slab, Job Satisfaction, and Distance From Home*. See AI instantly calculate that "Overtime = Yes increases resignation risk by 3.4x"!</li>
                    <li>**AI Anomaly Detection:** Enable Anomaly Detection on your monthly turnover line chart to automatically highlight sudden spikes in resignations!</li>
                    <li>**Smart Narratives:** Add an automated AI text box summarizing which department has the highest retention risk!</li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('project3')}>Next Project: Parry's Corner</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'project3' && (
        <Section key="project3" id="project3" eyebrow="Project 4: AI Capstone" title="AI Bakery Sales & Demand Forecasting Dashboard">
          <div className="panel" style={{ padding: '0', marginBottom: '2rem' }}>
            <Project3Dashboard />
          </div>

          <div className="panel">
            <div style={{ background: '#0f172a', color: 'white', padding: '1.8rem', borderRadius: '14px', marginBottom: '2rem', border: '1px solid #334155' }}>
              <h4 style={{ color: '#facc15', margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                🤖 AI Project Superpower: Demand Forecasting & Decomposition Trees
              </h4>
              <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                Will croissant demand spike this weekend? You must use Power BI's **Native AI Forecast Tool** on your daily line chart to project bakery sales 14 days into the future! You will also build an **AI Decomposition Tree** to interactively drill down from Total Revenue ➔ Store Location ➔ Time of Day ➔ Top Pastry!
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>How to Build This AI Dashboard</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '1.1rem' }}>
              <strong>Scenario:</strong> You are the lead Data Analyst for <em>Parry's Corner Bakery</em>. The management team wants an AI-infused 4-page dashboard to analyze Sales, predict weekend demand, and optimize daily baking quantities.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#eff6ff', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Database size={24} color="#3b82f6" />
                  <h3 style={{ margin: 0, color: '#1e3a8a', fontSize: '1.25rem' }}>Step 1 & 2: Data Acquisition & AI Loading</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Download the provided Bakery Sales Dataset: <a href="/bakery_sales_data.csv" download style={{ color: '#3b82f6', textDecoration: 'underline' }}>bakery_sales_data.csv</a></li>
                    <li>Open Power BI Desktop, click **Get Data**, and let Power Query AI inspect data types automatically.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f5f3ff', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PenTool size={24} color="#8b5cf6" />
                  <h3 style={{ margin: 0, color: '#4c1d95', fontSize: '1.25rem' }}>Step 3: Power Query (AI Data Cleaning)</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Open the Power Query Editor and promote headers if necessary.</li>
                    <li>Use **AI Fuzzy Matching** during data merges to link misspelled pastry item names with master inventory tables automatically!</li>
                    <li>Use **Column From Examples (AI)** to extract Day of Week and Hour of Day without writing complex formulas.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f0fdf4', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Target size={24} color="#10b981" />
                  <h3 style={{ margin: 0, color: '#14532d', fontSize: '1.25rem' }}>Step 4: Data Modeling & Copilot DAX</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>Navigate to Model View and create a **Star Schema** with AI autodetect relationships.</li>
                    <li>Use ChatGPT/Copilot to generate measures for <code>Total Revenue</code>, <code>Total Expenses</code>, <code>Profit Margin %</code>, and <code>Average Transaction Value</code>.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#fffbeb', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Layout size={24} color="#d97706" />
                  <h3 style={{ margin: 0, color: '#92400e', fontSize: '1.25rem' }}>Step 5: Standard Dashboard Creation (4 Pages)</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li><strong>Page 1: Sales Performance</strong> - Track total sales, revenue, and trends over time using Line Charts and KPI Cards.</li>
                    <li><strong>Page 2: Profit & Loss Analysis</strong> - Understand revenue vs. expenses and profitability trends using Waterfall charts or Matrices.</li>
                    <li><strong>Page 3: Customer Preferences & Demand</strong> - Analyze which products are most popular using Bar and Donut charts.</li>
                    <li><strong>Page 4: Advanced Business Insights</strong> - Explore outliers and deeper patterns using Scatter plots.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f0fdf4', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Zap size={24} color="#10b981" />
                  <h3 style={{ margin: 0, color: '#14532d', fontSize: '1.25rem' }}>Step 6: Native AI Forecasting & Trees (Mandatory)</h3>
                </div>
                <div style={{ padding: '1.5rem', background: 'white' }}>
                  <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
                    <li>**AI Demand Forecasting:** Click your daily sales line chart, go to the Analytics pane, and enable **Forecast**. Set forecast length to 14 days with a 95% confidence interval to predict upcoming bread and pastry demand!</li>
                    <li>**AI Decomposition Tree:** Add a Decomposition Tree visual to let bakery managers dynamically click and drill down into revenue drivers across store locations and hours of the day!</li>
                    <li>**AI Q&A Visual:** Embed an interactive Q&A box so staff can ask natural language questions like *"What hour has the highest coffee sales?"*</li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('submission')}>View AI Submission Guidelines 🚀</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'submission' && (
        <Section key="submission" id="submission" eyebrow="Wrap Up & Certification" title="AI Capstone Submission Guidelines">
          <div className="panel">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={24} color="#10b981" />
                How to Earn Your AI Power BI Certification
              </h3>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8 }}>
                To earn your **AI-Powered Power BI Analyst Certification**, you must submit your completed `.pbix` files demonstrating both standard BI proficiency and modern AI native integrations across all 4 projects.
              </p>
              
              <ul style={{ color: '#475569', lineHeight: 1.8, margin: '1.5rem 0', paddingLeft: '20px', fontSize: '1.05rem' }}>
                <li>**DAX & Copilot:** Ensure all your DAX measures are functioning correctly and document any ChatGPT/Copilot prompts you used to generate time-intelligence formulas.</li>
                <li>**AI Native Visuals:** Your dashboards must include at least 2 AI features per project (e.g., Key Influencers, Smart Narratives, AI Anomaly Detection, Q&A, or Forecasting).</li>
                <li>**Star Schema:** Make sure your Data Model strictly follows a clean Star Schema layout.</li>
                <li>**Submission Format:** Save your files as <code>.pbix</code> (Power BI Desktop File), export a PDF version of your report pages, zip the bundle, and upload to the student grading portal.</li>
              </ul>
            </div>

            <div style={{ background: '#eff6ff', padding: '2rem', borderRadius: '12px', border: '1px solid #3b82f6', textAlign: 'center' }}>
              <h3 style={{ color: '#1d4ed8', margin: '0 0 1rem 0' }}>Congratulations, AI Data Analyst! 🎉</h3>
              <p style={{ color: '#1e3a8a', fontSize: '1.1rem', margin: 0 }}>
                You have reached the end of the AI-Powered Power BI course. You are now equipped with the cutting-edge skills to combine standard enterprise BI with automated AI superpowers!
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem', justifyContent: 'center' }}>
              <button className="btn btn-primary" style={{ background: '#10b981', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => alert('AI Power BI Course Completed! Awesome job!')}>Claim AI Certification 🎉</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
