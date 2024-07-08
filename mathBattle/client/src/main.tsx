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

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
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
        path: "/map",
        element: (
            <LevelMapPage
                name="John"
                levels={[
                    { number: 1, completed: true },
                    { number: 2, completed: true },
                    { number: 3, completed: false },
                ]}
            />
        ),
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);
