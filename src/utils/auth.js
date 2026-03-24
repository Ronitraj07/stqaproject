// Authentication utility for College MIS
// Uses localStorage for demo purposes

const USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'System Administrator', email: 'admin@parul.edu', department: 'Administration' },
  { id: 2, username: 'principal', password: 'principal123', role: 'principal', name: 'Dr. Rajesh Sharma', email: 'principal@parul.edu', department: 'Administration' },
  { id: 3, username: 'faculty', password: 'faculty123', role: 'faculty', name: 'Prof. Meena Joshi', email: 'faculty@parul.edu', department: 'Information Technology' },
  { id: 4, username: 'student', password: 'student123', role: 'student', name: 'Priya Patel', email: 'student@parul.edu', department: 'Information Technology', rollno: '102', semester: '5' },
  { id: 5, username: 'finance', password: 'finance123', role: 'finance', name: 'Mr. Suresh Verma', email: 'finance@parul.edu', department: 'Finance' },
  { id: 6, username: 'admissions', password: 'admissions123', role: 'admissions', name: 'Ms. Anita Desai', email: 'admissions@parul.edu', department: 'Admissions Office' },
];

export function login(username, password) {
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const sessionUser = { ...user };
    delete sessionUser.password;
    localStorage.setItem('mis_user', JSON.stringify(sessionUser));
    localStorage.setItem('mis_login_time', Date.now().toString());
    return { success: true, user: sessionUser };
  }
  return { success: false, error: 'Invalid username or password' };
}

export function logout() {
  localStorage.removeItem('mis_user');
  localStorage.removeItem('mis_login_time');
}

export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem('mis_user');
    if (!userStr) return null;
    const loginTime = parseInt(localStorage.getItem('mis_login_time') || '0', 10);
    // Session expires after 8 hours
    if (Date.now() - loginTime > 8 * 60 * 60 * 1000) {
      logout();
      return null;
    }
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}

export function getUsers() {
  return USERS.map(u => {
    const user = { ...u };
    delete user.password;
    return user;
  });
}

export { USERS };
