import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import MessageBox from './MessageBox';
import API_BASE_URL from './config';
import './Add.css';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    photo: null,
    employeeId: '',
    name: '',
    age: '',
    jobRole: '',
    mobileNo: '',
    email: '',
    address: '',
    salary: '',
    joiningMonth: '',
  });

  const [totalPF, setTotalPF] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      if (file) {
        setEmployee({ ...employee, photo: file });
        setPhotoPreview(URL.createObjectURL(file));
      }
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const calculateTotalPF = () => {
    const pfRate = 0.12;
    const monthsWorked = new Date().getMonth() + 1 - new Date(employee.joiningMonth).getMonth();
    const totalPFAmount = monthsWorked > 0 ? (employee.salary * pfRate) * monthsWorked : 0;
    setTotalPF(totalPFAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employee.employeeId.trim()) {
      setMessage('Employee ID is required and cannot be empty.');
      setMessageType('error');
      return;
    }
    calculateTotalPF();

    const formData = new FormData();
    formData.append('photo', employee.photo);
    formData.append('employeeId', employee.employeeId);
    formData.append('name', employee.name);
    formData.append('age', employee.age);
    formData.append('jobRole', employee.jobRole);
    formData.append('mobileNo', employee.mobileNo);
    formData.append('email', employee.email);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('joiningMonth', employee.joiningMonth);
    formData.append('totalPF', totalPF);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/employees/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      setMessage('Employee added successfully!');
      setMessageType('success');
    } catch (err) {
      setMessage('Error adding employee');
      setMessageType('error');
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  return (
    <div className="empl">
      <NavigationBar />
      <div className="mt-4">
        <h2 className="text-center">Add New Employee</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {/* Employee Photo */}
          <div className="form-group">
            <label>Employee Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
              className="form-control"
            />
            {photoPreview && (
              <img src={photoPreview} alt="Employee Preview" className="img-fluid mt-2" style={{ maxHeight: '200px' }} />
            )}
            <small className="form-text text-muted">Choose a file from your device or gallery.</small>
          </div>

          {/* Form Fields */}
          {['employeeId', 'name', 'age', 'jobRole', 'mobileNo', 'email', 'address', 'salary', 'joiningMonth'].map((field, index) => (
            <div className="form-group" key={index}>
              <label>{`Employee ${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}`}</label>
              <input
                type={field === 'joiningMonth' ? 'month' : field === 'age' || field === 'salary' ? 'number' : 'text'}
                name={field}
                placeholder={`Enter ${field}`}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <MessageBox message={message} type={messageType} onClose={closeMessage} />
      </div>
    </div>
  );
}

export default AddEmployee;
