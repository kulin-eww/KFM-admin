import { useTranslation } from "react-i18next";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Booking: React.FC = () => {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      id: 1,
      title: t("home.booking.steps.chooseWasteType"),
      description: t("home.booking.steps.chooseWasteTypeDescription"),
      icon: (
        <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.1709 26.8152V28.2999H18.6559C19.1739 28.2999 19.4329 28.2999 19.6659 28.2035C19.8988 28.1069 20.082 27.9238 20.4483 27.5575L26.5527 21.4526C26.8983 21.1071 27.0711 20.9343 27.1635 20.7481C27.3391 20.3935 27.3391 19.9772 27.1635 19.6226C27.0711 19.4362 26.8983 19.2635 26.5527 18.918C26.2072 18.5725 26.0345 18.3997 25.8481 18.3073C25.4934 18.1317 25.0771 18.1317 24.7225 18.3073C24.5361 18.3997 24.3633 18.5725 24.0178 18.918L17.9134 25.0229C17.547 25.3892 17.3639 25.5723 17.2673 25.8051C17.1709 26.0381 17.1709 26.2971 17.1709 26.8152Z"
            stroke="#007A47"
            strokeWidth="1.51864"
            strokeLinejoin="round"
          />
          <path
            d="M24.7642 14.379C24.7642 14.379 24.7642 12.3928 24.5716 11.9277C24.3789 11.4626 24.0131 11.0968 23.2815 10.3652L17.2873 4.37097C16.6559 3.73961 16.3403 3.42393 15.9491 3.23688C15.8677 3.19796 15.7845 3.16344 15.6994 3.13343C15.2905 2.98915 14.8442 2.98915 13.9512 2.98915C9.84457 2.98915 7.79123 2.98915 6.40043 4.11051C6.11945 4.33705 5.86352 4.59298 5.63698 4.87395C4.51562 6.26475 4.51562 8.3181 4.51562 12.4248V18.1756C4.51562 22.9482 4.51562 25.3346 5.99829 26.8172C7.34368 28.1626 9.43312 28.2872 13.3744 28.2987M15.9055 3.62192V4.25469C15.9055 7.83417 15.9055 9.6239 17.0175 10.7359C18.1295 11.8479 19.9192 11.8479 23.4987 11.8479H24.1314"
            stroke="#007A47"
            strokeWidth="1.51864"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: t("home.booking.steps.chooseDateAndTime"),
      description: t("home.booking.steps.chooseDateAndTimeDescription"),
      icon: (
        <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#007A47"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: t("home.booking.steps.selectRentalDuration"),
      description: t("home.booking.steps.selectRentalDurationDescription"),
      icon: (
        <svg width="32" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
            stroke="#007A47"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: t("home.booking.steps.addDropOffLocation"),
      description: t("home.booking.steps.addDropOffLocationDescription"),
      icon: (
        <svg fill="#007A47" width="32" height="31" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: t("home.booking.steps.chooseContainerSize"),
      description: t("home.booking.steps.chooseContainerSizeDescription"),
      icon: (
        <svg
          fill="#007A47"
          width="32"
          height="31"
          viewBox="0 0 36 36"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>container-line</title>
          <path
            d="M32,30H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H32a2,2,0,0,1,2,2V28A2,2,0,0,1,32,30ZM4,8V28H32V8Z"
            className="clr-i-outline clr-i-outline-path-1"
          ></path>
          <path
            d="M9,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,9,25.3Z"
            className="clr-i-outline clr-i-outline-path-2"
          ></path>
          <path
            d="M14.92,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,14.92,25.3Z"
            className="clr-i-outline clr-i-outline-path-3"
          ></path>
          <path
            d="M21,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,21,25.3Z"
            className="clr-i-outline clr-i-outline-path-4"
          ></path>
          <path
            d="M27,25.3a.8.8,0,0,1-.8-.8v-13a.8.8,0,0,1,1.6,0v13A.8.8,0,0,1,27,25.3Z"
            className="clr-i-outline clr-i-outline-path-5"
          ></path>
          <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
        </svg>
      ),
    },
  ];
  return (
    <>
      <section className="xl:pb-24 lg:pb-16 pb-10" id="home">
        <div className="max-w-[84rem] mx-auto px-4">
          <div className="grid md:grid-cols-2 items-center md:gap-4 gap-2 md:mb-7 mb-5">
            <div className="col-span-1">
              <h2 className="lg:text-[44px]/14 md:text-4xl/11 text-3xl/8 font-medium text-[#363636] leading-tight">
                <span className="font-bold">{t("home.booking.fast")},</span>{" "}
                <span className="font-bold text-primary">
                  {t("home.booking.easy")} & {t("home.booking.reliable")}
                </span>{" "}
                <span className="text-primary">{t("home.booking.containerRentalMadeSimple")}</span>
              </h2>
            </div>
            <div className="col-span-1">
              <p className="text-base/normal text-[#676767] font-medium">{t("home.booking.description")}</p>
            </div>
          </div>
          <div className="grid xl:gap-7 gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {steps.map((step) => (
              <div
                className="col-span-1 rounded-3xl bg-white shadow-[-9px_11px_38.1px_0px_#0000000D] xl:p-10 p-6"
                key={step.id}
              >
                <div className="w-12 h-12 rounded-lg bg-[#007A471A] flex items-center justify-center xl:mb-7 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-[#363636] xl:text-2xl/normal text-xl/tight font-semibold xl:mb-5 mb-3 line-clamp-2">
                  {step.title}
                </h3>
                <p className="text-[#676767] text-sm/normal font-medium line-clamp-3">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default Booking;
