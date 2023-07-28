import React, { useContext, useEffect } from "react";
import AddUser from "./AddUser";
import ShowUsers from "./ShowUsers";
import userContext from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { getUsers } = useContext(userContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUsers();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-5">
      <AddUser />
      <ShowUsers />
    </div>
  );
};

export default Home;
