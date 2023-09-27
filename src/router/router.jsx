import {createBrowserRouter} from 'react-router-dom';
import React from "react";
import App from "../App";
import ErrorPage from "../error-page"
import LoginPage from "../pages/LoginPage/LoginPage";
import ReportsPage from "../pages/ReportsPage/ReportsPage"
import UserPage from "../pages/UserPage/UserPage"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'reports',
        element: <ReportsPage />,
    },
    {
        path: 'user',
        element: <UserPage />,
    },
]);