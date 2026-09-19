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
    title: "Day 11 — Purchase & Sales Order Processing: PO, SO, Delivery & Receipt Notes",
    objectives: [
      "Understand the complete 6-stage Commercial Order Processing cycle.",
      "Enable Order Processing in Company Features (F11).",
      "Record Purchase Orders (Ctrl + F9) and Receipt Notes / Goods Receipt Notes (Alt + F9).",
      "Record Sales Orders (Ctrl + F8) and Delivery Notes / Delivery Challans (Alt + F8).",
      "Track Rejections Inward and Rejections Outward and generate Pending Order Reports."
    ],
    explanation: `Order Processing in Tally Prime connects commercial purchase/sales agreements with inventory movements and financial billing. Recording orders (PO/SO) tracks commitments, delivery/receipt notes track physical inventory movements, and final invoices bill only verified quantities.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. The 6-Stage Commercial Order Lifecycle',
        content: '• Purchase Order (PO) Cycle:\n  1. Purchase Order (Ctrl + F9) -> Commitment to buy goods from supplier.\n  2. Receipt Note (Alt + F9) -> Physical goods arrive at godown (GRN).\n  3. Rejections Outward (Alt + F6) -> Returning damaged goods before billing.\n  4. Purchase Invoice (F9) -> Final financial bill from supplier.\n• Sales Order (SO) Cycle:\n  1. Sales Order (Ctrl + F8) -> Customer order received.\n  2. Delivery Note (Alt + F8) -> Physical goods dispatched to customer.\n  3. Rejections Inward (Ctrl + F6) -> Customer returns damaged items.\n  4. Sales Invoice (F8) -> Final tax invoice generated for delivered goods.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Enabling Order Processing & Tracking Numbers',
        content: '• Enable in F11: Set "Enable Purchase Order Processing" = YES and "Enable Sales Order Processing" = YES.\n• Tracking Numbers: When goods are received/dispatched before billing, Tally generates a Tracking Number. When you create the final invoice (F8/F9), selecting the Tracking Number autofills items, quantities, and rates automatically.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Orders vs. Delivery Notes vs. Invoices',
        leftTitle: 'Delivery Note (Alt + F8)',
        leftDesc: '• Reduces physical stock quantity from Godown.\n• Does NOT create an accounting debit/credit entry in ledger.\n• Creates a temporary "Goods Delivered but Not Billed" holding record.',
        rightTitle: 'Sales Invoice (F8)',
        rightDesc: '• Generates official legal Tax Invoice.\n• Records accounting revenue and debits Customer account.\n• Clears the temporary Delivery Note tracking record.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Pending Order Reports & Backlog Tracking',
        content: '• Sales Order Details: GOT -> Display More Reports -> Statement of Inventory -> Sales Order Details.\n• Purchase Order Details: Displays pending supplier orders.\n• Purchase Bills Pending: Tracks goods received via Receipt Note where the supplier invoice has not yet arrived.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Practice complete Sales Order Processing:
1. Press F11 -> Enable 'Sales Order Processing' = YES.
2. Go to Vouchers -> Press Ctrl+F8 (Sales Order) -> Order No: 'SO-101' -> Party: 'Murugan Traders' -> Item: 'Dell Monitor' -> Qty: 50 Nos @ ₹8,500/Nos.
3. Go to Vouchers -> Press Alt+F8 (Delivery Note) -> Select Order 'SO-101' -> Dispatch 30 Nos to customer.
4. Go to Vouchers -> Press F8 (Sales Invoice) -> Select Tracking No -> Tally autofills 30 Nos. Save invoice.
5. Go to GOT -> Display More Reports -> Statement of Inventory -> Sales Order Outstanding -> View remaining 20 Nos pending delivery.`,
    realWorldExample: `A wholesale electronics distributor receives a Sales Order for 100 laptops. Due to courier constraints, 60 laptops are shipped on Monday via Delivery Note #DN-01. The invoice is generated for 60 units. The remaining 40 laptops remain in Tally's Pending Orders report until dispatched on Friday.`,
    aiActivity: `AI Activity: Order Pipeline & Fulfillment Optimization

Copy and paste this prompt into your AI Assistant:
---
"Act as a Supply Chain Director and Tally Inventory Specialist.

Here is the pending order pipeline for 'Apex Logistics & Electronics':
• Open Sales Orders:
  1. Order #SO-501 (Client: TechZone): 200 Smart Tablets @ ₹12,000 (Order Date: 10-Apr | Promised Delivery: 18-Apr | Pending: 200 Units)
  2. Order #SO-502 (Client: Metro Systems): 50 Laser Printers @ ₹18,500 (Delivered: 35 Units | Pending: 15 Units)
• Open Purchase Orders:
  1. PO #PO-881 (Supplier: Samsung India): 250 Smart Tablets @ ₹9,200 (Expected Arrival: 15-Apr | Received: 0 Units)
  2. PO #PO-882 (Supplier: HP India): 30 Laser Printers @ ₹14,000 (Expected Arrival: 12-Apr | Received: 30 Units via GRN-101)

Please analyze this commercial workflow:
1. Identify any fulfillment bottlenecks for Client TechZone.
2. Explain the accounting status of the 30 HP Laser Printers received via GRN-101 prior to invoice receipt.
3. Formulate a 3-step action plan to clear pending backlogs and optimize working capital."
---`,
    handsOnTask: "Enable Order Processing in Tally Prime, record a Purchase Order, Receipt Note, Sales Order, Delivery Note, and convert to final Sales Invoice.",
    assignment: `Assignment: Complete 6-Stage Order Processing Workflow

Please record the following complete commercial workflow in Tally Prime:

1. Setup:
   - Enable Purchase & Sales Order Processing in F11.
   - Create Item 'Samsung 55-inch 4K TV' (Base Unit: Nos, Opening Qty: 0).
   - Create Supplier 'Samsung India Electronics' and Customer 'City Mall Electronics'.

2. Record Order Workflow:
   - Step 1: Record Purchase Order (Ctrl+F9) to Samsung India for 25 TVs @ ₹38,000/Nos (Order No: 'PO-2026-01').
   - Step 2: Record Receipt Note (Alt+F9) receiving 25 TVs into 'Main Warehouse' (Tracking No: 'GRN-01', Order: 'PO-2026-01').
   - Step 3: Record Purchase Invoice (F9) linking Tracking No 'GRN-01'. Total bill: ₹9,50,000.
   - Step 4: Record Sales Order (Ctrl+F8) from City Mall Electronics for 15 TVs @ ₹49,000/Nos (Order No: 'SO-2026-01').
   - Step 5: Record Delivery Note (Alt+F8) dispatching 10 TVs to City Mall (Tracking No: 'DN-01', Order: 'SO-2026-01').
   - Step 6: Record Sales Invoice (F8) linking Tracking No 'DN-01'. Total invoice: ₹4,90,000.

3. Reporting Deliverables:
   - Extract and submit the 'Sales Order Outstanding' report showing remaining 5 TVs pending delivery.
   - Extract and submit the Stock Summary showing closing stock balance of 15 TVs.`,
    quiz: [
      {
        q: "What is the shortcut key in Tally Prime to record a Purchase Order?",
        opts: ["Ctrl + F9", "Alt + F9", "F9", "F4"],
        ans: 0,
        exp: "Ctrl + F9 is the standard shortcut to create Purchase Orders in Tally Prime."
      },
      {
        q: "What is the function of a 'Tracking Number' in Tally Prime order processing?",
        opts: ["It links Delivery/Receipt Notes to final Sales/Purchase Invoices to automatically populate billed quantities", "It tracks GPS location of vehicles", "It tracks staff attendance", "It calculates income tax"],
        ans: 0,
        exp: "Tracking Numbers connect physical goods delivery/receipt vouchers to the final accounting tax invoice."
      },
      {
        q: "Does recording a Sales Order (Ctrl + F8) reduce physical stock quantities from the godown?",
        opts: ["No, Sales Orders record commercial commitments without altering physical stock until goods are dispatched", "Yes, stock is immediately deleted", "Only if paid in cash", "Only in Educational Mode"],
        ans: 0,
        exp: "Sales Orders record customer commitments; physical stock is only deducted upon recording a Delivery Note or Sales Invoice."
      },
      {
        q: "Which voucher is used when a customer physically returns damaged goods before the final invoice is issued?",
        opts: ["Rejections Inward (Ctrl + F6)", "Rejections Outward (Alt + F6)", "Receipt (F6)", "Journal (F7)"],
        ans: 0,
        exp: "Rejections Inward (Ctrl + F6) records physical customer goods returns against Delivery Notes before billing."
      },
      {
        q: "Where in Tally Prime can you inspect all customer sales orders that have not yet been delivered?",
        opts: ["Display More Reports -> Statement of Inventory -> Sales Order Details", "Gateway of Tally -> Balance Sheet", "Day Book", "Chart of Accounts"],
        ans: 0,
        exp: "Statement of Inventory -> Sales Order Details tracks pending backlogs and unfulfilled customer order balances."
      }
    ],
    reflection: [
      "I understand the 6-stage order-to-invoice commercial lifecycle.",
      "I can record PO, SO, Receipt Notes, Delivery Notes, and final Invoices.",
      "I know how to use Tracking Numbers to link dispatches to tax invoices.",
      "I completed the Order Processing Workflow assignment."
    ]
  },
  day12: {
    title: "Day 12 — Price Levels, Price Lists & Multi-Tier Discounts",
    objectives: [
      "Understand how multi-tier pricing strategies work for different customer categories.",
      "Enable Multiple Price Levels in Company Features (F11).",
      "Configure Price Lists with quantity-based tiered discount slabs.",
      "Assign Price Levels to Customer Ledgers.",
      "Execute automated billing with instant rate and discount population during invoicing."
    ],
    explanation: `Price Levels and Price Lists allow businesses to assign distinct pricing rules and quantity-based volume discount slabs for different customer segments (e.g. Wholesalers, Retailers, Dealers, Corporate Clients) without manual rate overrides.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What are Price Levels & Price Lists?',
        content: '• Price Level: The customer tier classification (e.g. "Wholesaler", "Retailer", "Corporate Partner").\n• Price List: A master table specifying the exact selling price and discount % for each stock item under a price level, based on quantity slabs (e.g. 1-10 units = ₹100; 11-50 units = ₹90 + 5% discount).\n• Why Use Them? Eliminates billing errors, speeds up counter invoicing, and enforces standardized sales pricing policies.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Configuring Price Levels & Price Lists in Tally',
        content: '1. Enable Feature: Press F11 -> Set "Enable Multiple Price Levels" = YES.\n2. Define Levels: GOT -> Create -> Price Levels -> Enter "Wholesale", "Retail", "Dealer".\n3. Create Price List: GOT -> Create -> Price List (Stock Group) -> Select Group & Price Level.\n4. Define Quantity Slabs:\n   • From 0 to 10 Nos: Rate ₹1,000 (0% Discount)\n   • From 10 to 50 Nos: Rate ₹950 (3% Discount)\n   • Greater than 50 Nos: Rate ₹900 (5% Discount).',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Wholesale vs. Retail Price Structure',
        leftTitle: 'Wholesale Price Level',
        leftDesc: '• Lower selling rates with higher volume thresholds.\n• Target: Bulk traders, distributors, and institutions.\n• Example: Paracetamol Box @ ₹180 for orders >50 Boxes.',
        rightTitle: 'Retail Price Level',
        rightDesc: '• Standard Maximum Retail Price (MRP).\n• Target: Walk-in counter consumers.\n• Example: Paracetamol Box @ ₹250 for orders 1-5 Boxes.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Assigning Price Levels & Invoicing Automation',
        content: '• In Customer Ledger Master: Set "Pricing Level Applicable" = "Wholesale".\n• During Sales Invoice (F8): Select customer -> Tally locks in Wholesale pricing automatically. When you enter Quantity, Tally applies the correct tiered rate and discount instantly without manual calculation.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Follow these steps to set up and test Price Lists:
1. Press F11 -> Set 'Enable Multiple Price Levels' = YES.
2. Go to Create -> Price Levels -> Create 'Wholesaler' and 'Retailer'.
3. Go to Create -> Price List (Stock Group) -> Select 'Smartphones' -> Price Level: 'Wholesaler'.
4. Set Slabs for 'Galaxy A15':
   - 0 to 5 Nos: Rate ₹12,000 (Disc: 0%)
   - 5 to 20 Nos: Rate ₹11,200 (Disc: 2%)
   - 20+ Nos: Rate ₹10,500 (Disc: 5%)
5. Create Customer 'Metro Electronics' under Sundry Debtors -> Set Price Level: 'Wholesaler'.
6. Record Sales Invoice (F8) for 25 Nos to Metro Electronics and observe automatic rate ₹10,500 and 5% discount application.`,
    realWorldExample: `A FMCG distributor sells laundry detergent. A small neighborhood shop buying 5 packets pays ₹120/packet (Retail Price). A supermarket chain buying 200 packets automatically gets ₹95/packet with an extra 4% volume rebate (Wholesale Price List). The billing operator never needs to remember individual deals.`,
    aiActivity: `AI Activity: Tiered Pricing Matrix & Margin Protection Audit

Copy and paste this prompt into your AI Assistant:
---
"Act as a Commercial Pricing Strategist and Tally Prime Consultant.

Here is our proposed multi-tier price matrix for an electronics distributor:
Cost Price of Item (Wireless Bluetooth Speaker): ₹600 / Unit

Proposed Price Levels:
1. Retail Tier (Walk-in / Direct):
   - 1 to 5 Units: Selling Price: ₹1,100 (Disc: 0%)
2. Dealer Tier (Local Electronics Shops):
   - 6 to 25 Units: Selling Price: ₹850 (Disc: 2%)
   - 26 to 50 Units: Selling Price: ₹800 (Disc: 4%)
3. Wholesale Master Tier (State Distributors):
   - 51 to 100 Units: Selling Price: ₹720 (Disc: 5%)
   - 101+ Units: Selling Price: ₹660 (Disc: 6%)

Please evaluate this pricing matrix:
1. Calculate the Gross Margin % realized under each quantity slab.
2. Identify if the '101+ Units' slab risks eroding gross margin below sustainable thresholds (Cost: ₹600 vs Net Price after 6% discount).
3. Recommend an optimized volume pricing structure to ensure minimum 15% net profit margin on wholesale bulk orders."
---`,
    handsOnTask: "Enable Price Levels in Tally Prime, create Wholesale and Retail price levels, configure quantity slabs for 2 items, and record test sales invoices.",
    assignment: `Assignment: Multi-Tier Price List Configuration & Invoicing

Please complete the following Price List setup and validation workflow in Tally Prime:

1. Enable Multiple Price Levels in F11.
2. Create 2 Price Levels: (a) 'Wholesaler', (b) 'Retailer'.
3. Create 3 Stock Items under Group 'Electronics':
   - Item 1: 'Fast Charging Power Bank 20000mAh' (Cost: ₹800)
   - Item 2: 'Noise Cancelling Wireless Headphones' (Cost: ₹1,500)
   - Item 3: 'Smart Fitness Band' (Cost: ₹1,100)
4. Configure Price Lists (Quantity Slabs):
   - For 'Wholesaler' Price Level:
     • Power Bank: 1-10 Nos @ ₹1,100 (0% Disc) | 11-30 Nos @ ₹1,000 (3% Disc) | >30 Nos @ ₹920 (5% Disc)
     • Headphones: 1-10 Nos @ ₹2,100 (0% Disc) | 11-20 Nos @ ₹1,950 (4% Disc) | >20 Nos @ ₹1,800 (6% Disc)
     • Smart Band: 1-10 Nos @ ₹1,500 (0% Disc) | 11-25 Nos @ ₹1,400 (3% Disc) | >25 Nos @ ₹1,300 (5% Disc)
   - For 'Retailer' Price Level:
     • Power Bank: Flat ₹1,350 (0% Disc)
     • Headphones: Flat ₹2,600 (0% Disc)
     • Smart Band: Flat ₹1,850 (0% Disc)
5. Record 3 Sales Invoices:
   - Invoice 1: Sold 25 Power Banks to Customer A (Wholesaler).
   - Invoice 2: Sold 2 Headphones to Customer B (Retailer).
   - Invoice 3: Sold 35 Headphones to Customer C (Wholesaler).
6. Submission Deliverables:
   - Submit the Price List table and the 3 generated Sales Invoices showing automatic rate and discount calculation.`,
    quiz: [
      {
        q: "What is the primary benefit of configuring Price Lists in Tally Prime?",
        opts: ["Automates selling rates and volume discount percentages based on order quantities and customer tiers", "Calculates payroll salaries", "Formats balance sheets in PDF", "Deletes expired stock"],
        ans: 0,
        exp: "Price Lists automate tiered pricing and discounts during sales invoicing based on customer classification and quantities."
      },
      {
        q: "Where in Tally Prime do you define customer classification tiers (e.g. Wholesale, Retail)?",
        opts: ["Gateway of Tally -> Create -> Price Levels", "Gateway of Tally -> Day Book", "Chart of Accounts", "Banking"],
        ans: 0,
        exp: "Gateway of Tally -> Create -> Price Levels allows creating customer tier names before configuring their price lists."
      },
      {
        q: "What happens during sales voucher entry when a customer with a designated Price Level is selected?",
        opts: ["Tally automatically locks in the assigned Price Level and applies the pre-set tiered rates and discount %", "Tally asks for admin password", "Tally creates a new ledger", "Tally resets item stock to zero"],
        ans: 0,
        exp: "Selecting a customer with an assigned price level automatically enforces that price list's rates and discounts."
      },
      {
        q: "Can different quantity slabs within the same Price List have differing discount percentages?",
        opts: ["Yes, Tally supports multi-tier quantity slabs with custom rates and discount percentages for each range", "No, discount must be identical for all quantities", "Only for service items", "Only in Journal vouchers"],
        ans: 0,
        exp: "Tally Prime supports flexible tiered quantity slabs (e.g. 1-10, 11-50, 51+) with custom rates and discounts per slab."
      },
      {
        q: "What is the difference between a Trade Discount in a Price List and a Cash Discount?",
        opts: ["Trade discounts are deducted directly on invoice quantity slabs; Cash discounts are financial incentives for early payment", "Trade discounts are for cash only", "Cash discounts increase purchase costs", "There is no difference"],
        ans: 0,
        exp: "Trade discounts adjust the invoice selling price based on volume, while cash discounts are recorded as nominal expenses for prompt payment."
      }
    ],
    reflection: [
      "I understand how multi-tier customer price levels operate.",
      "I can create Price Levels and configure quantity-based discount slabs.",
      "I know how to link price levels to customer ledgers for automated billing.",
      "I completed the Price Lists and Multi-Tier Discounts assignment."
    ]
  },
  day13: {
    title: "Day 13 — Bill of Materials (BOM) & Manufacturing Journal",
    objectives: [
      "Understand the fundamentals of assembly and manufacturing accounting.",
      "Enable Bill of Materials (BOM) in Stock Item configurations.",
      "Create finished goods with component raw materials, packaging, and scrap.",
      "Create and configure a dedicated Manufacturing Journal Voucher Type.",
      "Record manufacturing production runs and allocate additional operating costs (labor, electricity)."
    ],
    explanation: `Bill of Materials (BOM) in Tally Prime defines the exact list of raw materials, sub-assemblies, and packaging required to manufacture one unit of a finished product. Using a Manufacturing Journal, Tally automatically deducts raw materials from stock and produces the finished goods with added operational costs.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is a Bill of Materials (BOM)?',
        content: '• Bill of Materials (BOM): A recipe / formula for assembling a finished product.\n• Example for 1 Assembled Desktop PC:\n  → Motherboard: 1 No\n  → Intel i5 Processor: 1 No\n  → 16GB DDR4 RAM: 1 No\n  → 512GB NVMe SSD: 1 No\n  → 500W Power Supply Cabinet: 1 No\n• When you produce 10 PCs, Tally automatically consumes 10 of each component from the Raw Materials godown and adds 10 Desktop PCs to the Finished Goods godown.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Configuring BOM in Finished Stock Item Master',
        content: '1. Create Finished Good: GOT -> Create -> Stock Item -> e.g. "Assembled Gaming PC".\n2. Press F12 in Item Creation -> Set "Set Component List (Bill of Materials) in Stock Items" = YES.\n3. In BOM Configuration:\n   • BOM Name: "Standard Build"\n   • Unit of Manufacture: "1 Nos"\n   • Select Raw Material Items, Godowns, and Quantities required per unit.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Standard Stock Journal vs. Manufacturing Journal',
        leftTitle: 'Standard Stock Journal (Alt + F7)',
        leftDesc: '• Used for transferring stock between godowns (Source -> Destination).\n• Does not track operational production overheads or BOM recipes.\n• Quantities must be typed manually on both sides.',
        rightTitle: 'Manufacturing Journal (Dedicated Voucher)',
        rightDesc: '• Created under Stock Journal type with "Use as Manufacturing Journal" = YES.\n• Autofills all raw materials from BOM recipe.\n• Allocates additional manufacturing costs (Wages, Power, Depreciation) to final unit cost.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Allocating Additional Production Costs',
        content: 'At the bottom of the Manufacturing Journal:\n• Add Direct Wages (e.g. 5% of raw material cost or flat ₹2,000).\n• Add Factory Power & Fuel (e.g. ₹1,500).\n• Tally calculates: Total Cost of Production = Raw Material Cost + Additional Overheads, and determines the exact Effective Cost per finished unit.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Practice BOM & Manufacturing:
1. Create Raw Materials: 'CPU' (10 Nos @ ₹12,000), 'Motherboard' (10 Nos @ ₹6,000), 'RAM' (10 Nos @ ₹3,000).
2. Create Finished Item 'Desktop PC' -> Press F12 -> Enable BOM -> Create BOM 'Standard PC' for 1 Nos (1 CPU + 1 Motherboard + 1 RAM).
3. Create Voucher Type: GOT -> Create -> Voucher Type -> Name: 'Manufacturing Entry' -> Type: 'Stock Journal' -> Set 'Use as Manufacturing Journal' = YES.
4. Go to Vouchers -> Press Alt+F7 -> Select 'Manufacturing Entry' -> Select Product: 'Desktop PC' -> Qty: 5 Nos.
5. Notice all 5 CPUs, 5 Motherboards, and 5 RAMs autofill.
6. Under Additional Costs, add 'Direct Wages' ₹2,500 -> Save voucher and check Stock Summary.`,
    realWorldExample: `A commercial bakery produces 500 loaves of bread daily. Using BOM, 150kg Flour, 10kg Yeast, 8kg Sugar, and 5kg Butter are automatically deducted from the Store Room, ₹1,200 oven electricity is added, and 500 Bread Loaves are added to the Dispatch Counter at an exact cost of ₹18.40 per loaf.`,
    aiActivity: `AI Activity: BOM Costing & Production Yield Analysis

Copy and paste this prompt into your AI Assistant:
---
"Act as a Plant Manufacturing Accountant and Tally Production Specialist.

Here is the Bill of Materials (BOM) and production batch data for 'Nova Electronics Assembly':
Product: 1 Unit of 'Smart Solar Inverter 2.5kVA'

BOM Component List (per 1 Unit):
1. Microcontroller Circuit Board (1 No @ ₹2,200)
2. Pure Sine Wave Transformer (1 No @ ₹3,800)
3. Aluminum Heat Sink & Casing (1 No @ ₹1,100)
4. LCD Display & Interface Panel (1 No @ ₹650)
5. Heavy Duty Wiring Harness (1 Set @ ₹450)
6. Screws, Fasteners & Packaging Box (1 Set @ ₹200)

Production Batch Run: 50 Inverters
Additional Production Overhead Costs:
• Factory Assembly Labor: ₹18,000
• Quality Testing & Calibration: ₹7,500
• Machine Electricity & Overheads: ₹6,500

Please perform a production costing audit:
1. Calculate the Raw Material Cost per unit and Total Raw Material Cost for 50 units.
2. Calculate the Total Additional Cost and the final Effective Cost of Production per completed Inverter.
3. If the target Selling Price is ₹12,500 per unit, calculate the Gross Profit and Margin % earned per batch."
---`,
    handsOnTask: "Configure BOM for a manufactured product in Tally Prime, create a Manufacturing Journal voucher type, and record a production run with additional labor and power costs.",
    assignment: `Assignment: Bill of Materials Setup & Production Accounting

Please execute the following manufacturing workflow in Tally Prime:

1. Create Raw Materials (with opening stock in 'Raw Materials Godown'):
   - 'Wooden Planks' (100 Sq.ft @ ₹120/Sq.ft)
   - 'Steel Frame' (20 Nos @ ₹650/Nos)
   - 'Cushion Foam' (20 Sets @ ₹350/Set)
   - 'Fabric Upholstery' (50 Meters @ ₹180/Meter)
   - 'Assembly Screws & Fittings' (200 Sets @ ₹25/Set)

2. Create Finished Good with BOM:
   - Item Name: 'Ergonomic Executive Chair' (Under: Furniture / Unit: Nos).
   - Configure BOM 'Standard Executive Chair' for 1 Nos:
     • Wooden Planks: 4 Sq.ft
     • Steel Frame: 1 No
     • Cushion Foam: 1 Set
     • Fabric Upholstery: 2 Meters
     • Assembly Screws: 2 Sets

3. Create Manufacturing Voucher Type:
   - Name: 'Production Journal' (Type: Stock Journal / Use as Manufacturing Journal = YES).

4. Record Production Run:
   - Produce 15 'Ergonomic Executive Chairs' into 'Finished Goods Godown'.
   - Add Additional Overheads:
     • Carpenter Wages: ₹4,500
     • Factory Power & Polish: ₹2,250

5. Submission Deliverables:
   - Submit the Manufacturing Journal voucher display showing raw materials consumed, additional costs, and final effective cost per chair.
   - Submit the Stock Summary showing updated raw materials and finished chairs on hand.`,
    quiz: [
      {
        q: "What is the primary function of a Bill of Materials (BOM) in Tally Prime?",
        opts: ["It specifies the exact raw materials and packaging components required to manufacture a finished product", "It prints customer receipts", "It files income tax returns", "It calculates bank interest"],
        ans: 0,
        exp: "A BOM acts as the master component recipe defining the raw materials required to produce one unit of a finished product."
      },
      {
        q: "Which voucher type is customized in Tally Prime to record manufacturing and assembly runs with BOM?",
        opts: ["Stock Journal (with 'Use as Manufacturing Journal' = Yes)", "Payment Voucher (F5)", "Contra Voucher (F4)", "Journal Voucher (F7)"],
        ans: 0,
        exp: "A Stock Journal voucher type configured with 'Use as Manufacturing Journal = Yes' enables automated BOM assembly."
      },
      {
        q: "What happens to raw material inventories when a Manufacturing Journal is saved?",
        opts: ["Component raw materials are automatically deducted from stock, and finished goods are added to stock", "All stock is doubled", "Stock is converted to cash", "No inventory change occurs"],
        ans: 0,
        exp: "Manufacturing Journals automatically consume component raw materials and increase the stock of finished goods."
      },
      {
        q: "How are additional expenses (like factory electricity and labor wages) factored into manufactured goods in Tally?",
        opts: ["They are entered under Additional Costs in the Manufacturing Journal and increase the effective unit cost of finished goods", "They are ignored", "They reduce the number of finished goods", "They are deducted from capital"],
        ans: 0,
        exp: "Additional production overheads entered in the Manufacturing Journal are capitalized into the final unit cost of the finished product."
      },
      {
        q: "Where in Tally Prime can you enable the Bill of Materials feature during Stock Item creation?",
        opts: ["Press F12 (Configure) inside the Stock Item master screen", "Gateway of Tally -> Balance Sheet", "Day Book", "Alt + K -> Company"],
        ans: 0,
        exp: "Pressing F12 inside the Stock Item creation/alteration screen allows enabling 'Set Component List (Bill of Materials)'."
      }
    ],
    reflection: [
      "I understand how assembly and manufacturing workflows operate in Tally Prime.",
      "I can configure a Bill of Materials (BOM) with raw material recipes.",
      "I can create a Manufacturing Journal and allocate additional production overheads.",
      "I completed the Bill of Materials and Manufacturing Accounting assignment."
    ]
  },
  day14: {
    title: "Day 14 — Point of Sale (POS) Billing & Cash Counter Operations",
    objectives: [
      "Understand the workflow of retail Point of Sale (POS) counter billing.",
      "Create and configure a dedicated POS Invoice Voucher Type in Tally Prime.",
      "Handle multi-mode payments (Cash, Credit Card, Gift Voucher, Cheque / UPI).",
      "Configure POS print headers, footers, customer greetings, and barcode scanning.",
      "Generate daily Cashier Shift Registers and POS Register reports."
    ],
    explanation: `Point of Sale (POS) invoicing in Tally Prime enables fast, customer-facing retail billing at checkout counters. It supports barcode scanning, automated price lists, multiple split payment modes (Cash, Card, UPI, Gift Cards), and instant thermal receipt printing.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is POS Invoicing in Tally Prime?',
        content: '• POS (Point of Sale): Fast-paced retail billing system used in supermarkets, retail showrooms, pharmacies, and department stores.\n• Key POS Features in Tally:\n  → Single-screen billing with barcode scanning.\n  → Multi-Mode Payment: Split bill across Cash, Credit Card, Gift Card, and UPI.\n  → Auto Change Return calculation (Cash tendered vs change returned).\n  → Custom thermal receipt print format with shop headers and thank-you footers.',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. Creating & Configuring POS Voucher Type',
        content: '1. Create Voucher Type: GOT -> Create -> Voucher Type -> Name: "POS Invoice".\n2. Type of Voucher: Select "Sales".\n3. Set "Use for POS Invoicing" = YES.\n4. Configure Print Messages:\n   • Print Message 1: "Thank You! Visit Again!"\n   • Print Message 2: "Goods once sold cannot be returned without receipt."\n5. Default Title to Print: "RETAIL TAX INVOICE".',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'comparison',
        title: '3. Standard Sales (F8) vs. POS Invoicing',
        leftTitle: 'Standard Sales Invoice (F8)',
        leftDesc: '• Used for B2B wholesale credit sales.\n• Single party account debited (credit balance recorded).\n• Standard A4 invoice printing.\n• Detailed item specifications and transport details.',
        rightTitle: 'POS Invoice (Checkout Counter)',
        rightDesc: '• Used for B2C walk-in retail transactions.\n• Instant settlement across multi-payment modes (Cash, Card, UPI).\n• Fast thermal slip receipt printing.\n• Cash tendered and balance change calculated automatically.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. Multi-Mode Payment & Shift Closing',
        content: '• Multi-Mode Payment Fields:\n  → Gift Voucher: Select Gift Voucher Ledger & Amount.\n  → Credit/Debit Card: Select Bank Ledger, Card No, and Amount.\n  → Cheque/UPI: Enter Ref No & Amount.\n  → Cash: Enter Cash Tendered -> Tally displays "Balance Return" change.\n• POS Register: GOT -> Display More Reports -> Account Books -> POS Register. Reconciles daily cashier collections against physical cash in drawer.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Practice POS Billing:
1. Go to Create -> Voucher Type -> Name: 'Retail POS', Type: 'Sales', 'Use for POS Invoicing' = YES.
2. In POS Voucher screen, select Cashier, Godown 'Retail Counter', Price Level 'Retail'.
3. Scan / Select Items: 2 T-Shirts @ ₹600 + 1 Jeans @ ₹1,400 = Total ₹2,600.
4. Split Payment:\n   - Gift Voucher: ₹500\n   - Credit Card (HDFC): ₹1,500\n   - Cash Tendered: Customer gives ₹1,000 note -> Tally shows Cash ₹600 and 'Balance Return: ₹400'.
5. Press Enter to save and print receipt.
6. Check GOT -> Display More Reports -> Account Books -> POS Register to audit counter cash.`,
    realWorldExample: `A busy supermarket checkout processes 400 bills an hour. A customer purchasing ₹3,450 groceries pays with a ₹500 coupon, swipes ₹2,000 on debit card, and gives ₹1,000 cash. Tally calculates ₹50 change return in one second, prints the receipt, and updates inventory and all bank ledgers immediately.`,
    aiActivity: `AI Activity: Retail POS Cash Reconciliation & Fraud Audit

Copy and paste this prompt into your AI Assistant:
---
"Act as a Retail Operations Manager and Internal POS Auditor.

Here is the End-of-Day POS Cashier Shift Settlement Report for Counter #02 at 'City Lifestyle Store':
Shift Operator: Cashier Priya | Shift Time: 10:00 AM - 08:00 PM

POS System Sales Summary:
• Total POS Invoices Billed: 84 Transactions | Total Billed Revenue: ₹1,68,400
• Payment Mode Breakdown (Recorded by System):
  1. Credit / Debit Card (Swipe Machine EDC-01): ₹88,500 (38 transactions)
  2. UPI / QR Payments (HDFC Merchant Account): ₹42,200 (26 transactions)
  3. Gift Vouchers Redeemed: ₹8,000 (8 vouchers)
  4. Cash Sales (Expected in Drawer): ₹29,700 (12 transactions)

Physical Cash Drawer Audit at Shift Close:
• Opening Petty Cash Float: ₹2,000
• Total Physical Cash Counted in Drawer: ₹30,450
• Card EDC Batch Settlement Slip Total: ₹88,500 (Matched)
• Physical Gift Vouchers in Drawer: ₹8,000 (Matched)

Please execute the shift reconciliation:
1. Reconcile the physical cash in drawer against the expected cash (Accounting for the ₹2,000 opening float).
2. Determine if there is a Cash Shortage or Cash Overage in the drawer.
3. Provide a standard protocol for investigating drawer variance and preventing retail shrinkage."
---`,
    handsOnTask: "Create a POS Invoice voucher type in Tally Prime with custom print messages, record 3 multi-mode payment retail bills, and verify the daily POS Register.",
    assignment: `Assignment: Retail POS Counter Setup & Multi-Payment Operations

Please complete the following retail checkout counter workflow in Tally Prime:

1. Setup:
   - Create a dedicated Voucher Type 'Supermarket POS' (Type: Sales / Use for POS Invoicing = YES).
   - Configure Print Header: "ALPHA MEGA MART" and Footer: "Thank You! Please Visit Again!".
   - Create Stock Items with retail pricing:
     • 'Basmati Rice 5kg' (Rate: ₹450)
     • 'Sunflower Cooking Oil 1L' (Rate: ₹140)
     • 'Milk Chocolate Box' (Rate: ₹220)
     • 'Organic Green Tea' (Rate: ₹180)

2. Record 4 Retail POS Transactions:
   - Bill 1: Customer buys 2 Rice + 3 Oil = ₹1,320. Paid 100% Cash (Cash tendered: ₹2,000 note -> Return change: ₹680).
   - Bill 2: Customer buys 4 Chocolates + 2 Green Tea = ₹1,240. Paid 100% Credit Card (HDFC Bank EDC).
   - Bill 3: Customer buys 1 Rice + 2 Oil + 2 Chocolates = ₹1,170. Split Payment: ₹300 Gift Voucher + ₹870 UPI / Net Banking.
   - Bill 4: Customer buys 3 Rice + 4 Oil + 5 Chocolates = ₹3,010. Split Payment: ₹1,500 Card + ₹1,510 Cash (Cash tendered: ₹2,000 -> Return change: ₹490).

3. Submission Deliverables:
   - Submit the POS Invoice print preview display.
   - Submit the POS Register report showing breakdown of total collections across Cash, Card, UPI, and Gift Vouchers.`,
    quiz: [
      {
        q: "What is the primary operational advantage of using POS Invoicing in Tally Prime for retail stores?",
        opts: ["Fast single-screen counter billing with multi-mode payment splits and instant thermal receipt printing", "It files tax returns with government automatically", "It orders raw materials without human approval", "It calculates corporate dividends"],
        ans: 0,
        exp: "POS invoicing accelerates retail checkouts with barcode scanning, split payments, and thermal receipt generation."
      },
      {
        q: "How is a dedicated POS Invoice voucher type created in Tally Prime?",
        opts: ["Gateway of Tally -> Create -> Voucher Type -> Set Type as 'Sales' and 'Use for POS Invoicing' = Yes", "Gateway of Tally -> Day Book", "Chart of Accounts", "Banking"],
        ans: 0,
        exp: "Creating a Sales-type voucher with 'Use for POS Invoicing = Yes' activates the specialized POS checkout interface."
      },
      {
        q: "What happens when you enter 'Cash Tendered' in the POS payment screen?",
        opts: ["Tally automatically calculates and displays the exact 'Balance Return' (change) to give back to the customer", "Tally deletes the bill", "Tally charges 10% penalty", "Tally opens bank account"],
        ans: 0,
        exp: "Tally calculates the exact change to return to the customer when the received cash amount is entered."
      },
      {
        q: "Which payment modes can be processed together in a single POS transaction in Tally Prime?",
        opts: ["Gift Vouchers, Credit/Debit Cards, Cheque/UPI, and Cash simultaneously", "Only pure cash", "Only bank cheques", "Only credit vouchers"],
        ans: 0,
        exp: "Tally's multi-mode payment feature allows splitting a single customer bill across Gift Vouchers, Cards, UPI, and Cash."
      },
      {
        q: "Where in Tally Prime can the store manager audit total daily sales collected by each cashier counter?",
        opts: ["Display More Reports -> Account Books -> POS Register", "Gateway of Tally -> Balance Sheet", "Trial Balance", "Alt + K -> Company"],
        ans: 0,
        exp: "The POS Register provides a chronological breakdown of all POS invoices, cashiers, and payment mode totals."
      }
    ],
    reflection: [
      "I understand how retail Point of Sale (POS) counter billing works.",
      "I can configure a POS Invoice voucher type with custom receipt headers and footers.",
      "I can process multi-mode split payments (Cash, Card, UPI, Gift Vouchers).",
      "I completed the POS Billing and Cash Counter Operations assignment."
    ]
  },
  day15: {
    title: "Day 15 — 🟦 Mini Project 3: Manufacturing & Supermarket Billing",
    objectives: [
      "Set up an integrated assembly, packaging, and retail supermarket business: 'Alpha Supermarket & Assembly Hub'.",
      "Configure Bill of Materials (BOM) to manufacture and package retail combo gift hampers.",
      "Implement Multi-Tier Price Lists (Wholesale vs Retail counter customers).",
      "Configure POS Checkout billing counters with multi-mode payment settlement.",
      "Extract integrated Production Costing and Daily POS Sales Register statements."
    ],
    explanation: `Mini Project 3 simulates operating 'Alpha Supermarket & Assembly Hub'. You will assemble and package custom gift hampers using BOM, configure multi-tier wholesale and retail price lists, and operate high-speed POS checkout counters.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. Project Scenario: Alpha Supermarket & Assembly Hub',
        content: 'Alpha Supermarket operates a high-volume retail grocery store and a specialized gift packaging division in Theni. The business:\n• Procures bulk raw food items and packaging materials.\n• Assembles "Festive Dry Fruit Gift Hampers" using BOM and Manufacturing Journals.\n• Sells individual grocery items to retail walk-in customers using POS checkout counters.\n• Sells bulk hampers to corporate clients using Wholesale Price Lists.',
        icon: 'Briefcase',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. BOM Recipe & Manufacturing Specifications',
        content: 'Product to Assemble: "Festive Luxury Gift Hamper" (1 Box):\n• Almonds Premium (250g)\n• Cashews W240 (250g)\n• Pistachios Roasted (250g)\n• Ferrero Rocher Chocolates (1 Pack)\n• Decorative Cane Basket & Satin Ribbon (1 Set)\n• Additional Overhead: ₹40 Labor Assembly + ₹15 Packaging.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'card',
        title: '3. Multi-Tier Price List Matrix',
        content: '• Retail Counter Price: Flat ₹1,450 per Hamper (for 1 to 5 units).\n• Corporate Wholesale Price: ₹1,200 per Hamper for orders 10-50 units; ₹1,120 + 3% discount for orders >50 units.',
        icon: 'RefreshCw',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.03)'
      },
      {
        type: 'card',
        title: '4. POS Counter Operations & Deliverables',
        content: '• Fast checkout billing with thermal receipts.\n• Multi-mode payments: Gift Vouchers, Credit Cards, UPI, and Cash with change return.\n• Shift closing reconciliation with physical cash drawer audits.',
        icon: 'Sliders',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Full Workflow Walkthrough for Mini Project 3:
1. Create Company 'Alpha Supermarket & Assembly Hub', State: 'Tamil Nadu'.
2. Enable BOM, Manufacturing Journal, Price Levels, and POS Invoicing in F11.
3. Record bulk raw material purchases into 'Raw Materials Godown'.
4. Execute a Manufacturing Journal production run assembling 50 Gift Hampers into 'Finished Goods Godown'.
5. Record wholesale sales of 25 Hampers to a corporate client using Wholesale Price List.
6. Record 5 retail POS counter bills with multi-mode payment splits.
7. Generate Stock Summary, POS Register, and Profit & Loss statement.`,
    realWorldExample: `During festival season, Alpha Supermarket produces 500 Gift Hampers. Corporate clients receive tiered wholesale pricing with 30-day credit terms, while 300 walk-in shoppers purchase hampers and groceries at POS counters. Tally handles the entire production-to-retail lifecycle seamlessly.`,
    aiActivity: `AI Challenge: Retail Margins & Production Yield Audit

Copy and paste this prompt into your AI Assistant:
---
"Act as a Retail Operations Consultant and Manufacturing Cost Auditor.

I am completing Mini Project 3: Assembly & Supermarket Billing for 'Alpha Supermarket & Assembly Hub'.
Here is our operational summary:

1. Manufacturing Batch Data:
   - Total Raw Materials Consumed for 50 Hampers: ₹42,500 (₹850 per unit)
   - Additional Labor & Packaging Overheads: ₹2,750 (₹55 per unit)
   - Total Effective Cost of Production: ₹45,250 (₹905 per unit)
2. Sales Realization:
   - Wholesale B2B Sales: 30 Hampers sold to Corporate Client @ ₹1,150/unit = ₹34,500
   - Retail POS Counter Sales: 15 Hampers sold to walk-in customers @ ₹1,450/unit = ₹21,750
   - Unsold Closing Stock: 5 Hampers in store
3. POS Counter Metrics:
   - 45 Retail Grocery Bills processed | Total Counter Revenue: ₹68,400 (Card: 55%, UPI: 30%, Cash: 15%)

Please perform an executive commercial review:
1. Calculate the Gross Profit and Gross Margin % achieved on Wholesale Sales vs Retail POS Sales.
2. Analyze why Retail POS margins are significantly higher and evaluate if marketing spend should pivot toward retail shoppers.
3. Provide 3 recommendations to optimize checkout speed and reduce raw material wastage during assembly."
---`,
    handsOnTask: "Create 'Alpha Supermarket & Assembly Hub' in Tally Prime, configure BOM, execute a production run, setup price levels, record retail POS bills, and extract the project reports.",
    assignment: `Assignment: Mini Project 3 — Complete Assembly & Retail Submission

Please execute and submit the complete project deliverables for 'Alpha Supermarket & Assembly Hub':

Part A: Master Setup & BOM Configuration:
- Document the raw materials master, finished hamper BOM recipe, and Price List matrix.

Part B: Production & Transaction Log (Record the following workflow):
1. Purchased raw materials: Almonds (25kg @ ₹700/kg), Cashews (25kg @ ₹800/kg), Pistachios (25kg @ ₹900/kg), Chocolate Boxes (50 @ ₹180), Basket sets (50 @ ₹120).
2. Recorded Manufacturing Journal producing 40 'Festive Luxury Hampers' with ₹2,000 labor overhead.
3. Sold 20 Hampers on credit to 'Tata Consultancy Office' @ ₹1,200/unit (Wholesale Price List / F8).
4. Processed 3 POS Counter Bills:
   - Bill 1: Customer bought 2 Hampers @ ₹1,450 = ₹2,900 (Paid via Credit Card).
   - Bill 2: Customer bought 1 Hamper + ₹650 Groceries = ₹2,100 (Paid ₹500 Gift Voucher + ₹1,600 UPI).
   - Bill 3: Customer bought 1 Hamper = ₹1,450 (Paid Cash: ₹2,000 note -> Return change: ₹550).

Part C: Project Deliverables:
1. Submit the Manufacturing Journal production sheet showing unit cost.
2. Submit the POS Register report showing daily shift collections across all payment modes.
3. Submit the final Profit & Loss Account showing Gross Profit and Net Profit.`,
    quiz: [
      {
        q: "In an integrated manufacturing and retail business, what is the sequence of operations in Tally Prime?",
        opts: ["Procure Raw Materials -> Record BOM Production in Manufacturing Journal -> Sell via Wholesale Invoices or POS Counters", "Sell goods before manufacturing them", "Delete raw materials", "Only record cash receipts"],
        ans: 0,
        exp: "The standard workflow flows from raw material procurement to BOM production assembly, and finally distribution via wholesale or POS channels."
      },
      {
        q: "Why is POS Invoicing preferred for retail supermarket counters rather than standard F8 sales?",
        opts: ["It supports multi-mode payment splits, barcode scanning, change return calculation, and fast thermal receipts", "It calculates raw material BOM", "It requires no stock", "It closes the financial year"],
        ans: 0,
        exp: "POS invoicing is optimized for fast customer-facing retail checkouts with split payments and instant thermal slips."
      },
      {
        q: "What does the effective cost per unit in a Manufacturing Journal represent?",
        opts: ["Total raw material component cost plus added direct labor and factory overheads divided by finished units produced", "The customer selling price", "The government tax rate", "The supplier discount"],
        ans: 0,
        exp: "Effective cost per unit represents the total capitalized manufacturing cost (materials + overheads) per finished item."
      },
      {
        q: "How do Wholesale Price Lists benefit corporate sales management?",
        opts: ["They enforce automated volume discount agreements without manual operator intervention during billing", "They increase tax payments", "They stop credit sales", "They convert items to scrap"],
        ans: 0,
        exp: "Price Lists enforce consistent contractual pricing and quantity-based discounts automatically during invoicing."
      },
      {
        q: "What is the key deliverable audited at the end of every cashier shift in a supermarket POS counter?",
        opts: ["The POS Register reconciling physical cash and card EDC slips against system billed totals", "The Company Constitution", "The Fixed Asset Register", "The Vendor Ledger"],
        ans: 0,
        exp: "The POS Register reconciles physical drawer cash and electronic batch settlements against system totals to prevent shrinkage."
      }
    ],
    reflection: [
      "I can integrate Bill of Materials manufacturing with retail POS counter operations.",
      "I can formulate multi-tier wholesale and retail price lists.",
      "I can operate and audit retail POS checkout counters with split payments.",
      "I completed Mini Project 3: Manufacturing & Supermarket Billing."
    ]
  },
  day16: {
    title: "Day 16 — Inventory Basics: Stock Groups, Categories, Items & Units",
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
  day17: {
    title: "Day 17 — Godown & Batch Management: Multi-Location, Batches & Expiry",
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
  day18: {
    title: "Day 18 — Inventory Transactions: Purchases, Sales & Stock Movement",
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
  day19: {
    title: "Day 19 — Inventory Analysis: Stock Summary, Movement & Velocity",
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
  day20: {
    title: "Day 20 — 🟦 Mini Project 4: Medical Store Inventory",
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

I am completing Mini Project 4: Medical Store Inventory for 'Health Medical Store'. 
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
    assignment: `Assignment: Mini Project 4 — Health Medical Store Complete Inventory Submission

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
  }
};

// Aliases for backwards compatibility and project mapping
tallyDaysData.tally_project1 = tallyDaysData.tally_project1;
tallyDaysData.tally_project2 = tallyDaysData.day10;
tallyDaysData.tally_project3 = tallyDaysData.day15;
tallyDaysData.tally_project4 = tallyDaysData.day20;
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