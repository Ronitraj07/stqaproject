import React from 'react';
import { feesData } from '../../data/sampleData';

function FinanceDashboard({ user }) {
  const paidFees = feesData.filter(f => f.status === 'Paid');
  const pendingFees = feesData.filter(f => f.status === 'Pending');
  const partialFees = feesData.filter(f => f.status === 'Partial');
  const totalCollected = feesData.reduce((s, f) => s + f.paid, 0);
  const totalPending = feesData.reduce((s, f) => s + f.due, 0);

  return (
    <div>
      <h1 className="section-title">Finance Dashboard</h1>
      <p className="section-subtitle">Welcome, {user.name}. Manage fee collection and financial operations.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>💰</div>
          <div className="stat-info">
            <div className="stat-value">₹{(totalCollected / 100000).toFixed(1)}L</div>
            <div className="stat-label">Fees Collected</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ffebee' }}>⚠️</div>
          <div className="stat-info">
            <div className="stat-value">₹{(totalPending / 100000).toFixed(1)}L</div>
            <div className="stat-label">Pending Fees</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>✅</div>
          <div className="stat-info">
            <div className="stat-value">{paidFees.length}</div>
            <div className="stat-label">Paid Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>⏳</div>
          <div className="stat-info">
            <div className="stat-value">{pendingFees.length + partialFees.length}</div>
            <div className="stat-label">Due Payments</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <h3 className="card-title">Fee Collection Status</h3>
            <div style={{ display: 'flex', gap: 10 }}>
              <span className="badge badge--success">Paid: {paidFees.length}</span>
              <span className="badge badge--warning">Partial: {partialFees.length}</span>
              <span className="badge badge--danger">Pending: {pendingFees.length}</span>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Fee collection status">
              <thead>
                <tr>
                  <th>Fee ID</th>
                  <th>Student</th>
                  <th>Semester</th>
                  <th>Total Amount</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feesData.map(fee => (
                  <tr key={fee.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{fee.id}</td>
                    <td><strong>{fee.studentName}</strong></td>
                    <td>Sem {fee.semester}</td>
                    <td>₹{fee.amount.toLocaleString()}</td>
                    <td style={{ color: '#27ae60', fontWeight: 600 }}>₹{fee.paid.toLocaleString()}</td>
                    <td style={{ color: fee.due > 0 ? '#e74c3c' : '#27ae60', fontWeight: 600 }}>₹{fee.due.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${fee.status === 'Paid' ? 'badge--success' : fee.status === 'Partial' ? 'badge--warning' : 'badge--danger'}`}>
                        {fee.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#777' }}>{fee.date || 'Not paid'}</td>
                    <td>
                      {fee.status !== 'Paid' && (
                        <button className="btn btn--primary btn--sm">Record Payment</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Revenue Summary</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Tuition Fees', collected: 5200000, target: 6000000 },
              { label: 'Hostel Fees', collected: 1800000, target: 2000000 },
              { label: 'Lab & Library', collected: 450000, target: 500000 },
              { label: 'Exam Fees', collected: 300000, target: 350000 },
            ].map(item => {
              const pct = Math.round((item.collected / item.target) * 100);
              return (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.85rem' }}>
                    <span>{item.label}</span>
                    <span>₹{(item.collected / 100000).toFixed(1)}L / ₹{(item.target / 100000).toFixed(1)}L <strong>({pct}%)</strong></span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: pct >= 90 ? '#27ae60' : pct >= 75 ? '#2980b9' : '#f39c12' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Quick Reports</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '📊', label: 'Monthly Collection Report', color: '#1a237e' },
              { icon: '⚠️', label: 'Defaulters List', color: '#e74c3c' },
              { icon: '📋', label: 'Scholarship Summary', color: '#8e44ad' },
              { icon: '💳', label: 'Payment Mode Analysis', color: '#16a085' },
              { icon: '📅', label: 'Semester-wise Report', color: '#f39c12' },
            ].map(item => (
              <button key={item.label} className="btn btn--secondary" style={{ justifyContent: 'flex-start' }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceDashboard;
