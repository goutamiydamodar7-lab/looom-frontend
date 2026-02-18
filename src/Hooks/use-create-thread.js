import { useLocation, useNavigate } from "react-router-dom";

export const useCreateThread = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const open = location.pathname === "/create";
  const openDialog = () => {
    navigate("/create");
  };
  const closeDialog = () => {
    navigate(-1);
  };
  return { open, openDialog, closeDialog };
};
