import { Button } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const FilterRemovalRequest: React.FC<{ selectedFilters: any; setSelectedFilters: any; setAnchorElId: any }> = ({
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
          <label className="text-gray-700 block mb-1">{t("common.binType")}</label>
          <select
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.binType}
            onChange={(e) => setLocalFilters({ ...localFilters, binType: e.target.value })}
          >
            <option value="">{t("common.allBinTypes")}</option>
            <option value="1">{t("common.small")}</option>
            <option value="2">{t("common.medium")}</option>
            <option value="3">{t("common.large")}</option>
          </select>
        </div>
        {/* <div className="mt-2">
          <label className="text-gray-700 block mb-1">Delivery Location</label>
          <input
            type="text"
            placeholder="Enter delivery location"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.deliveryLocation}
            onChange={(e) => setLocalFilters({ ...localFilters, deliveryLocation: e.target.value })}
          />
        </div> */}
        {/* <div className="mt-2">
          <label className="text-gray-700 block mb-1">Customer Name</label>
          <input
            type="text"
            placeholder="Enter customer name"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.customerName}
            onChange={(e) => setLocalFilters({ ...localFilters, customerName: e.target.value })}
          />
        </div> */}
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">{t("common.monthly")}</span>
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
          <span className="text-gray-700">{t("common.yearly")}</span>
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
          <label className="text-gray-700 block mb-1">{t("common.startDate")}</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.startDate}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, monthly: false, yearly: false, startDate: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">{t("common.endDate")}</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.endDate}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, monthly: false, yearly: false, endDate: e.target.value })
            }
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
          {t("common.apply")}
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
          {t("common.reset")}
        </Button>
      </div>
    </>
  );
};

export default FilterRemovalRequest;
