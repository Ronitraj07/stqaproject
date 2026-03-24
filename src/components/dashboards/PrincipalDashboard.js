import React from 'react';
import { systemStats, performanceData, notifications } from '../../data/sampleData';

function PrincipalDashboard({ user }) {
  return (
    <div>
      <h1 className="section-title">Principal's Overview</h1>
      <p className="section-subtitle">Welcome, {user.name}. Monitor institutional performance and key metrics.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>👨‍🎓</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.totalStudents.toLocaleString()}</div>
            <div className="stat-label">Enrolled Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>📊</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.avgAttendance}%</div>
            <div className="stat-label">Avg Attendance</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>🎯</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.placementRate}%</div>
            <div className="stat-label">Placement Rate</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fce4ec' }}>⏳</div>
          <div className="stat-info">
            <div className="stat-value">{systemStats.pendingApplications}</div>
            <div className="stat-label">Pending Approvals</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Department Performance</h3>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Department performance">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Avg GPA</th>
                  <th>Attendance</th>
                  <th>Placements</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.departments.map(dept => (
                  <tr key={dept.name}>
                    <td><strong>{dept.name}</strong></td>
                    <td>
                      <span className={`badge ${dept.avgGPA >= 7.8 ? 'badge--success' : 'badge--warning'}`}>
                        {dept.avgGPA}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${dept.attendance >= 83 ? 'badge--success' : 'badge--warning'}`}>
                        {dept.attendance}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${dept.placements >= 88 ? 'badge--success' : 'badge--info'}`}>
                        {dept.placements}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Pending Approvals</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Leave Request - Dr. Suresh Nair', dept: 'Mechanical Engg.', date: 'Oct 18', type: 'Leave' },
              { title: 'Budget Proposal - IT Department', dept: 'Finance', date: 'Oct 17', type: 'Budget' },
              { title: 'New Course Approval - AI & ML', dept: 'Computer Science', date: 'Oct 16', type: 'Academic' },
              { title: 'Event Permission - TechFest 2024', dept: 'Student Council', date: 'Oct 15', type: 'Event' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f8f9fc', borderRadius: 8, gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#333' }}>{item.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#777' }}>{item.dept} · {item.date}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn--success btn--sm">✓</button>
                  <button className="btn btn--danger btn--sm">✗</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Placement Performance</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {performanceData.departments.map(dept => (
              <div key={dept.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.85rem' }}>
                  <span>{dept.name}</span>
                  <strong>{dept.placements}%</strong>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${dept.placements}%`,
                      background: dept.placements >= 90 ? '#27ae60' : dept.placements >= 80 ? '#2980b9' : '#f39c12'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Announcements</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {notifications.filter(n => n.audience.includes('principal')).map(notif => (
              <div key={notif.id} style={{ padding: 12, background: '#f8f9fc', borderRadius: 8, borderLeft: `3px solid ${notif.type === 'warning' ? '#f39c12' : notif.type === 'success' ? '#27ae60' : '#2980b9'}` }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{notif.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 4 }}>{notif.message}</div>
                <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 4 }}>{notif.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrincipalDashboard;
