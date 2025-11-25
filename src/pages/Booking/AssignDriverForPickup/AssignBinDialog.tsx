import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CrossIcon } from "../../../components/common/icons";
import { useState } from "react";
import Loader from "../../../components/Loader/Loader";
import ErrorLottie from "../../../components/lottie/ErrorLottie";
import useToast from "../../../hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignDriverAPI, assignDriverForPickupAPI, updateAssignDriverAPI } from "../../../api/booking";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AssignBinDialog: React.FC<{
  showAssignBinDialog: boolean;
  setShowAssignBinDialog: any;
  availableBinData: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  selectedDrivers: any;
  selectedBins: any;
  setSelectedBins: any;
  bookingDetailData: any;
}> = ({
  showAssignBinDialog,
  setShowAssignBinDialog,
  availableBinData,
  isLoading,
  isError,
  isSuccess,
  selectedDrivers,
  selectedBins,
  setSelectedBins,
  bookingDetailData,
}) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();
  const handleAssign = useMutation({
    mutationFn: assignDriverForPickupAPI,
    onSuccess: (res) => {
      // queryClient.invalidateQueries({ queryKey: ["availableDrivers"] });
      // queryClient.invalidateQueries({ queryKey: ["availableBins"] });
      queryClient.invalidateQueries({ queryKey: ["detailsBooking", id] });
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const handleBinToggle = (
    driverId: number,
    bookingDetailId: number,
    vendorContainerId: number,
    containerCode: string, // New param
    checked: boolean
  ) => {
    setSelectedBins((prev) => {
      if (checked) {
        return [
          ...prev,
          {
            driver_id: driverId,
            booking_detail_id: bookingDetailId,
            vendor_container_id: vendorContainerId,
            container_code: containerCode, // Add container_code
          },
        ];
      } else {
        return prev.filter(
          (item) =>
            !(
              item.driver_id === driverId &&
              item.vendor_container_id === vendorContainerId &&
              item.booking_detail_id === bookingDetailId
            )
        );
      }
    });
  };

  const isBinDisabled = (currentDriverId: number, binId: number) => {
    return selectedBins.some((item) => item.vendor_container_id === binId && item.driver_id !== currentDriverId);
  };
  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 700, borderRadius: 4 } }}
        maxWidth="md"
        open={showAssignBinDialog}
      >
        <DialogTitle sx={{ paddingBottom: 0 }}>
          <div className="flex justify-between items-center">
            <div>{t("bookingDetails.assignContainer")}</div>
            <div>
              <IconButton
                onClick={() => {
                  setShowAssignBinDialog(false);
                }}
                edge="end"
              >
                <CrossIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2">
            {isLoading && <Loader />}
            {isSuccess && !isLoading && (
              <>
                {selectedDrivers.length === 0 ? (
                  <div className="text-red-600 font-medium mt-4">
                    {t("bookingDetails.pleaseSelectAtLeastOneDriver")}
                  </div>
                ) : (
                  selectedDrivers.map((driver: any) => (
                    <div key={driver?.id} className="border-b border-gray-200 py-3">
                      <span className="text-gray-800 text-md font-medium">{driver?.name}</span>
                      <div className="flex items-center gap-2 mt-3">
                        {availableBinData?.map((bin: any) => {
                          const binDisabled = isBinDisabled(driver?.id, bin?.id);
                          const isChecked = selectedBins.some(
                            (item) => item?.driver_id === driver?.id && item?.vendor_container_id === bin?.id
                          );
                          return (
                            <div
                              key={bin?.id}
                              className="flex items-center justify-between bg-[#EDEDED] rounded-sm gap-2 px-3 py-2 2xl:min-w-30 xl:min-w-26 min-w-22"
                            >
                              <span className="md:text-sm text-xs font-medium text-gray-600">{bin?.container_code}</span>
                              <input
                                type="checkbox"
                                name={driver?.id?.toString()}
                                checked={isChecked}
                                disabled={binDisabled && !isChecked}
                                onChange={(e) =>
                                  handleBinToggle(
                                    driver.id,
                                    bin.booking_detail_id,
                                    bin.id,
                                    bin.container_code,
                                    e.target.checked
                                  )
                                }
                                className="h-5 w-5 accent-primary rounded-md cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {isError && <ErrorLottie />}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              paddingX: 6,
              marginRight: 1,
              "&.Mui-disabled": {
                backgroundColor: "#e0e0e0",
                color: "#9e9e9e",
                boxShadow: "none",
              },
            }}
            loading={handleAssign.isPending}
            disabled={selectedBins.length !== bookingDetailData?.total_pickup_quantity}
            onClick={() => {
              handleAssign.mutate({ booking_id: Number(id), assign: selectedBins });
              setShowAssignBinDialog(false);
            }}
          >
            {t("bookingDetails.assignContainer")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssignBinDialog;
