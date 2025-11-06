import styles from "./css/Auth.module.css";
import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrors({});
    setErrorMessage("");
    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });

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
      <section
        className={`${styles.form_container} w-full flex justify-center`}
      >
        {errorMessage && (
          <div className="flex justify-center">
            <div className="text-lg bg-red-400 shadow text-center w-[400px] p-2 text-white">
              {errorMessage}
            </div>
          </div>
        )}
        <div className="mt-5 w-full">
          <div className="flex justify-center">
            <div className="mb-10 w-[20%] flex justify-center">
              <div className="w-fit">
                <h1 className="text-5xl">Registrati</h1>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleRegister}
            className="flex justify-center flex-col items-center"
          >
            <div className="container flex justify-center flex-col items-center">
              <div className="lg:w-full w-[250px] flex justify-center flex-col items-center">
                <div className="mb-5">
                  <label htmlFor="name" className="block text-2xl">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="tw-inputs-register"
                    type="text"
                    name="name"
                  />
                  {errors.name && (
                    <div className="text-lg text-red-600">
                      {errors.email[0]}
                    </div>
                  )}
                </div>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-2xl">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="tw-inputs-register"
                    type="email"
                    name="email"
                  />
                  {errors.email && (
                    <div className="text-lg text-red-600">
                      {errors.email[0]}
                    </div>
                  )}
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="block text-2xl">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="tw-inputs-register"
                    type="password"
                    name="password"
                  />
                  {errors.password && (
                    <div className="text-lg text-red-600">
                      {errors.password[0]}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 lg:w-[450px]">
                <button className="bg-sky-400 hover:bg-sky-500 lg:w-full w-[400px] text-3xl rounded-lg p-2 cursor-pointer text-white">
                  Registrati
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
