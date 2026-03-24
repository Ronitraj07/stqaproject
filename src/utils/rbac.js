// Role-Based Access Control (RBAC) utility for College MIS

export const ROLES = {
  ADMIN: 'admin',
  PRINCIPAL: 'principal',
  FACULTY: 'faculty',
  STUDENT: 'student',
  FINANCE: 'finance',
  ADMISSIONS: 'admissions',
};

export const ROLE_LABELS = {
  admin: 'Administrator',
  principal: 'Principal / Director',
  faculty: 'Faculty / Staff',
  student: 'Student',
  finance: 'Finance Officer',
  admissions: 'Admissions Officer',
};

export const ROLE_COLORS = {
  admin: '#e74c3c',
  principal: '#8e44ad',
  faculty: '#2980b9',
  student: '#27ae60',
  finance: '#f39c12',
  admissions: '#16a085',
};

export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: ['admin', 'principal', 'faculty', 'student', 'finance', 'admissions'],
  // User Management
  VIEW_USERS: ['admin', 'principal'],
  CREATE_USER: ['admin'],
  EDIT_USER: ['admin'],
  DELETE_USER: ['admin'],
  // Academic Management
  VIEW_ACADEMIC: ['admin', 'principal', 'faculty', 'student'],
  MANAGE_COURSES: ['admin', 'principal', 'faculty'],
  MANAGE_ATTENDANCE: ['admin', 'faculty'],
  VIEW_ATTENDANCE: ['admin', 'principal', 'faculty', 'student'],
  MANAGE_GRADES: ['admin', 'faculty'],
  VIEW_GRADES: ['admin', 'principal', 'faculty', 'student'],
  // Finance Management
  VIEW_FINANCE: ['admin', 'principal', 'finance', 'student'],
  MANAGE_FEES: ['admin', 'finance'],
  VIEW_PAYMENTS: ['admin', 'finance', 'student'],
  GENERATE_FINANCIAL_REPORT: ['admin', 'principal', 'finance'],
  // Admissions
  VIEW_ADMISSIONS: ['admin', 'principal', 'admissions'],
  MANAGE_APPLICATIONS: ['admin', 'admissions'],
  APPROVE_ADMISSION: ['admin', 'principal', 'admissions'],
  // Reports
  VIEW_REPORTS: ['admin', 'principal', 'faculty', 'finance'],
  GENERATE_REPORTS: ['admin', 'principal', 'finance'],
  // Student Portal
  VIEW_MY_PROFILE: ['student'],
  VIEW_MY_GRADES: ['student'],
  VIEW_MY_ATTENDANCE: ['student'],
  VIEW_MY_FEES: ['student'],
  // Notifications
  VIEW_NOTIFICATIONS: ['admin', 'principal', 'faculty', 'student', 'finance', 'admissions'],
  SEND_NOTIFICATIONS: ['admin', 'principal'],
};

export function hasPermission(role, permission) {
  if (!PERMISSIONS[permission]) return false;
  return PERMISSIONS[permission].includes(role);
}

export const NAV_ITEMS = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'academic', label: 'Academic Management', icon: '🎓' },
    { id: 'finance', label: 'Finance Management', icon: '💰' },
    { id: 'admissions', label: 'Admissions', icon: '📋' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'student-lookup', label: 'Student Lookup', icon: '🔍' },
  ],
  principal: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'academic', label: 'Academic Overview', icon: '🎓' },
    { id: 'finance', label: 'Financial Overview', icon: '💰' },
    { id: 'admissions', label: 'Admissions', icon: '📋' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'student-lookup', label: 'Student Lookup', icon: '🔍' },
  ],
  faculty: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'academic', label: 'My Courses', icon: '🎓' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'student-lookup', label: 'Student Lookup', icon: '🔍' },
  ],
  student: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'academic', label: 'My Courses', icon: '🎓' },
    { id: 'finance', label: 'My Fees', icon: '💰' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ],
  finance: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'finance', label: 'Finance Management', icon: '💰' },
    { id: 'reports', label: 'Financial Reports', icon: '📈' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'student-lookup', label: 'Student Lookup', icon: '🔍' },
  ],
  admissions: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'admissions', label: 'Admissions Portal', icon: '📋' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'student-lookup', label: 'Student Lookup', icon: '🔍' },
  ],
};

export function getNavItems(role) {
  return NAV_ITEMS[role] || [];
}
