import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure you want to proceed?");
    if (proceed) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("user deleted");
            const remainingUsers = users.filter((user) => user._id !== id);
            setUsers(remainingUsers);
          }
        });
    }
  };
  const handleStatus = (id) => {
    console.log("clicking status update");
  };
  return (
    <div>
      <h2>This is Users</h2>
      {users.map((user) => (
        <h3 key={user._id}>
          {user.name} | {user.email} | {user.status} &nbsp;
          <button onClick={() => handleStatus(user._id)}>
            Status Update
          </button>{" "}
          &nbsp;
          <Link to={`/users/update/${user._id}`}>
            <button>Info Update</button>
          </Link>{" "}
          &nbsp;
          <button onClick={() => handleDelete(user._id)}>X</button>
        </h3>
      ))}
    </div>
  );
};

export default Users;
