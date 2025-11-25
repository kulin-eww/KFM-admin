import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const TableMenu = ({ anchorElId, setAnchorElId, menuId, menuItems }) => {
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

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
          left: rect.right - 192, // 192px is the width of the menu (w-48 = 12rem = 192px)
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
        <div className="bg-white rounded-lg border p-2 border-gray-300 shadow-lg overflow-hidden">
          {menuItems?.map((item, index) => (
            <div key={item.label}>
              <button
                onClick={item.onClick}
                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
              >
                <item.icon className="h-5 w-5 text-[#007a47]" />
                <span className="text-text-tertiary text-[16px] font-medium">{item.label}</span>
              </button>
              {index < menuItems?.length - 1 && <div className="border-t border-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </>,
    document.body
  );
};

export default TableMenu;
