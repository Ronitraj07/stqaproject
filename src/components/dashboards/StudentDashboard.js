import React from 'react';
import { gradesData, attendanceData, feesData, notifications } from '../../data/sampleData';
import students from '../../students.json';

function StudentDashboard({ user }) {
  const studentRecord = students.find(s => s.rollno === user.rollno) || students[1];
  const myGrades = gradesData.filter(g => g.studentId === (user.rollno || '102'));
  const myAttendance = attendanceData.filter(a => a.studentId === (user.rollno || '102'));
  const myFees = feesData.filter(f => f.studentId === (user.rollno || '102'));
  const myNotifs = notifications.filter(n => n.audience.includes('student'));

  const avgGrade = myGrades.length > 0
    ? Math.round(myGrades.reduce((s, g) => s + g.final, 0) / myGrades.length)
    : 'N/A';
  const avgAttendance = myAttendance.length > 0
    ? Math.round(myAttendance.reduce((s, a) => s + a.percentage, 0) / myAttendance.length)
    : 'N/A';

  return (
    <div>
      <h1 className="section-title">Student Dashboard</h1>
      <p className="section-subtitle">Welcome, {user.name}. Track your academic progress.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>📚</div>
          <div className="stat-info">
            <div className="stat-value">{myGrades.length || 2}</div>
            <div className="stat-label">Enrolled Courses</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: avgAttendance >= 75 ? '#e8f5e9' : '#ffebee' }}>📊</div>
          <div className="stat-info">
            <div className="stat-value">{avgAttendance}%</div>
            <div className="stat-label">Avg Attendance</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>🎯</div>
          <div className="stat-info">
            <div className="stat-value">{avgGrade}</div>
            <div className="stat-label">Avg Score</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: myFees[0]?.status === 'Paid' ? '#e8f5e9' : '#ffebee' }}>💰</div>
          <div className="stat-info">
            <div className="stat-value">
              <span className={`badge ${myFees[0]?.status === 'Paid' ? 'badge--success' : myFees[0]?.status === 'Partial' ? 'badge--warning' : 'badge--danger'}`}>
                {myFees[0]?.status || 'N/A'}
              </span>
            </div>
            <div className="stat-label">Fee Status</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">My Profile</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Name', value: studentRecord.name },
              { label: 'Roll No.', value: studentRecord.rollno },
              { label: 'Enrollment No.', value: studentRecord.enrollmentno },
              { label: 'Semester', value: `Semester ${studentRecord.semester}` },
              { label: 'Division', value: studentRecord.div },
              { label: 'Department', value: studentRecord.department },
              { label: 'Institute', value: studentRecord.institute },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem' }}>
                <span style={{ color: '#666', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontWeight: 600, color: '#333' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">My Grades</h3>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="My grades">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Midterm</th>
                  <th>Final</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {myGrades.length > 0 ? myGrades.map(g => (
                  <tr key={g.courseId}>
                    <td style={{ fontSize: '0.82rem' }}>{g.courseName}</td>
                    <td>{g.midterm}</td>
                    <td>{g.final}</td>
                    <td><span className={`badge ${g.grade.startsWith('A') ? 'badge--success' : g.grade.startsWith('B') ? 'badge--info' : 'badge--warning'}`}>{g.grade}</span></td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: '#999' }}>No grade data available</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Attendance</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myAttendance.length > 0 ? myAttendance.map(a => (
              <div key={a.courseId}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.85rem' }}>
                  <span>{a.courseId}</span>
                  <strong style={{ color: a.percentage >= 75 ? '#27ae60' : '#e74c3c' }}>{a.percentage}%</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${a.percentage}%`, background: a.percentage >= 85 ? '#27ae60' : a.percentage >= 75 ? '#f39c12' : '#e74c3c' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 3 }}>{a.present}/{a.total} classes attended</div>
              </div>
            )) : (
              <p style={{ color: '#999', fontSize: '0.9rem' }}>No attendance data available.</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Announcements</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {myNotifs.slice(0, 4).map(notif => (
              <div key={notif.id} style={{ padding: 12, background: '#f8f9fc', borderRadius: 8, borderLeft: `3px solid ${notif.type === 'warning' ? '#f39c12' : notif.type === 'success' ? '#27ae60' : '#2980b9'}` }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{notif.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 3 }}>{notif.message}</div>
                <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 4 }}>{notif.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
