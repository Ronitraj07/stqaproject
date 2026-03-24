import React from 'react';
import { systemStats, departments, notifications } from '../../data/sampleData';

function AdminDashboard() {
  return (
    <div>
      <h1 className="section-title">System Overview</h1>
      <p className="section-subtitle">Welcome back, Administrator. Here's a complete system snapshot.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>👨‍🎓</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.totalStudents.toLocaleString()}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>👨‍🏫</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.totalFaculty}</div>
            <div className="stat-label">Faculty Members</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>📚</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.totalCourses}</div>
            <div className="stat-label">Active Courses</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f3e5f5' }}>🏛️</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.totalDepartments}</div>
            <div className="stat-label">Departments</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>💰</div>
          <div className="stat-info">
            <div className="stat-value">₹{(systemStats.totalRevenue / 100000).toFixed(1)}L</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ffebee' }}>⚠️</div>
          <div className="stat-info">
            <div className="stat-value">₹{(systemStats.pendingFees / 100000).toFixed(1)}L</div>
            <div className="stat-label">Pending Fees</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0f7fa' }}>📋</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.activeAdmissions}</div>
            <div className="stat-label">Active Admissions</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff9c4' }}>🎯</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.placementRate}%</div>
            <div className="stat-label">Placement Rate</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Department Overview</h3>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Department overview">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Institute</th>
                  <th>Students</th>
                  <th>Faculty</th>
                </tr>
              </thead>
              <tbody>
                {departments.slice(0, 6).map(dept => (
                  <tr key={dept.id}>
                    <td><strong>{dept.name}</strong></td>
                    <td style={{ fontSize: '0.8rem', color: '#666' }}>{dept.institute}</td>
                    <td>{dept.students}</td>
                    <td>{dept.faculty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Notifications</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {notifications.slice(0, 4).map(notif => (
              <div key={notif.id} style={{ display: 'flex', gap: 10, padding: '10px', background: '#f8f9fc', borderRadius: 8 }}>
                <span style={{ fontSize: '1.2rem' }}>
                  {notif.type === 'warning' ? '⚠️' : notif.type === 'success' ? '✅' : 'ℹ️'}
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#333' }}>{notif.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#777', marginTop: 2 }}>{notif.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: '👤', label: 'Add New User', color: '#1a237e' },
              { icon: '📋', label: 'View Applications', color: '#16a085' },
              { icon: '💰', label: 'Financial Report', color: '#f39c12' },
              { icon: '📊', label: 'Academic Report', color: '#2980b9' },
              { icon: '🔔', label: 'Send Alert', color: '#8e44ad' },
              { icon: '⚙️', label: 'System Settings', color: '#555' },
            ].map(action => (
              <button
                key={action.label}
                className="btn btn--secondary"
                style={{ justifyContent: 'flex-start', padding: '12px 14px' }}
              >
                <span>{action.icon}</span>
                <span style={{ fontSize: '0.82rem' }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Attendance Overview</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Information Technology', value: 83 },
              { label: 'Computer Science', value: 85 },
              { label: 'Mechanical Engineering', value: 79 },
              { label: 'Management', value: 84 },
              { label: 'Electronics & Comm.', value: 80 },
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.85rem' }}>
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.value}%`,
                      background: item.value >= 85 ? '#27ae60' : item.value >= 75 ? '#f39c12' : '#e74c3c'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
