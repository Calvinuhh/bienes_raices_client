import { Link } from "react-router-dom";

interface NavBtnProps {
  enlaces: string[];
  textos: string[];
}

const NavBtn = ({ enlaces, textos }: NavBtnProps) => {
  return (
    <div className=" mt-[20px] flex items-center justify-between">
      <Link
        className=" text-gray-500 text-sm transition-all ease-linear duration-100 hover:scale-[1.05] "
        to={enlaces[0]}
      >
        {textos[0]}
      </Link>
      <Link
        className=" text-gray-500 text-sm transition-all ease-linear duration-100 hover:scale-[1.05]"
        to={enlaces[1]}
      >
        {textos[1]}
      </Link>
    </div>
  );
};

export default NavBtn;
