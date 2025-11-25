import { useState } from "react";
import RentalAgreementTab from "./RentalAgreementTab";
import BookingStatus from "./BookingStatus";
import GracePeriod from "../GracePeriod";
import BookingRenewalRequest from "../BookingRenewalRequest";
import { useTranslation } from "react-i18next";
import BookingRemovalRequest from "../BookingRemovalRequest";
import BookingReplacementRequest from "../BookingReplacementRequest";

const TabsBooking: React.FC<{ bookingDetailData: any }> = ({ bookingDetailData }) => {
  const { t } = useTranslation();
  const [bookingTab, setBookingTab] = useState("bookingStatus");

  // Helper function to determine request status color
  const getRequestStatus = (requestArray: any[], statusField: string = "status") => {
    if (!requestArray || requestArray.length === 0) return null;

    // Check for pending requests first (highest priority)
    const hasPending = requestArray.some((request) => {
      const status = request[statusField];
      return status === "pending" || (status !== "approved" && status !== "rejected" && status !== "completed");
    });
    if (hasPending) return "pending"; // Warning color

    // Check for approved/accepted requests
    const hasApproved = requestArray.some((request) => {
      const status = request[statusField];
      return status === "approved";
    });
    if (hasApproved) return "approved"; // Green color

    // Check for rejected requests
    const hasRejected = requestArray.some((request) => {
      const status = request[statusField];
      return status === "rejected";
    });
    if (hasRejected) return "rejected"; // Red color

    return null;
  };

  const bookingTabs = [
    { id: "bookingStatus", label: t("bookingDetails.bookingStatus"), active: true },
    { id: "rentalAgreement", label: t("bookingDetails.rentalAgreement"), active: false },
    {
      id: "gracePeriod",
      label: t("bookingDetails.gracePeriod"),
      active: false,
      requestStatus: getRequestStatus(bookingDetailData?.bookingGracePeriodRequest, "status"),
    },
    {
      id: "bookingRenewal",
      label: t("bookingDetails.bookingRenewal"),
      active: false,
      requestStatus: getRequestStatus(bookingDetailData?.bookingRenewalRequest, "status"),
    },
    {
      id: "removalRequest",
      label: t("bookingDetails.removalRequest"),
      active: false,
      requestStatus: getRequestStatus(bookingDetailData?.bookingRemovalRequest, "status"),
    },
    {
      id: "replacementRequest",
      label: t("bookingDetails.replacementRequest"),
      active: false,
      requestStatus: getRequestStatus(bookingDetailData?.bookingReplacementRequest, "replace_request_status"),
    },
  ];

  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] mb-4">
        <div className="flex border-b border-gray-200 mb-5 2xl:px-7 md:px-4 px-3 overflow-auto">
          {bookingTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setBookingTab(tab.id)}
              className={`sm:px-3 px-2 py-2.5 md:text-sm/tight text-xs/tight font-medium border-b-2 mb-1 transition-colors duration-200 cursor-pointer relative ${
                bookingTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent hover:text-primary hover:border-primary"
              }`}
            >
              {tab.label}
              {tab.requestStatus && (
                <span
                  className={`absolute top-1 right-2 w-2 h-2 rounded-full ${
                    tab.requestStatus === "pending"
                      ? "bg-[#FF8228]"
                      : tab.requestStatus === "approved"
                      ? "bg-[#28c76f]"
                      : "bg-[#ea5455]"
                  }`}
                ></span>
              )}
            </button>
          ))}
        </div>
        <div className="mb-6 2xl:px-7 md:px-4 px-3">
          {bookingTab === "bookingStatus" && <BookingStatus bookingDetailData={bookingDetailData} />}
          {bookingTab === "rentalAgreement" && <RentalAgreementTab bookingDetailData={bookingDetailData} />}
          {bookingTab === "gracePeriod" && <GracePeriod bookingDetailData={bookingDetailData} />}
          {bookingTab === "bookingRenewal" && <BookingRenewalRequest bookingDetailData={bookingDetailData} />}
          {bookingTab === "removalRequest" && <BookingRemovalRequest bookingDetailData={bookingDetailData} />}
          {bookingTab === "replacementRequest" && <BookingReplacementRequest bookingDetailData={bookingDetailData} />}
        </div>
      </div>
    </>
  );
};
export default TabsBooking;
