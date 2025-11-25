import React from "react";
import Container from "../../../assets/images/home/journeyContainer.png";
import BoxLine from "../../../assets/images/home/boxline.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CallToAction: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="xl:py-24 lg:py-16 py-10 relative overflow-visible bg-primary" id="call-to-action">
      <div className="absolute top-0 start-0 h-full w-full">
        <img src={BoxLine} alt="box-line" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-[84rem] mx-auto px-4">
        <img
          src={Container}
          alt="Call to Action"
          className="w-fit xl:h-[436px] lg:h-[300px] md:h-[200px] object-cover md:absolute relative lg:top-12 md:top-18 md:end-0 -end-4 ms-auto md:mb-0 mb-4 rtl:-scale-x-100"
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="md:space-y-8 space-y-4 z-10 text-start">
            <h2 className="xl:text-6xl lg:text-[44px]/14 md:text-4xl/11 text-3xl/8 font-semibold text-white leading-tight">
              {t("home.callToAction.title")}
              <span className="block text-teal">{t("home.callToAction.subtitle")}</span>
            </h2>
            <button
              className="group flex gap-3 items-center justify-center cursor-pointer text-base/tight font-semibold text-white xl:px-7 px-6 xl:py-4 py-3 rounded-full border-white border transition-colors hover:bg-white hover:text-primary duration-300 ease-in-out"
              onClick={() => {
                navigate("/signup");
              }}
            >
              {t("home.callToAction.vendorRegistration")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
