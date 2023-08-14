import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllRecipes, orderRecipes } from "../../redux/actions";
import Card from "../Card/Card";
import style from "./RecipesCards.module.css";
import Paged from "../Paged/Paged";

export default function RecipesCards() {
  const allRecipes = useSelector((state) => state.recipes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  const CARDS_X_PAGES = 9;

  const [page, setPage] = useState(1);
  const quantityRecipesPage = CARDS_X_PAGES * page;
  const firstRecipePage = quantityRecipesPage - CARDS_X_PAGES;
  const showRecipesPage = allRecipes.slice(
    firstRecipePage,
    quantityRecipesPage
  );

  const [modal1, setmodal1] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [allRecipes]);

  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  return (
    <div>
      <div>
        <Paged
          recipesPage={CARDS_X_PAGES}
          allRecipes={allRecipes.length}
          paged={paged}
          currentPage={page}
        />
      </div>
      <div className={style.contenedorCards}>
        {showRecipesPage?.map((recipe) => (
          <Card
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            dietTypes={recipe.dietTypes}
            created={recipe.created}
          />
        ))}
      </div>
      <div>
        <Paged
          recipesPage={CARDS_X_PAGES}
          allRecipes={allRecipes.length}
          paged={paged}
          currentPage={page}
        />
      </div>
    </div>
  );
}
