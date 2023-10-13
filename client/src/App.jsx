import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./component/Main";
import Signup from "./component/Signup";
import Login from "./component/Login";
import EmailVerify from "./component/EmailVerify";
import ForgotPassword from "./component/ForgotPassword";
import PasswordReset from "./component/PasswordReset";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
		</Routes>
	);
}

export default App;

