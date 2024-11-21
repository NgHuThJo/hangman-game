import { MouseEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useWordContext } from "#frontend/providers/word-context";
import { Dialog } from "#frontend/components/ui/dialog/dialog";
import { findAllOccurencesOfLetter } from "#frontend/utils/string";
import styles from "./game.module.css";
import { icon_menu } from "#frontend/assets/resources/icons";
import { icon_heart } from "#frontend/assets/resources/icons";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const maxHealth = 8;

export function Game() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { currentWord } = useWordContext();
  const [guessedLetters, setGuessedLetters] = useState<string[]>(
    new Array(currentWord.length).fill(""),
  );
  const [currentHealth, setCurrentHealth] = useState(maxHealth);

  const handleChosenLetter = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const letter = button.textContent as string;
    button.setAttribute("disabled", "true");

    const indexList = findAllOccurencesOfLetter(currentWord, letter);

    if (!indexList.length) {
      setCurrentHealth((prev) => {
        if (prev === 1) {
          dialogRef.current?.showModal();
        }

        return prev - 1;
      });

      return;
    }

    setGuessedLetters((prev) => {
      const prevCopy = [...prev];

      indexList.forEach((index) => {
        prevCopy[index] = letter;
      });

      return prevCopy;
    });
  };

  return (
    <main>
      <Dialog ref={dialogRef}>
        <h2>You Lose</h2>
        <button>Play Again!</button>
        <button>New Category</button>
        <button>Quit Game</button>
      </Dialog>
      <section className={styles.header}>
        <Link to="/">
          <img src={icon_menu} alt="" />
        </Link>
        <h1>countries</h1>
        <div className={styles.health}>
          <div style={{ width: `${(currentHealth / maxHealth) * 100}%` }}></div>
        </div>
        <img src={icon_heart} alt="" />
      </section>
      <section className={styles["hidden-letters"]}>
        {guessedLetters.map((value, index) => (
          <p key={index}>{value ? value : ""}</p>
        ))}
      </section>
      <div className={styles.letters}>
        {alphabet.map((letter, index) => (
          <button
            type="button"
            className={styles["letter-button"]}
            key={index}
            onClick={handleChosenLetter}
          >
            {letter}
          </button>
        ))}
      </div>
    </main>
  );
}
