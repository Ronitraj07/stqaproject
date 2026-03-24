import React, { useState } from 'react';
import { ROLE_LABELS, ROLE_COLORS } from '../../utils/rbac';
import { logout } from '../../utils/auth';
import { notifications } from '../../data/sampleData';

function Header({ user, currentPage, onLogout }) {
  const [showProfile, setShowProfile] = useState(false);
  const roleColor = ROLE_COLORS[user.role] || '#3949ab';
  const userNotifs = notifications.filter(n => n.audience.includes(user.role));

  const pageLabels = {
    dashboard: 'Dashboard',
    users: 'User Management',
    academic: 'Academic Management',
    finance: 'Finance Management',
    admissions: 'Admissions Portal',
    reports: 'Reports',
    notifications: 'Notifications',
    'student-lookup': 'Student Lookup',
  };

  function handleLogout() {
    logout();
    onLogout();
  }

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">{pageLabels[currentPage] || 'Dashboard'}</h2>
        <span className="header-breadcrumb">Parul MIS / {pageLabels[currentPage] || 'Dashboard'}</span>
      </div>

      <div className="header-right">
        <div className="header-notif" title={`${userNotifs.length} notifications`}>
          <span className="header-notif-icon">🔔</span>
          {userNotifs.length > 0 && (
            <span className="header-notif-badge">{userNotifs.length}</span>
          )}
        </div>

        <div className="header-profile" onClick={() => setShowProfile(!showProfile)}>
          <div className="header-avatar" style={{ background: roleColor }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="header-user-info">
            <span className="header-user-name">{user.name}</span>
            <span className="header-user-role" style={{ color: roleColor }}>{ROLE_LABELS[user.role]}</span>
          </div>
          <span className="header-chevron">▾</span>

          {showProfile && (
            <div className="header-dropdown" role="menu">
              <div className="header-dropdown-user">
                <div className="header-dropdown-avatar" style={{ background: roleColor }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="header-dropdown-name">{user.name}</div>
                  <div className="header-dropdown-email">{user.email}</div>
                  <div className="header-dropdown-dept">{user.department}</div>
                </div>
              </div>
              <hr className="header-dropdown-divider" />
              <button
                className="header-dropdown-item header-dropdown-item--logout"
                onClick={handleLogout}
                role="menuitem"
              >
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
