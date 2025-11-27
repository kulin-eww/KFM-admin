import ProfileMenu from "./ProfileMenu";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  setAnchorElId,
  setNotificationOpen,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../redux/slices/uiSlice";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SearchIcon, NotificationIcon } from "../../components/common/icons";
import NotificationPopup from "../../components/common/NotificationPopup";
import LanguageToggle from "../../components/common/LanguageToggle";
import { setGlobalSearch } from "../../redux/slices/searchSlice";
import useDebounce from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LogoutModal from "../../components/modal/LogoutModal";
import { useQuery } from "@tanstack/react-query";
import { getNotificationsListAPI } from "../../api/dashboard";
import useToast from "../../hooks/useToast";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { anchorElId, isNotificationOpen } = useAppSelector((state) => state.ui);
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const adminDetails = useSelector((state: any) => state?.admin?.adminDetails);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  // List of routes where search should be displayed
  const listRoutes = ["/player", "/faq"];

  // Check if current route is a list route (exact match and doesn't have detail/add/edit/view)
  const isListRoute = listRoutes.some((route) => {
    if (location.pathname === route) return true;
    // Exclude detail/add/edit/view pages
    if (
      location.pathname.startsWith(route + "/") &&
      !location.pathname.includes("/detail") &&
      !location.pathname.includes("/add") &&
      !location.pathname.includes("/edit") &&
      !location.pathname.includes("/view")
    ) {
      return true;
    }
    return false;
  });

  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng);
  //   document.body.dir = lng === "ar" ? "rtl" : "ltr";
  // };

  // Set anchor id in Redux only
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorElId) {
      dispatch(setAnchorElId(null));
      return;
    }
    if (event.currentTarget.id) {
      dispatch(setAnchorElId(event.currentTarget.id));
    }
  };

  // Notification handlers
  const handleNotificationClick = () => {
    dispatch(setNotificationOpen(!isNotificationOpen));
  };

  const handleNotificationClose = () => {
    dispatch(setNotificationOpen(false));
  };

  const handleMarkAsRead = (id: string) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  // const unreadCount = notifications.filter((n) => !n.isRead).length;

  const isDashboard = window.location.pathname === "/dashboard";

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["getNotificationsList"],
    queryFn: () => {
      // setIsLoading(true);
      return getNotificationsListAPI({ filter: "all" });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setUnreadCount(data?.data?.total_unread_count);
      setNotifications(data?.data?.notificationList);
    } else if (isError) {
      useToast(error.message, "error");
    }
  }, [data, isSuccess, isError]);

  return (
    <div className="flex justify-between items-center bg-white pl-4 pr-6 py-4 sticky z-10">
      {/* Mobile Hamburger Menu - Only on mobile */}
      <div className="flex ml-5 md:hidden items-center">
        <div className="block z-51" onClick={handleClick} id="mobile-sidebar">
          <Bars3Icon className="h-6 cursor-pointer" />
        </div>
      </div>

      {/* Left Section - Greeting and Location */}
      {isDashboard && (
        <>
          <div className="hidden md:flex  items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-black text-base">{t("header.hello")}</span>
                <span className="text-purple text-base font-medium">{adminDetails?.full_name || "Admin"}</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-gray-600 text-sm">{adminDetails?.email}</span>
                {/* <ChevronDownIcon className="h-4 w-4 text-[#007a47]" /> */}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Center Section - Search Bar - Only show on list routes */}
      <div className="flex-1 max-w-md hidden md:block mx-8 md:mx-2">
        {isListRoute && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("header.searchPlaceholder")}
              value={globalSearch}
              onChange={(e) => dispatch(setGlobalSearch(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C3DC78] focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <div
            className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors relative"
            onClick={handleNotificationClick}
          >
            <NotificationIcon className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center text-[10px] font-medium">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>

          <NotificationPopup
            isOpen={isNotificationOpen}
            onClose={handleNotificationClose}
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <div
            id="account-menu"
            onClick={handleClick}
            className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <UserCircleIcon className="h-5 w-5 text-gray-600" />
          </div>

          <ProfileMenu setOpenLogoutModal={setOpenLogoutModal} />
        </div>
      </div>

      {openLogoutModal && <LogoutModal open={openLogoutModal} setOpen={setOpenLogoutModal} />}
    </div>
  );
};

export default Header;
