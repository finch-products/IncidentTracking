import { CaseDetail } from 'src/dto/case-detail.dto';
import { Document, Branch, Notice } from './model/dashboard.model';
import { Employee } from 'src/dto/employee.dto';

export const mockDocuments: Document[] = [
  { id: 1, title: 'Doc 1', sentOn: '2023-11-01', branchId: 1, acknowledged: false, seen: false },
  { id: 2, title: 'Doc 2', sentOn: '2023-11-01', branchId: 2, acknowledged: true, seen: true },
  { id: 3, title: 'Doc 3', sentOn: '2023-11-02', branchId: 1, acknowledged: false, seen: true },
  { id: 1, title: 'Doc 1', sentOn: '2023-11-02', branchId: 1, acknowledged: false, seen: false },
  { id: 2, title: 'Doc 2', sentOn: '2023-11-02', branchId: 2, acknowledged: true, seen: true },
  { id: 3, title: 'Doc 3', sentOn: '2023-11-02', branchId: 1, acknowledged: false, seen: true },
  { id: 4, title: 'Doc 4', sentOn: '2023-11-02', branchId: 1, acknowledged: false, seen: false },
];

export const mockBranches: Branch[] = [
  { id: 1, name: 'Bellandur', confirmed: false, location: 'Mahadevpura' , city: 'Bengaluru', state: 'Karnataka' },
  { id: 2, name: 'Marathali', confirmed: true,  location: 'Whitefeild' , city: 'Bengaluru', state: 'Karnataka' },
  { id: 3, name: 'Gandhi Road', confirmed: false,  location: 'Hebbal' , city: 'Bengaluru', state: 'Karnataka' },
];


export const notices: Notice[] = [
  { branchId: 1, status: 'pending',  seen: false, confirmed: false, title: 'Common Notice',  url: 'assets/notices/notice-1.jpeg'  },
  { branchId: 1, status: 'confirmed', seen: true, confirmed: true, title: 'Common Notice',  url: 'assets/notices/notice-2.jpeg' },
  { branchId: 2, status: 'pending',  seen: false, confirmed: false, title: 'Common Notice',  url: 'assets/notices/notice-3.jpeg' },
  { branchId: 2, status: 'pending',  seen: true, confirmed: false, title: 'Branch Specific Notice',  url: 'assets/notices/notice-2.jpeg' },
  { branchId: 2, status: 'pending',  seen: false, confirmed: false, title: 'Branch Specific Notice',  url: 'assets/notices/notice-3.jpeg' },
  { branchId: 2, status: 'pending',  seen: false, confirmed: false, title: 'Branch Specific Notice',  url: 'assets/notices/notice-2.jpeg' }
];

export const noticeCount = [
  {
    date: '2023-11-02',
    documents: [
      { title: 'Branch Specific Notice', url: 'assets/notices/notice-1.jpeg' },
      { title: 'Branch Specific Notice', url: 'assets/notices/notice-2.jpeg' },
      { title: 'Common Notice', url: 'assets/notices/notice-4.jpg' }
    ]
  },
  {
    date: '2023-11-03',
    documents: [
      { title: 'Common Notice', url: 'assets/notices/notice-3.jpeg' },
      { title: 'Common Notice', url: 'assets/notices/notice-1.jpeg' }
    ]
  },
  {
    date: '2023-11-04',
    documents: [
      { title: 'Common Notice', url: 'assets/notices/notice-1.jpeg' }
    ]
  }
];

export const cases: CaseDetail[] = [
  // { caseNo: 'ab789', desc: 'Desc 1', empNo: '1235', name: 'Swathi', department: 'Department A', city: 'Bengaluru', building: 'Whitefeild', details: 'Details 1', reportedOn: '2024-01-05', closedOn: '2024-03-05', status: 'closed' },
  // { caseNo: 'cd456', desc: 'Desc 2', empNo: '1236', name: 'John', department: 'Department B', city: 'New York', building: 'Empire', details: 'Details 2', reportedOn: '2024-02-15', closedOn: '2024-03-10', status: 'closed' },
  // { caseNo: 'ef123', desc: 'Desc 3', empNo: '1237', name: 'Doe', department: 'Department C', city: 'London', building: 'Canary Wharf', details: 'Details 3', reportedOn: '2024-01-20', closedOn: '', status: 'open' },
  // Add more entries here...
];

