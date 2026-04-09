import {
  fetchStart, fetchEmployeesSuccess, fetchAttendanceSuccess,
  fetchLeaveSuccess, fetchPayrollSuccess, fetchRecruitmentSuccess,
  fetchPerformanceSuccess, fetchTrainingSuccess, fetchDisciplinarySuccess,
  fetchHRAssetsSuccess, fetchExitsSuccess,
  fetchFailure,
  addEmployee, addLeaveRequest, updateLeaveRequest,
  addRecruitment, addTraining, addDisciplinary, addHRAsset, addExit,
} from '../slices/hrSlice';

export const mockEmployees = [
  {
    id: 'EMP-1001', serviceNo: 'SVC-001', title: 'Mr', gender: 'Male', initials: 'R.P.',
    firstName: 'Ruwan', lastName: 'Perera', reportName: 'R. Perera',
    designation: 'Senior Engineer', department: 'Engineering', division: 'Technical',
    grade: 'Grade 5', workCategory: 'Permanent', employeeCategory: 'Staff',
    location: 'Colombo', email: 'r.perera@dge.lk', phone: '0771234567', corporateMobile: '0712345678',
    address1: '45/A, Galle Road', address2: 'Dehiwala', town: 'Dehiwala', city: 'Colombo',
    district: 'Colombo', province: 'Western',
    homeAddress1: '45/A, Galle Road', homeAddress2: 'Dehiwala',
    homeGramasewaka: 'Dehiwala North', homePoliceStation: 'Dehiwala',
    homeDistance: '12',
    nationalId: '901234567V', passportNo: '', dob: '1990-05-15', maritalStatus: 'Married',
    religion: 'Buddhist', race: 'Sinhalese', bloodGroup: 'B+',
    mealRequirement: 'Yes', breakfastRequirement: 'No', snackCenter: 'Canteen A',
    transportMode: 'Company Bus', ownVehicle: 'No', vehicleType: '', licenceNo: '',
    vehicleNo: '', ownHome: 'No', rentalAmount: '15000',
    nextOfKinFirstName: 'Kamala', nextOfKinLastName: 'Perera',
    nextOfKinAddress: '45/A, Galle Road, Dehiwala', nextOfKinPhone: '0777890123',
    nextOfKinRelationship: 'Spouse',
    spouseFirstName: 'Kamala', spouseLastName: 'Perera', spouseDob: '1992-03-20',
    noOfChildren: '2',
    highestEducation: 'B.Sc. Engineering', highestProfessional: 'AMIE (Sri Lanka)',
    skills: 'Structural Design, AutoCAD, Project Management',
    epfNo: 'EPF-789012', joinDate: '2018-05-12', recruitmentDate: '2018-05-01',
    promotedDate: '2021-01-01', permanentDate: '2019-05-12', retirementDate: '2052-05-15',
    reportingOfficer: 'EMP-1010', occupationalGroup: 'Engineering',
    proximityCardNo: 'PX-1001', barcodeNo: 'BC-1001', cdlServiceNo: '',
    status: 'Active', contractType: 'Permanent',
    photo: null,
    documents: [],
  },
  {
    id: 'EMP-1002', serviceNo: 'SVC-002', title: 'Ms', gender: 'Female', initials: 'A.F.',
    firstName: 'Amali', lastName: 'Fernando', reportName: 'A. Fernando',
    designation: 'Accountant', department: 'Finance', division: 'Accounts',
    grade: 'Grade 4', workCategory: 'Permanent', employeeCategory: 'Staff',
    location: 'Colombo', email: 'a.fernando@dge.lk', phone: '0777654321', corporateMobile: '0722345678',
    address1: '12, Flower Road', address2: 'Colombo 07', town: 'Colombo', city: 'Colombo',
    district: 'Colombo', province: 'Western',
    homeAddress1: '12, Flower Road', homeAddress2: 'Colombo 07',
    homeGramasewaka: 'Borella', homePoliceStation: 'Borella',
    homeDistance: '5',
    nationalId: '952345678V', passportNo: 'N1234567', dob: '1995-09-22', maritalStatus: 'Single',
    religion: 'Catholic', race: 'Sinhalese', bloodGroup: 'O+',
    mealRequirement: 'Yes', breakfastRequirement: 'Yes', snackCenter: 'Canteen B',
    transportMode: 'Own Vehicle', ownVehicle: 'Yes', vehicleType: 'Car',
    licenceNo: 'B1234567', vehicleNo: 'WP CAF 5678', ownHome: 'No', rentalAmount: '25000',
    nextOfKinFirstName: 'Bandula', nextOfKinLastName: 'Fernando',
    nextOfKinAddress: '12, Flower Road, Colombo 07', nextOfKinPhone: '0112345678',
    nextOfKinRelationship: 'Father',
    spouseFirstName: '', spouseLastName: '', spouseDob: '', noOfChildren: '0',
    highestEducation: 'B.Com (Special)', highestProfessional: 'ACCA (Part)',
    skills: 'Financial Reporting, Tally, MS Excel',
    epfNo: 'EPF-789013', joinDate: '2019-08-03', recruitmentDate: '2019-07-20',
    promotedDate: '', permanentDate: '2020-08-03', retirementDate: '2057-09-22',
    reportingOfficer: 'EMP-1011', occupationalGroup: 'Finance',
    proximityCardNo: 'PX-1002', barcodeNo: 'BC-1002', cdlServiceNo: '',
    status: 'Active', contractType: 'Permanent', photo: null, documents: [],
  },
  {
    id: 'EMP-1003', serviceNo: 'SVC-003', title: 'Mr', gender: 'Male', initials: 'K.S.',
    firstName: 'Kasun', lastName: 'Silva', reportName: 'K. Silva',
    designation: 'Production Supervisor', department: 'Production', division: 'Manufacturing',
    grade: 'Grade 4', workCategory: 'Permanent', employeeCategory: 'Staff',
    location: 'Ratmalana', email: 'k.silva@dge.lk', phone: '0712345678', corporateMobile: '',
    address1: '78, Station Road', address2: 'Ratmalana', town: 'Ratmalana', city: 'Colombo',
    district: 'Colombo', province: 'Western',
    homeAddress1: '78, Station Road', homeAddress2: 'Ratmalana',
    homeGramasewaka: 'Ratmalana South', homePoliceStation: 'Ratmalana',
    homeDistance: '2',
    nationalId: '871234567V', passportNo: '', dob: '1987-11-10', maritalStatus: 'Married',
    religion: 'Buddhist', race: 'Sinhalese', bloodGroup: 'A+',
    mealRequirement: 'Yes', breakfastRequirement: 'Yes', snackCenter: 'Factory Canteen',
    transportMode: 'Own Vehicle', ownVehicle: 'Yes', vehicleType: 'Motorbike',
    licenceNo: 'A9876543', vehicleNo: 'WP CAB 2345', ownHome: 'Yes', rentalAmount: '',
    nextOfKinFirstName: 'Manel', nextOfKinLastName: 'Silva',
    nextOfKinAddress: '78, Station Road, Ratmalana', nextOfKinPhone: '0774567890',
    nextOfKinRelationship: 'Spouse',
    spouseFirstName: 'Manel', spouseLastName: 'Silva', spouseDob: '1990-06-15',
    noOfChildren: '3',
    highestEducation: 'H.L.C.', highestProfessional: 'NVQ Level 4 - Mech.',
    skills: 'CNC Operations, Welding, Team Management',
    epfNo: 'EPF-789014', joinDate: '2017-02-20', recruitmentDate: '2017-02-01',
    promotedDate: '2019-06-01', permanentDate: '2018-02-20', retirementDate: '2049-11-10',
    reportingOfficer: 'EMP-1012', occupationalGroup: 'Production',
    proximityCardNo: 'PX-1003', barcodeNo: 'BC-1003', cdlServiceNo: '',
    status: 'Active', contractType: 'Permanent', photo: null, documents: [],
  },
  {
    id: 'EMP-1004', serviceNo: 'SVC-004', title: 'Ms', gender: 'Female', initials: 'N.J.',
    firstName: 'Nirmala', lastName: 'Jayawardena', reportName: 'N. Jayawardena',
    designation: 'HR Officer', department: 'HR', division: 'Human Resources',
    grade: 'Grade 3', workCategory: 'Permanent', employeeCategory: 'Staff',
    location: 'Colombo', email: 'n.jayawardena@dge.lk', phone: '0769876543', corporateMobile: '0761234567',
    address1: '23, Temple Road', address2: 'Nugegoda', town: 'Nugegoda', city: 'Colombo',
    district: 'Colombo', province: 'Western',
    homeAddress1: '23, Temple Road', homeAddress2: 'Nugegoda',
    homeGramasewaka: 'Nugegoda East', homePoliceStation: 'Nugegoda',
    homeDistance: '8',
    nationalId: '983456789V', passportNo: '', dob: '1998-07-30', maritalStatus: 'Single',
    religion: 'Buddhist', race: 'Sinhalese', bloodGroup: 'O-',
    mealRequirement: 'Yes', breakfastRequirement: 'No', snackCenter: 'Canteen A',
    transportMode: 'Company Bus', ownVehicle: 'No', vehicleType: '', licenceNo: '',
    vehicleNo: '', ownHome: 'No', rentalAmount: '18000',
    nextOfKinFirstName: 'Rohana', nextOfKinLastName: 'Jayawardena',
    nextOfKinAddress: '23, Temple Road, Nugegoda', nextOfKinPhone: '0112890123',
    nextOfKinRelationship: 'Father',
    spouseFirstName: '', spouseLastName: '', spouseDob: '', noOfChildren: '0',
    highestEducation: 'B.Sc. HRM', highestProfessional: 'PQHRM (IPM)',
    skills: 'Recruitment, Payroll, Employee Relations',
    epfNo: 'EPF-789015', joinDate: '2020-11-15', recruitmentDate: '2020-11-01',
    promotedDate: '', permanentDate: '2021-11-15', retirementDate: '2060-07-30',
    reportingOfficer: 'EMP-1010', occupationalGroup: 'Administration',
    proximityCardNo: 'PX-1004', barcodeNo: 'BC-1004', cdlServiceNo: '',
    status: 'Active', contractType: 'Permanent', photo: null, documents: [],
  },
  {
    id: 'EMP-1005', serviceNo: 'SVC-005', title: 'Mr', gender: 'Male', initials: 'T.B.',
    firstName: 'Thilak', lastName: 'Bandara', reportName: 'T. Bandara',
    designation: 'Stores Officer', department: 'Procurement', division: 'Stores',
    grade: 'Grade 3', workCategory: 'Permanent', employeeCategory: 'Staff',
    location: 'Ratmalana', email: 't.bandara@dge.lk', phone: '0754321098', corporateMobile: '',
    address1: '56, Lake Drive', address2: 'Moratuwa', town: 'Moratuwa', city: 'Moratuwa',
    district: 'Colombo', province: 'Western',
    homeAddress1: '56, Lake Drive', homeAddress2: 'Moratuwa',
    homeGramasewaka: 'Moratuwa Central', homePoliceStation: 'Moratuwa',
    homeDistance: '15',
    nationalId: '821234567V', passportNo: '', dob: '1982-03-05', maritalStatus: 'Married',
    religion: 'Buddhist', race: 'Sinhalese', bloodGroup: 'AB+',
    mealRequirement: 'Yes', breakfastRequirement: 'Yes', snackCenter: 'Factory Canteen',
    transportMode: 'Own Vehicle', ownVehicle: 'Yes', vehicleType: 'Van',
    licenceNo: 'B2345678', vehicleNo: 'WP CAN 8901', ownHome: 'Yes', rentalAmount: '',
    nextOfKinFirstName: 'Sujeewa', nextOfKinLastName: 'Bandara',
    nextOfKinAddress: '56, Lake Drive, Moratuwa', nextOfKinPhone: '0112345901',
    nextOfKinRelationship: 'Spouse',
    spouseFirstName: 'Sujeewa', spouseLastName: 'Bandara', spouseDob: '1985-08-12',
    noOfChildren: '2',
    highestEducation: 'G.C.E. A/L', highestProfessional: 'NVQ Level 3',
    skills: 'Stores Management, Inventory Control',
    epfNo: 'EPF-789016', joinDate: '2016-07-08', recruitmentDate: '2016-06-20',
    promotedDate: '2018-01-01', permanentDate: '2017-07-08', retirementDate: '2044-03-05',
    reportingOfficer: 'EMP-1013', occupationalGroup: 'Stores & Logistics',
    proximityCardNo: 'PX-1005', barcodeNo: 'BC-1005', cdlServiceNo: '',
    status: 'On Leave', contractType: 'Permanent', photo: null, documents: [],
  },
  {
    id: 'EMP-1006', serviceNo: 'SVC-006', title: 'Ms', gender: 'Female', initials: 'D.W.',
    firstName: 'Dilrukshi', lastName: 'Wickramasinghe', reportName: 'D. Wickramasinghe',
    designation: 'Sales Executive', department: 'Commercial', division: 'Sales',
    grade: 'Grade 3', workCategory: 'Contract', employeeCategory: 'Staff',
    location: 'Colombo', email: 'd.wickramasinghe@dge.lk', phone: '0786789012', corporateMobile: '0765432109',
    address1: '34, Baseline Road', address2: 'Dematagoda', town: 'Dematagoda', city: 'Colombo',
    district: 'Colombo', province: 'Western',
    homeAddress1: '34, Baseline Road', homeAddress2: 'Dematagoda',
    homeGramasewaka: 'Dematagoda', homePoliceStation: 'Dematagoda',
    homeDistance: '10',
    nationalId: '003456789V', passportNo: 'N2345678', dob: '2000-12-18', maritalStatus: 'Single',
    religion: 'Christian', race: 'Sinhalese', bloodGroup: 'A-',
    mealRequirement: 'No', breakfastRequirement: 'No', snackCenter: '',
    transportMode: 'Own Vehicle', ownVehicle: 'Yes', vehicleType: 'Car',
    licenceNo: 'B3456789', vehicleNo: 'WP CAF 6789', ownHome: 'No', rentalAmount: '22000',
    nextOfKinFirstName: 'Priya', nextOfKinLastName: 'Wickramasinghe',
    nextOfKinAddress: '34, Baseline Road, Dematagoda', nextOfKinPhone: '0112567890',
    nextOfKinRelationship: 'Mother',
    spouseFirstName: '', spouseLastName: '', spouseDob: '', noOfChildren: '0',
    highestEducation: 'BBA Marketing', highestProfessional: 'Dip. in Sales',
    skills: 'Sales, CRM, Customer Relations',
    epfNo: 'EPF-789017', joinDate: '2021-03-30', recruitmentDate: '2021-03-15',
    promotedDate: '', permanentDate: '', retirementDate: '2062-12-18',
    reportingOfficer: 'EMP-1014', occupationalGroup: 'Sales & Marketing',
    proximityCardNo: 'PX-1006', barcodeNo: 'BC-1006', cdlServiceNo: '',
    status: 'Active', contractType: 'Contract',
    contractStartDate: '2021-03-30', contractEndDate: '2023-03-29',
    photo: null, documents: [],
  },
];

