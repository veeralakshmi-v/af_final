import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Database, Terminal, ShieldAlert, CheckCircle } from 'lucide-react';

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

export default function SQLDay3({ activeTab, onNavigate }) {

  const handleContinue = (nextSectionId) => {
    onNavigate('sql_module3', nextSectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">

      {activeTab === 'sql_categories' && (
        <Section key="sql_categories" id="sql_categories" eyebrow="The Big Picture" title="The 5 Categories of SQL Commands">
          <div className="panel">
            <p><strong>SQL (Structured Query Language)</strong> commands are grouped into five main categories based on what they do. Before we start typing commands, it's crucial to understand where they fit in!</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={20} color="#3b82f6" /> DDL (Data Definition Language)
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>Used to define or modify the database structure (the blueprint).</p>
                <ul style={{ color: '#64748b', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                  <li><code>CREATE</code> - Create a new table/database</li>
                  <li><code>ALTER</code> - Modify an existing table</li>
                  <li><code>DROP</code> - Delete a table/database</li>
                  <li><code>TRUNCATE</code> - Delete all rows in a table</li>
                </ul>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Database size={20} color="#10b981" /> DML (Data Manipulation Language)
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>Used to manipulate data within the tables (the actual rows).</p>
                <ul style={{ color: '#64748b', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                  <li><code>INSERT</code> - Add new data</li>
                  <li><code>UPDATE</code> - Modify existing data</li>
                  <li><code>DELETE</code> - Remove data</li>
                </ul>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Terminal size={20} color="#f59e0b" /> DQL (Data Query Language)
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>Used strictly to retrieve and view data (asking questions).</p>
                <ul style={{ color: '#64748b', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                  <li><code>SELECT</code> - Fetch data from the database</li>
                </ul>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldAlert size={20} color="#8b5cf6" /> DCL (Data Control Language)
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>Used to manage permissions and access control (security).</p>
                <ul style={{ color: '#64748b', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                  <li><code>GRANT</code> - Give access privileges</li>
                  <li><code>REVOKE</code> - Remove access privileges</li>
                </ul>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={20} color="#ef4444" /> TCL (Transaction Control Language)
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>Used to manage transactions (saving or undoing changes).</p>
                <ul style={{ color: '#64748b', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                  <li><code>COMMIT</code> - Save changes permanently</li>
                  <li><code>ROLLBACK</code> - Undo changes</li>
                  <li><code>SAVEPOINT</code> - Create a point to roll back to</li>
                </ul>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('theory_ddl')}>Let's learn DDL! (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}


      {activeTab === 'theory_ddl' && (
        <Section key="theory_ddl" id="theory_ddl" eyebrow="Theory" title="DDL Commands">
          <div className="panel">
            <p>As you just learned, <strong>DDL (Data Definition Language)</strong> commands are used to define, alter, and delete the structure of database objects (like tables). They deal with the "blueprint" of the database, rather than the data itself.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>CREATE TABLE</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Creates a new table in the database.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#2563eb', fontSize: '0.9rem' }}>CREATE TABLE table_name (column1 datatype, column2 datatype);</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>ALTER TABLE</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Used to add, delete, or modify columns in an existing table.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#059669', fontSize: '0.9rem' }}>ALTER TABLE table_name ADD column_name datatype;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>MODIFY / CHANGE COLUMN</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Changes the data type of a column (MODIFY) or renames the column entirely (CHANGE).</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#d97706', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>ALTER TABLE table_name MODIFY column_name new_datatype;</code>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#d97706', fontSize: '0.9rem', display: 'block' }}>ALTER TABLE table_name CHANGE old_name new_name datatype;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>RENAME TABLE</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Changes the name of an existing table.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#7c3aed', fontSize: '0.9rem' }}>ALTER TABLE old_name RENAME TO new_name;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>DROP TABLE</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Deletes the table structure entirely, along with all the data inside it.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#dc2626', fontSize: '0.9rem' }}>DROP TABLE table_name;</code>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f43f5e' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>TRUNCATE TABLE</h4>
                <p style={{ color: '#475569', marginBottom: '0.5rem' }}>Deletes all data inside the table, but keeps the empty table structure intact.</p>
                <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#e11d48', fontSize: '0.9rem' }}>TRUNCATE TABLE table_name;</code>
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('constraints')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'constraints' && (
        <Section key="constraints" id="constraints" eyebrow="Rules" title="Constraints">
          <div className="panel">
            <p>Constraints are rules applied to columns to ensure the integrity and accuracy of the data in the table.</p>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>PRIMARY KEY</h4>
                <p style={{ color: '#475569' }}>Uniquely identifies every row in the table. Must be unique, and cannot be NULL.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>FOREIGN KEY</h4>
                <p style={{ color: '#475569' }}>A column that refers to the Primary Key of another table, linking the two tables together.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>NOT NULL</h4>
                <p style={{ color: '#475569' }}>Ensures that a column cannot have a NULL (empty/missing) value.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>UNIQUE</h4>
                <p style={{ color: '#475569' }}>Ensures all values in a column are different from one another.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>DEFAULT</h4>
                <p style={{ color: '#475569' }}>Provides a default value for a column if none is specified when a row is inserted.</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>CHECK</h4>
                <p style={{ color: '#475569' }}>Ensures that values in a column satisfy a specific condition (e.g., <code>CHECK (age &gt;= 18)</code>).</p>
              </div>
              
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #64748b' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>AUTO_INCREMENT</h4>
                <p style={{ color: '#475569' }}>Automatically generates a unique number for every new row (often used with Primary Keys).</p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical_tables')}>Let's Code! (+20 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'practical_tables' && (
        <Section key="practical_tables" id="practical_tables" eyebrow="Live Examples" title="Practical: Create Tables">
          <div className="panel">
            <p>Now let's put Data Types and Constraints together to create some tables! Here are three real-world examples.</p>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Student Table</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>CREATE TABLE</code> Students (<br/>
              &nbsp;&nbsp;student_id <span style={{ color: '#f78c6c' }}>INT</span> <span style={{ color: '#89ddff' }}>AUTO_INCREMENT</span> <span style={{ color: '#c3e88d' }}>PRIMARY KEY</span>,<br/>
              &nbsp;&nbsp;first_name <span style={{ color: '#f78c6c' }}>VARCHAR(50)</span> <span style={{ color: '#89ddff' }}>NOT NULL</span>,<br/>
              &nbsp;&nbsp;last_name <span style={{ color: '#f78c6c' }}>VARCHAR(50)</span> <span style={{ color: '#89ddff' }}>NOT NULL</span>,<br/>
              &nbsp;&nbsp;enrollment_date <span style={{ color: '#f78c6c' }}>DATE</span> <span style={{ color: '#89ddff' }}>DEFAULT</span> (<span style={{ color: '#82aaff' }}>CURRENT_DATE</span>),<br/>
              &nbsp;&nbsp;is_active <span style={{ color: '#f78c6c' }}>BOOLEAN</span> <span style={{ color: '#89ddff' }}>DEFAULT</span> <span style={{ color: '#f07178' }}>TRUE</span><br/>
              );
            </pre>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '1rem', fontSize: '0.95rem' }}>
              <p style={{ margin: 0, marginBottom: '0.5rem', color: '#1e293b' }}><strong>Code Breakdown:</strong></p>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.6' }}>
                <li><code>AUTO_INCREMENT</code>: Automatically assigns a unique number (1, 2, 3...) to each new student so you don't have to manage IDs manually.</li>
                <li><code>PRIMARY KEY</code>: Ensures every student has a unique identifier and it's never empty.</li>
                <li><code>NOT NULL</code>: Forces the user to provide a first and last name; it cannot be left blank.</li>
                <li><code>DEFAULT (CURRENT_DATE)</code>: If no enrollment date is provided, it automatically fills in today's date.</li>
                <li><code>DEFAULT TRUE</code>: By default, a new student is marked as active.</li>
              </ul>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Employee Table</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>CREATE TABLE</code> Employees (<br/>
              &nbsp;&nbsp;emp_id <span style={{ color: '#f78c6c' }}>INT</span> <span style={{ color: '#c3e88d' }}>PRIMARY KEY</span>,<br/>
              &nbsp;&nbsp;email <span style={{ color: '#f78c6c' }}>VARCHAR(100)</span> <span style={{ color: '#89ddff' }}>NOT NULL UNIQUE</span>,<br/>
              &nbsp;&nbsp;salary <span style={{ color: '#f78c6c' }}>DECIMAL(10,2)</span> <span style={{ color: '#89ddff' }}>CHECK</span> (salary &gt;= <span style={{ color: '#f07178' }}>0</span>),<br/>
              &nbsp;&nbsp;department <span style={{ color: '#f78c6c' }}>VARCHAR(50)</span><br/>
              );
            </pre>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #10b981', marginTop: '1rem', fontSize: '0.95rem' }}>
              <p style={{ margin: 0, marginBottom: '0.5rem', color: '#1e293b' }}><strong>Code Breakdown:</strong></p>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.6' }}>
                <li><code>UNIQUE</code>: Ensures no two employees can register with the exact same email address. It guarantees uniqueness for a non-primary key column.</li>
                <li><code>CHECK (salary &gt;= 0)</code>: A safety rule that prevents anyone from accidentally entering a negative salary.</li>
              </ul>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Product Table</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <code style={{ color: '#c792ea' }}>CREATE TABLE</code> Products (<br/>
              &nbsp;&nbsp;product_id <span style={{ color: '#f78c6c' }}>INT</span> <span style={{ color: '#89ddff' }}>AUTO_INCREMENT</span> <span style={{ color: '#c3e88d' }}>PRIMARY KEY</span>,<br/>
              &nbsp;&nbsp;product_name <span style={{ color: '#f78c6c' }}>VARCHAR(255)</span> <span style={{ color: '#89ddff' }}>NOT NULL</span>,<br/>
              &nbsp;&nbsp;description <span style={{ color: '#f78c6c' }}>TEXT</span>,<br/>
              &nbsp;&nbsp;price <span style={{ color: '#f78c6c' }}>DECIMAL(8,2)</span> <span style={{ color: '#89ddff' }}>NOT NULL</span>,<br/>
              &nbsp;&nbsp;stock_quantity <span style={{ color: '#f78c6c' }}>INT</span> <span style={{ color: '#89ddff' }}>DEFAULT</span> <span style={{ color: '#f07178' }}>0</span><br/>
              );
            </pre>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginTop: '1rem', fontSize: '0.95rem' }}>
              <p style={{ margin: 0, marginBottom: '0.5rem', color: '#1e293b' }}><strong>Code Breakdown:</strong></p>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.6' }}>
                <li><code>TEXT</code>: Used for the description because product descriptions can be very long (unlike names which fit neatly in VARCHAR).</li>
                <li><code>DECIMAL(8,2)</code>: Perfect for money! Allows numbers up to 8 digits total, with exactly 2 digits after the decimal point (e.g. 999999.99).</li>
                <li><code>DEFAULT 0</code>: If a new product is added without specifying stock, it safely assumes we have 0 in stock instead of NULL.</li>
              </ul>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('practical_ddl')}>Continue (+10 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'practical_ddl' && (
        <Section key="practical_ddl" id="practical_ddl" eyebrow="Live Examples" title="Practical: Modify Existing Tables">
          <div className="panel">
            <p>Let's use the <code>ALTER TABLE</code> command to make structural changes to a hypothetical <strong>Users</strong> table.</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Add a Column</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Adding a 'phone_number' column to the Users table</span><br/>
              <code style={{ color: '#c792ea' }}>ALTER TABLE</code> Users <br/>
              <code style={{ color: '#89ddff' }}>ADD</code> phone_number <span style={{ color: '#f78c6c' }}>VARCHAR(15)</span>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Delete a Column</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Removing the 'phone_number' column we just added</span><br/>
              <code style={{ color: '#c792ea' }}>ALTER TABLE</code> Users <br/>
              <code style={{ color: '#89ddff' }}>DROP COLUMN</code> phone_number;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Rename a Column</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Renaming 'name' to 'full_name'</span><br/>
              <code style={{ color: '#c792ea' }}>ALTER TABLE</code> Users <br/>
              <code style={{ color: '#89ddff' }}>RENAME COLUMN</code> name <code style={{ color: '#89ddff' }}>TO</code> full_name;
            </pre>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>*Note: In older MySQL versions, you use CHANGE: <code>CHANGE name full_name VARCHAR(100)</code></p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Change Data Type</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Changing the 'age' column from INT to TINYINT to save space</span><br/>
              <code style={{ color: '#c792ea' }}>ALTER TABLE</code> Users <br/>
              <code style={{ color: '#89ddff' }}>MODIFY</code> age <span style={{ color: '#f78c6c' }}>TINYINT</span>;
            </pre>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>5. Rename the Table</h3>
            <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <span style={{ color: '#64748b' }}>-- Renaming the 'Users' table to 'Customers'</span><br/>
              <code style={{ color: '#c792ea' }}>ALTER TABLE</code> Users <br/>
              <code style={{ color: '#89ddff' }}>RENAME TO</code> Customers;
            </pre>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => handleContinue('mini_project')}>Continue (+15 XP)</button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'mini_project' && (
        <Section key="mini_project" id="mini_project" eyebrow="Project" title="Mini Project: Library Design">
          <div className="panel">
            <h3 style={{ marginBottom: '1rem' }}>The Scenario</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>You have been hired by the local library to modernize their database. Currently, they are keeping track of all their books in a giant spreadsheet. Your job is to create a robust SQL table structure and then apply some sudden modifications requested by the library manager.</p>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Phase 1: Initial Creation</h4>
              <p style={{ color: '#475569' }}>Create a table named <code>LibraryBooks</code> with the following specifications:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px', color: '#475569' }}>
                <li><code>book_id</code> (Primary Key, Auto Increment)</li>
                <li><code>title</code> (Max 200 chars, Not Null)</li>
                <li><code>author</code> (Max 100 chars, Not Null)</li>
                <li><code>isbn</code> (Max 13 chars, Unique)</li>
                <li><code>published_year</code> (Integer)</li>
                <li><code>is_available</code> (Boolean, Defaults to True)</li>
              </ul>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Phase 2: The Manager's Changes</h4>
              <p style={{ color: '#475569' }}>The manager just emailed you with a few urgent changes. Write the <code>ALTER TABLE</code> commands for each:</p>
              <ol style={{ marginLeft: '20px', marginTop: '10px', color: '#475569', lineHeight: '1.6' }}>
                <li>They forgot to track the book's genre. <strong>Add a new column</strong> called <code>genre</code> (Max 50 chars).</li>
                <li>The ISBN column needs more space for international formats. <strong>Modify</strong> the <code>isbn</code> column to allow up to 20 characters.</li>
                <li>They decided <code>is_available</code> is confusing. <strong>Rename the column</strong> to <code>in_stock</code>.</li>
                <li>They no longer want to track the published year to save disk space. <strong>Drop</strong> the <code>published_year</code> column.</li>
              </ol>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Phase 3: The Nuclear Option</h4>
              <p style={{ color: '#475569' }}>The library is rebranding and throwing out all their old books. Write the command to completely wipe all data from the table while keeping the table structure intact.</p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => alert('Project Submitted for Review!')}>Submit Project</button>
            </div>
          </div>
        </Section>
      )}

    </AnimatePresence>
  );
}
