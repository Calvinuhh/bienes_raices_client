import { Link } from "react-router-dom";

const PropertiesView = () => {
  return (
    <div className=" py-10 ">
      <h1 className=" text-center text-4xl font-extrabold my-10">
        Bienes<span className=" font-normal">Raices</span>
      </h1>
      <h2 className=" text-center text-2xl font-extrabold">Mis Propiedades</h2>

      <Link
        className=" rounded py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-sm text-center font-bold text-white uppercase my-5 inline-block w-full sm:w-auto "
        to="/"
      >
        Publicar Propiedad
      </Link>
    </div>
  );
};

export default PropertiesView;