const mockAttendance = [
  { id: 1, employeeId: 'EMP-1001', date: '2024-03-18', checkIn: '08:02', checkOut: '17:15', hours: 9.2, status: 'Present', overtime: 1.2 },
  { id: 2, employeeId: 'EMP-1002', date: '2024-03-18', checkIn: '08:30', checkOut: '17:00', hours: 8.5, status: 'Present', overtime: 0 },
  { id: 3, employeeId: 'EMP-1003', date: '2024-03-18', checkIn: '07:45', checkOut: '16:50', hours: 9.1, status: 'Present', overtime: 1.1 },
  { id: 4, employeeId: 'EMP-1004', date: '2024-03-18', checkIn: '09:10', checkOut: '17:30', hours: 8.3, status: 'Late', overtime: 0 },
  { id: 5, employeeId: 'EMP-1005', date: '2024-03-18', checkIn: null, checkOut: null, hours: 0, status: 'Absent', overtime: 0 },
  { id: 6, employeeId: 'EMP-1006', date: '2024-03-18', checkIn: '08:00', checkOut: '17:00', hours: 9.0, status: 'Present', overtime: 0 },
];

const mockLeave = [
  { id: 'LV-001', employeeId: 'EMP-1001', employeeName: 'Ruwan Perera', type: 'Annual', from: '2024-03-25', to: '2024-03-27', days: 3, reason: 'Family vacation', status: 'Approved', appliedDate: '2024-03-15' },
  { id: 'LV-002', employeeId: 'EMP-1002', employeeName: 'Amali Fernando', type: 'Medical', from: '2024-03-20', to: '2024-03-20', days: 1, reason: 'Medical appointment', status: 'Approved', appliedDate: '2024-03-19' },
  { id: 'LV-003', employeeId: 'EMP-1004', employeeName: 'Nirmala Jayawardena', type: 'Casual', from: '2024-03-22', to: '2024-03-22', days: 1, reason: 'Personal work', status: 'Pending', appliedDate: '2024-03-20' },
  { id: 'LV-004', employeeId: 'EMP-1005', employeeName: 'Thilak Bandara', type: 'Annual', from: '2024-03-18', to: '2024-03-22', days: 5, reason: 'Vacation', status: 'Approved', appliedDate: '2024-03-10' },
];

