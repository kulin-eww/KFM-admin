import { useEffect, useState } from "react";
import { BookingCrossIcon } from "../../../components/common/icons";
import { useTranslation } from "react-i18next";

const BookingStatus: React.FC<{ bookingDetailData: any }> = ({ bookingDetailData }) => {
  const { t, i18n } = useTranslation();
  const [bookingStatuses, setBookingStatuses] = useState(bookingDetailData?.bookingStatuses);

  useEffect(() => {
    setBookingStatuses(bookingDetailData?.bookingStatuses);
  }, [bookingDetailData]);

  return (
    <>
      <div className="flex gap-2 items-start text-base/tight text-[#676767] font-medium mb-5.5">
        <svg
          className="min-w-6 w-6 h-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#676767"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 16V11.5" stroke="#676767" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M12 8.01195V8.00195"
            stroke="#676767"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="2xl:pe-20 2xl:text-base/tight text-sm/tight font-medium">
          {t("bookingDetails.containerBookingMessage", {
            days: bookingDetailData?.days,
            startDate: new Date(bookingDetailData?.booking_start_date_time?.split("T")[0]).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
            endDate: new Date(bookingDetailData?.booking_end_date_time?.split("T")[0]).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          })}
        </p>
      </div>
      <h3 className="text-base/tight font-semibold text-black pb-3">{t("bookingDetails.trackingDetails")}</h3>

      <div className="relative overflow-auto scrollbar pb-1">
        {/* Progress Steps */}
        <div className="flex justify-between w-fit relative">
          {bookingStatuses?.map((step, index) => {
            return (
              <div key={index} className="flex flex-col items-start relative pe-3 w-[85px]">
                {/* Progress Line - Connect to next step */}
                {index < bookingStatuses.length - 1 && (
                  <div className="absolute top-3 left-6 w-[85px] h-0.5 bg-gray-300 z-0">
                    <div
                      className={`h-full transition-all duration-500 ${
                        step?.is_status
                          ? step?.status === "rejected" || step?.status === "cancelled"
                            ? "bg-red-500"
                            : "bg-primary"
                          : "bg-gray-300"
                      }`}
                      style={{
                        width:
                          step?.is_status && step?.status !== "rejected" && step?.status !== "cancelled"
                            ? "100%"
                            : "0%",
                      }}
                    />
                  </div>
                )}

                {/* Step Circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
                    step?.is_status
                      ? step?.status === "rejected" || step?.status === "cancelled"
                        ? "bg-red-500"
                        : "bg-primary"
                      : "bg-gray-400"
                  }`}
                >
                  {step?.is_status &&
                    (step?.status === "rejected" || step?.status === "cancelled" ? (
                      <BookingCrossIcon />
                    ) : (
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.30303 9.68626C8.833 10.2162 8.833 11.1247 8.30303 11.6547L7.20524 12.7525C6.67527 13.2825 5.76675 13.2825 5.23678 12.7525L0.429215 7.90708C-0.100754 7.37711 -0.100754 6.4686 0.429215 5.93863L1.52701 4.84084C2.05697 4.31087 2.96549 4.31087 3.49546 4.84084L8.30303 9.68626Z"
                          fill="white"
                        />
                        <path
                          d="M12.5048 1.3213C13.0348 0.791336 13.9433 0.791336 14.4733 1.3213L15.5711 2.4191C16.1011 2.94906 16.1011 3.85758 15.5711 4.38755L7.24302 12.6778C6.71305 13.2077 5.80453 13.2077 5.27456 12.6778L4.17677 11.58C3.6468 11.05 3.6468 10.1415 4.17677 9.61152L12.5048 1.3213Z"
                          fill="white"
                        />
                      </svg>
                    ))}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-start max-w-20">
                  <div
                    className={`capitalize text-xs/tight font-semibold mb-1 ${
                      step.is_status
                        ? step?.status === "rejected" || step?.status === "cancelled"
                          ? "text-red-500"
                          : "text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {i18n.language === "ar" ? step?.status_ar?.replaceAll("_", " ") : step?.status?.replaceAll("_", " ")}
                  </div>
                  {step?.created_at && (
                    <div className="text-[10px]/3 text-text-secondary font-medium">
                      {new Date(step?.created_at)
                        .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })
                        .replace(/,/g, "")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BookingStatus;
