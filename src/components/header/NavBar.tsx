import "./NavBar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="header">
      <div className="left">
        <Link to="/">Noriu Kalbeti Icon</Link>
      </div>
      <div className="mid">
        <ul className="navbar">
          <li>
            <Link to="/sheeps">Home</Link>
          </li>
          <li>
            <Link to="/">Lesson Plans</Link>
          </li>
          <li>
            <Link to="/cats">Book a Lesson</Link>
          </li>
        </ul>
      </div>
      <div className="right">
        <ul className="navbar">
          <li>
            <Link to="/update-profile">Update Profile</Link>
          </li>
          <li>
            <Link to="/cats">Logout</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
