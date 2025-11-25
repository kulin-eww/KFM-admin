import React from "react";
import { useTranslation } from "react-i18next";

const WhoWeAre: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="xl:py-24 lg:py-16 py-10 bg-gray-50" id="who-we-are">
      <div className="max-w-[84rem] mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="lg:text-[44px]/14 md:text-4xl/11 text-3xl/8 font-bold text-[#363636] leading-tight mb-6">
            {t("home.whoWeAre.title")}
          </h2>
          <p className="text-base/normal text-[#676767] font-medium leading-relaxed">
            {t("home.whoWeAre.description")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

