import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../sass/Register.css";
import Axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../context/authContext";

function User() {
  const [res, setRes] = useState(null);
  const [password, setPassword] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const changePassword = async (e) => {
    try {
      await Axios.put(
        "https://backend-controlbox.vercel.app/api/auth/password",
        {
          oldPassword: e.oldPassword,
          newPassword: e.newPassword,
          repPassword: e.repPassword,
          username: currentUser.name,
        }
      );
      setRes("Tu contraseña fue cambiada con exito");
      setPassword(false);
    } catch (err) {
      setRes(err.response.data);
      console.log(err);
    }
  };

  const userSchema = yup.object().shape({
    oldPassword: yup.string().min(4).required(),
    newPassword: yup.string().min(4).required(),
    repPassword: yup.string().min(4).required(),
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    repPassword: "",
  };

  return (
    <div className="form-container">
      <h2>Tu cuenta</h2>
      <div className="register-form">
        <label for="name">Tu nombre:</label>
        <h5>{currentUser.name}</h5>
      </div>
      {!password ? (
        <>
          <button onClick={() => setPassword(true)}>
            Quieres cambiar de contraseña?
          </button>
          {res === "Tu contraseña fue cambiada con exito" && (
            <span className="successMessage ">{res}</span>
          )}
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={changePassword}
          validationSchema={userSchema}
        >
          <Form className="register-form">
            <button onClick={() => setPassword(false)}>
              No quieres cambiar de contraseña?
            </button>
            <h4>Cambia tu contraseña</h4>
            <label for="name">tu contraseña actual</label>
            <Field
              autoComplete="off"
              type="password"
              placeholder="*********"
              id="oldPassword"
              name="oldPassword"
            />
            <ErrorMessage
              name="oldPassword"
              component="span"
              className="errorMessage"
            />
            <label for="password">nueva contraseña</label>
            <Field
              autoComplete="off"
              type="password"
              placeholder="*********"
              id="newPassword"
              name="newPassword"
            />
            <ErrorMessage
              name="newPassword"
              component="span"
              className="errorMessage"
            />
            <label for="email">confirmar nueva contraseña</label>
            <Field
              autoComplete="off"
              type="password"
              placeholder="*********"
              id="repPassword"
              name="repPassword"
            />
            <ErrorMessage
              name="repPassword"
              component="span"
              className="errorMessage"
            />
            <button type="submit">Cambiar contraseña</button>
            {res !== "Tu contraseña fue cambiada con exito" && (
              <span className="errorMessage">{res}</span>
            )}
          </Form>
        </Formik>
      )}
      <Link className="register" to="/">
        Regresar a la pagina de inicio.
      </Link>
    </div>
  );
}

export default User;
