import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>karthick</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
				
					Logout
					<video  src="./video/Welcome.mp4"  autoPlay loop muted></video>
				</button>
			</nav>
		</div>
	);
};

export default Main;