// Employee numbers and the respective number of cases
const employeeCases = [
  { empNo: '1235', count: 4 },
  { empNo: '1236', count: 5 },
  { empNo: '1237', count: 2 },
  { empNo: '1238', count: 1 },
  { empNo: '1239', count: 10 },
  { empNo: '1240', count: 6 },
  { empNo: '1241', count: 4 },
  { empNo: '1242', count: 7 },
  { empNo: '1243', count: 6 },
  { empNo: '1244', count: 5 },
];


const departments: any[] = [
  { name: 'Department A' },
  { name: 'Department B' },
  { name: 'Department C' },
  { name: 'Department D' },
  { name: 'Department E' },
  { name: 'Department F' },
  { name: 'Department G' },
];

export const employees: Employee[] = []

// departmentName: string;
//     branchName: string;
//     reporter: Employee;
//     reportedOn: Date;
//     closedOn?: Date;
//     subject: string;
//     description: string;
//     employeeInvolved: Employee[];
let subjects = [
  "Important: Your Account Security Alert",
  "Urgent: Verify Your Recent Transactions",
  "Action Required: Suspicious Activity Detected",
  "Your Account Has Been Compromised",
  "Confirm Your Identity to Avoid Account Lock",
  "Unauthorized Access Detected: Take Action Now",
  "Alert: Unusual Login Attempt Detected",
  "Your Account Is Under Review: Verify Now",
  "Your Account Is Under Surveillance: Take Action",
  "Your Account Is In Danger: Take Immediate Action",
  "Warning: Your Account Is At Risk of Fraud",
  "Immediate Action Required: Verify Your Account",
  "Critical: Your Account May Be Compromised",
  "Emergency: Secure Your Account Immediately",
  "Account Compromised: Take Immediate Action",
  "Security Breach: Confirm Your Account Information",
  "Unauthorized Login Attempt: Verify Your Account",
  "Warning: Your Account May Be Compromised",
  "Immediate Attention Required: Verify Your Account",
  "Immediate Attention Required: Verify Your Account",
  "Your Account Is Under Investigation: Verify Now",
  "Urgent: Unauthorized Transaction Detected",
  "Security Breach Detected: Immediate Action Required",
  "Account Compromised: Take Immediate Action",
  "Unauthorized Access Detected: Immediate Action Required",
  "Verify Your Account: Suspicious Activity Detected",
  "Security Breach Detected: Immediate Action Required",
  "Account Compromised: Take Immediate Action",
  "Security Breach: Confirm Your Account Information",
  "Unauthorized Login Attempt: Verify Your Account",
  "Warning: Your Account May Be Compromised",
  "Immediate Attention Required: Verify Your Account",
  "Immediate Attention Required: Verify Your Account",
  "Your Account Is Under Investigation: Verify Now",
  "Urgent: Unauthorized Transaction Detected",
  "Security Breach Detected: Immediate Action Required",
  "Account Compromised: Take Immediate Action",
  "Unauthorized Access Detected: Immediate Action Required",
  "Verify Your Account: Suspicious Activity Detected",
  "Important: Your Account Security Alert",
  "Urgent: Verify Your Recent Transactions",
  "Action Required: Suspicious Activity Detected",
  "Your Account Has Been Compromised",
  "Confirm Your Identity to Avoid Account Lock",
  "Unauthorized Access Detected: Take Action Now",
  "Alert: Unusual Login Attempt Detected",
  "Your Account Is Under Review: Verify Now",
  "Your Account Is Under Surveillance: Take Action",
  "Your Account Is In Danger: Take Immediate Action",
  "Warning: Your Account Is At Risk of Fraud",
  "Immediate Action Required: Verify Your Account",
  "Critical: Your Account May Be Compromised",
  "Emergency: Secure Your Account Immediately",
  "Account Compromised: Take Immediate Action",
  "Security Breach: Confirm Your Account Information",
  "Unauthorized Login Attempt: Verify Your Account",
  "Warning: Your Account May Be Compromised",
  "Immediate Attention Required: Verify Your Account",
  "Immediate Attention Required: Verify Your Account",
  "Your Account Is Under Investigation: Verify Now",
  "Urgent: Unauthorized Transaction Detected",
  "Security Breach Detected: Immediate Action Required",
  "Account Compromised: Take Immediate Action",
  "Unauthorized Access Detected: Immediate Action Required",
  "Verify Your Account: Suspicious Activity Detected",
  "Security Breach Detected: Immediate Action Required",
  "Account Compromised: Take Immediate Action",
  "Security Breach: Confirm Your Account Information",
  "Unauthorized Login Attempt: Verify Your Account",
  "Warning: Your Account May Be Compromised",
  "Immediate Attention Required: Verify Your Account",
  "Immediate Attention Required: Verify Your Account",
  "Your Account Is Under Investigation: Verify Now",
  "Urgent: Unauthorized Transaction Detected",
  "Security Breach Detected: Immediate Action Required",
  "Account Compromised: Take Immediate Action",
  "Unauthorized Access Detected: Immediate Action Required",
  "Verify Your Account: Suspicious Activity Detected"
]

