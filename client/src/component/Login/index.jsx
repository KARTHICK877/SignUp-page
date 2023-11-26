import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import styles from "./styles.module.css";
import  { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for the loading spinner

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
  
	// Start the loading spinner
	setLoading(true);
  
	try {
	  const url = "https://sign-up-page-9jr1.onrender.com/api/auth";
	  const { data: res } = await axios.post(url, data);
	  localStorage.setItem("token", res.data);
  
	  // Show a success toast
	  toast.success("Login successful!");
  
	  // Redirect to the home page or wherever needed
	  window.location = "/";
	} catch (error) {
	  if (
		error.response &&
		error.response.status >= 400 &&
		error.response.status <= 500
	  ) {
		setError(error.response.data.message);
  
		// Show an error toast
		toast.error("Login failed. Please check your email and password.");
	  }
	} finally {
	  // Stop the loading spinner whether the request is successful or not
	  setLoading(false);
	}
  };
  

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
			  className="form-control mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="form-control mt-3"
            />
            {/* <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
            </Link> */}
            {error && <div className={styles.error_msg}>{error}</div>}
            {/* Show the spinner when loading is true */}
            <button type="submit" className={styles.green_btn} disabled={loading}>
              {loading ? (
                <RingLoader color={"#ffffff"} loading={loading} css={override} size={25} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
		  <Toaster position="top-center" />
        </div>
      </div>
    </div>
  );
};

export default Login;

// CSS for the spinner
const override = css`
  display: block;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
