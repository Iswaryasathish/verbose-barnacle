import React from 'react';
import NavigationBar from './NavigationBar';
import './Employee.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const EmployeeHomePage = () => {
    return (
        <div className="page1 d-flex flex-column min-vh-100">
            <NavigationBar />
            <div className="main55">
                <h2>Welcome to Employee Dashboard</h2>
            </div>
        </div>
    );
};

export default EmployeeHomePage;


