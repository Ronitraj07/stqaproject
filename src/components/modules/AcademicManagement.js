import React, { useState } from 'react';
import { courses, attendanceData, gradesData, departments } from '../../data/sampleData';
import { hasPermission } from '../../utils/rbac';

function AcademicManagement({ user }) {
  const [activeTab, setActiveTab] = useState('courses');

  const canManage = hasPermission(user.role, 'MANAGE_COURSES');
  const isStudent = user.role === 'student';
  const myGrades = gradesData.filter(g => g.studentId === (user.rollno || '102'));
  const myAttendance = attendanceData.filter(a => a.studentId === (user.rollno || '102'));

  const tabs = isStudent
    ? [{ id: 'courses', label: '📚 My Courses' }, { id: 'grades', label: '🎯 My Grades' }, { id: 'attendance', label: '📊 Attendance' }]
    : [{ id: 'courses', label: '📚 Courses' }, { id: 'attendance', label: '📊 Attendance' }, { id: 'grades', label: '🎯 Grades' }, { id: 'departments', label: '🏛️ Departments' }];

  return (
    <div>
      <h1 className="section-title">{isStudent ? 'My Academic Records' : 'Academic Management'}</h1>
      <p className="section-subtitle">
        {isStudent ? 'View your enrolled courses, grades, and attendance.' : 'Manage courses, attendance records, and grades.'}
      </p>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '2px solid #e8eaf0', paddingBottom: 0 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? '#1a237e' : '#777',
              borderBottom: activeTab === tab.id ? '2px solid #1a237e' : '2px solid transparent',
              marginBottom: -2,
              transition: 'color 0.2s',
            }}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'courses' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>{courses.length} courses available</span>
            {canManage && <button className="btn btn--primary">+ Add Course</button>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {courses.map(course => (
              <div key={course.id} className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1a237e', fontSize: '0.95rem' }}>{course.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#777', marginTop: 2 }}>{course.id}</div>
                  </div>
                  <span className="badge badge--info">{course.credits} Credits</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: '0.83rem', color: '#555' }}>
                  <div>🏛️ {course.dept}</div>
                  <div>👨‍🏫 {course.faculty}</div>
                  <div>📅 {course.schedule}</div>
                  <div>👥 {course.enrolled} students enrolled · Semester {course.semester}</div>
                </div>
                {canManage && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn btn--secondary btn--sm">Edit</button>
                    <button className="btn btn--secondary btn--sm">Attendance</button>
                    <button className="btn btn--secondary btn--sm">Grades</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{isStudent ? 'My Attendance' : 'Attendance Records'}</h3>
            {canManage && <button className="btn btn--primary btn--sm">Mark Attendance</button>}
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Attendance records">
              <thead>
                <tr>
                  {!isStudent && <th>Student ID</th>}
                  <th>Course</th>
                  <th>Classes Present</th>
                  <th>Total Classes</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(isStudent ? myAttendance : attendanceData).map((a, i) => (
                  <tr key={i}>
                    {!isStudent && <td>Student {a.studentId}</td>}
                    <td>{a.courseId}</td>
                    <td>{a.present}</td>
                    <td>{a.total}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 80 }}>
                          <div className="progress-fill" style={{ width: `${a.percentage}%`, background: a.percentage >= 75 ? '#27ae60' : '#e74c3c' }} />
                        </div>
                        <strong>{a.percentage}%</strong>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${a.percentage >= 85 ? 'badge--success' : a.percentage >= 75 ? 'badge--warning' : 'badge--danger'}`}>
                        {a.percentage >= 85 ? 'Excellent' : a.percentage >= 75 ? 'Satisfactory' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'grades' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{isStudent ? 'My Grades' : 'Grade Records'}</h3>
            {canManage && <button className="btn btn--primary btn--sm">Enter Grades</button>}
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Grade records">
              <thead>
                <tr>
                  {!isStudent && <th>Student ID</th>}
                  <th>Course</th>
                  <th>Midterm</th>
                  <th>Final</th>
                  <th>Assignment</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {(isStudent ? myGrades : gradesData).map((g, i) => (
                  <tr key={i}>
                    {!isStudent && <td>Student {g.studentId}</td>}
                    <td>{g.courseName}</td>
                    <td>{g.midterm}</td>
                    <td>{g.final}</td>
                    <td>{g.assignment}</td>
                    <td>
                      <span className={`badge ${g.grade.startsWith('A') ? 'badge--success' : g.grade.startsWith('B') ? 'badge--info' : 'badge--warning'}`}>
                        {g.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'departments' && !isStudent && (
        <div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e3f2fd' }}>🏛️</div>
              <div className="stat-info">
                <div className="stat-value">{departments.length}</div>
                <div className="stat-label">Departments</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#e8f5e9' }}>👨‍🎓</div>
              <div className="stat-info">
                <div className="stat-value">{departments.reduce((s, d) => s + d.students, 0)}</div>
                <div className="stat-label">Total Students</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fff3e0' }}>👨‍🏫</div>
              <div className="stat-info">
                <div className="stat-value">{departments.reduce((s, d) => s + d.faculty, 0)}</div>
                <div className="stat-label">Total Faculty</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">All Departments</h3>
            </div>
            <div className="table-container">
              <table className="data-table" aria-label="Departments">
                <thead>
                  <tr>
                    <th>Dept. Name</th>
                    <th>Code</th>
                    <th>Head of Dept.</th>
                    <th>Institute</th>
                    <th>Students</th>
                    <th>Faculty</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(dept => (
                    <tr key={dept.id}>
                      <td><strong>{dept.name}</strong></td>
                      <td><span className="badge badge--info">{dept.code}</span></td>
                      <td>{dept.head}</td>
                      <td style={{ fontSize: '0.82rem', color: '#666' }}>{dept.institute}</td>
                      <td>{dept.students}</td>
                      <td>{dept.faculty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AcademicManagement;
