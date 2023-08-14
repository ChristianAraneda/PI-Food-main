import style from "./Home.module.css";
import Nav from "../Nav/Nav";
import RecipesCards from "../RecipesCards/RecipesCards";

export default function Home() {
  return (
    <>
      <div className={style.contenedorHome}>
        <div className="menu">
          <Nav></Nav>
        </div>
        <div className={style.recetas}>
          <RecipesCards />
        </div>
      </div>
    </>
  );
}
