import React, { useContext } from "react";
import FilterLetters from "../components/FilterLetters";
import Filters from "../components/Filters";
import "../sass/Home.css";
import BooksList from "../components/BooksList";
import AddBooks from "../components/AddBooks";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";

function Home() {
  const { currentUser } = useContext(AuthContext);

  const [booksReviewsList, setbooksReviewsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [comentarios, setComentarios] = useState([]);

  const categoria = useLocation().search;

  const filterSearch = Array.isArray(booksReviewsList)
    ? booksReviewsList.filter((books) => {
        return searchInput.toLowerCase() === ""
          ? books
          : searchInput === "0-9"
          ? books.booksTitulo.includes(
              0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9
            )
          : books.booksTitulo.toLowerCase().startsWith(searchInput);
      })
    : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rescom = await Axios.get(
          `https://backend-controlbox.vercel.app/api/comments`
        );
        setComentarios(rescom.data);

        const res = await Axios.get(
          `https://backend-controlbox.vercel.app/api/reviews${categoria}`
        );
        setbooksReviewsList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [categoria, currentUser, comentarios]);

  const booksRatio = (id) => {
    let ratio = [];

    comentarios.map((comment) => {
      if (id === comment.booksId) {
        return ratio.push(Number(comment.ratio));
      } else {
        return null;
      }
    });

    let suma = (ratio) => {
      let numero = 0;
      ratio.forEach((num) => {
        numero += num;
      });
      return numero;
    };

    let promedio = (suma(ratio) / ratio.length).toFixed(1);

    return promedio;
  };

  return (
    <main className="home-container">
      <FilterLetters setSearchInput={setSearchInput} />
      <Filters setSearchInput={setSearchInput} />
      <div className="info-container">
        <div className="books-container">
          <h1 className="books-text">Books List</h1>
          <div className="books-list-container">
            {currentUser?.admin === 1 ? <AddBooks /> : null}
            {filterSearch.map((books) => {
              return (
                <BooksList
                  Img={books.booksImg}
                  booksAutor={books.booksAutor}
                  booksTitulo={books.booksTitulo}
                  booksResumen={books.booksResumen}
                  booksCategoria={books.booksCategoria}
                  Ratio={booksRatio(books.id)}
                  Type={books.booksType}
                  key={books.id}
                  id={books.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
