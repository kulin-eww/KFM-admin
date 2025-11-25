import { useTranslation } from "react-i18next";

const RejectionInfo: React.FC<{ bookingDetailData: any }> = ({ bookingDetailData }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] md:p-4 p-3 mb-4">
        <div className="flex flex-col sm:flex-row justify-start gap-3 items-center pb-3 mb-3 border-b border-[#F7F7F7]">
          <h3 className="text-base/tight font-semibold text-[#FF4D4D] ">
            {t("bookingDetails.rejection")}
          </h3>
        </div>

        <div className="flex justify-between items-start gap-2 pb-1 mb-1">
          <div>
            <p className="font-medium text-base/tight pb-1">{t("bookingDetails.reason")}:</p>
            <p className="text-xs/tight font-medium text-[#676767]">{bookingDetailData?.reject_reason}</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default RejectionInfo;
