import React, { useState } from 'react';
import { getUsers } from '../../utils/auth';
import { ROLE_LABELS, ROLE_COLORS } from '../../utils/rbac';

function UserManagement({ user }) {
  const [users, setUsers] = useState(getUsers());
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ name: '', username: '', email: '', role: 'student', department: '' });

  const isAdmin = user.role === 'admin';

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function openAddModal() {
    setEditUser(null);
    setForm({ name: '', username: '', email: '', role: 'student', department: '' });
    setShowModal(true);
  }

  function openEditModal(u) {
    setEditUser(u);
    setForm({ name: u.name, username: u.username, email: u.email, role: u.role, department: u.department });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name || !form.username || !form.email) return;
    if (editUser) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...form } : u));
    } else {
      setUsers(prev => [...prev, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  }

  return (
    <div>
      <h1 className="section-title">User Management</h1>
      <p className="section-subtitle">
        {isAdmin ? 'Create, edit, and manage all system users.' : 'View all system users.'}
      </p>

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name, username, department..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: 200, padding: '9px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: '0.9rem', outline: 'none' }}
              aria-label="Search users"
            />
            <div style={{ display: 'flex', gap: 8 }}>
              {Object.entries(ROLE_LABELS).map(([role, label]) => (
                <span key={role} className={`badge badge--gray`} style={{ background: ROLE_COLORS[role] + '20', color: ROLE_COLORS[role] }}>
                  {users.filter(u => u.role === role).length} {label.split('/')[0].trim()}s
                </span>
              ))}
            </div>
          </div>
          {isAdmin && (
            <button className="btn btn--primary" onClick={openAddModal}>+ Add User</button>
          )}
        </div>

        <div className="table-container">
          <table className="data-table" aria-label="Users table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, i) => (
                <tr key={u.id}>
                  <td style={{ color: '#999', fontSize: '0.85rem' }}>{i + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: ROLE_COLORS[u.role], color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                        {u.name.charAt(0)}
                      </div>
                      <strong>{u.name}</strong>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#555' }}>{u.username}</td>
                  <td style={{ fontSize: '0.85rem', color: '#666' }}>{u.email}</td>
                  <td style={{ fontSize: '0.85rem' }}>{u.department}</td>
                  <td>
                    <span className="badge" style={{ background: ROLE_COLORS[u.role] + '20', color: ROLE_COLORS[u.role] }}>
                      {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  {isAdmin && (
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn--secondary btn--sm" onClick={() => openEditModal(u)}>Edit</button>
                        <button className="btn btn--danger btn--sm" onClick={() => handleDelete(u.id)}>Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr><td colSpan={isAdmin ? 7 : 6} style={{ textAlign: 'center', color: '#999', padding: 24 }}>No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={editUser ? 'Edit user' : 'Add user'}>
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editUser ? 'Edit User' : 'Add New User'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close modal">✕</button>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label>Full Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" />
              </div>
              <div className="form-field">
                <label>Username *</label>
                <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" />
              </div>
              <div className="form-field form-field--full">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email address" />
              </div>
              <div className="form-field">
                <label>Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  {Object.entries(ROLE_LABELS).map(([role, label]) => (
                    <option key={role} value={role}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>Department</label>
                <input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} placeholder="Department" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="btn btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn--primary" onClick={handleSave}>{editUser ? 'Save Changes' : 'Add User'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
