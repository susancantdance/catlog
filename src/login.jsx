import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const user = data.id;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("id", user);
        // console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          name="username"
          required
          onChange={handleChange}
          value={formData.username}
        />
        <br />
        <label htmlFor="pw">Password: </label>
        <input
          type="password"
          name="password"
          id="pw"
          required
          onChange={handleChange}
          value={formData.password}
        />
        <br />
        <label htmlFor="but"></label>
        <button type="submit" id="but">
          Submit
        </button>
      </form>
    </div>
  );
}

export { Login };
