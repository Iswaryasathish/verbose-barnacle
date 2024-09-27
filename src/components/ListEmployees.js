import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import './List.css';
import API_BASE_URL from './config'; 

function ListEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/employees`);
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err.response ? err.response.data : err.message);
        alert('Error fetching employees. Please check the console for more details.');
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className='bag'>
      <NavigationBar />
      <div className='container mt-4'>
        <h2 className='text-center'>List of Employees</h2>
        {employees.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Photo</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Job Role</th>
                  <th>Mobile No</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Salary</th>
                  <th>Joining Month</th>
                  <th>Total PF</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.employeeId}>
                    <td>
                      <img src={emp.photo} alt={emp.name} style={{ height: '2rem', width: '2rem', borderRadius: '50%' }} />
                    </td>
                    <td>{emp.employeeId}</td>
                    <td>{emp.name}</td>
                    <td>{emp.age}</td>
                    <td>{emp.jobRole}</td>
                    <td>{emp.mobileNo}</td>
                    <td>{emp.email}</td>
                    <td>{emp.address}</td>
                    <td>{emp.salary}</td>
                    <td>{new Date(emp.joiningMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</td>
                    <td>{emp.totalPF}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default ListEmployees;