let descriptions = [
  "Recent activity on your account seems unusual. Verify recent transactions immediately to prevent unauthorized access and protect your account from potential threats.",
  "Immediate action is required to address suspicious activity detected on your account. Protect your personal information now to safeguard against potential fraud.",
  "Your account security has been compromised. Take immediate steps to secure your account and prevent further unauthorized access to protect your personal data.",
  "Confirm your identity now to avoid account lock due to suspicious activity. Secure your account and personal information from potential threats.",
  "Unauthorized access detected on your account. Take immediate action to secure your account and prevent further breaches to safeguard your personal data.",
  "An unusual login attempt has been detected on your account. Take action now to verify your identity and protect your account from potential threats.",
  "Your account is under review due to suspicious activity. Verify your account now to ensure security and prevent unauthorized access.",
  "Your account is under surveillance due to suspicious activity. Take immediate action to protect your account and personal information from potential threats.",
  "Your account is in danger due to potential fraudulent activity. Take immediate action to secure your account and prevent unauthorized access.",
  "Your account is at risk of fraud. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal information.",
  "Immediate action is required to verify your account",
  "Suspicious login activity detected on your account. Verify your account immediately to prevent unauthorized access and protect your personal information.",
  "Unusual activity has been detected on your account. Take action now to secure your account and prevent unauthorized access to safeguard your personal data.",
  "Your account may have been accessed by unauthorized users. Take immediate action to secure your account and protect your personal information from potential threats.",
  "Your account security may be compromised. Take immediate steps to verify your account and protect your personal information from potential fraud.",
  "Your account has been flagged for suspicious activity. Take action now to verify your account and prevent unauthorized access to protect your personal data.",
  "Protect your account from unauthorized access by verifying your identity now. Take immediate action to safeguard your personal information from potential threats.",
  "Your account is under threat from potential fraud. Verify your account immediately to prevent unauthorized access and protect your personal data.",
  "Your account may be at risk of fraudulent activity. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal information.",
  "Suspicious activity has been detected on your account. Verify your account now to ensure security and prevent unauthorized access to protect your personal data.",
  "Your account security is at risk. Take immediate action to verify your account and protect your personal information from potential fraud.",
  "Your account may have been compromised. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal data.",
  "Unauthorized access detected on your account. Take immediate action to verify your identity and protect your personal information from potential threats.",
  "Your account security is under review. Verify your account now to ensure security and prevent unauthorized access to protect your personal data.",
  "Your account security may be compromised. Take immediate action to verify your account and protect your personal information from potential fraud.",
  "Your account has been flagged for suspicious activity. Take action now to verify your account and prevent unauthorized access to protect your personal data.",
  "Protect your account from unauthorized access by verifying your identity now. Take immediate action to safeguard your personal information from potential threats.",
  "Your account is under threat from potential fraud. Verify your account immediately to prevent unauthorized access and protect your personal data.",
  "Your account may be at risk of fraudulent activity. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal information.",
  "Suspicious activity has been detected on your account. Verify your account now to ensure security and prevent unauthorized access to protect your personal data.",
  "Your account security is at risk. Take immediate action to verify your account and protect your personal information from potential fraud.",
  "Your account may have been compromised. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal data.",
  "Unauthorized access detected on your account. Take immediate action to verify your identity and protect your personal information from potential threats.",
  "Your account security is under review. Verify your account now to ensure security and prevent unauthorized access to protect your personal data.",
  "Your account security may be compromised. Take immediate action to verify your account and protect your personal information from potential fraud.",
  "Your account has been flagged for suspicious activity. Take action now to verify your account and prevent unauthorized access to protect your personal data.",
  "Protect your account from unauthorized access by verifying your identity now. Take immediate action to safeguard your personal information from potential threats.",
  "Your account is under threat from potential fraud. Verify your account immediately to prevent unauthorized access and protect your personal data.",
  "Your account may be at risk of fraudulent activity. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal information.",
  "Suspicious activity has been detected on your account. Verify your account now to ensure security and prevent unauthorized access to protect your personal data.",
  "Your account security is at risk. Take immediate action to verify your account and protect your personal information from potential fraud.",
  "Your account may have been compromised. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal data.",
  "Unauthorized access detected on your account. Take immediate action to verify your identity and protect your personal information from potential threats.",
  "Your account security is under review. Verify your account now to ensure security and prevent unauthorized access to protect your personal data.",
  "Your account security may be compromised. Take immediate action to verify your account and protect your personal information from potential fraud.",
  "Your account has been flagged for suspicious activity. Take action now to verify your account and prevent unauthorized access to protect your personal data.",
  "Protect your account from unauthorized access by verifying your identity now. Take immediate action to safeguard your personal information from potential threats.",
  "Your account is under threat from potential fraud. Verify your account immediately to prevent unauthorized access and protect your personal data.",
  "Your account may be at risk of fraudulent activity. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal information.",
  "Suspicious activity has been detected on your account. Verify your account now to ensure security and prevent unauthorized access to protect your personal data.",
  "Your account security is at risk. Take immediate action to verify your account and protect your personal information from potential fraud.",
  "Your account may have been compromised. Take immediate action to secure your account and prevent unauthorized access to safeguard your personal data.",
  "Unauthorized access detected on your account. Take immediate action to verify your identity and protect your personal information from potential threats.",
  "Your account security is under review. Verify your account now to ensure security and prevent unauthorized access to protect your personal data.",
  "Your account security may be compromised. Take immediate action to verify your account and protect your personal information from potential fraud.",
  "Your account has been flagged for suspicious activity. Take action now to verify your account and prevent unauthorized access to protect your personal data.",
  "Protect your account from unauthorized access by verifying your identity now. Take immediate action to safeguard your personal information from potential threats.",
  "Your account is under threat from potential fraud. Verify your account immediately to prevent unauthorized access and protect your personal"
]

