import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CrossIcon } from "../../../components/common/icons";
import { useTranslation } from "react-i18next";

const RemovalImagesDialog: React.FC<{
  showRemovalImagesDialog: boolean;
  setShowRemovalImagesDialog: any;
  images: any;
}> = ({ showRemovalImagesDialog, setShowRemovalImagesDialog, images }) => {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: {md: "50%", xs: "90%"}, maxHeight: 435, borderRadius: 4 } }}
        maxWidth="md"
        open={showRemovalImagesDialog}
      >
        <DialogTitle>
          <div className="flex justify-between items-center border-b border-gray-200">
            <div className="text-[16px] font-semibold md:text-lg">{t("bookingDetails.removalImages")}</div>
            <div>
              <IconButton
                onClick={() => {
                  setShowRemovalImagesDialog(false);
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
            {images?.length === 0 && <div className="text-center text-gray-500 py-4">{t("bookingDetails.noProof")}</div>}

            {images?.length > 0 && (
              <div>
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-2">
                  {images?.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 flex-wrap">
                        {images?.map((image: any) => {
                          return (
                            <div key={image} onClick={() => window.open(image, "_blank")}>
                              <img
                                src={image}
                                alt="removal-image"
                                className="w-16 h-16 object-cover rounded-xl cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RemovalImagesDialog;
