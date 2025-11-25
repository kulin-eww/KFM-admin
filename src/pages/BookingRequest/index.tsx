import { useMemo, useState } from "react";
// import BookingSummary from "./tabs/BookingSummary";
// import DriverAdded from "./tabs/DriverAdded";
// import MyPenalties from "./tabs/MyPenalties";
// import ContainerUsage from "./tabs/ContainerUsage";
import { useTranslation } from "react-i18next";
// import Replacement from "./tabs/Replacement";
// import Removal from "./tabs/Removal";
// import LateDeliveries from "./tabs/LateDeliveries";
import { useMutation } from "@tanstack/react-query";
import { exportReportAPI } from "../../api/report";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import HeaderBookingRequest from "./HeaderBookingRequest";
import CardTabRequest from "./CardTabRequest";
import EarlyPickup from "../EarlyPickup";
import GracePeriod from "../GracePeriod";
import BookingRenewal from "../BookingRenewal";
import ReplacementRequest from "../ReplacementRequest";
import RemovalRequest from "../RemovalRequest";

const BookingRequest = () => {
  const { t } = useTranslation();
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const debouncedSearch = useDebounce(globalSearch, 400);
  const [searchParams] = useSearchParams();
  const active = searchParams.get("active") || "grace_period";
  const [selectedFilters, setSelectedFilters] = useState<any>(null);

  const tabs = useMemo(
    () => [
      { key: "grace_period", label: t("bookingRequest.tabs.gracePeriod") },
      { key: "booking_renewal", label: t("bookingRequest.tabs.bookingRenewal") },
      { key: "removal", label: t("bookingRequest.tabs.removal") },
      { key: "replacement", label: t("bookingRequest.tabs.replacement") },
    ],
    [t]
  );

  const handleReportExport = useMutation({
    mutationFn: () => {
      return exportReportAPI({ search: debouncedSearch, selectedFilters, report_type: active });
    },
    onSuccess: (data) => {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${active}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
        {/* <HeaderBookingRequest
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleReportExport={handleReportExport}
        /> */}
        <CardTabRequest tabs={tabs} active={active} />
        {active === "grace_period" && <GracePeriod />}
        {active === "booking_renewal" && <BookingRenewal />}
        {active === "removal" && <RemovalRequest />}
        {active === "replacement" && <ReplacementRequest />}
      </div>
    </>
  );
};

export default BookingRequest;
