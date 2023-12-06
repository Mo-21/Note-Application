import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import NewNote from "./NewNote";

const Routes = () => {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/new", element: <NewNote /> },
    { path: ":id", element: <h1>Current Note</h1> },
    { path: "*", element: <Navigate to={"/"} /> },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
