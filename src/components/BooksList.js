import React from "react";
import "../sass/Components-sass/BooksList.css";
import { Link } from "react-router-dom";

function BooksList({
  Img,
  booksTitulo,
  Ratio,
  booksResumen,
  booksAutor,
  id,
  booksCategoria,
}) {
  return (
    <Link className="booksList" to={`/booksPage/${id}`} booksName={booksTitulo}>
      <img src={Img} alt={booksTitulo} className="card-img-top img-fluid" />
      <div className="booksText">
        <h3 className="booksName">{booksTitulo}</h3>
        <h3 className="booksName">{booksAutor}</h3>
        <h3 className="booksRatio">{isNaN(Ratio) ? "--" : Ratio}</h3>
        <p className="synopsis">{booksResumen}</p>
      </div>
    </Link>
  );
}

export default BooksList;
