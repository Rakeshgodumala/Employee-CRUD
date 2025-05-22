
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [location.state?.refresh]); // Refetch when redirected from Edit page

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`);
      fetchEmployees(); // Refresh after delete
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid px-0">
      <nav
        className="d-flex justify-content-between align-items-center px-4 py-3 flex-wrap"
        style={{ backgroundColor: '#232F3E', color: 'white' }}
      >
        <div className="d-flex align-items-center">
        <img
  src="/images/microsoft shirt pista house.png"
  alt="profile"
  width="40"
  height="40"
  style={{ borderRadius: '50%', marginRight: '10px', objectFit: 'cover' }}
/>

          <span className="fw-bold fs-5">Dashboard | My Profile</span>
        </div>
        <div className="d-flex flex-wrap gap-3 mt-2 mt-md-0">
          <button className="btn btn-link text-white text-decoration-none" onClick={() => navigate('/register')}>
            Add Employee
          </button>
          <button className="btn btn-link text-white text-decoration-none">Manage Notification</button>
          <button className="btn btn-link text-white text-decoration-none">Company Banners</button>
          <button className="btn btn-danger" onClick={() => navigate('/login')}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="position-relative mb-3">
          <h3 className="text-center mb-0">All Users</h3>
          <input
            type="text"
            placeholder="Search by name or email"
            className="form-control w-auto position-absolute top-50 end-0 translate-middle-y"
            style={{ minWidth: '250px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Role</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone || '-'}</td>
                  <td>{emp.dob || '-'}</td>
                  <td>{emp.role || '-'}</td>
                  <td>
                    {emp.image ? (
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${emp.image}`}
                        alt="emp"
                        width="50"
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => navigate(`/edit/${emp._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <footer className="text-center mt-4">© 2025 Role-Based Dashboard. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default Dashboard;

