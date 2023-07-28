import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userContext from "../Context/userContext";
import { BsSunFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const { mode, getMode, searchUser } = useContext(userContext);
  let location = useLocation();
  let navigate = useNavigate();
  const [search, setSearch] = useState({ search: "" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch({ search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchUser(search.search);
    setSearch({ search: "" });
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${mode} bg-${mode} fixed-top shadow-sm`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand  fw-bold text-primary ms-2" to="/">
            Digi Sidekick
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item fw-bold">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item fw-bold">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className={`form-control me-2 bg-${
                  mode === "light" ? "light" : "black"
                } text-${mode === "light" ? "dark" : "light"}`}
                type="search"
                placeholder="Search by Name or Email"
                aria-label="Search"
                id="search"
                name="search"
                value={search.search}
                required
                onChange={handleChange}
              />
              <button className="btn btn-outline-primary" type="submit">
                <BiSearch />
              </button>
            </form>
            {localStorage.getItem("token") ? (
              <button
                type="button"
                className="btn btn-outline-secondary mx-3 btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div className="mx-3">
                <Link
                  className="btn btn-outline-secondary btn-sm me-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-success btn-sm ms-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </div>
            )}
            <div className="icon mt-1">
              <h4
                className={`mx-2 text-${mode === "light" ? "dark" : "light"}`}
                onClick={getMode}
              >
                <BsSunFill />
              </h4>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
