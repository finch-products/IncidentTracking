import { Document, Branch, Notice, Case } from './model/dashboard.model';

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

export const cases: Case[] = [
  { caseNo: 'ab789', desc: 'Desc 1', empNo: '1235', name: 'Swathi', department: 'Department A', city: 'Bengaluru', building: 'Whitefeild', details: 'Details 1', reportedDate: '2024-01-05', closedDate: '2024-03-05', status: 'closed' },
  { caseNo: 'cd456', desc: 'Desc 2', empNo: '1236', name: 'John', department: 'Department B', city: 'New York', building: 'Empire', details: 'Details 2', reportedDate: '2024-02-15', closedDate: '2024-03-10', status: 'closed' },
  { caseNo: 'ef123', desc: 'Desc 3', empNo: '1237', name: 'Doe', department: 'Department C', city: 'London', building: 'Canary Wharf', details: 'Details 3', reportedDate: '2024-01-20', closedDate: '', status: 'open' },
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

let currentCaseNo = 9876; // Initialize a unique case number counter
employeeCases.forEach(({ empNo, count }) => {
  for (let i = 0; i < count; i++) {
    currentCaseNo++;
    cases.push({
      caseNo: `xy${currentCaseNo}`,
      desc: `Desc ${currentCaseNo}`,
      empNo: empNo,
      name: `Name${currentCaseNo}`,
      department: `Department ${String.fromCharCode(65 + (currentCaseNo % 7))}`,
      city: `City${currentCaseNo}`,
      building: `Building${currentCaseNo}`,
      details: `Details ${currentCaseNo}`,
      reportedDate: `2024-${('0' + ((currentCaseNo % 12) + 1)).slice(-2)}-${('0' + ((currentCaseNo % 28) + 1)).slice(-2)}`,
      closedDate: (currentCaseNo % 4 === 0) ? `2024-${('0' + (((currentCaseNo + 2) % 12) + 1)).slice(-2)}-${('0' + (((currentCaseNo + 2) % 28) + 1)).slice(-2)}` : '',
      status: (currentCaseNo % 4 === 0) ? 'closed' : 'open',
    });
  }
});

console.log('cases::::' + JSON.stringify(cases));

