import React from "react";
import style from "./Paged.module.css";

export default function Paged({ recipesPage, allRecipes, paged, currentPage }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.length <= 1 ? (
        <></>
      ) : (
        <nav className={style.pagination}>
          {pages?.map((page) => (
            <button
              className={style.pageBtn}
              onClick={() => paged(page)}
              disabled={currentPage === page ? true : false}>
              {page}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
