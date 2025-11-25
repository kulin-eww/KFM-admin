import React from "react";
import { CrossIcon } from "./icons";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: any;
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleNotificationClick = (notification: any) => {
    // Mark notification as read
    onMarkAsRead(notification?.id);
    
    // Handle navigation based on navigation_type
    if (notification?.data?.navigation_type === "booking_details" && notification?.data?.booking_id) {
      navigate(`/all-booking/detail?id=${notification.data.booking_id}`);
      onClose();
    }
  };
  
  if (!isOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Popup */}
      <div className="absolute right-0 rtl:left-0 rtl:right-auto top-full mt-2 w-60 sm:w-72 md:w-90 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto px-1">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">{t("notification.notification")}</h3>
          <div className="flex items-center gap-3">
            {notifications?.length > 0 && (
              <div
                onClick={onMarkAllAsRead}
                className="text-sm text-green-600 hover:text-green-800 font-medium cursor-pointer"
              >
                {t("notification.clearAll")}
              </div>
            )}
            <div className="w-px h-4 bg-gray-300"></div>
            <IconButton
              onClick={() => {
                onClose();
              }}
              edge="end"
              className="cursor-pointer"
            >
              <CrossIcon />
            </IconButton>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80">
          {notifications?.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>{t("notification.noNotifications")}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification: any) => (
                <div
                  key={notification?.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    handleNotificationClick(notification);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 mb-1">{notification?.title}</p>
                      <p className="text-sm text-gray-500">{notification?.message}</p>
                    </div>
                    <p className="text-xs text-gray-400 ml-4 flex-shrink-0">
                      {notification?.created_at?.split("T")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPopup;
