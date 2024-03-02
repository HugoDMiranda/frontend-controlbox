import React from "react";
import Filter from "./Filter";
import "../sass/Components-sass/Filters.css";
import filters from "../data/filters.json";

function Filters({ setSearchInput }) {
  return (
    <div className="filters">
      <input
        placeholder="Search..."
        type="text"
        className="search"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Filter filterName="Categoria" filterTags={filters[0]} />
    </div>
  );
}

export default Filters;
