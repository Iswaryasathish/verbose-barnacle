import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox';
import API_BASE_URL from './config'; 

function DeleteEmployee() {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/employees/${employeeId}`);
      setMessage('Employee deleted successfully!');
      setMessageType('success');
      setEmployee(null);
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
    <div className="conainer">
      <NavigationBar />
      <div className="mt-4">
        <h2 className="text-center">Delete Employee Details</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <button className="btn btn-primary btn-sm" onClick={fetchEmployee}>Search</button>
        </div>

        {employee && (
          <div className="text-center mb-4">
            <img 
              src={employee.photo} 
              alt={employee.name} 
              style={{ height: '100px', width: '100px', borderRadius: '50%' }} 
            />
            <div className="employee-details mt-3">
              <p><strong>Employee ID:</strong> {employee.employeeId}</p>
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Age:</strong> {employee.age}</p>
              <p><strong>Job Role:</strong> {employee.jobRole}</p>
              <p><strong>Mobile No:</strong> {employee.mobileNo}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Address:</strong> {employee.address}</p>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        )}
        <MessageBox message={message} type={messageType} onClose={closeMessage} />
      </div>
    </div>
  );
}

export default DeleteEmployee;