const mockPayroll = [
  { id: 'PAY-001', employeeId: 'EMP-1001', employeeName: 'Ruwan Perera', month: 'March 2024', basic: 85000, allowances: 25000, overtime: 8500, deductions: 15000, epf: 8500, etf: 3400, netPay: 88000, status: 'Paid' },
  { id: 'PAY-002', employeeId: 'EMP-1002', employeeName: 'Amali Fernando', month: 'March 2024', basic: 65000, allowances: 18000, overtime: 0, deductions: 10000, epf: 6500, etf: 2600, netPay: 66500, status: 'Paid' },
  { id: 'PAY-003', employeeId: 'EMP-1003', employeeName: 'Kasun Silva', month: 'March 2024', basic: 60000, allowances: 20000, overtime: 12000, deductions: 8000, epf: 6000, etf: 2400, netPay: 75600, status: 'Pending' },
  { id: 'PAY-004', employeeId: 'EMP-1004', employeeName: 'Nirmala Jayawardena', month: 'March 2024', basic: 55000, allowances: 15000, overtime: 0, deductions: 7000, epf: 5500, etf: 2200, netPay: 57300, status: 'Pending' },
];

const mockRecruitment = [
  { id: 'REC-001', position: 'Mechanical Engineer', department: 'Engineering', vacancies: 2, postedDate: '2024-03-01', closingDate: '2024-03-31', applicants: 15, shortlisted: 5, status: 'Active' },
  { id: 'REC-002', position: 'Finance Assistant', department: 'Finance', vacancies: 1, postedDate: '2024-02-15', closingDate: '2024-03-15', applicants: 22, shortlisted: 8, status: 'Interview Stage' },
  { id: 'REC-003', position: 'Production Operator', department: 'Production', vacancies: 3, postedDate: '2024-01-20', closingDate: '2024-02-20', applicants: 45, shortlisted: 12, status: 'Completed' },
];

