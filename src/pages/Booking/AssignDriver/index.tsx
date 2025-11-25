import { useQuery } from "@tanstack/react-query";
import { availableBinsAPI, availableDriversAPI } from "../../../api/booking";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AssignDriverDialog from "./AssignDriverDialog";
import SelectedDriver from "./SelectedDriver";
import { EditPencilIcon } from "../../../components/common/icons";
import AssignBinDialog from "./AssignBinDialog";
import { Button, IconButton, Tooltip } from "@mui/material";
import { BOOKING_STATUS } from "../../../utils/constant";
import { useTranslation } from "react-i18next";

const AssignDriver: React.FC<{
  bookingDetailData: any;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  isDumpYardSelected: boolean;
}> = ({ bookingDetailData, isSuccess, isLoading, isError, isDumpYardSelected }) => {
  const { t } = useTranslation();
  const [isLoadingDriver, setIsLoadingDriver] = useState(true);
  const [isLoadingBin, setIsLoadingBin] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [availableDriverData, setAvailableDriverData] = useState([]);
  const [availableBinData, setAvailableBinData] = useState([]);
  const [showAssignDriverDialog, setShowAssignDriverDialog] = useState(false);
  const [showAssignBinDialog, setShowAssignBinDialog] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedBins, setSelectedBins] = useState([]);

  const handleAvailableDriver = useQuery({
    queryKey: ["availableDrivers", id],
    queryFn: () => availableDriversAPI(id),
    enabled: !!id,
  });

  const handleAvailableBin = useQuery({
    queryKey: ["availableBins", id],
    queryFn: () => availableBinsAPI(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (handleAvailableBin?.isSuccess && handleAvailableBin?.data) {
      setAvailableBinData(handleAvailableBin?.data?.data);
      setIsLoadingBin(false);
    } else if (handleAvailableBin?.isError) {
      setIsLoadingBin(false);
    }
  }, [handleAvailableBin?.isSuccess, handleAvailableBin?.data, handleAvailableBin?.isError]);

  useEffect(() => {
    if (handleAvailableDriver?.isSuccess && handleAvailableDriver?.data) {
      setAvailableDriverData(handleAvailableDriver?.data?.data);
      setIsLoadingDriver(false);
    } else if (handleAvailableDriver?.isError) {
      setIsLoadingDriver(false);
    }
  }, [handleAvailableDriver?.isSuccess, handleAvailableDriver?.data, handleAvailableDriver?.isError]);

  useEffect(() => {
    if (bookingDetailData?.driverWiseContainers?.length > 0 && handleAvailableDriver?.isSuccess) {
      const drivers = bookingDetailData?.driverWiseContainers?.map((item: any) => item?.driver) ?? [];
      setAvailableDriverData((prevDrivers) => {
        return [...prevDrivers, ...drivers];
      });
      setSelectedDrivers(drivers ?? []);
      const bins =
        bookingDetailData?.driverWiseContainers?.flatMap((item: any) =>
          (item?.containers || []).map((container: any) => ({
            ...container,
            vendor_container_id: container.id,
          }))
        ) ?? [];

      setSelectedBins(bins ?? []);
    }
  }, [bookingDetailData, handleAvailableDriver.isSuccess, handleAvailableDriver.data]);

  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] py-4 px-3">
        <div className="flex justify-between items-center mb-1">
          <div className="font-medium text-lg text-[#363636]">
            {t("bookingDetails.assignDriver")} ( {t("bookingDetails.delivery")} )
          </div>
          {bookingDetailData?.booking_status === BOOKING_STATUS.ACCEPTED && (
            <div className="flex items-center gap-2">
              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontWeight: 300,
                  fontSize: 14,
                  border: "1px solid",
                  "&:hover": {
                    backgroundColor: "#a7a7a652",
                  },
                }}
                onClick={() => {
                  setShowAssignDriverDialog(true);
                }}
                disabled={bookingDetailData?.booking_status === BOOKING_STATUS.PENDING}
              >
                {bookingDetailData?.driverWiseContainers?.length > 0
                  ? t("bookingDetails.reassignDriver")
                  : t("bookingDetails.assignDriver")}
              </Button>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontWeight: 300,
                  fontSize: 14,
                  border: "1px solid",
                  "&:hover": {
                    backgroundColor: "#a7a7a652",
                  },
                }}
                onClick={() => {
                  setShowAssignBinDialog(true);
                }}
                disabled={bookingDetailData?.booking_status === BOOKING_STATUS.PENDING}
              >
                {bookingDetailData?.driverWiseContainers?.length > 0
                  ? t("bookingDetails.reassignContainer")
                  : t("bookingDetails.assignContainer")}
              </Button>
            </div>
          )}
        </div>
        {bookingDetailData?.booking_status === BOOKING_STATUS.PENDING && (
          <div className="w-full p-2.5 bg-[#F7F7F7] rounded-lg px-3 flex gap-3 justify-between items-center">
            <p className="text-sm font-medium text-[#FFA500]">{t("bookingDetails.acceptBookingNote")}</p>
          </div>
        )}
        {(bookingDetailData?.booking_status === BOOKING_STATUS.REJECTED ||
          bookingDetailData?.booking_status === BOOKING_STATUS.CANCELLED) && (
          <div className="w-full p-2.5 bg-[#F7F7F7] rounded-lg px-3 flex gap-3 justify-between items-center">
            <p className="text-sm font-medium text-red-500">{t("bookingDetails.orderRejectOrCancelled")}</p>
          </div>
        )}
        {/* <div className="w-full p-2.5 bg-[#F7F7F7] rounded-lg px-3 flex gap-3 justify-between items-center">
          <p className="text-sm font-medium">Select Driver</p>
          <button
            className="text-white rounded-md font-medium transition-colors cursor-pointer"
            onClick={() => setShowAssignDriverDialog(true)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 0.25C5.06294 0.25 0.25 5.06294 0.25 11C0.25 16.9371 5.06294 21.75 11 21.75C16.9371 21.75 21.75 16.9371 21.75 11C21.75 5.06294 16.9371 0.25 11 0.25ZM12 7C12 6.44772 11.5523 6 11 6C10.4477 6 10 6.44772 10 7V10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H10V15C10 15.5523 10.4477 16 11 16C11.5523 16 12 15.5523 12 15V12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H12V7Z"
                fill="#007A47"
              />
            </svg>
          </button>
        </div> */}
        <SelectedDriver
          bookingDetailData={bookingDetailData}
          selectedDrivers={selectedDrivers}
          selectedBins={selectedBins}
        />
      </div>
      {showAssignBinDialog && (
        <AssignBinDialog
          showAssignBinDialog={showAssignBinDialog}
          setShowAssignBinDialog={setShowAssignBinDialog}
          availableBinData={availableBinData}
          isSuccess={handleAvailableBin?.isSuccess}
          isLoading={isLoadingBin}
          isError={handleAvailableBin?.isError}
          selectedDrivers={selectedDrivers}
          selectedBins={selectedBins}
          setSelectedBins={setSelectedBins}
          bookingDetailData={bookingDetailData}
        />
      )}
      {showAssignDriverDialog && (
        <AssignDriverDialog
          showAssignDriverDialog={showAssignDriverDialog}
          setShowAssignDriverDialog={setShowAssignDriverDialog}
          availableDriverData={availableDriverData}
          isSuccess={handleAvailableDriver?.isSuccess}
          isLoading={isLoadingDriver}
          isError={handleAvailableDriver?.isError}
          selectedDrivers={selectedDrivers}
          setSelectedDrivers={setSelectedDrivers}
          setSelectedBins={setSelectedBins}
          isDumpYardSelected={isDumpYardSelected}
        />
      )}
    </>
  );
};

export default AssignDriver;
