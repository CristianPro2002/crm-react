import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NuevoCliente, {action as nuevoClienteAction} from "./pages/NuevoCliente";
import Index, {loader as ClientesLoader} from "./pages/Index";
import ErrorPage from "./components/ErrorPage";
import EditarCliente, {loader as EditarClienteLoader, action as EditarClienteAction} from "./pages/EditarCliente";
import { action as EliminarClienteAction } from "./components/Cliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: ClientesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:id/editar",
        element: <EditarCliente />,
        loader: EditarClienteLoader,
        action: EditarClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:id/eliminar",
        action: EliminarClienteAction
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
