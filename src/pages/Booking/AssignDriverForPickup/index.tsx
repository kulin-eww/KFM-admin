import { useQuery } from "@tanstack/react-query";
import {
  availableBinsAPI,
  availableBinsForPickupAPI,
  availableDriversAPI,
  availableDriversForPickupAPI,
} from "../../../api/booking";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EditPencilIcon } from "../../../components/common/icons";
import AssignBinDialog from "./AssignBinDialog";
import { Button, IconButton, Tooltip } from "@mui/material";
import { BOOKING_STATUS } from "../../../utils/constant";
import { useTranslation } from "react-i18next";
import SelectedDriver from "./SelectedDriver";
import AssignDriverDialog from "./AssignDriverDialog";

const AssignDriverForPickup: React.FC<{
  bookingDetailData: any;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}> = ({ bookingDetailData, isSuccess, isLoading, isError }) => {
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
    queryKey: ["availableDriversForPickup", id],
    queryFn: () => availableDriversForPickupAPI(id),
    enabled: !!id,
  });

  const handleAvailableBin = useQuery({
    queryKey: ["availableBinsForPickup", id],
    queryFn: () => availableBinsForPickupAPI(id),
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
    if (bookingDetailData?.driverWisePickupContainers?.length > 0 && handleAvailableDriver?.isSuccess) {
      const drivers = bookingDetailData?.driverWisePickupContainers?.map((item: any) => item?.driver) ?? [];
      setAvailableDriverData((prevDrivers) => {
        return [...prevDrivers, ...drivers];
      });
      setSelectedDrivers(drivers ?? []);
      const bins =
        bookingDetailData?.driverWisePickupContainers?.flatMap((item: any) =>
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
            {t("bookingDetails.assignDriver")} ( {t("bookingDetails.pickup")} )
          </div>
          {bookingDetailData?.bookingStatuses?.some(
            (item) => item?.status === "pickedup" && item?.is_status === false
          ) && (
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
                {bookingDetailData?.driverWisePickupContainers?.length > 0
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
                {bookingDetailData?.driverWisePickupContainers?.length > 0
                  ? t("bookingDetails.reassignContainer")
                  : t("bookingDetails.assignContainer")}
              </Button>
            </div>
          )}
        </div>
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
        />
      )}
    </>
  );
};

export default AssignDriverForPickup;
