import { useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import NavBtn from "../components/NavBtn";

const RegiserView = () => {
  useEffect(() => {
    document.title = "Bienes Raices | Crear Cuenta";
  }, []);

  return (
    <div className=" py-10">
      <h1 className=" text-center text-4xl font-extrabold my-10">
        Bienes<span className=" font-normal">Raices</span>
      </h1>
      <h2 className=" text-center text-2xl font-extrabold">Crear Cuenta</h2>

      <div className=" mt-8 mx-auto max-w-md mb-[200px]">
        <div className=" bg-white py-8 px-4 shadow rounded-lg">
          <RegisterForm />
          <NavBtn
            enlaces={["/login", "/recuperar_contraseña"]}
            textos={[
              "¿Ya tienes cuenta? Inicia Sesion",
              "Olvide mi Contraseña",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RegiserView;