const mockTraining = [
  { id: 'TRN-001', title: 'Safety & Health Training', employeeId: 'EMP-1001', employeeName: 'Ruwan Perera', category: 'Compliance', startDate: '2024-03-10', endDate: '2024-03-12', provider: 'NAITA', status: 'Completed', score: 88 },
  { id: 'TRN-002', title: 'ISO 9001 Awareness', employeeId: 'EMP-1002', employeeName: 'Amali Fernando', category: 'Quality', startDate: '2024-04-01', endDate: '2024-04-02', provider: 'SLSI', status: 'Scheduled', score: null },
  { id: 'TRN-003', title: 'Advanced AutoCAD', employeeId: 'EMP-1003', employeeName: 'Kasun Silva', category: 'Technical', startDate: '2024-03-20', endDate: '2024-03-22', provider: 'ICTA', status: 'In Progress', score: null },
];

const mockDisciplinary = [
  { id: 'DISC-001', employeeId: 'EMP-1004', employeeName: 'Nirmala Jayawardena', type: 'Warning Letter', reason: 'Repeated late attendance', date: '2024-02-15', issuedBy: 'HR Manager', status: 'Issued' },
  { id: 'DISC-002', employeeId: 'EMP-1005', employeeName: 'Thilak Bandara', type: 'Verbal Warning', reason: 'Unauthorized absence', date: '2024-01-20', issuedBy: 'Department Head', status: 'Resolved' },
];

