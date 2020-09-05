import React from "react";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

export const NewUser = ({ getUserInfo }) => {
  // need to add post req
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:5000/api/users", values)
      .then((res) => {
        getUserInfo();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Formik
        initialValues={{ username: "", bio: "" }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
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
                variant="outlined"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="username"
                label="username"
              />
              <TextField
                variant="outlined"
                name="bio"
                value={values.bio}
                onChange={handleChange}
                placeholder="bio"
                label="bio"
              />
              <Button type="submit" variant="contained" color="primary">
                Add User
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
