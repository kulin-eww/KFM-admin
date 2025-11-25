import React, { useState, useEffect, useRef } from "react";
import KfmNamedLogo from "../../../assets/icons/common/kfm-nammed-logo.svg?react";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageDropdown from "../../dropdown/LanguageDropdown";
import { useTranslation } from "react-i18next";
import { useDeviceOS } from "../../../hooks/useDeviceOs";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const os = useDeviceOS();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // Default to home
  const [displayedActiveSection, setDisplayedActiveSection] = useState("home"); // For display with delay
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get current language
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  // Helper function to add lang parameter to URLs
  const addLangParam = (href: string) => {
    // Don't add lang parameter for signin page
    if (href === "/signin" || href.startsWith("/signin")) {
      return href;
    }
    if (href.startsWith("#")) {
      // For hash links, format as /?lang=ar#section
      const hash = href.substring(1);
      return `/?lang=${currentLang}#${hash}`;
    } else if (href === "/") {
      // For home page, add lang parameter
      return `/?lang=${currentLang}`;
    } else {
      // For regular paths, add lang parameter
      return `${href}?lang=${currentLang}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first with lang parameter
    if (location.pathname !== "/") {
      navigate(`/?lang=${currentLang}#${sectionId}`);
      // Wait for navigation and page load, then scroll to section
      // Use a longer timeout to ensure DOM is ready
      const attemptScroll = (retries = 5) => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100; // offset
            window.scrollTo({
              top: y,
              behavior: "smooth",
            });

            // Set active section immediately for better UX
            setActiveSection(sectionId);
            updateDisplayedSection(sectionId);
          } else if (retries > 0) {
            // Retry if element not found yet
            attemptScroll(retries - 1);
          }
        }, 150);
      };
      attemptScroll();
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100; // offset
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });

        // Set active section immediately for better UX
        setActiveSection(sectionId);
        updateDisplayedSection(sectionId);
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Handle scroll to top/hero section
  const scrollToTop = () => {
    // If we're not on the home page, navigate to home first with lang parameter
    if (location.pathname !== "/") {
      navigate(`/?lang=${currentLang}`);
      // Wait for navigation, then scroll to top
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setActiveSection("hero");
        updateDisplayedSection("hero");
      }, 100);
    } else {
      // On home page, scroll to top directly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveSection("hero");
      updateDisplayedSection("hero");
    }
  };

  // Debounced function to update displayed active section
  const updateDisplayedSection = (sectionId: string) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setDisplayedActiveSection(sectionId);
    }, 200); // 300ms delay
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "home",
        "who-we-are",
        "download",
        "why-jlb",
        "services",
        "call-to-action",
        "contact-us",
        "faq",
      ];
      const scrollPosition = window.scrollY + 150; // Offset for header height

      // Check if we're at the very top (hero section)
      if (scrollPosition < 200) {
        setActiveSection("hero");
        updateDisplayedSection("hero");
        return;
      }

      // Check all sections in order
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // Use a more generous range for section detection
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(sectionId);
            updateDisplayedSection(sectionId);
            break;
          }
        }
      }
    };

    // Call handleScroll immediately to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const navigationItems = [
    { id: "home", label: t("home.header.navigation.home") },
    { id: "who-we-are", label: t("home.header.navigation.whoWeAre") },
    { id: "why-jlb", label: t("home.header.navigation.whyChooseUs") },
    { id: "services", label: t("home.header.navigation.services") },
    { id: "contact-us", label: t("home.header.navigation.contact") },
    { id: "download", label: t("home.header.navigation.download") },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-bg-secondary">
      <div className="bg-primary text-white">
        <div className="max-w-[84rem] mx-auto px-4 py-3">
          <div className="flex md:flex-row flex-col items-center justify-between md:gap-3 md:text-base/normal text-sm/4 font-medium">
            <p>{t("home.header.welcomeTo")}</p>
            <div className="ms-auto">
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-[0px_4px_30px_-2px_#0000000A]  rounded-b-[50px] overflow-hidden">
        <div className="max-w-[84rem] mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold text-[#007A47]">
            <KfmNamedLogo
              className="md:h-17.5 h-15 w-full cursor-pointer"
              onClick={() => navigate(`/?lang=${currentLang}`)}
              title="Click to go to top"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex xl:space-x-12 lg:space-x-8 space-x-4">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={addLangParam(`#${item.id}`)}
                onClick={(e) => {
                  if (item.id === "download") {
                    e.preventDefault();
                    if (os === "android" || os === "windows") {
                      window.open("https://play.google.com", "_blank");
                    } else {
                      window.open("https://apps.apple.com", "_blank");
                    }
                  } else if (item.id === "home") {
                    e.preventDefault();
                    scrollToTop();
                  } else {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }
                }}
                className={`relative font-lg text-secondary hover:text-primary transition-colors duration-300 py-1 ${
                  displayedActiveSection === item.id || (item.id === "home" && displayedActiveSection === "hero")
                    ? "!text-primary font-bold"
                    : "font-medium"
                }`}
              >
                {item.label}
                {/* Active underline with SVG */}
                {(displayedActiveSection === item.id || (item.id === "home" && displayedActiveSection === "hero")) && (
                  <div className="absolute bottom-0 end-0 w-it flex justify-end">
                    <svg
                      className="w-9 object-contain"
                      width="43"
                      height="7"
                      viewBox="0 0 43 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 5.00008C12 -0.999926 28.5 3.50007 41 5.00008"
                        stroke="#007A47"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                )}
                {/* Hover underline */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#007A47] transform scale-x-0 hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="md:block hidden md:ms-0 ms-5">
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="group flex lg:gap-3 md:gap-2 gap-1 items-center justify-center cursor-pointer md:text-lg/tight text-sm/tight font-semibold text-white lg:px-7 md:px-5 px-3 md:py-3.5 py-2.5 rounded-full bg-primary shadow-[0px_10.49px_23.6px_-2.62px_#FFFFFF80_inset]
"
            >
              {t("home.header.vendorLogin")}
              <svg
                className="md:w-4.5 w-4 md:h-4.5 h-4 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 ease-in-out rtl:-scale-x-100"
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.488 1.09308C14.872 0.709043 15.4947 0.709043 15.8787 1.09308L22.9049 8.11924C23.3913 8.60569 23.3913 9.39439 22.9049 9.88084L15.8787 16.907C15.4947 17.291 14.872 17.291 14.488 16.907C14.1039 16.523 14.1039 15.9003 14.488 15.5163L20.0208 9.98344H1.41577C0.872656 9.98344 0.432373 9.54316 0.432373 9.00004C0.432373 8.45692 0.872656 8.01664 1.41577 8.01664H20.0208L14.488 2.48382C14.1039 2.09978 14.1039 1.47713 14.488 1.09308Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            <svg className="w-6 h-6 text-[#363636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-3 border-t border-gray-200 transition-transform duration-300 ease-in-out">
            <nav className="flex flex-col space-y-1.5 pt-3 px-4">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={addLangParam(`#${item.id}`)}
                  onClick={(e) => {
                    if (item.id === "download") {
                      e.preventDefault();
                      if (os === "ios" || os === "macos") {
                        window.open("https://apps.apple.com", "_blank");
                      } else if (os === "android" || os === "windows") {
                        window.open("https://play.google.com", "_blank");
                      } else {
                        window.open("https://apps.apple.com", "_blank");
                      }
                    } else if (item.id === "home") {
                      e.preventDefault();
                      scrollToTop();
                    } else {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }
                  }}
                  className={`relative text-sm/tight text-secondary  hover:text-[#007A47] font-medium transition-colors py-2 px-2 rounded ${
                    displayedActiveSection === item.id || (item.id === "home" && displayedActiveSection === "hero")
                      ? "text-[#007A47] bg-green-50 border-s-4 border-[#007A47] ps-3"
                      : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  navigate("/signin");
                }}
                className="group flex lg:gap-3 md:gap-2 gap-1.5 items-center justify-center cursor-pointer md:text-base/tight text-sm/tight font-semibold text-white lg:px-7 md:px-5 px-3 md:py-3.5 py-2.5 rounded-full bg-primary shadow-[0px_10.49px_23.6px_-2.62px_#FFFFFF80_inset]
"
              >
                {t("home.header.vendorLogin")}
                <svg
                  className="md:w-4.5 w-4 md:h-4.5 h-4 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 ease-in-out rtl:-scale-x-100"
                  width="24"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.488 1.09308C14.872 0.709043 15.4947 0.709043 15.8787 1.09308L22.9049 8.11924C23.3913 8.60569 23.3913 9.39439 22.9049 9.88084L15.8787 16.907C15.4947 17.291 14.872 17.291 14.488 16.907C14.1039 16.523 14.1039 15.9003 14.488 15.5163L20.0208 9.98344H1.41577C0.872656 9.98344 0.432373 9.54316 0.432373 9.00004C0.432373 8.45692 0.872656 8.01664 1.41577 8.01664H20.0208L14.488 2.48382C14.1039 2.09978 14.1039 1.47713 14.488 1.09308Z"
                    fill="white"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Top Bar */}
    </header>
  );
};

export default Header;
