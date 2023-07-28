import React, { useContext } from "react";
import userContext from "../Context/userContext";

const ShowAlert = () => {
  const { alert } = useContext(userContext);
  return (
    <div className="container d-flex justify-content-center fixed-top mt-5">
      <div
        className={`alert alert-${alert.type} d-flex justify-content-center`}
        role="alert"
        style={{ width: "24rem", height: "60px" }}
      >
        {alert.message}
      </div>
    </div>
  );
};

export default ShowAlert;
