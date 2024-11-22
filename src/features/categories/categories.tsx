import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useWordContextApi } from "#frontend/providers/word-context";
import { capitalizeFirstLetter } from "#frontend/utils/string";
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
  const { chooseCategory } = useWordContextApi();
  const navigate = useNavigate();

  const handleCategoryChoice = (event: MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const splitCategory = button.textContent?.split(" ");

    if (!splitCategory) {
      throw new Error("Category button has no text");
    }

    for (let i = 1; i < splitCategory.length; i++) {
      splitCategory[i] = capitalizeFirstLetter(splitCategory[i]);
    }

    const categoryKey = splitCategory.join("");
    chooseCategory(categoryKey);

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
        {categoryList.map((category, index) => (
          <button
            type="button"
            className={styles.category}
            onClick={handleCategoryChoice}
            key={index}
          >
            {category}
          </button>
        ))}
      </section>
    </main>
  );
}
