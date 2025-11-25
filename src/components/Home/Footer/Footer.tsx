import { useNavigate, useLocation } from "react-router-dom";
import JLBLogo from "../../../assets/icons/common/kfm-logo.svg?react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

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

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  // Handle scroll to hero section (top of page)
  const scrollToHero = () => {
    if (isHomePage) {
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const y = heroElement.getBoundingClientRect().top + window.scrollY - 100; // offset
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      } else {
        // Fallback to top if hero element not found
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else {
      // Navigate to home first with lang parameter
      navigate(`/?lang=${currentLang}`);
      // Wait for navigation, then scroll to hero section
      const attemptScroll = (retries = 5) => {
        setTimeout(() => {
          const heroElement = document.getElementById("hero");
          if (heroElement) {
            const y = heroElement.getBoundingClientRect().top + window.scrollY - 100; // offset
            window.scrollTo({
              top: y,
              behavior: "smooth",
            });
          } else if (retries > 0) {
            // Retry if element not found yet
            attemptScroll(retries - 1);
          } else {
            // Fallback to top if hero element not found
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        }, 150);
      };
      attemptScroll();
    }
  };

  // Handle navigation for hash links
  const handleHashLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      // If we're on the home page, scroll to the section
      if (isHomePage) {
        const sectionId = href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // If we're on a different page, navigate to home with lang parameter first
        navigate(`/?lang=${currentLang}`);
        // Then update hash and scroll after navigation completes
        setTimeout(() => {
          window.location.hash = href;
          // The useEffect in Home component will handle scrolling
          // But also scroll here as a backup
          const sectionId = href.substring(1);
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    } else if (href === "/") {
      // Handle home link - scroll to hero section
      scrollToHero();
    } else {
      // Regular navigation for non-hash links with lang parameter
      navigate(addLangParam(href));
    }
  };

  // Footer navigation data
  const footerLinks = {
    about: [
      { label: t("home.footer.home"), href: "/" },
      { label: t("home.footer.whyChooseUs"), href: "#why-jlb" },
      { label: t("home.footer.services"), href: "#services" },
    ],
    help: [
      { label: t("home.footer.helpLinks.faqs"), href: "#faq" },
      { label: t("home.footer.helpLinks.contactUs"), href: "#contact-us" },
    ],
    legal: [
      { label: t("home.footer.privacyPolicy"), href: `/privacy` },
      { label: t("home.footer.termsAndConditions"), href: `/terms` },
      { label: t("home.footer.aboutUs"), href: `/about` },
    ],
  };

  // Add lang parameter to all hrefs
  const footerLinksWithLang = {
    about: footerLinks.about.map((link) => ({
      ...link,
      href: addLangParam(link.href),
    })),
    help: footerLinks.help.map((link) => ({
      ...link,
      href: addLangParam(link.href),
    })),
    legal: footerLinks.legal.map((link) => ({
      ...link,
      href: addLangParam(link.href),
    })),
  };

  // Social media links
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com",
      icon: (
        <path
          className="group-hover:fill-white"
          d="M25.3984 12.6887C25.3984 5.89518 19.8912 0.387939 13.0977 0.387939C6.30412 0.387939 0.796875 5.89518 0.796875 12.6887C0.796875 18.8283 5.29507 23.9173 11.1757 24.8401V16.2444H8.05241V12.6887H11.1757V9.9787C11.1757 6.89582 13.0121 5.19293 15.8218 5.19293C17.1672 5.19293 18.5753 5.43318 18.5753 5.43318V8.46033H17.0243C15.4963 8.46033 15.0197 9.40859 15.0197 10.3823V12.6887H18.4312L17.8858 16.2444H15.0197V24.8401C20.9002 23.9173 25.3984 18.8283 25.3984 12.6887Z"
          fill="#007A47"
        />
      ),
    },
    {
      name: "Twitter",
      href: "https://www.x.com",
      icon: (
        <path
          className="group-hover:fill-white"
          d="M8.20376 22.6829C17.4851 22.6829 22.563 14.9915 22.563 8.32363C22.563 8.1074 22.5582 7.88637 22.5486 7.67015C23.5364 6.95578 24.3889 6.07094 25.0659 5.05719C24.1459 5.4665 23.1692 5.73382 22.169 5.85002C23.2221 5.21875 24.0106 4.22707 24.3884 3.05879C23.3977 3.64594 22.3142 4.06012 21.1844 4.28359C20.4232 3.47476 19.4168 2.93922 18.3207 2.75977C17.2246 2.58031 16.0999 2.76694 15.1205 3.2908C14.1411 3.81465 13.3615 4.64656 12.9023 5.65789C12.4432 6.66923 12.3299 7.80367 12.5801 8.88581C10.5741 8.78514 8.61151 8.26401 6.81974 7.35621C5.02797 6.4484 3.44698 5.17419 2.17926 3.61617C1.53493 4.72706 1.33777 6.04161 1.62784 7.29265C1.9179 8.54368 2.67343 9.63734 3.74088 10.3513C2.93951 10.3259 2.15569 10.1101 1.45418 9.72188V9.78434C1.45347 10.9501 1.85649 12.0802 2.59476 12.9825C3.33302 13.8847 4.36096 14.5034 5.50383 14.7335C4.76148 14.9366 3.98236 14.9662 3.22675 14.82C3.54924 15.8226 4.1767 16.6995 5.02156 17.3283C5.86642 17.9571 6.88651 18.3065 7.93948 18.3276C6.15185 19.7318 3.9436 20.4935 1.67041 20.4899C1.26728 20.4893 0.86454 20.4645 0.464355 20.4159C2.77368 21.8974 5.46004 22.6843 8.20376 22.6829Z"
          fill="#007A47"
        />
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com",
      icon: (
        <>
          <path
            className="group-hover:fill-white"
            d="M12.4331 2.60231C15.7197 2.60231 16.1089 2.61672 17.4015 2.67438C18.6027 2.72724 19.2514 2.92905 19.6838 3.09722C20.2556 3.31825 20.6689 3.58733 21.0965 4.01498C21.529 4.44743 21.7932 4.85585 22.0143 5.42764C22.1824 5.86009 22.3843 6.51357 22.4371 7.71002C22.4948 9.00736 22.5092 9.39657 22.5092 12.6784C22.5092 15.965 22.4948 16.3542 22.4371 17.6467C22.3843 18.848 22.1824 19.4967 22.0143 19.9291C21.7932 20.5009 21.5242 20.9141 21.0965 21.3418C20.6641 21.7742 20.2556 22.0385 19.6838 22.2595C19.2514 22.4277 18.5979 22.6295 17.4015 22.6824C16.1041 22.74 15.7149 22.7544 12.4331 22.7544C9.14649 22.7544 8.75729 22.74 7.46475 22.6824C6.2635 22.6295 5.61482 22.4277 5.18237 22.2595C4.61058 22.0385 4.19735 21.7694 3.7697 21.3418C3.33726 20.9093 3.07298 20.5009 2.85195 19.9291C2.68378 19.4967 2.48197 18.8432 2.42911 17.6467C2.37145 16.3494 2.35704 15.9602 2.35704 12.6784C2.35704 9.39176 2.37145 9.00256 2.42911 7.71002C2.48197 6.50877 2.68378 5.86009 2.85195 5.42764C3.07298 4.85585 3.34206 4.44262 3.7697 4.01498C4.20215 3.58253 4.61058 3.31825 5.18237 3.09722C5.61482 2.92905 6.2683 2.72724 7.46475 2.67438C8.75729 2.61672 9.14649 2.60231 12.4331 2.60231ZM12.4331 0.387207C9.09364 0.387207 8.6756 0.401622 7.36384 0.459282C6.05688 0.516942 5.15835 0.728361 4.37994 1.03108C3.56789 1.34821 2.88078 1.76624 2.19847 2.45335C1.51136 3.13566 1.09332 3.82278 0.776193 4.63002C0.473479 5.41323 0.262059 6.30696 0.204399 7.61392C0.146739 8.93048 0.132324 9.34852 0.132324 12.688C0.132324 16.0275 0.146739 16.4455 0.204399 17.7573C0.262059 19.0642 0.473479 19.9627 0.776193 20.7412C1.09332 21.5532 1.51136 22.2403 2.19847 22.9226C2.88078 23.6049 3.56789 24.0278 4.37513 24.3401C5.15835 24.6428 6.05208 24.8542 7.35904 24.9119C8.6708 24.9696 9.08883 24.984 12.4283 24.984C15.7678 24.984 16.1858 24.9696 17.4976 24.9119C18.8045 24.8542 19.7031 24.6428 20.4815 24.3401C21.2887 24.0278 21.9758 23.6049 22.6581 22.9226C23.3404 22.2403 23.7633 21.5532 24.0756 20.746C24.3783 19.9627 24.5897 19.069 24.6474 17.7621C24.7051 16.4503 24.7195 16.0323 24.7195 12.6928C24.7195 9.35332 24.7051 8.93529 24.6474 7.62353C24.5897 6.31657 24.3783 5.41803 24.0756 4.63963C23.7729 3.82278 23.3549 3.13566 22.6677 2.45335C21.9854 1.77105 21.2983 1.34821 20.4911 1.03588C19.7079 0.733167 18.8141 0.521747 17.5072 0.464087C16.1906 0.401622 15.7726 0.387207 12.4331 0.387207Z"
            fill="#007A47"
          />
          <path
            className="group-hover:fill-white"
            d="M12.4333 6.36938C8.94489 6.36938 6.11475 9.19953 6.11475 12.6879C6.11475 16.1764 8.94489 19.0065 12.4333 19.0065C15.9217 19.0065 18.7519 16.1764 18.7519 12.6879C18.7519 9.19953 15.9217 6.36938 12.4333 6.36938ZM12.4333 16.7866C10.1702 16.7866 8.33465 14.9511 8.33465 12.6879C8.33465 10.4248 10.1702 8.58929 12.4333 8.58929C14.6965 8.58929 16.532 10.4248 16.532 12.6879C16.532 14.9511 14.6965 16.7866 12.4333 16.7866Z"
            fill="#007A47"
          />
          <path
            className="group-hover:fill-white"
            d="M20.4766 6.12015C20.4766 6.937 19.8135 7.59529 19.0015 7.59529C18.1847 7.59529 17.5264 6.9322 17.5264 6.12015C17.5264 5.3033 18.1895 4.64502 19.0015 4.64502C19.8135 4.64502 20.4766 5.30811 20.4766 6.12015Z"
            fill="#007A47"
          />
        </>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com",
      icon: (
        <path
          className="group-hover:fill-white"
          d="M23.5793 0.387695H2.61646C1.61229 0.387695 0.800293 1.18047 0.800293 2.16062V23.21C0.800293 24.1901 1.61229 24.9877 2.61646 24.9877H23.5793C24.5835 24.9877 25.4003 24.1901 25.4003 23.2148V2.16062C25.4003 1.18047 24.5835 0.387695 23.5793 0.387695ZM8.09861 21.3505H4.44705V9.60789H8.09861V21.3505ZM6.27283 8.00793C5.10049 8.00793 4.15396 7.06141 4.15396 5.89387C4.15396 4.72633 5.10049 3.7798 6.27283 3.7798C7.44037 3.7798 8.38689 4.72633 8.38689 5.89387C8.38689 7.0566 7.44037 8.00793 6.27283 8.00793ZM21.7631 21.3505H18.1164V15.6426C18.1164 14.2829 18.0924 12.5291 16.2185 12.5291C14.3207 12.5291 14.0324 14.0138 14.0324 15.5465V21.3505H10.3904V9.60789H13.8883V11.2127H13.9363C14.4216 10.2902 15.6131 9.31481 17.3861 9.31481C21.0809 9.31481 21.7631 11.746 21.7631 14.9075V21.3505Z"
          fill="#007A47"
        />
      ),
    },
  ];

  // App store buttons data
  const appStoreButtons = [
    {
      name: "App Store",
      downloadText: "Download on the",
      storeName: "App Store",
      icon: (
        <path
          d="M21.9279 0H22.184C22.3895 2.5388 21.4205 4.43578 20.2428 5.80951C19.0872 7.17376 17.5048 8.4969 14.9455 8.29614C14.7747 5.7937 15.7454 4.03741 16.9215 2.66684C18.0123 1.38954 20.012 0.252931 21.9279 0ZM29.6755 26.425V26.4961C28.9563 28.6745 27.9303 30.5414 26.6783 32.274C25.5354 33.8469 24.1348 35.9636 21.6339 35.9636C19.4729 35.9636 18.0375 34.5741 15.8228 34.5362C13.48 34.4982 12.1917 35.6981 10.0497 36H9.31933C7.74641 35.7724 6.47701 34.5267 5.55223 33.4043C2.82532 30.0877 0.718087 25.8037 0.326044 20.3214V18.7106C0.49203 14.787 2.3985 11.5969 4.93255 10.0508C6.26993 9.22882 8.10842 8.52852 10.1556 8.84152C11.0329 8.97747 11.9293 9.27783 12.7149 9.57502C13.4595 9.86115 14.3906 10.3686 15.2727 10.3417C15.8702 10.3243 16.4646 10.0129 17.0669 9.79318C18.8311 9.15611 20.5605 8.42577 22.8401 8.7688C25.5796 9.18298 27.524 10.4002 28.7255 12.2782C26.408 13.7531 24.5758 15.9758 24.8888 19.7713C25.167 23.2191 27.1715 25.2362 29.6755 26.425Z"
          fill="#ffffff"
        />
      ),
    },
    {
      name: "Google Play",
      downloadText: "GET IT ON",
      storeName: "Google Play",
      icon: (
        <>
          <path
            d="M1.48871 0.556382C1.08167 0.987187 0.840988 1.65607 0.840988 2.52274V33.4773C0.840988 34.3446 1.08174 35.0128 1.48871 35.4436L1.59228 35.5445L18.9324 18.2045V17.7955L1.59228 0.454781L1.48871 0.556382Z"
            fill="#00CCFF"
          />
          <path
            d="M24.7121 23.987L18.9324 18.2045V17.7955L24.7134 12.0144L24.8437 12.0888L31.6919 15.9799C33.648 17.0912 33.648 18.9096 31.6919 20.0216L24.8437 23.9128L24.7121 23.987Z"
            fill="#FFCF00"
          />
          <path
            d="M24.8438 23.912L18.9324 18.0001L1.48871 35.4436C2.13368 36.1262 3.19793 36.2107 4.39732 35.5295L24.8438 23.912Z"
            fill="#FB3048"
          />
          <path
            d="M24.8438 12.088L4.39732 0.47046C3.19793 -0.210727 2.13368 -0.126211 1.48871 0.556382L18.9324 18.0001L24.8438 12.088Z"
            fill="#00EF6D"
          />
        </>
      ),
    },
  ];

  return (
    <footer className="lg:py-16 md:py-10 pt-10 pb-4 bg-white">
      <div className="max-w-[84rem] mx-auto px-4">
        {/* Logo Section */}
        <div className="text-3xl font-bold text-[#007A47] w-fit md:me-auto md:ms-0 mx-auto">
          <JLBLogo
            className="h-20 cursor-pointer md:me-auto mx-auto w-fit"
            onClick={() => navigate(`/?lang=${currentLang}`)}
            title="Click to go to top"
          />
        </div>

        <hr className="border-gray-200 bg-gray-200 md:my-7 my-4" />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full md:justify-between justify-center flex-col md:flex-row xl:gap-12 md:gap-6 md:mb-6 mb-4">
          {/* Navigation Links */}
          <div className="flex md:flex-row flex-col md:gap-12 gap-0 col-span-1 md:justify-start justify-center md:text-start text-center">
            {/* About Section */}
            <div>
              <h4 className="text-lg/tight font-bold text-primary md:mb-4 mb-2">{t("home.footer.about")}</h4>
              <ul className="md:space-y-3 space-y-1">
                {footerLinksWithLang.about.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        const originalHref = footerLinks.about[index].href;
                        if (originalHref === "/") {
                          // Handle home link specially - scroll to hero
                          e.preventDefault();
                          scrollToHero();
                        } else {
                          handleHashLinkClick(originalHref, e);
                        }
                      }}
                      className="text-text-secondary text-sm/tight hover:text-primary font-medium transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-[#EDEDED] bg-[#EDEDED] md:my-7 my-4 md:hidden" />

            {/* Help Section */}
            <div>
              <h4 className="text-lg/tight font-bold text-primary md:mb-4 mb-2">{t("home.footer.help")}</h4>
              <ul className="md:space-y-3 space-y-1">
                {footerLinksWithLang.help.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleHashLinkClick(footerLinks.help[index].href, e)}
                      className="text-text-secondary text-sm/tight hover:text-primary font-medium transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-[#EDEDED] bg-[#EDEDED] md:my-7 my-4 md:hidden" />

          {/* App Download Section */}
          <div className="flex xl:flex-row flex-col items-start justify-start w-fit md:me-auto mx-auto md:gap-3.5 gap-2">
            <button
              className="bg-[#101010] rounded-xl px-4 py-2.5 flex items-center lg:gap-3 gap-2 cursor-pointer w-full xl:w-auto"
              onClick={() => window.open("https://apps.apple.com", "_blank")}
            >
              <svg
                className="lg:w-9 w-6 lg:h-9 h-6"
                width="30"
                height="36"
                viewBox="0 0 30 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.9279 0H22.184C22.3895 2.5388 21.4205 4.43578 20.2428 5.80951C19.0872 7.17376 17.5048 8.4969 14.9455 8.29614C14.7747 5.7937 15.7454 4.03741 16.9215 2.66684C18.0123 1.38954 20.012 0.252931 21.9279 0ZM29.6755 26.425V26.4961C28.9563 28.6745 27.9303 30.5414 26.6783 32.274C25.5354 33.8469 24.1348 35.9636 21.6339 35.9636C19.4729 35.9636 18.0375 34.5741 15.8228 34.5362C13.48 34.4982 12.1917 35.6981 10.0497 36H9.31933C7.74641 35.7724 6.47701 34.5267 5.55223 33.4043C2.82532 30.0877 0.718087 25.8037 0.326044 20.3214V18.7106C0.49203 14.787 2.3985 11.5969 4.93255 10.0508C6.26993 9.22882 8.10842 8.52852 10.1556 8.84152C11.0329 8.97747 11.9293 9.27783 12.7149 9.57502C13.4595 9.86115 14.3906 10.3686 15.2727 10.3417C15.8702 10.3243 16.4646 10.0129 17.0669 9.79318C18.8311 9.15611 20.5605 8.42577 22.8401 8.7688C25.5796 9.18298 27.524 10.4002 28.7255 12.2782C26.408 13.7531 24.5758 15.9758 24.8888 19.7713C25.167 23.2191 27.1715 25.2362 29.6755 26.425Z"
                  fill="#ffffff"
                />
              </svg>
              <p className="flex flex-col justify-start mb-0">
                <span className="text-xs/3 font-medium text-white text-start pb-1">
                  {t("home.footer.downloadOnThe")}
                </span>
                <span className="text-lg/4 font-medium text-white text-start">{t("home.footer.appStore")}</span>
              </p>
            </button>
            <button
              className="bg-[#101010] rounded-xl px-4 py-2.5 flex items-center lg:gap-3 gap-2 cursor-pointer"
              onClick={() => window.open("https://play.google.com", "_blank")}
            >
              <svg
                className="lg:w-9 w-6 lg:h-9 h-6"
                width="34"
                height="36"
                viewBox="0 0 34 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.48871 0.556382C1.08167 0.987187 0.840988 1.65607 0.840988 2.52274V33.4773C0.840988 34.3446 1.08174 35.0128 1.48871 35.4436L1.59228 35.5445L18.9324 18.2045V17.7955L1.59228 0.454781L1.48871 0.556382Z"
                  fill="#00CCFF"
                />
                <path
                  d="M24.7121 23.987L18.9324 18.2045V17.7955L24.7134 12.0144L24.8437 12.0888L31.6919 15.9799C33.648 17.0912 33.648 18.9096 31.6919 20.0216L24.8437 23.9128L24.7121 23.987Z"
                  fill="#FFCF00"
                />
                <path
                  d="M24.8438 23.912L18.9324 18.0001L1.48871 35.4436C2.13368 36.1262 3.19793 36.2107 4.39732 35.5295L24.8438 23.912Z"
                  fill="#FB3048"
                />
                <path
                  d="M24.8438 12.088L4.39732 0.47046C3.19793 -0.210727 2.13368 -0.126211 1.48871 0.556382L18.9324 18.0001L24.8438 12.088Z"
                  fill="#00EF6D"
                />
              </svg>
              <p className="flex flex-col justify-start mb-0">
                <span className="text-xs/3 font-medium text-white text-start uppercase pb-1">
                  {t("home.footer.getItOn")}
                </span>
                <span className="text-lg/4 font-medium text-white text-start">{t("home.footer.googlePlay")}</span>
              </p>
            </button>
          </div>
          <hr className="border-[#EDEDED] bg-[#EDEDED] md:my-7 my-4 md:hidden" />

          {/* Social Media Section */}
          <div className="flex md:gap-4 gap-2 lg:justify-end md:justify-start justify-center col-span-1">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group md:min-w-12 min-w-10 md:w-12 w-10 md:h-12 h-10 bg-gray-50 hover:bg-primary border border-gray-200 hover:border-primary rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out"
                aria-label={`Follow us on ${social.name}`}
              >
                <svg
                  className="lg:w-6 lg:h-6 w-5 h-5"
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="group-hover:[&>path]:fill-white">{social.icon}</g>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:pt-8 pt-4 border-t border-gray-200 md:gap-4 gap-1">
          {/* Legal Links */}
          <div className="flex flex-wrap sm:flex-row flex-col sm:justify-start justify-center md:text-start text-center lg:gap-8 md:gap-4 gap-1">
            {footerLinksWithLang.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const originalHref = footerLinks.legal[index].href;
                  navigate(addLangParam(originalHref));
                }}
                className="cursor-pointer md:text-base/normal text-sm/normal text-text-secondary hover:text-primary font-semibold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[#363636] font-medium md:text-base/normal text-sm/normal">
            {t("home.footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
