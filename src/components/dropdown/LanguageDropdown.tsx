import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const langParam = searchParams.get("lang");
  const [currentLanguage, setCurrentLanguage] = useState(langParam || "en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", nativeName: "English", dir: "ltr" },
    { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  ];

  const handleLanguageSelect = (languageCode) => {
    setCurrentLanguage(languageCode);
    setIsOpen(false);

    // Match the logic from LanguageToggle.tsx
    setSearchParams({ lang: languageCode });
    document.documentElement.dir = languageCode === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(languageCode);
    window.location.reload();
  };

  useEffect(() => {
    if (langParam) {
      i18n.changeLanguage(langParam);
    }
  }, []);

  // Set initial direction when component mounts
  useEffect(() => {
    const savedLocale = langParam || "en";
    document.documentElement.dir = savedLocale === "ar" ? "rtl" : "ltr";
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const otherLanguages = languages.filter((lang) => lang.code !== currentLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        className="flex items-center xl:gap-2.5 gap-1 cursor-pointer w-fit bg-transparent relative"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span
          className="selected-language font-bold text-white sm:text-sm text-xs relative block select-none"
          id="toggle-label"
        >
          {langParam == "ar" ? "العربية" : "English"}
        </span>
        <span
          className={`down-arrow transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg
            className="md:w-3 w-2.5"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </label>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full end-0 mt-1 lg:shadow-[0px_0px_24px_-4px_#C1D5DB66] bg-[#e9e6e6] border border-[#FAF7F8] rounded-xl z-50 min-w-[120px]">
          {otherLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className="w-full px-3 py-2 text-start text-[#676767] transition-colors duration-150 text-md font-bold cursor-pointer"
            >
              {language.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
