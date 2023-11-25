// Main.jsx
import React, { useRef } from 'react';
import styles from './styles.module.css';

const Main = () => {
  const formRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(formRef.current);

      const response = await fetch('http://localhost:8080/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: formData.get('age'),
          gender: formData.get('gender'),
          mobileNumber: formData.get('mobileNumber'),
          dateOfBirth: formData.get('dateOfBirth'),
        }),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response JSON:', result);

      if (response.ok) {
        alert(result.message);
        formRef.current.reset(); // Reset the form
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>
          <span style={{ color: 'GrayText' }}> K</span>
          <span style={{ color: 'black' }}>A</span>
          <span style={{ color: 'BLUE' }}>R</span>
          <span style={{ color: 'GREEN' }}>T</span>
          <span style={{ color: '' }}>H</span>
          <span style={{ color: 'PINK' }}>I</span>
          <span style={{ color: 'SKYBLUE' }}>C</span>
          <span style={{ color: 'LIGHTGREEN' }}>K</span>
        </h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
        <video src="./video/Welcome.mp4" autoPlay loop muted></video>
        <form className={styles.form_container} onSubmit={handleSubmit} ref={formRef}>
          {/* Add your form fields here */}
          <h1>
            Welcome{' '}
            <span style={{ color: 'red' }}>U</span>
            <span style={{ color: 'yellow' }}>S</span>
            <span style={{ color: 'pink' }}>E</span>
            <span style={{ color: 'blue' }}>R</span>
          </h1>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" placeholder="Age" name="age" required className={styles.input} />

          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" required className={styles.input}>
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="mobileNumber">Mobile Number</label>
          <input type="tel" id="mobileNumber" placeholder="Mobile Number" name="mobileNumber" required className={styles.input} />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input type="date" id="dateOfBirth" placeholder="Date of Birth" name="dateOfBirth" required className={styles.input} />

          <button type="submit" className={styles.green_btn}>
            Submit
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Main;
