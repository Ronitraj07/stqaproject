import React, { useState } from 'react';
import { performanceData, departments, feesData, systemStats } from '../../data/sampleData';


const REPORT_TYPES = [
  { id: 'academic', label: 'Academic Performance Report', icon: '🎓', roles: ['admin', 'principal', 'faculty'] },
  { id: 'attendance', label: 'Attendance Report', icon: '📊', roles: ['admin', 'principal', 'faculty'] },
  { id: 'financial', label: 'Financial Collection Report', icon: '💰', roles: ['admin', 'principal', 'finance'] },
  { id: 'admissions', label: 'Admissions Summary Report', icon: '📋', roles: ['admin', 'principal'] },
  { id: 'placement', label: 'Placement Statistics', icon: '🎯', roles: ['admin', 'principal'] },
  { id: 'department', label: 'Department Performance', icon: '🏛️', roles: ['admin', 'principal'] },
];

function Reports({ user }) {
  const [activeReport, setActiveReport] = useState(null);

  const availableReports = REPORT_TYPES.filter(r => r.roles.includes(user.role));
  const totalFees = feesData.reduce((s, f) => s + f.amount, 0);
  const collectedFees = feesData.reduce((s, f) => s + f.paid, 0);

  return (
    <div>
      <h1 className="section-title">Reports</h1>
      <p className="section-subtitle">Generate and view various institutional reports.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginBottom: 28 }}>
        {availableReports.map(report => (
          <button
            key={report.id}
            onClick={() => setActiveReport(activeReport === report.id ? null : report.id)}
            className="card"
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              padding: 18,
              border: activeReport === report.id ? '2px solid #1a237e' : '1px solid #e8eaf0',
              background: activeReport === report.id ? '#e8eaf6' : 'white',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
            aria-pressed={activeReport === report.id}
          >
            <span style={{ fontSize: '2rem' }}>{report.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a237e' }}>{report.label}</div>
              <div style={{ fontSize: '0.78rem', color: '#888', marginTop: 3 }}>Click to {activeReport === report.id ? 'collapse' : 'expand'}</div>
            </div>
          </button>
        ))}
      </div>

      {activeReport === 'academic' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🎓 Academic Performance Report</h3>
            <button className="btn btn--secondary btn--sm">📥 Export CSV</button>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Academic performance report">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Avg GPA</th>
                  <th>Avg Attendance</th>
                  <th>Performance Level</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.departments.map(dept => (
                  <tr key={dept.name}>
                    <td><strong>{dept.name}</strong></td>
                    <td>
                      <span className={`badge ${dept.avgGPA >= 7.8 ? 'badge--success' : 'badge--warning'}`}>{dept.avgGPA}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 80 }}>
                          <div className="progress-fill" style={{ width: `${dept.attendance}%`, background: dept.attendance >= 80 ? '#27ae60' : '#f39c12' }} />
                        </div>
                        {dept.attendance}%
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${dept.avgGPA >= 7.8 && dept.attendance >= 82 ? 'badge--success' : 'badge--warning'}`}>
                        {dept.avgGPA >= 7.8 && dept.attendance >= 82 ? 'Excellent' : 'Good'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeReport === 'attendance' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📊 Attendance Report</h3>
            <button className="btn btn--secondary btn--sm">📥 Export CSV</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {performanceData.departments.map(dept => (
              <div key={dept.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.88rem' }}>
                  <strong>{dept.name}</strong>
                  <span style={{ color: dept.attendance >= 80 ? '#27ae60' : '#f39c12', fontWeight: 700 }}>{dept.attendance}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${dept.attendance}%`, background: dept.attendance >= 80 ? '#27ae60' : '#f39c12' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeReport === 'financial' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">💰 Financial Collection Report</h3>
            <button className="btn btn--secondary btn--sm">📥 Export CSV</button>
          </div>
          <div className="stats-grid" style={{ marginBottom: 20 }}>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e8f5e9' }}>💰</div>
              <div className="stat-info">
                <div className="stat-value">₹{(collectedFees / 100000).toFixed(2)}L</div>
                <div className="stat-label">Total Collected</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#ffebee' }}>⚠️</div>
              <div className="stat-info">
                <div className="stat-value">₹{((totalFees - collectedFees) / 100000).toFixed(2)}L</div>
                <div className="stat-label">Total Pending</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e3f2fd' }}>📊</div>
              <div className="stat-info">
                <div className="stat-value">{Math.round((collectedFees / totalFees) * 100)}%</div>
                <div className="stat-label">Collection Rate</div>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Financial collection report">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Semester</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {feesData.map(f => (
                  <tr key={f.id}>
                    <td><strong>{f.studentName}</strong></td>
                    <td>Sem {f.semester}</td>
                    <td>₹{f.amount.toLocaleString()}</td>
                    <td style={{ color: '#27ae60', fontWeight: 600 }}>₹{f.paid.toLocaleString()}</td>
                    <td style={{ color: f.due > 0 ? '#e74c3c' : '#27ae60', fontWeight: 600 }}>₹{f.due.toLocaleString()}</td>
                    <td><span className={`badge ${f.status === 'Paid' ? 'badge--success' : f.status === 'Partial' ? 'badge--warning' : 'badge--danger'}`}>{f.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeReport === 'placement' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🎯 Placement Statistics</h3>
            <button className="btn btn--secondary btn--sm">📥 Export CSV</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {performanceData.departments.map(dept => (
              <div key={dept.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.88rem' }}>
                  <strong>{dept.name}</strong>
                  <span style={{ color: dept.placements >= 88 ? '#27ae60' : '#f39c12', fontWeight: 700 }}>{dept.placements}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${dept.placements}%`, background: dept.placements >= 88 ? '#27ae60' : dept.placements >= 80 ? '#2980b9' : '#f39c12' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeReport === 'department' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🏛️ Department Performance</h3>
            <button className="btn btn--secondary btn--sm">📥 Export CSV</button>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Department performance report">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Students</th>
                  <th>Faculty</th>
                  <th>Avg GPA</th>
                  <th>Attendance</th>
                  <th>Placement</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {departments.map(dept => {
                  const perf = performanceData.departments.find(d => d.name === dept.name);
                  return (
                    <tr key={dept.id}>
                      <td><strong>{dept.name}</strong></td>
                      <td>{dept.students}</td>
                      <td>{dept.faculty}</td>
                      <td>{perf ? <span className={`badge ${perf.avgGPA >= 7.8 ? 'badge--success' : 'badge--warning'}`}>{perf.avgGPA}</span> : 'N/A'}</td>
                      <td>{perf ? `${perf.attendance}%` : 'N/A'}</td>
                      <td>{perf ? `${perf.placements}%` : 'N/A'}</td>
                      <td>
                        {perf ? (
                          <span className={`badge ${perf.avgGPA >= 7.8 && perf.attendance >= 82 && perf.placements >= 88 ? 'badge--success' : 'badge--info'}`}>
                            {perf.avgGPA >= 7.8 && perf.attendance >= 82 && perf.placements >= 88 ? '⭐ Excellent' : '✓ Good'}
                          </span>
                        ) : 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeReport === 'admissions' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📋 Admissions Summary</h3>
            <button className="btn btn--secondary btn--sm">📥 Export CSV</button>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e3f2fd' }}>📋</div>
              <div className="stat-info">
                <div className="stat-value">{systemStats.activeAdmissions}</div>
                <div className="stat-label">Applications Received</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e8f5e9' }}>✅</div>
              <div className="stat-info">
                <div className="stat-value">145</div>
                <div className="stat-label">Offers Sent</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fff3e0' }}>🎓</div>
              <div className="stat-info">
                <div className="stat-value">98</div>
                <div className="stat-label">Confirmed Enrollments</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!activeReport && (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: '#999' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: '1rem', fontWeight: 600 }}>Select a report type above to view details</div>
          <div style={{ fontSize: '0.88rem', marginTop: 6 }}>Reports can be exported as CSV for further analysis</div>
        </div>
      )}
    </div>
  );
}

export default Reports;
