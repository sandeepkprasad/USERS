import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserState from "./Context/UserState";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ShowAlert from "./Components/ShowAlert";

const App = () => {
  return (
    <UserState>
      <Router>
        <Navbar />
        <ShowAlert />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </UserState>
  );
};

export default App;
