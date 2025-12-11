import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/users.js";

function Register({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await signUp(form);
      setUser(userData);

      navigate("/cats");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        email: "",
        password: "",
      }));
    }
  };

  const renderError = () => (
    <>
      <button type="submit" className={form.isError ? "danger" : ""}>
        Create account
      </button>
      {form.isError && <p className="form-error">{form.errorMsg}</p>}
    </>
  );

  return (
    <div className="register-shell">
      <div className="register-card">
        <div className="register-topper">OSS BOSS</div>
        <h1>Register to join the fight</h1>
        <p className="register-subcopy">Forge your operator profile and step into the arena.</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={form.username}
            placeholder="e.g. striker.alpha"
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <label className="input-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            placeholder="you@example.com"
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <label className="input-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter your password"
            onChange={handleChange}
            required
            autoComplete="off"
          />

          {renderError()}
        </form>

        <div className="register-footnote">
          <span>Already in the roster?</span>
          <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Register