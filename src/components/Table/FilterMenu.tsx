import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import i18n from "../../utils/i18n";

const FilterMenu = ({ anchorElId, setAnchorElId, menuId, render }) => {
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const isRTL = i18n.language === "ar" || localStorage.getItem("locale") === "ar";
  const handleClose = () => {
    setAnchorElId(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (anchorElId === menuId) {
      const button = document.getElementById(menuId);
      if (button) {
        const rect = button.getBoundingClientRect();
        setButtonPosition({
          top: rect.bottom + window.scrollY,
          left: isRTL ? rect.left : rect.right - 192, // 192px is the width of the menu (w-48 = 12rem = 192px)
        });
      }
    }
  }, [anchorElId, menuId]);

  if (anchorElId !== menuId) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={handleBackdropClick} />

      {/* Menu */}
      <div
        className="fixed z-50 w-48"
        style={{
          top: `${buttonPosition.top}px`,
          left: `${buttonPosition.left}px`,
        }}
      >
        <div className="bg-white rounded-lg border  border-gray-300 shadow-lg overflow-y-auto">{render}</div>
      </div>
    </>,
    document.body
  );
};

export default FilterMenu;
