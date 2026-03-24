import React, { useState } from 'react';
import { applicationsData } from '../../data/sampleData';
import { hasPermission } from '../../utils/rbac';

const STATUS_OPTIONS = ['Under Review', 'Approved', 'Waitlisted', 'Rejected', 'Pending Documents'];

function AdmissionsPortal({ user }) {
  const [applications, setApplications] = useState(applicationsData);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewApp, setViewApp] = useState(null);

  const canManage = hasPermission(user.role, 'MANAGE_APPLICATIONS');

  const filtered = applications.filter(app => {
    const matchSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.course.toLowerCase().includes(search.toLowerCase()) ||
      app.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || app.status === filter;
    return matchSearch && matchFilter;
  });

  function handleStatusChange(appId, newStatus) {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
  }

  function openViewModal(app) {
    setViewApp(app);
    setShowModal(true);
  }

  return (
    <div>
      <h1 className="section-title">Admissions Portal</h1>
      <p className="section-subtitle">Process applications, verify documents, and manage enrollment.</p>

      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Applications', value: applications.length, color: '#2980b9' },
          { label: 'Approved', value: applications.filter(a => a.status === 'Approved').length, color: '#27ae60' },
          { label: 'Under Review', value: applications.filter(a => a.status === 'Under Review').length, color: '#f39c12' },
          { label: 'Documents Pending', value: applications.filter(a => !a.documents).length, color: '#e74c3c' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.color + '20', fontSize: '1.5rem', color: s.color }}>
              {s.label === 'Total Applications' ? '📋' : s.label === 'Approved' ? '✅' : s.label === 'Under Review' ? '🔄' : '⚠️'}
            </div>
            <div className="stat-info">
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, flex: 1, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name, course, or application ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 200, padding: '9px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: '0.9rem', outline: 'none' }}
              aria-label="Search applications"
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{ padding: '9px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: 'white' }}
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {canManage && <button className="btn btn--primary">+ New Application</button>}
        </div>

        <div className="table-container">
          <table className="data-table" aria-label="Applications table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Applicant</th>
                <th>Course Applied</th>
                <th>Category</th>
                <th>Score</th>
                <th>Applied On</th>
                <th>Documents</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{app.id}</td>
                  <td><strong>{app.name}</strong></td>
                  <td style={{ fontSize: '0.83rem' }}>{app.course}</td>
                  <td><span className="badge badge--gray">{app.category}</span></td>
                  <td><strong>{app.score}</strong></td>
                  <td style={{ fontSize: '0.82rem', color: '#777' }}>{app.date}</td>
                  <td>
                    <span className={`badge ${app.documents ? 'badge--success' : 'badge--danger'}`}>
                      {app.documents ? '✓ Complete' : '✗ Missing'}
                    </span>
                  </td>
                  <td>
                    {canManage ? (
                      <select
                        value={app.status}
                        onChange={e => handleStatusChange(app.id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.82rem', cursor: 'pointer' }}
                        aria-label={`Status for ${app.name}`}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    ) : (
                      <span className={`badge ${
                        app.status === 'Approved' ? 'badge--success' :
                        app.status === 'Under Review' ? 'badge--info' :
                        app.status === 'Waitlisted' ? 'badge--warning' :
                        'badge--danger'
                      }`}>{app.status}</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn--secondary btn--sm" onClick={() => openViewModal(app)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: 'center', color: '#999', padding: 24 }}>No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && viewApp && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Application details">
          <div className="modal" style={{ maxWidth: 560 }}>
            <div className="modal-header">
              <h3 className="modal-title">Application Details</h3>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Application ID', value: viewApp.id },
                { label: 'Applicant Name', value: viewApp.name },
                { label: 'Course Applied', value: viewApp.course },
                { label: 'Category', value: viewApp.category },
                { label: 'Entrance Score', value: viewApp.score },
                { label: 'Applied On', value: viewApp.date },
                { label: 'Documents', value: viewApp.documents ? 'Complete' : 'Incomplete / Missing' },
                { label: 'Current Status', value: viewApp.status },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>{item.value}</span>
                </div>
              ))}
            </div>
            {canManage && (
              <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn btn--success" onClick={() => { handleStatusChange(viewApp.id, 'Approved'); setShowModal(false); }}>✓ Approve</button>
                <button className="btn btn--warning" onClick={() => { handleStatusChange(viewApp.id, 'Waitlisted'); setShowModal(false); }}>⏳ Waitlist</button>
                <button className="btn btn--danger" onClick={() => { handleStatusChange(viewApp.id, 'Rejected'); setShowModal(false); }}>✗ Reject</button>
                <button className="btn btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdmissionsPortal;
