import { Link, useNavigate } from "react-router-dom";
import styles from "./css/Navbar.module.css";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/user")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Si è vericato un errore: ", error);
          setUser(null);
        });
    }
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post("/api/logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      navigate("/login", { state: { message: response.data.message } });
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }
  };

  return (
    <>
      <nav className="bg-sky-200 p-4">
        <div className="flex">
          <Link className={`${styles.nav_link} tw-links-nav`} to={"/"}>
            Home
          </Link>
          <Link className={`${styles.nav_link} tw-links-nav`} to={"/register"}>
            Registrati
          </Link>
          <Link className={`${styles.nav_link} tw-links-nav`} to={"/login"}>
            Login
          </Link>

          {user && (
            <div className="flex items-center mx-5 text-xl">
              <span>Ciao, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-400 hover:bg-red-600 mx-5 pt-[5px] pb-[5px] pr-[15px] pl-[15px] rounded-lg text-white cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
