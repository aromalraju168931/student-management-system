import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get('students/').then(res => setStudents(res.data));
  }, []);

  const deleteStudent = (id) => {
    if(window.confirm("Delete this record?")) {
      API.delete(`students/${id}/`).then(() => setStudents(students.filter(s => s.id !== id)));
    }
  };

  return (
    <main className="page-container">
      <header style={{marginBottom: '30px'}}>
        <h1>Overview</h1>
        <p style={{color: '#a3aed0'}}>Welcome back, Administrator.</p>
      </header>

      <div className="form-grid" style={{marginBottom: '40px'}}>
        <div className="stat-box">
          <div className="stat-icon">👤</div>
          <div>
            <div style={{color: '#a3aed0', fontSize: '13px'}}>Total Students</div>
            <div style={{fontSize: '24px', fontWeight: 800}}>{students.length}</div>
          </div>
        </div>
      </div>

      <section className="card">
        <h3>Recent Enrollments</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Enrollment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td><img className="student-avatar" src={s.image || 'https://via.placeholder.com/45'} alt="avatar"/></td>
                  <td style={{fontWeight: 600}}>{s.first_name} {s.last_name}</td>
                  <td>{s.email}</td>
                  <td>{s.enrollment_date}</td>
                  <td>
                    <Link to={`/edit/${s.id}`} style={{color: 'var(--primary)', marginRight: '15px', textDecoration: 'none', fontWeight: 600}}>Edit</Link>
                    <button onClick={() => deleteStudent(s.id)} style={{color: '#ff4d4f', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;