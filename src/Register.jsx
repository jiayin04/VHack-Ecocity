import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    icNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`
      Registration Successful!\n
      Name: ${formData.name}\n
      Date of Birth: ${formData.dob}\n
      Address: ${formData.address}\n
      IC Number: ${formData.icNumber}
    `);
  };

  return (
    <div className="register-container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="icNumber">IC Number:</label>
          <input
            type="text"
            id="icNumber"
            name="icNumber"
            value={formData.icNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;