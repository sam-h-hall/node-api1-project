import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ExistingUsers } from "./Form/ExistingUsers";
import { NewUser } from "./Form/NewUser";

function App() {
  const [users, setUsers] = useState();

  const getUserInfo = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="App">
      <h1>User List</h1>
      <NewUser getUserInfo={getUserInfo} />
      {!users ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {users.map((user) => (
            <ExistingUsers
              user={user}
              getUserInfo={getUserInfo}
              key={user.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

// const deleteUser = (ID) => {
//   axios
//     .delete(`http://localhost:5000/api/users/${ID}`)
//     .then((res) => {
//       console.log(res);
//       getUserInfo();
//     })
//     .catch((err) => console.log(err));
// };

// const editUser = (userID, updatedData) => {
//   console.log(updatedData);
//   axios
//     .put(`http://localhost:5000/api/users/${userID}`, updatedData)
//     .then((res) => {
//       console.log(res);
//       getUserInfo();
//     })
//     .catch((err) => console.log(err.message));
// };

// <div
//   style={{
//     border: "2px solid black",
//     width: "500px",
//     margin: "15px auto",
//   }}
//   key={user.id}>
//   <h3>Username: {user.username}</h3>
//   <h4>Bio: {user.bio}</h4>
//   <button
//   // onClick={() => {
//   //   editing = <Form />;
//   // }}
//   >
//     Edit
//   </button>
//   <button onClick={() => deleteUser(user.id)}>X</button>
// </div>
