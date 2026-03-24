import React from 'react';
import { getNavItems, ROLE_LABELS, ROLE_COLORS } from '../../utils/rbac';

function Sidebar({ user, currentPage, onNavigate, collapsed, onToggle }) {
  const navItems = getNavItems(user.role);
  const roleColor = ROLE_COLORS[user.role] || '#3949ab';

  return (
    <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`} aria-label="Main navigation">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          {!collapsed && (
            <>
              <span className="sidebar-logo">🎓</span>
              <div className="sidebar-brand-text">
                <span className="sidebar-title">Parul MIS</span>
                <span className="sidebar-subtitle">Management System</span>
              </div>
            </>
          )}
          {collapsed && <span className="sidebar-logo sidebar-logo--sm">🎓</span>}
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar-user" style={{ borderLeftColor: roleColor }}>
          <div className="sidebar-user-avatar" style={{ background: roleColor }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user.name}</span>
            <span className="sidebar-user-role" style={{ color: roleColor }}>
              {ROLE_LABELS[user.role]}
            </span>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`sidebar-nav-item${currentPage === item.id ? ' sidebar-nav-item--active' : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={currentPage === item.id ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
                style={currentPage === item.id ? { background: roleColor + '20', borderLeftColor: roleColor } : {}}
              >
                <span className="sidebar-nav-icon" aria-hidden="true">{item.icon}</span>
                {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
