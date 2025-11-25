import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const SelectedDriver: React.FC<{ replacementRequestDetailData: any; selectedDrivers: any; selectedBins: any }> = ({
  replacementRequestDetailData,
  selectedDrivers,
  selectedBins,
}) => {
  const {t} = useTranslation()
  return (
    <>
      {selectedDrivers?.map((driver: any, index: number) => {
        return (
          <div key={index} className="w-full p-2.5 bg-[#F7F7F7] rounded-lg px-3 mt-2">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-sm font-medium">{driver?.name}</p>
              <p className="text-sm font-medium text-[#568BFF] underline cursor-pointer">{driver?.phone}</p>
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
            <div className="mt-4 space-y-4">
              {replacementRequestDetailData?.driverWiseImages?.map((driverImages: any, index: number) => {
                return (
                  <Fragment key={index}>
                    {driverImages?.id === driver?.id && (
                      <>
                        {/* Delivery Images */}
                        <div className="flex gap-4">
                          {driverImages?.delivery_images?.length > 0 && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">{t("deliveryImages")}</div>
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

                        {/* Completed Images */}
                        <div className="flex gap-4">
                          {driverImages?.completed_images?.length > 0 && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">Completed Images</div>
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
                          {driverImages?.completed_comment && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">Comments</div>
                              <div className="">{driverImages?.completed_comment}</div>
                            </div>
                          )}
                        </div>

                        {/* Dump yard Images */}
                        <div className="flex gap-4">
                          {driverImages?.dump_yard_images?.length > 0 && (
                            <div className="flex flex-col gap-2 w-1/2">
                              <div className="text-sm font-medium text-secondary">Dump yard Images</div>
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
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SelectedDriver;
