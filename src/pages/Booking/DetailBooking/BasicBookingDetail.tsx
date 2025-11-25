import { Button } from "@mui/material";
import { BOOKING_STATUS } from "../../../utils/constant";
import TrackDriverDialog from "../TrackDriver/TrackDriverDialog";
import { useEffect, useState } from "react";
import { socket } from "../../../utils/socket";
import DriverViolation from "./DriverViolation";
import { useTranslation } from "react-i18next";
import useRequestTimeout from "../../../hooks/useRequestTimeout";
import { useSelector } from "react-redux";

const BasicBookingDetail: React.FC<{
  bookingDetailData: any;
  handleOpenDialogue: (status: "accepted" | "rejected" | "cancelled" | "") => void;
}> = ({ bookingDetailData, handleOpenDialogue }) => {
  const { t, i18n } = useTranslation();
  const [showTrackDriverDialog, setShowTrackDriverDialog] = useState(false);
  const vendorBookingRequestTimeout = useSelector((state: any) => state?.user?.vendorBookingRequestTimeout);
  // const timeLeft = useRequestTimeout({
  //   created_at: bookingDetailData?.created_at,
  //   timeout_minutes: parseInt(vendorBookingRequestTimeout?.new_booking_request),
  // });

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  const [selectedDriverForMap, setSelectedDriverForMap] = useState<string>("default");
  const handleTrackDriverDialog = (driverId?: string) => {
    if (driverId) {
      setSelectedDriverForMap(driverId);
    }
    socket.emit("join_room", { id: bookingDetailData?.id });
    setShowTrackDriverDialog(true);
  };

  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] md:p-4 p-3">
        <div className="flex flex-col justify-between items-start">
          <div className="flex justify-between w-full items-center gap-2 pb-3 mb-3 border-b border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]">
            <h2 className="w-full md:text-base/tight text-sm/tight font-semibold text-[#727272]">
              {t("bookingDetails.id")} <span className="text-primary">#BYT-{bookingDetailData?.id}</span>
            </h2>
            <span
              className={`capitalize px-2 py-1 text-center ${bookingDetailData?.booking_status === "rejected" || bookingDetailData?.booking_status === "cancelled" ? "bg-red-100" : "bg-[#0D948814]"} ${bookingDetailData?.booking_status === "rejected" || bookingDetailData?.booking_status === "cancelled" ? "text-red-500" : "text-[#0D9488]"}  text-sm/tight font-medium rounded-md`}
            >
              {i18n.language === "ar"
                ? bookingDetailData?.booking_status_ar?.replaceAll("_", " ")
                : bookingDetailData?.booking_status?.replaceAll("_", " ")}
            </span>
          </div>
          <DriverViolation bookingDetailData={bookingDetailData} handleTrackDriverDialog={handleTrackDriverDialog} />
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-1.5 pb-1.5">
            <p className="text-sm/tight font-semibold text-[#363636]">{bookingDetailData?.user?.name}</p>
            {bookingDetailData?.place_image && (
              <span
                className="text-sm/tight font-medium text-[#568BFF] underline underline-offset-2 cursor-pointer"
                onClick={() => {
                  window.open(bookingDetailData?.place_image, "_blank");
                }}
              >
                {t("bookingDetails.viewDropPlaceImage")}
              </span>
            )}
          </div>
          <p className="w-full text-sm/tight font-medium text-[#568BFF] underline underline-offset-2 pb-3 mb-3 border-b border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]">
            {bookingDetailData?.address?.full_address}
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-between w-full">
            <h3 className="2xl:text-lg/tight md:text-base/tight text-sm/tight font-semibold text-primary">
              {t("bookingDetails.orderQuantity")}: {bookingDetailData?.total_quantity} {t("bookingDetails.containers")}
            </h3>
            {bookingDetailData?.booking_status === BOOKING_STATUS.PENDING && (
              <div className="flex items-center gap-2">
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
                    handleOpenDialogue("accepted");
                  }}
                  // disabled={timeLeft.expired}
                >
                  {t("bookingDetails.accept")}
                  {/* <span className="ml-1">
                    ({String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")})
                  </span> */}
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
            {/* <div className="flex items-center justify-end gap-2"> */}
            {bookingDetailData?.booking_status === BOOKING_STATUS.ACCEPTED &&
              !bookingDetailData?.bookingStatuses?.some(
                (item) => item.status === "dispatched" && item.is_status === true
              ) && (
                <div className="flex items-center 2xl:gap-4 md:gap-2 gap-1">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "#FF4D4D",
                      paddingX: "16px",
                      paddingY: 0.2,
                      backgroundColor: "rgba(255, 77, 77, 0.1)",
                      border: "1px solid #FF4D4D",
                      "&:hover": { backgroundColor: "#FF4D4D", color: "#FFF" },
                    }}
                    onClick={() => {
                      handleOpenDialogue("cancelled");
                    }}
                  >
                    {t("bookingDetails.cancelBooking")}
                  </Button>
                </div>
              )}
            {bookingDetailData?.bookingStatuses?.some(
              (item) => item.status === "dispatched" && item.is_status === true
            ) && (
              <div className="flex items-center 2xl:gap-4 md:gap-2 gap-1">
                <Button
                  size="small"
                  variant="contained"
                  sx={{ paddingX: 4 }}
                  onClick={() => {
                    handleTrackDriverDialog();
                  }}
                >
                  {t("bookingDetails.trackDriver")}
                </Button>
              </div>
            )}
            {/* </div> */}
          </div>
          {/* <div className="mt-4 w-full">
            <SelectDumpYard bookingDetailData={bookingDetailData} />
          </div> */}
        </div>
      </div>
      {showTrackDriverDialog && (
        <TrackDriverDialog
          showTrackDriverDialog={showTrackDriverDialog}
          setShowTrackDriverDialog={setShowTrackDriverDialog}
          bookingDetailData={bookingDetailData}
          selectedDriverForMap={selectedDriverForMap}
          setSelectedDriverForMap={setSelectedDriverForMap}
        />
      )}
    </>
  );
};

export default BasicBookingDetail;
