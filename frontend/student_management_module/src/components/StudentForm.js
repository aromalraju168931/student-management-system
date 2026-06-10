import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axiosInstance';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Memory for form fields
    const [student, setStudent] = useState({
        first_name: '', last_name: '', email: '', phone_number: '',
        enrollment_date: '', address: '', dob: ''
    });

    // Memory specifically for the NEW file being uploaded
    const [newImage, setNewImage] = useState(null);
    const [errors, setErrors] = useState({});

    // Fetch data if we are in EDIT mode
    useEffect(() => {
        if (id) {
            API.get(`students/${id}/`)
               .then(res => {
                   // We set the student data, but keep image separate
                   setStudent(res.data);
               })
               .catch(err => console.log(err));
        }
    }, [id]);

    const validate = () => {
        let tempErrors = {};
        if (!student.first_name) tempErrors.first_name = "First name is required";
        if (!student.last_name) tempErrors.last_name = "Last name is required";
        if (!student.email || !student.email.includes("@")) tempErrors.email = "Valid email is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        
        // 1. Append all text fields
        formData.append('first_name', student.first_name);
        formData.append('last_name', student.last_name);
        formData.append('email', student.email);
        formData.append('phone_number', student.phone_number);
        formData.append('enrollment_date', student.enrollment_date);
        formData.append('address', student.address);
        formData.append('dob', student.dob);

        /**
         * 2. THE FIX: 
         * We ONLY append 'image' if 'newImage' is an actual File object.
         * If 'newImage' is null, we don't send the 'image' key at all.
         * Because we use PATCH, Django will simply keep the old image.
         */
        if (newImage instanceof File) {
            formData.append('image', newImage);
        }

        try {
            if (id) {
                // PATCH only updates the fields we provided
                await API.patch(`students/${id}/`, formData);
            } else {
                // POST creates a new record
                await API.post('students/', formData);
            }
            navigate('/dashboard');
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            }
        }
    };

    return (
        <div className="page-container">
            <div className="card" style={{maxWidth: '900px', margin: 'auto'}}>
                <h2 style={{marginBottom: '30px'}}>{id ? "Update Student Information" : "Register New Student"}</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" value={student.first_name} onChange={e => setStudent({...student, first_name: e.target.value})} placeholder="First Name" />
                            {errors.first_name && <span className="error">{errors.first_name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" value={student.last_name} onChange={e => setStudent({...student, last_name: e.target.value})} placeholder="Last Name" />
                            {errors.last_name && <span className="error">{errors.last_name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" value={student.email} onChange={e => setStudent({...student, email: e.target.value})} placeholder="Email" />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" value={student.phone_number} onChange={e => setStudent({...student, phone_number: e.target.value})} placeholder="Phone Number" />
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" value={student.dob} onChange={e => setStudent({...student, dob: e.target.value})} />
                        </div>

                        <div className="form-group">
                            <label>Enrollment Date</label>
                            <input type="date" value={student.enrollment_date} onChange={e => setStudent({...student, enrollment_date: e.target.value})} />
                        </div>

                        <div className="form-group full-width">
                            <label>Address</label>
                            <textarea rows="3" value={student.address} onChange={e => setStudent({...student, address: e.target.value})} placeholder="Full Address" />
                        </div>

                        <div className="form-group full-width">
                            <label>Student Photo {id && <span style={{color: 'var(--text-muted)', fontWeight: 'normal'}}>(Leave blank to keep current)</span>}</label>
                            <input type="file" onChange={e => setNewImage(e.target.files[0])} />
                        </div>
                    </div>

                    <div style={{marginTop: '30px', display: 'flex', gap: '15px'}}>
                        <button type="submit" className="btn-main">
                            {id ? "Save Changes" : "Register Student"}
                        </button>
                        <button type="button" onClick={() => navigate('/dashboard')} className="btn-main" style={{background: '#f4f7fe', color: 'var(--primary)'}}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;