import React from 'react';
import { courses, attendanceData } from '../../data/sampleData';

function FacultyDashboard({ user }) {
  const myCourses = courses.filter(c => c.faculty === user.name).length > 0
    ? courses.filter(c => c.faculty === user.name)
    : courses.slice(0, 3);

  return (
    <div>
      <h1 className="section-title">Faculty Dashboard</h1>
      <p className="section-subtitle">Welcome, {user.name}. Manage your courses and students.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>📚</div>
          <div className="stat-info">
            <div className="stat-value">{myCourses.length}</div>
            <div className="stat-label">My Courses</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>👨‍🎓</div>
          <div className="stat-info">
            <div className="stat-value">{myCourses.reduce((sum, c) => sum + c.enrolled, 0)}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>📊</div>
          <div className="stat-info">
            <div className="stat-value">82%</div>
            <div className="stat-label">Avg Attendance</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f3e5f5' }}>⚠️</div>
          <div className="stat-info">
            <div className="stat-value">5</div>
            <div className="stat-label">Pending Grades</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">My Courses</h3>
            <span className="badge badge--info">{myCourses.length} Active</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myCourses.map(course => (
              <div key={course.id} style={{ padding: 14, border: '1px solid #e8eaf0', borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1a237e' }}>{course.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#777' }}>{course.id} · Semester {course.semester}</div>
                  </div>
                  <span className="badge badge--success">{course.credits} Credits</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#555', marginBottom: 6 }}>📅 {course.schedule}</div>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem', color: '#666' }}>
                  <span>👥 {course.enrolled} students</span>
                  <span>🏛️ {course.dept}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Today's Schedule</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { time: '9:00 - 10:00', course: 'Data Structures & Algorithms', room: 'Room 201', sem: 'Sem 3' },
              { time: '10:00 - 11:30', course: 'Database Management Systems', room: 'Room 205', sem: 'Sem 3' },
              { time: '11:30 - 12:30', course: 'Faculty Meeting', room: 'Conference Hall', sem: '—' },
              { time: '2:00 - 3:30', course: 'Lab: DBMS Practical', room: 'Lab 3', sem: 'Sem 3' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 12px', background: '#f8f9fc', borderRadius: 8, alignItems: 'center' }}>
                <div style={{ width: 80, fontSize: '0.8rem', color: '#777', flexShrink: 0 }}>{item.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.course}</div>
                  <div style={{ fontSize: '0.78rem', color: '#888' }}>{item.room} · {item.sem}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Attendance Summary</h3>
          </div>
          <div className="table-container">
            <table className="data-table" aria-label="Attendance summary">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Present</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((a, i) => (
                  <tr key={i}>
                    <td>Student {a.studentId}</td>
                    <td style={{ fontSize: '0.8rem' }}>{a.courseId}</td>
                    <td>{a.present}/{a.total}</td>
                    <td>
                      <span className={`badge ${a.percentage >= 85 ? 'badge--success' : a.percentage >= 75 ? 'badge--warning' : 'badge--danger'}`}>
                        {a.percentage}%
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
            <h3 className="card-title">Pending Tasks</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { task: 'Submit midterm grades for CS301', due: 'Oct 20', priority: 'high' },
              { task: 'Update attendance for Oct 15-17', due: 'Oct 18', priority: 'medium' },
              { task: 'Prepare lab assignment for CS302', due: 'Oct 22', priority: 'low' },
              { task: 'Review student project submissions', due: 'Oct 25', priority: 'medium' },
            ].map((task, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#f8f9fc', borderRadius: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: task.priority === 'high' ? '#e74c3c' : task.priority === 'medium' ? '#f39c12' : '#27ae60', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{task.task}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>Due: {task.due}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
