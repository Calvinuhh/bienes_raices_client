import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    repetirPassword: "",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    const nameRegex = /^[a-zA-ZñÑ\s]+$/;
    if (!nameRegex.test(value) || value.length < 2 || value.length > 35) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "El campo nombre solo puede contener letras y espacios y de 2 a 35 caracteres",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Formato de email invalido",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

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
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.repetirPassword &&
      name &&
      email &&
      password &&
      repetirPassword
    ) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/registro`,
          {
            name,
            email,
            password,
            repetir_password: repetirPassword,
          }
        );
        Swal.fire({
          title: data,
          icon: "success",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          Swal.fire({
            icon: "error",
            title: error.response?.data,
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label
        htmlFor="name"
        className="block text-sm uppercase text-gray-600 mb-3 font-bold"
      >
        Nombre
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        className="w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
        placeholder="Tu nombre"
      />
      {errors.name && (
        <div className=" flex p-2 bg-red-500 h-[50px] items-center justify-center rounded-md ">
          <p className=" text-sm text-white font-semibold text-center ">
            {errors.name}
          </p>
        </div>
      )}

      <label
        htmlFor="email"
        className="block text-sm uppercase text-gray-600 mb-3 font-bold"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        className="w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
        placeholder="Tu Email"
      />
      {errors.email && (
        <div className=" flex p-2 bg-red-500 h-[50px] items-center justify-center rounded-md ">
          <p className=" text-sm text-white font-semibold text-center ">
            {errors.email}
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
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        className="w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
        placeholder="Tu contraseña"
      />
      {errors.password && (
        <div className=" flex p-2 bg-red-500 h-[50px] items-center justify-center rounded-md ">
          <p className=" text-sm text-white font-semibold text-center ">
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
        placeholder="Repite tu contraseña"
      />
      {errors.repetirPassword && (
        <div className=" flex p-2 bg-red-500 h-[50px] items-center justify-center rounded-md ">
          <p className=" text-sm text-white font-semibold text-center ">
            {errors.repetirPassword}
          </p>
        </div>
      )}

      <input
        className="w-full rounded-lg py-3 shadow-2xl text-white font-bold cursor-pointer bg-indigo-600 transition-all duration-[.8s] ease-out hover:bg-indigo-800 hover:scale-105"
        type="submit"
        value="Crear Cuenta"
        disabled={
          !!errors.name ||
          !!errors.email ||
          !!errors.password ||
          !!errors.repetirPassword
        }
      />
    </form>
  );
};

export default RegisterForm;
