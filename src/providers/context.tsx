import { PropsWithChildren } from "react";
import { WordContextProvider } from "#frontend/providers/word-context";

export function Context({ children }: PropsWithChildren) {
  return <WordContextProvider>{children}</WordContextProvider>;
}
