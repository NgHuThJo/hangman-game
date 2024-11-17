import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { useContextWrapper } from "#frontend/utils/context";

export type WordContextType = {
  currentWord: string;
} | null;
export type WordContextApiType = {
  chooseWord: () => void;
} | null;

const WordContext = createContext<WordContextType>(null);
const WordContextApi = createContext<WordContextApiType>(null);

export const useWordContext = () =>
  useContextWrapper(WordContext, "WordContext is null");
export const useWordContextApi = () =>
  useContextWrapper(WordContextApi, "WordContextApi is null");

const word = "sentence with words";

export function WordContextProvider({ children }: PropsWithChildren) {
  const [currentWord, setCurrentWord] = useState(word);

  const value = useMemo(() => {
    return { currentWord };
  }, [currentWord]);

  const api = useMemo(() => {
    const chooseWord = () => {
      setCurrentWord(word);
    };

    return { chooseWord };
  }, []);

  return (
    <WordContextApi.Provider value={api}>
      <WordContext.Provider value={value}>{children}</WordContext.Provider>
    </WordContextApi.Provider>
  );
}
