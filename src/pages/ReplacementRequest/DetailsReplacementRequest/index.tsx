import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { detailsBookingAPI } from "../../../api/booking";
import RentalSummary from "../../Booking/RentalSummary";
import Loader from "../../../components/Loader/Loader";
import ErrorLottie from "../../../components/lottie/ErrorLottie";
import CancellationInfo from "../../Booking/CancellationInfo";
import { BOOKING_STATUS } from "../../../utils/constant";
import { detailsReplacementRequestAPI } from "../../../api/replacementRequest";
import BasicBookingDetail from "./BasicBookingDetails";
import AcceptCancelDialog from "./AcceptCancelDialog";
import SelectDumpYard from "../../Booking/DetailBooking/SelectDumpYard";
import AssignBin from "../AssignBin";
import AssignDriver from "../AssignDriver";
import PaymentMethod from "../PaymentMethod";
// import AssignBin from "../AssignBin";

const DetailReplacementRequest = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingDetailStatus, setBookingDetailStatus] = useState<"approved" | "rejected" | "cancelled" | "">("");

  const [bookingDetailData, setBookingDetailData] = useState<any>({});
  const [replacementRequestDetailData, setReplacementRequestDetailData] = useState<any>({});

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

  const handleDetailsReplacementRequest = useQuery({
    queryKey: ["detailsReplacementRequest", id],
    queryFn: () => {
      setIsLoading(true);
      return detailsReplacementRequestAPI(id);
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
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError, dataUpdatedAt]);

  useEffect(() => {
    if (handleDetailsReplacementRequest.isSuccess && handleDetailsReplacementRequest.data) {
      setReplacementRequestDetailData(handleDetailsReplacementRequest.data?.data);
      setIsLoading(false);
    } else if (handleDetailsReplacementRequest.isError) {
      setIsLoading(false);
    }
  }, [
    handleDetailsReplacementRequest.isSuccess,
    handleDetailsReplacementRequest.data,
    handleDetailsReplacementRequest.isError,
    handleDetailsReplacementRequest.dataUpdatedAt,
  ]);

  const handleOpenDialogue = (status: "approved" | "rejected" | "cancelled") => {
    setOpenDialog(true);
    setBookingDetailStatus(status);
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
          <div className="grid grid-cols-1 lg:grid-cols-5 2xl:gap-7.5 xl:gap-6 gap-4 p-4 rounded-3xl shadow-[0px_0px_8px_-2px_#00000014] bg-white">
            {/* Left Column */}
            <div className="lg:col-span-3">
              <BasicBookingDetail
                bookingDetailData={bookingDetailData}
                replacementRequestDetailData={replacementRequestDetailData}
                handleOpenDialogue={handleOpenDialogue}
              />
              <SelectDumpYard bookingDetailData={bookingDetailData} disabled={true} />
              <span className="pt-4 h-1 w-full block mb-4 border-b border-[transparent] [border-image-source:linear-gradient(90deg,rgba(223,223,223,0)_0%,#DFDFDF_47.12%,rgba(223,223,223,0)_100%)] [border-image-slice:1]"></span>
              {bookingDetailData?.booking_status === BOOKING_STATUS.CANCELLED && (
                <CancellationInfo bookingDetailData={bookingDetailData} />
              )}
              <RentalSummary bookingDetailData={bookingDetailData} />
              {/* <TabsBooking bookingDetailData={bookingDetailData} /> */}
              <PaymentMethod replacementRequestDetailData={replacementRequestDetailData} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* <h2 className="font-medium text-lg text-[#363636] mb-2.5">Assign Container: 9</h2> */}
              <AssignBin replacementRequestDetailData={replacementRequestDetailData} />
              {/* Assign Driver */}
              <AssignDriver
                bookingDetailData={bookingDetailData}
                replacementRequestDetailData={replacementRequestDetailData}
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
              />
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
export default DetailReplacementRequest;
