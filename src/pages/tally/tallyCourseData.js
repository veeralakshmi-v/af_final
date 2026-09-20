// Detailed 41-day course database for the Complete Accounting Practice course
export const tallyDaysData = {
  day1: {
    title: "Accounting Foundations & Tally Prime Setup",
    objectives: [
      "Understand what is accounting and bookkeeping in simple terms.",
      "Learn the difference between Debit (Dr.) and Credit (Cr.).",
      "Apply the basic Golden Rules and Modern Rules of accounting.",
      "Install Tally Prime software in free Educational Mode.",
      "Learn how to create a company profile in Tally Prime step-by-step."
    ],
    explanation: `Accounting is just recording, sorting, and summarizing business money transactions to see if you made a profit or a loss.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is Accounting & Bookkeeping?',
        content: '• Bookkeeping: Simply writing down daily money transactions (like a list of sales and purchases).\n• Accounting: Summarizing those daily records to make financial reports (like Profit & Loss and Balance Sheets).\n• Single Entry System: Writing details in a simple notebook. It is incomplete and has no checks.\n• Double Entry System: The standard scientific method. Every transaction has two sides: a Debit (Dr. - receiving side) and a Credit (Cr. - giving side). Both sides must always balance.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. What is Debit and Credit?',
        content: '• Debit (Dr.): Simply means entering a transaction on the LEFT side of an account page.\n• Credit (Cr.): Simply means entering a transaction on the RIGHT side of an account page.\n• Remember: Debit does not mean "plus" and Credit does not mean "minus". Their effect depends on the type of account.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Golden Rules vs. Modern Rules of Accounting',
        leftTitle: 'Golden Rules (Traditional Method)',
        leftDesc: 'Rules based on 3 types of accounts:\n• Personal Accounts (People/Companies):\n  → Debit the Receiver, Credit the Giver.\n• Real Accounts (Tangible things like Cash, Machinery):\n  → Debit what comes in, Credit what goes out.\n• Nominal Accounts (Expenses, Incomes):\n  → Debit all expenses & losses, Credit all incomes & gains.',
        rightTitle: 'Modern Rules (Accounting Equation)',
        rightDesc: 'Rules based on 5 classifications:\n• Assets (Cash, Property) & Expenses (Rent, Salary):\n  → Increase is Debited (+)\n  → Decrease is Credited (-)\n• Liabilities (Loans), Capital (Owner investment), & Incomes:\n  → Increase is Credited (+)\n  → Decrease is Debited (-)',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. What is Tally Prime & How to Install it?',
        content: 'Tally Prime is a popular software used by businesses to record accounts, manage stock, and print GST bills. It was started in 1986 by Shyam Sunder Goenka and Bharat Goenka.\nHow to Install:\n1. Download the setup file from www.tallysolutions.com.\n2. Double-click setup.exe and click "Install".\n3. Open Tally Prime and select "Continue in Educational Mode" (this free version allows you to practice using dates 1st, 2nd, and 31st of any month).',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      },
      {
        type: 'card',
        title: '5. Step-by-Step Company Creation in Tally',
        content: 'To start using Tally, you must create a company file:\n1. Open Tally -> select "Create Company" (or press Alt+K -> Create).\n2. Company Name: Enter "Alpha Fly Computer Education".\n3. Address: Enter "Theni, Tamil Nadu".\n4. State: Select "Tamil Nadu" (very important to calculate local GST correctly).\n5. Financial Year: Enter "01-Apr-2026".\n6. Save: Press Ctrl+A to save and create your company profile.',
        icon: 'Bot',
        color: '#ec4899',
        bgColor: 'rgba(236, 72, 153, 0.03)'
      }
    ],
    demonstration: `Follow these simple steps:
1. Open Tally Prime on your computer.
2. Click on 'Create Company'.
3. Type Company Name: 'Alpha Fly Theni Education'.
4. Select State: 'Tamil Nadu'.
5. Press Ctrl+A on your keyboard to save.`,
    realWorldExample: `A shopkeeper opens Tally and creates a company called 'Alpha Fly Traders'. By choosing 'Tamil Nadu' as the state, Tally automatically configures local SGST and CGST tax calculation rules for all bills.`,
    aiActivity: `Double Entry & Setup Validation:
Copy and paste this simple prompt into your AI Assistant:
---
"Act as a friendly Tally tutor. I have created a company in Tally Prime named 'Alpha Fly Theni Education' with State as 'Tamil Nadu'.
Please explain:
1. Under Golden Rules, what is the debit/credit rule for paying rent?
2. Under Modern Rules, what happens when cash increases?"
---`,
    handsOnTask: "Start Tally Prime in Educational Mode, create a company named 'Alpha Fly Computer Education' with State set as Tamil Nadu, and look at the screen.",
    assignment: `Please complete the following 5 simple tasks:
1. Write down if the following are Personal, Real, or Nominal accounts: (a) Rent Paid, (b) Cash, (c) Customer Ramesh.
2. According to Modern Rules, do you Debit or Credit when:
   - Cash asset increases.
   - Salary expense increases.
3. In your own simple words, explain the difference between Single Entry and Double Entry systems.
4. List the 3 dates you are allowed to use in Tally Prime's free Educational Mode.
5. Create a company named 'Tally Prime Practice' in Tally Prime, select state 'Tamil Nadu', and write down the shortcut key you used to save it.`,
    quiz: [
      {
        q: "What is the shortcut key to save any page instantly in Tally Prime?",
        opts: ["Ctrl + S", "Ctrl + A", "Alt + C", "F11"],
        ans: 1,
        exp: "Ctrl + A is the universal shortcut in Tally Prime to instantly accept and save any company profile, ledger, or voucher entry."
      },
      {
        q: "Under Golden Rules, what is the rule for Real Accounts (like Cash or Furniture)?",
        opts: ["Debit the receiver, Credit the giver", "Debit what comes in, Credit what goes out", "Debit all expenses, Credit all incomes", "Debit increase, Credit decrease"],
        ans: 1,
        exp: "Real accounts deal with tangible assets: you Debit what comes into the business and Credit what goes out."
      },
      {
        q: "Which state must be selected during company creation for businesses operating in Theni?",
        opts: ["Kerala", "Karnataka", "Tamil Nadu", "Delhi"],
        ans: 2,
        exp: "Selecting Tamil Nadu is critical because Tally automatically configures local SGST and CGST tax calculation rules."
      },
      {
        q: "Which dates are permitted for recording practice transactions in Tally Prime Educational Mode?",
        opts: ["Any day of the month", "1st, 2nd, and 31st of any month", "Only the 1st of every month", "Mondays and Fridays only"],
        ans: 1,
        exp: "Tally Prime's free Educational Mode allows entering transactions on the 1st, 2nd, and 31st of any valid calendar month."
      },
      {
        q: "According to Modern Rules of Accounting, what happens when an Asset (like Bank Balance) increases?",
        opts: ["It is Credited", "It is Debited", "It is entered in Journal F7 only", "It has no effect"],
        ans: 1,
        exp: "Under Modern Rules (Accounting Equation), increases in Assets and Expenses are always Debited (+), while decreases are Credited (-)."
      }
    ],
    reflection: [
      "I can explain bookkeeping and accounting in simple words.",
      "I know the basic Golden Rules and Modern Rules.",
      "I successfully installed Tally Prime on my system.",
      "I know how to create a company profile in Tally."
    ]
  },
  day2: {
    title: "Pre-defined & Custom Groups in Tally Prime",
    objectives: [
      "Understand what a Group is in simple terms.",
      "Identify the 28 pre-defined Groups (15 Primary & 13 Sub-Groups).",
      "Learn how to Create, Alter, and Delete groups in Tally Prime."
    ],
    explanation: `Groups are like folders used to organize similar ledger accounts together. For example, all bank accounts are placed inside the 'Bank Accounts' folder.`,
    explanationSections: [
      {
        type: 'intro',
        title: 'What are Account Groups?',
        content: 'In Tally, every ledger account you create must go inside a Group (folder). This helps Tally summarize your reports. Tally Prime provides 28 pre-defined groups by default, meaning you do not have to create standard folders yourself.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: 'Primary Groups vs. Sub Groups',
        leftTitle: '15 Primary Groups (Main Folders)',
        leftDesc: 'The main folders that build financial reports:\n• Capital Account (Owner money)\n• Fixed Assets (Machinery, Computer)\n• Current Assets (Cash, Bank)\n• Current Liabilities (Dues to pay)\n• Indirect Expenses (Rent, Salaries)\n• Sales Accounts & Purchase Accounts.',
        rightTitle: '13 Sub Groups (Sub-folders)',
        rightDesc: 'Small folders inside the main folders for cleaner sorting:\n• Bank Accounts (inside Current Assets)\n• Cash-in-hand (inside Current Assets)\n• Sundry Debtors/Customers (inside Current Assets)\n• Sundry Creditors/Suppliers (inside Current Liabilities)\n• Reserves & Surplus (inside Capital Account).',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: 'Creating, Altering, and Deleting Groups',
        content: 'Navigate from Gateway of Tally (GOT):\n• Create Group: GOT -> Create -> Group. Type a name (e.g. "Local Customers") and select a parent folder (e.g. "Sundry Debtors"). Press Ctrl+A to save.\n• Alter Group: GOT -> Alter -> Group. Select the group name, modify details, and save.\n• Delete Group: GOT -> Alter -> Group. Select the group and press Alt+D. (Note: Pre-defined folders cannot be deleted.)',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      }
    ],
    demonstration: `Try creating a group:
1. Go to Gateway of Tally -> Create -> Group.
2. Name: 'HDFC Bank Loan'. Select Under: 'Secured Loans'.
3. Press Ctrl+A to save.
4. Go to Gateway of Tally -> Alter -> Group -> Select 'HDFC Bank Loan' -> Press Alt+D and Enter to delete it.`,
    realWorldExample: `A business has customers in Chennai and Madurai. The accountant creates two sub-folders (groups): 'Chennai Customers' and 'Madurai Customers' under the main 'Sundry Debtors' group. This helps see who owes money in each city.`,
    aiActivity: `Group Classification Audit:
Copy and paste this prompt into your AI Assistant:
---
"Act as a helpful Tally tutor. I have 3 items:
1. Dues to a supplier.
2. Petty cash in the drawer.
3. Office printer.
Which pre-defined Tally group folders should I put them under?"
---`,
    handsOnTask: "Open Tally, go to Create -> Group, create a group called 'Office Electronics' under 'Fixed Assets', and verify it in Chart of Accounts.",
    assignment: `Please complete the following 5 simple tasks:
1. Explain what a Group is in Tally Prime using the analogy of folders.
2. List 5 Primary Groups that show up in the Balance Sheet.
3. List 3 Sub-Groups and state which parent Primary Group folder they belong to.
4. Write down the path to create a group called 'Theni Suppliers' under 'Sundry Creditors'.
5. Create a group called 'Temporary Expenses' under 'Indirect Expenses'. Alter its name to 'Daily Expenses'. Finally, delete it using Alt+D.`,
    quiz: [
      {
        q: "How many pre-defined groups are available in Tally Prime by default?",
        opts: ["15", "28 (15 Primary & 13 Sub-Groups)", "13", "30"],
        ans: 1,
        exp: "Tally Prime provides 28 pre-defined groups out-of-the-box, consisting of 15 Primary Groups and 13 Sub-Groups."
      },
      {
        q: "Under which folder (group) should a savings bank account ledger go?",
        opts: ["Capital Account", "Bank Accounts (under Current Assets)", "Fixed Assets", "Indirect Expenses"],
        ans: 1,
        exp: "Bank Accounts is a pre-defined sub-group that belongs to the Primary Group 'Current Assets'."
      },
      {
        q: "What is the shortcut key to delete a group in the Alteration screen?",
        opts: ["Alt + C", "Alt + D", "Ctrl + D", "Delete"],
        ans: 1,
        exp: "Pressing Alt + D in any Alteration screen in Tally Prime triggers the Delete confirmation dialog."
      },
      {
        q: "Can pre-defined default system groups (such as 'Sundry Debtors' or 'Fixed Assets') be deleted in Tally Prime?",
        opts: ["Yes, anytime by pressing Alt + D", "No, pre-defined system groups are permanent and cannot be deleted", "Only if there are no ledgers created", "Only by administrator password"],
        ans: 1,
        exp: "Tally prevents deleting pre-defined system groups to maintain financial statement report integrity."
      },
      {
        q: "Which of the following is a Primary Group that affects the Profit & Loss statement rather than the Balance Sheet?",
        opts: ["Current Liabilities", "Fixed Assets", "Indirect Expenses", "Loans (Liability)"],
        ans: 2,
        exp: "Indirect Expenses (such as Rent, Salaries, Electricity) is a primary group that feeds directly into the Profit & Loss statement."
      }
    ],
    reflection: [
      "I know what a Group folder is.",
      "I understand the difference between Primary Groups and Sub-Groups.",
      "I can Create, Alter, and Delete groups in Tally Prime.",
      "I completed the Group Creation Assignment."
    ]
  },
  day3: {
    title: "Ledgers Creation & Classification",
    objectives: [
      "Understand what a Ledger is in simple terms.",
      "Identify the 2 pre-defined ledgers (Cash and Profit & Loss A/c).",
      "Learn how to Create, Alter, and classify ledgers under correct groups."
    ],
    explanation: `A Ledger is an individual account page representing a person, bank, expense, or income (e.g. SBI Bank, Rent, Salaries). Every ledger must belong to a parent Group.`,
    explanationSections: [
      {
        type: 'intro',
        title: 'What is a Ledger & Ledger Classification?',
        content: '• Ledger: The actual account page where transactions are recorded. For example, if you pay Ramesh, you write it on the "Ramesh A/c" ledger page.\n• Classification: Putting the ledger page inside the correct Group folder. For example, putting "SBI Bank Ledger" inside the "Bank Accounts" group folder.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: 'Pre-defined Ledgers in Tally Prime',
        content: 'Tally automatically creates exactly 2 ledgers for you:\n1. Cash Ledger: Put under the "Cash-in-hand" group folder. You do not need to create it.\n2. Profit & Loss Account Ledger: Put under the "Primary" group folder. Used to show accumulated profits.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      },
      {
        type: 'card',
        title: 'Creating and Altering Ledgers',
        content: 'Navigate from Gateway of Tally (GOT):\n• Create Ledger: GOT -> Create -> Ledger. Type Name (e.g., "Rent Paid"), select Group (e.g., "Indirect Expenses"), and save (Ctrl+A).\n• Alter Ledger: GOT -> Alter -> Ledger. Select the ledger, change details, and press Ctrl+A to save.\n• Delete Ledger: GOT -> Alter -> Ledger. Select the ledger and press Alt+D. (Note: Ledgers with transactions cannot be deleted.)',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      }
    ],
    demonstration: `Practice creating a ledger:
1. Go to Gateway of Tally -> Create -> Ledger.
2. Name: 'Office Rent'. Select Group: 'Indirect Expenses'.
3. Press Ctrl+A to save.
4. To alter opening cash: Go to Gateway of Tally -> Alter -> Ledger -> Select 'Cash' -> Enter opening balance '10000' -> Save (Ctrl+A).`,
    realWorldExample: `A business pays ₹10,000 salaries. The accountant creates a ledger called 'Staff Salaries' under 'Indirect Expenses' group. The payment is recorded out of the pre-defined 'Cash' ledger.`,
    aiActivity: `AI Ledger Classification Challenge:
Copy and paste this prompt into your AI Assistant:
---
"Act as a friendly Tally tutor. Challenge me to classify 5 ledger names under the correct pre-defined groups. Give me the list and wait for my response."
---`,
    handsOnTask: "Open Tally, go to Chart of Accounts -> Ledgers, and see the two pre-defined ledgers. Then create a ledger named 'Computer Machine' under 'Fixed Assets'.",
    assignment: `Create the following 20 ledgers in Tally Prime under the correct groups, and write down the group folder you selected for each:
1. Ramesh (Proprietor Capital)
2. Bank of India (Bank account)
3. HDFC Bank Overdraft Account
4. Building & Premises (Office space)
5. Office Furniture & Fittings
6. Delivery Van (Logistics asset)
7. Stock Reserve A/c
8. GST Input CGST (Tax asset)
9. GST Output SGST (Tax liability)
10. Outstanding Office Salaries
11. Advance received from Client Kumar
12. Purchase Account (Inventory cost)
13. Sales Account (Core revenue)
14. Carriage Inwards on Purchases
15. Wages paid to factory workers
16. Office Rent Expenses
17. Telephone & Internet Charges
18. Salaries paid to office staff
19. Interest received on Bank Deposits
20. Depreciation on Office Computers`,
    quiz: [
      {
        q: "Which two ledgers are already created by default in every new company in Tally Prime?",
        opts: ["Rent A/c and Cash A/c", "Cash A/c and Profit & Loss A/c", "SBI Bank A/c and Sales A/c", "Capital A/c and GST A/c"],
        ans: 1,
        exp: "Tally creates Cash A/c (under Cash-in-hand) and Profit & Loss A/c (under Primary) automatically upon company creation."
      },
      {
        q: "Under which folder (group) does a customer (client who buys on credit) ledger go?",
        opts: ["Sundry Creditors", "Sundry Debtors (Current Assets)", "Fixed Assets", "Direct Expenses"],
        ans: 1,
        exp: "Customers who owe money for credit sales are classified as Sundry Debtors (Current Assets)."
      },
      {
        q: "Under which folder (group) does a supplier (vendor who sells to you on credit) ledger go?",
        opts: ["Sundry Creditors (Current Liabilities)", "Sundry Debtors (Current Assets)", "Direct Incomes", "Investments"],
        ans: 0,
        exp: "Suppliers to whom the business owes payment for credit purchases are classified under Sundry Creditors (Current Liabilities)."
      },
      {
        q: "What key shortcut deletes a ledger from the Alteration screen?",
        opts: ["Ctrl + D", "Alt + D", "Delete", "F7"],
        ans: 1,
        exp: "Pressing Alt + D in the Ledger Alteration screen prompts to permanently delete the ledger (if no vouchers use it)."
      },
      {
        q: "Where can you view the complete hierarchical tree of all created groups and ledgers in Tally Prime?",
        opts: ["Gateway of Tally -> Vouchers", "Gateway of Tally -> Chart of Accounts -> Ledgers", "Alt + K -> Masters", "Display -> Day Book"],
        ans: 1,
        exp: "The Chart of Accounts presents a complete structured tree view of all groups and their nested ledgers."
      }
    ],
    reflection: [
      "I know what a Ledger page is.",
      "I know the 2 default pre-defined ledgers in Tally.",
      "I can Create, Alter, and Delete ledgers.",
      "I completed the assignment to create and classify 20 ledgers."
    ]
  },
  day4: {
    title: "Accounting Reports & Financial Statements",
    objectives: [
      "Understand the purpose and structure of standard Accounting Reports in Tally Prime.",
      "Navigate and interpret the Day Book for daily transaction auditing.",
      "Extract and verify the Trial Balance to check debit and credit accuracy.",
      "Analyze the Profit & Loss Account to calculate Gross and Net Profit/Loss.",
      "Inspect the Balance Sheet to evaluate company assets, liabilities, and capital.",
      "Generate detailed Ledger Reports & Account Books for specific accounts."
    ],
    explanation: `Accounting Reports in Tally Prime automatically compile and summarize all recorded vouchers into meaningful financial statements, including Day Book, Trial Balance, Profit & Loss Account, Balance Sheet, and Ledger Reports.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What are Accounting Reports & The Day Book?',
        content: '• Accounting Reports: Summarized statements generated in real-time from your voucher entries without manual calculation.\n• Day Book (GOT -> Day Book):\n  → Shows all transactions recorded on a specific date in chronological order.\n  → Press F2 to view transactions for any particular date, or Alt+F2 to view a date range / period.\n  → Press Enter on any voucher in the Day Book to drill down, inspect, or modify the entry.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Trial Balance (Arithmetical Accuracy)',
        content: '• Pathway: GOT -> Display More Reports -> Trial Balance (or press Alt+G -> Trial Balance).\n• Purpose: Displays the closing balance of every ledger grouped by parent categories.\n• Key Check: Total Debit balance must exactly equal Total Credit balance. If there is a difference, Tally highlights it as "Diff. in Opening Balances" indicating an unbalanced setup.\n• View Options: Press Alt+F1 / Alt+F5 to expand all groups and see individual ledgers.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Profit & Loss Account vs. Balance Sheet',
        leftTitle: 'Profit & Loss Account (P&L A/c)',
        leftDesc: 'Pathway: Gateway of Tally -> Profit & Loss A/c\n• Trading Account Portion: Sales & Direct Incomes minus Purchases & Direct Expenses = Gross Profit / Gross Loss.\n• Income Statement Portion: Gross Profit minus Indirect Expenses (Rent, Salary, Electricity) + Indirect Incomes = Net Profit / Net Loss.\n• Shows financial performance over a period.',
        rightTitle: 'Balance Sheet (Financial Snapshot)',
        rightDesc: 'Pathway: Gateway of Tally -> Balance Sheet\n• Left Side: Liabilities (Capital, Bank Loans, Sundry Creditors dues).\n• Right Side: Assets (Fixed Assets, Cash, Bank, Sundry Debtors dues).\n• Core Equation: Capital + Liabilities = Total Assets.\n• Shows financial position on a specific date.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Ledger Reports & Account Books',
        content: '• Pathway: GOT -> Display More Reports -> Account Books -> Ledger -> Select Ledger Name.\n• Purpose: Provides complete transaction history, running debit/credit entries, and final closing balance for an individual account (e.g. SBI Bank, Rent A/c, Customer Murugan).\n• Monthly Summary: Press Enter on the ledger to view month-by-month transaction breakdown.\n• Configuration (F12): Enable "Show Opening Balance", "Show Goods details", or "Show running balance" for deep auditing.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      },
      {
        type: 'card',
        title: '5. Essential Reporting Shortcut Keys in Tally Prime',
        content: '• Alt + F1 / Alt + F5: Toggle Detailed / Condensed View across any report.\n• F2: Change reporting date.\n• Alt + F2: Change period (from starting date to ending date).\n• F12: Configure columns, percentages, and display formats for the active report.\n• Ctrl + B: Basis of Values (include/exclude provisional vouchers or ledger types).\n• Alt + P / Ctrl + P: Print reports or export to PDF/Excel.',
        icon: 'Bot',
        color: '#ec4899',
        bgColor: 'rgba(236, 72, 153, 0.03)'
      }
    ],
    demonstration: `Follow these practical steps to navigate and extract reports:
1. Open Tally Prime with your practice company.
2. From Gateway of Tally, press 'K' or click 'Day Book'. Press Alt+F2 to set the date range and Alt+F1 to see detailed lines.
3. Return to GOT -> click 'Display More Reports' (D) -> click 'Trial Balance' (T). Verify that Total Debits = Total Credits.
4. Go to GOT -> click 'Profit & Loss A/c' (P). Review Gross Profit on top and Net Profit at the bottom. Press F12 to display percentages.
5. Go to GOT -> click 'Balance Sheet' (B). Check that Liabilities and Assets sides match.
6. Go to GOT -> Display More Reports -> Account Books -> Ledger -> select 'Cash' or 'SBI Bank' to view the full ledger statement.`,
    realWorldExample: `At the end of the month, the owner of Alpha Fly Traders wants to know if the business is profitable and how much money customers still owe. The accountant opens the Profit & Loss A/c to show ₹48,000 net profit, checks the Balance Sheet for total current assets, and opens Account Books -> Ledger -> 'Customer Murugan' to print an outstanding statement showing ₹10,000 due.`,
    aiActivity: `AI Task: Give an AI-generated explanation of a sample financial report.

Copy and paste this prompt into your AI Assistant:
---
"Act as an experienced Chartered Accountant and Tally Prime expert. 

Here is a sample financial report summary of a small retail business:
• Trial Balance Totals: ₹4,50,000 (Debits) = ₹4,50,000 (Credits)
• Trading & Profit/Loss:
  - Total Sales: ₹3,20,000
  - Purchase Cost: ₹1,90,000
  - Direct Wages: ₹15,000
  - Gross Profit: ₹1,15,000
  - Indirect Expenses (Rent ₹18,000, Salaries ₹35,000, Electricity ₹7,000): ₹60,000
  - Net Profit: ₹55,000
• Balance Sheet:
  - Owner's Capital: ₹2,00,000
  - Net Profit Added: ₹55,000
  - Sundry Creditors (Suppliers due): ₹45,000
  - Fixed Assets (Computer & Furniture): ₹90,000
  - Current Assets: Cash in hand (₹25,000) + Bank Balance (₹1,10,000) + Sundry Debtors (₹75,000) = ₹2,10,000
  - Total Balance Sheet: ₹3,00,000

Please provide a clear, beginner-friendly explanation:
1. Explain what each section (Trial Balance, P&L, Balance Sheet) reveals about the financial health of this company.
2. What is the Gross Profit margin % and Net Profit margin %?
3. What is the company's liquidity position (ability to pay off suppliers from cash/bank/debtors)?
4. What are 3 practical recommendations to improve business operations?"
---`,
    handsOnTask: "Open Tally Prime, navigate to Day Book, Trial Balance, Profit & Loss A/c, Balance Sheet, and Account Books -> Ledger. Practice pressing Alt+F1 for detailed view, F2/Alt+F2 for date range filters, and F12 to configure report options.",
    assignment: `Assignment: Analyse a company's basic reports.

Please complete the following 5 report analysis tasks based on your Tally Prime company data:

1. Day Book Analysis:
   - Explain the primary purpose of the Day Book in daily accounting.
   - What shortcut key is used to change the date range, and what happens when you press Enter on any transaction inside the Day Book?

2. Trial Balance Analysis:
   - Extract the Trial Balance from GOT -> Display More Reports -> Trial Balance.
   - Write down the Total Debit Balance and Total Credit Balance.
   - Explain why the two columns must always be equal in double-entry bookkeeping.

3. Profit & Loss Statement Interpretation:
   - From your company's Profit & Loss A/c, record:
     (a) Total Sales Revenue
     (b) Total Purchases & Direct Expenses
     (c) Calculated Gross Profit / Loss
     (d) Total Indirect Expenses (list top 3 expenses)
     (e) Final Net Profit or Net Loss amount.
   - Calculate the Net Profit Margin % = (Net Profit / Total Sales) * 100.

4. Balance Sheet Structure & Financial Position:
   - From your company's Balance Sheet (Alt+F1 detailed view), identify:
     (a) Total Capital & Net Profit
     (b) Total Current Liabilities (Sundry Creditors)
     (c) Total Fixed Assets
     (d) Total Current Assets (Cash, Bank, Debtors)
   - Verify that Total Liabilities equals Total Assets.

5. Ledger Report Examination:
   - Navigate to GOT -> Display More Reports -> Account Books -> Ledger.
   - Choose one Customer (Sundry Debtor) ledger and one Bank/Cash ledger.
   - For each ledger, state: Opening Balance, Total Debits, Total Credits, and Net Closing Balance.`,
    quiz: [
      {
        q: "Which report in Tally Prime verifies that total debit balances equal total credit balances across all accounts?",
        opts: ["Profit & Loss Account", "Trial Balance", "Balance Sheet", "Day Book"],
        ans: 1,
        exp: "The Trial Balance summarizes all ledger closing balances into Debit and Credit columns to confirm arithmetical accuracy."
      },
      {
        q: "Where in Tally Prime can you view all transactions recorded on a particular date in chronological order?",
        opts: ["Gateway of Tally -> Day Book", "Chart of Accounts", "Display More Reports -> Statistics", "Alt + K -> Company"],
        ans: 0,
        exp: "Gateway of Tally -> Day Book displays all vouchers entered for the selected date or period."
      },
      {
        q: "Which financial statement displays a company's Net Profit or Net Loss for a specific trading period?",
        opts: ["Balance Sheet", "Trial Balance", "Profit & Loss Account", "Cash Flow Statement"],
        ans: 2,
        exp: "The Profit & Loss Account calculates Gross Profit from trading and deducts indirect expenses to arrive at Net Profit or Loss."
      },
      {
        q: "What is the universal shortcut key combination in Tally Prime to toggle between Condensed and Detailed report views?",
        opts: ["Ctrl + D", "Alt + F1 (or Alt + F5)", "F12", "Ctrl + Enter"],
        ans: 1,
        exp: "Alt + F1 (or Alt + F5) expands and collapses group hierarchies to show detailed underlying ledgers in reports."
      },
      {
        q: "What is the correct pathway to inspect the individual statement and transaction history of a specific ledger?",
        opts: ["Gateway of Tally -> Display More Reports -> Account Books -> Ledger", "Gateway of Tally -> Vouchers", "Gateway of Tally -> Alter -> Company", "Alt + G -> Day Book"],
        ans: 0,
        exp: "Gateway of Tally -> Display More Reports -> Account Books -> Ledger allows you to select any ledger and view its detailed statement."
      }
    ],
    reflection: [
      "I can navigate and filter transactions in the Day Book using F2 and Alt+F2.",
      "I understand how to generate and verify a balanced Trial Balance.",
      "I can interpret Gross Profit and Net Profit in the Profit & Loss Account.",
      "I can inspect Assets, Liabilities, and Capital on the Balance Sheet.",
      "I can generate individual Ledger Reports and perform basic company report analysis."
    ]
  },
  tally_project1: {
    title: "Mini Project 1: Small Trading Business",
    objectives: [
      "Create a new business company database in Tally Prime.",
      "Create custom groups and classification folders.",
      "Set up required accounts ledgers with opening balances.",
      "Record capital, purchase, sales, payment, receipt, and contra voucher entries.",
      "Generate and verify Trial Balance and Balance Sheet reports."
    ],
    explanation: "This mini-project simulates setting up a new small trading business named 'Alpha Fly Traders'. You will apply everything learned from Day 1 to Day 4 to set up, record, and close the accounts for the first month of trading.",
    explanationSections: [
      {
        type: 'intro',
        title: 'Project Scenario: Small Trading Business',
        content: 'You are hired as the accountant for "Alpha Fly Traders", a new retail and wholesale electronics trading firm owned by Ramesh. The business starts on 1st April 2026. You need to configure Tally Prime, classify all accounts, record the initial transactions, and print the reports for Ramesh.',
        icon: 'Briefcase',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: 'Project Requirements Checklist',
        content: '• Company Creation: Create "Alpha Fly Traders" in Tally, setting State as Tamil Nadu.\n• Group Setup: Create a custom group "South Zone Customers" under Sundry Debtors folder.\n• Ledger Setup: Create Ramesh Capital A/c (Capital), SBI Bank A/c (Bank), Purchase A/c, Sales A/c, and various supplier/customer ledgers.\n• Transactions Posting: Record startup transactions using the correct voucher types (F4 to F9).\n• Report Verification: Generate and audit the Trial Balance and Profit & Loss Statement.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'card',
        title: 'Practical Transaction Ledger Sheets',
        content: 'Record the following transactions in Tally Prime:\n1. Ramesh started business with cash capital ₹200,000.\n2. Deposited ₹150,000 cash into the company\'s bank account.\n3. Paid shop rent ₹10,000 by bank cheque.\n4. Purchased inventory goods for ₹40,000 on credit from local supplier Saraswathi.\n5. Sold goods for cash ₹15,000.\n6. Sold goods to customer Murugan on credit for ₹25,000.\n7. Received check of ₹15,000 from customer Murugan on account.\n8. Paid supplier Saraswathi ₹20,000 by bank check.\n9. Paid shop assistant salaries ₹8,500 by bank transfer.\n10. Deposited cash cash register surplus ₹5,000 into the bank.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      }
    ],
    demonstration: `How to complete the workflow:
1. Open Tally Prime -> Create Company 'Alpha Fly Traders', select state 'Tamil Nadu'.
2. Go to Masters -> Create -> Ledger (create Capital, Bank, Rent, Saraswathi, Murugan, Purchases, Sales, Salaries).
3. Go to Transactions -> Vouchers.
4. Record transactions 1 to 10 using F4 (Contra), F5 (Payment), F6 (Receipt), F8 (Sales), and F9 (Purchase).
5. Go to GOT -> Display More Reports -> Trial Balance and check the totals.`,
    realWorldExample: `A trading business launches in Theni. By setting up regional customer sub-groups and classifying expense ledgers under 'Indirect Expenses', the owner can see total sales vs regional sales instantly in the Profit & Loss report.`,
    aiActivity: `AI Challenge: 10 Intentionally Confusing Transactions:
Copy and paste this prompt template into your AI Assistant:
---
"Act as a professional Tally tutor. I am working on Mini Project 1: Small Trading Business.
Please give me 10 intentionally confusing business transactions where the correct voucher type is tricky to determine (e.g., contra vs payment, journal vs purchase, receipt vs contra, or non-cash fixed asset purchase).
Present the transactions as a challenge, wait for my voucher choices (F4, F5, F6, F7, F8, F9), and then grade my responses with detailed accounting reasons."
---`,
    handsOnTask: "Launch Tally Prime, create 'Alpha Fly Traders', create all required ledgers, and enter the 10 startup transactions listed above. Verify your Trial Balance total debits equals total credits.",
    assignment: `Please complete the following Mini Project tasks and submit your solutions:
1. Write down the parent group folder you selected for: (a) Ramesh Capital A/c, (b) Murugan, (c) Saraswathi, (d) Rent.
2. Specify the exact Voucher Type (Contra F4, Payment F5, Receipt F6, Sales F8, Purchase F9) you selected for transactions 1, 2, 4, 7, and 9.
3. List the 10 confusing transactions generated by your AI Assistant in the AI Activity, along with the correct voucher types you verified.
4. If you purchased a printer for office use for ₹12,000 on credit from Murugan Systems, explain why it cannot be recorded in F9 (Purchase Voucher). Which voucher type did you use?
5. Generate the final Trial Balance report of 'Alpha Fly Traders' after entering all 10 transactions. Write down the total Debit and Credit balance amount.`,
    quiz: [
      {
        q: "Which voucher type is selected to record 'Ramesh started business with cash capital ₹200,000'?",
        opts: ["Receipt (F6)", "Payment (F5)", "Journal (F7)", "Contra (F4)"],
        ans: 0,
        exp: "When the owner introduces capital, cash flows into the business. You Credit Ramesh Capital A/c and Debit Cash A/c in F6 (Receipt)."
      },
      {
        q: "Under which folder (group) should Murugan (Customer) ledger be classified?",
        opts: ["Sundry Creditors", "Sundry Debtors (Current Assets)", "Loans (Liability)", "Current Liabilities"],
        ans: 1,
        exp: "Customers who purchase goods from you on credit are classified as Sundry Debtors under Current Assets."
      },
      {
        q: "What is the voucher type selected if you transfer cash surplus between two bank accounts?",
        opts: ["Payment (F5)", "Contra (F4)", "Receipt (F6)", "Journal (F7)"],
        ans: 1,
        exp: "Any movement between Cash and Bank or between two Bank accounts is strictly recorded in F4 (Contra)."
      },
      {
        q: "If you purchase an office printer for ₹12,000 on credit from Murugan Systems, which voucher type must you use?",
        opts: ["F9 (Purchase Voucher)", "F7 (Journal Voucher)", "F5 (Payment Voucher)", "F4 (Contra Voucher)"],
        ans: 1,
        exp: "F9 (Purchase) is exclusively for inventory goods meant for resale. Purchasing fixed assets on credit is recorded in F7 (Journal)."
      },
      {
        q: "In an accurate Trial Balance report generated in Tally, what must always be true regarding the totals?",
        opts: ["Debit total must be greater than Credit total", "Credit total must be double the Debit total", "Total Debit balance must exactly equal Total Credit balance", "Net Profit must be zero"],
        ans: 2,
        exp: "Under the double-entry accounting system, every debit has an equal credit, so total debits and credits in the Trial Balance must balance."
      }
    ],
    reflection: [
      "I can create a business company profile database.",
      "I can classify customer and supplier ledgers under the right group folders.",
      "I completed the Small Trading Business Mini Project."
    ]
  },
  day5: {
    title: "Complete Accounting Practice",
    objectives: [
      "Record Cash and Credit Purchase & Sales entries.",
      "Record Purchase & Sales returns using Debit & Credit Notes.",
      "Record Cash ↔ Bank and Bank ↔ Bank transfers using Contra vouchers.",
      "Record adjustments and credit asset purchases in Journal vouchers."
    ],
    explanation: `This session covers the complete workflow for daily business accounting entries, combining Purchases, Sales, Returns, Bank Transfers, and Adjustments.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Purchase & Sales Entries (Cash & Credit)',
        content: '• Cash Purchase (F9): Buying items for cash immediately. Debit Purchase A/c, Credit Cash.\n• Credit Purchase (F9): Buying items on credit. Debit Purchase A/c, Credit Supplier (Sundry Creditor).\n• Cash Sales (F8): Selling items for cash immediately. Debit Cash, Credit Sales A/c.\n• Credit Sales (F8): Selling items on credit. Debit Customer (Sundry Debtor), Credit Sales A/c.',
        icon: 'ShoppingCart',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Purchase & Sales Returns',
        content: '• Purchase Return (Debit Note - Alt+F5): Used when you return goods to suppliers. Debit Supplier, Credit Purchase Returns.\n• Sales Return (Credit Note - Alt+F6): Used when customers return goods to you. Debit Sales Returns, Credit Customer.',
        icon: 'RefreshCw',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'card',
        title: '3. Cash ↔ Bank & Bank ↔ Bank (Contra)',
        content: '• Contra Voucher (F4) is only for internal money transfers:\n  → Cash Deposit: Debit Bank, Credit Cash.\n  → Cash Withdrawal: Debit Cash, Credit Bank.\n  → Bank to Bank Transfer: Debit Receiving Bank, Credit Giving Bank.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Adjustment Entries & Journal (F7)',
        content: '• Journal Voucher (F7) is for non-cash adjustments like charging depreciation, asset purchase on credit, or writing off bad debts. Debit Expense/Loss, Credit Asset/Supplier.',
        icon: 'Sliders',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Typical entry steps:
1. Deposit: Go to GOT -> Vouchers -> F4. Credit Cash, Debit Bank.
2. Sales Return: Press Alt+F6. Debit Sales Returns, Credit Customer.
3. Depreciation: Press F7. Debit Depreciation, Credit Computer A/c.`,
    realWorldExample: `A trading store records all sales, purchases, and returns. By using Contra for deposits and Journal for monthly laptop depreciation, the Balance Sheet stays perfectly balanced.`,
    aiActivity: `AI Challenge - 10 Intentionally Confusing Transactions:
Copy and paste this prompt:
---
"Act as a professional Tally tutor. I am working on Day 5: Complete Accounting Practice.
Please give me 10 intentionally confusing business transactions (e.g. contra vs payment, journal vs purchase, receipt vs contra, drawings, or non-cash assets) and challenge me to identify the correct voucher type.
Present the transactions one-by-one, wait for my response, and then grade my choice and explain the accounting rules."
---`,
    handsOnTask: "Launch Tally Prime, open Vouchers, and practice toggling F4, F5, F6, F7, F8, F9, Alt+F5, and Alt+F6.",
    assignment: `Please record the following 20 mixed entries in Tally Prime, identifying the correct Voucher Type (Contra, Payment, Receipt, Journal, Sales, Purchase) for each:

1. Ramesh started business with cash capital of ₹500,000.
2. Deposited ₹350,000 cash into SBI Current Account.
3. Transferred ₹100,000 from SBI Current Account to HDFC Current Account.
4. Purchased office laptops for ₹45,000 on credit from Dell India Ltd.
5. Paid shop rent of ₹15,000 by check from SBI Account.
6. Purchased goods for cash ₹25,000 from local distributors.
7. Sold goods on credit to customer Raja for ₹38,000.
8. Withdrew ₹12,000 cash from HDFC Account for office petty cash use.
9. Customer Raja paid ₹20,000 of his due balance by check to our SBI Account.
10. Returned damaged goods worth ₹3,500 back to supplier Saraswathi Traders.
11. Customer Murugan returned damaged goods worth ₹2,000 back to us.
12. Paid advertising expenses of ₹6,500 by bank check.
13. Transferred ₹5,000 cash to petty cash box.
14. Paid shop electric bill of ₹4,200 from SBI Account.
15. Paid Dell India Ltd ₹30,000 on account by check from HDFC Account.
16. Sold goods for cash ₹18,000.
17. Purchased office furniture for ₹15,000 from Wood Works on credit.
18. Charged depreciation of ₹4,500 on office laptops.
19. Received bank interest of ₹1,800 credited directly to SBI Account.
20. Withdrew cash ₹8,000 for Ramesh's personal use (Drawings).

Submit a table showing: Transaction No., Voucher Type, Debit Ledger, Credit Ledger, and Amount.`,
    quiz: [
      {
        q: "Which voucher shortcut is used to record a Purchase Return when returning damaged goods back to a supplier?",
        opts: ["Alt + F5 (Debit Note)", "Alt + F6 (Credit Note)", "F9 (Purchase)", "F7 (Journal)"],
        ans: 0,
        exp: "Alt + F5 (Debit Note) is used to record purchase returns to suppliers, debiting the supplier's account to reduce payable dues."
      },
      {
        q: "Which voucher shortcut is used to record a Sales Return when a customer returns goods to your store?",
        opts: ["Alt + F6 (Credit Note)", "Alt + F5 (Debit Note)", "F8 (Sales)", "F5 (Payment)"],
        ans: 0,
        exp: "Alt + F6 (Credit Note) is used to record sales returns from customers, crediting the customer's account to reduce their receivable balance."
      },
      {
        q: "Which voucher type is used for moving money directly from an HDFC bank to an SBI bank account?",
        opts: ["Contra (F4)", "Payment (F5)", "Journal (F7)", "Receipt (F6)"],
        ans: 0,
        exp: "Bank-to-Bank transfers are internal cash-flow adjustments recorded using F4 (Contra), debiting the receiving bank and crediting the giving bank."
      },
      {
        q: "Which voucher is used to record drawings (withdrawing cash for personal household use)?",
        opts: ["Receipt (F6)", "Payment (F5)", "Contra (F4)", "Journal (F7)"],
        ans: 1,
        exp: "Owner drawings represent a cash outflow from the business, recorded in F5 (Payment) by debiting Drawings A/c and crediting Cash/Bank."
      },
      {
        q: "What is the accounting entry to record annual depreciation of ₹5,000 on office computers?",
        opts: ["Debit Depreciation A/c ₹5,000 | Credit Computer A/c ₹5,000 (in F7 Journal)", "Debit Cash A/c ₹5,000 | Credit Depreciation A/c ₹5,000 (in F6 Receipt)", "Debit Computer A/c ₹5,000 | Credit Bank A/c ₹5,000 (in F5 Payment)", "Debit Profit A/c ₹5,000 | Credit Cash A/c ₹5,000 (in F4 Contra)"],
        ans: 0,
        exp: "Depreciation is a non-cash expense: Debit Depreciation Expense (Nominal) and Credit Computer Asset (Real) in F7 Journal."
      }
    ],
    reflection: [
      "I can post bank deposits, withdrawals, and bank-to-bank transfers.",
      "I can enter adjustment entries in Journal voucher.",
      "I completed the 20 mixed entries practice assignment."
    ]
  },
  day6: {
    title: "Day 6 — Inventory Basics: Stock Groups, Categories, Items & Units",
    objectives: [
      "Understand the fundamentals of inventory tracking in Tally Prime.",
      "Create and organize Stock Groups for top-level inventory classification.",
      "Define Stock Categories for parallel and attribute-based grouping.",
      "Configure Simple and Compound Units of Measurement (UoM).",
      "Create Stock Items with opening quantity, rate, unit, and valuation methods."
    ],
    explanation: `Inventory in Tally Prime allows businesses to record, track, and manage physical stock in real-time. By configuring Stock Groups, Stock Categories, Units of Measurement, and Stock Items, businesses gain complete control over quantities, costs, and stock valuation.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is Inventory & Stock Hierarchy in Tally?',
        content: '• Inventory Management: Tracking stock items bought, held in godowns, and sold to customers with real-time valuation.\n• Inventory Hierarchy in Tally Prime:\n  1. Stock Groups: Top-level classification (e.g. Medicines, Electronics, Groceries).\n  2. Stock Categories: Parallel classification by specification (e.g. Antibiotics, 500mg, 4K Smart TV).\n  3. Units of Measurement: How goods are measured (e.g. Pcs, Box, Strip, Kg, Litre).\n  4. Stock Items: The actual physical products (e.g. Paracetamol 500mg, Sony 55" TV).',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Stock Groups vs. Stock Categories',
        content: '• Stock Groups (GOT -> Create -> Stock Group):\n  → Groups items by primary nature or brand (e.g. "Tablets", "Syrups", "Laptops").\n  → You can enable "Should quantities of items be added?" = YES to summarize totals.\n• Stock Categories (GOT -> Create -> Stock Category):\n  → Cross-classifies items across different groups (e.g. "Painkillers", "Pediatric", "16GB RAM").\n  → Enables filtering regardless of which brand or group the item belongs to.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Units of Measurement: Simple vs. Compound Units',
        leftTitle: 'Simple Units (Single Measure)',
        leftDesc: 'Pathway: GOT -> Create -> Unit -> Type: Simple\n• Symbol: Pcs, Box, Strip, Kg, Nos, Ltr.\n• Formal Name: Pieces, Boxes, Strips, Kilograms.\n• Decimal Places: Set to 0 for pieces/boxes; set to 2 or 3 for weights (e.g. 2.500 Kg).',
        rightTitle: 'Compound Units (Multi-Level)',
        rightDesc: 'Pathway: GOT -> Create -> Unit -> Type: Compound\n• Definition: Combination of two simple units with a conversion factor.\n• Examples:\n  → 1 Box of 10 Strips (1 Box = 10 Strip)\n  → 1 Dozen of 12 Nos (1 Doz = 12 Nos)\n  → 1 Carton of 24 Bottles (1 Ctn = 24 Btl)',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Creating Stock Items Step-by-Step',
        content: 'Pathway: Gateway of Tally -> Create -> Stock Item\n1. Name: Enter item name (e.g. "Amoxicillin 500mg").\n2. Under: Select parent Stock Group (e.g. "Tablets").\n3. Category: Select Stock Category (e.g. "Antibiotics").\n4. Units: Select Base Unit (e.g. "Strip" or "Box of 10 Strip").\n5. Opening Balance: Enter opening Quantity, Rate per unit, and Total Value if stock exists at startup.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      },
      {
        type: 'card',
        title: '5. Stock Valuation Methods',
        content: '• Tally Prime automatically calculates closing stock value using your chosen method:\n  → Average Cost (Default): Moving average of purchase prices.\n  → FIFO (First In, First Out): Oldest stock items sold first.\n  → Last Purchase Cost: Valued at most recent supplier rate.\n  → Standard Cost / Price: Pre-determined benchmark rates.',
        icon: 'Bot',
        color: '#ec4899',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Follow these steps to create an inventory master structure:
1. Open Tally Prime -> Go to Create -> Unit.
   - Type 'Simple' -> Symbol: 'Nos', Formal Name: 'Numbers'.
   - Type 'Simple' -> Symbol: 'Box', Formal Name: 'Boxes'.
   - Type 'Compound' -> 1 Box = 10 Nos.
2. Go to Create -> Stock Group -> Name: 'Smartphones', Under: 'Primary', Quantities added: 'Yes'.
3. Go to Create -> Stock Category -> Name: '5G Android'.
4. Go to Create -> Stock Item -> Name: 'Redmi Note 13', Under: 'Smartphones', Category: '5G Android', Units: 'Nos', Opening Qty: 15 Nos @ ₹14,000/Nos.
5. Go to Gateway of Tally -> Stock Summary to verify your initial stock balance.`,
    realWorldExample: `A pharmacy store receives 50 boxes of Paracetamol. The accountant configures the Unit as '1 Box = 10 Strips'. When a retail customer buys 2 strips, Tally automatically deducts 2 strips from the total on-hand stock and displays the remaining balance as 49 Boxes and 8 Strips.`,
    aiActivity: `AI Task: Classify products into appropriate stock groups.

Copy and paste this prompt into your AI Assistant:
---
"Act as an experienced inventory management consultant and Tally Prime expert.

Here is a raw list of 15 retail products:
1. Amoxicillin 250mg Suspension (60ml)
2. Dell Wireless Optical Mouse
3. Paracetamol 650mg Tablets
4. HP LaserJet Pro Printer Toner
5. Cough Relief Herbal Syrup (100ml)
6. Samsung Galaxy S24 Ultra (256GB)
7. Cotton Bandage Roll (10cm x 4m)
8. SanDisk 64GB USB 3.0 Flash Drive
9. Vitamin C 500mg Chewable
10. Logitech Mechanical Keyboard
11. Digital Blood Pressure Monitor
12. Ciprofloxacin Eye Drops (5ml)
13. Fast Charging USB-C Cable (1.5m)
14. Azithromycin 500mg Strip
15. Infrared Forehead Thermometer

Please structure and classify these products for Tally Prime:
1. Recommend 4 distinct primary Stock Groups.
2. Recommend appropriate Stock Categories for cross-classification.
3. Define the base Unit of Measurement (Simple and Compound where applicable) for each product.
4. Provide a structured table ready for Tally Prime Stock Item creation."
---`,
    handsOnTask: "Launch Tally Prime, create 3 Units of Measurement (including 1 compound unit), 3 Stock Groups, 2 Stock Categories, and 5 Stock Items with opening quantities. Verify the results in Stock Summary.",
    assignment: `Assignment: Inventory Basics & Master Creation Setup

Please complete the following inventory master setup tasks in Tally Prime:

1. Units Setup:
   - Create Simple Units: (a) Nos, (b) Box, (c) Strip, (d) Kg, (e) Bottle.
   - Create 2 Compound Units: (a) 1 Box = 10 Strips, (b) 1 Carton = 20 Bottles.

2. Stock Groups & Categories:
   - Create 3 Stock Groups: 'Tablets & Capsules', 'Syrups & Liquids', 'Medical Equipment'.
   - Create 3 Stock Categories: 'Prescription Drugs', 'Over-The-Counter (OTC)', 'Diagnostic Devices'.

3. Stock Items Creation (Create 10 Stock Items with the following opening stock):
   - 1. Paracetamol 650mg (Tablets / OTC / 20 Boxes of 10 Strips @ ₹250/Box)
   - 2. Amoxicillin 500mg (Tablets / Prescription / 15 Boxes of 10 Strips @ ₹450/Box)
   - 3. Cough Expectorant 100ml (Syrups / OTC / 40 Bottles @ ₹85/Bottle)
   - 4. Multivitamin Tonic 200ml (Syrups / OTC / 30 Bottles @ ₹130/Bottle)
   - 5. Digital BP Monitor (Medical Equipment / Diagnostic / 10 Nos @ ₹1,400/Nos)
   - 6. Pulse Oximeter (Medical Equipment / Diagnostic / 15 Nos @ ₹650/Nos)
   - 7. Azithromycin 250mg (Tablets / Prescription / 10 Boxes of 10 Strips @ ₹520/Box)
   - 8. Antacid Gel 150ml (Syrups / OTC / 25 Bottles @ ₹95/Bottle)
   - 9. Glucometer Kit (Medical Equipment / Diagnostic / 8 Nos @ ₹950/Nos)
   - 10. Cetirizine 10mg (Tablets / OTC / 25 Boxes of 10 Strips @ ₹180/Box)

4. Verification & Submission:
   - Open Gateway of Tally -> Stock Summary.
   - Submit a summary table of all 10 items showing Group, Unit, Opening Quantity, Rate, and Total Value.`,
    quiz: [
      {
        q: "What is the primary purpose of a 'Compound Unit' in Tally Prime?",
        opts: ["To calculate GST tax automatically", "To define a relationship between two simple units (e.g. 1 Box = 10 Strips)", "To assign multiple godowns to an item", "To value closing stock at market rate"],
        ans: 1,
        exp: "Compound units represent a fixed conversion relationship between two simple units (such as 1 Box = 10 Strips or 1 Dozen = 12 Nos)."
      },
      {
        q: "Where in Tally Prime do you configure whether quantities of items inside a group should be added together?",
        opts: ["Stock Group Creation / Alteration screen", "F12 Configuration only", "Stock Summary Display", "Company Features (F11)"],
        ans: 0,
        exp: "In the Stock Group Creation/Alteration screen, setting 'Should quantities of items be added?' to Yes enables group quantity aggregation."
      },
      {
        q: "What is the key difference between a Stock Group and a Stock Category?",
        opts: ["Stock Groups classify items by primary nature/brand; Stock Categories enable parallel cross-classification", "Stock Groups are for services; Stock Categories are for goods", "Stock Groups require GST; Stock Categories do not", "There is no difference"],
        ans: 0,
        exp: "Stock Groups organize items hierarchically by primary family/brand, while Stock Categories allow parallel classification across multiple groups."
      },
      {
        q: "What is the default stock valuation method in Tally Prime?",
        opts: ["LIFO (Last In First Out)", "Average Cost", "Standard Cost", "Monthly Average"],
        ans: 1,
        exp: "By default, Tally Prime values closing inventory using the Average Cost method unless customized in the item master."
      },
      {
        q: "Which screen in Tally Prime gives an instant overview of total quantity, rate, and valuation of all stock on hand?",
        opts: ["Gateway of Tally -> Stock Summary", "Gateway of Tally -> Balance Sheet", "Display More Reports -> Day Book", "Chart of Accounts -> Ledgers"],
        ans: 0,
        exp: "The Stock Summary screen displays real-time on-hand inventory quantities, average rates, and total stock valuation."
      }
    ],
    reflection: [
      "I understand the difference between Stock Groups, Categories, Units, and Items.",
      "I can create Simple and Compound Units of Measurement.",
      "I know how to configure opening stock quantities and rates.",
      "I completed the inventory master classification assignment."
    ]
  },
  day7: {
    title: "Day 7 — Godown & Batch Management: Multi-Location, Batches & Expiry",
    objectives: [
      "Enable and manage multi-location Godowns/Warehouses in Tally Prime.",
      "Configure Batch-wise details with Manufacturing (Mfg) and Expiry (Exp) dates.",
      "Record inter-godown stock transfers using the Stock Journal Voucher (Alt + F7).",
      "Monitor stock balances across locations and audit near-expiry batches.",
      "Identify common stock-management vulnerabilities and bottlenecks."
    ],
    explanation: `Multi-location and batch management allow businesses to track physical goods across multiple godowns (warehouses, retail stores, cold storage) while strictly monitoring batch numbers, manufacturing dates, and shelf-life expiration dates.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What are Godowns (Locations) in Tally Prime?',
        content: '• Godown / Location: Physical spaces where inventory items are stored (e.g. "Main Warehouse", "Showroom Floor", "Cold Storage", "Theni Branch").\n• Enable Godowns: Press F11 (Company Features) -> Set "Enable Godowns" = YES.\n• Create Godowns (GOT -> Create -> Godown):\n  → Name: Enter godown name.\n  → Under: Primary (or nested under a parent regional hub).',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Batch-wise Details & Expiry Dates Configuration',
        content: '• Enable Batches in F11: Set "Enable Batches" = YES and "Maintain Expiry Dates for Batches" = YES.\n• In Stock Item Master:\n  → Set "Maintain in Batches" = YES.\n  → Set "Track date of manufacturing" = YES.\n  → Set "Use expiry dates" = YES.\n• Every time you purchase or sell this item, Tally prompts for Batch Number, Mfg Date, and Expiry Date.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Stock Journal Voucher (Alt + F7) for Stock Transfers',
        leftTitle: 'Source (Consumption) Side',
        leftDesc: 'Left side of Stock Journal:\n• Select Source Godown where goods currently sit.\n• Select Stock Item, Batch No., Quantity, and Rate.\n• This deducts stock from the origin location.',
        rightTitle: 'Destination (Production) Side',
        rightDesc: 'Right side of Stock Journal:\n• Select Destination Godown where goods are arriving.\n• Select Stock Item, Batch No., Quantity, and Rate.\n• This adds stock to the receiving location without altering overall company quantities.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Tracking Multi-Location Stock & Expiry Reports',
        content: '• Godown Summary: GOT -> Display More Reports -> Inventory Books -> Godowns (View stock breakdown per warehouse).\n• Batch Summary: GOT -> Display More Reports -> Inventory Books -> Batch (Inspect individual batch balances and expiration dates).\n• Expired Stock Warning: Tally flags or prevents billing of expired batches during sales invoicing.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Practice Godowns, Batches, and Stock Transfers:
1. Press F11 -> Enable 'Maintain Godowns' = YES. Enable 'Enable Batches' = YES.
2. Go to Create -> Godown -> Create 'Central Warehouse' and 'Front Retail Counter'.
3. Create Stock Item 'Dolo 650mg' -> Set 'Maintain in batches' = YES -> 'Use expiry dates' = YES.
4. Enter opening balance: 100 Strips in 'Central Warehouse', Batch 'DL-2026', Mfg: '01-Jan-2026', Exp: '31-Dec-2027' @ ₹20/Strip.
5. Go to Vouchers -> Press Alt+F7 (Stock Journal) -> Transfer 40 Strips from 'Central Warehouse' to 'Front Retail Counter'.
6. Check GOT -> Display More Reports -> Inventory Books -> Godowns to verify split balances.`,
    realWorldExample: `A medical distributor receives 500 vials of insulin stored in 'Cold Storage Godown'. When local clinics request stock, 50 vials are transferred to 'Dispatch Godown' using Stock Journal (Alt+F7). The batch number and expiry date carry over automatically, ensuring FIFO dispensing and zero expired stock loss.`,
    aiActivity: `AI Activity: Identify possible stock-management issues.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Senior Supply Chain & Inventory Audit Specialist.

Here is a multi-location stock audit report for a retail distributor operating 3 godowns (Central Depot, Branch Store, Transit Godown):

Product A (Amoxicillin 500mg):
- Central Depot: 250 Boxes | Batch: BX-101 | Mfg: Oct-2024 | Exp: Apr-2026 (Expiring in 30 days) | Monthly Sales: 20 Boxes.
- Branch Store: 5 Boxes | Batch: BX-205 | Mfg: Jan-2026 | Exp: Jan-2028 | Daily demand: 8 Boxes (Stockout imminent).

Product B (Blood Pressure Monitors):
- Central Depot: 120 Units | Cost: ₹1,500/unit | Monthly Sales: 2 Units (Holding duration: 9 months).
- Branch Store: 0 Units.

Product C (Syrups):
- Transit Godown: 100 Bottles recorded 45 days ago, still showing in transit without receipt confirmation.

Please analyze this inventory report and identify:
1. 5 critical stock-management vulnerabilities and financial risks.
2. The root cause of the imminent stockout vs. near-expiry bottleneck for Product A.
3. An action plan to liquidate Product B (slow-moving capital lockup).
4. Reconciliation steps for Transit Godown discrepancies."
---`,
    handsOnTask: "Enable Godowns and Batches in Tally Prime. Create 2 Godowns ('Main Depot' and 'Store Shelf'), create a batch-enabled item with Mfg and Expiry dates, and record a stock transfer of 20 units via Stock Journal (Alt+F7).",
    assignment: `Assignment: Create a multi-location inventory system.

Please complete the following multi-location inventory setup and transfer workflow in Tally Prime:

1. Enable Features (F11):
   - Enable Godowns: YES
   - Enable Batches: YES
   - Maintain Expiry Dates: YES

2. Godown Network Setup:
   - Create 3 Godowns: (a) 'Central Warehouse', (b) 'Town Retail Shop', (c) 'Cold Storage Unit'.

3. Batch-Enabled Stock Items (Create 4 items with opening stock in Central Warehouse / Cold Storage):
   - Item 1: 'Ceftriaxone Injection 1g' (Under: Injections / Godown: Cold Storage / Qty: 200 Vials / Batch: CF-901 / Mfg: 01-Jan-2026 / Exp: 31-Dec-2027 / Rate: ₹85)
   - Item 2: 'Azithromycin 500mg' (Under: Tablets / Godown: Central Warehouse / Qty: 150 Boxes / Batch: AZ-442 / Mfg: 01-Feb-2026 / Exp: 31-Jan-2028 / Rate: ₹320)
   - Item 3: 'Pediatric Cough Syrup' (Under: Syrups / Godown: Central Warehouse / Qty: 100 Bottles / Batch: CS-110 / Mfg: 01-Mar-2026 / Exp: 31-Aug-2027 / Rate: ₹75)
   - Item 4: 'Insulin Glargine 100IU' (Under: Diabetes / Godown: Cold Storage / Qty: 80 Pens / Batch: IN-552 / Mfg: 01-Jan-2026 / Exp: 30-Jun-2027 / Rate: ₹550)

4. Stock Transfer Vouchers (Alt + F7):
   - Transfer 1: Move 50 Boxes of Azithromycin from 'Central Warehouse' to 'Town Retail Shop'.
   - Transfer 2: Move 30 Bottles of Pediatric Cough Syrup from 'Central Warehouse' to 'Town Retail Shop'.
   - Transfer 3: Move 25 Pens of Insulin from 'Cold Storage Unit' to 'Town Retail Shop'.

5. Reporting & Verification:
   - Go to Display More Reports -> Inventory Books -> Godowns.
   - Submit a screenshot or table displaying the stock breakdown in each of the 3 godowns.`,
    quiz: [
      {
        q: "Which voucher type is used in Tally Prime to transfer stock from one godown to another?",
        opts: ["Receipt Voucher (F6)", "Stock Journal Voucher (Alt + F7)", "Payment Voucher (F5)", "Physical Stock Voucher (Ctrl + F7)"],
        ans: 1,
        exp: "The Stock Journal Voucher (Alt + F7) allows transferring stock between Source (Consumption) and Destination (Production) godowns."
      },
      {
        q: "Which company feature in F11 must be enabled to track manufacturing and expiry dates of products?",
        opts: ["Enable Batches & Maintain Expiry Dates", "Enable Order Processing", "Enable Cost Centres", "Enable Job Costing"],
        ans: 0,
        exp: "Enabling 'Enable Batches' and 'Maintain Expiry Dates for Batches' in F11 activates batch, mfg, and expiry tracking."
      },
      {
        q: "What happens on the overall company stock balance when a Stock Journal transfer is recorded between two godowns?",
        opts: ["Total company stock quantity increases", "Total company stock quantity decreases", "Total company stock remains unchanged, but location-wise balances are updated", "All items are marked as expired"],
        ans: 2,
        exp: "Stock Journal transfers move goods internally between locations without altering the total company-wide inventory balance."
      },
      {
        q: "Where can you view the detailed batch-wise stock balance along with manufacturing and expiration dates?",
        opts: ["Gateway of Tally -> Balance Sheet", "Display More Reports -> Inventory Books -> Batch", "Display More Reports -> Day Book", "Chart of Accounts -> Ledgers"],
        ans: 1,
        exp: "Display More Reports -> Inventory Books -> Batch provides a comprehensive breakdown of all batches, quantities, and expiry dates."
      },
      {
        q: "If a batch has passed its expiry date, what is the best practice in Tally Prime during sales invoicing?",
        opts: ["Tally automatically issues a discount", "Tally warns or restricts selecting the expired batch to prevent illegal/unsafe sales", "Tally deletes the stock item", "Tally converts the item to cash"],
        ans: 1,
        exp: "Tally Prime warns the user and restricts billing expired batches during sales voucher entry to protect business compliance."
      }
    ],
    reflection: [
      "I can create multiple godowns and configure hierarchical locations.",
      "I know how to maintain batch numbers, manufacturing dates, and expiry dates.",
      "I can record inter-godown transfers using Stock Journal (Alt+F7).",
      "I completed the multi-location inventory system assignment."
    ]
  },
  day8: {
    title: "Day 8 — Inventory Transactions: Purchases, Sales & Stock Movement",
    objectives: [
      "Switch between Accounting Invoice, Item Invoice, and As Voucher modes using Ctrl+H.",
      "Record inventory purchase vouchers (F9) with item name, godowns, batches, and rates.",
      "Record inventory sales invoices (F8) with automatic stock deduction and billing.",
      "Track inward and outward stock movements in real-time.",
      "Audit inventory reports including Movement Analysis and Item-wise Registers."
    ],
    explanation: `Inventory transactions integrate accounting with physical stock movements. Recording purchases (F9) increases inventory in the designated godown, while sales (F8) automatically updates cost of goods sold, reduces on-hand quantities, and calculates gross profit.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Invoice Modes in Tally Prime (Ctrl + H)',
        content: 'Press Ctrl + H (Change Mode) in Purchase (F9) or Sales (F8) to select:\n• Item Invoice: Used when billing physical goods (shows Item Name, Godown, Batch, Qty, Rate, Amount).\n• Accounting Invoice: Used for service billing without inventory items (shows Ledger Name and Amount).\n• As Voucher: Traditional Debit/Credit double entry format.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Inventory Purchase Entry (F9)',
        content: 'Workflow for Recording Purchase (F9):\n1. Supplier Invoice No. & Date.\n2. Party A/c Name: Select Supplier ledger (under Sundry Creditors).\n3. Purchase Ledger: Select "Purchase Account".\n4. Name of Item: Select Stock Item -> Choose Godown -> Choose Batch No -> Enter Qty & Rate.\n5. Press Ctrl+A to save. (Stock increases immediately in the selected godown).',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'card',
        title: '3. Inventory Sales Invoice Entry (F8)',
        content: 'Workflow for Recording Sales (F8):\n1. Party A/c Name: Select Customer ledger (under Sundry Debtors) or "Cash".\n2. Sales Ledger: Select "Sales Account".\n3. Name of Item: Select Stock Item -> Choose Godown to dispatch from -> Select active Batch -> Enter Qty & Selling Rate.\n4. Press Ctrl+A to save. (Stock decreases in godown, generating revenue and calculating profit).',
        icon: 'ShoppingCart',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      },
      {
        type: 'card',
        title: '4. Stock Reports & Movement Tracking',
        content: '• Stock Summary: Real-time on-hand stock position.\n• Movement Analysis (GOT -> Display More Reports -> Inventory Books -> Movement Analysis):\n  → Item-wise Movement: Shows suppliers bought from, customers sold to, and average buying/selling rates.\n  → Group-wise Movement: Analyzes category velocity.\n• Stock Register: Inward, Outward, and Closing stock balances.',
        icon: 'Briefcase',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      }
    ],
    demonstration: `Follow these entry steps:
1. Go to Vouchers -> Press F9 (Purchase). Press Ctrl+H and select 'Item Invoice'.
2. Select Party 'Apollo Healthcare Distributors'.
3. Select Item 'Paracetamol 650mg' -> Godown 'Main Warehouse' -> Batch 'PAR-2026' -> Qty '50 Boxes' @ ₹200/Box.
4. Press Ctrl+A to save purchase.
5. Press F8 (Sales) -> Select Party 'Murugan Medicals' -> Select 'Paracetamol 650mg' -> Godown 'Main Warehouse' -> Batch 'PAR-2026' -> Qty '20 Boxes' @ ₹300/Box.
6. Check GOT -> Stock Summary to see 30 Boxes remaining, with Gross Profit of ₹2,000 recorded automatically.`,
    realWorldExample: `A retail store buys 100 units of LED bulbs @ ₹120 each. When selling 15 units to a customer @ ₹180 in F8, Tally records ₹2,700 sales revenue, reduces stock to 85 units, records ₹1,800 cost of sales, and recognizes ₹900 gross margin instantly.`,
    aiActivity: `AI Activity: Validate inventory transactions and stock movements.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Senior Inventory Accounting Trainer. 

I am practicing 5 complex inventory transactions in Tally Prime:
1. Purchased 100 units of Product A @ ₹500 on credit with 5% trade discount.
2. Sold 30 units of Product A @ ₹750 on cash.
3. Returned 5 defective units back to the supplier (Purchase Return / Debit Note).
4. Customer returned 2 units back to our store (Sales Return / Credit Note).
5. Transferred 20 units from Warehouse to Showroom.

Please verify and explain:
1. What is the exact closing quantity and total valuation remaining in stock?
2. What are the debit and credit ledger accounts affected in each transaction?
3. What is the calculated Gross Profit from these sales?"
---`,
    handsOnTask: "Open Tally Prime, record 2 Purchase vouchers with Item Invoice mode and 2 Sales invoices with godown allocations. Audit the resulting stock movements in Stock Summary.",
    assignment: `Assignment: Complete 20 inventory transactions.

Record the following 20 practical inventory transactions in Tally Prime using Item Invoice mode (Educational Mode dates 1st, 2nd, 31st):

Purchases (F9):
1. Purchased 50 Boxes of 'Paracetamol 650mg' @ ₹200/Box from Apex Pharma to 'Central Warehouse'.
2. Purchased 40 Bottles of 'Amoxicillin Syrup' @ ₹65/Bottle from MedSupply Ltd to 'Central Warehouse'.
3. Purchased 20 Nos of 'Digital Thermometers' @ ₹220/Nos from HealthTech Co to 'Town Store'.
4. Purchased 30 Boxes of 'Cough Lozenges' @ ₹150/Box for cash to 'Town Store'.
5. Purchased 60 Vials of 'Vitamin B12' @ ₹90/Vial from Apex Pharma to 'Central Warehouse'.
6. Purchased 25 Nos of 'Pulse Oximeters' @ ₹500/Nos from HealthTech Co to 'Central Warehouse'.
7. Purchased 100 Strips of 'Antacid Tablets' @ ₹35/Strip from MedSupply Ltd to 'Town Store'.
8. Purchased 15 Units of 'Vaporizers' @ ₹350/Unit for cash to 'Town Store'.

Sales (F8):
9. Sold 20 Boxes of 'Paracetamol 650mg' @ ₹300/Box to Murugan Pharmacy on credit from 'Central Warehouse'.
10. Sold 15 Bottles of 'Amoxicillin Syrup' @ ₹110/Bottle for cash from 'Central Warehouse'.
11. Sold 8 Nos of 'Digital Thermometers' @ ₹380/Nos to City Clinic from 'Town Store'.
12. Sold 12 Boxes of 'Cough Lozenges' @ ₹240/Box for cash from 'Town Store'.
13. Sold 25 Vials of 'Vitamin B12' @ ₹160/Vial to Murugan Pharmacy from 'Central Warehouse'.
14. Sold 10 Nos of 'Pulse Oximeters' @ ₹850/Nos to City Clinic from 'Central Warehouse'.
15. Sold 40 Strips of 'Antacid Tablets' @ ₹60/Strip for cash from 'Town Store'.
16. Sold 5 Units of 'Vaporizers' @ ₹550/Unit for cash from 'Town Store'.

Returns & Stock Transfers:
17. Returned 5 Boxes of 'Paracetamol 650mg' back to Apex Pharma (Alt+F5 Debit Note).
18. Customer Murugan Pharmacy returned 2 Boxes of 'Paracetamol 650mg' (Alt+F6 Credit Note).
19. Transferred 15 Boxes of 'Paracetamol 650mg' from 'Central Warehouse' to 'Town Store' (Alt+F7 Stock Journal).
20. Transferred 10 Nos of 'Pulse Oximeters' from 'Central Warehouse' to 'Town Store' (Alt+F7 Stock Journal).

Submit your final Stock Summary table showing Closing Quantity, Value, and Profit & Loss report showing Gross Profit.`,
    quiz: [
      {
        q: "Which shortcut key in Tally Prime toggles between Item Invoice and Accounting Invoice mode?",
        opts: ["Ctrl + H (Change Mode)", "Alt + F1", "F12 (Configure)", "Ctrl + A"],
        ans: 0,
        exp: "Ctrl + H (Change Mode) allows switching between Item Invoice, Accounting Invoice, and As Voucher modes."
      },
      {
        q: "What happens automatically to inventory levels when a Sales Invoice (F8) is recorded in Item Invoice mode?",
        opts: ["Stock quantity increases in the selected godown", "Stock quantity decreases in the selected godown and Gross Profit is calculated", "Stock levels remain unchanged until end of month", "Stock is marked as lost"],
        ans: 1,
        exp: "Recording a sales invoice automatically deducts stock from the specified godown and updates the trading account gross profit."
      },
      {
        q: "Which voucher type is used to record a purchase return of inventory items back to the vendor?",
        opts: ["Alt + F5 (Debit Note)", "Alt + F6 (Credit Note)", "F9 (Purchase)", "F7 (Journal)"],
        ans: 0,
        exp: "Alt + F5 (Debit Note) in Item Invoice mode is used to return goods to suppliers, reducing both payable liability and stock quantity."
      },
      {
        q: "Where can you see a detailed analysis of all buyers and suppliers for a particular stock item along with average rates?",
        opts: ["Display More Reports -> Inventory Books -> Movement Analysis -> Item Analysis", "Gateway of Tally -> Balance Sheet", "Gateway of Tally -> Day Book", "Chart of Accounts"],
        ans: 0,
        exp: "Movement Analysis (under Inventory Books) provides detailed item-level customer, supplier, and rate velocity reports."
      },
      {
        q: "If you purchase 100 units @ ₹50 and sell 40 units @ ₹80, what is the Gross Profit calculated by Tally?",
        opts: ["₹3,200", "₹1,200 (₹3,200 Sales - ₹2,000 Cost)", "₹5,000", "₹800"],
        ans: 1,
        exp: "Gross Profit = Sales (40 * ₹80 = ₹3,200) - Cost of Goods Sold (40 * ₹50 = ₹2,000) = ₹1,200."
      }
    ],
    reflection: [
      "I know how to toggle Item Invoice mode using Ctrl+H.",
      "I can record inventory purchases and sales with godown allocations.",
      "I can record purchase and sales returns with Debit and Credit notes.",
      "I completed the 20 inventory transactions assignment."
    ]
  },
  day9: {
    title: "Day 9 — Inventory Analysis: Stock Summary, Movement & Velocity",
    objectives: [
      "Navigate and interpret the Stock Summary report (`GOT -> Stock Summary`).",
      "Analyze Closing Stock valuation and evaluate different costing methods.",
      "Perform Stock Movement Analysis across Groups, Categories, and Items.",
      "Identify Fast-Moving, Slow-Moving, and Non-Moving (Dead Stock) items.",
      "Extract actionable inventory insights to optimize working capital and reorder levels."
    ],
    explanation: `Inventory Analysis transforms raw stock data into strategic business intelligence. By analyzing Stock Summary, Movement Velocity, and Turnover Ratios, business owners can eliminate dead stock, avoid stockouts, and maximize return on inventory investment.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Navigating the Stock Summary Report',
        content: '• Pathway: Gateway of Tally -> Stock Summary (press S from GOT).\n• Features:\n  → Displays opening, inwards, outwards, and closing stock balances for every group.\n  → Press Alt + F1 / Alt + F5 for hierarchical group expansion.\n  → Press Enter on any stock group/item to drill down into monthly stock registers.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Configuring Stock Summary for Deep Analysis (F12)',
        content: 'Press F12 in Stock Summary to customize views:\n• Show Opening Balance: Compare current stock with starting position.\n• Show Goods Inwards & Outwards: Inspect total procurement and sales velocity.\n• Show Gross Profit: Calculate gross profit and margin % per item line.\n• Valuation Method: Switch between FIFO, Average Cost, and Last Purchase Cost to see impact on net worth.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Fast-Moving vs. Slow-Moving vs. Dead Stock',
        leftTitle: 'Fast-Moving Products (High Velocity)',
        leftDesc: '• Characteristics: High inventory turnover ratio, sold within 7-15 days.\n• Strategy: Maintain safety buffer stock, set automated reorder thresholds, negotiate volume discounts with vendors.\n• Examples: Paracetamol, Fast-charging cables, Daily grocery items.',
        rightTitle: 'Slow-Moving / Dead Stock (Low Velocity)',
        rightDesc: '• Characteristics: Low turnover, held in godowns for >60-90 days, locking up cash flow.\n• Strategy: Run promotional bundling, offer clearance discounts, return to supplier before expiry.\n• Examples: Expensive specialized equipment, off-season goods.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Movement Analysis & Turnover Ratio',
        content: '• Movement Analysis: GOT -> Display More Reports -> Inventory Books -> Movement Analysis.\n• Inventory Turnover Ratio (ITR): Cost of Goods Sold / Average Inventory.\n  → High ITR: Excellent inventory efficiency and strong sales.\n  → Low ITR: Overstocking, obsolete inventory, or slow customer demand.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Practical analysis steps in Tally Prime:
1. Open Tally Prime -> Go to Stock Summary.
2. Press Alt+F1 to view full item breakdown.
3. Press F12 -> Set 'Show Opening Balance' = YES, 'Show Inwards' = YES, 'Show Outwards' = YES, 'Show Gross Profit' = YES.
4. Review which items generated the highest gross margin %.
5. Go to GOT -> Display More Reports -> Inventory Books -> Movement Analysis -> Select 'Stock Item Analysis' to inspect customer sales velocity.`,
    realWorldExample: `A retail medical store audits its Stock Summary at month end. Paracetamol turned over 6 times this month with a 35% margin (Fast-moving). An expensive wheelchair has remained in the showroom for 4 months with zero sales (Dead stock). The owner uses this insight to reorder Paracetamol in bulk and marks down the wheelchair by 15% to recover cash capital.`,
    aiActivity: `AI Activity: Give a stock report to AI and ask for business insights.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Chief Inventory & Financial Analyst.

Here is the monthly Stock Summary and Movement Report of our retail electronics store:

Product Data (Opening | Inwards | Outwards | Closing | Avg Purchase Cost | Selling Price):
1. Smartphone Model X: Opening: 20 | Inwards: 50 | Outwards: 65 | Closing: 5 | Cost: ₹15,000 | Price: ₹18,500
2. Bluetooth Earbuds: Opening: 40 | Inwards: 100 | Outwards: 125 | Closing: 15 | Cost: ₹800 | Price: ₹1,400
3. 65-inch OLED TV: Opening: 6 | Inwards: 0 | Outwards: 1 | Closing: 5 | Cost: ₹95,000 | Price: ₹1,15,000
4. Screen Protectors: Opening: 100 | Inwards: 200 | Outwards: 270 | Closing: 30 | Cost: ₹40 | Price: ₹150
5. VR Gaming Headset: Opening: 12 | Inwards: 0 | Outwards: 0 | Closing: 12 | Cost: ₹32,000 | Price: ₹42,000

Please provide a comprehensive inventory intelligence report:
1. Identify the Top 2 Fast-Moving items and calculate their Gross Profit Contribution.
2. Identify the Top 2 Slow-Moving / Dead-Stock risks and calculate the locked-up capital.
3. Calculate the Inventory Turnover Velocity for each category.
4. Give 5 actionable recommendations for procurement, reorder levels, and cash flow optimization."
---`,
    handsOnTask: "Open Stock Summary in Tally Prime, press F12 to display Inwards, Outwards, and Gross Profit columns, and inspect the Movement Analysis report for 2 items.",
    assignment: `Assignment: Identify 5 inventory insights.

Based on your practice company's Stock Summary and Movement Analysis reports in Tally Prime, analyze the data and submit a structured report detailing 5 key inventory insights:

1. Insight 1: Highest Profitability Product:
   - Identify the stock item with the highest Gross Profit percentage.
   - List its Total Outward Sales, Cost of Sales, Gross Margin, and Margin %.

2. Insight 2: Fast-Moving Volume Leader:
   - Identify the item with the highest turnover speed (fastest outward sales compared to stock on hand).
   - What is its remaining closing stock, and how many days of inventory remain before stockout?

3. Insight 3: Slow-Moving / Dead Stock Capital Lockup:
   - Identify an item that had low or zero outward movement during the month.
   - Calculate total capital locked in this item (Closing Qty * Rate).
   - Propose a discount or bundling strategy to liquidate this stock.

4. Insight 4: Reorder Level & Buffer Stock Recommendation:
   - Identify any item where closing stock has dropped below 20% of monthly demand.
   - Recommend a specific reorder quantity and safety stock threshold.

5. Insight 5: Valuation Discrepancy & Holding Cost Impact:
   - Switch the Stock Summary valuation method in F12 from 'Average Cost' to 'FIFO' and 'Last Purchase Cost'.
   - Record the difference in total closing stock valuation and explain how it affects the balance sheet.`,
    quiz: [
      {
        q: "Where in Tally Prime can you view total opening stock, inwards, outwards, closing stock, and gross profit on a single screen?",
        opts: ["Stock Summary (configured via F12)", "Gateway of Tally -> Day Book", "Chart of Accounts -> Ledgers", "Balance Sheet"],
        ans: 0,
        exp: "Pressing F12 in Stock Summary allows enabling Opening, Inward, Outward, Closing, and Gross Profit columns together."
      },
      {
        q: "What does a high Inventory Turnover Ratio indicate about a product?",
        opts: ["The product is slow-moving and locks up capital", "The product is fast-moving, sold quickly, and managed efficiently", "The product has expired", "The product has high tax rates"],
        ans: 1,
        exp: "A high turnover ratio means goods are sold and replenished rapidly, indicating strong market demand and low holding costs."
      },
      {
        q: "Which report in Tally Prime shows which customers bought a particular stock item and at what average selling price?",
        opts: ["Display More Reports -> Inventory Books -> Movement Analysis -> Stock Item Analysis", "Gateway of Tally -> Trial Balance", "Display More Reports -> Day Book", "Alt + K -> Company Masters"],
        ans: 0,
        exp: "Stock Item Movement Analysis details specific customer purchase histories, quantities, rates, and turnover percentages."
      },
      {
        q: "What is 'Dead Stock' in retail inventory management?",
        opts: ["Items that have high customer demand", "Items that remain unsold for prolonged periods with zero turnover, tying up working capital", "Items that are currently in transit between godowns", "Items purchased on cash discount"],
        ans: 1,
        exp: "Dead stock refers to obsolete or unsold inventory that sits idle in warehouses, locking up capital and risking deterioration."
      },
      {
        q: "What is the key benefit of analyzing Gross Profit % per stock item in Stock Summary?",
        opts: ["It identifies which products generate the highest profit margins to prioritize in sales and marketing", "It deletes low-margin items automatically", "It calculates GST refund", "It changes bank interest"],
        ans: 0,
        exp: "Item-wise gross profit analysis reveals which products deliver the highest return, helping optimize pricing and sales focus."
      }
    ],
    reflection: [
      "I can customize and navigate the Stock Summary report with F12.",
      "I understand how to calculate and interpret Inventory Turnover and Velocity.",
      "I can perform Movement Analysis across items and customer ledgers.",
      "I completed the 5 inventory insights analysis assignment."
    ]
  },
  day10: {
    title: "Day 10 — 🟦 Mini Project: Medical Store Inventory",
    objectives: [
      "Create and configure a complete pharmaceutical inventory company: 'Health Medical Store'.",
      "Setup pharmaceutical Stock Groups, Categories, Units, Batches, and Expiry Tracking.",
      "Manage a multi-godown storage infrastructure (Central AC Godown, Cold Storage, Counter Shelf).",
      "Record realistic pharmaceutical Purchases, Sales Invoices, and Inter-Godown Stock Transfers.",
      "Execute an automated AI inventory audit to identify low-stock items, slow-moving lines, and expiry risks."
    ],
    explanation: `Mini Project 4 simulates managing the complete inventory operations for 'Health Medical Store'. You will configure pharmaceutical items with strict batch numbers, manufacturing/expiry dates, multi-location godown transfers, dispensing sales, and run an inventory risk analysis.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Project Scenario: Health Medical Store',
        content: 'You are appointed as the Inventory & Accounts Manager for "Health Medical Store", a high-volume retail pharmacy and surgical distributor in Theni, Tamil Nadu. The business maintains 3 specialized storage godowns:\n• Godown 1: Central AC Godown (Bulk tablets, capsules, and dressings).\n• Godown 2: Cold Storage Refrigerator (Insulin, vaccines, and biologics at 2-8°C).\n• Godown 3: Front Counter Dispensing Shelf (Ready stock for retail customer billing).',
        icon: 'Briefcase',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Pharmaceutical Master Setup Requirements',
        content: '• Stock Groups: Tablets & Capsules, Pediatric Syrups, Injectables & Biologics, Surgical & Diagnostics.\n• Units of Measure:\n  → Simple: Strip, Bottle, Vial, Nos, Box.\n  → Compound: 1 Box = 10 Strips, 1 Carton = 20 Bottles.\n• Batch & Expiry: Enable Batches = YES and Maintain Expiry Dates = YES for all medicines.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'card',
        title: '3. Multi-Godown Storage Layout & Stock Transfer Flow',
        content: '• Inward Purchases: Bulk goods arrive at "Central AC Godown" and "Cold Storage".\n• Internal Transfers (Alt + F7): Stock transferred daily to "Front Counter Dispensing Shelf" to replenish retail inventory.\n• Retail & Wholesale Billing (F8): Prescriptions dispensed directly from Front Counter or Cold Storage.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Inventory Risk & Audit Checklist',
        content: '• Low-Stock Risk: Flag medicines below minimum safety threshold.\n• Near-Expiry Risk: Identify batches expiring within 60-90 days for return-to-vendor or clearance.\n• Dead-Stock Risk: Track non-moving surgical items tying up working capital.',
        icon: 'Sliders',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Full Workflow Walkthrough for Health Medical Store:
1. Create Company 'Health Medical Store', State: 'Tamil Nadu'.
2. Press F11 -> Enable 'Maintain Godowns' = YES, 'Enable Batches' = YES, 'Maintain Expiry Dates' = YES.
3. Create 3 Godowns: 'Central AC Godown', 'Cold Storage', 'Front Counter Shelf'.
4. Create Units and 8 Medicine Stock Items with batch and expiry tracking enabled.
5. Record 4 Inward Purchases (F9) from pharmaceutical distributors into Central/Cold storage.
6. Record 2 Stock Transfers (Alt+F7) replenishing Front Counter Shelf.
7. Record 4 Retail Sales Invoices (F8) dispensing medicines to patients.
8. Generate Stock Summary, Batch Summary, and Profit & Loss report.`,
    realWorldExample: `A customer visits Health Medical Store with a prescription for Insulin and Azithromycin. The pharmacist bills from Front Counter Shelf and Cold Storage. Tally selects the earliest expiring valid batch (FIFO), updates batch balances, calculates 32% profit margin, and prints an itemized GST invoice.`,
    aiActivity: `AI Challenge: Analyse stock and identify: Low-stock items, Slow-moving items, Possible expiry risks.

Copy and paste this prompt template into your AI Assistant:
---
"Act as a Senior Hospital Pharmacist and Chief Inventory Auditor.

I am completing Mini Project: Medical Store Inventory for 'Health Medical Store'. 
Here is our month-end inventory report:

1. Amoxicillin 500mg: Closing: 8 Boxes | Batch: AM-202 | Exp: May-2026 (60 days left) | Monthly Sales: 40 Boxes | Min Threshold: 20 Boxes.
2. Paracetamol 650mg: Closing: 3 Boxes | Batch: PC-881 | Exp: Dec-2027 | Monthly Sales: 65 Boxes | Min Threshold: 25 Boxes.
3. Insulin Glargine 100IU: Closing: 22 Pens (Cold Storage) | Batch: IN-904 | Exp: Oct-2026 | Monthly Sales: 10 Pens | Min Threshold: 10 Pens.
4. Pediatric Cough Syrup: Closing: 55 Bottles | Batch: CS-301 | Exp: Nov-2027 | Monthly Sales: 8 Bottles | Min Threshold: 15 Bottles.
5. Digital BP Monitor: Closing: 14 Nos | Cost: ₹1,600 | Exp: N/A | Monthly Sales: 1 Nos | Min Threshold: 3 Nos.
6. Ceftriaxone 1g Inj: Closing: 5 Vials (Cold Storage) | Batch: CF-112 | Exp: Jun-2026 | Monthly Sales: 35 Vials | Min Threshold: 20 Vials.

Please execute a comprehensive clinical & commercial inventory audit:
1. Low-Stock Items: Identify items facing immediate stockout risk and calculate required emergency reorder quantities.
2. Slow-Moving & Dead Stock: Identify items with capital stagnation and excess holding cost.
3. Expiry Risks: Highlight batches nearing expiry and outline a step-by-step Return-to-Vendor (RTV) or markdown protocol.
4. Multi-Godown Logistics: Provide 3 rules for maintaining cold chain integrity and front-counter replenishment."
---`,
    handsOnTask: "Create the company 'Health Medical Store' in Tally Prime, configure all 3 godowns, setup 8 medicine stock items with batch/expiry tracking, and record the complete purchase, transfer, and sales cycle.",
    assignment: `Assignment: Mini Project — Health Medical Store Complete Inventory Submission

Please execute and submit the complete project deliverables for 'Health Medical Store':

Part A: Inventory Master Configuration Table:
Create 8 medicines in Tally Prime and document:
- Item Name, Stock Group, Godown Location, Unit of Measure, Batch No, Mfg Date, Expiry Date, Opening Qty & Rate.

Part B: Transaction Recording Log (Record the following 10 transactions):
1. Purchased 50 Boxes of 'Paracetamol 650mg' @ ₹210/Box from Sun Pharma into 'Central AC Godown' (Batch: PC-101, Mfg: Jan-2026, Exp: Dec-2028).
2. Purchased 40 Vials of 'Insulin Glargine' @ ₹480/Vial from Biocon Ltd into 'Cold Storage' (Batch: IN-202, Mfg: Jan-2026, Exp: Oct-2027).
3. Purchased 30 Bottles of 'Cough Expectorant' @ ₹70/Bottle from Cipla into 'Central AC Godown' (Batch: CG-303, Mfg: Feb-2026, Exp: Jan-2028).
4. Purchased 15 Nos of 'Pulse Oximeters' @ ₹550/Nos from Omron Healthcare into 'Central AC Godown'.
5. Transferred 25 Boxes of Paracetamol from 'Central AC Godown' to 'Front Counter Shelf' (Alt+F7).
6. Transferred 15 Bottles of Cough Expectorant from 'Central AC Godown' to 'Front Counter Shelf' (Alt+F7).
7. Sold 15 Boxes of Paracetamol @ ₹320/Box to customer clinic on credit from 'Front Counter Shelf' (F8).
8. Sold 10 Vials of Insulin @ ₹750/Vial for cash from 'Cold Storage' (F8).
9. Sold 8 Bottles of Cough Expectorant @ ₹120/Bottle for cash from 'Front Counter Shelf' (F8).
10. Sold 4 Nos of Pulse Oximeters @ ₹950/Nos to Dr. Kumar on credit from 'Front Counter Shelf' (F8).

Part C: Risk Audit & Reporting Deliverables:
1. Export / submit the final Stock Summary showing Closing Quantity, Value, and Gross Profit.
2. Submit the Godown-wise breakdown showing remaining stock in Central AC Godown, Cold Storage, and Front Counter Shelf.
3. Submit the AI Challenge findings detailing Low-Stock, Slow-Moving, and Near-Expiry items.`,
    quiz: [
      {
        q: "In a medical store inventory system, which two features are critical to activate in F11 for patient safety and compliance?",
        opts: ["Enable Batches and Maintain Expiry Dates", "Job Costing and Bill of Materials", "Payroll and Attendance", "Multi-Currency"],
        ans: 0,
        exp: "Pharmaceutical compliance strictly mandates batch tracking and expiry date maintenance for all medications."
      },
      {
        q: "Why are separate godowns (like 'Cold Storage' vs 'Central AC Godown') maintained in Tally Prime for a medical store?",
        opts: ["To calculate different tax rates", "To track physical location, storage environment (refrigeration), and prevent stock misplacement", "To increase purchase costs", "To delete old ledgers"],
        ans: 1,
        exp: "Separate godowns allow precise tracking of temperature-sensitive medications (cold chain) and shelf-stock availability."
      },
      {
        q: "What is the primary operational purpose of transferring stock from Central Godown to Front Counter Shelf using Alt+F7?",
        opts: ["To pay suppliers", "To replenish dispensing stock at the billing counter without buying new external goods", "To change item names", "To close the company"],
        ans: 1,
        exp: "Stock Journal internal transfers move inventory to the retail billing counter for immediate customer dispensing."
      },
      {
        q: "What is the financial danger of holding high quantities of 'Slow-Moving' medicines nearing their expiry date?",
        opts: ["High profit margins", "Capital lockup and total financial loss if medicines expire before being sold", "Zero storage cost", "Automatic supplier reimbursement"],
        ans: 1,
        exp: "Unsold medicines that expire in stock become unsellable dead loss, eroding profits and locking up vital cash flow."
      },
      {
        q: "When dispensing medication in Sales Invoice (F8), what rule should pharmacists follow when multiple batches exist?",
        opts: ["LIFO (Last In First Out)", "FIFO / FEFO (First Expiring, First Out) to dispense older valid batches first", "Sell the highest priced batch only", "Random selection"],
        ans: 1,
        exp: "FEFO (First Expiring, First Out) ensures that medicines expiring earliest are dispensed first to eliminate expired stock waste."
      }
    ],
    reflection: [
      "I can set up a full pharmaceutical inventory system with batches, godowns, and expiry dates.",
      "I can manage multi-godown stock transfers and counter dispensing invoices.",
      "I can conduct an inventory risk audit for low stock, slow-moving items, and expiry risks.",
      "I completed the Medical Store Inventory Mini Project."
    ]
  },
  day11: {
    title: "Day 11 — Purchase & Sales Orders",
    objectives: [
      "Understand the purpose and commercial workflow of Purchase Orders (PO) and Sales Orders (SO).",
      "Enable Order Processing features in Tally Prime (F11).",
      "Record Purchase Orders (Ctrl + F9) with order numbers, supplier terms, and due dates.",
      "Record Sales Orders (Ctrl + F8) capturing customer commitments, pricing, and dispatch schedules.",
      "Extract and interpret Pending Order Reports (Sales/Purchase Order Outstanding & Summary)."
    ],
    explanation: `Order Processing in Tally Prime allows businesses to record and track commercial purchase and sales agreements before physical goods move or invoices are raised. Orders represent commercial commitments that do not impact financial ledgers or godown stock levels until fulfillment.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What are Purchase & Sales Orders?',
        content: '• Purchase Order (PO): An official commercial document sent to a supplier committing to purchase specific goods at agreed rates and delivery timelines.\n• Sales Order (SO): A formal confirmation received from a customer committing to buy products from your business.\n• Key Rule: Orders are non-financial commitment vouchers. They do NOT increase or decrease stock in godowns, and they do NOT debit or credit accounting balances until delivery challans or invoices are generated.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Enabling Order Processing & Recording Orders',
        content: '1. Enable Feature: Press F11 (Company Features) -> Set "Enable Purchase Order Processing" = YES and "Enable Sales Order Processing" = YES.\n2. Purchase Order (Ctrl + F9):\n   • Party Account Name: Select Supplier (Sundry Creditor).\n   • Order No: Unique PO number (e.g., PO/2026/01).\n   • Item Details: Stock Item, Due On date, Quantity, and Agreed Rate.\n3. Sales Order (Ctrl + F8):\n   • Party Account Name: Select Customer (Sundry Debtor).\n   • Order No: Customer Order / SO reference number (e.g., SO/2026/101).\n   • Enter Items, Dispatch Delivery Dates, and Payment Terms.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Order Workflow: Booking vs. Execution',
        leftTitle: 'Order Booking Stage (PO / SO)',
        leftDesc: '• Vouchers: Purchase Order (Ctrl+F9) / Sales Order (Ctrl+F8).\n• Accounting Impact: None (No Ledger Debit/Credit).\n• Inventory Impact: None (Godown quantities unchanged).\n• Purpose: Price fixation, due date agreement, and backlog planning.',
        rightTitle: 'Order Execution Stage (Challan / Invoice)',
        rightDesc: '• Vouchers: Receipt Note (Alt+F9) / Delivery Note (Alt+F8) / Invoices (F9/F8).\n• Accounting Impact: Creditors/Debtors updated on Invoice.\n• Inventory Impact: Physical stock updated on Delivery/Receipt Note.\n• Clears the pending order balance.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Pending Order Reports & Backlog Auditing',
        content: 'Tally Prime provides dedicated reporting to monitor unfulfilled commercial commitments:\n• Sales Order Outstanding: GOT -> Display More Reports -> Statement of Inventory -> Sales Order Details -> Pending Orders (tracks overdue customer orders).\n• Purchase Order Outstanding: GOT -> Display More Reports -> Statement of Inventory -> Purchase Order Details -> Pending Orders (tracks pending supplier deliveries).\n• Order Summary: Summarizes total committed quantities vs pending balance.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Step-by-Step Order Entry Practice:
1. Press F11 -> Set 'Enable Purchase Order Processing' = YES and 'Enable Sales Order Processing' = YES.
2. Go to Gateway of Tally -> Vouchers -> Press Ctrl+F9 (Purchase Order).
   - Party: 'Intel Tech Distributors' | Order No: 'PO-1001'
   - Item: 'Intel Core i5 Processor' | Due On: 5 Days | Qty: 20 Nos @ ₹14,500/Nos.
   - Press Ctrl+A to save.
3. Go to Vouchers -> Press Ctrl+F8 (Sales Order).
   - Party: 'Zenith Infotech Solutions' | Order No: 'SO-5001'
   - Item: 'Intel Core i5 Processor' | Due On: 7 Days | Qty: 10 Nos @ ₹17,200/Nos.
   - Press Ctrl+A to save.
4. Check Pending Orders: GOT -> Display More Reports -> Statement of Inventory -> Sales Order Details -> Press Enter on 'Zenith Infotech' to see 10 Nos pending.`,
    realWorldExample: `A wholesale electronics distributor receives a bulk requirement email from a corporate client ordering 50 laptops. The distributor books a Sales Order (SO-201) locking in the unit price of ₹48,000 and promised delivery in 10 days. The procurement team immediately reviews the Sales Order report and generates a Purchase Order (PO-105) to Lenovo India for 50 laptops to lock in supplier pricing.`,
    aiActivity: `AI Task: Convert a customer requirement into a sales order structure.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Senior Commercial Sales Executive and Tally Prime Specialist.

Here is an informal customer order email received by 'Alpha Tech Systems':

'Hi Team,
We would like to place an order for our new office branch in Chennai. We urgently need 15 units of Dell 24-inch IPS Monitors, 15 units of Logitech Wireless Keyboard & Mouse combos, and 5 units of HP Laser Multi-Function Printers. Please ensure delivery by the 25th of this month to our Ambattur Warehouse. We agree to your standard quote: Monitor @ ₹11,500 each, Combo @ ₹1,400 each, and Printer @ ₹22,000 each. Payment will be released via RTGS within 30 days of delivery.
Thanks,
Karthik Rajan, Purchase Manager, Apex Software Solutions Pvt Ltd, Chennai.'

Please convert this raw customer requirement into a professional, structured Tally Prime Sales Order entry blueprint:
1. Identify Party Name, Parent Group, and State.
2. Order Number, Order Date, Promised Delivery Date, and Payment Terms.
3. Structured Line Item Table with Stock Item, Quantity, Unit Rate, and Total Line Amount.
4. Total Order Value calculation.
5. Provide step-by-step Tally Prime navigation instructions (Ctrl + F8) to record this exact voucher."
---`,
    handsOnTask: "Enable Purchase & Sales Order processing in Tally Prime (F11), record 1 PO to a supplier and 1 SO for a customer with order numbers and due dates, and view the Pending Orders report.",
    assignment: `Assignment: Purchase & Sales Order Processing & Reporting

Please complete the following 5 tasks in Tally Prime:

1. Order Processing Configuration:
   - State the path and keyboard shortcut to enable Purchase Order and Sales Order processing in Tally Prime.
   - Explain why recording a Sales Order does not reduce godown stock or alter customer ledger balances.

2. Record Purchase Orders (Ctrl + F9):
   - Supplier: 'National Hardware Importers' (Sundry Creditor)
   - Order No: 'PO-AUG-01' | Terms: 15 Days Credit
   - Items:
     • 40 Nos 'Kingston 16GB DDR4 RAM' @ ₹2,800/Nos
     • 30 Nos 'Crucial 500GB NVMe SSD' @ ₹3,200/Nos

3. Record Sales Orders (Ctrl + F8):
   - Customer: 'Cybernet Solutions' (Sundry Debtor)
   - Order No: 'SO-AUG-101' | Terms: Immediate Delivery
   - Items:
     • 20 Nos 'Kingston 16GB DDR4 RAM' @ ₹3,600/Nos
     • 15 Nos 'Crucial 500GB NVMe SSD' @ ₹4,100/Nos

4. Customer Requirement Parsing (AI Task Integration):
   - Take the AI-structured sales order from the AI Activity and record it in Tally Prime under Customer 'Apex Software Solutions Pvt Ltd'.

5. Pending Order Reports Extraction:
   - Navigate to GOT -> Display More Reports -> Statement of Inventory -> Sales Order Details.
   - List the total pending quantities and order value for 'Cybernet Solutions' and 'Apex Software Solutions'.`,
    quiz: [
      {
        q: "What is the primary keyboard shortcut to create a Sales Order in Tally Prime?",
        opts: ["Ctrl + F8", "Alt + F8", "F8", "F7"],
        ans: 0,
        exp: "Ctrl + F8 is the standard shortcut in Tally Prime to record Sales Orders."
      },
      {
        q: "What is the primary keyboard shortcut to create a Purchase Order in Tally Prime?",
        opts: ["Ctrl + F9", "Alt + F9", "F9", "F4"],
        ans: 0,
        exp: "Ctrl + F9 is the standard shortcut to record Purchase Orders in Tally Prime."
      },
      {
        q: "What effect does entering a Purchase Order have on the company's financial balance sheet?",
        opts: ["No financial effect; orders are commitments that do not debit or credit accounting ledgers", "It immediately increases Current Liabilities", "It reduces cash in bank", "It debits Purchase Account"],
        ans: 0,
        exp: "Purchase Orders record commercial commitments and do not create accounting journal entries until invoiced."
      },
      {
        q: "Where in Tally Prime can you view all pending customer sales orders awaiting fulfillment?",
        opts: ["Gateway of Tally -> Display More Reports -> Statement of Inventory -> Sales Order Details", "Gateway of Tally -> Balance Sheet", "Day Book", "Chart of Accounts"],
        ans: 0,
        exp: "Sales Order Details under Statement of Inventory provides a complete status report of all pending order backlogs."
      },
      {
        q: "When a customer sends a raw purchase requirement email, what should be done first in Tally Prime?",
        opts: ["Structure the requirement and record a Sales Order (Ctrl + F8) to track commitment and pricing", "Immediately record a Payment Voucher", "Alter the company financial year", "Delete the customer ledger"],
        ans: 0,
        exp: "Recording a structured Sales Order captures customer commitments, agreed prices, and due dates for fulfillment tracking."
      }
    ],
    reflection: [
      "I understand the difference between commercial orders and financial invoices.",
      "I can enable and record Purchase Orders (Ctrl+F9) and Sales Orders (Ctrl+F8).",
      "I know how to convert raw customer requirements into structured sales orders.",
      "I can extract and audit pending order backlog reports in Tally Prime."
    ]
  },
  day12: {
    title: "Day 12 — Delivery & Receipt Notes",
    objectives: [
      "Understand the role of Delivery Notes (Challans) and Receipt Notes (Goods Receipt Notes / GRN).",
      "Learn how Tracking Numbers link physical inventory movements to financial invoices.",
      "Record Receipt Notes (Alt + F9) upon receiving goods from suppliers against Purchase Orders.",
      "Record Delivery Notes (Alt + F8) upon dispatching goods to customers against Sales Orders.",
      "Execute the complete 10-transaction Order-to-Delivery commercial lifecycle with partial shipments."
    ],
    explanation: `Delivery Notes and Receipt Notes manage the physical transfer of inventory before financial billing. A Receipt Note (GRN) brings physical stock into godowns, while a Delivery Note dispatches stock to customers. Tracking numbers link these physical movements directly to final purchase/sales invoices.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What are Delivery Notes & Receipt Notes?',
        content: '• Delivery Note (Delivery Challan - Alt + F8): Issued when goods are physically dispatched to a customer. It immediately deducts physical stock from your godown without debiting the customer ledger.\n• Receipt Note (Goods Receipt Note / GRN - Alt + F9): Recorded when physical goods arrive from a supplier. It immediately increases physical stock in your godown without crediting the supplier ledger.\n• Accounting Status: Goods delivered create "Goods Delivered but Not Billed", and goods received create "Goods Received but Bills Pending".',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Tracking Numbers & Automated Invoice Linking',
        content: '• Tracking Number: A unique serial number generated by Tally when a Receipt or Delivery Note is saved.\n• When you raise the final Sales Invoice (F8) or Purchase Invoice (F9), selecting the Tracking Number automatically populates all items, quantities, and rates from the dispatch challan.\n• Invoicing clears the temporary pending tracking record and posts final debit/credit entries to the accounting ledgers.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Complete Order-to-Delivery Workflow Stages',
        leftTitle: 'Procurement (Inward Flow)',
        leftDesc: '1. Purchase Order (Ctrl + F9) -> Order placed.\n2. Receipt Note (Alt + F9) -> Stock enters godown via GRN Tracking No.\n3. Rejections Outward (Alt + F6) -> Damaged items returned before bill.\n4. Purchase Invoice (F9) -> Final bill linking GRN Tracking No.',
        rightTitle: 'Sales Fulfillment (Outward Flow)',
        rightDesc: '1. Sales Order (Ctrl + F8) -> Customer order received.\n2. Delivery Note (Alt + F8) -> Stock leaves godown via DN Tracking No.\n3. Rejections Inward (Ctrl + F6) -> Customer returns damaged items.\n4. Sales Invoice (F8) -> Final tax bill linking DN Tracking No.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Partial Shipments & Pending Bills Tracking',
        content: '• Partial Delivery: If a customer orders 50 units and you dispatch 30 units today via Delivery Note, Tally bills 30 units and keeps the remaining 20 units active in the Pending Sales Order report.\n• Purchase Bills Pending: GOT -> Display More Reports -> Statement of Inventory -> Purchase Bills Pending (audits goods in warehouse awaiting vendor bills).',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Practical Order-to-Delivery Workflow:
1. Enable in F11: 'Enable Purchase Order Processing', 'Enable Sales Order Processing', and ensure Delivery/Receipt notes are active.
2. Record Receipt Note: Vouchers -> Press Alt+F9 (Receipt Note) -> Select Supplier 'National Importers' -> Select Order No 'PO-AUG-01' -> Tally auto-populates items -> Tracking No 'GRN-01' -> Save (Ctrl+A).
3. Record Purchase Invoice: Vouchers -> Press F9 -> Select Supplier -> Select Tracking No 'GRN-01' -> Items auto-populate -> Save.
4. Record Delivery Note: Vouchers -> Press Alt+F8 (Delivery Note) -> Select Customer 'Cybernet Solutions' -> Select Order 'SO-AUG-101' -> Tracking No 'DN-01' -> Save.
5. Record Sales Invoice: Vouchers -> Press F8 -> Select Customer -> Select Tracking No 'DN-01' -> Save bill.`,
    realWorldExample: `A logistics warehouse receives a container of 500 LED TVs on Monday night. The store manager inspects the cargo and enters a Receipt Note (GRN-55) into Tally. The 500 TVs immediately appear in live inventory so sales teams can fulfill orders. On Wednesday, the supplier's formal GST tax invoice arrives in the mail; the accountant enters F9, selects Tracking No GRN-55, and the entire ₹75,00,000 payable ledger balance is finalized with zero re-typing.`,
    aiActivity: `AI Activity: Order-to-Delivery Discrepancy & Route Audit

Copy and paste this prompt into your AI Assistant:
---
"Act as a Supply Chain Auditor and Tally Inventory Specialist.

Here is the commercial dispatch log for 'Metro Electronics Hub':
1. Sales Order #SO-770 (Client: Horizon Retailers): 100 Smart LED TVs @ ₹24,000 (Total: ₹24,00,000).
2. Delivery Note #DN-101 (Truck 1): Dispatched 60 TVs to Horizon Retailers.
3. Delivery Note #DN-102 (Truck 2): Dispatched 40 TVs, but during transit 4 TVs were damaged and returned immediately via Rejections Inward #RI-05.
4. Final Tax Invoice #INV-901 generated for delivered verified stock.

Please analyze this workflow:
1. How many units should be billed on Sales Invoice #INV-901?
2. What happens to the 4 rejected TVs in Tally's inventory and customer balance?
3. What is the remaining pending quantity in Sales Order #SO-770?
4. Write out the exact voucher sequence in Tally Prime to reflect this scenario."
---`,
    handsOnTask: "Record a Purchase Order, receive goods via Receipt Note (Alt+F9) with Tracking Number, convert to Purchase Invoice (F9), dispatch goods via Delivery Note (Alt+F8), and convert to Sales Invoice (F8).",
    assignment: `Assignment: Complete 10 Order & Delivery Transactions

Record the following complete 10-transaction lifecycle in Tally Prime:

1. Transaction 1: Placed Purchase Order (Ctrl+F9) #PO-201 to 'Apex Tech Distributors' for 50 Nos 'Logitech Wireless Mouse' @ ₹650/Nos and 50 Nos 'USB-C Keyboards' @ ₹900/Nos.
2. Transaction 2: Received 50 Mice and 50 Keyboards in 'Central Warehouse' via Receipt Note (Alt+F9) #GRN-201 against Order #PO-201.
3. Transaction 3: Recorded Purchase Invoice (F9) #PI-401 linking Tracking No #GRN-201.
4. Transaction 4: Received Sales Order (Ctrl+F8) #SO-301 from 'Bright Future College' for 30 Mice @ ₹850/Nos and 30 Keyboards @ ₹1,250/Nos.
5. Transaction 5: Dispatched partial delivery of 20 Mice and 20 Keyboards via Delivery Note (Alt+F8) #DN-301 linking Order #SO-301.
6. Transaction 6: Customer rejected 2 damaged Keyboards before billing; recorded Rejections Inward (Ctrl+F6) #RI-01 against #DN-301.
7. Transaction 7: Raised Sales Invoice (F8) #SI-501 for delivered stock linking Tracking No #DN-301 (20 Mice, 18 Keyboards).
8. Transaction 8: Dispatched the remaining balance (10 Mice, 12 Keyboards) to 'Bright Future College' via Delivery Note #DN-302 against Order #SO-301.
9. Transaction 9: Raised final Sales Invoice (F8) #SI-502 linking Tracking No #DN-302.
10. Transaction 10: Received full payment check for both invoices (SI-501 and SI-502) from 'Bright Future College' into Bank Account (F6 Receipt).

Submit: (a) Day Book screenshot/table, (b) Sales Order Outstanding report showing zero pending balance, and (c) Stock Summary report.`,
    quiz: [
      {
        q: "What is the primary keyboard shortcut to record a Delivery Note (Delivery Challan) in Tally Prime?",
        opts: ["Alt + F8", "Ctrl + F8", "F8", "Alt + F9"],
        ans: 0,
        exp: "Alt + F8 is the standard shortcut to create Delivery Notes in Tally Prime."
      },
      {
        q: "What is the primary keyboard shortcut to record a Receipt Note (GRN) in Tally Prime?",
        opts: ["Alt + F9", "Ctrl + F9", "F9", "Alt + F8"],
        ans: 0,
        exp: "Alt + F9 is the standard shortcut to record Receipt Notes (Goods Receipt Notes) in Tally Prime."
      },
      {
        q: "What is the function of a 'Tracking Number' in Tally Prime?",
        opts: ["It links Delivery/Receipt Notes to final Sales/Purchase Invoices to automatically populate items and quantities", "It tracks courier vehicle GPS", "It records employee biometric attendance", "It prints barcodes on boxes"],
        ans: 0,
        exp: "Tracking Numbers connect physical dispatch/receipt vouchers with final accounting invoices for automated billing."
      },
      {
        q: "What happens to stock quantities when a Delivery Note (Alt + F8) is saved?",
        opts: ["Physical stock is immediately reduced from the designated godown", "Stock quantity increases", "Stock is unaffected until payment is received", "Stock is deleted permanently"],
        ans: 0,
        exp: "Delivery Notes record the physical dispatch of goods, reducing inventory quantities from godowns."
      },
      {
        q: "If 50 units were ordered on a Sales Order and 30 units were dispatched on a Delivery Note, what happens to the remaining 20 units?",
        opts: ["They remain active in the Pending Sales Orders report until fulfilled by future delivery notes", "They are automatically cancelled", "They convert to purchase orders", "They are billed anyway"],
        ans: 0,
        exp: "Tally maintains real-time order backlog tracking, showing the remaining unfulfilled balance in pending order reports."
      }
    ],
    reflection: [
      "I understand the difference between Delivery Notes (Challans) and Sales Invoices.",
      "I know how to use Tracking Numbers to link physical stock movements to tax invoices.",
      "I can execute a full 10-transaction order-to-delivery lifecycle in Tally Prime.",
      "I can handle partial deliveries and track pending balance quantities."
    ]
  },
  day13: {
    title: "Day 13 — Debit & Credit Notes",
    objectives: [
      "Master the accounting and commercial purpose of Debit Notes and Credit Notes.",
      "Record Purchase Returns to suppliers using Debit Notes (Alt + F5).",
      "Record Sales Returns from customers using Credit Notes (Alt + F6).",
      "Handle price adjustments, rate differences, discount rebates, and damaged goods adjustments.",
      "Analyze the impact of Debit/Credit notes on customer/supplier ledger balances and inventory levels."
    ],
    explanation: `Debit Notes and Credit Notes are used to record post-invoice adjustments such as Purchase Returns, Sales Returns, rate corrections, damage claims, and volume rebates. A Debit Note reduces payable dues to suppliers, while a Credit Note reduces receivable dues from customers.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What are Debit Notes and Credit Notes?',
        content: '• Debit Note (Alt + F5 / Purchase Return): A document sent to a supplier informing them that their account has been debited (reducing our payable liability) due to returning damaged goods, short supply, or overbilled prices.\n• Credit Note (Alt + F6 / Sales Return): A document issued to a customer informing them that their account has been credited (reducing our receivable asset) due to goods returned, quality allowances, or post-sale discount rebates.\n• Core Accounting Rule:\n  → Debit Note: Debit Supplier A/c (decreases liability), Credit Purchase Return A/c.\n  → Credit Note: Debit Sales Return A/c, Credit Customer A/c (decreases asset).',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Modes of Debit and Credit Notes in Tally Prime',
        content: 'Press Ctrl+H (Change Mode) inside the voucher to choose:\n1. Item Invoice Mode: Used when physical goods are returned. Automatically updates both inventory stock and accounting ledgers.\n2. Accounting Invoice Mode: Used for pure financial price adjustments without stock movement (e.g. rate difference of ₹500 per unit, trade discount correction, or compensation claim).\n3. As Voucher Mode: Standard Dr/Cr double-entry format.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Purchase Return vs. Sales Return Workflow',
        leftTitle: 'Purchase Return (Debit Note - Alt + F5)',
        leftDesc: '• Situation: Goods returned to supplier / vendor overcharge.\n• Original Ref: Links to original Purchase Invoice No & Date.\n• Stock Effect: Reduces closing inventory in godown.\n• Financial Effect: Decreases Sundry Creditor payable balance.',
        rightTitle: 'Sales Return (Credit Note - Alt + F6)',
        rightDesc: '• Situation: Goods returned by client / post-sale price rebate.\n• Original Ref: Links to original Sales Invoice No & Date.\n• Stock Effect: Increases closing inventory back in godown.\n• Financial Effect: Decreases Sundry Debtor receivable balance.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Statutory & GST Compliance in Notes',
        content: '• Original Invoice Reference: Tally prompts for the Original Invoice Number and Invoice Date to maintain GST audit trails.\n• Reason for Issuing Note: Select appropriate reason (01-Sales Return, 02-Post Sale Discount, 03-Deficiency in Service, 04-Correction in Invoice).\n• Tax Recalculation: GST (CGST/SGST/IGST) is automatically adjusted proportionally.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Recording Debit and Credit Notes Step-by-Step:
1. Recording a Purchase Return (Debit Note):
   - Go to GOT -> Vouchers -> Press Alt+F5 (Debit Note).
   - Party: 'Zenith Components Ltd' | Original Invoice No: 'INV-1024' (Date: 02-Aug-2026).
   - Select Item: '500GB SSD' -> Qty: 5 Nos @ ₹3,200 = ₹16,000.
   - Enter narration: "5 SSDs found defective upon unpacking, returned to vendor." Press Ctrl+A.
2. Recording a Sales Return (Credit Note):
   - Go to GOT -> Vouchers -> Press Alt+F6 (Credit Note).
   - Party: 'Kovai Computex' | Original Invoice No: 'SI-505' (Date: 05-Aug-2026).
   - Select Item: '16GB DDR4 RAM' -> Qty: 2 Nos @ ₹3,600 = ₹7,200.
   - Enter narration: "2 RAM sticks returned by customer due to wrong specification." Press Ctrl+A.
3. Verify Ledger: GOT -> Display More Reports -> Account Books -> Ledger -> 'Kovai Computex' (Balance reduced by ₹7,200).`,
    realWorldExample: `A retail store sells 20 laser printers to a school for ₹3,60,000. During installation, 2 printers have broken scan glass. The school sends the 2 printers back. The store issues a Credit Note (Alt+F6) for ₹36,000 linked to the sales invoice. The school's outstanding bill is reduced to ₹3,24,000, and 2 printers are placed into the damaged goods godown for return to the manufacturer via Debit Note (Alt+F5).`,
    aiActivity: `AI Task: Determine which note should be used for different situations.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Chartered Accountant and Senior Tally Prime Instructor.

Here are 6 complex commercial situations faced by 'Vertex Commercial Enterprises':

Situation 1: A supplier mistakenly billed us ₹4,500 per unit for 10 Hard Drives instead of the agreed contract price of ₹4,000 per unit. Goods are kept, but we claim ₹5,000 rate difference.
Situation 2: A customer returns 4 damaged LED Monitors worth ₹32,000 that were purchased on credit last week.
Situation 3: We return 15 defective Motherboards worth ₹90,000 back to the manufacturer after receiving a formal RMA authorization.
Situation 4: We offer an extra 5% annual turnover rebate (₹25,000) to our top distributor for exceeding their quarterly target.
Situation 5: A supplier sent 100 boxes of printer paper but our godown team counted only 92 boxes on arrival (Short supply of 8 boxes worth ₹3,200 already billed).
Situation 6: A customer was mistakenly underbilled by ₹2,000 on their sales invoice due to a clerical typo.

For each situation, please analyze and provide:
1. Which note should be issued (Debit Note or Credit Note) and from whose perspective (our business vs supplier/customer)?
2. The Voucher Shortcut in Tally Prime (Alt + F5 vs Alt + F6).
3. The exact Debit and Credit ledger entries.
4. Whether the note affects physical inventory quantities or is an accounting-only rate adjustment."
---`,
    handsOnTask: "Record 1 Purchase Return (Debit Note) with physical stock return, 1 Price Difference claim (Debit Note), and 1 Sales Return (Credit Note) in Tally Prime, and verify the ledger balances.",
    assignment: `Assignment: Debit Note & Credit Note Operations & Auditing

Please execute the following tasks in Tally Prime:

1. Theory & Classification:
   - Explain the fundamental difference between a Debit Note and a Credit Note in simple words.
   - State when to use 'Item Invoice Mode' versus 'Accounting Invoice Mode' in Debit/Credit notes.

2. Record 2 Debit Notes (Alt + F5):
   - Note 1 (Stock Return): Returned 4 defective 'Intel i5 Processors' @ ₹14,500 back to supplier 'Intel Tech Distributors' against Invoice #INV-881. Total: ₹58,000.
   - Note 2 (Rate Difference Adjustment): Supplier 'PowerMax Cabinets' overcharged ₹150 per cabinet on 40 units (Invoice #PM-220). Record an accounting Debit Note for ₹6,000 claiming price difference.

3. Record 2 Credit Notes (Alt + F6):
   - Note 1 (Sales Return): Customer 'Apex Solutions' returned 3 'Dell 24-inch Monitors' @ ₹11,500 (Invoice #SI-101). Total: ₹34,500.
   - Note 2 (Post-Sale Volume Rebate): Granted a ₹5,000 loyalty discount Credit Note to customer 'Zenith Infotech' on account.

4. AI Task Reflection:
   - Provide your solutions to the 6 scenarios generated in the AI Activity and explain why getting the note type wrong causes severe financial statement errors.

5. Report Verification:
   - Extract and submit the ledger account of 'Intel Tech Distributors' and 'Apex Solutions' showing the original invoice and the note adjustments.`,
    quiz: [
      {
        q: "Which voucher shortcut is used in Tally Prime to record a Purchase Return to a supplier?",
        opts: ["Alt + F5 (Debit Note)", "Alt + F6 (Credit Note)", "F9 (Purchase)", "F7 (Journal)"],
        ans: 0,
        exp: "Alt + F5 (Debit Note) is used to record purchase returns, debiting the supplier's account to reduce payable dues."
      },
      {
        q: "Which voucher shortcut is used in Tally Prime to record a Sales Return from a customer?",
        opts: ["Alt + F6 (Credit Note)", "Alt + F5 (Debit Note)", "F8 (Sales)", "F5 (Payment)"],
        ans: 0,
        exp: "Alt + F6 (Credit Note) is used to record sales returns, crediting the customer's account to reduce receivable dues."
      },
      {
        q: "If a supplier overcharges ₹1,000 on an invoice without any physical goods being returned, which voucher mode should be used?",
        opts: ["Debit Note in Accounting Invoice Mode", "Debit Note in Item Invoice Mode", "Receipt Voucher (F6)", "Contra Voucher (F4)"],
        ans: 0,
        exp: "Accounting Invoice Mode allows recording price corrections and financial adjustments without altering inventory stock counts."
      },
      {
        q: "What is the accounting entry when a Credit Note is issued for a sales return of goods worth ₹10,000?",
        opts: ["Debit Sales Return A/c ₹10,000 | Credit Customer A/c ₹10,000", "Debit Customer A/c ₹10,000 | Credit Sales A/c ₹10,000", "Debit Cash A/c ₹10,000 | Credit Bank A/c ₹10,000", "Debit Purchase A/c ₹10,000 | Credit Capital A/c ₹10,000"],
        ans: 0,
        exp: "A Sales Return debits Sales Return A/c (reducing revenue) and credits Customer A/c (reducing receivables)."
      },
      {
        q: "Why is it mandatory in Tally Prime to link the Original Invoice Number and Date when creating a Credit Note?",
        opts: ["To maintain full audit trails, trace the transaction history, and ensure statutory GST compliance", "To delete the customer ledger", "To format the font style", "To calculate staff overtime"],
        ans: 0,
        exp: "Linking original invoice details ensures accurate audit trails, correct tax recalculation, and statutory compliance."
      }
    ],
    reflection: [
      "I know when to issue a Debit Note vs a Credit Note in commercial situations.",
      "I can record Purchase Returns (Alt+F5) and Sales Returns (Alt+F6).",
      "I understand the difference between Item Invoice and Accounting Invoice modes for notes.",
      "I can handle rate differences, damage claims, and volume rebates."
    ]
  },
  day14: {
    title: "Day 14 — Bill of Materials (BoM)",
    objectives: [
      "Understand the principles of assembly and manufacturing accounting in Tally Prime.",
      "Identify the difference between Raw Materials, Finished Goods, and Scrap / By-products.",
      "Enable and configure a Bill of Materials (BoM) recipe inside finished stock items.",
      "Create and configure a dedicated Manufacturing Journal voucher type.",
      "Record manufacturing production entries, consume raw materials, and allocate additional labor and power costs."
    ],
    explanation: `Bill of Materials (BoM) in Tally Prime defines the standard recipe of component raw materials and packaging required to produce one unit of a finished good. Using a Manufacturing Journal, Tally automatically consumes component stock from raw material godowns and generates finished products with added operational overheads.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is a Bill of Materials (BoM)?',
        content: '• Bill of Materials (BoM): A master engineering recipe / formula that specifies all raw materials, sub-assemblies, and packaging items required to assemble one unit of a finished product.\n• Manufacturing Flow:\n  1. Procure Raw Materials -> Stored in Raw Materials Godown.\n  2. Define BoM Recipe -> Attached to Finished Good item.\n  3. Production Entry (Manufacturing Journal) -> Automatically deducts raw materials, adds direct expenses (wages, power), and outputs finished goods into the Finished Goods Godown.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Configuring BoM in Stock Item Creation',
        content: '1. Create Finished Good: GOT -> Create -> Stock Item -> Enter Name (e.g., "Assembled Office PC").\n2. Press F12 (Configure) in Item Master -> Set "Set Component List (Bill of Materials) in Stock Items" = YES.\n3. In BoM Definition:\n   • BoM Name: Enter "Standard Assembly".\n   • Unit of Manufacture: "1 Nos".\n   • Component List: Select each raw material item, source godown, and exact quantity required per 1 unit.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Stock Journal vs. Manufacturing Journal',
        leftTitle: 'Standard Stock Journal (Alt + F7)',
        leftDesc: '• Primary Function: Inter-godown transfers (Source Godown -> Destination Godown).\n• Entry Mode: Manual entry of items on both sides.\n• Overheads: Does not allocate direct labor or power overheads into item cost.\n• Usage: Moving stock from Central Warehouse to Shop Shelf.',
        rightTitle: 'Manufacturing Journal (Dedicated Voucher)',
        rightDesc: '• Primary Function: Production & Assembly of finished items.\n• Entry Mode: Autofills all raw materials from BoM recipe when finished quantity is typed.\n• Overheads: Allocates factory wages, electricity, and packaging into final unit cost.\n• Usage: Assembling computers, baking, furniture fabrication.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Creating Manufacturing Voucher Type & Cost Allocation',
        content: '• Create Voucher Type: GOT -> Create -> Voucher Type -> Name: "Manufacturing Journal" -> Select Type: "Stock Journal" -> Set "Use as Manufacturing Journal" = YES.\n• Additional Production Costs:\n  → Direct Labor / Technician Wages: e.g., ₹500 per unit.\n  → Factory Power & Fuel: e.g., ₹200 per unit.\n  → Effective Cost per Unit = (Total Raw Material Cost + Additional Overheads) / Total Finished Units Produced.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Practical BoM Creation and Production Entry:
1. Create Raw Materials (in 'Raw Material Godown'):
   - 'Cabinet & SMPS' (10 Nos @ ₹2,200)
   - 'Motherboard H610' (10 Nos @ ₹5,800)
   - 'Intel Core i3 CPU' (10 Nos @ ₹7,500)
   - '8GB DDR4 RAM' (10 Nos @ ₹1,800)
   - '256GB SSD' (10 Nos @ ₹1,900)
2. Create Finished Item 'Standard Assembled PC' -> Press F12 -> Enable BoM -> Name: 'Standard PC' (Unit: 1 Nos) -> Add 1 of each component above.
3. Create Voucher Type: GOT -> Create -> Voucher Type -> 'Manufacturing Entry' -> Type: 'Stock Journal' -> 'Use as Manufacturing Journal' = YES.
4. Record Production: Vouchers -> Press Alt+F7 -> Select 'Manufacturing Entry'.
   - Product: 'Standard Assembled PC' | Godown: 'Finished Goods Godown' | Qty: 5 Nos.
   - Observe: 5 of each component autofills (Total Material: ₹96,000).
   - Under Additional Costs: Add 'Technician Wages' ₹2,500 and 'Factory Electricity' ₹1,500.
   - Final Effective Cost: ₹1,00,000 / 5 = ₹20,000 per PC. Press Ctrl+A.`,
    realWorldExample: `A custom furniture workshop manufactures wooden executive desks. The BoM for 1 Desk requires 4 Wood Planks (₹2,000), 1 Metal Leg Frame (₹1,500), 2 Drawer Handles (₹300), and 1 Can Varnish (₹400), totaling ₹4,200 in materials. In the Manufacturing Journal, ₹800 carpenter labor is added. Tally updates the finished inventory with 1 Executive Desk at an exact production cost of ₹5,000.`,
    aiActivity: `AI Activity: Create a simple product manufacturing plan using AI.

Copy and paste this prompt into your AI Assistant:
---
"Act as an Industrial Production Engineer and Tally Costing Specialist.

I want to set up the manufacturing and assembly process in Tally Prime for:
Product: 'Assembled Home Security CCTV Hub' (1 Complete Kit)

Please create a comprehensive product manufacturing plan:
1. Raw Materials Breakdown: List all component items (e.g. DVR, Hard Drive, Dome Cameras, Power Supply Unit, BNC Connectors, Video Cables, Packaging Box) with realistic estimated wholesale costs and required quantities per 1 Hub.
2. Bill of Materials (BoM) Recipe: Format a clear BoM table showing Item Name, Godown, Component Qty, Unit Cost, and Total Component Cost.
3. Standard Scrap / Wastage Margin: Estimate realistic wire/fitting scrap % and how to treat it.
4. Operational Overheads: Allocate assembly labor and testing expenses for a production batch of 25 Kits.
5. Effective Unit Cost Calculation: Calculate total raw material cost + overheads = Effective Cost per finished Kit.
6. Provide the exact Tally Prime step-by-step instructions to configure this BoM and execute the production run."
---`,
    handsOnTask: "Create raw materials, configure a Bill of Materials (BoM) for a finished product, create a Manufacturing Journal voucher type, and record a production run with direct expenses in Tally Prime.",
    assignment: `Assignment: Bill of Materials Setup & Production Run Execution

Please complete the following manufacturing accounting project in Tally Prime:

1. Inventory Master Setup:
   - Create 2 Godowns: 'Raw Material Store' and 'Finished Goods Warehouse'.
   - Create the following Raw Materials with opening balances in 'Raw Material Store':
     • 'Cabinet & 500W SMPS' (25 Nos @ ₹2,400)
     • 'AMD Ryzen 5 Processor' (25 Nos @ ₹11,200)
     • 'B550 Gaming Motherboard' (25 Nos @ ₹7,800)
     • '16GB DDR4 RAM' (50 Nos @ ₹2,900)
     • '512GB NVMe SSD' (25 Nos @ ₹3,400)

2. Finished Good & BoM Creation:
   - Create Stock Item 'Ryzen Pro Workstation' (Unit: Nos).
   - Configure BoM 'Workstation Assembly' for 1 Nos:
     • 1 Cabinet & SMPS
     • 1 AMD Ryzen 5 Processor
     • 1 B550 Motherboard
     • 2 units 16GB DDR4 RAM
     • 1 unit 512GB NVMe SSD

3. Production Voucher Configuration:
   - Create a Voucher Type 'Assembly Journal' (Type: Stock Journal / Use as Manufacturing Journal = YES).

4. Record Batch Production Run:
   - Record an Assembly Journal producing 10 units of 'Ryzen Pro Workstation' into 'Finished Goods Warehouse'.
   - Allocate Additional Overheads:
     • Assembly Labor Wages: ₹5,000
     • Quality Testing & Setup: ₹2,500
     • Packaging & Boxing: ₹1,500

5. Deliverables & Costing Report:
   - Submit the effective production cost per workstation calculated by Tally.
   - Submit the updated Stock Summary showing remaining raw materials and finished workstations on hand.`,
    quiz: [
      {
        q: "What is the primary function of a Bill of Materials (BoM) in Tally Prime?",
        opts: ["It defines the exact list of raw materials and components required to manufacture 1 unit of a finished product", "It prints customer sales receipts", "It files tax returns", "It creates employee bank accounts"],
        ans: 0,
        exp: "A BoM is the master component recipe that lists all raw materials required to produce one unit of a finished product."
      },
      {
        q: "Which voucher type is used to record automated production runs with BoM in Tally Prime?",
        opts: ["Stock Journal configured with 'Use as Manufacturing Journal' = Yes", "Payment Voucher (F5)", "Contra Voucher (F4)", "Journal Voucher (F7)"],
        ans: 0,
        exp: "A Stock Journal voucher configured with 'Use as Manufacturing Journal = Yes' executes automated BoM assembly."
      },
      {
        q: "What happens to component stock when a Manufacturing Journal is saved in Tally Prime?",
        opts: ["Raw material components are automatically deducted from stock, and finished goods are added to stock", "All stock is doubled", "Stock is converted to cash", "No inventory change occurs"],
        ans: 0,
        exp: "Manufacturing Journals automatically consume component raw materials and increase the stock of finished goods."
      },
      {
        q: "How are additional production costs (like technician wages and factory power) handled in a Manufacturing Journal?",
        opts: ["They are added to the total cost of production and increase the effective unit cost of finished goods", "They are ignored", "They reduce the number of finished goods", "They are deducted from owner capital"],
        ans: 0,
        exp: "Additional manufacturing overheads entered in the Manufacturing Journal are capitalized into the final unit cost of the finished product."
      },
      {
        q: "Where in Tally Prime can you enable the Bill of Materials option during Stock Item creation?",
        opts: ["Press F12 (Configure) inside the Stock Item master screen", "Gateway of Tally -> Balance Sheet", "Day Book", "Alt + K -> Company"],
        ans: 0,
        exp: "Pressing F12 inside the Stock Item creation/alteration screen enables 'Set Component List (Bill of Materials)'."
      }
    ],
    reflection: [
      "I understand the concepts of Raw Materials, Finished Goods, and BoM.",
      "I can configure a Bill of Materials recipe in Stock Item masters.",
      "I know how to create and operate a dedicated Manufacturing Journal.",
      "I can calculate and allocate direct operational overheads to unit costs."
    ]
  },
  day15: {
    title: "Day 15 — 🟦 Mini Project 5: Manufacturing Business",
    objectives: [
      "Set up a complete computer assembling and manufacturing business: 'ABC Computer World'.",
      "Create raw material masters, finished product lines, and multi-level BoM recipes.",
      "Record component procurement, inter-godown stock movements, and batch manufacturing runs.",
      "Execute commercial B2B sales and retail distribution with profit margin tracking.",
      "Perform an AI-driven material consumption audit and operational investigation."
    ],
    explanation: `Mini Project 5 simulates operating 'ABC Computer World', a complete computer assembly, custom PC building, and distribution enterprise. You will manage the entire commercial lifecycle: procuring raw components, configuring BoMs, running manufacturing entries, managing godowns, and auditing material consumption efficiency.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Project Scenario: ABC Computer World',
        content: 'ABC Computer World is an expanding computer manufacturing and assembly firm based in Theni. The business:\n• Procures raw computer parts (CPUs, Motherboards, RAM, SSDs, SMPS, Cabinets, Displays) from national distributors.\n• Assembles two flagship models: "ABC Pro Office PC" and "ABC Apex Gaming Beast".\n• Manages multi-godown stock transfers between Raw Material Godown, Assembly Floor, and Showroom.\n• Sells assembled computers to corporate institutions and local retail clients.',
        icon: 'Briefcase',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Raw Materials & Finished Goods Master Setup',
        content: '• Godowns: (1) "Raw Materials Store", (2) "Assembly Line", (3) "Finished Goods Showroom".\n• Raw Materials to Create:\n  1. Intel Core i3 Processor & Intel Core i7 Processor\n  2. H610 Motherboard & Z790 Gaming Motherboard\n  3. 8GB DDR4 RAM & 32GB DDR5 RAM RGB\n  4. 512GB NVMe SSD & 1TB Gen4 SSD\n  5. 450W Standard SMPS & 750W 80-Plus Gold SMPS\n  6. Classic Office Tower Cabinet & RGB Tempered Glass Gaming Case\n  7. 24-inch IPS Monitor & 27-inch 165Hz Curved Gaming Monitor\n• Finished Goods: (A) "ABC Pro Office PC", (B) "ABC Apex Gaming Beast".',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'card',
        title: '3. BoM Specifications for Assembled Models',
        content: '• Model 1: "ABC Pro Office PC" (Unit: 1 Nos):\n  → 1 Intel i3 CPU + 1 H610 Motherboard + 1 8GB DDR4 RAM + 1 512GB SSD + 1 450W SMPS + 1 Office Cabinet.\n  → Additional Overhead: ₹500 Assembly Labor + ₹200 Testing.\n• Model 2: "ABC Apex Gaming Beast" (Unit: 1 Nos):\n  → 1 Intel i7 CPU + 1 Z790 Motherboard + 2 32GB DDR5 RAM + 1 1TB Gen4 SSD + 1 750W Gold SMPS + 1 RGB Gaming Case.\n  → Additional Overhead: ₹1,500 Precision Assembly + ₹600 Benchmark Stress Testing.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Commercial Lifecycle: Procurement to Sales',
        content: '• Procurement: Purchase components from "Supertron Electronics" on 30-day credit.\n• Stock Movement: Transfer components from Raw Materials Store to Assembly Line via Stock Journal (Alt + F7).\n• Production: Execute Manufacturing Journal runs to assemble finished units.\n• Sales: Sell finished PCs to corporate clients and retail buyers via Sales Invoices (F8).\n• Analysis: Audit material consumption variance and profit margins.',
        icon: 'Sliders',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Full Workflow Walkthrough for ABC Computer World:
1. Create Company 'ABC Computer World' (Tamil Nadu) in Tally Prime.
2. Create Godowns: 'Raw Materials Store', 'Assembly Line', 'Finished Goods Showroom'.
3. Create all Raw Material stock items and record bulk purchase invoice from 'Supertron Electronics'.
4. Create Finished Goods with their respective BoM recipes.
5. Create Voucher Type 'Manufacturing Entry' (Stock Journal / Use as Manufacturing Journal = YES).
6. Record Manufacturing Journal producing 10 'ABC Pro Office PCs' and 5 'ABC Apex Gaming Beasts'.
7. Record Sales Invoice selling 6 Office PCs to 'Kovai Tech Park' @ ₹28,000 each and 3 Gaming Beasts to 'Velocity Esports Arena' @ ₹95,000 each.
8. Extract Stock Summary, Trial Balance, and Profit & Loss report.`,
    realWorldExample: `ABC Computer World receives an order for 20 office desktop computers from a local bank. The manager creates a Purchase Order for components, moves items to the assembly workshop, records the Manufacturing Journal where technician labor is capitalized into the asset cost, and delivers the computers on a Sales Invoice. The owner can inspect the Stock Summary to see exact component consumption down to the last screw.`,
    aiActivity: `AI Challenge: Ask AI to analyse material consumption and suggest questions the business owner should investigate.

Copy and paste this prompt template into your AI Assistant:
---
"Act as a Senior Manufacturing Operations Auditor and Financial Controller.

I am completing Mini Project 5: Manufacturing Business for 'ABC Computer World'.
Here is our monthly manufacturing and material consumption report:

1. Procurement & Material Inward:
   - Total Raw Materials Purchased: ₹14,80,000
   - Component Breakdown: Processors (₹4,60,000), Motherboards (₹2,90,000), RAM & SSDs (₹3,80,000), Cabinets & SMPS (₹2,10,000), Packaging & Accessories (₹1,40,000).

2. Production Run Summary:
   - Target Production: 40 Units 'ABC Pro Office PC' & 15 Units 'ABC Apex Gaming Beast'.
   - Actual Completed Units: 38 Office PCs & 14 Gaming Beasts.
   - Additional Labor Wages Paid: ₹42,000 | Factory Electricity: ₹18,500.

3. Consumption & Variance Data:
   - Standard BoM Expected RAM Consumption: 40 (Office) + 28 (Gaming) = 68 RAM modules.
   - Actual RAM Modules Drawn from Godown: 74 modules (6 modules reported damaged/shorted during installation).
   - Standard Motherboard Usage: 52 boards | Actual Drawn: 55 boards (3 boards failed initial POST power test).
   - Incomplete Work-in-Progress (WIP): 2 unfinished Office PCs and 1 unfinished Gaming Beast on assembly line floor.

4. Sales & Revenue:
   - 35 Office PCs sold @ ₹27,500 = ₹9,62,500
   - 12 Gaming Beasts sold @ ₹92,000 = ₹11,04,000
   - Total Sales Revenue: ₹20,66,500

Please perform a deep manufacturing consumption analysis:
1. Calculate the Material Wastage / Defect Rate % for RAM and Motherboards.
2. Evaluate the financial impact of component scrap and WIP backlog on working capital.
3. Formulate 5 critical, incisive investigative questions that the business owner of ABC Computer World MUST investigate immediately to plug inventory leakage and improve plant profitability."
---`,
    handsOnTask: "Set up 'ABC Computer World' in Tally Prime, configure godowns, raw materials, finished goods with BoM, execute manufacturing production runs, record sales, and extract the complete financial reports.",
    assignment: `Assignment: Mini Project 5 — ABC Computer World Complete Submission

Please execute and submit the complete project deliverables for 'ABC Computer World':

Part 1: Company & Master Setup
- Create company 'ABC Computer World', Tamil Nadu.
- Create 3 Godowns: 'Raw Materials Store', 'Assembly Line', 'Finished Goods Showroom'.
- Set up all Raw Materials and Finished Goods masters with BoM recipes.

Part 2: Complete Transaction Log (Record in Tally Prime):
1. Capital: Introduced ₹10,00,000 cash capital by proprietor Arun (F6 Receipt).
2. Banking: Deposited ₹8,00,000 into HDFC Bank Current Account (F4 Contra).
3. Component Purchase (F9): Procured from 'Supertron Electronics Ltd' on 30-day credit:
   • 25 Intel i3 CPUs @ ₹7,200 | 15 Intel i7 CPUs @ ₹24,000
   • 25 H610 Motherboards @ ₹5,600 | 15 Z790 Motherboards @ ₹16,500
   • 40 8GB DDR4 RAM @ ₹1,750 | 35 32GB DDR5 RAM @ ₹6,800
   • 25 512GB SSDs @ ₹1,850 | 15 1TB Gen4 SSDs @ ₹5,200
   • 25 450W SMPS @ ₹1,400 | 15 750W SMPS @ ₹4,800
   • 25 Office Cabinets @ ₹1,200 | 15 RGB Gaming Cases @ ₹3,600
4. Stock Transfer (Alt + F7): Transferred required components for 15 Office PCs and 8 Gaming Beasts from 'Raw Materials Store' to 'Assembly Line'.
5. Manufacturing Run: Recorded Manufacturing Journal producing 15 'ABC Pro Office PCs' (Labor ₹7,500) and 8 'ABC Apex Gaming Beasts' (Labor ₹12,000) into 'Finished Goods Showroom'.
6. Sales (F8):
   • Sold 10 'ABC Pro Office PCs' @ ₹28,500 each to 'Apex IT Academy' on credit.
   • Sold 5 'ABC Apex Gaming Beasts' @ ₹96,000 each to 'Titan Gaming Studio' on credit.
7. Return (Credit Note Alt + F6): Customer returned 1 Office PC due to wrong OS configuration; accepted back into Showroom.
8. Supplier Payment (F5): Paid ₹5,00,000 to Supertron Electronics by HDFC Bank cheque.

Part 3: Project Submission Deliverables:
1. Manufacturing Journal production sheets showing unit costs for both PC models.
2. Stock Summary report showing remaining components and finished goods in stock.
3. Profit & Loss Account showing Gross Profit and Net Profit.
4. Summary of the 5 investigative questions generated from the AI Material Consumption Challenge.`,
    quiz: [
      {
        q: "In the ABC Computer World manufacturing workflow, what is the primary role of a Stock Journal (Alt + F7)?",
        opts: ["Transferring raw material components from the Raw Materials Store to the Assembly Line floor", "Paying supplier bills", "Filing GST returns", "Deleting customer ledgers"],
        ans: 0,
        exp: "Stock Journals record internal stock movements between godowns, such as moving components to the assembly line."
      },
      {
        q: "When 10 'ABC Pro Office PCs' are produced in the Manufacturing Journal, what happens to the component items in Tally?",
        opts: ["Tally automatically consumes 10 of each required component from stock based on the BoM recipe", "Tally deletes all inventory", "Tally creates a bank loan", "No stock change happens"],
        ans: 0,
        exp: "The Manufacturing Journal automatically deducts component quantities from stock in accordance with the BoM recipe."
      },
      {
        q: "How does allocating technician wages in the Manufacturing Journal impact the balance sheet and inventory valuation?",
        opts: ["It capitalizes the labor expense directly into the cost of finished goods inventory on hand", "It reduces total sales revenue", "It is ignored in inventory valuation", "It converts inventory to scrap"],
        ans: 0,
        exp: "Direct labor overheads added during manufacturing are capitalized into the valuation of finished goods stock."
      },
      {
        q: "Why is tracking material consumption variance (Actual usage vs BoM standard) critical for a manufacturing owner?",
        opts: ["To detect component wastage, assembly defects, and inventory leakage before they erode gross margins", "To change company logo", "To increase bank interest", "To delay customer orders"],
        ans: 0,
        exp: "Variance analysis reveals material waste, defective handling, and operational inefficiencies that reduce profitability."
      },
      {
        q: "What financial statement in Tally Prime reveals the gross profit earned from selling manufactured computers after deducting production costs?",
        opts: ["Profit & Loss Account (Trading portion)", "Trial Balance", "Balance Sheet", "Day Book"],
        ans: 0,
        exp: "The Trading portion of the Profit & Loss Account calculates Gross Profit as Sales Revenue minus Cost of Goods Manufactured/Sold."
      }
    ],
    reflection: [
      "I can set up and operate a complete manufacturing business in Tally Prime from scratch.",
      "I can configure multi-level Bill of Materials for different product models.",
      "I can execute component procurement, godown transfers, manufacturing runs, and sales.",
      "I can perform an AI-powered material consumption audit and identify operational risks."
    ]
  },
  day16: {
    title: "Day 16 — Multi-Level Pricing: Price Levels, Customer Tiers & Quantity Slabs",
    objectives: [
      "Understand the business rationale for Multi-Level Pricing (Retail, Wholesale, Dealer).",
      "Enable and configure Multiple Price Levels in Tally Prime.",
      "Set up Price Lists with applicable dates, quantity slabs, rates, and discount percentages.",
      "Assign default Price Levels to Sundry Debtors (Customer Ledgers).",
      "Use AI to formulate dynamic pricing scenarios and discount matrices for varied customer segments."
    ],
    explanation: `Multi-Level Pricing enables businesses to sell the exact same inventory item at differentiated rates and volume-based discounts depending on the customer classification: Retailers (walk-in / small volume), Wholesalers (bulk buyers), and Authorized Dealers (contractual distributors). Tally Prime automates this pricing logic during invoicing to prevent billing errors and maintain margin discipline.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Why Multi-Level Pricing & Price Levels in Business?',
        content: '• In standard trade, selling goods at a single flat rate is rarely feasible.\n• Customer Tiers:\n  1. Retail (End Consumers): Buy 1–5 units; charged Maximum Retail Price (MRP) or standard selling rate; minimal/no discount.\n  2. Wholesale (Semi-bulk / Resellers): Buy 10–50 units; charged discounted trade price allowing them retail resale margins.\n  3. Dealer / Distributor (High volume / Contract): Buy 50–500+ units; charged lowest distributor tier with quantity-based discount slabs.\n• In Tally Prime, Price Levels automate rate selection and discount slabs during billing so cashier/sales staff never manually enter pricing.',
        icon: 'TrendingUp',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Activating & Creating Price Levels in Tally Prime',
        content: '• Step 1: Enable Multi-Price Levels in Company Features:\n  → Press F11 (Features) -> Under Inventory, set "Enable Multiple Price Levels" = YES.\n• Step 2: Define Price Level Names:\n  → Go to Gateway of Tally (GOT) -> Create -> Price Levels (Company Price Levels).\n  → Type: "Retail", "Wholesale", "Dealer", "Corporate/Institutional". Press Enter to save.',
        icon: 'Settings',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Formulating Price Lists with Quantity Slabs & Discounts',
        leftTitle: 'Setting Price List (Stock Group / Category)',
        leftDesc: 'Pathway: GOT -> Create / Alter -> Price List (Stock Group)\n1. Select Stock Group (e.g. "Electronics" or "All Items").\n2. Select Price Level (e.g. "Dealer").\n3. Applicable From: e.g. "01-Apr-2025" (supports versioned rate revisions).\n4. Define Quantity Slabs:\n  • From 0 to 10 Pcs -> Rate: ₹1,200 (0% Disc)\n  • From 10 to 50 Pcs -> Rate: ₹1,150 (2% Disc)\n  • From 50 to 200 Pcs -> Rate: ₹1,100 (5% Disc)\n  • Greater than 200 Pcs -> Rate: ₹1,050 (7.5% Disc)',
        rightTitle: 'Assigning Price Level to Customer Ledgers',
        rightDesc: 'Pathway: GOT -> Alter -> Ledger -> Select Customer Ledger\n1. Under "Pricing Level Applicable", choose "Dealer" or "Wholesale".\n2. In Sales Invoice (F8), once you select this Party, Tally automatically locks or applies their assigned Price Level.\n3. When you enter item and quantity, Tally instantly picks the exact slab rate and discount without operator calculation!'
      },
      {
        type: 'warning',
        title: '4. Quantity-Based Pricing Best Practices & Traps',
        content: '• Cash/Walk-in Sales: If billing cash customers without ledger assignment, Tally allows selecting Price Level on the fly in the invoice header.\n• Rate Revision: When raw material costs fluctuate, never overwrite old price lists; create a new revision with new "Applicable From" date.\n• Cash Discount vs Trade Discount: Multi-level pricing calculates Trade Discount on the invoice; Cash Discount is given separately in payments.',
        icon: 'ShieldAlert',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.03)'
      }
    ],
    demonstration: `Configuring Multi-Tier Price List for Computer Accessories:
1. Press F11 (Features) -> Inventory -> Set 'Enable Multiple Price Levels' = YES and 'Use Discount Column in Invoices' = YES.
2. GOT -> Create -> Price Levels -> Enter: 'Retail', 'Wholesale', 'Dealer'.
3. GOT -> Create -> Price List (Stock Group) -> Select 'Accessories' -> Price Level: 'Wholesale' -> Applicable From: '01-Apr-2025'.
4. For Stock Item 'Wireless Optical Mouse' (Cost = ₹300):
   • Less than 10 Nos: Rate ₹450, Disc 0%
   • 10 to 50 Nos: Rate ₹420, Disc 2%
   • Above 50 Nos: Rate ₹390, Disc 5%.
5. GOT -> Alter -> Ledger -> 'Metro Infotech' (Sundry Debtor) -> Set Pricing Level Applicable = 'Wholesale'.
6. GOT -> Vouchers -> Sales (F8) -> Party: 'Metro Infotech' -> Price Level: 'Wholesale' is automatically selected -> Select 'Wireless Mouse', Qty: 25 Nos -> Rate ₹420 with 2% Discount populates automatically!`,
    realWorldExample: `Apex ElectroTech sells smart LED bulbs (Cost ₹180) to 3 customer tiers: Retail (1-10 Pcs @ ₹350), Wholesale (10-100 Pcs @ ₹260 less 2%), and Dealer (50+ Pcs @ ₹220 less 3%). When a dealer orders 250 bulbs, Tally automatically bills ₹200 less 6% (₹188/pc) earning ₹8/pc profit on high volume with zero cashier calculation errors across 12 sales counters.`,
    aiActivity: `AI Task: Create pricing scenarios for different customer types.

Copy and paste this prompt into your AI Assistant:
---
"Act as a senior Commercial Pricing Strategist and Tally Consultant.

Given the following business context:
- Business: 'OmniTech Gadgets' (Wholesale & Retail Distributor)
- Product Categories:
  1. High-speed USB-C Cables (Cost: ₹80, Target MRP: ₹299)
  2. 65W GaN Fast Chargers (Cost: ₹600, Target MRP: ₹1,899)
  3. Bluetooth ANC Headphones (Cost: ₹1,400, Target MRP: ₹3,999)

Generate a complete Multi-Level Pricing Policy for Tally Prime with:
1. Three distinct Price Levels: Retail, Wholesale, and Authorized Dealer.
2. Slabs for each item:
   - Volume quantity ranges (e.g. 1-5, 6-25, 26-100, 100+).
   - Base billing rate (₹).
   - Volume discount percentage (%).
   - Effective selling price & gross margin % at each slab.
3. Step-by-step Tally Prime configuration blueprint (F11, Price Levels, Price Lists, Customer Ledger linking).
4. Guardrail rules for sales executives (e.g., minimum order quantity, credit term limits per tier)."
---`,
    handsOnTask: "Launch Tally Prime -> Enable Multiple Price Levels and Discount Column in F11. Create Price Levels 'Retail', 'Wholesale', and 'Dealer'. Configure quantity-based Price Lists for 2 stock items, assign price levels to customer ledgers, and record 3 sales invoices verifying automatic rate and discount calculations.",
    assignment: `Assignment 16: Multi-Level Pricing Setup & Billing Execution
1. Create Company 'Sunrise Electricals & Lighting' in Tally Prime.
2. Enable Multiple Price Levels & Discount Column in F11.
3. Configure 3 Price Levels: 'Retail Customer', 'Wholesale Trader', 'Project Contractor'.
4. Set up 3 Stock Items with standard cost:
   • 9W LED Bulb (Cost ₹45)
   • 20W LED Batten (Cost ₹120)
   • 1200mm Ceiling Fan (Cost ₹1,100)
5. Configure detailed Price Lists for all 3 levels across 3 quantity slabs each.
6. Create 4 customer accounts linked to respective price levels.
7. Record 6 Sales Invoices (2 per customer tier with varied order quantities).
8. Print/Export Sales Invoices and verify that rate, slab discount, and invoice totals match your price list.`,
    quiz: [
      {
        q: "Which F11 feature must be activated in Tally Prime to enable differentiated customer pricing tiers?",
        opts: ["Enable Multiple Price Levels", "Enable Cost Centers", "Maintain Payroll", "Enable Job Work"],
        ans: 0,
        exp: "In F11 Company Features under Inventory, 'Enable Multiple Price Levels' unlocks tiered pricing and price lists."
      },
      {
        q: "Where in Tally Prime do you define the tiered quantity slabs, rates, and discount percentages for a stock group?",
        opts: ["GOT -> Create / Alter -> Price List (Stock Group)", "GOT -> Create -> Unit", "GOT -> Banking -> Cheque Register", "GOT -> Display -> Day Book"],
        ans: 0,
        exp: "Price Lists under Create/Alter allow specifying start date, customer level, item quantity slabs, rates, and discount %."
      },
      {
        q: "What is the key advantage of assigning a default 'Price Level' to a Customer (Sundry Debtor) ledger?",
        opts: ["Tally automatically applies the customer's negotiated rates and discount slabs during sales invoicing, eliminating manual pricing errors", "It forces the customer to pay in cash", "It calculates compound interest automatically", "It prevents stock purchase"],
        ans: 0,
        exp: "Assigning Price Levels to customer masters guarantees contract compliance and fast, error-free checkout."
      },
      {
        q: "If raw material costs increase on 01-Jul-2025, how should an accountant update the Price List in Tally Prime?",
        opts: ["Create a new Price List revision with 'Applicable From: 01-Jul-2025' without overwriting historical records", "Delete all previous sales invoices", "Create a new company file", "Change the item name"],
        ans: 0,
        exp: "Tally supports date-effective price lists, preserving historical billing integrity while applying updated rates from the new date."
      },
      {
        q: "How does Tally Prime treat the 'Discount %' column configured inside a Price List when generating a standard GST Sales Invoice?",
        opts: ["It calculates Trade Discount directly on the item rate before assessing GST", "It adds extra expense to the customer", "It treats discount as bad debt", "It cancels the voucher"],
        ans: 0,
        exp: "Trade discounts entered in the item discount column reduce taxable value prior to GST calculation."
      }
    ],
    reflection: [
      "I understand the strategic difference between Retail, Wholesale, and Dealer price tiers.",
      "I can activate and configure Multiple Price Levels in Tally Prime.",
      "I can build complex quantity slab-based Price Lists with volume discounts.",
      "I can assign price levels to customer ledgers for automated billing."
    ]
  },
  day17: {
    title: "Day 17 — Pricing Practical: Business Simulation 'Raju Traders'",
    objectives: [
      "Set up a complete commercial trading enterprise 'Raju Traders' in Tally Prime.",
      "Configure multi-tier price levels and quantity-based price lists for fast-moving goods.",
      "Assign and manage customer ledger profiles across Retail, Wholesale, and Dealer categories.",
      "Execute full sales order and invoice cycles across varying order volumes.",
      "Use AI to evaluate and compare profitability across Retail vs Wholesale vs Dealer customer segments."
    ],
    explanation: `Day 17 is a hands-on business simulation for 'Raju Traders', a premier wholesale and retail distributor of home appliances and kitchenware. Students configure real-world price levels, define volume price lists, execute sales across customer tiers, and perform margin analysis using AI.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Business Profile: Raju Traders',
        content: '• Business Name: Raju Traders (Distributor & Wholesaler)\n• Product Lines: Kitchen & Home Appliances (Mixer Grinder, Induction Cooktop, Electric Kettle, Non-Stick Cookware Set).\n• Customer Segments:\n  1. Counter Retail: Walk-in home consumers purchasing 1–2 units.\n  2. Wholesale Partners: Local electrical & gift shops buying 5–25 units for retail resale.\n  3. Authorized Dealers / Institutional Buyers: Regional trade networks & corporate gifting houses buying 25–200+ units.',
        icon: 'Store',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      },
      {
        type: 'card',
        title: '2. Product Cost & Pricing Matrix for Raju Traders',
        content: '• Mixer Grinder 750W (Cost ₹1,600):\n  → Retail: 1-2 Pcs @ ₹2,999 (0% Disc)\n  → Wholesale: 3-10 Pcs @ ₹2,250 (2% Disc) | 10+ Pcs @ ₹2,150 (3% Disc)\n  → Dealer: 15-50 Pcs @ ₹1,950 (3% Disc) | 50+ Pcs @ ₹1,850 (5% Disc)\n• Induction Cooktop 2000W (Cost ₹1,800):\n  → Retail: 1-2 Pcs @ ₹3,499 (0% Disc)\n  → Wholesale: 3-10 Pcs @ ₹2,600 (2% Disc) | 10+ Pcs @ ₹2,450 (4% Disc)\n  → Dealer: 15-50 Pcs @ ₹2,200 (3% Disc) | 50+ Pcs @ ₹2,050 (5% Disc)\n• Electric Kettle 1.8L (Cost ₹350):\n  → Retail: 1-5 Pcs @ ₹799 (0% Disc)\n  → Wholesale: 6-30 Pcs @ ₹520 (2% Disc) | 30+ Pcs @ ₹480 (5% Disc)\n  → Dealer: 50-200 Pcs @ ₹430 (3% Disc) | 200+ Pcs @ ₹399 (6% Disc)',
        icon: 'Layers',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Ledger Setup & Sales Flow Architecture',
        leftTitle: 'Customer Masters & Price Level Tagging',
        leftDesc: '1. Retail: Walk-in Cash Customer (Price Level: Retail)\n2. Wholesale:\n  • Bhavani Home Needs (Debtor, Price Level: Wholesale, Credit 15 Days)\n  • Krishna Electricals (Debtor, Price Level: Wholesale, Credit 15 Days)\n3. Dealer:\n  • Star Mega Distribution Ltd (Debtor, Price Level: Dealer, Credit 30 Days)\n  • Royal Corporate Gifting Corp (Debtor, Price Level: Dealer, Credit 30 Days)',
        rightTitle: 'Automated Invoice Execution',
        rightDesc: '1. In F8 Sales Invoice, selecting "Bhavani Home Needs" instantly locks "Wholesale" price level.\n2. Typing "Mixer Grinder 750W", Qty = "8 Nos" auto-populates ₹2,250 with 2% discount.\n3. Typing "Star Mega Distribution", Qty = "60 Nos" auto-populates ₹1,850 with 5% discount.\n4. Zero calculation mistakes by billing staff!'
      },
      {
        type: 'tip',
        title: '4. Revenue vs Margin Trade-off in Tiered Pricing',
        content: '• Retail generates highest Gross Margin % (~45-55%), but low transaction volume and high customer servicing cost.\n• Wholesale provides steady turnover (~20-25% Margin) with moderate credit risk.\n• Dealer tier generates lowest Margin % (~10-15%), but drives 70% of business cash flow, bulk procurement discounts, and rapid stock turn.',
        icon: 'Lightbulb',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      }
    ],
    demonstration: `Raju Traders Full Pricing Setup & Execution Workflow:
1. Create Company 'Raju Traders' -> Enable Multi Price Levels & Discount Column in F11.
2. Create Price Levels: 'Retail', 'Wholesale', 'Dealer'.
3. Create Stock Group 'Kitchen Appliances' & Stock Items (Mixer Grinder, Induction Cooktop, Electric Kettle).
4. Set up Price Lists for 'Kitchen Appliances' across Retail, Wholesale, and Dealer levels with exact slab rates.
5. Create Customer Ledgers and assign respective Price Levels.
6. Purchase opening inventory of 200 units each from 'Prestige Appliances Ltd'.
7. Execute 3 Sales Invoices: (1) Cash Walk-in (Retail), (2) Bhavani Home Needs (Wholesale), (3) Star Mega Distribution (Dealer).
8. Check Display -> Account Books -> Sales Register and Stock Summary to verify sales value, discount deductions, and remaining stock.`,
    realWorldExample: `Raju Traders manages 85 wholesale partners and 12 dealer networks. Prior to Tally Price Lists, billing clerks often applied dealer discounts to small retail buyers, causing ₹1,20,000 in lost margin monthly. Locking Price Levels into customer masters eliminated price leakage, tripled checkout speed, and streamlined margin audits.`,
    aiActivity: `AI Activity: Compare retail vs wholesale vs dealer pricing.

Copy and paste this prompt into your AI Assistant:
---
"Act as a senior Financial Analyst and Tally Business Consultant.

Analyze the following trade dataset from 'Raju Traders':
1. Product: 'Mixer Grinder 750W' (Unit Cost = ₹1,600)
2. Monthly Sales by Channel:
   • Retail Channel: 50 units sold @ ₹2,999 average (0% discount). Operational overhead: ₹300/unit.
   • Wholesale Channel: 250 units sold in slabs of 10 @ ₹2,150 average (3% discount = net ₹2,085.50). Operational overhead: ₹80/unit.
   • Dealer Channel: 1,200 units sold in slabs of 60 @ ₹1,850 average (5% discount = net ₹1,757.50). Operational overhead: ₹25/unit.

Provide a comprehensive analysis:
1. Table comparing:
   - Gross Revenue (₹)
   - Cost of Goods Sold (COGS ₹)
   - Gross Profit (₹) and Gross Margin (%)
   - Net Operating Profit (₹) and Net Margin (%)
   - Total Net Profit Contribution to the company.
2. Channel Breakdown: Why high-margin Retail generates less total wealth than low-margin Dealer volume.
3. Pricing Strategy Recommendations: 3 specific tactics Raju Traders can implement in Tally Prime to optimize dealer volume while protecting retail margins."
---`,
    handsOnTask: "Create company 'Raju Traders', configure Price Levels and Price Lists for Kitchen Appliances, purchase stock, record 3 sales invoices across Retail, Wholesale, and Dealer customers, and verify the gross profit margin in the Profit & Loss Account.",
    assignment: `Assignment 17: Raju Traders Complete Pricing & Invoicing Lab
1. Set up company 'Raju Traders' with GST & Multi-Price Level enabled.
2. Create complete inventory master (Items, Groups, Units) with defined cost rates.
3. Configure multi-tier price lists with at least 2 quantity discount slabs per price level.
4. Create 5 customer ledgers (1 Retail Cash, 2 Wholesale, 2 Dealer).
5. Post 1 Purchase Invoice and 5 Sales Invoices across all customer tiers.
6. Generate and export:
   • Sales Register (Detailed with Item Rates & Discounts)
   • Profit & Loss Account
   • Stock Summary with Gross Profit Valuation.
7. Run the AI Channel Profitability Analysis and submit your findings report.`,
    quiz: [
      {
        q: "In the Raju Traders simulation, why does the Dealer channel generate higher total net profit despite having a lower gross margin % than Retail?",
        opts: ["Massive sales volume (1,200 units) and low per-unit handling overhead generate far greater cumulative cash profit", "Dealer sales have zero cost of goods sold", "Tally multiplies dealer profits automatically", "Dealers pay extra taxes"],
        ans: 0,
        exp: "High volume even at lower percentage margins compounds into significant total cash flow and operating profit."
      },
      {
        q: "When a customer ledger with assigned 'Wholesale' Price Level is selected in F8 Sales, what happens if the billing clerk attempts to enter a random manual rate?",
        opts: ["Tally automatically populates the configured wholesale slab rate and restricts unauthorized manual overrides depending on security settings", "Tally crashes", "The invoice converts to a purchase voucher", "GST calculation is disabled"],
        ans: 0,
        exp: "Price Lists enforce contractual prices automatically, locking or defaulting rates based on defined slabs."
      },
      {
        q: "What is the primary role of the 'Applicable From' date in Tally Prime's Price List creation screen?",
        opts: ["It enables date-effective rate schedules, allowing scheduled price changes without altering past billing history", "It sets the company financial year", "It determines employee salary dates", "It expires the Tally license"],
        ans: 0,
        exp: "Applicable From dates allow businesses to update seasonal or inflation-adjusted prices from a specific date forward."
      },
      {
        q: "In Raju Traders, which report allows the business owner to inspect total revenue, item rate, and discount given per sales voucher?",
        opts: ["Sales Register (Detailed view via Alt + F1 / Alt + F5 from Display -> Account Books -> Sales Register)", "Day Book in brief", "Balance Sheet", "Cheque Register"],
        ans: 0,
        exp: "The detailed Sales Register displays individual line items, applied rates, trade discounts, and net bill amounts."
      },
      {
        q: "How does the 'Use Discount Column in Invoices' feature in F11 interact with Multi-Level Price Lists?",
        opts: ["It renders an itemized 'Disc %' column in sales invoices and auto-populates the exact percentage defined in the price list slab", "It gives a flat 50% discount to all customers", "It hides item rates from printouts", "It deducts cash discount from bank balance"],
        ans: 0,
        exp: "The Discount Column displays the volume slab discount percentage directly on the invoice line item."
      }
    ],
    reflection: [
      "I successfully configured multi-tier pricing for Raju Traders.",
      "I understand how volume slabs automatically populate rates and trade discounts.",
      "I can analyze channel economics across Retail, Wholesale, and Dealer segments.",
      "I can prevent margin leakage using Tally Prime price enforcement."
    ]
  },
  day18: {
    title: "Day 18 — Cost Center & Cost Category: Department & Project Tracking",
    objectives: [
      "Understand the concepts of Cost Centers and Cost Categories in managerial accounting.",
      "Enable and configure Cost Categories and Cost Centers in Tally Prime.",
      "Track operating expenses department-wise (Sales, Marketing, HR, Finance, IT).",
      "Track project-wise and branch-wise revenue and expenditures.",
      "Use AI to classify complex company expenses into appropriate departments and project cost centers."
    ],
    explanation: `Cost Centers and Cost Categories in Tally Prime enable multi-dimensional management accounting. While ledgers record 'WHAT' expense occurred (e.g. Salary, Rent, Advertising), Cost Centers track 'WHO' or 'WHICH UNIT' incurred it (e.g. Mumbai Branch, Marketing Dept, Project Alpha). This allows management to analyze departmental overheads and project profitability without creating hundreds of redundant ledgers.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What are Cost Categories and Cost Centers?',
        content: '• In standard financial accounting, an entry "Rent A/c Dr ₹1,00,000" only shows total rent spent.\n• Managerial Accounting Questions:\n  → How much rent was for the Sales Office vs Factory vs Head Office?\n  → Which department is overspending on travel or advertising?\n  → Is "Client Project Alpha" profitable after allocating direct expenses?\n• Hierarchy in Tally Prime:\n  1. Cost Category: The broad classification dimension (e.g., "Departments", "Projects", "Branches", "Sales Executives").\n  2. Cost Center: The specific unit under a category (e.g., Under Departments -> HR, Marketing, Accounts; Under Projects -> Project Metro, Project SmartCity).',
        icon: 'PieChart',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Enabling & Creating Cost Centers in Tally Prime',
        content: '• Step 1: Enable in F11 Company Features:\n  → Press F11 -> Under Accounting, set "Enable Cost Centers" = YES.\n• Step 2: Create Cost Categories (GOT -> Create -> Cost Category):\n  → Create "Departments", "Projects", "Branches".\n  → Options: "Allocate Revenue Items" = YES, "Allocate Non-Revenue Items" = YES (if tracking capital/asset allocations).\n• Step 3: Create Cost Centers (GOT -> Create -> Cost Center):\n  → Category: Departments -> Name: "Sales & Marketing", "IT & Development", "Administration".\n  → Category: Projects -> Name: "Project GreenField", "Project UrbanRetail".',
        icon: 'FolderPlus',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Ledger Linking & Voucher Expense Allocation',
        leftTitle: 'Enabling Cost Centers on Expense Ledgers',
        leftDesc: 'Pathway: GOT -> Create / Alter -> Ledger\n• For ledgers like "Salary", "Travelling Expenses", "Rent", "Printing & Stationery":\n• Set "Cost Centers are applicable" = YES.\n• (For items like Capital or Bank Accounts, leave Cost Centers = NO unless non-revenue allocation is needed).',
        rightTitle: 'Allocating in Payment Voucher (F5)',
        rightDesc: 'When you record: Dr Salary A/c ₹2,50,000\n1. Tally opens a sub-screen "Cost Allocations for: Salary".\n2. Cost Category: Departments\n  • Sales & Mktg: ₹1,00,000\n  • IT & Tech: ₹90,000\n  • Admin: ₹60,000\n3. One single ledger entry cleanly splits across 3 departments!'
      },
      {
        type: 'tip',
        title: '4. Why Cost Centers are Superior to Creating Multiple Ledgers',
        content: '• Bad Approach: Creating separate ledgers like "Salary - Sales", "Salary - IT", "Rent - Sales", "Rent - IT" clutters the Chart of Accounts with hundreds of duplicate ledgers.\n• Best Practice (Cost Centers): Maintain ONE single "Salary Expense" ledger and use Cost Centers to allocate dynamically across departments, branches, and client projects simultaneously.',
        icon: 'CheckCircle2',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `Creating Department Cost Centers & Recording Multi-Department Expense:
1. Press F11 (Features) -> Accounting -> Set 'Enable Cost Centers' = YES.
2. GOT -> Create -> Cost Category -> Create 'Departments' & 'Client Projects'.
3. GOT -> Create -> Cost Center -> Under 'Departments', create 'Sales', 'Marketing', 'R&D', 'Operations'.
4. GOT -> Create -> Ledger -> 'Staff Welfare & Refreshments' (Indirect Expense) -> Cost Centers are applicable = YES.
5. GOT -> Vouchers -> Payment (F5) -> Debit 'Staff Welfare' ₹40,000 -> Bank Credit ₹40,000.
6. In the Cost Allocation sub-screen, assign:
   • Category: Departments -> Sales: ₹15,000, Marketing: ₹12,000, R&D: ₹8,000, Operations: ₹5,000.
7. Save voucher and inspect GOT -> Display More Reports -> Statements of Accounts -> Cost Centres -> Category Summary.`,
    realWorldExample: `BuildCraft executes 4 civil construction projects across the city simultaneously. By creating Cost Category 'Civil Projects' with Cost Centers Site A, Site B, and Site C, every fuel, cement, and crane rental expense is allocated to the specific site. Management generated instant site-wise P&L in Tally, identifying that Site B had 28% higher fuel burn, saving ₹4,50,000 in subsequent phases.`,
    aiActivity: `AI Task: Classify expenses into departments/projects.

Copy and paste this prompt into your AI Assistant:
---
"Act as a senior Chief Financial Officer (CFO) and Tally Prime Expert.

You are given a raw list of monthly commercial payments incurred by 'Zenith Technologies Ltd':
1. Monthly Office Electricity Bill: ₹85,000
2. Google & Meta Digital Ad Campaign: ₹2,40,000
3. AWS Cloud Server Hosting Infrastructure: ₹1,75,000
4. Core Engineering Software Licenses (AutoCAD / IDE): ₹1,20,000
5. Annual HR Recruitment Agency Placement Fees: ₹1,50,000
6. Client Onsite Travel & Hotel Expenses: ₹95,000 (Specifically for Client Alpha Project)
7. Annual Corporate Statutory Audit Fees: ₹1,00,000
8. Pantry Supplies, Coffee & Team Lunch: ₹45,000

Task:
1. Define a logical Cost Center & Cost Category hierarchy for Tally Prime.
2. Formulate a Cost Allocation Matrix showing:
   - Expense Ledger Name
   - Cost Category (e.g. Department vs Project vs Corporate Overhead)
   - Specific Cost Center(s) assigned
   - Allocation Rule / Percentage logic (e.g. Area-based, headcount-based, direct attribution).
3. Provide the exact Tally Prime step-by-step procedure to configure and record these allocations."
---`,
    handsOnTask: "Enable Cost Centers in F11, create Cost Categories 'Departments' and 'Software Projects', create 4 department cost centers, and record 2 payment vouchers allocating software subscriptions and consultant fees across departments and projects.",
    assignment: `Assignment 18: Multi-Department Cost Center Setup & Allocation
1. Create Company 'Apex Logistics & Transport Hub'.
2. Enable Cost Centers in F11.
3. Create 2 Cost Categories:
   • 'Fleet Vehicles' (Cost Centers: Truck MH-04-1234, Truck MH-04-5678, Van MH-04-9999)
   • 'Operating Branches' (Cost Centers: Pune Hub, Mumbai Port Office, Nagpur Depot).
4. Create Ledgers: 'Diesel & Fuel Expense', 'Vehicle Maintenance & Repairs', 'Driver Trip Allowances', 'Office Electricity'. Ensure Cost Centers are enabled on all.
5. Record 5 Payment Vouchers allocating fuel, maintenance, and trip costs to specific trucks and branches.
6. Generate and export the Cost Centre Break-up and Ledger Break-up reports.`,
    quiz: [
      {
        q: "What is the primary managerial accounting purpose of Cost Centers in Tally Prime?",
        opts: ["To track and allocate income and expenses to specific departments, branches, or projects without creating duplicate ledgers", "To compute depreciation on fixed assets", "To file quarterly GST returns", "To generate customer barcode labels"],
        ans: 0,
        exp: "Cost Centers enable granular tracking of expenses by department, project, or branch under unified general ledger heads."
      },
      {
        q: "What is the key difference between a 'Cost Category' and a 'Cost Center'?",
        opts: ["Cost Category is the overarching classification dimension (e.g. 'Departments'), while Cost Center is the specific unit within it (e.g. 'Marketing')", "Cost Category is only for inventory, Cost Center is for cash", "They are identical and interchangeable", "Cost Center is only used in banking"],
        ans: 0,
        exp: "A Cost Category groups related Cost Centers along parallel dimensions (e.g., Departments, Projects, Executives)."
      },
      {
        q: "Which option must be set to 'YES' in an Expense Ledger master (e.g., Staff Salary) for Tally to prompt for cost center allocation during voucher entry?",
        opts: ["Cost Centers are applicable", "Maintain Balances Bill-by-Bill", "Is GST Applicable", "Provide Bank Details"],
        ans: 0,
        exp: "Setting 'Cost Centers are applicable = YES' on a ledger instructs Tally to display the Cost Allocation sub-screen during voucher entry."
      },
      {
        q: "Where can an accountant view the consolidated expense allocation across all departments in Tally Prime?",
        opts: ["Gateway of Tally -> Display More Reports -> Statements of Accounts -> Cost Centres -> Category Summary", "GOT -> Banking -> Cheque Register", "GOT -> Display -> Day Book", "GOT -> Ratio Analysis"],
        ans: 0,
        exp: "Category Summary under Cost Centres reports provides a consolidated overview of allocations across all cost categories and centers."
      },
      {
        q: "Can a single payment entry (e.g., Rent ₹1,50,000) be allocated across multiple Cost Categories simultaneously in Tally Prime?",
        opts: ["Yes, Tally supports parallel allocation across multiple categories (e.g. Branches and Departments simultaneously)", "No, Tally restricts entries to one category only", "Only if paid in cash", "Only in foreign currency"],
        ans: 0,
        exp: "Tally Prime supports multi-dimensional allocation, allowing an expense to be distributed across branches and departments in one entry."
      }
    ],
    reflection: [
      "I understand the difference between Financial Ledgers and Managerial Cost Centers.",
      "I can create Cost Categories and Cost Centers for departments and projects.",
      "I can allocate operational expenses across multiple cost units in a single voucher.",
      "I can access and review Cost Centre Category Summary reports."
    ]
  },
  day19: {
    title: "Day 19 — Cost Analysis: Reports, Salary Allocation & Department Profitability",
    objectives: [
      "Master Tally Prime Cost Center reporting tools (Category Summary, Cost Centre Break-up, Ledger Break-up).",
      "Execute complex Salary and Overhead allocations across organizational departments.",
      "Analyze department-wise and project-wise profitability and cost variances.",
      "Perform expense trend analysis to identify operational waste and cost overruns.",
      "Use AI to interpret cost-center reports and provide executive financial recommendations."
    ],
    explanation: `Recording cost center allocations is only half the process—extracting actionable intelligence from Cost Center reports is where financial leadership happens. Day 19 focuses on deep cost analysis: department-wise salary splits, overhead distribution, project profit calculations, and AI-driven executive reporting.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. The Tally Prime Cost Reporting Suite',
        content: '• Pathway: GOT -> Display More Reports -> Statements of Accounts -> Cost Centres:\n  1. Category Summary: Consolidated view of all active categories (Departments, Projects, Branches) with net debits/credits.\n  2. Cost Centre Break-up: Deep dive into a single Cost Center (e.g., "Marketing Dept") showing every ledger expense incurred by it.\n  3. Ledger Break-up: Deep dive into a single Ledger (e.g., "Electricity Expense") showing how it was shared among all departments.\n  4. Group Break-up: Analyzes an entire accounting group (e.g., Indirect Expenses) across all cost centers.',
        icon: 'BarChart3',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Department Salary & Overhead Allocation Workflow',
        content: '• In corporate payroll, a single bank payout of ₹15,00,000 for monthly salaries spans dozens of roles.\n• Step-by-Step Salary Allocation in Payment Voucher (F5):\n  → Dr Salary A/c ₹15,00,000\n  → Cost Category: Departments\n     • Software Engineering (25 Staff): ₹7,50,000\n     • Sales & Business Dev (12 Staff): ₹3,60,000\n     • Customer Support (8 Staff): ₹1,80,000\n     • HR & Talent Acquisition (4 Staff): ₹1,10,000\n     • Executive & Finance (3 Staff): ₹1,00,000\n  → Cr HDFC Bank Current A/c ₹15,00,000\n• Result: Immediate visibility into personnel cost per operational wing.',
        icon: 'Users',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Calculating Department & Project Profitability',
        leftTitle: 'Direct Revenue vs Direct Cost Allocation',
        leftDesc: 'When Cost Centers are applied to both Revenue (Sales/Services) and Expenses:\n• Sales Ledger Dr/Cr can be tagged to "Project SmartCity".\n• Direct Subcontractor & Materials tagged to "Project SmartCity".\n• Tally calculates exact Project Gross Margin = Project Revenue minus Project Costs.',
        rightTitle: 'Overhead Apportionment & Variance',
        rightDesc: '• Indirect corporate costs (Rent, Admin, Utilities) apportioned based on floor area or headcount.\n• Variance Analysis: Comparing budgeted departmental allocations against actual Tally Cost Centre Break-up reports.'
      },
      {
        type: 'tip',
        title: '4. Executive Analysis: Reading the Numbers Behind the Ledgers',
        content: '• High Sales Cost Ratio: If Sales Department consumes 35% of total expenses but generates only 12% revenue growth, acquisition efficiency is failing.\n• Admin Creep: Unchecked stationery, travel, and miscellaneous admin costs can silently erode gross trading profits.\n• Project Burn Rate: Tracking monthly project cost center totals ensures contracts do not exceed fixed client billable milestones.',
        icon: 'TrendingDown',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.03)'
      }
    ],
    demonstration: `Generating & Auditing Cost Center Break-Up & Salary Allocation:
1. Record Monthly Payroll: Debit 'Salaries & Allowances' ₹6,00,000 -> Allocate to Engineering (₹3,20,000), Sales (₹1,60,000), Admin (₹1,20,000).
2. Record Monthly Rent: Debit 'Office Rent' ₹1,50,000 -> Allocate based on floor space: Engineering (50% = ₹75,000), Sales (30% = ₹45,000), Admin (20% = ₹30,000).
3. Navigate to GOT -> Display More Reports -> Statements of Accounts -> Cost Centres -> Cost Centre Break-up.
4. Select 'Sales Department': Observe combined totals of Salaries, Rent, Travel, and Telephone allocated specifically to Sales.
5. Press Alt + F1 / Alt + F5 for detailed voucher-level transaction drilldown.
6. Select Ledger Break-up -> 'Office Rent' -> Verify total ₹1,50,000 distributed precisely across the 3 departments.`,
    realWorldExample: `Pinnacle Digital Media runs 3 creative divisions: Performance Marketing, Video Production, and Web Development. Cost center reporting in Tally Prime revealed that Video Production was running a monthly deficit of ₹1,80,000 due to unbilled camera rentals and idle studio crew. They restructured video pricing packages and achieved departmental profitability within 60 days.`,
    aiActivity: `AI Activity: Use AI to interpret cost-center reports.

Copy and paste this prompt into your AI Assistant:
---
"Act as a seasoned Management Consultant and Financial Controller.

Here is the Q1 Departmental Cost Center Summary extracted from Tally Prime for 'Nexus Global Retail Ltd':

Cost Category: Departments
1. Sales & Business Development:
   - Salaries: ₹18,00,000
   - Client Entertainment & Dining: ₹4,20,000
   - Travel & Conveyance: ₹6,50,000
   - Digital Ads & Promotion: ₹12,00,000
   - Total Dept Expense: ₹40,70,000 (Revenue Generated: ₹62,00,000)

2. IT & Infrastructure:
   - Salaries: ₹22,00,000
   - Cloud Servers & SaaS Tools: ₹8,90,000
   - Hardware AMC & Repairs: ₹1,80,000
   - Total Dept Expense: ₹32,70,000

3. Operations & Customer Care:
   - Salaries: ₹11,00,000
   - Telecom & Toll-free Lines: ₹3,10,000
   - Office Supplies & Logistics: ₹2,40,000
   - Total Dept Expense: ₹16,50,000

4. Human Resources & General Admin:
   - Salaries: ₹7,50,000
   - Office Rent & Electricity: ₹15,00,000
   - Recruitment Consultant Fees: ₹5,80,000
   - Pantry & Staff Welfare: ₹3,90,000
   - Total Dept Expense: ₹32,20,000

Company Total Revenue: ₹62,00,000 | Total Operating Expense: ₹1,22,10,000 | Net Operating Loss: -₹60,10,000

Analyze this cost report and deliver:
1. Expense-to-Revenue Diagnosis: Calculate each department's % share of total overheads.
2. Top 3 Red Flags / Cost Leakages identified in the data.
3. Actionable Cost Reduction Plan: Specific line-item expense reduction targets to bring the company to cash flow break-even.
4. Tally Prime Cost Control Mechanisms: How to implement Cost Center Budgets & variance tracking in Tally."
---`,
    handsOnTask: "Create company 'Nexus Global Services', configure Department Cost Centers, record 4 multi-department payment vouchers for Salary, Rent, Electricity, and Travel, and analyze the resulting breakdown in Cost Centre Break-up and Ledger Break-up reports.",
    assignment: `Assignment 19: Comprehensive Cost Center Audit & Department P&L
1. Create Company 'Quantum Diagnostic Healthcare'.
2. Configure Cost Category 'Hospital Wings':
   • 'Radiology & Imaging', 'Pathology Lab', 'Outpatient Consultation (OPD)', 'Emergency & ICU'.
3. Create expense ledgers: Medical Consumables, Machine Maintenance AMC, Doctor Honorariums, Nursing Staff Salary, Sterilization & Utilities.
4. Record 8 transactional entries with detailed wing-wise allocations.
5. Record Revenue receipts allocated to respective hospital wings.
6. Generate:
   • Cost Centre Category Summary
   • Cost Centre Break-up for Pathology Lab & Radiology
   • Comparative Departmental Operating Profitability statement.
7. Run the AI Report Interpretation prompt with your numbers and submit the final diagnostic memo.`,
    quiz: [
      {
        q: "Which Tally Prime report displays all the different expense ledgers charged against a single specific Cost Center (e.g., Marketing Dept)?",
        opts: ["Cost Centre Break-up (Display More Reports -> Statements of Accounts -> Cost Centres -> Cost Centre Break-up)", "Balance Sheet", "Day Book", "Cheque Register"],
        ans: 0,
        exp: "Cost Centre Break-up shows the detailed list of every expense ledger and amount charged to that specific cost center."
      },
      {
        q: "Which Tally Prime report shows how a single specific ledger (e.g. Office Electricity) was shared among all departments?",
        opts: ["Ledger Break-up under Cost Centres reports", "Trial Balance", "Cash Flow", "Stock Summary"],
        ans: 0,
        exp: "Ledger Break-up isolates one general ledger account and lists the proportions allocated to each cost center."
      },
      {
        q: "When allocating a monthly Salary Payment of ₹10,00,000 across 4 departments in a single F5 voucher, how does Tally update the General Ledger Balance Sheet?",
        opts: ["It debits Salary Expense once for ₹10,00,000 and credits Bank for ₹10,00,000, while storing departmental splits in the cost sub-ledger", "It creates 4 separate bank accounts", "It changes the company capital", "It delays the payment by 30 days"],
        ans: 0,
        exp: "The General Ledger maintains standard accounting integrity (1 debit, 1 credit) while the sub-ledger tracks granular cost center distributions."
      },
      {
        q: "If management discovers through Cost Center analysis that a specific client project has consumed ₹4,00,000 in expenses but was only billed ₹3,50,000, what managerial conclusion is drawn?",
        opts: ["The project is running at an operational loss of ₹50,000 and requires scope revision, price escalation, or cost control", "The project is highly profitable", "Tally has a calculation error", "GST should be refunded"],
        ans: 0,
        exp: "Cost center project analysis highlights unprofitable contracts where costs exceed agreed billing milestones."
      },
      {
        q: "What key advantage does the Category Summary report provide to executive leadership during monthly financial reviews?",
        opts: ["A consolidated side-by-side comparison of total expenditure and revenue across all organizational divisions in one view", "It prints blank invoices", "It hides losses from the auditor", "It converts currency to gold"],
        ans: 0,
        exp: "Category Summary provides a consolidated high-level overview of expenditure across all departments and projects."
      }
    ],
    reflection: [
      "I can navigate and interpret Category Summary, Cost Centre Break-up, and Ledger Break-up reports.",
      "I can execute multi-department salary and overhead allocations.",
      "I can compute project and departmental profitability in Tally Prime.",
      "I can use AI to identify cost leakages and formulate executive cost-reduction plans."
    ]
  },
  day20: {
    title: "Day 20 — 🟦 Mini Project 6: Business Cost & Pricing Simulation",
    objectives: [
      "Synthesize all concepts of Multi-Level Pricing, Price Levels, Cost Centers, and Cost Categories into an end-to-end enterprise simulation.",
      "Build a complete multi-tier commercial distribution business with multiple customer categories (Retail, Wholesale, Dealer).",
      "Configure department-wise and project-wise Cost Centers for expense and salary management.",
      "Execute complete procurement, pricing list enforcement, departmental expense allocation, and multi-tier sales cycles.",
      "Solve the AI Business Challenge: Determine cost drivers, top revenue customer segments, and cost-reduction opportunities."
    ],
    explanation: `Mini Project 6 is a comprehensive capstone simulation integrating Pricing & Cost Management. Students configure an enterprise trading and service distribution company with multi-tiered customer pricing (Retail, Wholesale, Dealer) alongside multi-department Cost Centers (Sales, IT, HR, Operations). Using Tally reports and AI diagnostics, students audit channel profitability and operational cost drivers.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Mini Project 6 Overview: Nexus Enterprises',
        content: '• Business Name: Nexus Enterprises (Electronics & Tech Distributor)\n• Operational Scope:\n  1. Multi-Level Pricing: Sells Smart Home Automation Hardware across 3 tiers (Retail, Wholesale, Authorized Dealer) with volume slabs.\n  2. Multi-Department Cost Management: Operates 4 internal departments (Sales & Marketing, Technical Support, Warehouse & Logistics, Administration).\n  3. Client Projects: Implements custom smart-office automation projects (Project MetroTech, Project GrandResort).',
        icon: 'Briefcase',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Master Architecture & Setup Requirements',
        content: '• Inventory & Price Lists:\n  → Items: Smart Hub Controller (Cost ₹3,500), Smart Door Lock (Cost ₹4,200), WiFi Smart Switch 4-Gang (Cost ₹650).\n  → Price Levels: Retail, Wholesale, Dealer with defined quantity discount slabs.\n• Cost Categories & Centers:\n  → Category 1: "Departments" -> Sales & Mktg, Tech Support, Logistics, Admin.\n  → Category 2: "Automation Projects" -> Project MetroTech, Project GrandResort.\n• Customer Ledgers Tagged with Price Levels:\n  → Retail: Walk-in Cash Customers.\n  → Wholesale: Urban Smart Homes, Apex Living Spaces.\n  → Dealer: National InfraDistributors Ltd.',
        icon: 'Layers',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Project Transaction Blueprint',
        leftTitle: 'Part A: Inventory & Sales Cycle',
        leftDesc: '1. Purchase initial inventory of 300 units each from "Global IoT Technologies".\n2. Configure multi-tier Price Lists.\n3. Record Retail Cash sales at full retail rates.\n4. Record Wholesale orders with volume discounts.\n5. Record Dealer bulk shipments (100+ units) with contractual slab discounts.',
        rightTitle: 'Part B: Department Expense & Project Cycle',
        rightDesc: '1. Disburse monthly Salaries (₹4,50,000) allocated across the 4 departments.\n2. Pay Office Rent (₹1,20,000) and Marketing Campaigns (₹1,80,000) allocated to respective cost centers.\n3. Pay Direct Site Expenses (wiring, labor ₹95,000) allocated to Project MetroTech.\n4. Record Service Revenue ₹3,50,000 credited to Project MetroTech.'
      },
      {
        type: 'challenge',
        title: '4. AI Executive Challenge Objectives',
        content: '• Challenge 1: Which department costs the most to operate, and what percentage of total monthly overhead does it represent?\n• Challenge 2: Which customer category (Retail vs Wholesale vs Dealer) generates better revenue and gross profit contribution?\n• Challenge 3: Where can operational costs potentially be reduced to expand net profit margins without hurting customer fulfillment?',
        icon: 'HelpCircle',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.03)'
      }
    ],
    demonstration: `Mini Project 6 Execution Walkthrough:
1. Company Creation: Create 'Nexus Enterprises' -> F11: Enable Multiple Price Levels = Yes, Enable Cost Centers = Yes, Use Discount Column in Invoices = Yes.
2. Create Master Structures: Cost Categories (Departments, Projects), Cost Centers, Stock Items, and Price Levels (Retail, Wholesale, Dealer).
3. Formulate Price Lists for Smart Hub, Door Lock, and Smart Switches across all 3 levels.
4. Procurement: Purchase stock from 'Global IoT Technologies' (Cr ₹25,00,000).
5. Sales Execution: Bill Retail, Wholesale, and Dealer customers; verify automatic rate & discount selection in F8.
6. Expense Execution: Record multi-department Salary, Rent, Advertising, and Project site payments.
7. Audit & Reporting: Extract Profit & Loss Account, Stock Summary, Category Summary, and Cost Centre Break-up.
8. Run the AI Executive Challenge to produce strategic business insights.`,
    realWorldExample: `Nexus Enterprises scaled from a single store to a regional distribution powerhouse handling ₹80 Lakhs in monthly turnover. By integrating Price Level automation with granular Departmental Cost Centers in Tally Prime, the management team achieved 100% pricing accuracy across 45 wholesale dealers while monitoring exact departmental overheads, identifying ₹1,40,000 in redundant logistics expenses and expanding net profit margins by 6.4%.`,
    aiActivity: `AI Challenge: Determine (1) Which department costs the most? (2) Which customer category generates better revenue? (3) Where can costs potentially be reduced?

Copy and paste this prompt into your AI Assistant:
---
"Act as a Managing Director and Chief Financial Analyst reviewing the completed Mini Project 6 simulation for 'Nexus Enterprises'.

Using your recorded Tally Prime transaction dataset:
1. Pricing & Revenue Breakdown:
   - Retail Sales: ₹3,85,000 (Gross Margin: 48%)
   - Wholesale Sales: ₹14,20,000 (Gross Margin: 24%)
   - Dealer Sales: ₹38,50,000 (Gross Margin: 13.5%)
   - Project Service Revenue: ₹3,50,000 (Project Direct Margin: 62%)

2. Departmental Operating Overheads (Tally Cost Centre Summary):
   - Sales & Marketing Dept: ₹3,20,000 (Salaries ₹1,40,000, Ads ₹1,80,000)
   - Logistics & Warehouse: ₹2,10,000 (Salaries ₹90,000, Freight & Packing ₹1,20,000)
   - Technical Support: ₹1,50,000 (Salaries ₹1,20,000, Tools ₹30,000)
   - General Administration: ₹1,90,000 (Salaries ₹1,00,000, Office Rent ₹90,000)
   - Total Operating Overheads: ₹8,70,000

Conduct the AI Challenge Audit and answer with quantitative precision:
1. Question 1 — Department Cost Analysis: Which department costs the most? What is its percentage share of total overheads, and is this expenditure justified relative to business growth?
2. Question 2 — Customer Category Revenue Contribution: Which customer category generates better overall revenue and absolute gross profit in Rupees? Compare the volume-driven Dealer tier against the high-margin Retail tier.
3. Question 3 — Cost Optimization Opportunities: Identify exactly where costs can potentially be reduced across marketing, logistics, and admin without degrading service quality. Provide 3 specific managerial action steps."
---`,
    handsOnTask: "Create company 'Nexus Enterprises' with full GST, Multi-Price Levels, and Cost Centers. Configure price lists, record inventory purchases, bill 3 customer tiers, allocate multi-department salary and rent expenses, and extract financial reports to complete the AI challenge.",
    assignment: `Mini Project 6: Business Cost & Pricing Comprehensive Deliverables

Part 1: Master Setup & Documentation
1. Detailed screenshot/document of F11 Company Features showing Multiple Price Levels and Cost Centers enabled.
2. Master Chart showing Price Lists configured for all 3 items across Retail, Wholesale, and Dealer tiers.
3. Master Chart of Cost Categories and Cost Centers created.

Part 2: Transaction Execution
1. 1 Purchase Voucher for inventory stock procurement.
2. 3 Sales Vouchers across Retail, Wholesale, and Dealer customers verifying automated rate & slab discount calculations.
3. 2 Expense Payment Vouchers with multi-department cost center allocations.
4. 1 Project site expense voucher and 1 Project service sales voucher.

Part 3: Financial & Managerial Deliverables
1. Profit & Loss Account showing Gross Profit and Net Operating Profit.
2. Stock Summary showing closing stock quantities and inventory valuation.
3. Cost Centre Category Summary showing total departmental expenses.
4. Completed AI Challenge Report answering: (1) Highest costing department, (2) Top revenue generating customer category, (3) Key cost reduction recommendations.`,
    quiz: [
      {
        q: "In Mini Project 6, what is the key strategic benefit of combining Multi-Level Pricing with Cost Center tracking in Tally Prime?",
        opts: ["It provides total visibility into both revenue generation by customer channel and expense consumption by operational department", "It eliminates the need to pay suppliers", "It automatically generates bank loans", "It converts goods into fixed assets"],
        ans: 0,
        exp: "Combining tiered pricing with cost center analysis gives management 360-degree control over channel margins and departmental burn rates."
      },
      {
        q: "When analyzing customer category contribution for Nexus Enterprises, why does the Dealer category generate the highest gross profit in Rupees despite having the lowest gross margin % (13.5%)?",
        opts: ["Because the massive sales volume (₹38,50,000) generates ₹5,19,750 in gross profit, far surpassing retail's small total volume", "Because dealers pay cash only", "Because Tally gives free bonus profit", "Because dealers do not receive invoices"],
        ans: 0,
        exp: "Volume multiplication: A lower percentage margin on large turnover generates substantially higher absolute rupee gross profit."
      },
      {
        q: "In the Cost Centre Category Summary, if Sales & Marketing accounts for 36.8% (₹3,20,000) of total company overheads, what metric should management evaluate to determine if this cost is justified?",
        opts: ["Customer Acquisition Cost (CAC) and Revenue Growth generated by marketing campaigns relative to ad spend", "The color of the sales brochures", "The number of bank cheques printed", "The price of office furniture"],
        ans: 0,
        exp: "Marketing spend is evaluated through return on ad spend (ROAS) and customer acquisition cost against revenue generated."
      },
      {
        q: "What role does the 'Cost Centre Break-up' report play when investigating where logistics expenses can be reduced for Nexus Enterprises?",
        opts: ["It itemizes exact freight, courier, packing, and warehouse salary components to identify specific cost leakages", "It recalculates tax rates", "It hides expenses from the bank", "It deletes duplicate stock items"],
        ans: 0,
        exp: "Cost Centre Break-up isolates the logistics department, displaying every individual expense ledger charged to it."
      },
      {
        q: "When recording site expenses for 'Project MetroTech', why is allocating expenses to a Project Cost Center critical before final customer invoicing?",
        opts: ["To accurately calculate project-level direct margin and verify whether billing milestones cover all site execution costs", "To cancel the contract", "To avoid paying site technicians", "To change the project location"],
        ans: 0,
        exp: "Project cost allocation ensures direct material and labor expenses are matched against project revenue to measure contract profitability."
      }
    ],
    reflection: [
      "I have mastered Multi-Level Pricing across Retail, Wholesale, and Dealer customer tiers.",
      "I can design and implement complex multi-department and project Cost Center architectures.",
      "I can execute complete end-to-end commercial trading and expense allocation cycles in Tally Prime.",
      "I can solve executive business challenges: auditing departmental costs, channel profitability, and cost-reduction opportunities."
    ]
  },
  day21: {
    title: "Day 21 — GST Fundamentals: CGST, SGST, IGST, UTGST & HSN/SAC",
    objectives: [
      "Understand the constitutional and economic foundation of Goods and Services Tax (GST) in India.",
      "Differentiate between Intra-State supply (CGST + SGST/UTGST) and Inter-State supply (IGST).",
      "Understand the role of HSN (Harmonized System of Nomenclature) and SAC (Services Accounting Code).",
      "Learn the 5 standard GST tax slabs (0%, 5%, 12%, 18%, 28%) and the concept of Input Tax Credit (ITC).",
      "Use AI to explain GST mechanics and classify real-world business transactions into exact tax buckets."
    ],
    explanation: `Goods and Services Tax (GST) is a unified, destination-based indirect tax levied on the manufacture, sale, and consumption of goods and services throughout India. Replacing a complex web of cascading taxes (VAT, Service Tax, Excise, CST), GST operates on a dual-tier structure where both the Central and State Governments levy tax simultaneously on a common taxable base.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is GST & The Dual Model Structure?',
        content: '• One Nation, One Tax: GST replaced multiple indirect taxes with a transparent value-added tax system across India.\n• The Dual GST Architecture:\n  1. Intra-State Supply (Within the same State/UT): Both Central and State Governments share the tax equally.\n     → CGST (Central GST): Revenue collected by the Central Government.\n     → SGST (State GST): Revenue collected by the State Government.\n     → UTGST (Union Territory GST): Replaces SGST in Union Territories without legislatures (e.g., Andaman & Nicobar, Chandigarh, Ladakh).\n  2. Inter-State Supply (Between two different States or Import/SEZ):\n     → IGST (Integrated GST): Collected by the Central Government and apportioned between Centre and destination State.',
        icon: 'TrendingUp',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Tax Rate Slabs & The 50:50 Intra-State Rule',
        content: '• Common GST Tax Slabs in India:\n  • 0% (Nil Rated / Exempt): Essential food grains, fresh milk, unbranded staples, healthcare.\n  • 5%: Packaged foods, transport services, economy footwear, tea/coffee, solar panels.\n  • 12%: Processed foods, business class air travel, medical instruments, computers.\n  • 18% (Standard Rate): IT hardware, electronics, telecom, restaurants, software, capital machinery.\n  • 28% (Luxury / Demerit): Motor vehicles, air conditioners, tobacco, aerated drinks.\n• The 50:50 Division Rule for Intra-State Sales:\n  → If GST rate is 18%: 9% CGST + 9% SGST\n  → If GST rate is 28%: 14% CGST + 14% SGST\n  → If GST rate is 5%: 2.5% CGST + 2.5% SGST.',
        icon: 'Percent',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. HSN vs SAC Classification Codes',
        leftTitle: 'HSN (Harmonized System of Nomenclature)',
        leftDesc: '• Used for Goods and physical inventory items.\n• Globally recognized 8-digit international coding system.\n• In India, businesses quote 4, 6, or 8 digits based on annual turnover:\n  → Turnover > ₹5 Crore: Mandatory 6-digit HSN on all B2B invoices.\n  → Turnover <= ₹5 Crore: 4-digit HSN on B2B invoices.\n• Example: HSN 8471 (Computers & Laptops), HSN 8528 (Monitors & TVs).',
        rightTitle: 'SAC (Services Accounting Code)',
        rightDesc: '• Used exclusively for Services (intangible offerings).\n• 6-digit classification issued by the Central Board of Indirect Taxes & Customs (CBIC).\n• Always begins with the prefix 99 (e.g. 9983 for Information Technology & Software Consulting, 9972 for Real Estate services, 9965 for Freight transport).\n• Mandatory on all service billing invoices.'
      },
      {
        type: 'tip',
        title: '4. Understanding Input Tax Credit (ITC)',
        content: '• Input Tax Credit (ITC) allows a business to deduct the GST paid on purchases (Input GST) from the GST collected on sales (Output GST).\n• Formula: Net GST Payable to Government = Output GST Collected minus Eligible Input Tax Credit.\n• Condition: Both buyer and seller must report valid GSTIN, file returns, and match invoices on the GST Portal.',
        icon: 'ShieldCheck',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `GST Practical Math & Tax Calculation Mechanics:
Example 1 — Intra-State Sale (Seller in Tamil Nadu, Buyer in Tamil Nadu):
• Product: Dell 24-inch Monitor | Value: ₹10,000 | GST Rate: 18%
• Calculation:
  1. Base Value: ₹10,000
  2. CGST (9%): ₹900
  3. SGST (9%): ₹900
  4. Total Invoice Amount: ₹11,800.

Example 2 — Inter-State Sale (Seller in Tamil Nadu, Buyer in Karnataka):
• Product: Dell 24-inch Monitor | Value: ₹10,000 | GST Rate: 18%
• Calculation:
  1. Base Value: ₹10,000
  2. IGST (18%): ₹1,800
  3. Total Invoice Amount: ₹11,800.

Example 3 — Input Tax Credit (ITC) Settlement:
• Total Output GST Collected on Sales this month: ₹50,000 (₹25,000 CGST + ₹25,000 SGST)
• Total Input GST Paid on Purchases this month: ₹32,000 (₹16,000 CGST + ₹16,000 SGST)
• Net GST Payable to Govt via Challan: ₹18,000 (₹9,000 CGST + ₹9,000 SGST).`,
    realWorldExample: `Apex Technologies (Chennai, Tamil Nadu) sells ₹5,00,000 worth of computer networking servers (18% GST). When selling to a client in Coimbatore (Tamil Nadu), they bill ₹45,000 CGST + ₹45,000 SGST. When shipping the exact same server to a client in Bengaluru (Karnataka), they bill ₹90,000 IGST. The total tax collected is identical (₹90,000), but the routing ensures state revenues reach destination governments accurately.`,
    aiActivity: `AI Activity: GST concept explanation and transaction classification.

Copy and paste this prompt into your AI Assistant:
---
"Act as a certified GST Practitioner and Chartered Accountant.

I want you to test my understanding of GST fundamentals. Here is a list of 6 business transactions:

1. A laptop dealer in Chennai (TN) sells 5 laptops to an IT firm in Madurai (TN) for ₹2,50,000 (GST 18%).
2. A furniture showroom in Mumbai (Maharashtra) supplies 10 office chairs to a clinic in Hyderabad (Telangana) for ₹80,000 (GST 18%).
3. A grocery wholesaler in Chandigarh (Union Territory without legislature) sells staples locally for ₹40,000 (GST 5%).
4. A software company in Bengaluru (Karnataka) provides custom cloud development services to a client in Pune (Maharashtra) for ₹1,50,000 (SAC 9983, GST 18%).
5. An electronics store in Ahmedabad (Gujarat) purchases 20 LED TVs from a manufacturer in Vadodara (Gujarat) for ₹6,00,000 (GST 28%).
6. A corporate firm in Delhi imports server equipment from Germany for ₹12,00,000.

Please provide a detailed classification table:
1. Transaction Type: Intra-State vs Inter-State vs Import.
2. Applicable GST Components: (CGST + SGST) vs (CGST + UTGST) vs IGST.
3. Applicable Rates (%) and calculated Rupee amounts for each tax component.
4. Total Final Invoice Value.
5. Explain the concept of Input Tax Credit (ITC) eligibility for each buyer."
---`,
    handsOnTask: "Review the GST tax calculation formulas. Practice calculating the exact CGST, SGST, and IGST breakdowns for 5 transactions across different tax slabs (5%, 12%, 18%, 28%) and determine the net tax payable after Input Tax Credit deduction.",
    assignment: `Assignment 21: GST Concept Mastery & Transaction Classification Matrix
1. Prepare a comprehensive GST Classification Reference Chart containing:
   • Definitions and differences between CGST, SGST, IGST, and UTGST.
   • The 5 standard GST tax slabs in India with 3 real-world commodity examples per slab.
   • Difference between HSN Code and SAC Code with rules on mandatory digit lengths.
2. Classify 8 business transactions into Intra-State and Inter-State categories and compute the exact tax amounts.
3. Submit a worked calculation showing how a business paying ₹45,000 Input Tax on raw materials and collecting ₹72,000 Output Tax on finished goods utilizes ITC to settle its net tax liability.`,
    quiz: [
      {
        q: "What type of GST is levied when a registered supplier in Chennai sells goods to a buyer in Madurai (within Tamil Nadu)?",
        opts: ["CGST and SGST in equal proportions (50:50)", "IGST only", "UTGST and IGST", "Customs Duty"],
        ans: 0,
        exp: "Intra-state sales within the same state are subject to CGST (Central GST) and SGST (State GST) in equal halves."
      },
      {
        q: "Which tax component is applied when goods are sold from a dealer in Mumbai (Maharashtra) to a buyer in Bengaluru (Karnataka)?",
        opts: ["IGST (Integrated GST)", "CGST only", "SGST only", "Service Tax"],
        ans: 0,
        exp: "Inter-state supplies crossing state borders attract IGST (Integrated Goods and Services Tax)."
      },
      {
        q: "What is the primary difference between an HSN code and a SAC code?",
        opts: ["HSN codes classify physical goods/inventory, while SAC codes classify intangible services", "HSN is for import only, SAC is for domestic sales", "HSN is 2 digits, SAC is 10 digits", "There is no difference"],
        ans: 0,
        exp: "HSN (Harmonized System of Nomenclature) is used for goods, while SAC (Services Accounting Code) is used for services."
      },
      {
        q: "If an electronics item with an 18% GST rate is sold within the same state for ₹10,000, what are the exact tax amounts?",
        opts: ["CGST ₹900 (9%) + SGST ₹900 (9%)", "IGST ₹1,800 (18%)", "CGST ₹1,800 + SGST ₹1,800", "Zero tax"],
        ans: 0,
        exp: "For an 18% intra-state sale, the tax is split 50:50: 9% CGST (₹900) and 9% SGST (₹900)."
      },
      {
        q: "What is the core benefit of the Input Tax Credit (ITC) mechanism under GST?",
        opts: ["It eliminates the cascading 'tax-on-tax' effect by allowing businesses to offset GST paid on purchases against GST collected on sales", "It gives a 100% tax exemption to all consumers", "It guarantees bank interest on tax deposits", "It doubles the selling price"],
        ans: 0,
        exp: "ITC ensures tax is paid only on the incremental value added at each stage of the supply chain."
      }
    ],
    reflection: [
      "I understand the difference between Intra-State and Inter-State supply.",
      "I can calculate CGST, SGST, IGST, and UTGST accurately across different tax slabs.",
      "I understand the purpose and structure of HSN and SAC codes.",
      "I understand the mechanics of Input Tax Credit (ITC)."
    ]
  },
  day22: {
    title: "Day 22 — GST Setup in Tally Prime: Features, Registration, Ledgers & Item Masters",
    objectives: [
      "Enable and configure Goods and Services Tax in Tally Prime (F11 Features).",
      "Configure Company GST Registration details (State, Registration Type, GSTIN, Return Periodicity).",
      "Create statutory GST Tax Ledgers (Input/Output CGST, SGST, IGST under Duties & Taxes).",
      "Configure Customer and Supplier Ledgers with valid GST Registration types and GSTINs.",
      "Configure Stock Item and Service Masters with HSN/SAC codes, Taxability, and GST Rates."
    ],
    explanation: `Configuring GST in Tally Prime requires setting up statutory parameters across three interconnected layers: Company Features (F11), General Ledger Masters (Duties & Taxes), and Inventory Masters (Stock Items with HSN/SAC). When configured correctly, Tally Prime automates line-item tax calculations, verifies GSTIN structures, and generates audit-ready statutory returns.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Enabling GST in Company Features (F11)',
        content: '• Pathway: Press F11 (Company Features) -> Under Statutory & Taxation, set "Enable Goods and Services Tax (GST)" = YES.\n• GST Details Screen Configuration:\n  1. State: Select company registered state (e.g. Tamil Nadu).\n  2. Registration Type: "Regular" (standard tax filer) or "Composition" (flat rate small business).\n  3. GSTIN / UIN: Enter 15-digit Goods & Services Tax Identification Number (e.g., 33AAAAA0000A1Z5).\n  4. Periodicity of GSTR-1: Monthly (turnover > ₹5 Cr) or Quarterly (QRMP scheme).\n  5. Set/Alter GST Rate Details: Recommended to keep NO at company level if items have different tax rates (set rates at item/group level instead).',
        icon: 'Settings',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Creating Statutory GST Tax Ledgers',
        content: '• Pathway: Gateway of Tally (GOT) -> Create -> Ledger:\n  1. Central Tax (CGST):\n     → Under: Duties & Taxes | Type of Duty: GST | Tax Type: Central Tax | Percentage of Calculation: 0% (Tally auto-calculates).\n  2. State Tax (SGST):\n     → Under: Duties & Taxes | Type of Duty: GST | Tax Type: State Tax | Percentage: 0%.\n  3. Integrated Tax (IGST):\n     → Under: Duties & Taxes | Type of Duty: GST | Tax Type: Integrated Tax | Percentage: 0%.\n• Best Practice: Maintain common tax ledgers ("CGST", "SGST", "IGST") or separate Input/Output ledgers ("Input CGST", "Output CGST"). Leave percentage at 0% so Tally auto-detects rates from stock items!',
        icon: 'BookOpen',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Configuring Party & Stock Item Masters for GST',
        leftTitle: 'Party Ledger GST Configuration',
        leftDesc: 'Pathway: GOT -> Create / Alter -> Ledger (Debtor / Creditor)\n• State: MUST be selected accurately (e.g. Tamil Nadu vs Karnataka).\n• Registration Type:\n  1. Regular (GST registered business with 15-digit GSTIN).\n  2. Composition (Small business under composition levy).\n  3. Unregistered (Local unregistered entity).\n  4. Consumer (End retail customer).\n• GSTIN / UIN: Enter valid 15-digit GSTIN (Tally validates format and checksum state code!).',
        rightTitle: 'Stock Item GST Configuration',
        rightDesc: 'Pathway: GOT -> Create / Alter -> Stock Item\n• Under Statutory Details:\n  → Set/Alter GST Rate Details = YES (or specify HSN/Tax details in Tally Prime 3.0+).\n  → HSN / SAC Code: e.g. 8471 (Computers).\n  → Taxability: Taxable (or Exempt / Nil Rated).\n  → Integrated Tax Rate: Enter combined rate e.g. 18% (Tally automatically splits 9% Central + 9% State tax!).'
      },
      {
        type: 'tip',
        title: '4. The 15-Digit GSTIN Anatomy',
        content: '• Digits 1-2: 2-digit State Code (e.g., 33 for Tamil Nadu, 27 for Maharashtra, 29 for Karnataka, 07 for Delhi).\n• Digits 3-12: 10-digit PAN of the business entity (e.g., ABCDE1234F).\n• Digit 13: Entity number of the same PAN holder in that state (1 to 9, then A to Z).\n• Digit 14: Default character "Z".\n• Digit 15: Checksum verification digit.',
        icon: 'CheckCircle2',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `Step-by-Step GST Setup Blueprint in Tally Prime:
1. Open Company 'Royal Tech Trading' -> Press F11 -> Set 'Enable Goods and Services Tax (GST)' = YES.
2. In the GST Details screen:
   - State: Tamil Nadu | Registration Type: Regular
   - GSTIN/UIN: 33AABCR1234M1Z8 | Periodicity: Monthly. Press Ctrl+A to save.
3. Create Duties & Taxes Ledgers (GOT -> Create -> Ledger):
   - Name: 'CGST' -> Under: 'Duties & Taxes' -> Type: 'GST' -> Tax Type: 'Central Tax' -> Rate: 0%.
   - Name: 'SGST' -> Under: 'Duties & Taxes' -> Type: 'GST' -> Tax Type: 'State Tax' -> Rate: 0%.
   - Name: 'IGST' -> Under: 'Duties & Taxes' -> Type: 'GST' -> Tax Type: 'Integrated Tax' -> Rate: 0%.
4. Create Sales & Purchase Ledgers:
   - 'GST Sales' -> Under: 'Sales Accounts' -> GST Applicable: 'Applicable'.
   - 'GST Purchases' -> Under: 'Purchase Accounts' -> GST Applicable: 'Applicable'.
5. Create Customer Party Ledger:
   - Name: 'Murugan Infotech' -> Under: 'Sundry Debtors' -> State: 'Tamil Nadu' -> Registration: 'Regular' -> GSTIN: '33AAACM5555K1Z2'.
6. Create Stock Item:
   - Name: 'LaserJet Printer M100' -> Group: 'Printers' -> Unit: 'Nos'
   - GST Details: 'Specify Details Here' -> HSN: '8443' -> Taxability: 'Taxable' -> GST Rate: '18%'.`,
    realWorldExample: `Royal Tech Trading opens in Coimbatore. By configuring the company state as Tamil Nadu, creating generic CGST, SGST, and IGST ledgers with 0% calculation rate, and entering HSN 8471 with 18% tax on laptop items, the billing software automatically computes 9% CGST + 9% SGST for Tamil Nadu buyers and 18% IGST for Kerala buyers with zero manual tax selection.`,
    aiActivity: `AI Prompt: Generate a Complete GST Setup Checklist & Master Data Blueprint

Copy and paste this prompt into your AI Assistant:
---
"Act as a certified Tally Prime Statutory Implementation Specialist.

I am setting up GST compliance in Tally Prime for a newly incorporated business:
- Company Name: 'Apex Hardware & Industrial Spares Pvt Ltd'
- State of Registration: Maharashtra (State Code 27)
- Business Type: Wholesale Trader of Electrical Components & Industrial Tools

Please create a complete GST Master Setup Blueprint containing:
1. Step-by-step F11 GST Feature Configuration parameters.
2. A table of 5 required statutory ledgers with exact 'Under', 'Type of Duty', and 'Tax Type' settings.
3. A table of 4 sample Party Masters (2 Suppliers: 1 Local Regular, 1 Interstate Regular; 2 Customers: 1 Local Regular, 1 Consumer) with mock valid GSTIN numbers and state codes.
4. A table of 4 Stock Items with appropriate HSN Codes (e.g. 8536, 8205), Units, and GST Rates (5%, 18%, 28%).
5. Common setup mistakes to avoid that cause GST calculation failures in Tally Prime."
---`,
    handsOnTask: "Launch Tally Prime -> Enable GST in F11 for a company registered in your home state. Create CGST, SGST, and IGST ledgers under Duties & Taxes. Create 2 party ledgers (1 local, 1 interstate) with valid GSTIN formats, and create 2 stock items with HSN codes and 18% GST.",
    assignment: `Assignment 22: Complete GST Statutory Master Configuration in Tally Prime
1. Create a new company 'National Electronics & Gadgets' in Tally Prime.
2. Enable GST in F11 with State: Tamil Nadu, Registration Type: Regular, and GSTIN: 33AAACN1234F1Z6.
3. Create the standard GST Ledgers: CGST, SGST, IGST, GST Sales A/c, GST Purchase A/c.
4. Create 4 Party Ledgers with complete statutory addresses and GSTINs:
   • 2 Suppliers: Alpha Components (Chennai - Local Regular), Silicon Valley Importers (Bengaluru - Interstate Regular).
   • 2 Customers: Apex Retailers (Madurai - Local Regular), Cash Sales Counter (Consumer).
5. Create 4 Stock Items with HSN codes and tax rates:
   • Smart LED TV 43" (HSN: 8528, GST 18%)
   • High-Speed HDMI Cable (HSN: 8544, GST 18%)
   • Bluetooth Earbuds (HSN: 8518, GST 18%)
   • Commercial Air Conditioner (HSN: 8415, GST 28%).
6. Export the Chart of Accounts and submit your GST master setup verification.`,
    quiz: [
      {
        q: "Under which accounting group must statutory GST tax ledgers (CGST, SGST, IGST) be created in Tally Prime?",
        opts: ["Duties & Taxes", "Current Assets", "Direct Expenses", "Provisions"],
        ans: 0,
        exp: "All statutory tax ledgers must be grouped under 'Duties & Taxes' with Type of Duty set to 'GST'."
      },
      {
        q: "Why is it recommended to leave the 'Percentage of Calculation' at 0% when creating CGST and SGST ledgers in Tally Prime?",
        opts: ["Tally automatically extracts the applicable tax rate from the individual Stock Item or Stock Group master", "To avoid paying taxes to the government", "Because Tally only supports fixed 0% rates", "To allow manual tax calculation"],
        ans: 0,
        exp: "Setting 0% on the tax ledger enables dynamic rate detection: Tally reads 5%, 12%, 18%, or 28% directly from the billed stock items."
      },
      {
        q: "What do the first two digits of a 15-digit Indian GSTIN represent?",
        opts: ["The 2-digit State Code (e.g. 33 for Tamil Nadu, 27 for Maharashtra)", "The country code", "The year of registration", "The tax rate"],
        ans: 0,
        exp: "The first 2 digits represent the unique Indian state code assigned under GST law (e.g., 33 = TN, 29 = KA)."
      },
      {
        q: "Where in Tally Prime do you define the HSN Code and Integrated GST rate for physical products?",
        opts: ["In the Stock Item or Stock Group Creation / Alteration screen", "In the Balance Sheet", "In the Bank Ledger", "In the Company Logo settings"],
        ans: 0,
        exp: "HSN codes and GST rates are specified in the Stock Item or Stock Group master under GST Details."
      },
      {
        q: "What happens during voucher entry if a supplier ledger has an incorrect state name selected (e.g., Maharashtra selected instead of Tamil Nadu)?",
        opts: ["Tally treats the transaction as Interstate and attempts to calculate IGST instead of CGST/SGST", "Tally deletes the ledger", "Tally refuses to save the voucher", "The invoice prints in blank"],
        ans: 0,
        exp: "Tally determines local vs interstate tax based on the State selected in the Party ledger master."
      }
    ],
    reflection: [
      "I can enable and configure GST features in Tally Prime (F11).",
      "I can create statutory CGST, SGST, and IGST ledgers under Duties & Taxes.",
      "I understand the 15-digit GSTIN structure and party registration types.",
      "I can configure HSN codes and GST rates inside Stock Item masters."
    ]
  },
  day23: {
    title: "Day 23 — GST Purchase & Sales: Local vs Interstate Invoicing & Tax Computation",
    objectives: [
      "Record Local Intra-State Purchases (F9) with automatic Input CGST + SGST computation.",
      "Record Interstate Purchases (F9) with automatic Input IGST computation.",
      "Record Local Intra-State Sales Invoices (F8) with Output CGST + SGST billing.",
      "Record Interstate Sales Invoices (F8) with Output IGST billing.",
      "Use the GST Tax Analysis Tool (Alt + A / Alt + F10) to audit line-item tax breakdowns.",
      "Use AI to analyze transaction details and classify local vs interstate tax requirements."
    ],
    explanation: `Executing GST purchases and sales in Tally Prime is fully automated when masters are configured correctly. By selecting the party, items, and tax ledgers, Tally dynamically matches the Place of Supply against the Company Registration State to compute exact CGST/SGST or IGST taxes, generating GST-compliant tax invoices with HSN summaries.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Local Intra-State Invoicing (CGST + SGST)',
        content: '• Applicable When: Supplier and Buyer are located in the same State (Place of Supply = Company State).\n• Purchase Entry (F9 - Item Invoice):\n  1. Select Supplier (e.g. "Alpha Tech - Chennai").\n  2. Select Stock Item (e.g. 10 Laptops @ ₹40,000 = ₹4,00,000).\n  3. Below the item line, select Ledger 1: "CGST" -> Tally auto-calculates ₹36,000 (9%).\n  4. Select Ledger 2: "SGST" -> Tally auto-calculates ₹36,000 (9%).\n  5. Total Invoice Amount: ₹4,72,000.\n• Sales Entry (F8): Follows identical steps using customer ledger and automatically bills CGST + SGST.',
        icon: 'ShoppingCart',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Interstate Invoicing (IGST)',
        content: '• Applicable When: Supplier and Buyer are located in different States (Place of Supply != Company State).\n• Interstate Sales Entry (F8 - Item Invoice):\n  1. Select Customer (e.g. "Karnataka Infotech - Bengaluru" -> State: Karnataka).\n  2. Select Stock Item (e.g. 5 Laptops @ ₹50,000 = ₹2,50,000).\n  3. Below item line, select "IGST" ledger -> Tally auto-calculates ₹45,000 (18%).\n  4. Total Invoice Amount: ₹2,95,000.\n• Troubleshooting: If you select CGST/SGST on an interstate party, Tally leaves the amount blank (₹0.00) because it detects a state boundary mismatch!',
        icon: 'Globe',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. The Tax Analysis Tool (Alt + A / Alt + F10)',
        leftTitle: 'Opening Tax Analysis in Voucher',
        leftDesc: '• While creating an F8 or F9 voucher, press Alt + A (or click "More Details" / "Tax Analysis").\n• Press Alt + F1 / Alt + F5 for detailed item-wise breakdown.\n• Displays exact Taxable Value, Central Tax rate, State Tax rate, and Integrated Tax rate per line item.\n• Invaluable for mixed-rate invoices (e.g. 5% item + 18% item + 28% item in a single bill).',
        rightTitle: 'Printable GST Tax Invoice & HSN Summary',
        rightDesc: '• Press Ctrl + P -> Preview to inspect the printed Tax Invoice.\n• Mandatorily includes:\n  1. Title: "TAX INVOICE"\n  2. Seller & Buyer GSTIN, State & State Code.\n  3. Invoice Number & Date.\n  4. HSN/SAC Column alongside quantities.\n  5. Tax summary table showing HSN-wise CGST, SGST, IGST totals.'
      },
      {
        type: 'tip',
        title: '4. Common GST Calculation Traps in Invoicing',
        content: '• Blank Tax Amount: If CGST/SGST shows ₹0.00, check if Party State matches Company State, or if HSN GST rate was left blank in the stock item master.\n• Rounding Off: Use a "Round Off" ledger (grouped under Indirect Expenses with Type: Invoice Rounding) to round bill totals to the nearest Rupee automatically.',
        icon: 'AlertCircle',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.03)'
      }
    ],
    demonstration: `Executing Local and Interstate GST Invoices in Tally Prime:
1. Intra-State Purchase (F9):
   - Supplier: 'Sunlight Electronics (Chennai)' (State: Tamil Nadu)
   - Purchase Ledger: 'GST Purchases'
   - Item: 'Dell 24" IPS Monitor' -> Qty: 20 Nos @ ₹10,000 = ₹2,00,000
   - Tax: Select 'CGST' (auto ₹18,000) and 'SGST' (auto ₹18,000) -> Total Bill: ₹2,36,000.

2. Inter-State Purchase (F9):
   - Supplier: 'Logitech India Pvt Ltd' (State: Maharashtra)
   - Item: 'Wireless Keyboard Combo' -> Qty: 50 Nos @ ₹1,200 = ₹60,000
   - Tax: Select 'IGST' (auto ₹10,800 @ 18%) -> Total Bill: ₹70,800.

3. Intra-State Sales (F8):
   - Customer: 'City Digital Solutions (Madurai)' (State: Tamil Nadu)
   - Item: 5 Monitors @ ₹13,500 = ₹67,500
   - Tax: Select 'CGST' (auto ₹6,075) and 'SGST' (auto ₹6,075) -> Total: ₹79,650.

4. Inter-State Sales (F8):
   - Customer: 'Kerala IT Hub (Kochi)' (State: Kerala)
   - Item: 10 Monitors @ ₹13,500 = ₹1,35,000
   - Tax: Select 'IGST' (auto ₹24,300 @ 18%) -> Total: ₹1,59,300.
5. Press Alt+A in voucher to view the comprehensive Tax Analysis report.`,
    realWorldExample: `Murugan Electronics in Salem, Tamil Nadu sells computer systems. In a single morning, they raise a local B2B invoice to a Salem engineering college (charging CGST ₹18,000 + SGST ₹18,000) and an interstate invoice to a software development company in Bengaluru, Karnataka (charging IGST ₹36,000). Tally calculates the taxes instantly and prints standardized GST tax invoices with HSN 8471 summaries.`,
    aiActivity: `AI Task: Determine whether a transaction is local/interstate based on the given details.

Copy and paste this prompt into your AI Assistant:
---
"Act as a senior GST Taxation Auditor and Tally Specialist.

Here is a raw list of 6 commercial transactions conducted by 'Southern Tech Distributors' (Registered in Tamil Nadu, State Code 33):

1. Purchased 100 units of Computer RAM from 'Kingston Technologies' located in Chennai (TN) for ₹2,00,000 (HSN: 8473, GST: 18%).
2. Purchased 50 units of Graphics Cards from 'NVIDIA Distribution India' located in Mumbai (Maharashtra, State Code 27) for ₹15,00,000 (HSN: 8471, GST: 18%).
3. Sold 20 units of RAM to 'Kovai Tech Labs' in Coimbatore (TN) for ₹60,000.
4. Sold 10 Graphics Cards to 'Hyderabad Gaming Arena' in Hyderabad (Telangana, State Code 36) for ₹4,20,000.
5. Billed ₹50,000 Annual Maintenance Support Services (SAC: 9983, GST: 18%) to a client in Tiruchirappalli (TN).
6. Sold 5 Graphics Cards to a walk-in retail consumer from Bangalore who requested delivery at the Chennai retail showroom counter.

Please provide:
1. Place of Supply (POS) identification for each transaction.
2. Classification: Local Intra-State vs Interstate Supply.
3. The exact Tax Ledgers to select in Tally Prime (Input/Output CGST + SGST vs IGST).
4. Calculated Tax Amounts and Total Invoice Value for each entry.
5. Explanation of why Transaction 6 is treated based on counter delivery rules under GST Section 10."
---`,
    handsOnTask: "Open Tally Prime -> Record 1 Local Purchase (F9) with CGST+SGST, 1 Interstate Purchase (F9) with IGST, 1 Local Sales (F8) with CGST+SGST, and 1 Interstate Sales (F8) with IGST. Open Tax Analysis (Alt+A) on each invoice to verify line-item tax calculation.",
    assignment: `Assignment 23: Complete Local & Interstate GST Transaction Recording
1. Open Company 'National Electronics & Gadgets' in Tally Prime.
2. Record 2 Intra-State Purchases (F9) from local Chennai vendors (CGST + SGST).
3. Record 2 Inter-State Purchases (F9) from Maharashtra and Karnataka vendors (IGST).
4. Record 3 Intra-State Sales Invoices (F8) to local registered customers and walk-in consumers.
5. Record 2 Inter-State Sales Invoices (F8) to registered debtors in Andhra Pradesh and Kerala.
6. Print/Export 1 Local Tax Invoice and 1 Interstate Tax Invoice showing the HSN Summary table.
7. Submit the invoice copies and the Tax Analysis (Alt+A) verification screenshots.`,
    quiz: [
      {
        q: "In an Intra-State sales invoice within Tamil Nadu, what happens if the billing clerk mistakenly selects the 'IGST' ledger instead of CGST/SGST?",
        opts: ["Tally detects the state match and leaves the IGST amount as ₹0.00 (blank) to prevent incorrect tax calculation", "Tally charges double tax", "Tally crashes the software", "Tally changes the company state"],
        ans: 0,
        exp: "Tally Prime contains built-in statutory validation: Selecting IGST for a local party results in ₹0.00 tax."
      },
      {
        q: "Which shortcut key opens the 'Tax Analysis' sub-screen during Sales or Purchase voucher entry in Tally Prime?",
        opts: ["Alt + A (or Alt + F10 depending on version)", "Ctrl + P", "Alt + F2", "Ctrl + Alt + V"],
        ans: 0,
        exp: "Alt + A (Tax Analysis) displays the item-wise tax breakdown, taxable values, and applicable tax percentages."
      },
      {
        q: "Which essential statutory element must be printed on every B2B GST Tax Invoice by law?",
        opts: ["HSN/SAC code summary, Seller & Buyer GSTIN, and separate CGST/SGST/IGST tax breakdowns", "Employee birthday", "Company bank login password", "Stock godown map"],
        ans: 0,
        exp: "GST law strictly mandates HSN summaries, valid GSTINs of both parties, invoice serial numbers, and tax itemization."
      },
      {
        q: "When a company in Delhi sells goods to a customer in Gurugram (Haryana), what type of tax is charged on the invoice?",
        opts: ["IGST (Integrated GST)", "CGST and UTGST", "SGST only", "VAT"],
        ans: 0,
        exp: "Supplies between two different states/UTs (Delhi to Haryana) represent inter-state trade and attract IGST."
      },
      {
        q: "How does Tally Prime handle an invoice containing two items with different GST rates (e.g., Item A at 5% and Item B at 18%)?",
        opts: ["It automatically computes 5% on Item A and 18% on Item B, aggregating the correct totals into the common CGST and SGST ledgers", "It averages the rate to 11.5%", "It rejects the invoice", "It applies 28% to both"],
        ans: 0,
        exp: "Tally calculates multi-rate invoices accurately by applying the individual GST rate assigned to each stock item."
      }
    ],
    reflection: [
      "I can record Local Purchases and Sales with automatic CGST and SGST calculations.",
      "I can record Interstate Purchases and Sales with automatic IGST calculations.",
      "I know how to use Tax Analysis (Alt+A) to verify line-item tax breakdowns.",
      "I can resolve ₹0.00 tax calculation errors in Tally invoices."
    ]
  },
  day24: {
    title: "Day 24 — GST Reports: GSTR-1, GSTR-3B, ITC Set-off & Tax Payment",
    objectives: [
      "Navigate and interpret core GST statutory reports in Tally Prime (GSTR-1, GSTR-3B, GSTR-2B reconciliation).",
      "Identify and resolve 'Uncertain Transactions (Corrections Needed)' to ensure clean return filing.",
      "Calculate Net GST Liability by offsetting Output GST against Eligible Input Tax Credit (ITC).",
      "Record GST Adjustment entries in Journal Voucher (F7) for tax set-offs.",
      "Record statutory GST Tax Payments (F5) to the government with electronic bank challans.",
      "Use AI to translate complex GST reports into simple, actionable summaries for business owners."
    ],
    explanation: `Generating statutory reports and settling monthly tax obligations is the culmination of GST accounting. Tally Prime's statutory engine compiles GSTR-1 (Outward Supplies) and GSTR-3B (Summary Tax Return) in real-time, highlights transaction errors for instant resolution, and assists in recording ITC set-offs and statutory tax payment challans.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Navigating GSTR-1 & GSTR-3B Reports',
        content: '• Pathway: GOT -> Display More Reports -> GST Reports:\n  1. GSTR-1 (Return for Outward Supplies / Sales):\n     → Section 4: B2B Invoices (Sales to registered dealers with GSTIN).\n     → Section 5: B2CL (Large Invoices to unregistered buyers > ₹2.5 Lakhs interstate).\n     → Section 7: B2CS (Small Invoices to retail consumers).\n     → Section 9: Credit/Debit Notes (Sales returns and rate adjustments).\n     → Section 12: HSN Summary of Outward Supplies.\n  2. GSTR-3B (Monthly Summary Return):\n     → Table 3.1: Total Taxable Sales & Output Tax Liability.\n     → Table 4: Eligible Input Tax Credit (ITC) available from purchases.\n     → Table 6.1: Payment of Tax (Net cash payable after ITC adjustment).',
        icon: 'BarChart3',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Resolving "Uncertain Transactions (Corrections Needed)"',
        content: '• In GSTR-1 and GSTR-3B headers, Tally displays: "Uncertain Transactions (Corrections needed)".\n• Common Causes of Mismatches:\n  1. Invalid GSTIN format or mismatched state code.\n  2. Missing HSN/SAC code on billed items.\n  3. Party State not specified in ledger master.\n  4. Tax rate not configured on item or manual voucher modification.\n• How to Fix: Drill down into Uncertain Transactions -> Press Enter -> Correct the highlighted field directly in the correction screen -> Transaction moves to "Included in Return" instantly!',
        icon: 'AlertTriangle',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. ITC Set-off Rules & Adjustment Entry (F7)',
        leftTitle: 'GST Set-off Hierarchy Rules',
        leftDesc: '1. IGST Credit is utilized first against IGST liability, then CGST, then SGST in any order.\n2. CGST Credit is utilized against CGST liability, then IGST (Never against SGST!).\n3. SGST Credit is utilized against SGST liability, then IGST (Never against CGST!).\n4. Cross-utilization between CGST and SGST is strictly prohibited by law.',
        rightTitle: 'Recording Set-off in Journal (F7)',
        rightDesc: 'Pathway: GOT -> Vouchers -> Journal (F7) -> Press Alt + J (Stat Adjustment)\n• Type of Duty: GST | Nature of Adjustment: "Set-off of ITC"\n• Debit: Output CGST A/c (clearing sales tax collected)\n• Debit: Output SGST A/c\n• Credit: Input CGST A/c (utilizing purchase tax credit)\n• Credit: Input SGST A/c.'
      },
      {
        type: 'tip',
        title: '4. Statutory GST Payment Voucher (F5)',
        content: '• Pathway: GOT -> Vouchers -> Payment (F5) -> Press Alt + S (Auto Fill / Stat Payment).\n• Settings: Tax Type: GST | Period: 01-Apr-2025 to 30-Apr-2025 | Payment Type: Regular.\n• Debit: Output CGST / SGST / IGST (balance net payable) -> Credit: Bank Current Account.\n• Tally records the payment and updates GSTR-3B Table 6.1 with zero remaining liability!',
        icon: 'CheckCircle2',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      }
    ],
    demonstration: `Monthly GST Settlement & Return Audit Workflow:
1. Audit GSTR-1: GOT -> Display More Reports -> GST Reports -> GSTR-1.
   - Verify Total Voucher Count = 15 | Included in Return = 15 | Uncertain Transactions = 0.
   - Inspect B2B Section (₹8,50,000) and B2CS Section (₹1,20,000).

2. Audit GSTR-3B: GOT -> Display More Reports -> GST Reports -> GSTR-3B.
   - Table 3.1 Total Output Tax: ₹1,50,000 (CGST ₹75,000 + SGST ₹75,000).
   - Table 4 Eligible ITC: ₹90,000 (CGST ₹45,000 + SGST ₹45,000).
   - Net Tax Payable in Cash: ₹60,000 (CGST ₹30,000 + SGST ₹30,000).

3. Record Set-off Entry in Journal (F7):
   - Dr Output CGST A/c ₹45,000
   - Dr Output SGST A/c ₹45,000
   - Cr Input CGST A/c ₹45,000
   - Cr Input SGST A/c ₹45,000.

4. Record Tax Payment to Govt in Payment (F5):
   - Press Alt + S (Stat Payment) -> Type: GST -> Period: April.
   - Dr Output CGST A/c ₹30,000
   - Dr Output SGST A/c ₹30,000
   - Cr HDFC Bank Current A/c ₹60,000.
5. Re-check GSTR-3B: Net Cash Payable balance is now ₹0.00!`,
    realWorldExample: `Supreme Traders reviews their monthly GST reports on the 15th of the month. GSTR-3B highlights ₹1,20,000 in Output Tax and ₹80,000 in Input Tax Credit. The accountant uses Tally's Stat Payment helper to generate an electronic bank challan for ₹40,000. The payment clears through GST PMT-06 on the portal, achieving 100% compliance with zero late fees.`,
    aiActivity: `AI Activity: Explain a sample GST report in simple language.

Copy and paste this prompt into your AI Assistant:
---
"Act as an expert Chief Financial Officer (CFO) and GST Tax Consultant.

Here is a monthly GSTR-3B Summary Report generated from Tally Prime for a retail distribution firm 'Kiran Home Electronics':

1. Outward Taxable Supplies (Sales - Table 3.1):
   - Total Taxable Value: ₹24,00,000
   - Integrated Tax (IGST) Collected: ₹1,80,000
   - Central Tax (CGST) Collected: ₹1,26,000
   - State Tax (SGST) Collected: ₹1,26,000
   - Total Output Tax Collected from Customers: ₹4,32,000

2. Eligible Input Tax Credit (Purchases - Table 4):
   - Integrated Tax (IGST) Credit Available: ₹1,20,000
   - Central Tax (CGST) Credit Available: ₹85,000
   - State Tax (SGST) Credit Available: ₹85,000
   - Total ITC Available: ₹2,90,000

3. Other Details:
   - 2 transactions flagged in Tally Prime under 'Uncertain Transactions' due to missing HSN codes.

Please deliver:
1. Plain English Translation: Explain what these numbers mean to a non-accountant business owner.
2. Step-by-step ITC Set-off Calculation according to Indian GST law hierarchy.
3. Exact Net Cash Amount (₹) the business owner must pay via Net Banking challan.
4. Action plan to resolve the 2 'Uncertain Transactions' in Tally Prime before filing GSTR-3B.
5. The financial consequence of missing the 20th monthly filing deadline."
---`,
    handsOnTask: "Open Tally Prime -> Navigate to GSTR-1 and GSTR-3B reports. Inspect the B2B, B2CS, and Eligible ITC tables. Record an ITC set-off Journal voucher (F7) and a statutory GST payment voucher (F5) using Alt+S to clear remaining tax liability.",
    assignment: `Assignment 24: Comprehensive GST Return Audit, Reconciliation & Payment Lab
1. Open Company 'National Electronics & Gadgets' with recorded transactions.
2. Open GSTR-1:
   • Verify that all sales invoices appear under B2B and B2CS tables.
   • Ensure 'Uncertain Transactions' is 0.
   • Export GSTR-1 Summary.
3. Open GSTR-3B:
   • Note Total Outward Taxable Supplies and Total Eligible ITC.
   • Calculate Net Tax Payable for CGST, SGST, and IGST.
4. Record Journal Voucher (F7) for ITC Set-off adjustment.
5. Record Payment Voucher (F5 with Alt+S Stat Payment) paying the net tax balance by Bank cheque/online.
6. Submit the final GSTR-3B summary and the completed Payment Voucher screenshot.`,
    quiz: [
      {
        q: "Which GST report in Tally Prime summarizes all outward supplies (sales) categorized into B2B, B2C Large, B2C Small, and HSN Summary?",
        opts: ["GSTR-1", "GSTR-2A", "GSTR-3B", "GSTR-9"],
        ans: 0,
        exp: "GSTR-1 is the monthly/quarterly return for reporting all details of outward supplies (sales) of goods and services."
      },
      {
        q: "What does the 'Uncertain Transactions (Corrections needed)' count indicate in Tally Prime's GST reports?",
        opts: ["Vouchers with incomplete or invalid statutory data (e.g. missing HSN, wrong GSTIN, missing state) that must be corrected before filing", "Vouchers that were paid in cash", "Invoices printed on green paper", "Transactions above 10 Lakhs"],
        ans: 0,
        exp: "Uncertain Transactions identifies errors and statutory discrepancies that prevent vouchers from being included in tax returns."
      },
      {
        q: "According to Indian GST law, can Input Tax Credit of CGST be utilized to offset Output SGST liability?",
        opts: ["No, cross-utilization between CGST and SGST is strictly prohibited", "Yes, anytime without restriction", "Only on Sundays", "Only for export businesses"],
        ans: 0,
        exp: "Under GST law, CGST credit cannot be used to pay SGST, and SGST credit cannot be used to pay CGST."
      },
      {
        q: "Which feature helper in Tally Prime's Payment Voucher (F5) auto-populates statutory payment parameters for GST challan creation?",
        opts: ["Stat Payment (Alt + S / Autofill)", "Alt + F1", "Ctrl + Alt + R", "F12 Print"],
        ans: 0,
        exp: "Stat Payment (Alt + S) auto-fills statutory tax parameters, period dates, and payment types for tax settlement vouchers."
      },
      {
        q: "What is Table 4 in the GSTR-3B return primarily dedicated to?",
        opts: ["Eligible Input Tax Credit (ITC) available on inward purchases", "Employee payroll expenses", "Bank loan interest", "Director dividends"],
        ans: 0,
        exp: "Table 4 of GSTR-3B calculates total Eligible Input Tax Credit available from domestic and import purchases."
      }
    ],
    reflection: [
      "I can navigate and interpret GSTR-1 and GSTR-3B reports in Tally Prime.",
      "I know how to resolve Uncertain Transactions and GST mismatches.",
      "I understand the legal ITC set-off hierarchy rules.",
      "I can record statutory GST tax payments using Stat Payment (Alt+S)."
    ]
  },
  day25: {
    title: "Day 25 — 🟦 Mini Project 7: GST Trading Company Simulation",
    objectives: [
      "Synthesize all GST concepts into an end-to-end commercial trading enterprise simulation ('Bharat ElectroWorld Pvt Ltd').",
      "Configure company GST registration, statutory tax ledgers, and multi-state customer/supplier masters.",
      "Configure inventory items with multi-tier GST rates (5%, 18%, 28%) and valid HSN codes.",
      "Execute 10 mixed local and interstate purchase and sales transactions.",
      "Audit GSTR-1 and GSTR-3B reports, achieve zero error mismatches, execute ITC set-off, and pay net tax liability.",
      "Solve the AI Challenge: Classify and verify 10 complex mixed GST transactions."
    ],
    explanation: `Mini Project 7 is a comprehensive capstone simulation of 'Bharat ElectroWorld Pvt Ltd', a premier electronics and consumer durables trading company. Students set up the full statutory framework, manage local and interstate supply chains across multi-tier GST slabs (5%, 18%, 28%), audit GSTR-1/GSTR-3B returns, and execute statutory tax settlements.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Capstone Profile: Bharat ElectroWorld Pvt Ltd',
        content: '• Business Name: Bharat ElectroWorld Pvt Ltd (Wholesale & Retail Consumer Tech)\n• State of Registration: Tamil Nadu (State Code: 33) | GSTIN: 33AABCB9999K1Z4\n• Supply Network:\n  → Local Suppliers: Chennai & Coimbatore (Tamil Nadu - CGST + SGST).\n  → Interstate Suppliers: Mumbai (Maharashtra) & Bengaluru (Karnataka) - IGST.\n  → Local Buyers: Retail consumers and registered dealers in Madurai & Salem.\n  → Interstate Buyers: Registered commercial distributors in Kerala & Andhra Pradesh.',
        icon: 'Store',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Product Catalogue & Multi-Rate GST Matrix',
        content: '• Product 1: Optical Mouse & USB Cables -> HSN: 8473 | GST Rate: 18%\n• Product 2: 4K Smart Android TV 55" -> HSN: 8528 | GST Rate: 18%\n• Product 3: Commercial Inverter Split AC 2 Ton -> HSN: 8415 | GST Rate: 28%\n• Product 4: Solar Emergency Rechargeable Lantern -> HSN: 8513 | GST Rate: 5%\n• Tax Ledgers Required: CGST, SGST, IGST (under Duties & Taxes -> GST with 0% calculation rate).',
        icon: 'Layers',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Simulation Workflow & Deliverables',
        leftTitle: 'Part A: Transaction Execution',
        leftDesc: '1. Record 2 Local Purchases (F9) with CGST+SGST.\n2. Record 2 Interstate Purchases (F9) with IGST.\n3. Record 3 Local Sales (F8) to B2B dealers and retail cash consumers.\n4. Record 2 Interstate Sales (F8) to out-of-state dealers with IGST.\n5. Record 1 Purchase Return (Debit Note Alt+F5) with tax reversal.',
        rightTitle: 'Part B: Return Filing & Settlement',
        rightDesc: '1. Audit GSTR-1: Ensure 0 Uncertain Transactions and verify B2B vs B2CS tables.\n2. Audit GSTR-3B: Calculate Total Output Tax vs Eligible ITC.\n3. Pass Journal Entry (F7): Offset Output Tax against Input Tax Credit.\n4. Pass Payment Entry (F5 - Alt+S): Pay Net GST Liability via Bank Challan.'
      },
      {
        type: 'challenge',
        title: '4. AI Executive Challenge Objectives',
        content: '• Challenge: Classify, compute, and verify a mixed dataset of 10 complex GST transactions.\n• Tasks: Identify Place of Supply, applicable GST components, tax amounts, ITC eligibility, and error detection on simulated supplier bills.',
        icon: 'HelpCircle',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.03)'
      }
    ],
    demonstration: `Mini Project 7 Full End-to-End Simulation Walkthrough:
1. Create Company 'Bharat ElectroWorld Pvt Ltd' -> F11: State 'Tamil Nadu', GSTIN '33AABCB9999K1Z4'.
2. Create Duties & Taxes Ledgers: 'CGST', 'SGST', 'IGST'.
3. Create Stock Items with HSN codes & GST rates (Lantern 5%, Mouse 18%, TV 18%, AC 28%).
4. Record Purchases (F9):
   • Buy 20 Smart TVs @ ₹35,000 from 'Sony India Chennai' (CGST ₹63,000 + SGST ₹63,000).
   • Buy 10 Split ACs @ ₹30,000 from 'Voltas Mumbai' (IGST ₹84,000 @ 28%).
5. Record Sales (F8):
   • Sell 5 Smart TVs @ ₹45,000 to 'Madurai Digital World' (CGST ₹20,250 + SGST ₹20,250).
   • Sell 4 Split ACs @ ₹42,000 to 'Cochin Resorts Kerala' (IGST ₹47,040 @ 28%).
6. Open GSTR-1 & GSTR-3B: Zero out all Uncertain Transactions.
7. Record Journal (F7) ITC set-off and Payment (F5) net tax settlement.
8. Submit completed financial and tax audit reports.`,
    realWorldExample: `Bharat ElectroWorld scaled from a single electronics outlet to a regional supply chain network handling ₹1.5 Crore in quarterly volume. By mastering multi-rate GST invoicing, automated IGST routing, and monthly GSTR-3B reconciliation in Tally Prime, the company achieved zero tax penalties, 100% ITC claims, and seamless annual GST audits.`,
    aiActivity: `AI Challenge: Classify and verify 10 mixed GST commercial transactions.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Principal GST Auditor and Senior Tax Consultant.

You are auditing the completed Mini Project 7 simulation for 'Bharat ElectroWorld Pvt Ltd' (Registered in Tamil Nadu - State Code 33).

Here is a dataset of 10 mixed commercial transactions:
1. Purchase of 20 Smart TVs (HSN 8528, 18%) from Sony India (Chennai, TN) for ₹7,00,000.
2. Purchase of 10 Split ACs (HSN 8415, 28%) from Voltas Ltd (Mumbai, Maharashtra) for ₹3,00,000.
3. Purchase of 100 Solar Lanterns (HSN 8513, 5%) from Surya Solar (Salem, TN) for ₹80,000.
4. Sale of 8 Smart TVs to 'Madurai Electronics' (Madurai, TN) for ₹3,60,000.
5. Sale of 4 Split ACs to 'Cochin Hospitality Ltd' (Kochi, Kerala) for ₹1,68,000.
6. Sale of 20 Solar Lanterns to Walk-in Cash Consumer in Chennai for ₹24,000.
7. Purchase of 50 Optical Mice (HSN 8473, 18%) from Logitech (Bengaluru, Karnataka) for ₹25,000.
8. Returned 2 defective Smart TVs back to Sony India Chennai (Debit Note) for ₹70,000.
9. Billed Annual Software License & AMC Services (SAC 9983, 18%) to an IT client in Chennai for ₹50,000.
10. Sale of 2 Split ACs to an unregistered luxury villa owner in Bengaluru (Karnataka) for ₹84,000.

Perform the Comprehensive GST Audit:
1. Classification Table: Place of Supply, Supply Type (Intra vs Inter), Tax Components (CGST+SGST vs IGST), and exact calculated Tax Amounts for each of the 10 entries.
2. Total Output Tax Liability Summary (CGST, SGST, IGST).
3. Total Eligible Input Tax Credit (ITC) Summary (after adjusting purchase return).
4. Step-by-step ITC Set-off Calculation using legal GST hierarchy.
5. Net Cash Tax Payable to the Government with bank payment challan instructions.
6. List 3 critical GST compliance risks the business owner should watch out for."
---`,
    handsOnTask: "Build company 'Bharat ElectroWorld Pvt Ltd', configure GST masters and multi-rate items, record 10 mixed local and interstate transactions, audit GSTR-1 and GSTR-3B reports with 0 mismatches, execute ITC set-off in F7, and record the statutory tax payment in F5.",
    assignment: `Mini Project 7: GST Trading Company Comprehensive Deliverables

Part 1: Statutory Master Configuration
1. F11 Company Features screenshot showing GST enabled for Tamil Nadu (GSTIN: 33AABCB9999K1Z4).
2. Master list of statutory tax ledgers: CGST, SGST, IGST.
3. Master list of 4 Stock Items with HSN codes and respective tax rates (5%, 18%, 28%).
4. Master list of 4 local and interstate Party Ledgers with valid GSTINs.

Part 2: Transaction Journal & Invoices
1. 2 Intra-State Purchase Vouchers (F9) and 2 Inter-State Purchase Vouchers (F9).
2. 3 Intra-State Sales Invoices (F8) and 2 Inter-State Sales Invoices (F8).
3. 1 Purchase Return (Debit Note Alt+F5) with GST reversal.
4. Printed/Exported copy of 1 Local Tax Invoice and 1 Interstate Tax Invoice with HSN summaries.

Part 3: Return Filing & Statutory Settlement
1. GSTR-1 Report showing B2B and B2CS breakdown with zero Uncertain Transactions.
2. GSTR-3B Report showing Outward Tax Liability and Eligible ITC.
3. Journal Voucher (F7) showing Input Tax Credit set-off against Output Liability.
4. Payment Voucher (F5 with Stat Payment) showing net tax payment to Government via Bank.
5. Completed AI Challenge Audit Report verifying all 10 transactions.`,
    quiz: [
      {
        q: "In Mini Project 7, what is the total GST rate applied when selling a Commercial Split AC (HSN 8415) to a customer in Kerala?",
        opts: ["28% IGST", "14% CGST + 14% SGST", "18% IGST", "5% UTGST"],
        ans: 0,
        exp: "Interstate supply of an air conditioner (28% tax slab) attracts 28% IGST."
      },
      {
        q: "What happens to the Input Tax Credit when a business returns defective goods to a supplier via Debit Note (Alt + F5)?",
        opts: ["Input Tax Credit is reduced/reversed proportionally by the tax amount on the returned goods", "ITC increases", "ITC remains unchanged", "Supplier pays cash penalty"],
        ans: 0,
        exp: "A purchase return (Debit Note) reverses the corresponding Input Tax Credit previously claimed on those goods."
      },
      {
        q: "In the Bharat ElectroWorld simulation, why is GSTR-3B Table 6.1 verified immediately after recording the F5 GST Payment voucher?",
        opts: ["To confirm that the net tax liability has been cleared to ₹0.00 and properly accounted for against bank funds", "To close the bank account", "To delete the company data", "To increase sales revenue"],
        ans: 0,
        exp: "Table 6.1 tracks tax payment confirmation, verifying that cash challan payments and ITC set-offs balance the period liability."
      },
      {
        q: "Which party registration type must be assigned in Tally Prime to walk-in end consumers who do not hold a GSTIN?",
        opts: ["Consumer", "Regular", "Composition", "Special Economic Zone (SEZ)"],
        ans: 0,
        exp: "End retail buyers without GST registration are classified as 'Consumer' (reported under B2CS in GSTR-1)."
      },
      {
        q: "What is the primary advantage of achieving zero 'Uncertain Transactions' in Tally Prime before filing GSTR-1 and GSTR-3B?",
        opts: ["It guarantees 100% data integrity, eliminates tax audit notices, and ensures seamless JSON/Excel export for direct portal upload", "It speeds up computer boot time", "It offers free advertising", "It removes inventory limits"],
        ans: 0,
        exp: "Zero uncertain transactions ensures error-free return filing, matching 100% with GST portal validation schemas."
      }
    ],
    reflection: [
      "I can set up and configure a complete GST-compliant trading company in Tally Prime.",
      "I can manage multi-rate inventory items (5%, 18%, 28%) with accurate HSN codes.",
      "I can execute local and interstate purchases, sales, and debit note returns.",
      "I can audit GSTR-1, GSTR-3B, execute ITC set-offs, and perform statutory tax payments.",
      "I completed Mini Project 7: GST Trading Company."
    ]
  },
  day26: {
    title: "Day 26 — TDS (Tax Deducted at Source): Nature of Payment, Entries, Challans & 26Q",
    objectives: [
      "Understand the statutory framework of Tax Deducted at Source (TDS) under the Indian Income Tax Act 1961.",
      "Master key TDS sections and threshold limits (Sec 194C, 194J, 194I, 194H).",
      "Enable TDS in Tally Prime (F11) with TAN, Deductor Type, and Nature of Payment masters.",
      "Record commercial expenses with automated TDS deductions in Journal (F7) and Purchase (F9).",
      "Generate Challan ITNS 281 for tax deposit and audit TDS Reports (Form 26Q & Form 16A).",
      "Use AI to analyze payment scenarios and determine exact TDS sections, rates, and deduction rules."
    ],
    explanation: `Tax Deducted at Source (TDS) is a direct tax mechanism introduced by the Government of India to collect income tax at the very source of income generation. Any registered person making specified payments (such as contractor fees, professional consultancy, commercial rent, or commission) must deduct a designated percentage of tax before paying the balance to the vendor, depositing the deducted tax directly with the Central Government.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is TDS & Core Commercial Sections',
        content: '• Principle: "Pay as you earn" — Tax is collected at the moment the expense is booked or paid, whichever is earlier.\n• Key Statutory TDS Sections:\n  1. Section 194C (Payments to Contractors & Transporters):\n     → Rate: 1% (for Individuals/HUF) | 2% (for Companies/Partnerships).\n     → Threshold: Single contract > ₹30,000 OR Aggregate in FY > ₹1,00,000.\n  2. Section 194J (Professional & Technical Fees):\n     → Rate: 10% (Professional fees, legal, medical, CA) | 2% (Technical services, BPO, software consultancy).\n     → Threshold: ₹30,000 per financial year.\n  3. Section 194I (Rent Payments):\n     → Rate: 10% (Land, Building, Furniture) | 2% (Plant & Machinery).\n     → Threshold: ₹2,40,000 per financial year.\n  4. Section 194H (Commission & Brokerage): Rate: 5% | Threshold: ₹15,000/yr.\n• Higher Rate without PAN (Section 206AA): Flat 20% deduction if the deductee fails to furnish a valid PAN!',
        icon: 'TrendingUp',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Enabling & Configuring TDS in Tally Prime',
        content: '• Step 1: Enable in F11 (Company Features):\n  → Under Statutory & Taxation, set "Enable Tax Deducted at Source (TDS)" = YES.\n  → Enter TAN Registration No. (e.g. CHEA12345B) & Tax Deduction and Collection Account No. (TAN).\n  → Deductor Type: Company / Individual | Deductor Branch: Chennai Main.\n• Step 2: Create TDS Nature of Payment (GOT -> Create -> TDS Nature of Payments):\n  → Name: "Fees for Professional or Technical Services"\n  → Section: 194J | Payment Code: 94J | Rate for Individual/HUF: 10% | Threshold Limit: ₹30,000.\n• Step 3: Create TDS Duty Ledger (GOT -> Create -> Ledger):\n  → Name: "TDS on Professional Fees" -> Under: Duties & Taxes -> Type: TDS -> Nature of Payment: Fees for Professional Services.',
        icon: 'Settings',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Booking Expense with Auto-TDS Deduction',
        leftTitle: 'Recording Expense in Journal (F7)',
        leftDesc: 'Example: Billed ₹1,00,000 Legal Consulting from "Advocate Rajesh & Associates" (Individual/HUF, PAN provided).\n1. Debit: Legal & Professional Fees A/c: ₹1,00,000\n2. Credit: Advocate Rajesh A/c: ₹90,000 (Net payable)\n3. Credit: TDS on Professional Fees A/c: ₹10,000 (10% under Sec 194J auto-calculated by Tally!).',
        rightTitle: 'Tax Payment to Government (F5)',
        rightDesc: 'Pathway: GOT -> Vouchers -> Payment (F5) -> Press Alt + S (Stat Payment)\n• Tax Type: TDS | Period: 01-Apr to 30-Apr | Section: 194J | Deductee Status: Non-Company.\n• Debit: TDS on Professional Fees ₹10,000 -> Credit: Bank Account.\n• Tally generates Challan ITNS 281 details for electronic BSR bank filing.'
      },
      {
        type: 'tip',
        title: '4. Statutory TDS Reports & Form 26Q',
        content: '• Form 26Q: GOT -> Display More Reports -> Statutory Reports -> TDS Reports -> Form 26Q.\n• Shows quarterly returns for all non-salary TDS deductions.\n• Form 16A: Quarterly TDS certificate issued to vendors confirming tax deposited in their PAN credit (Form 26AS/AIS).\n• Payment Due Date: 7th of the following month (e.g. April TDS must be paid by May 7th; March TDS by April 30th).',
        icon: 'FileText',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `Step-by-Step TDS Configuration & Voucher Execution in Tally Prime:
1. Enable TDS in F11: State 'Tamil Nadu', TAN 'CHEP01234C', Deductor: 'Company'.
2. Create TDS Nature of Payments:
   - 'Contract Work (194C)' -> Section 194C, Rate 1% (Ind) / 2% (Co), Threshold ₹1,00,000.
   - 'Professional Fees (194J)' -> Section 194J, Rate 10%, Threshold ₹30,000.
3. Create Duties & Taxes Ledgers:
   - 'TDS on Contractor' (Duties & Taxes -> TDS -> Contract Work 194C).
   - 'TDS on Professional Fees' (Duties & Taxes -> TDS -> Professional Fees 194J).
4. Create Vendor Master:
   - 'Apex Software Architects' -> Under 'Sundry Creditors' -> Is TDS Deductable: YES -> Deductee Type: 'Company - Resident' -> PAN: 'AAACA1234F'.
5. Record Journal Entry (F7):
   - Debit 'Software Development Expense' ₹2,00,000
   - Credit 'Apex Software Architects' (auto ₹1,96,000 net payable)
   - Credit 'TDS on Professional Fees' (auto ₹4,000 @ 2% for tech services).
6. Record Statutory Payment (F5 - Alt+S):
   - Pay ₹4,00,000 TDS liability via HDFC Bank Current A/c with Challan ITNS 281 details.`,
    realWorldExample: `Zenith Corporation hires an advertising agency for a ₹5,00,000 corporate video campaign. Because the agency is a corporate contractor under Section 194C (2% TDS), Tally automatically deducts ₹10,000 TDS, crediting the vendor for ₹4,90,000. On the 7th of next month, Zenith pays the ₹10,000 to the Income Tax Department via Challan 281 and issues Form 16A to the agency, ensuring zero penalty under Section 201.`,
    aiActivity: `AI Task: Identify the appropriate TDS treatment from given scenarios.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Senior Direct Taxation Consultant and Chartered Accountant.

I am managing accounting compliance for 'OmniCorp Solutions Pvt Ltd'. Please evaluate the following 6 commercial payment scenarios and determine the exact TDS treatment:

1. Monthly office rent of ₹35,000 paid to an individual building landlord (Total annual rent: ₹4,20,000).
2. Paid ₹25,000 audit fees to a Chartered Accountant firm for quarterly internal audit.
3. Paid ₹1,50,000 to a logistics company for interstate freight transportation of goods.
4. Paid ₹80,000 website design and server maintenance fees to an individual freelance developer who did NOT provide a PAN card.
5. Paid ₹12,000 commission to a sales agent for securing a client deal.
6. Paid ₹4,00,000 technical fees to a software engineering company (Resident corporate).

For each scenario, provide:
1. Applicable Section of the Income Tax Act (e.g. 194C, 194I, 194J, 194H, 206AA).
2. Threshold Limit and whether the transaction has crossed the threshold.
3. Applicable TDS Rate (%) and calculated TDS Rupee amount.
4. Net payment amount payable to the party.
5. Exact Tally Prime ledger configuration guidelines."
---`,
    handsOnTask: "Open Tally Prime -> Enable TDS in F11 -> Create TDS Nature of Payment for Section 194J (Professional Fees) and Section 194C (Contractors) -> Create corresponding TDS tax ledgers -> Book an expense voucher with automatic TDS deduction -> Record the statutory payment (F5 - Alt+S) and inspect Form 26Q.",
    assignment: `Assignment 26: Complete TDS Master Setup, Invoicing & Return Audit Lab
1. Create company 'Apex Digital Media Enterprises' in Tally Prime and enable TDS in F11.
2. Create 3 TDS Nature of Payments: (a) 194C (Contractors), (b) 194J (Professional Fees), (c) 194I (Rent).
3. Create 3 corresponding TDS duty ledgers under Duties & Taxes.
4. Create 3 party ledgers with valid PAN details:
   • Studio Landlord (Individual - Rent)
   • Video Production Agency (Company - Contractor)
   • Legal Advisor (Individual - Professional Fees).
5. Book 3 expense vouchers demonstrating automated TDS deductions across all 3 sections.
6. Record 1 Payment Voucher (F5 with Alt+S Stat Payment) depositing TDS with Challan 281 details.
7. Open Form 26Q report and verify that all deductions appear under 'Included in Return' with 0 errors.`,
    quiz: [
      {
        q: "What is the penalty tax rate under Section 206AA if a deductee fails to provide a valid PAN card during TDS deduction?",
        opts: ["Flat 20% (or the applicable rate, whichever is higher)", "Flat 5%", "Zero tax", "50%"],
        ans: 0,
        exp: "Section 206AA mandates a higher TDS deduction of flat 20% if the deductee does not furnish a valid PAN."
      },
      {
        q: "What is the standard annual threshold limit for TDS on Rent of Land and Building under Section 194I?",
        opts: ["₹2,40,000 per financial year", "₹30,000 per year", "₹1,00,000 per year", "₹50,000 per month"],
        ans: 0,
        exp: "Under Section 194I, TDS on commercial rent applies when total payments exceed ₹2,40,000 in a financial year."
      },
      {
        q: "Which official tax challan number is used for depositing non-salary TDS payments to the Central Government?",
        opts: ["Challan ITNS 281", "Challan 280", "Challan PMT-06", "Challan GSTR-3B"],
        ans: 0,
        exp: "Challan ITNS 281 is the statutory challan for depositing Tax Deducted at Source (TDS) and Tax Collected at Source (TCS)."
      },
      {
        q: "Which quarterly TDS return in Tally Prime contains all non-salary TDS deductions (contractors, rent, professional fees)?",
        opts: ["Form 26Q", "Form 24Q", "Form 27Q", "Form 16"],
        ans: 0,
        exp: "Form 26Q is the quarterly return for all domestic non-salary TDS deductions (Form 24Q is for salaries)."
      },
      {
        q: "When booking an expense in Tally Prime Journal (F7), how does Tally determine the exact TDS rate to deduct?",
        opts: ["From the 'TDS Nature of Payment' master linked to the expense and the Deductee Type in the party ledger", "From the company state", "From the cash ledger balance", "From the invoice serial number"],
        ans: 0,
        exp: "Tally dynamically cross-references the Nature of Payment settings with the party's Deductee Type (Individual vs Company)."
      }
    ],
    reflection: [
      "I understand the statutory purpose and mechanics of TDS under the Income Tax Act.",
      "I can configure TDS Nature of Payments, tax ledgers, and PAN details in Tally Prime.",
      "I can record expense vouchers with automated TDS calculations.",
      "I know how to deposit TDS using Challan ITNS 281 and audit Form 26Q reports."
    ]
  },
  day27: {
    title: "Day 27 — TCS (Tax Collected at Source): Applicability, Sales Invoicing & Compliance",
    objectives: [
      "Understand the statutory framework of Tax Collected at Source (TCS) under Section 206C of the Income Tax Act.",
      "Learn key TCS categories (Scrap sales, Minerals, Timber, and High-value sales Sec 206C(1H)).",
      "Enable TCS in Tally Prime (F11) with TAN and Collector registration parameters.",
      "Create TCS Nature of Goods, TCS Ledgers, and configure Buyer Party masters.",
      "Record Sales Invoices with automated GST and TCS calculations.",
      "Audit TCS reports (Form 27EQ & Form 27D) and solve the AI TCS classification challenge."
    ],
    explanation: `Tax Collected at Source (TCS) is an indirect collection mechanism where the seller collects tax from the buyer at the time of sale or debit of specified goods (such as scrap, minerals, liquor, or high-turnover trade exceeding ₹50 Lakhs). In Tally Prime, TCS integrates seamlessly with Sales Invoices, calculating tax on total invoice values and compiling Form 27EQ statutory returns.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is TCS & Key Specified Goods (Section 206C)',
        content: '• Definition: TCS is collected by the SELLER from the BUYER at the time of sale or receipt of consideration.\n• Key TCS Categories under Section 206C:\n  1. Sale of Scrap (Sec 206C(1)): Rate: 1% | No threshold limit.\n  2. Minerals (Coal, Lignite, Iron Ore): Rate: 1%.\n  3. Timber & Tendu Leaves: Rate: 2.5% to 5%.\n  4. Sale of Any Goods exceeding ₹50 Lakhs (Sec 206C(1H)):\n     → Applicable if Seller Turnover in preceding FY > ₹10 Crore.\n     → Rate: 0.1% with PAN (1% without PAN) on turnover exceeding ₹50 Lakhs in the FY.\n  5. Foreign Remittance under LRS / Overseas Tour Packages (Sec 206C(1G)): Rate: 5% to 20%.',
        icon: 'Percent',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Enabling & Configuring TCS in Tally Prime',
        content: '• Step 1: Enable in F11 (Company Features):\n  → Under Statutory & Taxation, set "Enable Tax Collected at Source (TCS)" = YES.\n  → Enter TAN Registration Number & TAN (e.g. CHEA99999K).\n  → Collector Type: Company / Individual | Collector Branch: Chennai.\n• Step 2: Create TCS Nature of Goods (GOT -> Create -> TCS Nature of Goods):\n  → Name: "Sale of Scrap" | Section: 206C | Rate for Individuals & Companies: 1%.\n• Step 3: Create TCS Duty Ledger (GOT -> Create -> Ledger):\n  → Name: "TCS on Scrap Sale" -> Under: Duties & Taxes -> Type: TCS -> Nature of Goods: Sale of Scrap.',
        icon: 'Settings',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Recording Sales Invoices with GST & TCS (F8)',
        leftTitle: 'Sales Invoice Structure with TCS',
        leftDesc: 'Example: Sold 10 Tons of Industrial Metal Scrap @ ₹50,000/Ton = ₹5,00,000 to "Metro Recycling Corp" (GST 18%, TCS 1%).\n1. Item Line: Metal Scrap -> ₹5,00,000\n2. Output CGST (9%): ₹45,000\n3. Output SGST (9%): ₹45,000\n4. Sub-total Taxable + GST: ₹5,90,000\n5. TCS on Scrap (1% on ₹5,90,000): ₹5,900\n6. Total Invoice Bill Amount: ₹5,95,900!',
        rightTitle: 'TCS Deposit & Form 27EQ Return',
        rightDesc: '• Payment (F5 - Alt+S Stat Payment): Deposit collected TCS using Challan ITNS 281 by 7th of next month.\n• Form 27EQ: Quarterly statutory return containing all TCS collections.\n• Form 27D: Certificate issued by seller to buyer confirming TCS credit.'
      },
      {
        type: 'tip',
        title: '4. TDS vs TCS: The Core Difference',
        content: '• TDS is deducted by the BUYER (Payer) from the Seller/Service Provider.\n• TCS is collected by the SELLER (Receiver) from the Buyer.\n• Both use TAN and are deposited via Challan ITNS 281, but report on different quarterly returns (TDS = Form 26Q, TCS = Form 27EQ).',
        icon: 'CheckSquare',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `Executing Sales Invoice with TCS in Tally Prime:
1. Press F11 -> Set 'Enable Tax Collected at Source (TCS)' = YES.
2. Create TCS Nature of Goods: Name 'Sale of Scrap' -> Section '206C' -> Rate '1%'.
3. Create Ledger 'TCS on Scrap' -> Under 'Duties & Taxes' -> Type: 'TCS' -> Nature of Goods: 'Sale of Scrap'.
4. Create Buyer Ledger 'Tamil Nadu Metal Recyclers' -> Under 'Sundry Debtors' -> Is TCS Applicable: YES -> Buyer Type: 'Company - Resident' -> PAN: 'AABCT9988G'.
5. Create Stock Item 'Cast Iron Scrap' -> Unit: 'Kgs' -> GST 18% -> TCS Applicable: YES.
6. Open Sales Invoice (F8):
   - Party: 'Tamil Nadu Metal Recyclers'
   - Item: 'Cast Iron Scrap' -> Qty: 2,000 Kgs @ ₹60/Kg = ₹1,20,000
   - Ledger 1: 'CGST' (auto ₹10,800)
   - Ledger 2: 'SGST' (auto ₹10,800)
   - Ledger 3: 'TCS on Scrap' (auto ₹1,416 @ 1% on ₹1,41,600 gross invoice value)
   - Total Invoice: ₹1,43,016.
7. Check Display More Reports -> Statutory Reports -> TCS Reports -> Form 27EQ to verify complete collection.`,
    realWorldExample: `Apex Manufacturing dismantles old machinery and sells 50 tons of industrial iron scrap to a recycling plant for ₹20,00,000 (18% GST). On the Sales Invoice, Tally computes ₹3,60,000 GST and collects ₹23,600 (1% TCS) on the total ₹23,60,000 billing. Apex deposits the TCS via Challan 281 and issues Form 27D to the buyer, who claims the ₹23,600 as direct tax credit in their annual ITR.`,
    aiActivity: `AI Task: TCS classification challenge.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Direct Tax Specialist and Tally Prime Compliance Auditor.

Evaluate the following 5 commercial sales transactions and determine the exact TCS treatment under Section 206C:

1. A manufacturing unit sells factory machine scrap for ₹3,50,000 (GST 18%) to a scrap merchant.
2. A coal mining entity sells raw lignite coal worth ₹15,00,000 (GST 5%) to a power generation company.
3. A commercial wholesale dealer with annual turnover of ₹25 Crore sells consumer electronics worth ₹65,00,000 to a single retail distributor in the current financial year.
4. An authorized luxury car dealership sells a Mercedes-Benz SUV for ₹85,00,000 to an individual buyer.
5. An authorized foreign exchange agency processes an overseas student tuition remittance of ₹12,00,000 under LRS.

For each transaction, provide:
1. Applicable Section of the Income Tax Act (e.g. 206C(1), 206C(1F), 206C(1G), 206C(1H)).
2. Threshold Limit and applicability criteria.
3. Applicable TCS Rate (%) and whether tax is calculated on base value or gross invoice (including GST).
4. Calculated TCS Amount.
5. Exact Tally Prime configuration steps for TCS Nature of Goods and Buyer Master."
---`,
    handsOnTask: "Launch Tally Prime -> Enable TCS in F11 -> Create TCS Nature of Goods for 'Sale of Scrap' -> Configure a scrap stock item and buyer ledger -> Record a sales invoice (F8) combining GST and TCS -> Record the TCS payment in F5 and review Form 27EQ.",
    assignment: `Assignment 27: TCS Setup, Invoicing & Return Filing Lab
1. Create company 'Delta Industrial Steels & Scrap Corp' in Tally Prime.
2. Enable TCS in F11 and configure company TAN details.
3. Create 2 TCS Nature of Goods: (a) Sale of Scrap (1%), (b) Sale of Goods over 50 Lakhs (0.1%).
4. Create 2 Buyer Ledgers with valid PAN details (1 Company, 1 Individual).
5. Create Stock Items: 'Industrial Copper Scrap' (HSN 7404, GST 18%, TCS Scrap) and 'Steel Billets' (GST 18%).
6. Record 2 Sales Invoices with automated GST and TCS calculation.
7. Record Payment Voucher (F5 with Stat Payment) depositing collected TCS with Challan 281 details.
8. Export Form 27EQ report and submit your verification summary.`,
    quiz: [
      {
        q: "What is the statutory TCS collection rate on the sale of industrial scrap under Section 206C(1)?",
        opts: ["1%", "5%", "10%", "0.1%"],
        ans: 0,
        exp: "Under Section 206C(1), the seller is legally required to collect 1% TCS on the sale of scrap."
      },
      {
        q: "Which quarterly statutory return in Tally Prime reports all Tax Collected at Source (TCS) transactions?",
        opts: ["Form 27EQ", "Form 26Q", "Form 24Q", "Form 16"],
        ans: 0,
        exp: "Form 27EQ is the quarterly return for reporting all Tax Collected at Source."
      },
      {
        q: "When billing sales with both GST and TCS in Tally Prime, how is the TCS amount calculated?",
        opts: ["On the gross invoice total including the GST amount", "Only on the base item value excluding GST", "Only on the cash discount", "On the company bank balance"],
        ans: 0,
        exp: "Under standard TCS rules, TCS is computed on the total invoice amount including GST."
      },
      {
        q: "What is the threshold limit under Section 206C(1H) for TCS on the sale of goods by high-turnover businesses?",
        opts: ["Aggregate sales to a single buyer exceeding ₹50 Lakhs in the financial year", "Sales exceeding ₹10,000", "Sales exceeding ₹1 Crore per invoice", "Zero threshold"],
        ans: 0,
        exp: "Section 206C(1H) mandates 0.1% TCS on sales receipts from a buyer exceeding ₹50 Lakhs in a financial year."
      },
      {
        q: "Which certificate is issued by the seller to the buyer confirming TCS collected and deposited with the government?",
        opts: ["Form 27D", "Form 16A", "Form 26AS", "Form 3CB"],
        ans: 0,
        exp: "Form 27D is the quarterly TCS certificate issued by the collector to the collectee."
      }
    ],
    reflection: [
      "I understand the difference between TDS (deducted on payments) and TCS (collected on sales).",
      "I can configure TCS Nature of Goods and statutory tax ledgers in Tally Prime.",
      "I can execute sales invoices combining GST and TCS calculations.",
      "I can audit Form 27EQ reports and generate TCS deposit challans."
    ]
  },
  day28: {
    title: "Day 28 — Payroll & Statutory Compliance: Employee Masters, Attendance, Pay Heads & Salary",
    objectives: [
      "Understand the architecture of automated Payroll management in Tally Prime.",
      "Create Employee Groups (Departments) and Employee Masters with PAN, Bank, PF, and ESI details.",
      "Configure Attendance / Production Types (Present Days, Absent, Overtime Hours).",
      "Configure Pay Heads across Earnings (Basic, HRA, DA, Conveyance) and Deductions (PF, ESI, Professional Tax).",
      "Define Employee Salary Structures and record monthly Attendance (Ctrl + F5).",
      "Process Monthly Payroll (Ctrl + F4) with AutoFill and disburse salaries via Bank (F5).",
      "Use AI to design a fully compliant corporate salary structure and audit statutory deductions."
    ],
    explanation: `Payroll in Tally Prime streamlines human resource financial operations into an automated, error-free workflow. From tracking daily attendance and overtime to calculating statutory contributions (Employee Provident Fund @ 12%, ESI @ 0.75%, and Professional Tax), Tally generates itemized payslips, bank disbursement files, and statutory compliance reports.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Payroll Architecture & Master Hierarchy',
        content: '• Master Elements in Tally Prime Payroll:\n  1. Employee Groups: Departmental classification (e.g. Sales, Software Development, Accounts, Operations).\n  2. Employee Masters: Individual staff profiles containing Date of Joining, Designation, Bank Account Number, IFSC, PAN, Aadhaar, PF UAN Number, and ESI Number.\n  3. Attendance / Production Types: Units used to measure work:\n     → "Present" (Attendance with Pay)\n     → "Leave without Pay" (Absent / Production deduction)\n     → "Overtime" (Production Type: Hours / Hrs of 60 mins).',
        icon: 'Users',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Configuring Pay Heads (Earnings & Deductions)',
        content: '• Pay Head Types (GOT -> Create -> Pay Heads):\n  1. Earnings for Employees:\n     • Basic Salary (Flat Rate or On Attendance - Calendar Month).\n     • House Rent Allowance / HRA (Computed: 40% or 50% of Basic).\n     • Conveyance & Special Allowance (Flat Rate).\n     • Overtime Pay (On Production: Overtime Hours).\n  2. Statutory Deductions for Employees:\n     • Employee PF @ 12% (Computed: 12% of Basic + DA, capped at ₹1,800 or actuals).\n     • Employee ESI @ 0.75% (Computed: 0.75% of Gross Salary if gross <= ₹21,000/mo).\n     • Professional Tax / PT (Slab-based deduction as per state rules, e.g. ₹200/mo).\n  3. Employer Statutory Contributions (Company Expense):\n     • Employer PF @ 12% (3.67% EPF + 8.33% EPS) + PF Admin Charges (0.5%).\n     • Employer ESI @ 3.25%.',
        icon: 'Layers',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Salary Structure & The 3-Step Monthly Payroll Cycle',
        leftTitle: 'Step 1: Define Salary Structure',
        leftDesc: 'Pathway: GOT -> Alter / Create -> Define Salary (or under Employee Master)\n• Assign Pay Heads with applicable rates (e.g. Basic: ₹30,000, HRA: 40% of Basic = ₹12,000, Conveyance: ₹2,000, PF: 12%, PT: Slab).\n• Can be assigned to an entire Employee Group or tailored per individual.',
        rightTitle: 'Steps 2 & 3: Attendance & Payroll AutoFill',
        rightDesc: '• Step 2: Record Attendance (Ctrl + F5):\n  → Enter days worked (e.g. Present: 28 Days, Absent: 2 Days, Overtime: 8 Hours).\n• Step 3: Process Payroll (Ctrl + F4) -> Press Alt + A (Payroll AutoFill):\n  → Process for: Salary | Period: 01-Apr to 30-Apr | All Employees.\n  → Tally automatically computes Gross Salary, PF, ESI, PT, and Net Salary!'
      },
      {
        type: 'tip',
        title: '4. Salary Disbursal & Pay Slip Generation',
        content: '• Salary Payment (F5 Payment -> Alt + A Payroll AutoFill): Debit "Salary Payable A/c" -> Credit "Bank Account".\n• Pay Slip: GOT -> Display More Reports -> Payroll Reports -> Pay Slips -> Single Pay Slip.\n• Prints professional payslips detailing Earnings, Deductions, Net Salary, Bank details, and Attendance records.',
        icon: 'Printer',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `Executing Complete Monthly Payroll Workflow in Tally Prime:
1. Press F11 -> Set 'Maintain Payroll' = YES and 'Enable Payroll Statutory' = YES (enter PF/ESI registration numbers).
2. Create Attendance Type: 'Present' (Attendance with pay) and 'Absent' (Leave without pay).
3. Create Pay Heads:
   - 'Basic Pay' (Earnings -> On Attendance -> Present).
   - 'HRA' (Earnings -> Computed -> 40% of Basic Pay).
   - 'Employee PF' (Employees Statutory Deduction -> PF @ 12% of Basic Pay).
   - 'Professional Tax' (Employees Statutory Deduction -> PT Slab).
   - 'Salary Payable' (Current Liabilities).
4. Create Employee 'Ravi Kumar' -> Group 'Software Engineering' -> Define Salary: Basic ₹40,000, HRA 40% (₹16,000), PF 12% (₹4,800), PT (₹200).
5. Record Attendance (Ctrl + F5): Ravi Kumar -> Present: 30 Days.
6. Record Payroll Voucher (Ctrl + F4 -> Alt + A AutoFill):
   - Gross Salary: ₹56,000 (Basic ₹40k + HRA ₹16k)
   - Deductions: ₹5,000 (PF ₹4,800 + PT ₹200)
   - Net Salary Payable: ₹51,000.
7. Record Payment (F5 -> Alt + A AutoFill): Pay ₹51,000 via HDFC Bank Current A/c.
8. Generate Ravi Kumar's Pay Slip (Display More Reports -> Payroll Reports -> Pay Slip).`,
    realWorldExample: `InfraTech Solutions employs 45 engineers. Previously, manual Excel payroll resulted in frequent PF calculation errors and delayed salary disbursements. By implementing Tally Prime Payroll with automated PF/ESI rules and biometric attendance integration, the company processed monthly payroll in under 15 minutes, generating instant electronic bank payout files and compliant Form 16 / ECR challans.`,
    aiActivity: `AI Activity: Build a sample salary structure with AI assistance and verify calculations.

Copy and paste this prompt into your AI Assistant:
---
"Act as a Senior Human Resources Director and Payroll Statutory Specialist.

I am configuring a standardized corporate payroll compensation structure for a mid-sized IT & Services company in India.

Employee Profile:
- Designation: Senior Software Engineer
- Monthly Cost to Company (CTC): ₹75,000 (Annual CTC: ₹9,00,000)
- State of Employment: Tamil Nadu (Chennai)

Please formulate a fully compliant Indian Salary Structure with:
1. Earnings Component Breakdown:
   - Basic Salary (e.g. 50% of CTC)
   - House Rent Allowance / HRA (e.g. 40% or 50% of Basic)
   - Conveyance Allowance & Special Allowance (balancing figure).
2. Statutory Deductions (Employee Share):
   - Provident Fund (PF @ 12% of Basic)
   - Employee State Insurance (ESI eligibility check)
   - Professional Tax (PT slab in Tamil Nadu).
3. Employer Statutory Contributions (Employer PF 12%, PF Admin 0.5%).
4. Monthly Net Take-Home Salary calculation.
5. Step-by-step Tally Prime Pay Head and Salary Structure configuration blueprint."
---`,
    handsOnTask: "Launch Tally Prime -> Enable Payroll in F11 -> Create 1 Employee Group and 2 Employee Masters -> Create Pay Heads for Basic, HRA, PF, and PT -> Define Salary Structures -> Record Attendance (Ctrl+F5) -> Process Payroll (Ctrl+F4 AutoFill) -> Disburse salary in F5 and print an itemized Pay Slip.",
    assignment: `Assignment 28: Multi-Department Payroll Setup & Salary Disbursal Lab
1. Create Company 'Apex Innovations IT Solutions' and enable Payroll in F11.
2. Create 2 Employee Groups: 'Engineering' and 'Sales & Marketing'.
3. Create 3 Employees with complete statutory profiles (PAN, Bank Account, PF UAN).
4. Create complete Pay Heads: Basic Pay, HRA, Special Allowance, Overtime Pay, Employee PF, Employee ESI, Professional Tax, and Salary Payable.
5. Define Salary Structure for all 3 employees with varied basic salaries.
6. Record Attendance Voucher (Ctrl + F5) for the month with 2 leaves and 10 hours overtime.
7. Process Monthly Payroll Voucher (Ctrl + F4 with AutoFill).
8. Record Salary Payment Voucher (F5 with Payroll AutoFill) disbursing net salaries by Bank.
9. Print/Export Single Pay Slips for all 3 employees and the consolidated Payroll Statement.`,
    quiz: [
      {
        q: "What is the standard employee contribution rate for Provident Fund (PF) on eligible Basic Salary in India?",
        opts: ["12%", "8.33%", "0.75%", "20%"],
        ans: 0,
        exp: "The standard statutory employee PF contribution is 12% of Basic Pay + Dearness Allowance."
      },
      {
        q: "Which shortcut key in Tally Prime opens the Attendance Voucher creation screen?",
        opts: ["Ctrl + F5", "Ctrl + F4", "Alt + F7", "F5"],
        ans: 0,
        exp: "Ctrl + F5 opens the Attendance Voucher screen in Tally Prime Payroll."
      },
      {
        q: "Which voucher type and helper shortcut is used to calculate monthly salaries for all employees in a single automated step?",
        opts: ["Payroll Voucher (Ctrl + F4) using Payroll AutoFill (Alt + A)", "Journal Voucher (F7)", "Receipt Voucher (F6)", "Sales Invoice (F8)"],
        ans: 0,
        exp: "Ctrl + F4 (Payroll Voucher) with Alt + A (Payroll AutoFill) computes salaries across all employees automatically."
      },
      {
        q: "What is the monthly gross wage ceiling for an employee to be covered under the Employee State Insurance (ESI) scheme?",
        opts: ["₹21,000 per month (₹25,000 for employees with disabilities)", "₹50,000 per month", "₹10,000 per month", "No limit"],
        ans: 0,
        exp: "Employees with gross monthly wages up to ₹21,000 are mandatorily covered under ESI."
      },
      {
        q: "Where can an HR manager view and print an itemized individual employee Pay Slip in Tally Prime?",
        opts: ["Gateway of Tally -> Display More Reports -> Payroll Reports -> Pay Slips -> Single Pay Slip", "GOT -> Balance Sheet", "GOT -> Day Book", "GOT -> Banking"],
        ans: 0,
        exp: "Single Pay Slip under Payroll Reports displays and prints the complete itemized earnings and deductions breakdown."
      }
    ],
    reflection: [
      "I can enable and configure the complete Payroll module in Tally Prime.",
      "I can create Employee Masters, Attendance Types, and statutory Pay Heads.",
      "I can define Salary Structures and record monthly Attendance.",
      "I can execute Payroll AutoFill processing, bank salary payments, and generate Pay Slips."
    ]
  },
  day29: {
    title: "Day 29 — Bank Reconciliation Statement (BRS) & AI Financial Analysis",
    objectives: [
      "Understand the mechanics of Bank Ledger configuration, Cheque Books, and e-Banking in Tally Prime.",
      "Record various bank transactions including Cheque deposits, NEFT/RTGS payments, Bank charges, and Interest.",
      "Understand why Company Bank Book balances differ from Bank Passbook / Statement balances.",
      "Perform Manual Bank Reconciliation by setting Instrument Dates and Bank Clearance Dates.",
      "Execute Auto Bank Reconciliation by importing electronic bank statements (CSV/Excel/MT940).",
      "Audit key banking and financial health reports: Bank Book, Cheque Register, Ratio Analysis, and Cash Flow.",
      "Use AI to investigate bank reconciliation discrepancies, determine root causes, and generate adjustment journal vouchers."
    ],
    explanation: `Bank Reconciliation Statement (BRS) is a vital internal financial control that reconciles the bank balance shown in a company's books of accounts (Bank Ledger) with the balance reported on the official Bank Statement/Passbook. Discrepancies commonly arise due to timing differences (unpresented cheques, uncredited deposits), direct bank transactions (bank charges, interest credited, ECS debits), and clerical posting errors. Tally Prime provides both automated e-Banking reconciliation and powerful manual reconciliation tools.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Bank Ledgers, Cheque Books & e-Payments Setup',
        content: '• Bank Account Types in Tally:\n  1. Bank Accounts (Assets): Current Account, Savings Account.\n  2. Bank OD / OCC A/c (Liabilities): Overdraft or Cash Credit facilities against collateral or hypothecation.\n• Advanced Banking Master Configuration (GOT -> Create -> Ledger):\n  → Bank Details: Select Bank Name (e.g. HDFC Bank, State Bank of India, ICICI Bank) to enable pre-configured cheque printing formats.\n  → Account Number & IFSC Code: Enables e-Payments (NEFT/RTGS/IMPS) export.\n  → Cheque Book Configuration: Define cheque number ranges (e.g., 000101 to 000200) and set auto-increment cheque numbering.\n  → e-Banking Configuration: Enable Auto Bank Reconciliation to import bank statement files directly.',
        icon: 'CreditCard',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Bank Transactions & The Need for BRS',
        content: '• Common Bank Transactions:\n  • Payment Voucher (F5): Cheques issued to suppliers, vendor NEFT/RTGS transfers, tax challan payments.\n  • Receipt Voucher (F6): Cheques received from customers, incoming wire transfers, UPI receivables.\n  • Contra Voucher (F4): Cash deposited into bank (Dr Bank, Cr Cash) or cash withdrawn from ATM for office use (Dr Cash, Cr Bank).\n  • Bank Charges (F5/F7): Direct account maintenance fees, cheque bounce fees, loan processing fees.\n• Why Bank Book != Bank Statement?\n  1. Cheques issued to creditors but not yet presented for payment at the bank (Unpresented Cheques).\n  2. Cheques deposited into bank but not yet cleared/credited by clearing house (Uncredited Cheques).\n  3. Direct debits by bank (bank charges, insurance ECS, loan EMIs) not yet entered in Tally.\n  4. Direct deposits by customers or interest credited by bank unknown until statement review.',
        icon: 'Sliders',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Manual vs. Auto Bank Reconciliation in Tally Prime',
        leftTitle: 'Manual Bank Reconciliation',
        leftDesc: 'Pathway: GOT -> Banking -> Bank Reconciliation -> Select Bank Ledger.\n• Press Alt + F5 for Detailed View.\n• Tally displays all vouchers with Instrument No, Date, and a "Bank Date" column.\n• Enter the exact date each cheque cleared on the physical bank statement in the "Bank Date" column.\n• As dates are entered, Tally computes "Balance as per Company Books", "Amounts not reflected in Bank", and "Balance as per Bank".',
        rightTitle: 'Auto Bank Reconciliation (e-Banking)',
        rightDesc: 'Pathway: GOT -> Banking -> Bank Reconciliation -> Press Alt + O (Import) -> Bank Statement.\n• Supported Formats: CSV, Excel, XML, or MT940 statement downloaded from NetBanking.\n• Tally Prime automatically compares Instrument Numbers, Transaction Dates, and Amounts.\n• Matched entries are auto-reconciled with clearance dates; unmatched entries are highlighted for manual review.'
      },
      {
        type: 'tip',
        title: '4. Common Mismatches & Financial Health Reports',
        content: '• Common Errors in Banking:\n  → Transposition Error (e.g. ₹5,400 entered as ₹4,500 in Tally).\n  → Cheque Dishonour / Bounce: Customer cheque returned unpaid; requires reversal entry (Dr Customer, Cr Bank + Bank Bounce Charges).\n• Banking & Financial Reports in Tally:\n  1. Cheque Register: GOT -> Banking -> Cheque Register (audits available, issued, and cancelled cheques).\n  2. Cash / Bank Summary: Under Display More Reports -> Account Books.\n  3. Ratio Analysis (GOT -> Ratio Analysis): Working Capital, Current Ratio, Quick Ratio, Debt-Equity Ratio, and Return on Capital Employed (ROCE).\n  4. Cash Flow & Funds Flow Statement: Evaluates liquidity from Operating, Investing, and Financing activities.',
        icon: 'BarChart2',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `Executing Banking Operations & Bank Reconciliation in Tally Prime:
1. Create Bank Ledger:
   - Name: 'HDFC Bank Current Account' -> Under: 'Bank Accounts'
   - Set Bank Name: 'HDFC Bank (India)' | A/c No: '50200012345678' | IFSC: 'HDFC0001234'
   - Set 'Alter Cheque Books' = YES -> Book 1: Range 100001 to 100100 (100 Cheques).
   - Set 'Enable Auto Reconciliation' = YES.
2. Record Bank Transactions:
   - Cheque Payment (F5): Pay ₹45,000 to 'Zenith Infotech' -> Instrument No auto-populates '100001'.
   - Cheque Deposit (F6): Receive ₹80,000 from 'Kovai Traders' -> Cheque No '450912' deposited.
   - Bank Charges (F5): Debit 'Bank Charges' ₹750 -> Credit 'HDFC Bank'.
3. Perform Manual Bank Reconciliation:
   - Go to Gateway of Tally -> Banking -> Bank Reconciliation -> Select 'HDFC Bank Current Account'.
   - In the 'Bank Date' column:
     • For Zenith Infotech (Chq 100001): Enter Bank Date as '04-Apr-2026' (Cleared 2 days later).
     • For Kovai Traders (Chq 450912): Leave Bank Date BLANK (Uncredited cheque still in clearing).
   - Observe Tally's summary bar:
     • Balance as per Company Books: ₹1,50,000
     • Amounts not reflected in Bank: ₹80,000 Cr
     • Balance as per Bank: ₹2,30,000. Press Ctrl+A to save reconciliation.
4. View Financial Health: GOT -> Ratio Analysis (Check Current Ratio and Quick Ratio).`,
    realWorldExample: `A manufacturing firm closed its monthly books showing a bank ledger balance of ₹12,40,000, while their online netbanking passbook showed ₹14,15,000. Through Tally Prime's BRS, the accountant discovered: (1) ₹2,50,000 in cheques issued to raw material vendors had not yet been presented, (2) an uncredited customer cheque of ₹80,000 was in transit, and (3) the bank had auto-debited ₹5,000 quarterly locker rent. Reconciling cleared items and booking the locker fee brought both balances into exact mathematical agreement.`,
    aiActivity: `AI Task: Analyse a bank reconciliation mismatch and identify possible causes.

Copy and paste this prompt template into your AI Assistant:
---
"Act as a Senior Chartered Accountant, Chief Financial Officer (CFO), and Forensic Banking Auditor.

I am reconciling the bank account of 'Apex Technologies Pvt Ltd' for the month ended April 30, 2026.
Here is the financial data:

1. Balances:
   - Bank Balance as per Company Cash/Bank Book (Debit Balance): ₹6,84,500
   - Bank Balance as per Bank Passbook/Statement (Credit Balance): ₹8,12,200
   - Net Discrepancy Mismatch: ₹1,27,700

2. Transaction Audit Findings:
   - Finding A: Cheques issued to suppliers during April totaling ₹2,40,000, but only ₹1,15,000 were presented and cleared at the bank by April 30.
   - Finding B: Cheques received from customers totaling ₹1,85,000 deposited on April 28; bank statement shows only ₹95,000 credited (₹90,000 credited on May 3).
   - Finding C: A direct NEFT customer payment of ₹65,000 from 'CyberNet Systems' was credited directly into the bank on April 29, but no entry was recorded in Tally.
   - Finding D: Bank statement reflects debit of ₹1,800 for annual account maintenance charges and SMS alert fees, not yet recorded in Tally.
   - Finding E: Bank credited interest on fixed deposit sweep-in account of ₹4,600 on April 30, not recorded in Tally.
   - Finding F: A customer cheque for ₹22,000 deposited on April 20 was dishonoured/returned unpaid by the bank due to signature mismatch on April 26; bank levied ₹400 bounce charges. No reversal entry exists in Tally.
   - Finding G: A payment of ₹32,400 to 'Metro Logistics' was erroneously recorded in Tally's payment voucher as ₹23,400 (Transposition error of ₹9,000).

Please perform a comprehensive Bank Reconciliation analysis:
1. Classify each of the 7 findings into Timing Difference vs. Book Error vs. Direct Bank Transaction.
2. Prepare a formal, step-by-step Bank Reconciliation Statement starting with Company Book Balance (₹6,84,500) and proving it reconciles to the Bank Passbook Balance (₹8,12,200).
3. Specify the exact adjustment journal and payment vouchers that must be recorded in Tally Prime to update the books.
4. Calculate the true Adjusted Bank Book Balance."
---`,
    handsOnTask: "Create a Bank Ledger with cheque ranges in Tally Prime -> Record 5 banking transactions (deposit, supplier payment, NEFT, bank charges) -> Open Banking -> Bank Reconciliation -> Enter clearance dates -> Resolve a mismatch using the AI Activity template -> Extract Ratio Analysis.",
    assignment: `Assignment 29: Complete Banking Operations, BRS & Financial Health Lab
1. Bank Master Setup:
   - Create 'State Bank of India Current A/c' under Bank Accounts with A/c No, IFSC, Cheque Book (Cheques 5001 to 5050), and Auto Reconciliation enabled.
2. Record Bank Vouchers:
   - Contra (F4): Cash deposited into SBI A/c ₹3,00,000.
   - Payment (F5): Cheque 5001 issued to 'Premier Suppliers' for ₹65,000.
   - Payment (F5): Cheque 5002 issued to 'Global Tech Hardware' for ₹48,000.
   - Receipt (F6): Received cheque ₹95,000 from 'Vortex Enterprises' and deposited into SBI.
   - Payment (F5): Record direct bank charges of ₹850 debited by SBI.
3. Bank Reconciliation (BRS):
   - Open GOT -> Banking -> Bank Reconciliation -> Select SBI Current A/c.
   - Reconcile Cheque 5001 (Cleared on 28-Apr) and leave Cheque 5002 unpresented.
   - Reconcile customer cheque ₹95,000 with clearance date.
   - Verify that 'Balance as per Bank' matches the intended passbook position.
4. AI Mismatch Investigation:
   - Solve the 7-finding mismatch case from the AI Activity and document the required rectification journal entries.
5. Financial Ratio Analysis:
   - Navigate to GOT -> Ratio Analysis and extract: Current Ratio, Quick Ratio, Debt-Equity Ratio, and Net Profit %.`,
    quiz: [
      {
        q: "What is the primary purpose of preparing a Bank Reconciliation Statement (BRS)?",
        opts: ["To explain and reconcile the difference between the bank balance in company books and the balance in the bank passbook", "To apply for a bank loan", "To calculate employee income tax", "To format company invoices"],
        ans: 0,
        exp: "BRS reconciles differences between the company's ledger cash/bank book balance and the bank statement balance due to timing delays and unrecorded bank entries."
      },
      {
        q: "Where in Tally Prime do you access the Bank Reconciliation tool?",
        opts: ["Gateway of Tally -> Banking -> Bank Reconciliation", "Gateway of Tally -> Balance Sheet", "Gateway of Tally -> Inventory Info", "Gateway of Tally -> Display -> Day Book"],
        ans: 0,
        exp: "Bank Reconciliation is located directly under Gateway of Tally -> Banking -> Bank Reconciliation."
      },
      {
        q: "How does an 'Unpresented Cheque' (cheque issued to a supplier but not yet cleared at the bank) affect the BRS when starting from Company Book Balance?",
        opts: ["It must be added back to the Company Book Balance", "It must be deducted from the Company Book Balance", "It is ignored completely", "It is multiplied by tax rates"],
        ans: 0,
        exp: "Since the company already deducted the cheque from its book, but the bank has not yet paid it out, it must be added back to arrive at the bank statement balance."
      },
      {
        q: "What should be done in Tally Prime when a deposited customer cheque bounces / is dishonoured?",
        opts: ["Record a reversal entry debiting the Customer A/c and crediting Bank A/c along with any bank bounce charges", "Delete the company data", "Ignore the bounce", "Create a new bank"],
        ans: 0,
        exp: "A dishonoured cheque must be reversed by debiting the customer ledger (re-establishing the debt) and crediting the bank ledger."
      },
      {
        q: "Which report in Tally Prime provides an instant snapshot of Current Ratio, Quick Ratio, and Working Capital?",
        opts: ["Gateway of Tally -> Ratio Analysis", "Gateway of Tally -> Stock Summary", "Gateway of Tally -> Trial Balance", "Gateway of Tally -> Day Book"],
        ans: 0,
        exp: "Ratio Analysis under Gateway of Tally delivers key liquidity, solvency, and profitability metrics."
      }
    ],
    reflection: [
      "I understand why the company bank ledger balance differs from the bank statement.",
      "I can configure Bank Ledgers, cheque books, and e-banking features in Tally Prime.",
      "I can perform both manual bank reconciliation and auto statement reconciliation.",
      "I can use AI to audit complex bank mismatches and interpret financial health ratios."
    ]
  },
  day30: {
    title: "Day 30 — 🚀 Final Project 1: AI-Powered End-to-End Business Accounting",
    objectives: [
      "Execute the entire commercial accounting lifecycle for a full-scale corporate enterprise: 'Apex Global Technologies & Hardware Solutions Pvt Ltd'.",
      "Configure company features (F11) covering Multi-Godown, Order Processing, GST, TDS, and Payroll.",
      "Set up Chart of Accounts: Primary/Secondary Groups, Opening Balances, and Statutory Ledgers.",
      "Record full-cycle transactions: Capital induction, Bulk procurement, Sales orders, Invoicing, Returns, BoM Assembly, Expenses with TDS, and Payroll.",
      "Use AI as an Intelligent Accounting Assistant to audit entries, detect posting errors, and verify trial balance integrity.",
      "Analyze final financial statements (Balance Sheet, P&L, Cash Flow, GSTR-1, GSTR-3B, BRS) with AI-powered CFO insights."
    ],
    explanation: `Final Project 1 brings together all 29 days of Tally Prime and statutory accounting knowledge into a unified, professional enterprise case study. Students take full operational ownership of 'Apex Global Technologies & Hardware Solutions Pvt Ltd', setting up masters, executing the complete transaction cycle across Inventory, GST, TDS, Payroll, and Banking, and utilizing AI for error detection, variance analysis, and strategic financial decision-making.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Project Blueprint: The 7-Stage Accounting Lifecycle',
        content: '• Complete Enterprise Lifecycle:\n  1. Company Creation & Feature Matrix (F11): Multi-Godown, Bill of Materials, GSTIN, TAN (TDS), Payroll, and Price Levels.\n  2. Chart of Accounts: Establishing clean group hierarchies, opening capital balances, and supplier/customer ledgers.\n  3. Inventory & Order Pipeline: Purchase Orders -> Receipt Notes (GRN) -> Purchase Invoices -> Sales Orders -> Delivery Challans -> Tax Invoices.\n  4. Manufacturing & Assembly: Setting up BoMs and recording Manufacturing Journals for custom assembled enterprise hardware.\n  5. Statutory Deductions & Payroll: Booking vendor expenses with TDS (194C/194J) and running automated monthly staff payroll (PF/ESI/PT).\n  6. Banking & BRS: Processing payments, deposits, electronic bank reconciliation, and cash flow tracking.\n  7. Reporting & AI Auditing: Extracting Balance Sheet, P&L, GSTR-3B, TDS 26Q, and deploying AI CFO audits.',
        icon: 'Briefcase',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Case Study Scenario: Apex Global Technologies Pvt Ltd',
        content: '• Profile: Premier IT infrastructure supplier, computer assembly manufacturer, and enterprise consulting firm in Chennai, Tamil Nadu.\n• Capital Structure: ₹50,00,000 Initial Share Capital deposited into HDFC Bank Current A/c.\n• Infrastructure: Central Warehouse (Ambattur), Assembly Line (Guindy), and Corporate Showroom (T. Nagar).\n• Product Lines: Raw computer hardware parts, Assembled "Apex Titan Server" workstations, and Managed IT Support Contracts.\n• Compliance: GSTIN: 33AAAAA1234A1Z5 | TAN: CHEA12345B | PF & ESI Registered.',
        icon: 'Layers',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. The AI Accounting Co-Pilot Workflow',
        leftTitle: 'Stage 1: Error Detection & Audit',
        leftDesc: 'Feed draft Trial Balance & Transaction logs into AI to:\n• Identify misplaced ledger groups (e.g. expenses grouped under Current Assets).\n• Detect missing TDS deductions on professional/contractor bills exceeding statutory thresholds.\n• Flag GST rate mismatches (e.g. 18% item mapped to 12% IGST).\n• Spot unallocated cost centers or negative godown stock.',
        rightTitle: 'Stage 2: Financial Intelligence & Insights',
        rightDesc: 'Feed final Balance Sheet, P&L & Ratio Analysis into AI to:\n• Calculate Gross Profit %, Operating Margin %, and Net Profit Margin % trends.\n• Evaluate Working Capital adequacy and Debtors Collection Period.\n• Generate executive recommendations for inventory holding cost reduction and tax planning.'
      },
      {
        type: 'tip',
        title: '4. Deliverables & Presentation Standard',
        content: '• Professional Project Portfolio Deliverables:\n  1. Tally Company Backup / Final Data file.\n  2. Financial Statements: Trial Balance, Profit & Loss A/c, Balance Sheet (Vertical/Horizontal).\n  3. Statutory Tax Pack: GSTR-1, GSTR-3B, TDS Form 26Q summary, Monthly Payroll Statement.\n  4. Reconciled Bank Statement (BRS) with zero unexplained variance.\n  5. AI Financial Audit Report & Executive Management Advisory Deck.',
        icon: 'Award',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `Comprehensive Project Execution Roadmap:
1. Company Setup: Create 'Apex Global Technologies & Hardware Solutions Pvt Ltd' (Tamil Nadu). Enable GST (GSTIN: 33AAAAA1234A1Z5), TDS (TAN: CHEA12345B), Payroll, Godowns, and Orders in F11.
2. Opening Balances: Capital A/c ₹50,00,000 (Cr) | HDFC Bank Current A/c ₹45,00,000 (Dr) | Cash in Hand ₹5,00,000 (Dr).
3. Procurement & Inward: Procure ₹15,00,000 raw server components from 'Intel Tech Distributors' with 18% GST (F9 Purchase).
4. Assembly Run: Create BoM for 'Apex Titan Server' -> Record Manufacturing Journal producing 10 servers with ₹30,000 technician assembly wages allocated.
5. Sales Fulfillment: Record Sales Order from 'Cognizant Technologies' for 6 Titan Servers @ ₹1,80,000 each + 18% GST -> Issue Delivery Note -> Generate Sales Tax Invoice (F8).
6. Expense with TDS: Book Software Architecture Consulting fees of ₹1,50,000 from 'Cyber Architects LLP' with 10% TDS under Sec 194J (Journal F7).
7. Payroll Run: Process monthly payroll for 4 staff members (Gross: ₹1,80,000, PF: ₹15,600, PT: ₹800) via Payroll AutoFill (Ctrl+F4) and disburse salaries via HDFC Bank (F5).
8. BRS: Perform Bank Reconciliation for HDFC Bank Current A/c.
9. AI Audit: Export Trial Balance and P&L -> Run AI Diagnostic Prompt.`,
    realWorldExample: `In corporate enterprise deployments, junior accountants enter hundreds of daily vouchers across procurement, manufacturing, and payroll. The senior financial controller uses automated Tally reports combined with AI prompt workflows to audit debit/credit integrity, ensure zero statutory tax leakages under GST/TDS, and present boardroom-ready business health dashboards to the Managing Director.`,
    aiActivity: `AI Challenge: AI-Powered Financial Statement Audit & Executive Insights Report

Copy and paste this prompt template into your AI Assistant along with your project figures:
---
"Act as an Elite Chief Financial Officer (CFO), Statutory Auditor, and Management Consultant.

I have completed the end-to-end accounting simulation for 'Apex Global Technologies & Hardware Solutions Pvt Ltd' in Tally Prime. Here is our financial summary for the period:

1. Revenue & Cost of Goods Sold:
   - Total Sales Revenue: ₹24,80,000 (GST 18%: ₹4,46,400)
   - Cost of Raw Materials Consumed: ₹12,40,000
   - Direct Manufacturing Labor & Overheads: ₹65,000
   - Closing Stock of Finished Servers & Parts: ₹6,80,000

2. Operating Expenses & Statutory:
   - Administrative & Office Rent: ₹1,20,000
   - Professional & Legal Fees (TDS 10% deducted): ₹1,50,000
   - Staff Payroll & Employer Contributions: ₹2,10,000
   - Depreciation on Equipment: ₹45,000

3. Balance Sheet Position:
   - Shareholder Capital & Reserves: ₹50,00,000
   - Sundry Debtors (Receivables): ₹9,50,000 (₹3,00,000 overdue > 45 days)
   - Sundry Creditors (Payables): ₹5,80,000
   - Net Output GST Payable: ₹1,62,000 | TDS Payable: ₹15,000
   - Bank Balance in HDFC Current A/c: ₹32,70,000

Please execute a rigorous AI CFO Audit & Business Advisory:
1. Data Integrity & Compliance Check:
   - Verify ledger balances, tax liability calculations, and statutory deduction accuracy.
   - Highlight any potential compliance risks or audit flags.
2. Financial Health & Ratio Diagnostics:
   - Calculate Gross Margin %, Net Profit Margin %, Operating Expense Ratio, Current Ratio, Quick Ratio, and Debtor Days.
3. Strategic Business Insights & Cost Optimization:
   - Provide 4 concrete recommendations to accelerate cash collections from overdue debtors.
   - Suggest 3 inventory management optimizations to prevent cash lockup in hardware components.
4. Executive Summary for Board of Directors:
   - Write a 1-page executive briefing summarizing business performance, liquidity strength, and growth readiness."
---`,
    handsOnTask: "Build 'Apex Global Technologies Pvt Ltd' in Tally Prime -> Configure all F11 features -> Create Chart of Accounts -> Record 10 complete transactions (Procurement, BoM Assembly, Sales, TDS Expense, Payroll, Banking) -> Extract Trial Balance, P&L, Balance Sheet -> Run AI Audit Prompt.",
    assignment: `Final Project 1 Deliverable Portfolio:
1. Tally Company Creation & Features:
   - Create 'Apex Global Technologies & Hardware Solutions Pvt Ltd' with full Tamil Nadu GST, TAN, and Payroll master configurations.
2. Master Setup:
   - Create 3 Godowns, 5 Raw Material stock items, 1 Finished Server with BoM, 4 Employee Masters with Pay Heads, and statutory tax ledgers.
3. Complete 10-Voucher Commercial Cycle:
   - V1: Capital introduction ₹50 Lakhs into Bank.
   - V2: Raw material purchase ₹15 Lakhs + 18% GST on credit.
   - V3: Manufacturing Journal assembling 10 Apex Titan Servers with ₹30k overheads.
   - V4: Sales Order & Delivery Note for 6 Servers to Cognizant Technologies.
   - V5: Sales Tax Invoice ₹10,80,000 + 18% GST.
   - V6: Credit Note for 1 returned server due to wrong port specs.
   - V7: Consulting bill ₹1,50,000 with 10% TDS under Sec 194J booked in F7.
   - V8: Monthly Payroll processed (Ctrl+F4) for 4 staff with PF & PT.
   - V9: Bank payments for vendor invoice, TDS challan, and net salaries.
   - V10: Bank Reconciliation Statement (BRS) completed.
4. Reports Pack Submission:
   - Export and submit: (a) Balance Sheet, (b) Profit & Loss Statement, (c) Trial Balance, (d) GSTR-3B summary, and (e) Stock Summary.
5. AI Executive Insights:
   - Submit the completed AI CFO Audit & Strategic Recommendations report.`,
    quiz: [
      {
        q: "What is the correct sequence of establishing a new commercial accounting system in Tally Prime?",
        opts: ["Company Creation -> F11 Feature Configuration -> Groups & Ledgers -> Inventory Masters -> Transactions -> Statutory Compliance -> Financial Reports", "Transactions -> Ledgers -> Company Creation", "Balance Sheet -> Ledgers -> Vouchers", "Reports -> Payroll -> Company Creation"],
        ans: 0,
        exp: "The standard workflow moves from company creation and feature activation to masters setup, transaction processing, and final financial reporting."
      },
      {
        q: "In an end-to-end IT hardware assembly business, which voucher type converts raw components into finished servers with capitalized labor?",
        opts: ["Manufacturing Journal (Stock Journal configured for manufacturing)", "Sales Invoice (F8)", "Payment Voucher (F5)", "Contra Voucher (F4)"],
        ans: 0,
        exp: "The Manufacturing Journal automatically consumes raw materials based on the BoM and capitalizes direct labor/overheads into finished unit cost."
      },
      {
        q: "When booking a ₹2,00,000 professional IT architecture bill subject to 10% TDS under Section 194J in Journal (F7), what is the correct entry?",
        opts: ["Debit Professional Fees ₹2,00,000 | Credit Vendor A/c ₹1,80,000 | Credit TDS on Professional Fees ₹20,000", "Debit Vendor A/c ₹2,00,000 | Credit Cash ₹2,00,000", "Debit Bank ₹2,00,000 | Credit Sales ₹2,00,000", "Debit TDS ₹20,000 | Credit Professional Fees ₹20,000"],
        ans: 0,
        exp: "Expenses are debited for the gross amount (₹2,00,000), crediting net payable to vendor (₹1,80,000) and TDS liability to government (₹20,000)."
      },
      {
        q: "Which key statutory return in Tally Prime provides the summary of monthly output tax liability and Input Tax Credit (ITC) for GST filing?",
        opts: ["GSTR-3B", "GSTR-1", "Form 26Q", "Form 16A"],
        ans: 0,
        exp: "GSTR-3B is the monthly self-declaration summary return for declaring outward supplies, eligible ITC, and tax payment."
      },
      {
        q: "How does AI assist a Senior Financial Accountant when analyzing a finalized Trial Balance and Balance Sheet?",
        opts: ["By detecting classification errors, testing ratio benchmarks, identifying working capital risks, and generating strategic business insights", "By replacing physical keyboards", "By deleting old company files", "By printing receipts on paper"],
        ans: 0,
        exp: "AI acts as an intelligent co-pilot, performing deep financial audits, spotting ledger abnormalities, and generating actionable management insights."
      }
    ],
    reflection: [
      "I can independently execute the entire accounting lifecycle from company creation to financial reporting in Tally Prime.",
      "I can integrate Inventory, BoM Manufacturing, GST, TDS, and Payroll into a seamless corporate workflow.",
      "I can use AI to audit accounting entries, verify statutory accuracy, and calculate financial ratios.",
      "I can generate executive business insights and CFO-level strategic recommendations."
    ]
  },
  day31: {
    title: "Day 31 — 🚀 Final Project 2: Multi-Industry Capstone & Final Assessment",
    objectives: [
      "Select and independently manage an industry-specific enterprise accounting scenario in Tally Prime.",
      "Configure industry-tailored masters across Trading, Medical Store, Manufacturing, Service, or Retail business models.",
      "Record complete fiscal accounting entries, batch tracking, price levels, statutory taxes (GST/TDS), and payroll.",
      "Generate comprehensive financial reports: Trial Balance, P&L, Balance Sheet, Cash Flow, GSTR returns, and Stock Valuation.",
      "Conduct an AI-driven Forensic Accounting Audit, Scenario Stress-Testing, and Executive Business Presentation.",
      "Successfully complete the Final Course Capstone Assessment and Viva-Voce Evaluation."
    ],
    explanation: `The Final Capstone Project & Assessment is the crowning achievement of the Tally Prime mastery curriculum. Students choose from 5 diverse real-world industry domains, building a complete, audited accounting system from scratch. You will prove end-to-end competency in financial accounting, inventory control, tax compliance, payroll administration, and AI-powered business intelligence.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Select Your Capstone Industry Domain',
        content: 'Choose 1 of the following 5 real-world industry tracks for your Capstone Portfolio:\n• Track 1: Trading Business (Horizon Consumer Durables — Wholesale & Retail distribution, multi-price levels, interstate GST, bulk volume rebates).\n• Track 2: Medical Store & Pharmacy (Lifeline MediCorp Pharmacy — Batch numbers, Mfg/Expiry dates, Drug License, HSN 5% & 12% GST, expiry returns).\n• Track 3: Manufacturing Business (Titan Precision Engineering — Raw sheet metal/castings procurement, multi-stage BoM assembly, manufacturing overheads, job costing).\n• Track 4: Service Business (Starlight Digital Media & Cloud Consulting — SAC codes, 18% GST, Section 194J/194C TDS deductions, project cost centers, retainer billing).\n• Track 5: Retail Business / Supermarket (FreshMart Supermarket & Gourmet — POS counter billing, multi-tender payment, barcode tracking, fast-moving consumer goods).',
        icon: 'Briefcase',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.03)'
      },
      {
        type: 'card',
        title: '2. Capstone Execution Framework',
        content: '• Milestone 1: Master Setup & Policy Configuration\n  → Create company, enable relevant F11 features, configure Chart of Accounts, set opening balances.\n• Milestone 2: 15 Core Commercial Transactions\n  → Capital induction, procurement with GST, multi-godown stock movements, commercial sales, debit/credit notes, expense bookings with TDS, monthly payroll run, and bank settlement.\n• Milestone 3: Bank Reconciliation & Statutory Filings\n  → Perform BRS, reconcile uncleared cheques, generate GSTR-1, GSTR-3B, Form 26Q, and PF/ESI challans.\n• Milestone 4: Financial Statements & Ratio Analysis\n  → Extract Trial Balance, Trading & P&L A/c, Balance Sheet, Cash Flow, Stock Summary, and key Financial Ratios.',
        icon: 'Layers',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. AI Forensic Audit & Strategic Boardroom Briefing',
        leftTitle: 'AI Forensic Audit Review',
        leftDesc: 'Prompt AI to stress-test your numbers:\n• Audit debt-equity balance and solvency health.\n• Spot potential tax exposure under GST ITC non-reconciliation (GSTR-2B vs 3B).\n• Check inventory turnover and dead-stock holding risk.\n• Validate statutory deduction timeliness and penalty exposure.',
        rightTitle: 'Executive Insights & Board Deck',
        rightDesc: 'Deliver a structured business report:\n• Executive Summary of Profitability & Margins.\n• Working Capital Optimization Blueprint.\n• 12-Month Financial Forecasting & Growth Strategy.\n• Pricing & Product Mix Recommendations.'
      },
      {
        type: 'tip',
        title: '4. Final Assessment Rubric & Certification Standards',
        content: '• Evaluation Criteria (100 Points Total):\n  1. Company & Master Configuration Integrity: 20 pts\n  2. Transaction Accuracy & Double-Entry Correctness: 25 pts\n  3. Inventory, BoM & Batch Precision: 15 pts\n  4. GST, TDS & Statutory Tax Compliance: 15 pts\n  5. BRS & Financial Statement Reconciliation: 10 pts\n  6. AI Financial Audit & Strategic Insights Quality: 15 pts',
        icon: 'Award',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.03)'
      }
    ],
    demonstration: `Capstone Project Walkthrough — Choosing & Executing Your Track:
1. Track Selection: Choose your industry track (e.g., Track 1: Horizon Consumer Durables).
2. Create Company in Tally Prime: Enter registered address, GSTIN, PAN, TAN, and fiscal year.
3. Feature Enablement (F11): Enable Multi-Godown, Batch Details / BoM, Price Levels, GST, TDS, and Payroll according to track requirements.
4. Master Creation: Setup Groups, Ledgers, Stock Groups, Stock Categories, Units, Stock Items with HSN/GST rates, and Employee masters.
5. Record 15 Transactions:
   - Introduce initial capital and procure fixed assets & opening stock.
   - Record purchases from local and interstate vendors with tax calculation.
   - Execute sales orders, delivery notes, and tax invoices across retail/wholesale price tiers.
   - Record purchase and sales returns via Debit & Credit Notes.
   - Book operating expenses with TDS deduction (Sec 194C/194J/194I).
   - Process monthly staff attendance and run Payroll AutoFill.
   - Settle vendor bills, deposit tax challans, and disburse salaries via Bank.
   - Reconcile Bank Account (BRS).
6. Export Financial Reports and run the Capstone AI Audit.`,
    realWorldExample: `A certified Tally professional stepping into a Chief Accountant or Financial Controller role is expected to take complete ownership of a company's financial records from Day 1. By executing this multi-industry capstone project and defending the numbers with an AI-powered executive report, students demonstrate real-world job readiness equivalent to seasoned accounting professionals.`,
    aiActivity: `AI Activity: Capstone Multi-Industry Audit, Stress-Testing & Boardroom Presentation

Copy and paste this prompt template into your AI Assistant along with your capstone data:
---
"Act as a Managing Director of a Top-Tier Accounting Audit Firm and Chief Financial Strategist.

I am submitting my Final Capstone Accounting Project in Tally Prime.
Here are my project details:

1. Chosen Industry Track: [Insert: Trading / Medical Store / Manufacturing / Service / Retail]
2. Company Name: [Insert Company Name]
3. Core Financial Figures:
   - Total Gross Revenue: [Insert Amount]
   - Gross Profit: [Insert Amount] (Gross Margin: [%])
   - Operating Expenses: [Insert Amount]
   - Net Profit: [Insert Amount] (Net Margin: [%])
   - Total Assets: [Insert Amount] | Total Liabilities: [Insert Amount]
   - Cash & Bank Balance: [Insert Amount]
   - Closing Inventory Valuation: [Insert Amount]
   - Sundry Debtors: [Insert Amount] | Sundry Creditors: [Insert Amount]
   - Total GST Paid (Net): [Insert Amount] | Total TDS Deposited: [Insert Amount]

Please perform an exhaustive Capstone Review and Executive Presentation:
1. Multi-Dimensional Forensic Audit:
   - Critique the financial ratios (Current Ratio, Quick Ratio, Debt-Equity, Asset Turnover).
   - Identify potential financial vulnerabilities, liquidity bottlenecks, or working capital strains.
2. Industry-Specific Scenario Stress-Testing:
   - What happens to cash flows if sales decline by 15% next quarter?
   - What happens if the top 2 debtors delay payments by 60 additional days?
3. Strategic Growth & Margin Expansion Roadmap:
   - Formulate 3 actionable strategies to boost Net Profit margin by 4-6%.
   - Suggest working capital improvements to shorten the cash conversion cycle.
4. Professional Capstone Evaluation & Scorecard:
   - Grade the accounting system architecture, statutory rigor, and commercial viability on a scale of 1 to 10 with detailed evaluator remarks."
---`,
    handsOnTask: "Select your Capstone Industry Track -> Build the complete company in Tally Prime from scratch -> Record 15 diverse transactions across Inventory, GST, TDS, Payroll, and Banking -> Complete BRS -> Extract full Financial Statements -> Generate the AI Boardroom Presentation.",
    assignment: `Final Project 2 Capstone Deliverable Dossier:
1. Capstone Project Selection & Setup:
   - Declare chosen industry scenario (Trading, Medical, Manufacturing, Service, Retail).
   - Submit Company Master configuration details and Chart of Accounts hierarchy.
2. Transaction Journal (15 Transactions Minimum):
   - Submit complete Day Book containing 15 distinct transactions covering procurement, sales, stock movement/BoM/batches, debit/credit notes, TDS expense, payroll, and banking.
3. Complete Financial Statements Pack:
   - Export and submit:
     • Balance Sheet (Horizontal and Vertical format)
     • Profit & Loss Account (with Gross & Net profit breakdown)
     • Trial Balance (Detailed view)
     • Stock Summary (with valuation method and godown/batch details)
     • Bank Reconciliation Statement (reconciled to ₹0 variance)
4. Statutory Tax Compliance Pack:
   - Export and submit:
     • GSTR-1 & GSTR-3B Summary
     • TDS Form 26Q Return Summary
     • Monthly Payroll Statement & Pay Slip
5. AI Boardroom Insights Presentation:
   - Submit the complete AI Forensic Audit, Stress-Testing analysis, and Executive Strategic Roadmap.`,
    quiz: [
      {
        q: "In a Medical Store accounting setup in Tally Prime, which specific feature is critical to ensure statutory drug safety compliance?",
        opts: ["Maintain Batch-wise Details with Manufacturing and Expiry Dates", "Cost Categories", "Bill of Materials", "Foreign Currency"],
        ans: 0,
        exp: "Batch-wise details with manufacturing and expiry dates are mandatory for pharmaceutical retail and wholesale to prevent dispensing expired medications."
      },
      {
        q: "For a Service Consulting firm in Tally Prime, what master code is used instead of HSN codes to classify services under GST?",
        opts: ["SAC (Service Accounting Code)", "BAR Code", "ISBN Code", "SKU Code"],
        ans: 0,
        exp: "SAC (Service Accounting Code) is used under Indian GST law to classify and determine tax rates for services."
      },
      {
        q: "In a Multi-Tier Trading business, how do Price Levels (e.g. Retail, Wholesale, Dealer) streamline sales billing?",
        opts: ["They automatically apply agreed discount rates and pricing based on the assigned customer category during invoice entry", "They increase taxes", "They change the font color", "They lock the bank account"],
        ans: 0,
        exp: "Price levels automatically fetch the pre-negotiated rate structure for retail, wholesale, or dealer customers, eliminating manual pricing errors."
      },
      {
        q: "What is the ultimate proof of mathematical accuracy in double-entry bookkeeping before preparing the Balance Sheet?",
        opts: ["The Trial Balance, where total debits must equal total credits", "The Employee Attendance register", "The Cheque Book cover", "The Company Logo"],
        ans: 0,
        exp: "A balanced Trial Balance (Total Debits = Total Credits) verifies the mathematical equilibrium of all posted ledger transactions."
      },
      {
        q: "How does combining Tally Prime proficiency with AI data analysis empower an accounting professional in the modern workplace?",
        opts: ["It transforms traditional bookkeeping into strategic financial leadership, enabling rapid error auditing, ratio diagnostics, and executive business insights", "It eliminates the need for accounting software", "It avoids paying statutory taxes", "It prints physical cash notes"],
        ans: 0,
        exp: "Pairing Tally Prime's precise accounting engine with AI analysis enables accountants to serve as strategic financial advisors and business leaders."
      }
    ],
    reflection: [
      "I have successfully built and managed a complete industry-specific accounting system from scratch in Tally Prime.",
      "I have mastered the full spectrum of Inventory, GST, TDS, Payroll, and Bank Reconciliation.",
      "I can generate, audit, and reconcile professional financial statements and statutory tax filings.",
      "I am confident in using AI to provide forensic audits, stress-testing, and strategic CFO-level business insights."
    ]
  }
};

// Aliases for backwards compatibility and project mapping
tallyDaysData.tally_project1 = tallyDaysData.tally_project1;
tallyDaysData.tally_project2 = tallyDaysData.day10;
tallyDaysData.tally_project3 = tallyDaysData.day15;
tallyDaysData.tally_project4 = tallyDaysData.day20;
tallyDaysData.tally_project5 = tallyDaysData.day25;
tallyDaysData.tally_project6 = tallyDaysData.day30;
tallyDaysData.tally_final_project = tallyDaysData.day31;
tallyDaysData.tally_prime_module1 = tallyDaysData.day1;
tallyDaysData.tally_prime_module2 = tallyDaysData.day2;
tallyDaysData.tally_prime_module3 = tallyDaysData.day3;
tallyDaysData.tally_prime_module4 = tallyDaysData.day4;
tallyDaysData.tally_prime_project1 = tallyDaysData.tally_project1;
tallyDaysData.tally_prime_module5 = tallyDaysData.day5;
tallyDaysData.tally_prime_module6 = tallyDaysData.day6;
tallyDaysData.tally_prime_module7 = tallyDaysData.day7;
tallyDaysData.tally_prime_module8 = tallyDaysData.day8;
tallyDaysData.tally_prime_module9 = tallyDaysData.day9;
tallyDaysData.tally_prime_project2 = tallyDaysData.day10;
tallyDaysData.tally_prime_module10 = tallyDaysData.day10;
tallyDaysData.tally_prime_module11 = tallyDaysData.day11;
tallyDaysData.tally_prime_module12 = tallyDaysData.day12;
tallyDaysData.tally_prime_module13 = tallyDaysData.day13;
tallyDaysData.tally_prime_module14 = tallyDaysData.day14;
tallyDaysData.tally_prime_project3 = tallyDaysData.day15;
tallyDaysData.tally_prime_module15 = tallyDaysData.day15;
tallyDaysData.tally_prime_module16 = tallyDaysData.day16;
tallyDaysData.tally_prime_module17 = tallyDaysData.day17;
tallyDaysData.tally_prime_module18 = tallyDaysData.day18;
tallyDaysData.tally_prime_module19 = tallyDaysData.day19;
tallyDaysData.tally_prime_project4 = tallyDaysData.day20;
tallyDaysData.tally_prime_module20 = tallyDaysData.day20;
tallyDaysData.tally_prime_module21 = tallyDaysData.day21;
tallyDaysData.tally_prime_module22 = tallyDaysData.day22;
tallyDaysData.tally_prime_module23 = tallyDaysData.day23;
tallyDaysData.tally_prime_module24 = tallyDaysData.day24;
tallyDaysData.tally_prime_project5 = tallyDaysData.day25;
tallyDaysData.tally_prime_module25 = tallyDaysData.day25;
tallyDaysData.tally_prime_module26 = tallyDaysData.day26;
tallyDaysData.tally_prime_module27 = tallyDaysData.day27;
tallyDaysData.tally_prime_module28 = tallyDaysData.day28;
tallyDaysData.tally_prime_module29 = tallyDaysData.day29;
tallyDaysData.tally_prime_project6 = tallyDaysData.day30;
tallyDaysData.tally_prime_module30 = tallyDaysData.day30;
tallyDaysData.tally_prime_final_project = tallyDaysData.day31;
tallyDaysData.tally_prime_module31 = tallyDaysData.day31;
