import { Button } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const FilterBooking: React.FC<{ selectedFilters: any; setSelectedFilters: any; setAnchorElId: any }> = ({
  selectedFilters,
  setSelectedFilters,
  setAnchorElId,
}) => {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState(
    selectedFilters ?? {
      binType: "",
      deliveryLocation: "",
      customerName: "",
      monthly: false,
      yearly: false,
      startDate: "",
      endDate: "",
    }
  );
  return (
    <>
      <div className="flex flex-col p-2 gap-2 h-90 overflow-y-auto">
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">{t("bookingRenewal.filter.binType")}</label>
          <select
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.binType}
            onChange={(e) => setLocalFilters({ ...localFilters, binType: e.target.value })}
          >
            <option value="">{t("bookingRenewal.filter.allBinTypes")}</option>
            <option value="1">{t("bookingRenewal.filter.small")}</option>
            <option value="2">{t("bookingRenewal.filter.medium")}</option>
            <option value="3">{t("bookingRenewal.filter.large")}</option>
          </select>
        </div>
        {/* <div className="mt-2">
          <label className="text-gray-700 block mb-1">{t("bookingRenewal.filter.deliveryLocation")}</label>
          <input
            type="text"
            placeholder={t("bookingRenewal.filter.deliveryLocationPlaceholder")}
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.deliveryLocation}
            onChange={(e) => setLocalFilters({ ...localFilters, deliveryLocation: e.target.value })}
          />
        </div> */}
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">{t("bookingRenewal.filter.customerName")}</label>
          <input
            type="text"
            placeholder={t("bookingRenewal.filter.customerNamePlaceholder")}
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.customerName}
            onChange={(e) => setLocalFilters({ ...localFilters, customerName: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">{t("bookingRenewal.filter.monthly")}</span>
          <input
            type="checkbox"
            checked={localFilters.monthly}
            onChange={() => {
              const currentMonthStart = dayjs().startOf("month");
              const currentMonthEnd = dayjs().endOf("month");

              setLocalFilters({
                ...localFilters,
                monthly: !localFilters.monthly,
                yearly: false,
                startDate: currentMonthStart.format("YYYY-MM-DD"),
                endDate: currentMonthEnd.format("YYYY-MM-DD"),
              });
            }}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">{t("bookingRenewal.filter.yearly")}</span>
          <input
            type="checkbox"
            checked={localFilters.yearly}
            onChange={() => {
              const currentYearStart = dayjs().startOf("year");
              const currentYearEnd = dayjs().endOf("year");

              setLocalFilters({
                ...localFilters,
                yearly: !localFilters.yearly,
                monthly: false,
                startDate: currentYearStart.format("YYYY-MM-DD"),
                endDate: currentYearEnd.format("YYYY-MM-DD"),
              });
            }}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">{t("bookingRenewal.filter.startDate")}</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.startDate}
            onChange={(e) => setLocalFilters({ ...localFilters, monthly: false, yearly: false, startDate: e.target.value })}
          />
        </div>
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">{t("bookingRenewal.filter.endDate")}</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.endDate}
            onChange={(e) => setLocalFilters({ ...localFilters, monthly: false, yearly: false, endDate: e.target.value })}
          />
        </div>

        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={() => {
            setSelectedFilters(localFilters);
            setAnchorElId(null);
          }}
        >
          {t("bookingRenewal.filter.applyButton")}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{ marginTop: 1 }}
          onClick={() => {
            setSelectedFilters({
              binType: "",
              deliveryLocation: "",
              customerName: "",
              monthly: false,
              yearly: false,
              startDate: "",
              endDate: "",
            });
            setLocalFilters({
              binType: "",
              deliveryLocation: "",
              customerName: "",
              monthly: false,
              yearly: false,
              startDate: "",
              endDate: "",
            });
            setAnchorElId(null);
          }}
        >
          {t("bookingRenewal.filter.resetButton")}
        </Button>
      </div>
    </>
  );
};

export default FilterBooking;
