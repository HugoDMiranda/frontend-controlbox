import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../sass/NewBooks.css";
import Axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import filters from "../data/filters.json";

function NewBooks() {
  const [booksReviewsList, setbooksReviewsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://server-anime-reviews.vercel.app/api/reviews").then(
      (response) => {
        setbooksReviewsList(response.data);
      }
    );
  }, [booksReviewsList]);

  const submitReview = (e) => {
    Axios.post("https://server-anime-reviews.vercel.app/api/reviews", {
      booksTitulo: e.booksTitulo,
      booksAutor: e.booksAutor,
      booksCategoria: e.booksCategoria,
      booksResumen: e.booksResumen,
      booksImg: e.booksImg,
    });
    setbooksReviewsList([
      ...booksReviewsList,
      {
        booksTitulo: e.booksTitulo,
        booksAutor: e.booksAutor,
        booksCategoria: e.booksCategoria,
        booksResumen: e.booksResumen,
        booksImg: e.booksImg,
      },
    ]);
    navigate("/");
  };

  const booksSchema = yup.object().shape({
    booksImg: yup.string().url().required(),
    booksTitulo: yup.string().required(),
    booksAutor: yup.string().required(),
    booksCategoria: yup.mixed().oneOf(["books", "Movie", "OVA"]).required(),
    booksResumen: yup.string().required(),
  });

  const initialValues = {
    booksTitulo: "",
    booksAutor: "",
    booksCategoria: "",
    booksResumen: "",
    booksImg: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitReview}
      validationSchema={booksSchema}
    >
      <Form className="newbooksPage-container">
        <div className="newbooksPage-container-info">
          <h3>Books Img</h3>
          <Field name="booksImg" placeholder="Img URL..." type="url" />
          <h3>Books Titulo:</h3>
          <Field
            placeholder="libro Titulo..."
            autoComplete="off"
            name="booksTitulo"
            type="text"
          />
          <h3>Books autor:</h3>
          <Field
            placeholder="libro Autor..."
            autoComplete="off"
            name="booksAutor"
            type="text"
          />
          <h3>Categoria</h3>
          <Field placeholder="Type" name="booksCategoria" component="select">
            {filters[1].map((status) => {
              return (
                <option value={status} key={status}>
                  {status}
                </option>
              );
            })}
          </Field>
          <h3>Resumen</h3>
          <Field
            className="newbooksSynopsis"
            name="booksResumen"
            placeholder="Resumen..."
            as="textarea"
            type="textarea"
          />
          <div className="newbooksPage-container-info-button">
            <button type="submit">Agregar libro</button>
          </div>
          <div className="newbooksPage-container-info-error">
            <ErrorMessage
              name="booksImg"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="booksTitulo"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="booksAutor"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="booksCategoria"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="booksResumen"
              component="span"
              className="errorMessage"
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default NewBooks;
