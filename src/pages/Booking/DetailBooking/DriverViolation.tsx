import { useTranslation } from "react-i18next";
import { AlertIcon } from "../../../components/common/icons";

const DriverViolation: React.FC<{ bookingDetailData: any; handleTrackDriverDialog: any }> = ({
  bookingDetailData,
  handleTrackDriverDialog,
}) => {
  const { t } = useTranslation();
  return (
    <>
      {bookingDetailData?.driverViolation?.length > 0 && (
        <div
          // className="w-full"
          className="w-full max-h-[250px] overflow-y-scroll"
          style={{
            scrollbarWidth: "thin", // Firefox
            scrollbarColor: "#EF4444 #F3F4F6", // thumb color | track color
          }}
        >
          {bookingDetailData?.driverViolation?.map((item: any) => {
            return (
              <>
                <div className="w-full flex justify-between rounded-xl bg-[#FFAAAA1A] p-4 my-2">
                  <div className="flex items-center gap-2">
                    <div>
                      <AlertIcon className="w-20 h-20" />
                    </div>
                    <div className="flex flex-col items-between gap-2">
                      <p className="text-sm font-medium text-red-500">{t("bookingDetails.actionRequired")}</p>
                      <p className="text-sm font-medium">
                        {/* <span className="mr-1">ID: {}</span> */}
                        {/* | */}
                        <span className="text-primary ml-1">{t("bookingDetails.driver")}: {item?.driver?.name}</span>
                      </p>
                      <p className="text-sm font-medium">{t("bookingDetails.reason")}: {item?.reason}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div
                      className="text-sm font-medium text-red-500 underline cursor-pointer"
                      onClick={() => handleTrackDriverDialog(item?.driver?.id)}
                    >
                      {t("bookingDetails.trackDriver")}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DriverViolation;
