import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./css/Auth.module.css";
import axios from "../../api/axios";

export default function Login() {
  const [logoutMessage, setLogoutMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (location.state?.message) {
      setLogoutMessage(location.state.message);
      window.history.replaceState({}, document.title);

      const messageTimer = setTimeout(() => {
        setLogoutMessage("");
      }, 4000);

      return () => clearInterval(messageTimer);
    }
  }, [location]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors({});
    setErrorMessage("");
    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/api/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setEmail("");
      setPassword("");
      navigate("/", { state: { message: response.data.message } });
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status == 422 && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          console.log("Si è verificato un errore");
        }
      }
    }
  };

  return (
    <>
      <section className={`${styles.form_container} flex justify-center`}>
        <div className="w-[35%]">
          {logoutMessage && (
            <div className="flex justify-center">
              <div className="text-white p-2 text-xl bg-green-500">
                {logoutMessage}
              </div>
            </div>
          )}
          {errorMessage && (
            <div className="flex justify-center">
              <div className="text-lg bg-red-400 shadow text-center w-[400px] p-2 text-white">
                {errorMessage}
              </div>
            </div>
          )}
          <div className={`bg-white p-[50px] mt-5 ${styles.form_box}`}>
            <h1 className="mb-10 text-5xl text-center">Login</h1>
            <form
              onSubmit={handleLogin}
              className="flex justify-center flex-col items-center"
            >
              <div className="mb-5">
                <label htmlFor="email" className="block text-2xl">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="tw-inputs-login"
                  type="email"
                  name="email"
                />
                {errors.email && (
                  <div className="text-lg text-red-600">{errors.email[0]}</div>
                )}
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block text-2xl">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="tw-inputs-login"
                  type="password"
                  name="password"
                />
                {errors.password && (
                  <div className="text-lg text-red-600">
                    {errors.password[0]}
                  </div>
                )}
              </div>
              <div className="mt-2 w-full flex justify-end">
                <button className="bg-sky-400 text-xl rounded-lg p-2 w-[100px] cursor-pointer text-white">
                  Accedi
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
