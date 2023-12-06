import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import NewNote from "./NewNote";
import EditNote from "./EditNote";

const Routes = () => {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/new", element: <NewNote /> },
    { path: "/edit/:id", element: <EditNote /> },
    { path: "*", element: <Navigate to={"/"} /> },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
