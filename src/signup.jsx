import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="pw">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="confirm">Confirm PW: </label>
        <input
          type="password"
          name="confirm"
          id="confirm"
          required
          value={formData.confirm}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="but"></label>
        <button type="submit" id="but">
          Submit
        </button>
      </form>
    </>
  );
}

export { Signup };
