import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox'; // Import the MessageBox component
import API_BASE_URL from './config'; 
import './Emp.css'; // Ensure you import your CSS file

function EmployeeDetails() {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error, info

  const handleChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      setMessage('Employee ID is required.');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/employees/${employeeId}`);
      setEmployee(response.data);
      setMessage('');
      setMessageType('');
    } catch (err) {
      setMessage('Error fetching employee details.');
      setMessageType('error');
      setEmployee(null);
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  return (
    <div className="fix"> {/* Apply the background class here */}
      <NavigationBar />
      <div className="mt-4">
        <h2 className="text-center">View Employee Details</h2>
        <form onSubmit={handleSearch} className="mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </form>

        {message && <MessageBox message={message} type={messageType} onClose={closeMessage} />}
        
        {employee && (
          <div className="text-center employee-details mt-4">
            <img 
              src={employee.photo} 
              alt={employee.name} 
              className="img-fluid rounded-circle mb-3" 
              style={{ height: '100px', width: '100px' }} 
            />
            <h3>Employee Details</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td><strong>Employee ID:</strong></td>
                  <td>{employee.employeeId}</td>
                </tr>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{employee.name}</td>
                </tr>
                <tr>
                  <td><strong>Age:</strong></td>
                  <td>{employee.age}</td>
                </tr>
                <tr>
                  <td><strong>Job Role:</strong></td>
                  <td>{employee.jobRole}</td>
                </tr>
                <tr>
                  <td><strong>Mobile No:</strong></td>
                  <td>{employee.mobileNo}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{employee.address}</td>
                </tr>
                <tr>
                  <td><strong>Salary:</strong></td>
                  <td>{employee.salary}</td>
                </tr>
                <tr>
                  <td><strong>Joining Month:</strong></td>
                  <td>{new Date(employee.joiningMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</td>
                </tr>
                <tr>
                  <td><strong>Total PF:</strong></td>
                  <td>{employee.totalPF}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDetails;
