import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../../components/modal/LogoutModal";
import SidebarNavItem from "./SidebarNavItem";
import { useDispatch } from "react-redux";
import { setAnchorElId } from "../../redux/slices/uiSlice";
import useAppSelector from "../../hooks/useAppSelector";
import KfmNamedLogo from "../../assets/icons/common/kfm-nammed-logo.svg";
import {
  AboutUsIcon,
  ContainerIcon,
  DashboardIcon,
  DriverIcon,
  EarningsIcon,
  FAQIcon,
  PrivacyPolicyIcon,
  ReportsIcon,
  TermsAndConditionIcon,
  LogoutIcon,
  MyBookingsIcon,
  PenaltyIcon,
  EarlyPickupIcon,
  ZoneIcon,
} from "../../components/common/icons";
import { useTranslation } from "react-i18next";
import { GiTabletopPlayers } from "react-icons/gi";
import { RiGamepadLine, RiNumber1 } from "react-icons/ri";
import { TbDeviceGamepad3 } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { TbCircleNumber1 } from "react-icons/tb";
import { LiaUserSecretSolid } from "react-icons/lia";
import { LuMilestone } from "react-icons/lu";
import { RiAdvertisementLine } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdInfoOutline, MdOutlineCategory } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const navigationPaths: any[] = [
    {
      label: t("sidebar.dashboard"),
      path: "/dashboard",
      icon: DashboardIcon,
    },
    // {
    //   label: "Player Management",
    //   path: "/player",
    //   icon: GiTabletopPlayers,
    // },
    // {
    //   label: "Game Category Management",
    //   path: "/container",
    //   icon: RiGamepadLine,
    // },
    // {
    //   label: "Gameplay Package Management",
    //   path: "/operations",
    //   icon: TbDeviceGamepad3,
    // },
    // {
    //   label: "Purchase History of Game Points",
    //   path: "/booking-request",
    //   icon: BiPurchaseTagAlt,
    // },
    // {
    //   label: "Questions and Answer Management",
    //   path: "/earnings",
    //   icon: FaRegCircleQuestion,
    // },
    // {
    //   label: "1000 Point Category questions",
    //   path: "/earnings",
    //   icon: MdOutlineCategory,
    // },
    // {
    //   label: "Mystery wildcard category",
    //   path: "/penalty-payment",
    //   icon: LiaUserSecretSolid,
    // },
    // {
    //   label: "Milestone management",
    //   path: "/reports",
    //   icon: LuMilestone,
    // },
    // {
    //   label: "Sponsor’s Ads management",
    //   path: "/reports",
    //   icon: RiAdvertisementLine,
    // },
    // {
    //   label: "Earning History and Report ",
    //   path: "/reports",
    //   icon: FaRegMoneyBillAlt,
    // },
    {
      label: t("sidebar.faqs"),
      path: "/faq",
      icon: FAQIcon,
    },
    {
      label: "CMS Management",
      icon: MdInfoOutline,
      isDisclosure: true,
      children: [
        {
          label: "Terms and Conditions",
          path: "/terms-conditions",
        },
        {
          label: "Privacy Policy",
          path: "/privacy-policy",
        },
        {
          label: "About Us",
          path: "/about-us",
        },
      ],
    },
  ];

  const isPathActive = (path?: string) => path && location.pathname === path;

  const isSubmenuActive = (sub?: any) => {
    return (sub?.path && isPathActive(sub?.path)) || sub?.submenu?.some((subItem: any) => isPathActive(subItem?.path));
  };

  // Ref for sidebar for outside click
  const sidebarRef = useRef<HTMLDivElement>(null);
  const anchorElId = useAppSelector((state) => state.ui.anchorElId);

  // Helper: is sidebar open in mobile?
  const isSidebarOpen = anchorElId === "mobile-sidebar";

  // Helper: check if current language is RTL
  const isRTL = i18n.language === "ar" || localStorage.getItem("locale") === "ar";

  // Open sidebar handler (for menu icon)
  const dispatch = useDispatch();
  const closeSidebar = () => dispatch(setAnchorElId(null));

  // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line
  }, [location.pathname]);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    if (!isSidebarOpen) return;
    function handleClickOutside(event: MouseEvent) {
      // Prevent closing if click is on the Bars3Icon/menu button
      const menuBtn = document.getElementById("mobile-sidebar");
      if (menuBtn && (menuBtn === event.target || menuBtn.contains(event.target as Node))) {
        return;
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Blur overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed !pointer-events-none inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}
      {/* mobile sidebar */}
      <div className={`relative`}>
        <div
          ref={sidebarRef}
          className={`block px-4 pb-20 py-2 bg-white h-screen overflow-y-auto md:hidden sidebar-scroll fixed top-0 z-50 w-64 transition-transform duration-300 ease-in-out transform pt-4 ${
            isRTL ? "right-0" : "left-0"
          } ${isSidebarOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}`}
        >
          <div
            className="flex items-center justify-start px-2 py-6 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <img src={KfmNamedLogo} className="h-10 ml-1 block" />
          </div>

          {navigationPaths.map(({ icon, label, path, onclick, isDisclosure, children }, index) => (
            <SidebarNavItem
              icon={icon}
              label={label}
              path={path}
              key={index}
              onClick={onclick}
              isDisclosure={isDisclosure}
              children={children}
            />
          ))}

          {/* Logout Button */}
          <div className="mt-auto pt-4 h-12">
            <button
              onClick={() => setOpenLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#E8F5E8] hover:bg-[#D4F0D4] rounded-lg transition-colors duration-200"
            >
              <LogoutIcon className="h-5 w-5 text-black" />
              <span className="text-black font-semibold">{t("sidebar.logout")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* desktop sidebar */}
      <div className="hidden w-[250px] px-2 md:flex md:flex-col bg-white h-screen sticky top-0 left-0">
        <div className="text-4xl flex justify-start items-center py-4 px-2 bg-white shrink-0">
          <img src={KfmNamedLogo} className="h-14 ml-1 block" />
        </div>
        <div className="flex-1 overflow-y-auto sidebar-scroll min-h-0">
          {navigationPaths.map(({ icon, label, path, onclick, isDisclosure, children }, index) => (
            <SidebarNavItem
              icon={icon}
              label={label}
              path={path}
              key={index}
              onClick={onclick}
              isDisclosure={isDisclosure}
              children={children}
            />
          ))}
        </div>

        {/* Logout Button */}
        <div className="pt-4 pb-4 px-2 bg-white shrink-0">
          <button
            onClick={() => setOpenLogoutModal(true)}
            className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 purple-gradient-btn rounded-lg transition-colors duration-200"
          >
            <LogoutIcon className="h-5 w-5 text-white" />
            <span className="text-white text-[16px] font-medium">{t("sidebar.logout")}</span>
          </button>
        </div>
      </div>

      {openLogoutModal && <LogoutModal open={openLogoutModal} setOpen={setOpenLogoutModal} />}
    </>
  );
};

export default Sidebar;
