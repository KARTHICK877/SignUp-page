import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import  { Toaster } from "react-hot-toast";
import styles from "./styles.module.css";
import toast from 'react-hot-toast';
const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password and confirmation password match
    if (data.password !== data.confirmPassword) {
      setError("Password and Confirmation Password must match");
      return;
    }

    // Start the loading spinner
    setLoading(true);

    try {
      const url = "https://sign-up-page-9jr1.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);

      // Show a success toast
      toast.success("Signup successful!");

      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);

        // Show an error toast
        toast.error("Signup failed. Please check your information.");
      }
    } finally {
      // Stop the loading spinner whether the request is successful or not
      setLoading(false);
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            {/* Show the spinner when loading is true */}
            <button type="submit" className={styles.green_btn} disabled={loading}>
              {loading ? (
                <RingLoader color={"#ffffff"} loading={loading} css={override} size={25} />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
        <Toaster position="top-center" />
      </div>
      {/* Toaster component to display toasts */}
      <Toaster position="top-center" />
    </div>
  );
};

export default Signup;

// CSS for the spinner
const override = css`
  display: block;
  margin: 0 auto;
`;
