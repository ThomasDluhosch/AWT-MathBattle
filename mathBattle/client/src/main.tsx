import React from "react";
import ReactDOM from "react-dom/client";
import { LoginPage } from "./Login/LoginPage.tsx";
import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import { theme } from "./main-theme.ts";
import { LevelMapPage } from "./LevelMap/LevelMapPage.tsx";
import { NotFound } from "./NotFound.tsx";
import { LevelSucceed } from "./Level/LevelSucceed.tsx";
import { LevelFail } from "./Level/LevelFail.tsx";
import { AuthenticatedRoute } from "./Authentication/AuthenticatedRoute.tsx";
import { AuthProvider } from "./Authentication/AuthProvider.tsx";
import { CreditsPage } from "./StaticPages/CreditsPage.tsx";
import { InstructionsPage } from "./StaticPages/InstructionsPage.tsx";
import { Level } from "./Level/Level.tsx";
import { LevelHighscores } from "./Level/LevelHighscores.tsx";
import OptionsPage from "./StaticPages/OptionsPage.tsx";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/level/:id",
    element: <Level />,
  },
  {
    path: "/instruction",
    element: <InstructionsPage />,
  },
  {
    path: "/options",
    element: <OptionsPage />,
  },
  {
    path: "/",
    element: <AuthenticatedRoute />,
    children: [
      {
        path: "/",
        element: (
          <LevelMapPage/>
        ),
      },
      {
        path: "/:id/succeed",
        element: <LevelSucceed />,
      },
      {
        path: "/:id/failed",
        element: <LevelFail />,
      },
      {
        path: "/:id/highscores",
        element: <LevelHighscores />,
      },
      {
        path: "/credits",
        element: <CreditsPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
