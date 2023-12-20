import React from "react";
import "./App.css";
import UserList from "./Components/UserList";
import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserCard from "./Components/UserCard";
import UserDetails from "./Components/UserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/details/:userId",
    element: <UserCard />,
  },
]);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/details/:userId" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
