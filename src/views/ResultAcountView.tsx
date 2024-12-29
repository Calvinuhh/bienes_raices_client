import { useNavigate } from "react-router-dom";
import ConfirmationMessage from "../components/ConfirmationMessage";
import ErrorConfirmationMessage from "../components/ErrorConfirmationMessage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResultAcountView = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [countdown, setCountdown] = useState(5);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const { data } = await axios(
            `${import.meta.env.VITE_SERVER_URL}/auth/confirmacion/${token}`
          );

          setIsValidToken(true);

          await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}/auth/borrar_token`,
            { token: data }
          );
        } catch (error) {
          setIsValidToken(false);
        }
      } else {
        setIsValidToken(false);
      }

      setLoading(false);
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      if (isValidToken) {
        navigate("/login");
      } else {
        navigate("/registro");
      }
    }

    return () => clearInterval(timer);
  }, [countdown, isValidToken, navigate]);

  if (loading) {
    return (
      <div className=" py-10 mt-10">
        <h1 className=" text-center text-4xl font-extrabold my-10">
          Bienes<span className=" font-normal">Raices</span>
        </h1>
        <p className="text-center mt-[70px] text-xl font-semibold">
          Verificando token...
        </p>
      </div>
    );
  }

  return (
    <div className=" py-10 mt-10">
      <h1 className=" text-center text-4xl font-extrabold my-10">
        Bienes<span className=" font-normal">Raices</span>
      </h1>
      <div className=" mt-[150px]">
        {isValidToken === true ? (
          <div className=" flex bg-green-400 w-[800px] mx-auto h-48 rounded-2xl shadow-2xl p-5 items-center ">
            <ConfirmationMessage />
          </div>
        ) : isValidToken === false ? (
          <div className=" flex bg-red-400 w-[800px] mx-auto h-48 rounded-2xl shadow-2xl p-5 items-center ">
            <ErrorConfirmationMessage />
          </div>
        ) : null}
      </div>
      <p className="text-center mt-[70px] text-xl font-semibold">
        Redireccionando en {countdown}...
      </p>
    </div>
  );
};

export default ResultAcountView;
