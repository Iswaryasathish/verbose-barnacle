import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox';
import './Update.css';
import API_BASE_URL from './config'; 

function UpdateEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/employees/${employeeId}`);
      setEmployee(res.data);
      setMessage('Employee fetched successfully!');
      setMessageType('success');
    } catch (err) {
      console.error(err);
      setMessage('Error fetching employee');
      setMessageType('error');
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const calculateTotalPF = () => {
    const pfRate = 0.12; // Assuming PF rate is 12% of salary
    const monthsWorked = new Date().getMonth() + 1 - new Date(employee.joiningMonth).getMonth();
    const totalPFAmount = monthsWorked > 0 ? (employee.salary * pfRate) * monthsWorked : 0;
    return totalPFAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = { ...employee, totalPF: calculateTotalPF() };

    try {
      await axios.put(`${API_BASE_URL}/api/employees/${employeeId}`, updatedEmployee);
      setMessage('Employee updated successfully!');
      setMessageType('success');
    } catch (err) {
      console.error(err);
      setMessage('Error updating employee');
      setMessageType('error');
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  return (
    <div className="cor">
      <NavigationBar />
      <div className="mt-4">
        <h2 className="text-center">Update Employee Details</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchEmployee}>Search</button>
        </div>

        {employee && (
          <div className="text-center mb-3">
            <img 
              src={employee.photo} 
              alt={employee.name} 
              style={{ height: '100px', width: '100px', borderRadius: '50%' }} 
            />
          </div>
        )}

        {employee && (
          <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
            <div className="mb-3">
              <label className="form-label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="form-control"
                value={employee.photo || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={employee.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={employee.age || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job Role</label>
              <input
                type="text"
                name="jobRole"
                className="form-control"
                value={employee.jobRole || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile No</label>
              <input
                type="text"
                name="mobileNo"
                className="form-control"
                value={employee.mobileNo || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={employee.email || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={employee.address || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Salary</label>
              <input
                type="number"
                name="salary"
                className="form-control"
                value={employee.salary || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Joining Month</label>
              <input
                type="month"
                name="joiningMonth"
                className="form-control"
                value={employee.joiningMonth || ''}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success me-2">Update</button>
          </form>
        )}
        <MessageBox message={message} type={messageType} onClose={closeMessage} />
      </div>
    </div>
  );
}

export default UpdateEmployee;

