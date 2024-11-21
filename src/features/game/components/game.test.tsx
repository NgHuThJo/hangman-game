import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { routesConfig } from "#frontend/app/router";

describe("Game", () => {
  const user = userEvent.setup();

  it("Letter is chosen", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    const letterButton = screen.getByText(/a/i);
    await user.click(letterButton);

    // expect(letterButton).
  });
});
