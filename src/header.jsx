import { useNavigate, Link } from "react-router-dom";
// import env from "react-dotenv";
import "./header.css";

function Header() {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await fetch(
        `https://cat-be-production.up.railway.app/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "",
          //maybe do JWT blacklist ? Right now I'm doing nothing
        }
      );
      if (response.ok) {
        console.log("OK");
        localStorage.clear("jwtToken");
        localStorage.clear("id");

        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
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
