import React, { useState } from 'react';
import students from '../../students.json';

function StudentLookup() {
  const [query, setQuery] = useState('');
  const [student, setStudent] = useState(null);
  const [searched, setSearched] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    const found = students.find(
      s => s.rollno === query.trim() || s.enrollmentno === query.trim()
    ) || null;
    setStudent(found);
    setSearched(true);
  }

  return (
    <div>
      <h1 className="section-title">Student Lookup</h1>
      <p className="section-subtitle">Search for student information by Roll Number or Enrollment Number.</p>

      <div className="card" style={{ maxWidth: 600 }}>
        <form onSubmit={handleSearch} aria-label="Student search form" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter Roll No. or Enrollment No. (e.g. 101 or 2509140900001)"
            required
            aria-label="Roll Number or Enrollment Number"
            style={{ flex: 1, minWidth: 200, padding: '11px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: '0.95rem', outline: 'none' }}
          />
          <button type="submit" className="btn btn--primary">
            🔍 Search
          </button>
        </form>

        {searched && student && (
          <div style={{ marginTop: 24, border: '1px solid #e8eaf0', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: '#1a237e', color: 'white', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                {student.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{student.name}</div>
                <div style={{ opacity: 0.8, fontSize: '0.82rem' }}>{student.department} · {student.institute}</div>
              </div>
            </div>
            <div>
              {[
                { label: 'Roll Number', value: student.rollno },
                { label: 'Enrollment Number', value: student.enrollmentno },
                { label: 'Semester', value: `Semester ${student.semester}` },
                { label: 'Division', value: student.div },
                { label: 'Department', value: student.department },
                { label: 'Institute', value: student.institute },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 18px', borderBottom: '1px solid #f0f2f5', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {searched && !student && (
          <div style={{ marginTop: 20, padding: 16, background: '#ffebee', borderRadius: 8, color: '#c62828', fontWeight: 600 }} role="alert" aria-live="assertive">
            ⚠️ No student found with Roll No. / Enrollment No.: <em>{query}</em>
          </div>
        )}

        <div style={{ marginTop: 20, fontSize: '0.82rem', color: '#888' }}>
          <strong>Tip:</strong> Try roll numbers 101–140 or their corresponding enrollment numbers.
        </div>
      </div>
    </div>
  );
}

export default StudentLookup;
