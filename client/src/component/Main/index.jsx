import React, { useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { RingLoader } from 'react-spinners'; // Import the spinner component
import styles from './styles.module.css';

const Main = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false); // State for the loading spinner

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start the loading spinner
    setLoading(true);

    try {
      const formData = new FormData(formRef.current);

      const response = await fetch('https://sign-up-page-9jr1.onrender.com/api/submit-form', {
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
        // Show a success toast
        toast.success(result.message);
        formRef.current.reset(); // Reset the form
      } else {
        // Show an error toast
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      // Show an error toast
      toast.error('An error occurred while submitting the form. Please try again.');
    } finally {
      // Stop the loading spinner whether the request is successful or not
      setLoading(false);
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

          {/* Show the spinner when loading is true */}
          <button type="submit" className={styles.green_btn} disabled={loading}>
            {loading ? (
              <RingLoader color={"#ffffff"} loading={loading} size={25} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </nav>
      <Toaster position="top-center" />
    </div>
  );
};

export default Main;
