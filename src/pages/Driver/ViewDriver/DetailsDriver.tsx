import { useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import ErrorLottie from "../../../components/lottie/ErrorLottie";
import { MailIcon, PhoneIcon } from "../../../components/common/icons";
import { useTranslation } from "react-i18next";
const DetailsDriver: React.FC<{ data: any; isSuccess: boolean; isError: boolean; isLoading: boolean }> = ({
  data,
  isSuccess,
  isError,
  isLoading,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="border-1 rounded-2xl px-4 py-8 border-gray-300">
        {isLoading && <Loader />}
        {isSuccess && (
          <>
            <div className="flex flex-col justify-between xl:flex-row gap-4">
              {/* Profile Section */}
              <div className="flex gap-6 flex-col lg:flex-row xl:justify-around w-full">
                <div className="flex gap-6 flex-shrink-0">
                  <div className="lg:flex-grow-0 flex-shrink-0">
                    <img
                      src={data?.profile_image}
                      alt="Profile"
                      className="w-16 h-16 md:w-16 md:h-16 object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-primary mb-2">{data?.name}</div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <PhoneIcon />
                        <span className="text-[#568BFF] font-medium text-sm underline cursor-pointer">
                          {data?.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MailIcon />
                        <span className="text-[#568BFF] font-medium text-sm underline cursor-pointer">
                          {data?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="whitespace-normal break-words flex-grow">
                  <div className="font-semibold text-primary mb-2">{t("driver.address")}</div>
                  <p className="text-secondary leading-relaxed text-sm line-clamp-3 font-semibold">{data?.address}</p>
                </div>
              </div>
              <div className="flex flex-col w-1/4">
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-primary font-medium">{t("driver.licenseNumber")}</div>
                    <div className="text-sm text-secondary font-semibold">{data?.license_number}</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary font-semibold">{t("driver.expiryDate")}</div>
                    <div className="text-sm  text-secondary font-semibold">{data?.license_expiry_date}</div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center bg-bg-secondary border border-gray-200 rounded-lg px-4 py-2 mt-3">
                  <button
                    onClick={() => window.open(data?.driving_license_front, "_blank")}
                    className="text-blue-500 font-medium underline hover:text-blue-700 flex justify-center items-center gap-1 cursor-pointer w-full"
                  >
                    {t("driver.viewLicense")}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-2 lg:grid-rows-1 gap-3">
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <div className=" font-semibold text-primary">{t("driver.totalCompletedOrders")}</div>
                  <div className="text-sm  font-semibold text-secondary">{data?.total_completed_bookings || 0}</div>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <div className=" font-semibold text-primary">{t("driver.onTimeDeliveries")}</div>
                  <div className="text-sm font-semibold text-secondary">{data?.total_ontime_deliveries || 0}</div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <div className=" font-semibold text-primary">{t("driver.lateDeliveries")}</div>
                  <div className="text-sm font-semibold text-secondary">{data?.total_late_deliveries || 0}</div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <div className=" font-semibold text-primary">{t("driver.violationMade")}</div>
                  <div className="text-sm font-semibold text-secondary">{data?.total_violations || 0}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {isError && <ErrorLottie />}
      </div>
    </>
  );
};

export default DetailsDriver;
