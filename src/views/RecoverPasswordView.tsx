import { useEffect } from "react";
import RecoverPasswordForm from "../components/RecoverPasswordForm";
import NavBtn from "../components/NavBtn";

const RecoverPasswordView = () => {
  useEffect(() => {
    document.title = "Bienes Raices | Recuperar Contraseña";
  }, []);

  return (
    <div className=" py-10">
      <h1 className=" text-center text-4xl font-extrabold my-10">
        Bienes<span className=" font-normal">Raices</span>
      </h1>
      <h2 className=" text-center text-2xl font-extrabold">
        Recuperar contraseña
      </h2>

      <div className=" mt-8 mx-auto max-w-md">
        <div className=" bg-white py-8 px-4 shadow rounded-lg">
          <RecoverPasswordForm />
          <NavBtn
            enlaces={["/login", "/registro"]}
            textos={[
              "¿Ya tienes cuenta? Inicia Sesion",
              "¿No tienes cuenta? Registrate",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordView;
