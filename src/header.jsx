import { useNavigate, Link } from "react-router-dom";
// import env from "react-dotenv";
import "./header.css";

function Header() {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("jwtToken");
    localStorage.clear("id");

    navigate("/login");
  };

  if (!token) {
    return (
      <div className="header">
        <span>
          <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
        </span>
      </div>
    );
  } else {
    const email = localStorage.getItem("id");
    return (
      <div className="header">
        <div className="rightside">
          <span>
            You are logged in, <strong>{email}</strong>
          </span>
          <span className="logout" onClick={logout}>
            Logout
          </span>
        </div>
      </div>
    );
  }
}

export { Header };
