import React, { useState } from 'react';
import { feesData } from '../../data/sampleData';
import { hasPermission } from '../../utils/rbac';

function FinanceManagement({ user }) {
  const [fees, setFees] = useState(feesData);
  const [showModal, setShowModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const canManage = hasPermission(user.role, 'MANAGE_FEES');
  const isStudent = user.role === 'student';
  const myFees = fees.filter(f => f.studentId === (user.rollno || '102'));
  const displayFees = isStudent ? myFees : fees;

  const totalCollected = fees.reduce((s, f) => s + f.paid, 0);
  const totalPending = fees.reduce((s, f) => s + f.due, 0);

  function openPaymentModal(fee) {
    setSelectedFee(fee);
    setPaymentAmount(fee.due.toString());
    setShowModal(true);
  }

  function handleRecordPayment() {
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0 || amount > selectedFee.due) return;
    setFees(prev => prev.map(f => {
      if (f.id !== selectedFee.id) return f;
      const newPaid = f.paid + amount;
      const newDue = f.due - amount;
      return {
        ...f,
        paid: newPaid,
        due: newDue,
        status: newDue === 0 ? 'Paid' : 'Partial',
        date: new Date().toISOString().split('T')[0],
      };
    }));
    setShowModal(false);
  }

  return (
    <div>
      <h1 className="section-title">{isStudent ? 'My Fees' : 'Finance Management'}</h1>
      <p className="section-subtitle">
        {isStudent ? 'View your fee structure and payment status.' : 'Manage fee collection, payments, and financial records.'}
      </p>

      {!isStudent && (
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e8f5e9' }}>💰</div>
            <div className="stat-info">
              <div className="stat-value">₹{(totalCollected / 100000).toFixed(1)}L</div>
              <div className="stat-label">Total Collected</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ffebee' }}>⚠️</div>
            <div className="stat-info">
              <div className="stat-value">₹{(totalPending / 100000).toFixed(1)}L</div>
              <div className="stat-label">Total Pending</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e3f2fd' }}>✅</div>
            <div className="stat-info">
              <div className="stat-value">{fees.filter(f => f.status === 'Paid').length}</div>
              <div className="stat-label">Fully Paid</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fff3e0' }}>🔄</div>
            <div className="stat-info">
              <div className="stat-value">{fees.filter(f => f.status !== 'Paid').length}</div>
              <div className="stat-label">Outstanding</div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{isStudent ? 'My Fee Records' : 'Fee Collection Records'}</h3>
          {canManage && <button className="btn btn--primary btn--sm">+ Add Fee Record</button>}
        </div>

        <div className="table-container">
          <table className="data-table" aria-label="Fee records">
            <thead>
              <tr>
                <th>Fee ID</th>
                {!isStudent && <th>Student</th>}
                <th>Semester</th>
                <th>Total Amount</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Status</th>
                <th>Date</th>
                {canManage && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {displayFees.map(fee => (
                <tr key={fee.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{fee.id}</td>
                  {!isStudent && <td><strong>{fee.studentName}</strong></td>}
                  <td>Semester {fee.semester}</td>
                  <td>₹{fee.amount.toLocaleString()}</td>
                  <td style={{ color: '#27ae60', fontWeight: 600 }}>₹{fee.paid.toLocaleString()}</td>
                  <td style={{ color: fee.due > 0 ? '#e74c3c' : '#27ae60', fontWeight: 600 }}>
                    ₹{fee.due.toLocaleString()}
                  </td>
                  <td>
                    <span className={`badge ${fee.status === 'Paid' ? 'badge--success' : fee.status === 'Partial' ? 'badge--warning' : 'badge--danger'}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#777' }}>{fee.date || '—'}</td>
                  {canManage && (
                    <td>
                      {fee.status !== 'Paid' ? (
                        <button className="btn btn--success btn--sm" onClick={() => openPaymentModal(fee)}>
                          Record Payment
                        </button>
                      ) : (
                        <button className="btn btn--secondary btn--sm">Receipt</button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {displayFees.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: 'center', color: '#999', padding: 24 }}>No fee records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isStudent && (
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header">
            <h3 className="card-title">Fee Structure</h3>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Fee structure">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Tuition Fee</th>
                  <th>Hostel Fee</th>
                  <th>Lab Fee</th>
                  <th>Total/Semester</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { course: 'B.Tech (All Branches)', tuition: 32000, hostel: 8000, lab: 3000 },
                  { course: 'B.Pharm', tuition: 30000, hostel: 8000, lab: 4000 },
                  { course: 'MBA', tuition: 35000, hostel: 8000, lab: 2000 },
                  { course: 'B.Sc (All Sciences)', tuition: 22000, hostel: 8000, lab: 3500 },
                ].map(row => (
                  <tr key={row.course}>
                    <td><strong>{row.course}</strong></td>
                    <td>₹{row.tuition.toLocaleString()}</td>
                    <td>₹{row.hostel.toLocaleString()}</td>
                    <td>₹{row.lab.toLocaleString()}</td>
                    <td><strong>₹{(row.tuition + row.hostel + row.lab).toLocaleString()}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && selectedFee && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Record payment">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Record Payment</h3>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
            </div>
            <div style={{ marginBottom: 16, padding: 14, background: '#f8f9fc', borderRadius: 8 }}>
              <div style={{ fontSize: '0.88rem', color: '#555', marginBottom: 4 }}>Student: <strong>{selectedFee.studentName}</strong></div>
              <div style={{ fontSize: '0.88rem', color: '#555', marginBottom: 4 }}>Total: <strong>₹{selectedFee.amount.toLocaleString()}</strong></div>
              <div style={{ fontSize: '0.88rem', color: '#555', marginBottom: 4 }}>Already Paid: <strong style={{ color: '#27ae60' }}>₹{selectedFee.paid.toLocaleString()}</strong></div>
              <div style={{ fontSize: '0.88rem', color: '#555' }}>Outstanding: <strong style={{ color: '#e74c3c' }}>₹{selectedFee.due.toLocaleString()}</strong></div>
            </div>
            <div className="form-field form-field--full">
              <label>Payment Amount (₹)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={e => setPaymentAmount(e.target.value)}
                max={selectedFee.due}
                min={1}
                placeholder="Enter amount"
              />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="btn btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn--success" onClick={handleRecordPayment}>Record Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinanceManagement;
