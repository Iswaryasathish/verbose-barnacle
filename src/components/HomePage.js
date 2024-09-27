import React from 'react';
import './HomePage.css'; // Your CSS for the homepage
import NavigationBar from './NavigationBar'; // Import your updated NavigationBar component

const HomePage = () => {
    return (
        <div className="employee">
            <NavigationBar />
            <div className="home-content">
                <h1 className="text-center my-5">Welcome to the Employee Management System</h1>
                <p className="text-center">
                    This application helps manage employee data efficiently.
                </p>
                <div className="features row mt-5">
                    <div className="col-md-4 text-center">
                        <div className="feature-card">
                            <i className="fa fa-users fa-3x mb-3"></i>
                            <h3>Employee Management</h3>
                            <p>Manage employee records easily and effectively.</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="feature-card">
                            <i className="fa fa-calendar fa-3x mb-3"></i>
                            <h3>Calendar Events</h3>
                            <p>Schedule and track important events and deadlines.</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="feature-card">
                            <i className="fa fa-cogs fa-3x mb-3"></i>
                            <h3>System Settings</h3>
                            <p>Customize settings to fit your organizational needs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;


