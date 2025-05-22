import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    type: '',
    dob: '',
    image: null,
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
 await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/employees/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {['name', 'email', 'phone', 'password'].map((field) => (
          // <div key={field} className="mb-3">
          //   <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          //   <input
          //     type={field === 'password' ? 'password' : 'text'}
          //     name={field}
          //     className="form-control"
          //     value={form[field]}
          //     onChange={handleChange}
          //     required
          //   />
          // </div>


          <div key={field} className="mb-3">
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
      
          {/* Email Field */}
          {field === 'email' ? (
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Enter a valid email address (must include @ and domain)"
            />
          ) : field === 'phone' ? (
            // Phone Field
            <input
              type="text"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits"
              required
            />
          ) : (
            // Other Fields (name, password)
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              className="form-control"
              value={form[field]}
              onChange={handleChange}
              required
            />
          )}
        </div>
        ))}

        <div className="mb-3">
          <label>Role:</label><br />
          <input type="radio" name="role" value="admin" onChange={handleChange} /> Admin
          <input type="radio" name="role" value="employee" onChange={handleChange} className="ms-3" /> Employee
        </div>

        <div className="mb-3">
          <label>Type:</label>
          <select name="type" className="form-control" onChange={handleChange} required>
            <option value="">Select role type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Date of Birth:</label>
          <input type="date" name="dob" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Select Image:</label>
          <input type="file" name="image" className="form-control" onChange={handleFileChange} />
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="text-center mt-3">Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default RegisterPage;
