// Sample data for College MIS demo

export const departments = [
  { id: 1, name: 'Information Technology', code: 'IT', head: 'Prof. Meena Joshi', institute: 'Parul Institute of Technology', students: 245, faculty: 18 },
  { id: 2, name: 'Computer Science', code: 'CS', head: 'Dr. Amit Verma', institute: 'Parul Institute of Technology', students: 230, faculty: 16 },
  { id: 3, name: 'Electronics & Communication', code: 'EC', head: 'Prof. Ravi Sharma', institute: 'Parul Institute of Engineering', students: 180, faculty: 14 },
  { id: 4, name: 'Mechanical Engineering', code: 'ME', head: 'Dr. Suresh Nair', institute: 'Parul Institute of Engineering', students: 210, faculty: 15 },
  { id: 5, name: 'Civil Engineering', code: 'CE', head: 'Prof. Anjali Singh', institute: 'Parul Institute of Engineering', students: 195, faculty: 13 },
  { id: 6, name: 'Chemical Engineering', code: 'CHE', head: 'Dr. Vikram Patel', institute: 'Parul Institute of Engineering', students: 160, faculty: 12 },
  { id: 7, name: 'Biotechnology', code: 'BT', head: 'Dr. Neha Gupta', institute: 'Parul Institute of Pharmacy', students: 120, faculty: 10 },
  { id: 8, name: 'Physics', code: 'PHY', head: 'Prof. Deepak Kumar', institute: 'Parul Institute of Pharmacy', students: 140, faculty: 11 },
  { id: 9, name: 'Mathematics', code: 'MATH', head: 'Dr. Priya Desai', institute: 'Parul Institute of Pharmacy', students: 130, faculty: 9 },
  { id: 10, name: 'Management', code: 'MBA', head: 'Prof. Rohit Mehta', institute: 'Parul Institute of Management', students: 200, faculty: 15 },
];

export const courses = [
  { id: 'CS301', name: 'Data Structures & Algorithms', dept: 'Information Technology', semester: 3, credits: 4, faculty: 'Prof. Meena Joshi', enrolled: 58, schedule: 'Mon/Wed/Fri 9:00-10:00' },
  { id: 'CS302', name: 'Database Management Systems', dept: 'Information Technology', semester: 3, credits: 3, faculty: 'Prof. Meena Joshi', enrolled: 62, schedule: 'Tue/Thu 10:00-11:30' },
  { id: 'CS401', name: 'Operating Systems', dept: 'Computer Science', semester: 4, credits: 4, faculty: 'Dr. Amit Verma', enrolled: 55, schedule: 'Mon/Wed 11:00-12:30' },
  { id: 'CS501', name: 'Machine Learning', dept: 'Computer Science', semester: 5, credits: 4, faculty: 'Dr. Amit Verma', enrolled: 48, schedule: 'Tue/Thu 2:00-3:30' },
  { id: 'EC301', name: 'Digital Electronics', dept: 'Electronics & Communication', semester: 3, credits: 3, faculty: 'Prof. Ravi Sharma', enrolled: 45, schedule: 'Mon/Wed/Fri 10:00-11:00' },
  { id: 'ME401', name: 'Thermodynamics', dept: 'Mechanical Engineering', semester: 4, credits: 4, faculty: 'Dr. Suresh Nair', enrolled: 52, schedule: 'Tue/Thu 9:00-10:30' },
  { id: 'MBA501', name: 'Business Strategy', dept: 'Management', semester: 5, credits: 3, faculty: 'Prof. Rohit Mehta', enrolled: 65, schedule: 'Mon/Wed 2:00-3:30' },
  { id: 'BT301', name: 'Molecular Biology', dept: 'Biotechnology', semester: 3, credits: 4, faculty: 'Dr. Neha Gupta', enrolled: 38, schedule: 'Tue/Thu/Sat 9:00-10:00' },
];

export const attendanceData = [
  { studentId: '102', courseId: 'CS301', present: 32, total: 40, percentage: 80 },
  { studentId: '102', courseId: 'CS302', present: 28, total: 36, percentage: 78 },
  { studentId: '103', courseId: 'CS301', present: 38, total: 40, percentage: 95 },
  { studentId: '103', courseId: 'CS302', present: 34, total: 36, percentage: 94 },
  { studentId: '113', courseId: 'CS401', present: 30, total: 38, percentage: 79 },
  { studentId: '135', courseId: 'CS401', present: 35, total: 38, percentage: 92 },
];

export const gradesData = [
  { studentId: '102', courseId: 'CS301', courseName: 'Data Structures & Algorithms', midterm: 72, final: 78, assignment: 85, grade: 'B+' },
  { studentId: '102', courseId: 'CS302', courseName: 'Database Management Systems', midterm: 68, final: 74, assignment: 80, grade: 'B' },
  { studentId: '103', courseId: 'CS301', courseName: 'Data Structures & Algorithms', midterm: 88, final: 92, assignment: 95, grade: 'A+' },
  { studentId: '103', courseId: 'CS302', courseName: 'Database Management Systems', midterm: 82, final: 87, assignment: 90, grade: 'A' },
];

