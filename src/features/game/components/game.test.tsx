import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Context } from "#frontend/providers/context";
import { routesConfig } from "#frontend/app/router";

describe("Game", () => {
  const user = userEvent.setup();

  it("Letter is chosen and disabled", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/category", "/game"],
    });
    render(<RouterProvider router={router} />, {
      wrapper: Context,
    });

    const letterButton = screen.getByText(/^a$/i);
    await user.click(letterButton);

    expect(letterButton).toBeDisabled();
  });

  it("Letter chosen is in word", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/category", "/game"],
    });
    render(<RouterProvider router={router} />, {
      wrapper: Context,
    });

    const letterButton = screen.getByText(/^w$/i);
    await user.click(letterButton);
    const guessedLetters = screen.getAllByText("w", {
      selector: "p",
    });

    expect(guessedLetters).toHaveLength(2);
  });

  it("Dialog opens if health is zero", () => {
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
