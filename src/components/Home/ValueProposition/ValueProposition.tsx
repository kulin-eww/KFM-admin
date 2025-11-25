import React from "react";
import ValuePropositionImage from "../../../assets/images/home/valuePropositionContainer-removerBanner.png";
import { useTranslation } from "react-i18next";

const ValueProposition: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="xl:py-24 lg:py-16 py-10" id="why-jlb">
      <div className="max-w-[84rem] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-5 items-start">
          {/* Left Content */}
          <div className="lg:space-y-4 space-y-2">
            <h2 className="lg:text-[44px]/14 md:text-4xl/11 text-3xl/8 font-bold text-[#363636] leading-tight">
              {t("home.valueProposition.title")}
              <span className="inline-block text-primary me-1 md:me-4 ms-0.5 h-2 w-2 rounded-2xl bg-[#FFBB00] mr-3"></span>
              {t("home.valueProposition.title2")}
              <span className="inline-block text-primary me-1 md:me-4 ms-0.5 h-2 w-2 rounded-2xl bg-[#FFBB00]"></span>
              <span className="font-medium text-primary block">{t("home.valueProposition.subtitle")}</span>
            </h2>
            <p className="text-base/normal text-[#676767] font-medium">
              {t("home.valueProposition.description")}
            </p>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="lg:text-[44px]/14 md:text-4xl/11 text-3xl/8 font-semibold leading-tight w-fit lg:ms-auto">
              <span className="text-primary">{t("home.valueProposition.redefiningTitle")}</span>
              <span className="text-[#363636] block">{t("home.valueProposition.redefiningSubtitle")}</span>
            </h2>
          </div>
        </div>

        {/* Container Image and Stats Card */}
        <div className="md:mt-6 mt-4">
          <div className="relative">
            <img
              src={ValuePropositionImage}
              alt="Green container dumpster"
              className="w-full lg:w-[100%] rounded-3xl overflow-hidden lg:h-[396px] h-[320px] object-cover"
            />

            {/* Stats Card Overlay */}
            {/* <div className="absolute top-3 lg:end-0 end-3 h-[calc(100%-24px)] lg:max-w-[403px] md:max-w-[340px] max-w-[250px] overflow-hidden rounded-2xl">
              <div className="relative rounded-2xl h-full bg-white xl:p-10 md:p-6 p-4 flex flex-col justify-center z-10">
                <div
                  className="absolute inset-0 rounded-2xl -z-10"
                  style={{
                    background: "linear-gradient(212deg, #007A47 0.02%, rgba(163, 255, 216, 0.5) 76.94%)",
                    padding: "1px",
                    content: "",
                  }}
                >
                  <div className="bg-white rounded-2xl h-full"></div>
                </div>
                <h3 className="xl:text-[28px]/tight md:text-2xl text-lg/tight font-semibold text-[#363636] lg:mb-5 md:mb-4 mb-3">
                  {t("home.valueProposition.statsCard.title")}
                  <span className="block">{t("home.valueProposition.statsCard.subtitle")}</span>
                </h3>
                <div className="flex gap-8 lg:mb-6 md:mb-4 mb-2">
                  <div>
                    <div className="xl:text-4xl/tight md:text-3xl/tight text-2xl/tight font-semibold text-primary">5000+</div>
                    <div className="md:text-base/tight text-sm/tight text-[#363636] font-bold">{t("home.valueProposition.statsCard.downloads")}</div>
                  </div>
                  <div>
                    <div className="xl:text-4xl/tight md:text-3xl/tight text-2xl/tight font-semibold text-primary">120K</div>
                    <div className="md:text-base/tight text-sm/tight text-[#363636] font-bold">{t("home.valueProposition.statsCard.customers")}</div>
                  </div>
                </div>
                <p className="text-sm/normal text-[#676767] font-medium">
                  {t("home.valueProposition.statsCard.description")}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
