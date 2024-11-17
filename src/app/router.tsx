import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "#frontend/app/root";
import { ErrorRoute } from "#frontend/app/routes/error.js";
import { NotFoundRoute } from "#frontend/app/routes/not-found.js";
import { Categories } from "#frontend/features/categories/categories";
import { Game } from "#frontend/features/game/game";
import { Instructions } from "#frontend/features/instructions/components/instructions";
import { StartMenu } from "#frontend/features/start/components/start-menu";

export const routesConfig = [
  {
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <AppRoot />,
        children: [
          {
            index: true,
            element: <StartMenu />,
          },
          {
            path: "instructions",
            element: <Instructions />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "game",
            element: <Game />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundRoute />,
  },
];

export function Router() {
  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}
