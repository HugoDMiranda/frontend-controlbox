import "../sass/Components-sass/Reviews.css";
import Comments from "./Comments";
import { AuthContext } from "../context/authContext.js";
import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

function Reviews({ booksComments, booksPageId }) {
  const { currentUser } = useContext(AuthContext);

  const [booksCommentsList, setbooksCommentsList] = useState([]);

  useEffect(() => {
    Axios.get("https://backend-controlbox.vercel.app/api/comments").then(
      (response) => {
        setbooksCommentsList(response.data);
      }
    );
  }, [booksCommentsList]);

  const submitComment = async (e) => {
    try {
      await Axios.post("https://backend-controlbox.vercel.app/api/comments", {
        commentText: e.commentText,
        ratio: e.ratio,
        userId: currentUser.id,
        booksId: booksPageId,
      });
      setbooksCommentsList([
        ...booksCommentsList,
        {
          commentText: e.commentText,
          ratio: e.ratio,
          userId: currentUser.id,
          booksId: booksPageId,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const userSchema = yup.object().shape({
    commentText: yup.string().required(),
    ratio: yup.number().max(5).positive().required(),
  });

  const initialValues = {
    commentText: "",
    ratio: "",
  };

  const userComment = booksCommentsList.filter((comment) => {
    return (
      comment.userId === currentUser?.id && comment.booksId === booksPageId
    );
  });

  return (
    <div className="reviews-container">
      {currentUser && userComment[0] === undefined ? (
        <Formik
          initialValues={initialValues}
          onSubmit={submitComment}
          validationSchema={userSchema}
        >
          <Form className="form-reviews">
            <div>
              <h2>Agregar reseña</h2>
              <Field
                name="commentText"
                placeholder="Your comment"
                type="text"
                className="commentText"
                as="textarea"
              />
            </div>
            <div className="ratio-container">
              <h4>Tu reseña</h4>
              <Field type="number" placeholder="Ratio..." name="ratio" />
              <button type="submit">SUBMIT</button>
            </div>
            <ErrorMessage
              name="commentText"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="ratio"
              component="span"
              className="errorMessage"
            />
          </Form>
        </Formik>
      ) : currentUser && userComment[0] ? (
        <h2 className="already">Ya tienes una reseña</h2>
      ) : !currentUser ? (
        <Link className="commentLink" to="/Login">
          Iinicia sesion para hacer una reseña
        </Link>
      ) : null}
      <hr />
      <h1>Reseñas</h1>
      <div>
        <Comments booksComments={booksComments} />
      </div>
    </div>
  );
}

export default Reviews;
