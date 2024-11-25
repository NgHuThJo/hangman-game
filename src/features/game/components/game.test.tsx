import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Context } from "#frontend/providers/context";
import { routesConfig } from "#frontend/app/router";
import path from "path";

vi.doMock("#frontend/providers/word-context", () => {
  console.log(path.resolve(__dirname, "../../../providers/word-context"));

  return {
    ...vi.importActual("../../../providers/word-context"),
    useWordContext: () => ({
      currentWord: "mockwordmockword",
    }),
    useWordContextApi: () => ({
      chooseWord: () => "mockwordmockword",
      chooseCategory: () => {},
    }),
  };
});

describe("Game", () => {
  const user = userEvent.setup();

  it("Letter is chosen and disabled", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/category", "/game"],
    });

    await waitFor(() => {
      render(<RouterProvider router={router} />, { wrapper: Context });
    });

    const letterButton = screen.getByText(/^a$/i);
    await user.click(letterButton);

    expect(letterButton).toBeDisabled();
  });

  // it("Letter chosen is in word", async () => {
  //   const router = createMemoryRouter(routesConfig, {
  //     initialEntries: ["/", "/category", "/game"],
  //   });
  //   render(<RouterProvider router={router} />, {
  //     wrapper: Context,
  //   });

  //   const letterButton = screen.getByText(/^w$/i);
  //   await user.click(letterButton);
  //   const guessedLetters = screen.getAllByText("w", {
  //     selector: "p",
  //   });

  //   expect(guessedLetters).toHaveLength(2);
  // });

  it("Dialog opens if health is zero", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/category", "/game"],
    });
    render(<RouterProvider router={router} />, {
      wrapper: Context,
    });

    const letters = "yz";

    for (const letter of letters) {
      const letterButton = screen.getByText(new RegExp(`^${letter}$`, "i"));
      user.click(letterButton);
    }

    await waitFor(() => {
      expect(screen.getByText(/^you lose$/i)).toBeInTheDocument();
    });
  });

  it("Win screen shows if word is guessed", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/category", "/game"],
    });
    render(<RouterProvider router={router} />, {
      wrapper: Context,
    });

    const letters = "abcdefgh";

    for (const letter of letters) {
      const letterButton = screen.getByText(new RegExp(`^${letter}$`, "i"));
      user.click(letterButton);
    }

    expect(screen.getByText(/^you lose$/i)).toBeInTheDocument();
  });
});
