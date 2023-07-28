import { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [users, setUsers] = useState([]);

  // Code to show alert on various events.
  const showAlert = (type, message) => {
    setAlert({ type: type, message: message });

    setTimeout(() => {
      showAlert();
    }, 2000);
  };

  // Code to enable dark mode or light mode.
  const getMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
      showAlert("success", "Dark Mode Enabled");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("success", "Dark Mode Disabled");
    }
  };

  // Get all saved users from database.
  const getUsers = async () => {
    let url = "http://localhost:5000/users/allusers";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setUsers(json);
  };

  // Adding a user data from user input and saving to database.
  const addUser = async (name, email, number) => {
    let url = "http://localhost:5000/users/adduser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, email, number }),
    });

    const json = await response.json();
    setUsers(users.concat(json));
    showAlert("success", "User Added Successfully");
  };

  // Deleting a user data from database using user data id.
  const deleteUser = async (id) => {
    let url = `http://localhost:5000/users/deleteuser/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });

    const json = response.json();
    console.log(json);
    const newUsers = users.filter((user) => {
      return user._id !== id;
    });
    setUsers(newUsers);
    showAlert("success", "User Deleted Successfully");
  };

  // Updating a user data details in the database.
  const editUser = async (id, name, email, number) => {
    let url = `http://localhost:5000/users/updateuser/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id, name, email, number }),
    });

    const json = await response.json();
    console.log(json);

    const newUsers = JSON.parse(JSON.stringify(users));
    for (let i = 0; i < users.length; i++) {
      const element = users[i];

      if (element._id === id) {
        newUsers[i].name = name;
        newUsers[i].email = email;
        newUsers[i].number = number;
        break;
      }
    }
    setUsers(newUsers);
    showAlert("success", "User Updated Successfully");
  };

  // Searching user(s) from the search kerword.
  const searchUser = (search) => {
    const newUsers = users.filter((user) => {
      return user.name === search || user.email === search;
    });

    if (newUsers.length !== 0) {
      setUsers(newUsers);
      showAlert("success", "Search Found");
    } else {
      showAlert("danger", "Search Not Found");
    }
  };

  return (
    <userContext.Provider
      value={{
        mode,
        getMode,
        alert,
        showAlert,
        addUser,
        getUsers,
        users,
        deleteUser,
        editUser,
        searchUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
