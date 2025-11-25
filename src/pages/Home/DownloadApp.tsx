import WorldMap from "../../assets/images/home/world-map.png";
import { useTranslation } from "react-i18next";

const Booking: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="xl:py-18 lg:py-16 py-10 bg-white relative overflow-hidden" id="download">
        <div className="max-w-[84rem] mx-auto px-4">
          <div className="absolute top-1/2 -translate-y-1/2 z-10 start-0 w-full h-full">
            <img src={WorldMap} alt="world-map" className="opacity-30 object-cover h-full w-full" />
          </div>
          <div className="grid md:grid-cols-2 items-center gap-4 relative z-20">
            <div className="col-span-1">
              <h2 className="lg:text-[44px]/14 md:text-4xl/11 text-3xl/8 font-medium text-[#363636] leading-tight">
                {t("home.downloadApp.title")}
                <span className="font-semibold text-primary block">{t("home.downloadApp.subtitle")}</span>
              </h2>
            </div>
            <div className="col-span-1">
              {/* App Store Badges */}
              <div className="flex md:flex-col flex-row flex-wrap md:justify-end justify-start w-fit md:ms-auto xl:gap-6 md:gap-4 gap-2">
                <button
                  className="bg-[#101010] rounded-xl px-4 py-3 flex items-center lg:gap-3 gap-2 cursor-pointer"
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
                  className="bg-[#101010] rounded-xl px-4 py-3 flex items-center lg:gap-3 gap-2 cursor-pointer"
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Booking;
