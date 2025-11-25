import { useTranslation } from "react-i18next";
import { SeperatorIcon } from "../../../components/common/icons";
import dayjs from "dayjs";

const RentalSummary: React.FC<{ bookingDetailData: any }> = ({ bookingDetailData }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] md:p-4 p-3 mb-4">
        <h3 className="text-base/tight font-semibold text-black pb-3 mb-3 border-b border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]">
          {t("bookingDetails.rentalSummary")}
        </h3>
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-2 mb-3">
          <div className="flex flex-row justify-start items-center col-span-1 2xl:gap-4 xl:gap-2 gap-1">
            <p className="2xl:text-base/tight sm:text-sm/tight text-xs/tight font-semibold text-primary w-fit">
              {t("bookingDetails.rentalDuration")}
            </p>
            <SeperatorIcon />

            <p className="2xl:text-base/tight sm:text-sm/tight text-xs/tight font-medium text-[#727272]">
              {bookingDetailData?.days} {t("bookingDetails.days")}
            </p>
          </div>
          <div className="flex flex-row xl:justify-end items-center col-span-1 2xl:gap-4 xl:gap-2 gap-1">
            <p className="2xl:text-base/tight sm:text-sm/tight text-xs/tight font-semibold text-primary w-fit">
              {t("bookingDetails.startDateTime")}
            </p>
            <SeperatorIcon />
            <p className="2xl:text-base/tight sm:text-sm/tight text-xs/tight font-medium text-[#727272]">
              {dayjs(bookingDetailData?.booking_start_date_time).format("YYYY-MM-DD hh:mm A")}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-[#EDEDED] p-3">
          {bookingDetailData?.booking_details?.map((container: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center pb-2.5 last:pb-0 mb-2.5 last:mb-0 border-b last:border-b-0 border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]"
            >
              <span className="text-sm/tight text-[#363636] font-semibold">
                {container?.bin_size.name?.en}{" "}
                {container?.booking_type === "replacement" ? `(${container?.booking_type})` : ""}
              </span>
              <span className={`text-xs/tight font-medium text-[#676767]`}>
                {t("bookingDetails.qty")}: {container?.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RentalSummary;
