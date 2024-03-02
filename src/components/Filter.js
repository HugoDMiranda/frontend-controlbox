import React from "react";
import "../sass/Components-sass/Filter.css";
import { Link } from "react-router-dom";

function Filter({ filterName, filterTags }) {
  return (
    <div className="dropdownMenu">
      <button>{filterName}</button>
      <ul className="menu">
        {filterTags.map((filter) => {
          if (filter === "All") {
            return (
              <li className="active" key={filter}>
                <Link className="link" to="/">
                  {filter}
                </Link>
              </li>
            );
          } else {
            return (
              <li className="active" key={filter}>
                <Link className="link" to={`/?categoria=${filter}`}>
                  {filter}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Filter;
