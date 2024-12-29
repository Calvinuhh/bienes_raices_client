import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import NavBtn from "../components/NavBtn";

const LoginView = () => {
  useEffect(() => {
    document.title = "Bienes Raices | Iniciar Sesion";
  }, []);

  return (
    <div className=" py-10">
      <h1 className=" text-center text-4xl font-extrabold my-10">
        Bienes<span className=" font-normal">Raices</span>
      </h1>
      <h2 className=" text-center text-2xl font-extrabold">Iniciar Sesion</h2>

      <div className=" mt-8 mx-auto max-w-md">
        <div className=" bg-white py-8 px-4 shadow rounded-lg">
          <LoginForm />
          <NavBtn
            enlaces={["/registro", "/recuperar_password"]}
            textos={[
              "¿No tienes cuenta? Registrate",
              "Olvide mi Contraseña",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginView;
