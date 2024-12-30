import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-indigo-600 p-4">
      <div className=" container mx-auto flex justify-between items-center">
        <h1 className=" text-2xl text-white font-extrabold text-center">
          Bienes<span className=" font-normal">Raices</span>
        </h1>

        <nav className=" my-5 text-sm md:flex md:gap-3 md:items-center font-bold text-white hidden">
          <Link to={"/"}>Mis Propiedades</Link>
          <Link to={"/"}>Mi Perfil</Link>
          <Link className=" bg-indigo-800 py-2 px-10 rounded-lg" to={"/"}>
            Cerrar Sesion
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
