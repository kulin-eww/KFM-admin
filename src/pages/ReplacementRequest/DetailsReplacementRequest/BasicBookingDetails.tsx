import { Button, ButtonBase } from "@mui/material";
import { BOOKING_STATUS, REPLACEMENT_REQUEST_STATUS } from "../../../utils/constant";
// import SelectDumpYard from "./SelectDumpYard";
// import TrackDriverDialog from "../TrackDriver/TrackDriverDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useRequestTimeout from "../../../hooks/useRequestTimeout";

const BasicBookingDetail: React.FC<{
  bookingDetailData: any;
  replacementRequestDetailData: any;
  handleOpenDialogue: (status: "approved" | "rejected" | "cancelled" | "") => void;
}> = ({ bookingDetailData, replacementRequestDetailData, handleOpenDialogue }) => {
  const { t } = useTranslation();
  const [showTrackDriverDialog, setShowTrackDriverDialog] = useState(false);
  const vendorBookingRequestTimeout = useSelector((state: any) => state?.user?.vendorBookingRequestTimeout);
  const timeLeft = useRequestTimeout({
    created_at: bookingDetailData?.created_at,
    timeout_minutes: parseInt(vendorBookingRequestTimeout?.replacement_booking_request),
  });
  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] md:p-4 p-3">
        <div className="flex flex-col justify-between items-start">
          <div className="flex justify-between w-full items-center gap-2 pb-3 mb-3 border-b border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]">
            <h2 className="w-full md:text-base/tight text-sm/tight font-semibold text-[#727272]">
              ID <span className="text-primary">#BYT-{bookingDetailData?.id}</span>
            </h2>
            <span
              className={`capitalize px-2 py-1 text-center ${replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.REJECTED || replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.CANCELLED ? "bg-red-100" : "bg-[#0D948814]"} ${replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.REJECTED || replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.CANCELLED ? "text-red-500" : "text-[#0D9488]"}  text-sm/tight font-medium rounded-md`}
            >
              {replacementRequestDetailData?.replace_request_status}
            </span>
          </div>

          <p className="w-full text-sm/tight font-semibold text-[#363636] pb-1.5">{bookingDetailData?.user?.name}</p>
          <p className="w-full text-sm/tight font-medium text-[#568BFF] underline underline-offset-2 pb-3 mb-3 border-b border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]">
            {bookingDetailData?.address?.full_address}
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-between w-full">
            <h3 className="2xl:text-lg/tight md:text-base/tight text-sm/tight font-semibold text-primary">
              {t("replacementRequestDetails.replacementRequestQuantity")}:{" "}
              {replacementRequestDetailData?.totalContainerForReplaceMent} {t("replacementRequestDetails.containers")}
            </h3>
            {replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.PENDING && (
              <div className="flex items-center 2xl:gap-4 md:gap-2 gap-1">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#007a47",
                    paddingX: "20px",
                    paddingY: 0.2,
                    borderColor: "#007A47",
                    backgroundColor: "#007A471A",
                    "&:hover": { backgroundColor: "#007A47", color: "#FFF" },
                  }}
                  onClick={() => {
                    handleOpenDialogue("approved");
                  }}
                  disabled={timeLeft.expired}
                >
                  {t("bookingDetails.accept")}
                  <span className="ml-1">
                    ({String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")})
                  </span>
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#FF4D4D",
                    paddingX: "20px",
                    paddingY: 0.2,
                    backgroundColor: "rgba(255, 77, 77, 0.1)",
                    border: "1px solid #FF4D4D",
                    "&:hover": { backgroundColor: "#FF4D4D", color: "#FFF" },
                  }}
                  onClick={() => {
                    handleOpenDialogue("rejected");
                  }}
                >
                  {t("bookingDetails.reject")}
                </Button>
              </div>
            )}
            {/* {replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.APPROVED && (
              <div className="flex items-center 2xl:gap-4 md:gap-2 gap-1">
                <span
                  className="px-2 py-1 md:min-w-24 text-center border border-[#FF4D4D] bg-[#FF4D4D1A] text-[#FF4D4D] text-sm/tight font-medium rounded-md cursor-pointer"
                  onClick={() => {
                    handleOpenDialogue("cancelled");
                  }}
                >
                  Cancel Booking
                </span>
              </div>
            )} */}
            {/* {(bookingDetailData?.booking_status !== BOOKING_STATUS.CANCELLED ||
              bookingDetailData?.booking_status !== BOOKING_STATUS.REJECTED) && (
              <div className="flex items-center 2xl:gap-4 md:gap-2 gap-1">
                <Button
                  size="small"
                  variant="contained"
                  sx={{ paddingX: 4 }}
                  onClick={() => {
                    setShowTrackDriverDialog(true);
                  }}
                >
                  Track Driver
                </Button>
              </div>
            )} */}
          </div>
          <div className="text-sm/tight font-medium text-primary mt-2">
            {t("bookingDetails.reason")}: <span className="text-secondary">{replacementRequestDetailData?.reason}</span>
          </div>
          <span className="pt-4 h-1 w-full block mb-4 border-b border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]"></span>
          <div>
            <h3 className="2xl:text-lg/tight md:text-base/tight text-sm/tight font-semibold text-primary">
              {t("replacementRequestDetails.orderQuantity")}: {bookingDetailData?.total_quantity}{" "}
              {t("replacementRequestDetails.containers")}
            </h3>
          </div>
        </div>
      </div>
      {/* <TrackDriverDialog
        showTrackDriverDialog={showTrackDriverDialog}
        setShowTrackDriverDialog={setShowTrackDriverDialog}
        bookingDetailData={bookingDetailData}
      /> */}
    </>
  );
};

export default BasicBookingDetail;
