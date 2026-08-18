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
        opts: ["Ctrl+S", "Ctrl+A", "Alt+C", "F11"],
        ans: 1
      },
      {
        q: "Under Golden Rules, what is the rule for Real Accounts (like Cash or Furniture)?",
        opts: ["Debit the receiver, Credit the giver", "Debit what comes in, Credit what goes out", "Debit all expenses, Credit all incomes", "Debit increase, Credit decrease"],
        ans: 1
      },
      {
        q: "Which state must be selected during company creation for businesses operating in Theni?",
        opts: ["Kerala", "Karnataka", "Tamil Nadu", "Delhi"],
        ans: 2
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
        opts: ["15", "28", "13", "30"],
        ans: 1
      },
      {
        q: "Under which folder (group) should a savings bank account ledger go?",
        opts: ["Capital Account", "Bank Accounts (under Current Assets)", "Fixed Assets", "Indirect Expenses"],
        ans: 1
      },
      {
        q: "What is the shortcut key to delete a group in the Alteration screen?",
        opts: ["Alt+C", "Alt+D", "Ctrl+D", "Delete"],
        ans: 1
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
        q: "Which ledger is already created by default in Tally Prime?",
        opts: ["Rent A/c", "Cash A/c", "SBI Bank A/c", "Sales A/c"],
        ans: 1
      },
      {
        q: "Under which folder (group) does HDFC Bank Overdraft go?",
        opts: ["Bank Accounts", "Bank OD A/c (Loans Liability)", "Fixed Assets", "Direct Expenses"],
        ans: 1
      },
      {
        q: "What key shortcut deletes a ledger from the Alteration screen?",
        opts: ["Ctrl+D", "Alt+D", "Delete", "F7"],
        ans: 1
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
    title: "Voucher Types & Chart of Accounts",
    objectives: [
      "Understand what a Voucher is in simple terms.",
      "Identify the 6 core voucher types (Contra, Payment, Receipt, Journal, Sales, Purchase).",
      "Learn the step-by-step voucher entry workflow.",
      "View and navigate the Chart of Accounts hierarchical tree."
    ],
    explanation: `A Voucher is the electronic form used to record daily transactions. The Chart of Accounts shows all your folders (Groups) and account pages (Ledgers) in one screen.`,
    explanationSections: [
      {
        type: 'intro',
        title: '1. What is a Voucher?',
        content: 'A Voucher is like a digital receipt page in Tally. Instead of putting all records in one big list, Tally uses separate Voucher Types to keep transactions organized (e.g. putting sales in one box and bank deposits in another).',
        icon: 'BookOpen',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.03)'
      },
      {
        type: 'card',
        title: '2. The 6 Main Vouchers in Tally',
        content: '• F4 (Contra): Internal money transfers (Cash deposit to bank, bank withdrawals, or SBI to HDFC bank transfer).\n• F5 (Payment): Outflow of money (paying bills, buying equipment, or paying suppliers).\n• F6 (Receipt): Inflow of money (owner investing cash, customer paying bills, or receiving bank interest).\n• F7 (Journal): Non-cash adjustments (like depreciation or purchasing computers on credit).\n• F8 (Sales): Recording invoice sales of stock or services.\n• F9 (Purchase): Recording purchases of inventory items from suppliers.',
        icon: 'ClipboardList',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.03)'
      },
      {
        type: 'card',
        title: '3. Chart of Accounts & Voucher Workflow',
        content: '• Chart of Accounts (COA): Shows all your folders and pages on one screen (GOT -> Chart of Accounts -> Ledgers).\n• Voucher Entry Workflow:\n  1. Go to GOT -> Vouchers (press V).\n  2. Press F4 to F9 to choose voucher type.\n  3. Press F2 to set date.\n  4. Choose Debit/Credit accounts and enter amount.\n  5. Write a small description note (Narration) at the bottom.\n  6. Press Ctrl+A to save.',
        icon: 'Briefcase',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.03)'
      }
    ],
    demonstration: `Try these steps:
1. Go to Gateway of Tally -> Vouchers (Shortcut: press V).
2. Press F4 to switch to Contra, F5 for Payment, F6 for Receipt.
3. In Payment voucher, press Ctrl+H (Change Mode) and select 'Double Entry' to view Debit/Credit columns.
4. Press Esc, go to GOT -> Chart of Accounts -> Ledgers to view your accounts tree.`,
    realWorldExample: `A shop owner deposits ₹20,000 cash into SBI. Since this is an internal cash-to-bank transfer, the accountant opens Vouchers -> presses F4 (Contra) -> credits Cash ₹20,000 and debits SBI Bank ₹20,000.`,
    aiActivity: `AI Voucher Selection Challenge:
Copy and paste this prompt into your AI Assistant:
---
"Act as a friendly Tally tutor. Let's play the AI Voucher Selection Challenge.
Give me 5 business transactions one-by-one, and challenge me to identify the correct Tally voucher (Contra F4, Payment F5, Receipt F6, Journal F7, Sales F8, or Purchase F9) for each."
---`,
    handsOnTask: "Open Tally, go to Vouchers, test the shortcuts F4 to F9, toggle the Double Entry mode with Ctrl+H, and check the Chart of Accounts ledger list.",
    assignment: `Please complete the following Voucher tasks:

Part A: Select the correct Tally Prime Voucher Type (Contra F4, Payment F5, Receipt F6, Journal F7, Sales F8, or Purchase F9) for these 10 transactions:
1. Deposited cash ₹100,000 into SBI current account.
2. Paid office rent ₹8,000 in cash.
3. Owner introduced cash capital ₹300,000.
4. Purchased office computers for ₹45,000 from Dell India Ltd on credit.
5. Sold goods for cash ₹25,000.
6. Sold goods to customer Kumar on credit for ₹15,000.
7. Purchased goods for cash ₹18,000.
8. Purchased goods from supplier Suresh on credit for ₹30,000.
9. Paid electricity charges ₹3,500 by bank check.
10. Received a bank check of ₹12,000 from customer Kumar on account.

Part B: Enter 10 Purchase + 10 Sales transactions:
Create a list of 10 purchase transactions (F9) and 10 sales transactions (F8) using the Educational Mode dates (1st, 2nd, 31st). Write down the debits, credits, and narration for each.`,
    quiz: [
      {
        q: "Which voucher type is used to record depreciation on machinery?",
        opts: ["Contra (F4)", "Payment (F5)", "Journal (F7)", "Receipt (F6)"],
        ans: 2
      },
      {
        q: "What is the pathway to view the Chart of Accounts in Tally Prime?",
        opts: ["Gateway of Tally -> Vouchers", "Gateway of Tally -> Chart of Accounts", "Gateway of Tally -> Alter", "Alt+K -> Chart"],
        ans: 1
      },
      {
        q: "Which voucher type is used when transferring money from cash box to bank account?",
        opts: ["Receipt (F6)", "Journal (F7)", "Contra (F4)", "Payment (F5)"],
        ans: 2
      }
    ],
    reflection: [
      "I know what a Voucher is and why separate voucher types are used.",
      "I know the F-keys to switch between voucher modes.",
      "I can navigate the Chart of Accounts tree.",
      "I completed the assignment classifying 10 vouchers and drafting 20 entries."
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
        ans: 0
      },
      {
        q: "Under which folder (group) should Murugan (Customer) ledger be classified?",
        opts: ["Sundry Creditors", "Sundry Debtors", "Loans (Liability)", "Current Liabilities"],
        ans: 1
      },
      {
        q: "What is the total check deposit voucher code if you transfer cash between bank accounts?",
        opts: ["Payment (F5)", "Contra (F4)", "Receipt (F6)", "Journal (F7)"],
        ans: 1
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
        q: "Which voucher type is used for moving money from HDFC bank to SBI bank?",
        opts: ["Contra (F4)", "Payment (F5)", "Journal (F7)", "Receipt (F6)"],
        ans: 0
      },
      {
        q: "Which voucher is used to record drawings (withdrawing cash for personal use)?",
        opts: ["Receipt (F6)", "Payment (F5)", "Contra (F4)", "Journal (F7)"],
        ans: 1
      }
    ],
    reflection: [
      "I can post bank deposits, withdrawals, and bank-to-bank transfers.",
      "I can enter adjustment entries in Journal voucher.",
      "I completed the 20 mixed entries practice assignment."
    ]
  }
};