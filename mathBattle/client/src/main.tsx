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
import OptionsPage from "./Options/OptionsPage.tsx";
import { NavBar } from "./NavBar.tsx";
import { BasicLayout } from "./BasicLayout.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      }, {
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
              <LevelMapPage />
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
            path: "/credits",
            element: <CreditsPage />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
          {
            path: "/level/:id",
            element: <Level />,
          },

          {
            path: "/options",
            element: <OptionsPage />,
          }
        ],
      },]
  }
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
