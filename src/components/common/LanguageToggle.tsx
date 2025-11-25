import { useTranslation } from "react-i18next";
import { LanguageFlagAr, LanguageFlagEn } from "./icons";
import { useMutation } from "@tanstack/react-query";
import { languageAPI } from "../../api/common";
import useToast from "../../hooks/useToast";

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: languageAPI,
    onSuccess: (res) => {
      window.location.reload();
      // useToast(res.message);
    },
    onError: (error) => {
      window.location.reload();
      useToast(error.message, "error");
    },
  });

  const handleLanguageToggle = (lang: any) => {
    localStorage.setItem("locale", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(lang === "ar" ? "en" : "ar");
    mutate({ language: lang });
  };

  return (
    <label className="flex items-center xl:gap-2 gap-1 cursor-pointer w-fit bg-[#F4F2F080] border border-[#EDEDED] rounded-2xl px-3 py-2.5">
      {localStorage.getItem("locale") == "ar" ? <LanguageFlagEn /> : <LanguageFlagAr />}
      <input
        type="checkbox"
        id="lang-toggle"
        className="sr-only peer"
        onClick={() => handleLanguageToggle(localStorage.getItem("locale") === "ar" ? "en" : "ar")}
      />
      <span
        className="selected-language font-semibold font-grift text-gray-950 sm:text-sm text-xs relative"
        id="toggle-label"
      >
        {localStorage.getItem("locale") == "ar" ? "English" : "العربية"}
      </span>
    </label>
  );
};

export default LanguageToggle;
