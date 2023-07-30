import React from "react";
import "../sass/Components-sass/BooksList.css";
import { Link } from "react-router-dom";

function BooksList({ Img, booksName, Ratio, Synopsis, id }) {
  return (
    <Link className="booksList" to={`/booksPage/${id}`} booksName={booksName}>
      <img src={Img} alt={booksName} className="card-img-top img-fluid" />
      <div className="booksText">
        <h3 className="booksName">{booksName}</h3>
        <h3 className="booksName">Autor</h3>
        <h3 className="booksRatio">{isNaN(Ratio) ? "--" : Ratio}</h3>
        <p className="synopsis">{Synopsis}</p>
      </div>
    </Link>
  );
}

export default BooksList;