export const feesData = [
  { id: 'FEE001', studentId: '102', studentName: 'Priya Patel', semester: 5, amount: 45000, paid: 45000, due: 0, status: 'Paid', date: '2024-07-15' },
  { id: 'FEE002', studentId: '103', studentName: 'Kiran Bakshi', semester: 6, amount: 45000, paid: 22500, due: 22500, status: 'Partial', date: '2024-07-20' },
  { id: 'FEE003', studentId: '101', studentName: 'Farhan Mehta', semester: 3, amount: 42000, paid: 0, due: 42000, status: 'Pending', date: null },
  { id: 'FEE004', studentId: '104', studentName: 'Simran Sharma', semester: 5, amount: 44000, paid: 44000, due: 0, status: 'Paid', date: '2024-07-10' },
  { id: 'FEE005', studentId: '105', studentName: 'Priya Kapoor', semester: 7, amount: 48000, paid: 48000, due: 0, status: 'Paid', date: '2024-06-28' },
  { id: 'FEE006', studentId: '106', studentName: 'Vijay Reddy', semester: 6, amount: 46000, paid: 23000, due: 23000, status: 'Partial', date: '2024-07-05' },
  { id: 'FEE007', studentId: '107', studentName: 'Farhan Kapoor', semester: 4, amount: 43000, paid: 0, due: 43000, status: 'Pending', date: null },
  { id: 'FEE008', studentId: '108', studentName: 'Rahul Kapoor', semester: 7, amount: 47000, paid: 47000, due: 0, status: 'Paid', date: '2024-07-18' },
];

export const applicationsData = [
  { id: 'APP2024001', name: 'Ravi Shankar', course: 'B.Tech Computer Science', category: 'General', date: '2024-03-10', score: 87, status: 'Under Review', documents: true },
  { id: 'APP2024002', name: 'Sunita Patel', course: 'B.Tech Information Technology', category: 'OBC', date: '2024-03-12', score: 82, status: 'Approved', documents: true },
  { id: 'APP2024003', name: 'Mohan Verma', course: 'MBA Business Administration', category: 'General', date: '2024-03-14', score: 79, status: 'Under Review', documents: false },
  { id: 'APP2024004', name: 'Geeta Sharma', course: 'B.Pharm Pharmacy', category: 'SC', date: '2024-03-15', score: 75, status: 'Pending Documents', documents: false },
  { id: 'APP2024005', name: 'Ashok Kumar', course: 'B.Tech Mechanical Engineering', category: 'General', date: '2024-03-16', score: 91, status: 'Approved', documents: true },
  { id: 'APP2024006', name: 'Nisha Gupta', course: 'B.Tech Civil Engineering', category: 'OBC', date: '2024-03-17', score: 68, status: 'Under Review', documents: true },
  { id: 'APP2024007', name: 'Prakash Nair', course: 'B.Tech Electronics & Communication', category: 'General', date: '2024-03-18', score: 85, status: 'Waitlisted', documents: true },
  { id: 'APP2024008', name: 'Lakshmi Reddy', course: 'B.Sc Biotechnology', category: 'ST', date: '2024-03-19', score: 72, status: 'Approved', documents: true },
];

export const notifications = [
  { id: 1, title: 'Semester Exams Schedule Released', message: 'End semester exams are scheduled from November 20 to December 5, 2024. Check your timetable.', type: 'info', date: '2024-10-15', audience: ['student', 'faculty'] },
  { id: 2, title: 'Fee Payment Deadline', message: 'Last date for fee payment for Semester 5 is October 31, 2024. Avoid late fees.', type: 'warning', date: '2024-10-14', audience: ['student', 'finance'] },
  { id: 3, title: 'New Course Registration Open', message: 'Course registration for Semester 6 is now open. Register before November 1, 2024.', type: 'success', date: '2024-10-12', audience: ['student'] },
  { id: 4, title: 'Faculty Meeting - Department Heads', message: 'All department heads are required to attend the meeting on October 20 at 2 PM, Conference Hall.', type: 'info', date: '2024-10-10', audience: ['principal', 'faculty'] },
  { id: 5, title: 'Admission Results Published', message: 'Results for Round 2 admissions have been published. Please check the admissions portal.', type: 'success', date: '2024-10-08', audience: ['admissions', 'admin'] },
  { id: 6, title: 'System Maintenance Scheduled', message: 'The MIS system will be under maintenance on Sunday Oct 27, 2:00 AM - 6:00 AM.', type: 'warning', date: '2024-10-07', audience: ['admin', 'faculty', 'student', 'finance', 'admissions', 'principal'] },
];

export const systemStats = {
  totalStudents: 1810,
  totalFaculty: 133,
  totalCourses: 248,
  totalDepartments: 10,
  activeAdmissions: 342,
  pendingApplications: 48,
  totalRevenue: 8245000,
  pendingFees: 1450000,
  placementRate: 87,
  avgAttendance: 82,
};

export const performanceData = {
  departments: [
    { name: 'Information Technology', avgGPA: 7.8, attendance: 83, placements: 92 },
    { name: 'Computer Science', avgGPA: 7.9, attendance: 85, placements: 94 },
    { name: 'Electronics & Communication', avgGPA: 7.4, attendance: 80, placements: 86 },
    { name: 'Mechanical Engineering', avgGPA: 7.2, attendance: 79, placements: 82 },
    { name: 'Civil Engineering', avgGPA: 7.5, attendance: 81, placements: 78 },
    { name: 'Management', avgGPA: 7.6, attendance: 84, placements: 88 },
  ],
};