const mockHRAssets = [
  { id: 'HRAS-001', employeeId: 'EMP-1001', employeeName: 'Ruwan Perera', assetType: 'Laptop', assetId: 'LAP-0045', issuedDate: '2018-05-15', returnDate: null, condition: 'Good', status: 'Issued' },
  { id: 'HRAS-002', employeeId: 'EMP-1002', employeeName: 'Amali Fernando', assetType: 'ID Card', assetId: 'ID-1002', issuedDate: '2019-08-05', returnDate: null, condition: 'Good', status: 'Issued' },
  { id: 'HRAS-003', employeeId: 'EMP-1006', employeeName: 'Dilrukshi Wickramasinghe', assetType: 'Uniform', assetId: 'UNI-0056', issuedDate: '2021-04-01', returnDate: null, condition: 'Good', status: 'Issued' },
];

const mockExits = [
  { id: 'EXIT-001', employeeId: 'EMP-9001', employeeName: 'Prasad Kumara', designation: 'Engineer', department: 'Engineering', resignDate: '2024-02-01', lastDay: '2024-02-29', reason: 'Better opportunity', clearance: 'Completed', finalSettlement: 125000, status: 'Completed' },
];

export const fetchEmployees = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchEmployeesSuccess(mockEmployees)), 400);
};
export const fetchAttendance = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchAttendanceSuccess(mockAttendance)), 400);
};
export const fetchLeave = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchLeaveSuccess(mockLeave)), 400);
};
export const fetchPayroll = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchPayrollSuccess(mockPayroll)), 400);
};
export const fetchRecruitment = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchRecruitmentSuccess(mockRecruitment)), 400);
};
export const fetchTraining = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchTrainingSuccess(mockTraining)), 400);
};
export const fetchDisciplinary = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchDisciplinarySuccess(mockDisciplinary)), 400);
};
export const fetchHRAssets = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchHRAssetsSuccess(mockHRAssets)), 400);
};
export const fetchExits = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchExitsSuccess(mockExits)), 400);
};

