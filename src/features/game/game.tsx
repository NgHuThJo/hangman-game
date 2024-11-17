import { useState } from "react";
import { useWordContext } from "#frontend/providers/word-context";
import styles from "./game.module.css";
import { icon_menu } from "#frontend/assets/resources/icons";
import { icon_heart } from "#frontend/assets/resources/icons";

export function Game() {
  const maxHealth = 8;
  const { currentWord } = useWordContext();
  const [guessedLetters, setGuessedLetters] = useState(
    new Array(currentWord.length),
  );
  const [currentHealth, setCurrentHealth] = useState(maxHealth);

  return (
    <main>
      <section>
        <button type="button" className="">
          <img src={icon_menu} alt="" />
        </button>
        <h1>countries</h1>
        <div className={styles.health}>
          <div style={{ width: `${currentHealth / maxHealth}%` }}></div>
        </div>
        <img src={icon_heart} alt="" />
      </section>
      <section>
        {Array.from({ length: currentWord.length }, () => (
          <p className={styles.letter}></p>
        ))}
      </section>
    </main>
  );
}
