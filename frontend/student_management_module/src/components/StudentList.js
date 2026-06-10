import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosInstance';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const BASE_URL = "http://127.0.0.1:8000"; 

  useEffect(() => {
    API.get('students/').then(res => setStudents(res.data)).catch(err => console.log(err));
  }, []);

  const deleteStudent = async (id) => {
    if (window.confirm("Delete this student permanently?")) {
      await API.delete(`students/${id}/`);
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const filtered = students.filter(s => 
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      {/* Header with better alignment */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>Student Directory</h1>
        <Link to="/add" className="btn-main">
           + Add Student
        </Link>
      </div>

      <div className="card" style={{ padding: '15px' }}>
        <input 
          type="text" 
          placeholder="Search students by name..." 
          style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e5f2', borderRadius: '12px', outline: 'none' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact Details</th>
                <th>Enrolled Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img 
                        className="student-avatar" 
                        src={s.image ? (s.image.startsWith('http') ? s.image : `${BASE_URL}${s.image}`) : 'https://via.placeholder.com/48/e6f0ff/0061ff?text=User'} 
                        alt="profile" 
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{s.first_name} {s.last_name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: #2024-{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{s.email}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{s.phone_number || "No Phone"}</div>
                  </td>
                  <td>{s.enrollment_date}</td>
                  <td><span className="status-badge">Active</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/edit/${s.id}`} className="action-edit">Edit</Link>
                    <button onClick={() => deleteStudent(s.id)} className="action-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;