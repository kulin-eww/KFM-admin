import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { detailsBookingAPI } from "../../../api/booking";
import AssignDriver from "../AssignDriver";
import TabsBooking from "../TabsBooking";
import RentalSummary from "../RentalSummary";
import PaymentMethod from "../PaymentMethod";
import AcceptCancelDialog from "./AcceptCancelDialog";
import BasicBookingDetail from "./BasicBookingDetail";
import Loader from "../../../components/Loader/Loader";
import ErrorLottie from "../../../components/lottie/ErrorLottie";
import CancellationInfo from "../CancellationInfo";
import { BOOKING_STATUS } from "../../../utils/constant";
import SelectDumpYard from "./SelectDumpYard";
import RatingsReviews from "../RatingsReviews";
import AssignDriverForPickup from "../AssignDriverForPickup";
import LateDeliveries from "../LateDeliveries";
import RejectionInfo from "../RejectionInfo";
// import AssignBin from "../AssignBin";

const DetailBooking = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingDetailStatus, setBookingDetailStatus] = useState<"accepted" | "rejected" | "cancelled" | "">("");

  const [bookingDetailData, setBookingDetailData] = useState<any>({});
  const [isDumpYardSelected, setIsDumpYardSelected] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ["detailsBooking", id],
    queryFn: () => {
      setIsLoading(true);
      return detailsBookingAPI(id);
    },
    enabled: !!id,
  });

  // useEffect(() => {
  //   if (isFetching) {
  //     setIsLoading(true);
  //   }
  //   if(!isFetching) {
  //     setIsLoading(false);
  //   }
  // }, [isFetching]);

  useEffect(() => {
    if (isSuccess && data) {
      setBookingDetailData(data?.data);
      setIsLoading(false);
      // Initialize dump yard selection state
      const hasDumpYard = data?.data?.dump_yard_id && data?.data?.dump_yard_id !== "default";
      setIsDumpYardSelected(hasDumpYard);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError, dataUpdatedAt]);

  const handleOpenDialogue = (status: "accepted" | "rejected" | "cancelled") => {
    setOpenDialog(true);
    setBookingDetailStatus(status);
  };

  const handleDumpYardChange = (isSelected: boolean) => {
    setIsDumpYardSelected(isSelected);
  };

  return (
    <>
      <div className="min-h-screen">
        {isLoading && (
          <div className="flex justify-center items-center h-full rounded-3xl shadow-[0px_0px_8px_-2px_#00000014] bg-white">
            <Loader />
          </div>
        )}
        {isSuccess && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:gap-7.5 xl:gap-6 gap-4 p-4 rounded-3xl shadow-[0px_0px_8px_-2px_#00000014] bg-white">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <BasicBookingDetail bookingDetailData={bookingDetailData} handleOpenDialogue={handleOpenDialogue} />
              <SelectDumpYard
                bookingDetailData={bookingDetailData}
                disabled={
                  bookingDetailData?.booking_status === BOOKING_STATUS.CANCELLED ||
                  bookingDetailData?.booking_status === BOOKING_STATUS.REJECTED ||
                  bookingDetailData?.booking_status === BOOKING_STATUS.COMPLETED ||
                  bookingDetailData?.bookingStatuses?.some(
                    (item) => item.status === "pickedup" && item.is_status === true
                  )
                }
                onDumpYardChange={handleDumpYardChange}
              />
              <span className="pt-4 h-1 w-full block mb-4 border-b border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]"></span>
              {bookingDetailData?.reject_reason && (
                <RejectionInfo bookingDetailData={bookingDetailData} />
              )}
              {bookingDetailData?.booking_status === BOOKING_STATUS.CANCELLED &&
                bookingDetailData?.cancel_by === "vendor" && <CancellationInfo bookingDetailData={bookingDetailData} />}
              <RentalSummary bookingDetailData={bookingDetailData} />
              <TabsBooking bookingDetailData={bookingDetailData} />
              <PaymentMethod bookingDetailData={bookingDetailData} />
              <RatingsReviews bookingDetailData={bookingDetailData} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-4">
              {/* <h2 className="font-medium text-lg text-[#363636] mb-2.5">Assign Container: 9</h2> */}
              {/* <AssignBin /> */}
              {/* Assign Driver */}
              <AssignDriver
                bookingDetailData={bookingDetailData}
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
                isDumpYardSelected={isDumpYardSelected}
              />
              {bookingDetailData?.driverWisePickupContainers.length > 0 && (
                <AssignDriverForPickup
                  bookingDetailData={bookingDetailData}
                  isSuccess={isSuccess}
                  isLoading={isLoading}
                  isError={isError}
                />
              )}
              {bookingDetailData?.driverWiseLateDeliveries?.length > 0 && (
                <LateDeliveries driverWiseLateDeliveries={bookingDetailData?.driverWiseLateDeliveries} />
              )}
            </div>
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center h-full rounded-3xl shadow-[0px_0px_8px_-2px_#00000014] bg-white">
            <ErrorLottie />
          </div>
        )}
      </div>
      {openDialog && (
        <AcceptCancelDialog
          openDialog={openDialog}
          setOpenDialog={() => setOpenDialog(false)}
          bookingId={id}
          bookingDetailStatus={bookingDetailStatus}
        />
      )}
    </>
  );
};
export default DetailBooking;
