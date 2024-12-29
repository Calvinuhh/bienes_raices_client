import { useState } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import loading_gif from "../../public/loading_gif.gif";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setEmailError("Formato de email inválido");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      Swal.fire({
        title: "Inicio de sesión exitoso",
        text: data,
        icon: "success",
      });
    } catch (error) {
      if (error instanceof AxiosError)
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: error.response?.data,
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label
        htmlFor="email"
        className="block text-sm uppercase text-gray-600 mb-3 font-bold"
      >
        Email
      </label>
      <input
        name="email"
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        className="w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
        placeholder="Tu Email"
      />
      {emailError && (
        <div className="flex p-2 bg-red-500 h-[50px] items-center justify-center rounded-md">
          <p className="text-sm text-white font-semibold text-center">
            {emailError}
          </p>
        </div>
      )}

      <label
        htmlFor="password"
        className="block text-sm uppercase text-gray-600 mb-3 font-bold"
      >
        Contraseña
      </label>
      <input
        name="password"
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        className="w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
        placeholder="Tu contraseña"
      />

      {!isLoading && (
        <input
          className="w-full rounded-lg py-3 shadow-2xl text-white font-bold cursor-pointer bg-indigo-600 transition-all duration-[.8s] ease-out hover:bg-indigo-800 hover:scale-105"
          type="submit"
          value="Iniciar Sesión"
        />
      )}

      {isLoading && (
        <div className="flex justify-center items-center">
          <img
            src={loading_gif}
            alt="Cargando..."
            className="h-[48px] w-[400px]"
          />
        </div>
      )}
    </form>
  );
};

export default LoginForm;
