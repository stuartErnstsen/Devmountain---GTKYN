import { useContext } from "react";
import { Link } from "react-router-dom";
import { MasterContext } from "../../context/MasterContext";
import { Outlet } from "react-router";

const Home = (props) => {
  const { user } = useContext(MasterContext);
  return (
    <main>
      <h1>HOME</h1>
      <Link to="/">GO TO AUTH</Link>
      <Outlet />
    </main>
  );
};

export default Home;
