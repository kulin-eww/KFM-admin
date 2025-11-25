import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { LogoutIcon } from "../common/icons";
import useToast from "../../hooks/useToast";
import { logoutAPI } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface modalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LogoutModal: React.FC<modalProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: (res) => {
      useToast(res.message);
      setOpen(false);
      navigate("/signin");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 " onClick={handleBackdropClick}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6  border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-hover-green rounded-full">
              <LogoutIcon className="h-5 w-5 text-text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{t("sidebar.logout")}</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-gray-600 text-base leading-relaxed mb-6">{t("auth.logout.logoutWarningMessage")}</p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* <button
              onClick={() => setOpen(false)}
              className="cursor-pointer flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button> */}
            <Button onClick={() => setOpen(false)} variant="cancel" fullWidth>
              {t("common.Cancel")}
            </Button>
            {/* <button
              onClick={() => mutate()}
              className="cursor-pointer flex-1 px-4 py-3 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Logout
            </button> */}
            <Button onClick={() => mutate()} variant="contained" fullWidth loading={isPending}>
              {t("sidebar.logout")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
