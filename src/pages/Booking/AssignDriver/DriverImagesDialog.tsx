import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CrossIcon } from "../../../components/common/icons";
import { useTranslation } from "react-i18next";

const DriverImagesDialog: React.FC<{
  showDriverImagesDialog: boolean;
  setShowDriverImagesDialog: any;
  viewDriver: any;
}> = ({ showDriverImagesDialog, setShowDriverImagesDialog, viewDriver }) => {
  const { t } = useTranslation();
  const hasDeliveryProof = viewDriver?.delivery_images?.length > 0 || viewDriver?.delivery_comment;
  // const hasCompletedProof = viewDriver?.completed_images?.length > 0 || viewDriver?.completed_comment;
  // const hasDumpYardProof = viewDriver?.dump_yard_images?.length > 0 || viewDriver?.dump_yard_comment;

  const hasAnyProof = hasDeliveryProof;
  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: {md: "50%", xs: "90%"}, maxHeight: 435, borderRadius: 4 } }}
        maxWidth="md"
        open={showDriverImagesDialog}
      >
        <DialogTitle>
          <div className="flex justify-between items-center border-b border-gray-200">
            <div className="text-[16px] font-semibold md:text-lg">{viewDriver?.name}</div>
            <div>
              <IconButton
                onClick={() => {
                  setShowDriverImagesDialog(false);
                }}
                edge="end"
              >
                <CrossIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <>
            {!hasAnyProof && <div className="text-center text-gray-500 py-4">{t("bookingDetails.noProof")}</div>}

            {/* Delivery Images */}
            {hasDeliveryProof && (
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">{t("bookingDetails.delivery")}</div>
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-2">
                  {viewDriver?.delivery_images?.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 flex-wrap">
                        {viewDriver?.delivery_images?.map((image: any) => {
                          return (
                            <div key={image} onClick={() => window.open(image, "_blank")}>
                              <img
                                src={image}
                                alt="driver-image"
                                className="w-16 h-16 object-cover rounded-xl cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {viewDriver?.delivery_comment && (
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-secondary">{t("bookingDetails.comments")}</div>
                      <div>{viewDriver?.delivery_comment}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Completed Images */}
            {/* {hasCompletedProof && (
              <div>
                <div className="text-sm font-semibold text-gray-700 my-2">{t("bookingDetails.completed")}</div>
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-2">
                  {viewDriver?.completed_images?.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 flex-wrap">
                        {viewDriver?.completed_images?.map((image: any) => {
                          return (
                            <div key={image} onClick={() => window.open(image, "_blank")}>
                              <img
                                src={image}
                                alt="driver-image"
                                className="w-16 h-16 object-cover rounded-xl cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {viewDriver?.completed_comment && (
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-secondary">{t("bookingDetails.comments")}</div>
                      <div>{viewDriver?.completed_comment}</div>
                    </div>
                  )}
                </div>
              </div>
            )} */}

            {/* Dump yard Images */}
            {/* {hasDumpYardProof && (
              <div>
                <div className="text-sm font-semibold text-gray-700 my-2">{t("bookingDetails.dumpYard")}</div>
                <div className="flex flex-col gap-4 pb-2">
                  {viewDriver?.dump_yard_images?.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 flex-wrap">
                        {viewDriver?.dump_yard_images?.map((image: any) => {
                          return (
                            <div key={image} onClick={() => window.open(image, "_blank")}>
                              <img
                                src={image}
                                alt="driver-image"
                                className="w-16 h-16 object-cover rounded-xl cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {viewDriver?.dump_yard_comment && (
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-secondary">{t("bookingDetails.comments")}</div>
                      <div>{viewDriver?.dump_yard_comment}</div>
                    </div>
                  )}
                </div>
              </div>
            )} */}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DriverImagesDialog;
