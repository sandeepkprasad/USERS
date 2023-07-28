import React, { useContext } from "react";
import userContext from "../Context/userContext";

const UserItem = (props) => {
  const { _id, name, email, number } = props.user;
  const { deleteUser, mode } = useContext(userContext);
  return (
    <div className="col-10 col-md-4 mb-4">
      <div
        className={`card bg-${
          mode === "light" ? "light" : "black"
        } border border-primary-subtle shadow-sm`}
      >
        <div className="card-body">
          <p
            className={`card-title fw-bold text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Name : {name}
          </p>
          <p
            className={`card-title fw-bold text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Email : {email}
          </p>
          <p
            className={`card-title fw-bold text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            Number : {number}
          </p>
          <div className="d-flex justify-content-around mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                props.updateUser(props.user);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                deleteUser(_id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
