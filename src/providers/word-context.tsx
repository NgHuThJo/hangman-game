import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { useContextWrapper } from "#frontend/utils/context";

export type WordContextType = {
  currentWord: string;
} | null;
export type WordContextApiType = {
  chooseWord: () => string;
  chooseCategory: (category: string) => void;
} | null;

const WordContext = createContext<WordContextType>(null);
const WordContextApi = createContext<WordContextApiType>(null);

export const useWordContext = () =>
  useContextWrapper(WordContext, "WordContext is null");
export const useWordContextApi = () =>
  useContextWrapper(WordContextApi, "WordContextApi is null");

const categoryList: {
  [key: string]: string[];
} = {
  movie: ["Inception", "Titanic", "Gladiator", "Avatar", "Frozen"],
  tvShow: [
    "Friends",
    "Breaking Bad",
    "The Office",
    "Game of Thrones",
    "Stranger Things",
  ],
  countries: ["Argentina", "Australia", "Belgium", "Canada", "Denmark"],
  capitalCity: ["Paris", "Tokyo", "Berlin", "Ottawa", "Cairo"],
  animal: ["Elephant", "Kangaroo", "Giraffe", "Penguin", "Dolphin"],
  sport: ["Football", "Basketball", "Cricket", "Tennis", "Badminton"],
};

export function WordContextProvider({ children }: PropsWithChildren) {
  const [currentCategory, setCurrentCategory] = useState("animal");
  const [currentWord, setCurrentWord] = useState("");

  const value = useMemo(() => {
    return { currentWord };
  }, [currentWord]);

  const api = useMemo(() => {
    const chooseWord = () => {
      const currentCategoryList = categoryList[currentCategory];
      const newWord =
        currentCategoryList[
          Math.floor(Math.random() * currentCategoryList.length)
        ].toLocaleLowerCase();

      console.log(newWord);
      setCurrentWord(newWord);

      return newWord;
    };

    const chooseCategory = (category: string) => {
      setCurrentCategory(category);
    };

    return { chooseCategory, chooseWord };
  }, [currentCategory]);

  return (
    <WordContextApi.Provider value={api}>
      <WordContext.Provider value={value}>{children}</WordContext.Provider>
    </WordContextApi.Provider>
  );
}
