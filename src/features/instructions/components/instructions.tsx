import { Link } from "react-router-dom";
import styles from "./instructions.module.css";
import { icon_back } from "#frontend/assets/resources/icons";

export function Instructions() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/">
          <img src={icon_back} alt="Back icon" />
        </Link>
        <h1>How to play</h1>
      </header>
      <main className={styles.rules}>
        <section>
          <h2>Choose a category</h2>
          <p>
            First, choose a word category, like animals or movies. The computer
            then randomly selects a secret word from that topic and shows you
            blanks for each letter of the word.
          </p>
        </section>
        <section>
          <h2>Guess letters</h2>
          <p>
            Take turns guessing letters. The computer fills in the relevant
            blank spaces if your guess is correct. If it’s wrong, you lose some
            health, which empties after eight incorrect guesses.
          </p>
        </section>
        <section>
          <h2>Win or lose</h2>
          <p>
            You win by guessing all the letters in the word before your health
            runs out. If the health bar empties before you guess the word, you
            lose.
          </p>
        </section>
      </main>
    </div>
  );
}
