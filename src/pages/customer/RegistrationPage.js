import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet

// TODO: Add styling for the registration page
// TODO: Implement form submission logic

const RegistrationPage = () => {
  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - Register</title>
        <meta name="description" content="Register for a new Musibau AutoWorks customer account." />
      </Helmet>
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" aria-label="Full Name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" aria-label="Email Address" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" aria-label="Password" />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" name="confirm-password" aria-label="Confirm Password" />
        </div>
        <button type="submit" aria-label="Register Button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
