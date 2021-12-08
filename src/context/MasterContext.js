import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const MasterContext = createContext();

export { MasterContext };

const MasterProvider = (props) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    axios
      .get("/auth/getCurrentUser")
      .then(({ data }) => {
        console.log(data);
        setUser(data);
        if (location.pathname === "/") {
          navigate("home");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        navigate("/");
      });
  }, []);

  useEffect(() => {
    console.log("USER HAS CHANGED:", user);
  }, [user]);

  return (
    <MasterContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </MasterContext.Provider>
  );
};

export default MasterProvider;
