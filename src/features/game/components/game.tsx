import { MouseEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useWordContext,
  useWordContextApi,
} from "#frontend/providers/word-context";
import { Dialog } from "#frontend/components/ui/dialog/dialog";
import { findAllOccurencesOfLetter } from "#frontend/utils/string";
import styles from "./game.module.css";
import { icon_menu } from "#frontend/assets/resources/icons";
import { icon_heart } from "#frontend/assets/resources/icons";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const maxHealth = 17;
let guessedLettersCount = 0;

export function Game() {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { currentWord } = useWordContext();
  const { chooseWord } = useWordContextApi();
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentHealth, setCurrentHealth] = useState(maxHealth);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    setGuessedLetters(new Array(chooseWord().length).fill(""));
  }, [chooseWord]);

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

    if (guessedLettersCount + indexList.length === guessedLetters.length) {
      setHasWon(true);
      guessedLettersCount = 0;
      dialogRef.current?.showModal();

      return;
    }

    guessedLettersCount += indexList.length;
  };

  const handleGameRestart = () => {
    return navigate("/game");
  };

  return (
    <div>
      <Dialog ref={dialogRef}>
        <h2>You {`${hasWon ? "Win" : "Lose"}`}</h2>
        <button type="button" onClick={handleGameRestart}>
          Play Again!
        </button>
        <Link to="/categories">New Category</Link>
        <Link to="/">Quit Game</Link>
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
    </div>
  );
}
