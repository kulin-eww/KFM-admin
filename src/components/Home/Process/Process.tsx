import React from "react";
import ProcessStep from "./ProcessStep";
import { PackageIcon, ReceiptIcon, RoutingIcon, TruckIcon } from "../../common/icons";
import { useTranslation } from "react-i18next";

const Process: React.FC = () => {
  const { t } = useTranslation();
  const processSteps = [
    {
      icon: (
        <>
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </>
      ),
      iconAlt: "Package",
      title: t("home.process.steps.signUp.title"),
      description: t("home.process.steps.signUp.description"),
    },
    {
      icon: (
        <>
          <svg
            className="w-6 h-6"
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6348 20.4081C12.6348 21.6951 11.5915 22.7383 10.3046 22.7383C9.01764 22.7383 7.97435 21.6951 7.97435 20.4081M12.6348 20.4081C12.6348 19.1212 11.5915 18.0779 10.3046 18.0779C9.01764 18.0779 7.97435 19.1212 7.97435 20.4081M12.6348 20.4081H17.2953M7.97435 20.4081H7.3918C5.78311 20.4081 4.479 19.104 4.479 17.4953L5.64412 8.17439C5.64412 6.5657 6.94822 5.2616 8.55691 5.2616H14.9651C16.5737 5.2616 17.8778 6.5657 17.8778 8.17439V8.2909M21.9558 20.4081C21.9558 21.6951 20.9125 22.7383 19.6255 22.7383C18.3386 22.7383 17.2953 21.6951 17.2953 20.4081M21.9558 20.4081C21.9558 19.1212 20.9125 18.0779 19.6255 18.0779C18.3386 18.0779 17.2953 19.1212 17.2953 20.4081M21.9558 20.4081H22.5383C24.147 20.4081 25.4511 19.104 25.4511 17.4953V15.7476M17.8778 8.2909H19.5153C20.3283 8.2909 21.1042 8.63064 21.6557 9.228L23.1672 10.8655M17.8778 8.2909V18.8668M23.1672 10.8655L24.6786 12.5029C25.1753 13.041 25.4511 13.7463 25.4511 14.4786V15.7476M23.1672 10.8655H21.9558C21.3123 10.8655 20.7906 11.3871 20.7906 12.0306V13.4174C20.7906 14.7044 21.8339 15.7476 23.1209 15.7476H25.4511"
              stroke="currentColor"
              stroke-width="1.49801"
            />
          </svg>
        </>
      ),
      iconAlt: "Truck",
      title: t("home.process.steps.listService.title"),
      description: t("home.process.steps.listService.description"),
    },
    {
      icon: (
        <>
          <svg
            className="w-6 h-6"
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6167 7.00898V9.82856C26.6167 11.6694 25.4516 12.8346 23.6107 12.8346H19.626V4.69039C19.626 3.39711 20.6862 2.34851 21.9795 2.34851C23.2495 2.36016 24.4146 2.87281 25.2535 3.7117C26.0924 4.56223 26.6167 5.72735 26.6167 7.00898Z"
              stroke="currentColor"
              stroke-width="1.49801"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.31396 8.1741V24.4857C3.31396 25.4528 4.40917 26.0004 5.17815 25.4178L7.1705 23.9265C7.63655 23.5769 8.28901 23.6235 8.70846 24.043L10.6425 25.9887C11.0969 26.4431 11.8426 26.4431 12.297 25.9887L14.2544 24.0313C14.6622 23.6235 15.3147 23.5769 15.7691 23.9265L17.7614 25.4178C18.5304 25.9887 19.6256 25.4411 19.6256 24.4857V4.67874C19.6256 3.39712 20.6742 2.34851 21.9558 2.34851H9.13955H7.97443C4.47908 2.34851 3.31396 4.43407 3.31396 7.00898V8.1741Z"
              stroke="currentColor"
              stroke-width="1.49801"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.4697 15.1788H14.9651"
              stroke="currentColor"
              stroke-width="1.49801"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.4697 10.519H14.9651"
              stroke="currentColor"
              stroke-width="1.49801"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.9707 15.1654H7.98117"
              stroke="currentColor"
              stroke-width="1.49801"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.9707 10.5046H7.98117"
              stroke="currentColor"
              stroke-width="1.49801"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </>
      ),
      iconAlt: "Clipboard List",
      title: t("home.process.steps.receiveOrders.title"),
      description: t("home.process.steps.receiveOrders.description"),
    },
    {
      icon: (
        <>
          <svg width="18" height="18" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.26953 12.9004L13 11.9023C12.9727 12.1849 12.9226 12.4583 12.8497 12.7227C12.7767 12.987 12.6856 13.2422 12.5762 13.4883L7.8457 14.5C7.87305 14.2174 7.92318 13.9395 7.99609 13.666C8.06901 13.4017 8.16016 13.1465 8.26953 12.9004ZM12.5762 10.4805L7.8457 11.4922V8.4707L6.36914 8.78516V10.4531C6.36914 10.5352 6.35547 10.6126 6.32813 10.6855C6.3099 10.7493 6.28255 10.8132 6.24609 10.877L5.48047 12.0117C5.38021 12.1484 5.25716 12.2669 5.11133 12.3672C4.97461 12.4583 4.82422 12.5221 4.66016 12.5586L0.476562 13.4473C0.503906 13.1647 0.554036 12.8913 0.626953 12.627C0.699869 12.3535 0.79102 12.0938 0.90039 11.8477L4.89258 11V9.09961L1.17383 9.8926C1.20117 9.61003 1.2513 9.33659 1.32422 9.07227C1.39714 8.79883 1.48828 8.53906 1.59766 8.29297L4.89258 7.5957V1.73047C5.10221 1.48438 5.33008 1.25651 5.57617 1.04688C5.82227 0.83724 6.08659 0.65495 6.36914 0.5V7.28125L7.8457 6.9668V2.46875C8.04622 2.22266 8.26953 1.99479 8.51563 1.78516C8.77083 1.57552 9.03971 1.39323 9.32227 1.23828V6.65234L13 5.87305C12.9727 6.1556 12.9226 6.43359 12.8497 6.70703C12.7767 6.97135 12.6856 7.22656 12.5762 7.47266L9.32227 8.15625V9.6738L13 8.88086C12.9727 9.16341 12.9226 9.44141 12.8497 9.7148C12.7767 9.9792 12.6856 10.2344 12.5762 10.4805Z"
              fill="currentColor"
            />
          </svg>
        </>
      ),
      iconAlt: "Percent",
      title: t("home.process.steps.getPaid.title"),
      description: t("home.process.steps.getPaid.description"),
    },
  ];

  return (
    <section className="xl:py-24 lg:py-16 py-10 bg-white" id="services">
      <div className="max-w-[84rem] mx-auto px-4">
        <p className="md:text-lg text-base/tight font-semibold text-text-primary md:mb-3 mb-2">
          {t("home.process.subtitle")}
        </p>
        <h2 className="lg:text-[44px]/14 md:text-4xl/11 text-3xl/8 font-semibold leading-tight text-balance text-primary">
          {t("home.process.title")}
          {/* <span className="text-text-primary block">{t("home.process.title3")}</span> */}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-6 gap-4 lg:mt-7 mt-5">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              iconAlt={step.iconAlt}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
