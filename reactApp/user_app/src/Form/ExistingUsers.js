import React from "react";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

export const ExistingUsers = ({ user, getUserInfo }) => {
  const editUser = (updatedData) => {
    console.log(updatedData);
    axios
      .put(`http://localhost:5000/api/users/${user.id}`, updatedData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };

  const deleteUser = (ID) => {
    axios
      .delete(`http://localhost:5000/api/users/${ID}`)
      .then((res) => {
        console.log(res);
        getUserInfo();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Formik
        initialValues={{ username: user.username, bio: user.bio }}
        onSubmit={(values) => {
          console.log(user.id);
          editUser(values);
        }}>
        {(props) => {
          const { values, handleSubmit, handleChange } = props;
          return (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid black",
                borderRadius: "5px",
                width: "500px",
                margin: "20px auto",
                padding: "50px",
              }}>
              <TextField
                style={{ height: "100px" }}
                variant="outlined"
                name="username"
                value={values.username}
                onChange={handleChange}
                label="username"
              />
              <TextField
                variant="outlined"
                name="bio"
                value={values.bio}
                onChange={handleChange}
                label="bio"
              />
              <Button variant="contained" color="primary" type="submit">
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteUser(user.id)}>
                X
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
