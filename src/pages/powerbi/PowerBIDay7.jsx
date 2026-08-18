import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, BarChart, Sliders, Eye, BookOpen, Layers, Zap, CheckCircle, ArrowRight, MousePointer, Filter, Palette, Sparkles, Brain, Compass, HelpCircle } from 'lucide-react';

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

export default function PowerBIDay7({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('powerbi_module7', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {/* 1. INTRO TAB */}
      {activeTab === 'intro' && (
        <Section key="intro" id="intro" eyebrow="Day 7 Overview" title="Visualizations, Interactivity & Themes">
          <div className="panel">
            <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', padding: '2.5rem', borderRadius: '20px', color: 'white', marginBottom: '2.5rem', boxShadow: '0 10px 25px rgba(2, 132, 199, 0.25)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '1rem' }}>
                <Sparkles size={16} color="#38bdf8" /> Day 7 Visual Masterclass
              </div>
              <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontWeight: 800 }}>Turning Static Numbers into Dynamic Interactive Apps</h3>
              <p style={{ fontSize: '1.1rem', color: '#e0f2fe', margin: 0, lineHeight: 1.7, maxWidth: '750px' }}>
                Having clean data and great DAX formulas is only half the battle. If your dashboard is confusing or boring, nobody will use it! Today, you will master **Best Visualization Selection, Drill Downs, Bookmarks, Slicers, and Formatting Themes** to create stunning, app-like experiences.
              </p>
            </div>

            <div style={{ background: '#fffbeb', borderLeft: '5px solid #f59e0b', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', color: '#92400e' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                💡 Simple Analogy: A Dashboard is Like a Car Cockpit
              </h4>
              <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1rem' }}>
                Imagine driving a car where every gauge looks identical and you have to dig through a glovebox to check your speed! That is a bad dashboard. Today, we learn how to design clean gauges (Visual Selection), interactive GPS navigation (Bookmarks & Buttons), and synced filters (Slicers) for visual excellence.
              </p>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1.2rem' }}>What You Will Master Today:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #3b82f6' }}>
                <strong style={{ color: '#1e40af', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>📊 1. Best Visual Selection</strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>When to use Bar, Line, Pie, Waterfall, Card, or Matrix charts without confusing executives.</span>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #10b981' }}>
                <strong style={{ color: '#065f46', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>🔍 2. Drill Down & Tooltips</strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Allowing users to click into Year &rarr; Month &rarr; Day hierarchies and custom hover card popups.</span>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #7c3aed' }}>
                <strong style={{ color: '#5b21b6', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>🔘 3. Bookmarks & Buttons</strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Creating custom app navigation tabs, view toggles, and pop-up filter drawer modals.</span>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #f59e0b' }}>
                <strong style={{ color: '#92400e', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>🎛️ 4. Slicers & Sync Slicers</strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Connecting filters across multiple dashboard pages so selections stay synced everywhere.</span>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #ec4899' }}>
                <strong style={{ color: '#9d174d', display: 'block', fontSize: '1.1rem', marginBottom: '0.4rem' }}>🎨 5. Formatting & Themes</strong>
                <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Conditional color formatting (red/green KPIs), custom JSON themes, and canvas layout settings.</span>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('vis_selection')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Best Visualization Selection &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 2. VISUALIZATION SELECTION TAB */}
      {activeTab === 'vis_selection' && (
        <Section key="vis_selection" id="vis_selection" eyebrow="Chart Anatomy" title="Best Visualization Selection Guide">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Choosing the wrong chart is the #1 mistake new analysts make. Here is the **Golden Rulebook of Visualization**:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📈 Line & Area Charts
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  <strong>Best for:</strong> Showing trends over time (Years, Months, Days). Never use line charts for categorical items like departments or cities!
                </p>
                <div style={{ background: '#e2e8f0', padding: '0.6rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>
                  💡 Rule: Time always goes on the X-axis (horizontal).
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📊 Bar & Column Charts
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  <strong>Best for:</strong> Comparing categories (e.g., Sales by Product, Profit by Region). Use horizontal bar charts when category names are long!
                </p>
                <div style={{ background: '#e2e8f0', padding: '0.6rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>
                  💡 Rule: Sort bars in descending order from highest to lowest.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🥧 Pie & Donut Charts
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  <strong>Best for:</strong> Showing part-to-whole percentages. Only use when you have <strong>2 to 4 categories maximum</strong> (e.g., Desktop vs Mobile vs Tablet).
                </p>
                <div style={{ background: '#fee2e2', padding: '0.6rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#991b1b', fontWeight: 600 }}>
                  ⚠️ Warning: Never use Pie charts with 5+ slices! It becomes messy.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🌊 Waterfall & Scatter Plots
                </h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  <strong>Waterfall:</strong> Best for financial bridges (showing how starting net income reaches ending balance).<br/>
                  <strong>Scatter Plot:</strong> Best for correlations (e.g., Ad spend vs Revenue).
                </p>
                <div style={{ background: '#e2e8f0', padding: '0.6rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>
                  💡 Pro Tip: Use Scatter plots to spot outliers instantly.
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('drill_tooltips')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Drill Down, Drill Through & Tooltips &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 3. DRILL DOWN & TOOLTIPS TAB */}
      {activeTab === 'drill_tooltips' && (
        <Section key="drill_tooltips" id="drill_tooltips" eyebrow="Deep Dive Analytics" title="Drill Down, Drill Through & Custom Tooltips">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Great dashboards let users start at a high-level overview and zoom into granular details with a single mouse click!
            </p>

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', background: 'white' }}>
                <div style={{ background: '#eff6ff', padding: '1.5rem', borderBottom: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: 0, color: '#1e40af', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    ⬇️ 1. Drill Down (Hierarchy Zoom)
                  </h4>
                </div>
                <div style={{ padding: '1.8rem', color: '#475569', lineHeight: 1.7 }}>
                  <p style={{ marginTop: 0 }}>
                    When you put a date column (Year, Quarter, Month, Day) or geographical column (Country, State, City) on an axis, Power BI adds **Drill Down arrows** at the top right of the chart.
                  </p>
                  <ul style={{ paddingLeft: '1.5rem', margin: '1rem 0 0' }}>
                    <li><strong>Single Arrow (⬇️):</strong> Turn on drill-down mode. Click on "2026" bar to see its Quarters.</li>
                    <li><strong>Double Arrow (⏬):</strong> Go to the next level in the hierarchy across all years at once.</li>
                    <li><strong>Pitchfork Arrow (🔱):</strong> Expand all levels to show Year and Quarter together on X-axis.</li>
                  </ul>
                </div>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', background: 'white' }}>
                <div style={{ background: '#f0fdf4', padding: '1.5rem', borderBottom: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: 0, color: '#065f46', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    ➡️ 2. Drill Through (Page-to-Page Navigation)
                  </h4>
                </div>
                <div style={{ padding: '1.8rem', color: '#475569', lineHeight: 1.7 }}>
                  <p style={{ marginTop: 0 }}>
                    Drill Through lets you right-click a data point (like a customer name or store location) and jump to a **dedicated detail page** filtered specifically for that selection!
                  </p>
                  <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #10b981', marginTop: '1rem' }}>
                    <strong>How to build:</strong> Create a page named "Store Details". In the visual format pane under "Drill through", drag the Store ID column. Now when users right-click Store #104 on the summary page, they jump directly to Store #104's full financial statement!
                  </div>
                </div>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', background: 'white' }}>
                <div style={{ background: '#faf5ff', padding: '1.5rem', borderBottom: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: 0, color: '#5b21b6', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    💬 3. Custom Report Page Tooltips
                  </h4>
                </div>
                <div style={{ padding: '1.8rem', color: '#475569', lineHeight: 1.7 }}>
                  <p style={{ marginTop: 0 }}>
                    By default, hovering over a bar shows a boring gray tooltip box with text numbers. With **Custom Report Page Tooltips**, hovering over a bar pops up an entire **mini-dashboard with charts, images, and KPI cards** inside the hover box!
                  </p>
                  <div style={{ background: '#fdf2f8', padding: '1.2rem', borderRadius: '10px', borderLeft: '4px solid #ec4899', marginTop: '1rem' }}>
                    <strong>Visual Pro Tip:</strong> You can configure custom tooltip layout cards completely by creating a new tooltip page size (under Canvas Settings) and toggling "Allow use as tooltip" in Page Information!
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('bookmarks_buttons')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Bookmarks, Buttons & Page Navigation &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 4. BOOKMARKS & BUTTONS TAB */}
      {activeTab === 'bookmarks_buttons' && (
        <Section key="bookmarks_buttons" id="bookmarks_buttons" eyebrow="App-Like UI" title="Bookmarks, Buttons & Navigation">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Want your Power BI report to feel like a modern website or smartphone app? You need **Bookmarks and Buttons**!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.3rem', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🔖 What is a Bookmark?
                </h4>
                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  A Bookmark takes a "snapshot" of the current dashboard state—including which filters are checked, which charts are hidden or visible, and sort orders. When a user clicks a bookmark, the dashboard instantly morphs into that saved state!
                </p>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.3rem', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🔘 Buttons & Page Navigation
                </h4>
                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Power BI lets you insert interactive buttons (Left Arrow, Help Icon, Blank Buttons) and assign actions to them:
                  <br/>• **Page Navigation:** Jump to another tab smoothly.
                  <br/>• **Bookmark Action:** Trigger a bookmark state change.
                  <br/>• **Q&A Trigger:** Open an AI question popup window.
                </p>
              </div>
            </div>

            <div style={{ background: '#f1f5f9', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '3rem' }}>
              <h4 style={{ color: '#0f172a', fontSize: '1.3rem', marginTop: 0, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🌟 Top 3 Real-World Bookmark Design Tricks:
              </h4>
              <div style={{ display: 'grid', gap: '1.2rem' }}>
                <div style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #3b82f6', color: '#334155' }}>
                  <strong>1. Chart Toggle Switch:</strong> Create two buttons: "View as Bar Chart" and "View as Table". Use bookmarks to hide the table when Bar Chart is clicked, and vice versa!
                </div>
                <div style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #10b981', color: '#334155' }}>
                  <strong>2. Pop-up Filter Drawer Modal:</strong> Instead of cluttering your dashboard with 10 slicer dropdowns, put them inside a hidden container group. Create a "Filter 🔍" button that unhides the drawer modal smoothly!
                </div>
                <div style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #7c3aed', color: '#334155' }}>
                  <strong>3. Reset Filters Button:</strong> Add a "Reset All 🔄" button hooked to a bookmark with all slicers cleared. Users love this to reset their view!
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('slicers_sync')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Slicers & Sync Slicers &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 5. SLICERS & SYNC SLICERS TAB */}
      {activeTab === 'slicers_sync' && (
        <Section key="slicers_sync" id="slicers_sync" eyebrow="Interactive Filtering" title="Slicers & Sync Slicers">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Slicers are on-screen interactive filters that let business users slice and dice data without writing DAX formulas.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem', marginBottom: '3rem' }}>
              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>📅 Relative Date Slicers</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                  Instead of manually picking calendar dates every morning, set a Relative Date slicer to: **"In the last 30 days"** or **"This Year"**. It auto-updates dynamically every single day!
                </p>
              </div>

              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>🌳 Hierarchy Slicers</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                  Combine Country, State, and City into a single expandable tree checkbox slicer! Users can check "USA" to select all states, or expand to select only "California & Texas".
                </p>
              </div>

              <div style={{ background: 'white', padding: '1.8rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.25rem', marginTop: 0, marginBottom: '0.8rem' }}>🎛️ The New Button Slicer</h4>
                <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                  Say goodbye to ugly boring checkboxes! Power BI's modern **Button Slicer** lets you display filters as sleek grid tiles with icons, subtitles, and custom hover animations.
                </p>
              </div>
            </div>

            <div style={{ background: '#ecfeff', border: '2px solid #06b6d4', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', color: '#155e75' }}>
              <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#0e7490' }}>
                🔄 The Magic of SYNC SLICERS
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Imagine a dashboard with 5 different tabs (Executive Summary, Sales, Inventory, HR, Finance). If an executive selects **"Year = 2026"** on Tab 1, it is frustrating if they switch to Tab 2 and have to select "2026" all over again!
              </p>
              <div style={{ background: 'white', padding: '1.2rem', borderRadius: '12px', color: '#0f172a', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                ✅ <strong>The Solution:</strong> Under the View tab, open the **Sync Slicers pane**. Check the sync boxes across all 5 pages. Now, selecting a year or department on ANY page instantly synchronizes filters across your entire workbook!
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('themes_formatting')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Formatting & Themes &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 6. FORMATTING & THEMES TAB */}
      {activeTab === 'themes_formatting' && (
        <Section key="themes_formatting" id="themes_formatting" eyebrow="Visual Excellence" title="Conditional Formatting, Themes & Layout Design">
          <div className="panel">
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Transform your reports from standard gray grids into premium, executive-ready visual dashboards. Learn how to configure advanced styling, import custom JSON themes, and control element interactions.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              
              {/* Conditional Formatting Card */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.3rem', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🎨 Conditional Formatting Rules
                </h4>
                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Highlight critical data and alerts dynamically based on values:
                  <br/>• <strong>Color Gradients:</strong> Set background/font color scales (e.g., transition from red to yellow to green based on Profit).
                  <br/>• <strong>KPI Status Icons:</strong> Set rules to display icons next to text (e.g., 🔴 for &lt;90% target, 🟡 for 90-99%, 🟢 for &ge;100% target).
                  <br/>• <strong>Web URL Linking:</strong> Make table cells clickable links leading to external web pages dynamically.
                </p>
              </div>

              {/* Themes Card */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <h4 style={{ color: '#0f172a', fontSize: '1.3rem', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  👔 Corporate JSON Themes
                </h4>
                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Enforce brand standards across all pages using JSON theme files:
                  <br/>• <strong>Importing Themes:</strong> Go to the View tab ribbon &rarr; click the Themes dropdown &rarr; <strong>Browse for Themes</strong> to load JSON configurations.
                  <br/>• <strong>Global Customization:</strong> Configure standard corporate hex codes, default fonts (e.g., Segoe UI, Inter), card padding, and gridline colors.
                </p>
              </div>

            </div>

            {/* Advanced Interface Details */}
            <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '24px', border: '1px solid #cbd5e1', marginBottom: '3rem' }}>
              <h3 style={{ color: '#0f172a', margin: '0 0 1.5rem 0', fontWeight: 800 }}>⚙️ Master Formatting in Power BI Software</h3>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2rem' }}>
                Modern Power BI updates introduced changes to the user interface that data analysts must master to build polished dashboards:
              </p>

              {/* Grid Layout of Advanced Formatting Features */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#2563eb', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎛️ 1. Visual vs. General Formatting</strong>
                  <span style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    The Format Pane is split into two sections:
                    <br/>• <strong>Visual Tab:</strong> Holds visual-specific settings (like chart bar colors, data labels, legend placement, and axis limits).
                    <br/>• <strong>General Tab:</strong> Title text, header icons, borders, shadow effects, and padding adjustments.
                  </span>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#2563eb', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>✏️ 2. On-Object Interaction</strong>
                  <span style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Instead of searching the Format pane, you can double-click a title or visual element directly on the canvas to open localized, on-object format menus, enabling quick tweaks to text, labels, and styles.
                  </span>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                  <strong style={{ color: '#2563eb', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📐 3. Canvas Background & Wallpaper</strong>
                  <span style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Select the canvas background, open the Format page pane, and configure:
                    <br/>• <strong>Page Size:</strong> 16:9 widescreen or custom sizes.
                    <br/>• <strong>Wallpaper Transparency:</strong> Set canvas background colors and use wallpaper transparency to blend card outlines.
                  </span>
                </div>
              </div>

              {/* Edit Interactions Section */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '1.5rem', borderRadius: '14px', color: '#1e3a8a' }}>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#1d4ed8', fontSize: '1.15rem' }}>💥 Crucial Concept: Edit Interactions (Filter vs. Highlight vs. None)</h4>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1rem 0', color: '#1e3a8a' }}>
                  By default, clicking a bar in Chart A will <strong>Highlight</strong> matching data in Chart B (fading out unrelated sections). However, executives often prefer tables or cards to <strong>Filter</strong> (remove non-matching rows completely) or ignore interactions entirely.
                </p>
                <strong style={{ display: 'block', marginBottom: '0.4rem' }}>How to configure interactions:</strong>
                <ol style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                  <li>Click a visual to select it (this will be the "Trigger" visual).</li>
                  <li>In the top menu ribbon, go to the <strong>Format</strong> tab and click <strong>Edit Interactions</strong>.</li>
                  <li>Little icons will appear at the top-right of every other visual on the canvas:
                    <br/>• 📊 <strong>Filter Icon:</strong> Sets the target visual to filter completely when you click the trigger.
                    <br/>• 🖌️ <strong>Highlight Icon:</strong> Sets the target visual to fade out non-matching details.
                    <br/>• 🚫 <strong>None Icon:</strong> Disables all interactions; clicking the trigger visual has no effect on this visual.
                  </li>
                </ol>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('assignment_day7')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Next: Day 7 Mini Project &rarr;
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* 7. DAY 7 ASSIGNMENT TAB */}
      {activeTab === 'assignment_day7' && (
        <Section key="assignment_day7" id="assignment_day7" eyebrow="Day 7 Practice" title="Mini Project: Layout Design & Interactivity">
          <div className="panel">
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #cbd5e1', marginBottom: '2.5rem' }}>
              <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🏆 Your Day 7 Assignment Mission
              </h3>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Take the sales dataset from Day 6 and transform it into an interactive, highly customized dashboard using themes, layouts, and filters!
              </p>

              <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={22} color="#10b981" />
                  <span style={{ color: '#334155', fontSize: '0.95rem' }}><strong>Step 1: Visual Styling & Formatting:</strong> Create a Clustered Bar chart for Sales by Category, separate its general titles and visual settings, and add green/red conditional gradients.</span>
                </div>

                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={22} color="#10b981" />
                  <span style={{ color: '#334155', fontSize: '0.95rem' }}><strong>Step 2: Edit Interactions:</strong> Configure interactions so clicking on category bars filters tables completely (Filter mode) but leaves your main KPI Card untouched (None mode).</span>
                </div>

                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={22} color="#10b981" />
                  <span style={{ color: '#334155', fontSize: '0.95rem' }}><strong>Step 3: Bookmarks & Buttons:</strong> Build a custom pop-up filter panel using a bookmark and a toggle button.</span>
                </div>

                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={22} color="#10b981" />
                  <span style={{ color: '#334155', fontSize: '0.95rem' }}><strong>Step 4: Sync Slicers:</strong> Set up a Department slicer on Page 1 and sync it to Page 2.</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', padding: '3rem', borderRadius: '24px', color: 'white', boxShadow: '0 15px 35px rgba(2, 132, 199, 0.25)' }}>
              <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', fontWeight: 800 }}>Ready for Day 8?</h3>
              <p style={{ color: '#e0f2fe', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                You have mastered visuals, formatting, and interactive design. Next, we will dive into advanced AI visuals, synonym modeling, external AI tools, Python scripting, storage modes, and performance optimization!
              </p>
              <button className="btn btn-primary" onClick={() => onNavigate('powerbi_module8', 'intro_day8')} style={{ padding: '1.1rem 2.8rem', fontSize: '1.15rem', background: '#facc15', borderColor: '#facc15', color: '#0f172a', fontWeight: 800, borderRadius: '30px', boxShadow: '0 4px 15px rgba(250, 204, 21, 0.4)' }}>
                Proceed to Day 8: AI, Python & Live Connections 🚀
              </button>
            </div>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
