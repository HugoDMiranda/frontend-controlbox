import "../sass/Components-sass/Comments.css";
import { AuthContext } from "../context/authContext.js";
import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { RxUpdate, RxCross1 } from "react-icons/rx";

function Comments({ booksComments }) {
  const { currentUser } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://server-anime-reviews.vercel.app/api/comments/users`
    ).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const deleteComment = (id) => {
    Axios.delete(`https://server-anime-reviews.vercel.app/api/comments/${id}`);
  };

  const updateComment = async (e) => {
    try {
      await Axios.put(
        `https://server-anime-reviews.vercel.app/api/comments/${id}`,
        {
          id: id,
          newComment: e.newComment,
          newRatio: e.newRatio,
        }
      );
      setId();
      setUpdate(!update);
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = yup.object().shape({
    newRatio: yup.number().max(5).positive().required(),
    newComment: yup.string().required(),
  });

  const initialValues = {
    newRatio: "",
    newComment: "",
  };

  return (
    <div className="comment-container">
      {booksComments &&
        booksComments.map((booksComment) => {
          return booksComment.userId === currentUser?.id ? (
            update ? (
              <Formik
                initialValues={initialValues}
                onSubmit={updateComment}
                validationSchema={validationSchema}
              >
                <Form className="user-comment">
                  <div className="ratio-name">
                    <Field
                      autocomplete="off"
                      id="newRatio"
                      name="newRatio"
                      placeholder="New ratio..."
                    />
                    <h5>{currentUser?.name}</h5>
                  </div>
                  <Field
                    autocomplete="off"
                    name="newComment"
                    id="newComment"
                    placeholder="Your new comment..."
                    as="textarea"
                  />
                  <ErrorMessage name="newRatio" component="span" />
                  <ErrorMessage name="newComment" component="span" />
                  <div className="comment-buttons">
                    <button
                      type="submit"
                      onClick={() => setId(booksComment.id)}
                    >
                      <AiOutlineCheck />
                    </button>
                    <button onClick={() => setUpdate(!update)}>
                      <RxCross1 />
                    </button>
                  </div>
                </Form>
              </Formik>
            ) : (
              <div className="user-comment" key={booksComment.userId}>
                <div className="ratio-name">
                  <p>Ratio: {booksComment.ratio}</p>
                  <h5>{currentUser?.name}</h5>
                </div>
                <p className="comment-text">{booksComment.comment_text}</p>
                <div className="comment-buttons">
                  <button onClick={() => setUpdate(!update)}>
                    <RxUpdate />
                  </button>
                  <button onClick={() => deleteComment(booksComment.id)}>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="other-comment" key={booksComment.userId}>
              <div className="ratio-name">
                {users.map((user) => {
                  return user.id === booksComment.userId ? (
                    <p key={user.name}>{user.name}</p>
                  ) : null;
                })}
                <p>Ratio: {booksComment.ratio}</p>
              </div>
              <p className="comment-buttons">{booksComment.comment_text}</p>
              {currentUser?.admin === 1 ? (
                <div className="comment-buttons">
                  <button onClick={() => deleteComment(booksComment.id)}>
                    <AiFillDelete />
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
    </div>
  );
}

export default Comments;
