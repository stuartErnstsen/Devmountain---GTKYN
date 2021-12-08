import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import { useRoutes } from "react-router-dom";

function App() {
  return useRoutes([
    { path: "/", element: <Auth /> },
    {
      path: "home",
      element: <Home />,
      children: [
        { index: true, element: <div>first</div> },
        { path: "secondChild", element: <div>second</div> },
      ],
    },
  ]);
}

export default App;
