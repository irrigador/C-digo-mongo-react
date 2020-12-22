/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

import AuthLayout from "./layouts/Auth";
import ErrorLayout from "./layouts/Error";
import DashboardLayout from "./layouts/Dashboard";

import DashboardDefaultView from "./views/DashboardDefault";
import Presentation from "views/Presentation";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/usuarios" />,
  },
  {
    path: "/auth",
    component: AuthLayout,
    routes: [
      {
        path: "/auth/login",
        exact: true,
        component: lazy(() => import("views/Login")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    path: "/errors",
    component: ErrorLayout,
    routes: [
      {
        path: "/errors/error-401",
        exact: true,
        component: lazy(() => import("views/Error401")),
      },
      {
        path: "/errors/error-404",
        exact: true,
        component: lazy(() => import("views/Error404")),
      },
      {
        path: "/errors/error-500",
        exact: true,
        component: lazy(() => import("views/Error500")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    route: "*",
    component: DashboardLayout,
    routes: [
      {
        path: "/usuarios", //! Página de lista de usuários do sistema
        exact: true,
        component: lazy(() => import("views/Usuarios/Usuarios")),
      },
      {
        path: "/usuarios/criar", //! Página de lista de usuários do sistema
        exact: true,
        component: lazy(() => import("views/Usuarios/CriarUsuario")),
      },
      {
        path: "/presentation",
        exact: true,
        component: Presentation,
      },
      {
        path: "/dashboards/default",
        exact: true,
        component: DashboardDefaultView,
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
];

export default routes;
