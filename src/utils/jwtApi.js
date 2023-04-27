import axios from "axios";
import { useSelector } from "react-redux";

const useJwtApi = () => {
  const token =
    useSelector((state) => state.token) || sessionStorage.getItem("token");
  const jwtApi = axios.create({
    baseURL: "https://winejet-uz.herokuapp.com/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return { jwtApi };
};

export default useJwtApi;
