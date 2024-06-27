import React from "react";
import ReactDOM from "react-dom/client";
import { LoginPage } from "./Login/LoginPage.tsx";
import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { theme } from "./main-theme.ts";
import { LevelMapPage } from "./LevelMap/LevelMapPage.tsx";
import { NotFound } from "./NotFound.tsx";
import { LevelSucceed } from "./Level/LevelSucceed.tsx";
import { LevelFail } from "./Level/LevelFail.tsx";
import { AuthenticatedRoute } from "./Authentication/AuthenticatedRoute.tsx";
import { AuthProvider } from "./Authentication/AuthProvider.tsx";
import { Credits } from "./StaticPages/Credits.tsx";
import { InstructionsPage } from "./InstructionsPage.tsx";
import { Level } from "./Level/Level.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/level",
    element: <Level />,
  },
  {
    path: "/instruction",
    element: <InstructionsPage />,
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
        path: "/succeed",
        element: <LevelSucceed />,
      },
      {
        path: "/failed",
        element: <LevelFail />,
      },
      {
        path: "/credits",
        element: <Credits />,
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
