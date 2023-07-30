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

  const category = useLocation().search;

  const filterSearch = booksReviewsList.filter((books) => {
    return searchInput.toLowerCase() === ""
      ? books
      : searchInput === "0-9"
      ? books.animeName.includes(0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
      : books.animeName.toLowerCase().startsWith(searchInput);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rescom = await Axios.get(
          `https://server-anime-reviews.vercel.app/api/comments`
        );
        setComentarios(rescom.data);

        const res = await Axios.get(
          `https://server-anime-reviews.vercel.app/api/reviews${category}`
        );
        setbooksReviewsList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category, currentUser, comentarios]);

  const booksRatio = (id) => {
    let ratio = [];

    comentarios.map((comment) => {
      if (id === comment.animeId) {
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
                  Img={books.animeImg}
                  booksName={books.animeName}
                  Synopsis={books.animeSynopsis}
                  Ratio={booksRatio(books.id)}
                  Type={books.animeType}
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
