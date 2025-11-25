import { toast } from "react-toastify";

const useToast = (message: string, type: "error" | "warning" | "success" | "info" = "success") => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "bg-[#C3DC78]/95 text-white font-gilroy-medium rounded-[15px]",
  });
};

export default useToast;
