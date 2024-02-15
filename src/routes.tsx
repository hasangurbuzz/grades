import React from "react";
import {RouteObject} from "react-router-dom";
import Layout from "./Layout";
import GradesPage from "./pages/GradesPage";
import CreateGradePage from "./pages/CreateGradePage";
import ErrorPage from "./pages/ErrorPage";

const routes: RouteObject[] = [
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <GradesPage/>
            },
            {
                path: "/create",
                element: <CreateGradePage/>
            }
        ],
        errorElement: <ErrorPage/>
    }
]

export {routes}