import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/users.js";

function Home({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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
      const userData = await signIn(form);
      setUser(userData);

      navigate("/cats");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        password: "",
      }));
    }
  };

  const renderError = () => (
    <>
      <button type="submit" className={form.isError ? "danger" : ""}>
        Log In
      </button>
      {form.isError && <p className="form-error">{form.errorMsg}</p>}
    </>
  );

  return (
    <div className="home-shell">
      <div className="home-card">
        <div className="brand-chip">OSS BOSS</div>
        <h1>Sign in</h1>
        <p className="home-subcopy">Access your OSS playbooks, handoffs, and rituals.</p>

        <form className="home-form" onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={form.username}
            placeholder="e.g. tc.operator"
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

        <div className="home-footnote">
          <span>Need an account?</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
