import React, { useContext, useState } from "react";
import userContext from "../Context/userContext";

const AddUser = () => {
  const [user, setUser] = useState({ name: "", email: "", number: "" });
  const { mode, addUser } = useContext(userContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addUser(user.name, user.email, user.number);
    setUser({ name: "", email: "", number: "" });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8 col-md-8">
          <div
            className={`title mb-5 text-${mode === "light" ? "dark" : "light"}`}
          >
            <h2 className="fw-bold">Add A User</h2>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8 col-md-8">
          <form
            className="row g-3 py-5 px-3 border border-primary-subtle rounded shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="col-md-4">
              <label
                htmlFor="name"
                className={`form-label text-${
                  mode === "light" ? "dark" : "light"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                className={`form-control bg-${
                  mode === "light" ? "light" : "black"
                } text-${mode === "light" ? "dark" : "light"}`}
                id="name"
                name="name"
                value={user.name}
                minLength={3}
                required
                onChange={handleChange}
                placeholder="Enter Full Name"
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="email"
                className={`form-label text-${
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
                value={user.email}
                required
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="number"
                className={`form-label text-${
                  mode === "light" ? "dark" : "light"
                }`}
              >
                Mobile
              </label>
              <input
                type="number"
                className={`form-control bg-${
                  mode === "light" ? "light" : "black"
                } text-${mode === "light" ? "dark" : "light"}`}
                id="number"
                name="number"
                value={user.number}
                minLength={10}
                required
                onChange={handleChange}
                placeholder="Enter Mobile Number"
              />
            </div>
            <div className="col-12 mt-5">
              <button className="btn btn-primary" type="submit">
                Save User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
