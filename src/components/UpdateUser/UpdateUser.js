import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const handleNameChange = (e) => {
    const updateName = e.target.value;
    const updateUser = { name: updateName, email: user.email };
    setUser(updateUser);
  };
  const handleEmailChange = (e) => {
    const updateEmail = e.target.value;
    const updateUser = { name: user.name, email: updateEmail };
    setUser(updateUser);
  };
  console.log(user);

  var handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "applicaton/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h2>This is Update User</h2>
      <h1>
        {user.name} | {user.email}
      </h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={user.name || ""}
          onBlur={handleNameChange}
        ></input>
        &nbsp;
        <input
          type="email"
          value={user.email || ""}
          onBlur={handleEmailChange}
        ></input>
        &nbsp;
        <input type="submit" value="update"></input>
      </form>
    </div>
  );
};

export default UpdateUser;
