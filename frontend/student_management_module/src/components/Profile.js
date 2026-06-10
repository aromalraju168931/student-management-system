import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';

const Profile = () => {
  const [profile, setProfile] = useState({ 
    username: '', 
    email: '', 
    first_name: '', 
    last_name: '', 
    phone_number: '' 
  });
  
  const [passwords, setPasswords] = useState({ old_password: '', new_password: '' });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Fetching data from B-E
    API.get('profile/')
      .then(res => {
        console.log("Data from server:", res.data);
        setProfile({
            username: res.data.username || '',
            email: res.data.email || '',
            first_name: res.data.first_name || '',
            last_name: res.data.last_name || '',
            phone_number: res.data.phone_number || ''
        });
      })
      .catch(err => console.log("Fetch error:", err));
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    
  
    fd.append('username', profile.username);
    fd.append('email', profile.email);
    fd.append('first_name', profile.first_name);
    fd.append('last_name', profile.last_name);
    fd.append('phone_number', profile.phone_number);
    if (photo) fd.append('photo', photo);

    try {
      const res = await API.patch('profile/', fd);
      alert("Profile updated successfully!");
      setProfile(res.data);
    } catch (err) {
      alert("Update failed. Make sure username/email are unique.");
    }
  };

  const handlePass = async (e) => {
    e.preventDefault();
    try {
      await API.post('change-password/', passwords);
      alert("Password updated!");
      setPasswords({ old_password: '', new_password: '' });
    } catch (err) { 
      alert(err.response?.data?.error || "Password change failed."); 
    }
  };

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '30px' }}>Admin Profile Settings</h1>
      
      <div className="form-grid">
        {/* a/c info */}
        <div className="card">
          <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Account Information</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={profile.username} 
                onChange={e => setProfile({...profile, username: e.target.value})} 
              />
            </div>

            <div className="form-group" style={{marginTop: '15px'}}>
              <label>Email Address</label>
              <input 
                type="email" 
                value={profile.email} 
                onChange={e => setProfile({...profile, email: e.target.value})} 
              />
            </div>

            <div className="form-grid" style={{marginTop: '15px', gap: '15px'}}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value={profile.first_name} onChange={e => setProfile({...profile, first_name: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value={profile.last_name} onChange={e => setProfile({...profile, last_name: e.target.value})} />
                </div>
            </div>

            <div className="form-group" style={{marginTop: '15px'}}>
              <label>Phone Number</label>
              <input type="text" value={profile.phone_number} onChange={e => setProfile({...profile, phone_number: e.target.value})} />
            </div>

            <div className="form-group" style={{marginTop: '15px'}}>
              <label>Profile Picture</label>
              <input type="file" onChange={e => setPhoto(e.target.files[0])} />
            </div>

            <button type="submit" className="btn-main" style={{ width: '100%', marginTop: '30px' }}>
                Save Changes
            </button>
          </form>
        </div>

        {/* security */}
        <div className="card">
          <h2 style={{ color: 'var(--danger)', marginBottom: '20px' }}>Security & Password</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Keep your administrative account secure.</p>
          <form onSubmit={handlePass}>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="••••••••" value={passwords.old_password} onChange={e => setPasswords({...passwords, old_password: e.target.value})} />
            </div>
            <div className="form-group" style={{marginTop: '15px'}}>
              <label>New Password</label>
              <input type="password" placeholder="••••••••" value={passwords.new_password} onChange={e => setPasswords({...passwords, new_password: e.target.value})} />
            </div>
            <button type="submit" className="btn-main" style={{ width: '100%', marginTop: '30px', background: 'var(--text-main)' }}>
                Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;