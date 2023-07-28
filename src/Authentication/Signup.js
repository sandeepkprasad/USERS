import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../Context/userContext";

const Signup = () => {
  const [cred, setCred] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();
  const { showAlert, mode } = useContext(userContext);

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/user/signup";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.jwtData);
      showAlert("success", "Signed up successfully");
      navigate("/");
    } else {
      showAlert("danger", "Invalid Credentials");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div
          className={`text-center py-3 text-${
            mode === "light" ? "dark" : "light"
          }`}
        >
          <h3 className="fs-3 fw-bold">Create New Account</h3>
        </div>
        <div
          className="col-md-8 border border-primary-subtle p-5 rounded"
          style={{ width: "24rem" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className={`form-label fw-bold text-${
                  mode === "light" ? "dark" : "light"
                }`}
              >
                Full Name
              </label>
              <input
                type="name"
                className={`form-control mb-3 bg-${
                  mode === "light" ? "light" : "black"
                } text-${mode === "light" ? "dark" : "light"}`}
                id="name"
                name="name"
                value={cred.name}
                aria-describedby="emailHelp"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className={`form-label fw-bold text-${
                  mode === "light" ? "dark" : "light"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                className={`form-control bg-${
                  mode === "light" ? "light" : "black"
                } text-${mode === "light" ? "dark" : "light"}`}
                id="email"
                name="email"
                value={cred.email}
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className={`form-label fw-bold text-${
                  mode === "light" ? "dark" : "light"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                className={`form-control bg-${
                  mode === "light" ? "light" : "black"
                } text-${mode === "light" ? "dark" : "light"}`}
                id="passowrd"
                name="password"
                value={cred.password}
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
        <div className="py-4 text-center">
          <p className={`text-${mode === "light" ? "muted" : "light"}`}>
            Already have an account?{" "}
            <Link className="text-decoration-none" to="/login">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
