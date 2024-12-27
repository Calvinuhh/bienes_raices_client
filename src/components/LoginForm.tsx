const LoginForm = () => {
  return (
    <form className=" space-y-5">
      <label
        htmlFor="email"
        className=" block text-sm uppercase text-gray-600 mb-3 font-bold"
      >
        Email
      </label>
      <input
        name="email"
        type="email"
        id="email"
        className=" w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
        placeholder="Tu Email"
      />

      <label
        htmlFor="password"
        className=" block text-sm uppercase text-gray-600 mb-3 font-bold"
      >
        Contraseña
      </label>
      <input
        name="password"
        type="password"
        id="password"
        className=" w-full py-2 px-3 border border-gray-300 rounded-lg placeholder-gray-400"
        placeholder="Tu contraseña"
      />

      <input
        className=" w-full rounded-lg py-3 shadow-2xl text-white font-bold cursor-pointer bg-indigo-600 transition-all duration-[.8s] ease-out hover:bg-indigo-800 hover:scale-105  "
        type="submit"
        value="Iniciar Sesion"
      />
    </form>
  );
};

export default LoginForm;
