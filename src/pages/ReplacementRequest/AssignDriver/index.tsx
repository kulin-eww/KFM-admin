import { useQuery } from "@tanstack/react-query";
import { availableBinsAPI, availableDriversAPI } from "../../../api/booking";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AssignDriverDialog from "./AssignDriverDialog";
import SelectedDriver from "./SelectedDriver";
import { EditPencilIcon } from "../../../components/common/icons";
import AssignBinDialog from "./AssignBinDialog";
import { Button, IconButton, Tooltip } from "@mui/material";
import { PAYMENT_STATUS, REPLACEMENT_REQUEST_STATUS } from "../../../utils/constant";
import { availableBinsForReplacementAPI, availableDriversForReplacementAPI } from "../../../api/replacementRequest";
import { useTranslation } from "react-i18next";

const AssignDriver: React.FC<{
  bookingDetailData: any;
  replacementRequestDetailData: any;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}> = ({ bookingDetailData, replacementRequestDetailData, isSuccess, isLoading, isError }) => {
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
    queryKey: ["availableDriversForReplacement", id],
    queryFn: () => availableDriversForReplacementAPI(id),
    enabled: !!id,
  });

  const handleAvailableBin = useQuery({
    queryKey: ["availableBinsForReplacement", id],
    queryFn: () => availableBinsForReplacementAPI(id),
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
    if (replacementRequestDetailData?.driverWiseContainers?.length > 0 && handleAvailableDriver?.isSuccess) {
      const drivers = replacementRequestDetailData?.driverWiseContainers?.map((item: any) => item?.driver) ?? [];
      setAvailableDriverData((prevDrivers) => {
        return [...prevDrivers, ...drivers];
      });
      setSelectedDrivers(drivers ?? []);
      const bins =
        replacementRequestDetailData?.driverWiseContainers?.flatMap((item: any) =>
          (item?.containers || []).map((container: any) => ({
            ...container,
            vendor_container_id: container.id,
          }))
        ) ?? [];
      setSelectedBins(bins ?? []);
    }
  }, [replacementRequestDetailData, handleAvailableDriver.isSuccess, handleAvailableDriver.data]);

  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] py-4 px-3">
        <div className="flex justify-between items-center mb-1">
          <div className="font-medium text-lg text-[#363636]">{t("bookingDetails.replacementDriver")}</div>
          {replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.APPROVED &&
            replacementRequestDetailData?.replace_payment_status === PAYMENT_STATUS.SUCCESS &&
            !replacementRequestDetailData?.driverWiseContainers?.length && (
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
                  disabled={replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.PENDING}
                  onClick={() => {
                    setShowAssignDriverDialog(true);
                  }}
                >
                  {t("bookingDetails.assignDriver")}
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
                  disabled={replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.PENDING}
                >
                  {t("bookingDetails.assignContainer")}
                </Button>
              </div>
            )}
        </div>
        {replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.PENDING && (
          <div className="w-full p-2.5 bg-[#F7F7F7] rounded-lg px-3 flex gap-3 justify-between items-center">
            <p className="text-sm font-medium text-[#FFA500]">{t("bookingDetails.acceptBookingNote")}</p>
          </div>
        )}
        {(replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.REJECTED ||
          replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.CANCELLED) && (
          <div className="w-full p-2.5 bg-[#F7F7F7] rounded-lg px-3 flex gap-3 justify-between items-center">
            <p className="text-sm font-medium text-red-500">{t("bookingDetails.orderRejectOrCancelled")}</p>
          </div>
        )}
        {replacementRequestDetailData?.replace_request_status === REPLACEMENT_REQUEST_STATUS.APPROVED &&
          replacementRequestDetailData?.replace_payment_status !== PAYMENT_STATUS.SUCCESS && (
            <div className="w-full p-2.5 bg-[#F7F7F7] rounded-lg px-3 flex gap-3 justify-between items-center">
              <p className="text-sm font-medium text-[#FFA500]">
                {t("bookingDetails.driverAssignedUponCompletionOfPayment")}
              </p>
            </div>
          )}
        <SelectedDriver
          replacementRequestDetailData={replacementRequestDetailData}
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
          replacementRequestDetailData={replacementRequestDetailData}
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

export default AssignDriver;
