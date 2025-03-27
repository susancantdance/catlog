import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "",
        //maybe do JWT blacklist ? Right now I'm doing nothing
      });
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
          <a href="/signup">Signup</a> | <a href="/login">Login</a>
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
