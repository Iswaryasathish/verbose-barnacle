import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox'; 
import './Update.css';
import API_BASE_URL from './config'; 

function UpdateDetails() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/employees/${employeeId}`, employee);
      setMessage('Employee updated successfully!');
      setMessageType('success');
    } catch (err) {
      console.error(err);
      setMessage('Error updating employee');
      setMessageType('error');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/employees/${employeeId}`);
      setEmployee(null);
      setMessage('Employee deleted successfully!');
      setMessageType('success');
    } catch (err) {
      console.error(err);
      setMessage('Error deleting employee');
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
              <label className="form-label">Name</label>
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                placeholder="Name" 
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
                placeholder="Age" 
                value={employee.age || ''} 
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
                placeholder="Mobile No" 
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
                placeholder="Email" 
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
                placeholder="Address" 
                value={employee.address || ''} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-success me-2">Update</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </form>
        )}
        <MessageBox message={message} type={messageType} onClose={closeMessage} />
      </div>
    </div>
  );
}

export default UpdateDetails;
