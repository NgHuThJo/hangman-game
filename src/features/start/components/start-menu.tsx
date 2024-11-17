import { useNavigate } from "react-router-dom";
import styles from "./start-menu.module.css";
import { logo } from "#frontend/assets/resources/images";
import { icon_play } from "#frontend/assets/resources/icons";

export function StartMenu() {
  const navigate = useNavigate();

  const handleHowToPlay = () => {
    return navigate("/instructions");
  };

  const handlePlayGame = () => {
    return navigate("/categories");
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo with description 'The Hangman Game'" />
      <button
        type="button"
        className={styles["play-button"]}
        onClick={handlePlayGame}
      >
        <img src={icon_play} alt="Play icon" />
      </button>
      <button
        type="button"
        className={styles["how-to-play-button"]}
        onClick={handleHowToPlay}
      >
        How to play
      </button>
    </div>
  );
}