// --------------

function generateRandomEmployee(): Employee {
  let name = generateRandomName();
  let email = name.split(' ').join('.').toLowerCase() + '@tata.in'
  const employee: Employee = {
      code: generateRandomString(6),
      name: name,
      email: email
  };
  return employee;
}

// Function to generate a random string of given length
function generateRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random name (for demonstration purposes)
function generateRandomName(): string {
  const indianFirstNames = [
    "Aarav", "Aarna", "Abhay", "Aditi", "Advait", "Aishwarya", "Akash", "Amaya", "Ananya", "Arjun",
    "Aryan", "Avani", "Avi", "Ayush", "Bhavya", "Chetan", "Dhruv", "Divya", "Ishaan", "Ishita",
    "Kabir", "Kavya", "Krish", "Krisha", "Manan", "Maya", "Meera", "Mira", "Neha", "Nikhil",
    "Nirav", "Niyati", "Pooja", "Pranav", "Prisha", "Rahul", "Rhea", "Rishi", "Riya", "Rohan",
    "Ruhi", "Saahil", "Sanvi", "Shiv", "Shreya", "Tanvi", "Udit", "Ved", "Vidhi", "Yash"
];
const indianLastNames = [
  "Agarwal", "Bajaj", "Banerjee", "Chopra", "Das", "Dutta", "Gupta", "Jain", "Jha", "Kapoor",
  "Khanna", "Kumar", "Mahajan", "Malhotra", "Mehra", "Mittal", "Mukherjee", "Nair", "Patel", "Rao",
  "Roy", "Sethi", "Sharma", "Singh", "Sinha", "Tiwari", "Trivedi", "Varma", "Verma", "Yadav",
  "Chauhan", "Choudhury", "Deshmukh", "Dube", "Dubey", "Ganguly", "Goswami", "Gupta", "Iyer", "Joshi",
  "Khan", "Menon", "Mehta", "Pandey", "Reddy", "Shah", "Thakur", "Venkatesh", "Yadav"
];

  return `${indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)]} ${indianLastNames[Math.floor(Math.random() * indianLastNames.length)]}`;
}