export const createEmployee = (data) => (dispatch) => {
  const emp = { id: `EMP-${1200 + Math.floor(Math.random() * 800)}`, ...data, status: 'Active' };
  dispatch(addEmployee(emp));
  return emp;
};
export const createLeaveRequest = (data) => (dispatch) => {
  const req = { id: `LV-${String(Date.now()).slice(-4)}`, ...data, status: 'Pending', appliedDate: new Date().toISOString().slice(0,10) };
  dispatch(addLeaveRequest(req));
};
export const approveLeave = (leave) => (dispatch) => {
  dispatch(updateLeaveRequest({ ...leave, status: 'Approved' }));
};
export const rejectLeave = (leave) => (dispatch) => {
  dispatch(updateLeaveRequest({ ...leave, status: 'Rejected' }));
};
export const createRecruitment = (data) => (dispatch) => {
  const rec = { id: `REC-${String(Date.now()).slice(-4)}`, ...data, applicants: 0, shortlisted: 0, status: 'Active' };
  dispatch(addRecruitment(rec));
};
export const createTraining = (data) => (dispatch) => {
  const trn = { id: `TRN-${String(Date.now()).slice(-4)}`, ...data };
  dispatch(addTraining(trn));
};
export const createDisciplinary = (data) => (dispatch) => {
  const disc = { id: `DISC-${String(Date.now()).slice(-4)}`, ...data, status: 'Issued' };
  dispatch(addDisciplinary(disc));
};
export const createHRAsset = (data) => (dispatch) => {
  const asset = { id: `HRAS-${String(Date.now()).slice(-4)}`, ...data, status: 'Issued' };
  dispatch(addHRAsset(asset));
};
export const createExit = (data) => (dispatch) => {
  const exit = { id: `EXIT-${String(Date.now()).slice(-4)}`, ...data, status: 'In Progress' };
  dispatch(addExit(exit));
};
