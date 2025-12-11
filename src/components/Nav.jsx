import { NavLink } from "react-router-dom";

function Nav({ user }) {
  const authenticatedOptions = (
    <>
      <NavLink className="nav-link" to="/techniques">
        Techniques
      </NavLink>
      <NavLink className="nav-link" to="/techniques/add">
        Add Technique
      </NavLink>
      <NavLink className="nav-link" to="/sign-out">
        Log Out
      </NavLink>
    </>
  );

  const unauthenticatedOptions = (
    <>
      <NavLink className="nav-link" to="/">
        Log-In
      </NavLink>
      <NavLink className="nav-link" to="/register">
        Register
      </NavLink>
    </>
  );

  return (
    <nav>
      <div className="nav-brand">OSS BOSS</div>
      {user && <div className="link welcome">Welcome, {user.username}</div>}
      <div className="nav-links">
        {user ? authenticatedOptions : unauthenticatedOptions}
      </div>
    </nav>
  );
}

export default Nav;
