import React from "react";
import "../sass/Components-sass/AddBooks.css";
import { Link } from "react-router-dom";

function AddBooks() {
  return (
    <div className="addbooks">
      <Link className="addLink" to="/NewBooks">
        AGREGA LIBRO
      </Link>
    </div>
  );
}

export default AddBooks;
