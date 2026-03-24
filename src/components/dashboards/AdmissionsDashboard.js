import React from 'react';
import { applicationsData } from '../../data/sampleData';

function AdmissionsDashboard({ user }) {
  const approved = applicationsData.filter(a => a.status === 'Approved');
  const underReview = applicationsData.filter(a => a.status === 'Under Review');
  const pending = applicationsData.filter(a => a.status !== 'Approved' && a.status !== 'Under Review');

  return (
    <div>
      <h1 className="section-title">Admissions Dashboard</h1>
      <p className="section-subtitle">Welcome, {user.name}. Process applications and manage enrollments.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>📋</div>
          <div className="stat-info">
            <div className="stat-value">{applicationsData.length}</div>
            <div className="stat-label">Total Applications</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>✅</div>
          <div className="stat-info">
            <div className="stat-value">{approved.length}</div>
            <div className="stat-label">Approved</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>🔄</div>
          <div className="stat-info">
            <div className="stat-value">{underReview.length}</div>
            <div className="stat-label">Under Review</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ffebee' }}>⏳</div>
          <div className="stat-info">
            <div className="stat-value">{pending.length}</div>
            <div className="stat-label">Pending/Waitlisted</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <h3 className="card-title">Recent Applications</h3>
            <button className="btn btn--primary btn--sm">+ New Application</button>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Recent applications">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Applicant Name</th>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Applied On</th>
                  <th>Score</th>
                  <th>Documents</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicationsData.map(app => (
                  <tr key={app.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{app.id}</td>
                    <td><strong>{app.name}</strong></td>
                    <td style={{ fontSize: '0.82rem' }}>{app.course}</td>
                    <td><span className="badge badge--gray">{app.category}</span></td>
                    <td style={{ fontSize: '0.82rem', color: '#777' }}>{app.date}</td>
                    <td><strong>{app.score}</strong></td>
                    <td>
                      <span className={`badge ${app.documents ? 'badge--success' : 'badge--danger'}`}>
                        {app.documents ? '✓ Complete' : '✗ Missing'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        app.status === 'Approved' ? 'badge--success' :
                        app.status === 'Under Review' ? 'badge--info' :
                        app.status === 'Waitlisted' ? 'badge--warning' :
                        'badge--danger'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn--secondary btn--sm">View</button>
                        {app.status === 'Under Review' && (
                          <button className="btn btn--success btn--sm">Approve</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Admission Pipeline</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { stage: 'Applications Received', count: 342, color: '#2980b9' },
              { stage: 'Documents Verified', count: 298, color: '#3949ab' },
              { stage: 'Entrance Score Checked', count: 276, color: '#8e44ad' },
              { stage: 'Interview/Counseling', count: 198, color: '#16a085' },
              { stage: 'Offers Sent', count: 145, color: '#27ae60' },
              { stage: 'Confirmed Enrollments', count: 98, color: '#f39c12' },
            ].map((stage, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.85rem' }}>
                  <span>{stage.stage}</span>
                  <strong>{stage.count}</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(stage.count / 342) * 100}%`, background: stage.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Course-wise Seats</h3>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Course seat availability">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Total Seats</th>
                  <th>Filled</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { course: 'B.Tech CS', total: 60, filled: 54 },
                  { course: 'B.Tech IT', total: 60, filled: 58 },
                  { course: 'B.Tech EC', total: 60, filled: 45 },
                  { course: 'B.Tech ME', total: 60, filled: 50 },
                  { course: 'MBA', total: 60, filled: 48 },
                  { course: 'B.Pharm', total: 60, filled: 38 },
                ].map(row => (
                  <tr key={row.course}>
                    <td>{row.course}</td>
                    <td>{row.total}</td>
                    <td>{row.filled}</td>
                    <td>
                      <span className={`badge ${row.total - row.filled <= 5 ? 'badge--danger' : row.total - row.filled <= 15 ? 'badge--warning' : 'badge--success'}`}>
                        {row.total - row.filled}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmissionsDashboard;
