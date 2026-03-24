import React, { useState } from 'react';
import { notifications } from '../../data/sampleData';
import { hasPermission } from '../../utils/rbac';

function Notifications({ user }) {
  const [notifs, setNotifs] = useState(notifications);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'info' });

  const canSend = hasPermission(user.role, 'SEND_NOTIFICATIONS');
  const myNotifs = notifs.filter(n => n.audience.includes(user.role));

  function handleSend() {
    if (!form.title || !form.message) return;
    const newNotif = {
      id: Date.now(),
      title: form.title,
      message: form.message,
      type: form.type,
      date: new Date().toISOString().split('T')[0],
      audience: ['admin', 'principal', 'faculty', 'student', 'finance', 'admissions'],
    };
    setNotifs(prev => [newNotif, ...prev]);
    setForm({ title: '', message: '', type: 'info' });
    setShowModal(false);
  }

  const typeIcon = { info: 'ℹ️', warning: '⚠️', success: '✅' };
  const typeColors = { info: '#2980b9', warning: '#f39c12', success: '#27ae60' };

  return (
    <div>
      <h1 className="section-title">Notifications</h1>
      <p className="section-subtitle">
        {canSend ? 'Manage and send system-wide notifications.' : 'View announcements and alerts.'}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="badge badge--info">{myNotifs.length} notifications for you</span>
        </div>
        {canSend && (
          <button className="btn btn--primary" onClick={() => setShowModal(true)}>
            🔔 Send Notification
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {myNotifs.map(notif => (
          <div
            key={notif.id}
            className="card"
            style={{
              padding: 16,
              borderLeft: `4px solid ${typeColors[notif.type] || '#2980b9'}`,
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{typeIcon[notif.type] || 'ℹ️'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#222' }}>{notif.title}</h4>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`badge ${notif.type === 'success' ? 'badge--success' : notif.type === 'warning' ? 'badge--warning' : 'badge--info'}`}>
                    {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#999' }}>{notif.date}</span>
                </div>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: '0.88rem', color: '#555', lineHeight: 1.5 }}>{notif.message}</p>
              <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {notif.audience.map(role => (
                  <span key={role} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, background: '#f0f2f5', color: '#666' }}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {myNotifs.length === 0 && (
          <div className="card" style={{ textAlign: 'center', color: '#999', padding: 40 }}>
            No notifications for you.
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Send notification">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Send Notification</h3>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-field form-field--full">
                <label>Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Notification title"
                />
              </div>
              <div className="form-field form-field--full">
                <label>Message *</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Enter notification message..."
                  rows={4}
                />
              </div>
              <div className="form-field">
                <label>Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="info">ℹ️ Information</option>
                  <option value="warning">⚠️ Warning</option>
                  <option value="success">✅ Success</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="btn btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn--primary" onClick={handleSend}>🔔 Send to All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
