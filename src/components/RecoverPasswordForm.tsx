import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import loadingGif from "../../public/loading_gif.gif";

const RecoverPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setError("Formato de email inválido");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error || !email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingresa un email válido.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/recuperar_password`,
        { email }
      );
      Swal.fire({
        title: "Éxito",
        text: data,
        icon: "success",
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data,
        });
      }
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
      {error && (
        <div className="flex p-2 bg-red-500 h-[50px] items-center justify-center rounded-md">
          <p className="text-sm text-white font-semibold text-center">
            {error}
          </p>
        </div>
      )}

      <input
        className={`w-full rounded-lg py-3 shadow-2xl text-white font-bold cursor-pointer ${
          isLoading
            ? "bg-gray-400"
            : "bg-indigo-600 hover:bg-indigo-800 hover:scale-105"
        } transition-all duration-[.8s] ease-out`}
        type="submit"
        value={isLoading ? "Cargando..." : "Enviar Instrucciones"}
        disabled={isLoading}
      />
      {isLoading && (
        <div className="flex justify-center">
          <img
            src={loadingGif}
            alt="loading_gif"
            className="h-[48px] w-[400px]"
          />
        </div>
      )}
    </form>
  );
};

export default RecoverPasswordForm;
