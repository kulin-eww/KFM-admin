import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAnchorElId } from "../../redux/slices/uiSlice";
import useAppSelector from "../../hooks/useAppSelector";
import { EyeIcon, LogoutIcon, PencilIcon, TrashIcon } from "../../components/common/icons";
import { useState } from "react";
import LogoutModal from "../../components/modal/LogoutModal";
import { UserIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface ProfileMenuProps {
  setOpenLogoutModal: (open: boolean) => void;
}

const ProfileMenu = ({ setOpenLogoutModal }: ProfileMenuProps) => {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { anchorElId } = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(setAnchorElId(null));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const menuItems = [
    {
      icon: UserIcon,
      label: t("header.profile"),
      onClick: () => {
        navigate("/profile");
        handleClose();
      },
    },
    {
      icon: LogoutIcon,
      label: t("header.logout"),
      onClick: () => {
        setOpenLogoutModal(true);
        handleClose();
      },
    },
  ];

  if (anchorElId !== "account-menu") return null;

  return (
    <>
      {anchorElId === "account-menu" && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={handleBackdropClick} />

          {/* Menu */}
          <div className="absolute right-0 rtl:left-0 rtl:right-auto top-full mt-2 z-50 w-48">
            <div className="bg-white rounded-lg border p-2 border-gray-300 shadow-lg overflow-hidden">
              {menuItems.map((item, index) => (
                <div key={item.label}>
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 cursor-pointer px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
                  >
                    <item.icon className="h-5 w-5 text-[#007a47]" />
                    <span className="text-text-tertiary text-[16px] font-medium">{item.label}</span>
                  </button>
                  {index < menuItems.length - 1 && <div className="border-t border-gray-200" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileMenu;
