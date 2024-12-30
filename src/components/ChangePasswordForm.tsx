import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import loadingGif from "/loading_gif.gif";

const ChangePasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseToken, setResponseToken] = useState("");

  const [errors, setErrors] = useState({
    password: "",
    repetirPassword: "",
  });

  useEffect(() => {
    const validateToken = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_SERVER_URL}/auth/cambiar_password/${token}`
        );

        setResponseToken(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          navigate("/recuperar_password", { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleRepetirPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRepetirPassword(value);

    if (value !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repetirPassword: "Las contraseñas no coinciden",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, repetirPassword: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !errors.password &&
      !errors.repetirPassword &&
      password &&
      repetirPassword
    ) {
      setIsLoading(true);
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/auth/cambiar_password`,
          {
            password,
            repetir_password: repetirPassword,
            token: responseToken,
          }
        );
        Swal.fire({
          title: data,
          icon: "success",
          text: "La contraseña se ha cambiado correctamente",
        });
        navigate("/login", { replace: true });
      } catch (error) {
        if (error instanceof AxiosError) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center text-4xl font-extrabold my-10">
        Bienes<span className="font-normal">Raices</span>
      </h1>
      <h2 className="text-center text-2xl font-extrabold">
        Cambiar contraseña
      </h2>

      <div className="mt-8 mx-auto max-w-md mb-[200px]">
        <div className="bg-white py-8 px-4 shadow rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <label
              htmlFor="password"
              className="block text-sm uppercase text-gray-600 mb-3 font-bold"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
              placeholder="Tu nueva contraseña"
            />
            {errors.password && (
              <div className="flex p-2 bg-red-500 h-[50px] items-center justify-center rounded-md">
                <p className="text-sm text-white font-semibold text-center">
                  {errors.password}
                </p>
              </div>
            )}

            <label
              htmlFor="repetir_password"
              className="block text-sm uppercase text-gray-600 mb-3 font-bold"
            >
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="repetir_password"
              value={repetirPassword}
              onChange={handleRepetirPasswordChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
              placeholder="Repite tu nueva contraseña"
            />
            {errors.repetirPassword && (
              <div className="flex p-2 bg-red-500 h-[50px] items-center justify-center rounded-md">
                <p className="text-sm text-white font-semibold text-center">
                  {errors.repetirPassword}
                </p>
              </div>
            )}

            <input
              style={isLoading ? { display: "none" } : { display: "block" }}
              className="w-full rounded-lg py-3 shadow-2xl text-white font-bold cursor-pointer bg-indigo-600 transition-all duration-[.8s] ease-out hover:bg-indigo-800 hover:scale-105"
              type="submit"
              value={
                isLoading ? "Cambiando contraseña..." : "Cambiar contraseña"
              }
              disabled={!!errors.password || !!errors.repetirPassword}
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
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
