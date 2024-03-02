import "../sass/BooksPage.css";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Reviews from "../components/Reviews";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { RxUpdate, RxCross1 } from "react-icons/rx";
import filters from "../data/filters.json";

function BookPage() {
  let { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [booksPage, setbooksPage] = useState([]);
  const [booksComments, setbooksComments] = useState([]);
  const [booksRatio, setbooksRatio] = useState();
  const [updatebooks, setUpdatebooks] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`https://backend-controlbox.vercel.app/api/reviews/${id}`).then(
      (response) => {
        setbooksPage(response.data[0]);
      }
    );

    Axios.get(`https://backend-controlbox.vercel.app/api/comments/${id}`).then(
      (response) => {
        setbooksComments(response.data);
      }
    );

    let ratio = [];

    booksComments.map((comment) => {
      return ratio.push(Number(comment.ratio));
    });

    let suma = (ratio) => {
      let numero = 0;
      ratio.forEach((num) => {
        numero += num;
      });
      return numero;
    };

    let promedio = (suma(ratio) / booksComments.length).toFixed(1);

    setbooksRatio(promedio);
  }, [id, booksComments, booksRatio]);

  const deleteReview = async (id) => {
    try {
      await Axios.delete(
        `https://backend-controlbox.vercel.app/api/reviews/${id}`
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const updateReview = (e) => {
    Axios.put(`https://backend-controlbox.vercel.app/api/reviews/${id}`, {
      id: id,
      newResumen: e.newResumen,
      newAutor: e.newAutor,
      newTitulo: e.newTitulo,
      newCategoria: e.newCategoria,
      newImg: e.newImg,
    });
    setUpdatebooks(!updatebooks);
  };

  const booksSchema = yup.object().shape({
    newImg: yup.string().url().required(),
    newAutor: yup.string().required(),
    newTitulo: yup.string().required(),
    newCategoria: yup.mixed().oneOf(filters[0]).required(),
    newResumen: yup.string().required(),
  });

  const initialValues = {
    newImg: "",
    newAutor: "",
    newCategoria: "",
    newResumen: "",
    newTitulo: "",
  };

  return (
    <div className="booksReview">
      {updatebooks ? (
        <Formik
          initialValues={initialValues}
          onSubmit={updateReview}
          validationSchema={booksSchema}
        >
          <Form className="booksPage-container">
            <div className="newbooksInf booksInf">
              {currentUser?.admin === 1 ? (
                <div className="button-container">
                  <button type="submit">
                    <AiOutlineCheck />
                  </button>
                  <button onClick={() => setUpdatebooks(!updatebooks)}>
                    <RxCross1 />
                  </button>
                </div>
              ) : null}

              <h3>Nueva Img</h3>
              <Field name="newImg" placeholder=" Nueva Img URL..." type="url" />

              <h3>Nuevo Titulo:</h3>
              <Field
                placeholder="Nuevo Titulo..."
                name="newTitulo"
                type="text"
              />

              <h3>Nuevo Autor:</h3>
              <Field placeholder="Nuevo Autor..." name="newAutor" type="text" />

              <h3>Nueva Categoria:</h3>
              <Field
                placeholder="Nueva Categoria"
                name="newCategoria"
                type="text"
                component="select"
              >
                {filters[0].map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </Field>
              <h3>Nuevo Resumen:</h3>
              <Field
                className="newbooksSynopsis"
                name="newResumen"
                placeholder="New Resumen..."
                type="text"
                as="textarea"
              />
              <div className="update-error">
                <ErrorMessage
                  name="newImg"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newTitulo"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newAutor"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newCategoria"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newResumen"
                  component="span"
                  className="errorMessage"
                />
              </div>
            </div>
          </Form>
        </Formik>
      ) : (
        <div className="booksPage-container">
          <img className="booksImg" alt="booksImg" src={booksPage?.booksImg} />
          <div className="booksInf">
            {currentUser?.admin === 1 ? (
              <div className="button-container">
                <button onClick={() => setUpdatebooks(!updatebooks)}>
                  <RxUpdate />
                </button>
                <button onClick={() => deleteReview(id)}>
                  <AiFillDelete />
                </button>
              </div>
            ) : null}
            <div className="books-name-ratio">
              <div className="books-info-container">
                <h2>Titulo de libro: </h2>
                <h4 className="booksTexts">{booksPage?.booksTitulo}</h4>
              </div>
              <div>
                <h3>Ratio: </h3>
                <h4>{isNaN(booksRatio) ? "--" : booksRatio}</h4>
              </div>
            </div>
            <div className="books-info-container">
              <h3 className="booksTexts">Autor:</h3>
              <p>{booksPage.booksAutor}</p>
            </div>
            <div className="books-info-container">
              <h3>Resumen:</h3>
              <p className="booksTexts">{booksPage.booksResumen}</p>
            </div>
          </div>
        </div>
      )}

      {/* <p>Posted {moment(id.date).fromNow()}</p> */}

      <Reviews booksComments={booksComments} booksPageId={booksPage.id} />
    </div>
  );
}

export default BookPage;
