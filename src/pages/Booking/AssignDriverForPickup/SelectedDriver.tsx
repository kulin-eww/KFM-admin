import { useEffect, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import DriverImagesDialog from "./DriverImagesDialog";

const SelectedDriver: React.FC<{ bookingDetailData: any; selectedDrivers: any; selectedBins: any }> = ({
  bookingDetailData,
  selectedDrivers,
  selectedBins,
}) => {
  const { t } = useTranslation();
  const [showDriverImagesDialog, setShowDriverImagesDialog] = useState(false);
  const [viewDriver, setViewDriver] = useState(null);
  return (
    <>
      {selectedDrivers?.map((driver: any, index: number) => {
        return (
          <div key={index} className="w-full p-2.5 bg-[#F7F7F7] rounded-lg px-3 mt-2">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-sm font-medium">{driver?.name}</p>
              <p className="text-sm font-medium text-[#568BFF] underline cursor-pointer">{driver?.phone}</p>
              {bookingDetailData?.bookingStatuses?.some(
                (item) => item.status === "pickedup" && item.is_status === true
              ) && (
                <p
                  className="text-sm font-medium text-[#568BFF] underline cursor-pointer whitespace-nowrap"
                  onClick={() => {
                    const driverObj = bookingDetailData?.pickupDriverWiseImages?.find((d: any) => d.id === driver?.id);
                    setViewDriver(driverObj);
                    setShowDriverImagesDialog(true);
                  }}
                >
                  {t("bookingDetails.viewProof")}
                </p>
              )}
            </div>
            {/* <div className="flex gap-1 mt-2"> */}
            <div
              className="flex gap-1 mt-2 max-h-[72px] overflow-x-scroll"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {selectedBins?.map((bin: any, idx: number) => {
                return bin?.driver_id === driver?.id ? (
                  <div key={idx} className="bg-[#EDEDED] rounded-sm px-6 py-1 text-sm text-primary font-medium">
                    {bin?.container_code}
                  </div>
                ) : null;
              })}
            </div>
            {/* <div className="mt-4 space-y-4">
              {bookingDetailData?.driverWiseImages?.map((driverImages: any, index: number) => {
                return (
                  <Fragment key={index}>
                    {driverImages?.id === driver?.id && (
                      <>
                        <div className="flex gap-4">
                          {driverImages?.delivery_images?.length > 0 && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">
                                {t("bookingDetails.deliveryImages")}
                              </div>
                              <div className="flex gap-2">
                                {driverImages?.delivery_images?.map((image: any) => {
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
                          {driverImages?.delivery_comment && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">Comments</div>
                              <div className="">{driverImages?.delivery_comment}</div>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-4">
                          {driverImages?.completed_images?.length > 0 && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">Completed Images</div>
                              <div className="flex gap-2">
                                {driverImages?.completed_images?.map((image: any) => {
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
                          {driverImages?.completed_comment && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">Comments</div>
                              <div className="">{driverImages?.completed_comment}</div>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-4">
                          {driverImages?.dump_yard_images?.length > 0 && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">Dump yard Images</div>
                              <div className="flex gap-2">
                                {driverImages?.dump_yard_images?.map((image: any) => {
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
                          {driverImages?.dump_yard_comment && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">Comments</div>
                              <div className="">{driverImages?.dump_yard_comment}</div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </Fragment>
                );
              })}
            </div> */}
          </div>
        );
      })}
      {showDriverImagesDialog && (
        <DriverImagesDialog
          showDriverImagesDialog={showDriverImagesDialog}
          setShowDriverImagesDialog={setShowDriverImagesDialog}
          viewDriver={viewDriver}
        />
      )}
    </>
  );
};

export default SelectedDriver;