// Example usage
for (let i = 0; i < 100; i++) {
  const randomEmployee = generateRandomEmployee();
  employees.push(randomEmployee);
}



function randomDateWithinYear() {
    // Define start and end dates within the specified year
    const startDate = new Date(2023, 0, 1); // January 1st of the specified year
    const endDate = new Date(2024, 3, 31); // December 31st of the specified year

    // Calculate the time difference in milliseconds between start and end dates
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Generate a random time within the time difference
    const randomTime = Math.random() * timeDifference;

    // Create a new date by adding the random time to the start date
    const randomDate = new Date(startDate.getTime() + randomTime);

    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const day = String(randomDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;

}

let currentCaseNo = 9876;
employeeCases.forEach(({ empNo, count }) => {
  for (let i = 0; i < 734; i++) {
    currentCaseNo++;
    let random1 = Math.floor(Math.random()*departments.length);
    let random2 = Math.floor(Math.random()*mockBranches.length);
    let random3 = Math.floor(Math.random()*employees.length)
    let random4 = Math.floor(Math.random()*subjects.length)
    let random7 = Math.floor(Math.random()*descriptions.length)
    let random5 = 1 + Math.floor(Math.random()*0)
    let employeeInvolved = []
    for(let j=0; j<random5; j++){
      let random6 = Math.floor(Math.random()*employees.length)
      employeeInvolved.push(employees[random6])
    }
    let reportedOn = randomDateWithinYear();

    cases.push({
      caseNo: `FCN${currentCaseNo}`,
      departmentName: departments[random1].name,
      branchName: `${mockBranches[random2].name}, ${mockBranches[random2].city}`,
      reporter: employees[random3],
      reportedOn: reportedOn,
      subject: subjects[random4],
      description: descriptions[random7],
      employeeInvolved: employeeInvolved,
      closedOn: (currentCaseNo % 4 === 0) ? randomDateWithinYear(): null,
      status: (currentCaseNo % 4 === 0) ? 'closed' : 'open',
      statusHistory: [{
        status: 'created',
        statusDesc: 'Case Reported On ' + reportedOn,
        updateOn: new Date(reportedOn),
        updatedBy: employees[0],
        comment: '',
        attachment: [
          {
            filename: 'FR0001.pdf',
            fileurl: 'FR0001.pdf'
          }
        ]
      }]
    });
  }
});

cases[0].statusHistory = [
  {
    status: 'created',
    statusDesc: 'Case Reported On 1st March 2024',
    updateOn: new Date(2024, 3, 1),
    updatedBy: employees[0],
    comment: '',
    attachment: [
      {
        filename: 'FR0001.pdf',
        fileurl: 'FR0001.pdf'
      }
    ]
  },
  {
    status: 'in-progress',
    statusDesc: 'Status updated to In Progress',
    updateOn: new Date(2024, 3, 4),
    updatedBy: employees[0],
    comment: 'Starting working on it',
  },
  {
    status: 'in-progress-comment',
    statusDesc: 'Comment Added',
    updateOn: new Date(2024, 3, 5),
    updatedBy: employees[0],
    comment: 'Waiting for legal to response.',
    attachment: [
      {
        filename: 'FR005.pdf',
        fileurl: 'FR0005.pdf'
      }
    ]
  },
  {
    status: 'in-progress-comment',
    statusDesc: 'Comment Added',
    updateOn: new Date(2024, 3, 6),
    updatedBy: employees[0],
    comment: 'More documents required by legal team.',
    attachment: [
      {
        filename: 'FR006.pdf',
        fileurl: 'FR0006.pdf'
      }
    ]
  },
  {
    status: 'closed',
    statusDesc: 'Case closed',
    updateOn: new Date(2024, 3, 8),
    updatedBy: employees[0],
    comment: 'Case captured and asked employee to pay penalty of Rs. 2000',
    attachment: [
      {
        filename: 'FR007.pdf',
        fileurl: 'FR0007.pdf'
      }
    ]
  },
]
