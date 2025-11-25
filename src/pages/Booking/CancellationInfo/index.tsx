import { useTranslation } from "react-i18next";

const CancellationInfo: React.FC<{ bookingDetailData: any }> = ({ bookingDetailData }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] md:p-4 p-3 mb-4">
        <div className="flex flex-col sm:flex-row justify-start gap-3 items-center pb-3 mb-3 border-b border-[#F7F7F7]">
          <h3 className="text-base/tight font-semibold text-[#FF4D4D] ">
            {t("bookingDetails.cancellationDateAndTime")}
          </h3>
          <span className="text-base/tight font-semibold text-secondary">
            {bookingDetailData?.cancelled_date?.split("T")[0]}
          </span>
        </div>

        <div className="flex justify-between items-start gap-2 pb-3 mb-3 border-b border-[#F7F7F7]">
          <div>
            <p className="font-medium text-base/tight pb-1">{t("bookingDetails.reason")}:</p>
            <p className="text-xs/tight font-medium text-[#676767]">{bookingDetailData?.cancel_reason}</p>
          </div>
        </div>

        <div className="text-sm/tight font-semibold w-full flex items-center justify-between">
          <span className="text-[#FF4D4D]">{t("bookingDetails.penalty")}</span>
          <span className="text-[#FF4D4D]">SAR {bookingDetailData?.cancellation_charge}</span>
        </div>
      </div>
    </>
  );
};

export default CancellationInfo;
