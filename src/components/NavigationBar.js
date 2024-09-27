import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css'; // Font Awesome import

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        // Use navigate to redirect to the login page
        navigate('/login');
    };

    const userRole = localStorage.getItem('userRole');

    return (
        <div className="d-flex flex-column">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
                    <span className="navbar-toggler-icon" />
                </button>
                <Link className="navbar-brand" to="/">
                    <img src="https://img.freepik.com/premium-vector/software-solution-logo-design-tech-company_924522-94.jpg" height="40" alt="Logo" />
                </Link>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ml-auto">
                        {userRole === 'employee' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employee-home">
                                        <i className="fa fa-home" /> <span className="d-none d-lg-inline"> Home</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/calendar-component">
                                        <i className="fa fa-calendar" /> <span className="d-none d-lg-inline"> Calendar for Events</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employee-details">
                                        <i className="fa fa-users" /> <span className="d-none d-lg-inline"> Employee Details</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/update-details">
                                        <i className="fa fa-edit" /> <span className="d-none d-lg-inline"> Update Details</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        {userRole === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">
                                        <i className="fa fa-home" /> <span className="d-none d-lg-inline"> Home</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add">
                                        <i className="fa fa-user-plus" /> <span className="d-none d-lg-inline"> Register Employee</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/list">
                                        <i className="fa fa-list" /> <span className="d-none d-lg-inline"> List of Employees</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/update">
                                        <i className="fa fa-edit" /> <span className="d-none d-lg-inline"> Update Details</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/delete">
                                        <i className="fa fa-trash" /> <span className="d-none d-lg-inline"> Delete Details</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/list-by-job-role">
                                        <i className="fa fa-briefcase" /> <span className="d-none d-lg-inline"> List by Job Role</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/calendar-component">
                                        <i className="fa fa-calendar" /> <span className="d-none d-lg-inline"> Calendar</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employee-details">
                                        <i className="fa fa-users" /> <span className="d-none d-lg-inline"> Employee Details</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="nav-item">
                        <Link className="nav-link" to="/login" onClick={handleLogout} title="Logout">
                            <i className="fa fa-sign-out" />
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="main-content col-md-9 ms-sm-auto col-lg-10 px-4">
                {/* Your main app content goes here */}
            </div>
        </div>
    );
};

export default NavigationBar;
