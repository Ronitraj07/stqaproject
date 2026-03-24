import React, { useState, useEffect } from 'react';
import { getCurrentUser, logout } from './utils/auth';
import Login from './components/auth/Login';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Dashboards
import AdminDashboard from './components/dashboards/AdminDashboard';
import PrincipalDashboard from './components/dashboards/PrincipalDashboard';
import FacultyDashboard from './components/dashboards/FacultyDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import FinanceDashboard from './components/dashboards/FinanceDashboard';
import AdmissionsDashboard from './components/dashboards/AdmissionsDashboard';

// Modules
import UserManagement from './components/modules/UserManagement';
import AcademicManagement from './components/modules/AcademicManagement';
import FinanceManagement from './components/modules/FinanceManagement';
import AdmissionsPortal from './components/modules/AdmissionsPortal';
import Reports from './components/modules/Reports';
import Notifications from './components/modules/Notifications';
import StudentLookup from './components/modules/StudentLookup';

import './components/layout/Layout.css';
import './App.css';

const DASHBOARD_MAP = {
  admin: AdminDashboard,
  principal: PrincipalDashboard,
  faculty: FacultyDashboard,
  student: StudentDashboard,
  finance: FinanceDashboard,
  admissions: AdmissionsDashboard,
};

const MODULE_MAP = {
  users: UserManagement,
  academic: AcademicManagement,
  finance: FinanceManagement,
  admissions: AdmissionsPortal,
  reports: Reports,
  notifications: Notifications,
  'student-lookup': StudentLookup,
};

function App() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!user) setCurrentPage('dashboard');
  }, [user]);

  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
    setCurrentPage('dashboard');
  }

  function handleLogout() {
    logout();
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const DashboardComponent = DASHBOARD_MAP[user.role];
  const ModuleComponent = currentPage !== 'dashboard' ? MODULE_MAP[currentPage] : null;
  const PageComponent = ModuleComponent || DashboardComponent;

  return (
    <div className="app-layout">
      <Sidebar
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
      />
      <div className={`main-content${sidebarCollapsed ? ' main-content--collapsed' : ''}`}>
        <Header
          user={user}
          currentPage={currentPage}
          onLogout={handleLogout}
        />
        <main className="page-content">
          {PageComponent && <PageComponent user={user} />}
        </main>
      </div>
    </div>
  );
}

export default App;

