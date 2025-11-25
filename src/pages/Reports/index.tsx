import { useMemo, useState } from "react";
import BookingSummary from "./tabs/BookingSummary";
import DriverAdded from "./tabs/DriverAdded";
import MyPenalties from "./tabs/MyPenalties";
import ContainerUsage from "./tabs/ContainerUsage";
import HeaderReport from "./HeaderReport";
import CardTabReport from "./CardTabReport";
import { useTranslation } from "react-i18next";
import Replacement from "./tabs/Replacement";
import Removal from "./tabs/Removal";
import LateDeliveries from "./tabs/LateDeliveries";
import { useMutation } from "@tanstack/react-query";
import { exportReportAPI } from "../../api/report";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { downloadFile } from "../../utils/functions";

type TabKey = "booking" | "driver" | "penalties" | "container_usage" | "replacement" | "removal" | "late_delivery";

const Reports = () => {
  const { t } = useTranslation();
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const debouncedSearch = useDebounce(globalSearch, 400);
  const [active, setActive] = useState<TabKey>("booking");
  const [selectedFilters, setSelectedFilters] = useState<any>(null);

  const tabs = useMemo(
    () => [
      { key: "booking" as TabKey, label: t("reports.tabs.bookingSummary") },
      { key: "driver" as TabKey, label: t("reports.tabs.driverAdded") },
      { key: "penalties" as TabKey, label: t("reports.tabs.myPenalties") },
      // { key: "container_usage" as TabKey, label: t("reports.tabs.containerUsage") },
      { key: "replacement" as TabKey, label: t("reports.tabs.replacement") },
      { key: "removal" as TabKey, label: t("reports.tabs.removal") },
      { key: "late_delivery" as TabKey, label: t("reports.tabs.lateDeliveries") },
    ],
    [t]
  );

  const handleReportExport = useMutation({
    mutationFn: () => {
      return exportReportAPI({ search: debouncedSearch, selectedFilters, report_type: active });
    },
    onSuccess: (data) => {
      downloadFile(data, `${active}.xlsx`)
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
        <HeaderReport
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleReportExport={handleReportExport}
        />
        <CardTabReport tabs={tabs} active={active} setActive={setActive} />
        {active === "booking" && <BookingSummary selectedFilters={selectedFilters} />}
        {active === "driver" && <DriverAdded selectedFilters={selectedFilters} />}
        {active === "penalties" && <MyPenalties selectedFilters={selectedFilters} />}
        {active === "container_usage" && <ContainerUsage selectedFilters={selectedFilters} />}
        {active === "replacement" && <Replacement selectedFilters={selectedFilters} />}
        {active === "removal" && <Removal selectedFilters={selectedFilters} />}
        {active === "late_delivery" && <LateDeliveries selectedFilters={selectedFilters} />}
      </div>
    </>
  );
};

export default Reports;
