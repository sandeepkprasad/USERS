import React, { useContext, useRef, useState } from "react";
import UserItem from "./UserItem";
import userContext from "../Context/userContext";

const ShowUsers = () => {
  const { mode, users, editUser } = useContext(userContext);
  const [user, setUser] = useState({
    id: "",
    uname: "",
    uemail: "",
    unumber: "",
  });
  const refOpen = useRef(null);
  const refClose = useRef(null);

  const updateUser = (currentUser) => {
    refOpen.current.click();
    setUser({
      id: currentUser._id,
      uname: currentUser.name,
      uemail: currentUser.email,
      unumber: currentUser.number,
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    refClose.current.click();
    editUser(user.id, user.uname, user.uemail, user.unumber);
  };
  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={refOpen}
        >
          Launch modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div
              className={`modal-content bg-${
                mode === "light" ? "light" : "black"
              }`}
            >
              <div className="modal-header">
                <h1
                  className={`modal-title fs-5 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                  id="exampleModalLabel"
                >
                  Edit User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className={`form-label text-${
                        mode === "light" ? "dark" : "light"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      className={`form-control bg-${
                        mode === "light" ? "light" : "black"
                      } text-${mode === "light" ? "dark" : "light"}`}
                      id="uname"
                      name="uname"
                      value={user.uname}
                      aria-describedby="emailHelp"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
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
                      id="uemail"
                      name="uemail"
                      value={user.uemail}
                      aria-describedby="emailHelp"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="number"
                      className={`form-label text-${
                        mode === "light" ? "dark" : "light"
                      }`}
                    >
                      Number
                    </label>
                    <input
                      type="number"
                      className={`form-control bg-${
                        mode === "light" ? "light" : "black"
                      } text-${mode === "light" ? "dark" : "light"}`}
                      id="unumber"
                      name="unumber"
                      value={user.unumber}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleClick}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-8 col-md-8 text-center">
            <div
              className={`title mb-4 text-${
                mode === "light" ? "dark" : "light"
              }`}
            >
              <h2 className="fw-bold">Saved Users</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <h6 className={`fw-bold text-center text-${mode === "light" ? "dark" : "light"}`}>
            {users.length === 0 && "Nothing to display"}
          </h6>
          {users &&
            users.map((user) => {
              return (
                <UserItem key={user._id} user={user} updateUser={updateUser} />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ShowUsers;
