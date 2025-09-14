import React, { useState } from 'react';
import students from './students.json';
import './App.css';

function App() {
  const [roll, setRoll] = useState('');
  const [student, setStudent] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const foundStudent =
      students.find(
        s => s.rollno === roll.trim() || s.enrollmentno === roll.trim()
      ) || null;
    setStudent(foundStudent);
    setSearchPerformed(true);
  }

  return (
    <main style={{display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100vh'}}>
      <section className="main-card" aria-label="Student Info Search Glass Panel">
        <h1 style={{textAlign:'center', margin:'0 0 24px 0'}}>Student Information Lookup</h1>
        <form onSubmit={handleSubmit} aria-label="Student search form" className="search-form">
          <label htmlFor="rollinput"></label>
          <div className="input-button-group">
            <input
              id="rollinput"
              type="text"
              value={roll}
              onChange={e => setRoll(e.target.value)}
              aria-label="Roll Number or Enrollment Number input"
              placeholder="Enter Roll No."
              required
            />
            <button type="submit" aria-label="Search">Search</button>
          </div>
        </form>
        {student && (
          <div className="student-info-card" aria-live="polite" role="region" aria-labelledby="student-info-title" tabIndex={-1}>
            <h2 id="student-info-title" className="student-info-header">Student Details</h2>
            <div className="student-info-row"><span className="label">Name:</span> <span>{student.name}</span></div>
            <div className="student-info-row"><span className="label">Roll No:</span> <span>{student.rollno}</span></div>
            <div className="student-info-row"><span className="label">Enrollment No:</span> <span>{student.enrollmentno}</span></div>
            <div className="student-info-row"><span className="label">Semester:</span> <span>{student.semester}</span></div>
            <div className="student-info-row"><span className="label">Division:</span> <span>{student.div}</span></div>
            <div className="student-info-row"><span className="label">Department:</span> <span>{student.department}</span></div>
            <div className="student-info-row"><span className="label">Institute:</span> <span>{student.institute}</span></div>
          </div>
        )}
        {!student && searchPerformed && (
          <div className="not-found" aria-live="assertive">No student found</div>
        )}
      </section>
    </main>
  );
}

export default App;

