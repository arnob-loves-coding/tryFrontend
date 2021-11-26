import React, { useRef } from "react";

const AddUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };
    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("user added");
        }
      });
    nameRef.current.value = "";
    emailRef.current.value = "";
  };
  return (
    <div>
      <h2>This is Add User</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="name" ref={nameRef}></input> &nbsp;
        <input type="text" placeholder="email" ref={emailRef}></input> &nbsp;
        <input type="submit" value="add"></input>
      </form>
    </div>
  );
};

export default AddUser;
