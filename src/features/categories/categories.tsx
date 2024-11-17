import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useWordContextApi } from "#frontend/providers/word-context";
import styles from "./categories.module.css";
import { icon_back } from "#frontend/assets/resources/icons";

const categoryList = [
  "movie",
  "tv show",
  "countries",
  "capital city",
  "animal",
  "sport",
];

export function Categories() {
  const { chooseWord } = useWordContextApi();
  const navigate = useNavigate();

  const handleCategoryChoice = (event: MouseEvent) => {
    navigate("/game");
  };

  return (
    <main>
      <section className={styles.top}>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={icon_back} alt="Icon back button" />
        </button>
        <h1>Pick a Category</h1>
      </section>
      <section className={styles["category-container"]}>
        {categoryList.map((category) => (
          <button
            type="button"
            className={styles.category}
            onClick={handleCategoryChoice}
          >
            {category}
          </button>
        ))}
      </section>
    </main>
  );
}
