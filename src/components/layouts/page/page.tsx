import { PropsWithChildren } from "react";
import styles from "./page.module.css";
import {
  background_desktop,
  background_mobile,
  background_tablet,
} from "#frontend/assets/resources/images";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className={styles.container}>
      <img
        src={background_mobile}
        alt=""
        srcSet={`${background_mobile} 375w, 
      ${background_tablet} 768w, ${background_desktop} 1440w`}
        sizes="(max-width: 480px) 375px, (max-width: 1024px) 768px, 1440px"
        className={styles.background}
      />
      {children}
    </main>
  );
}
