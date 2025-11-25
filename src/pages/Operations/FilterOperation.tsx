import { Button } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const FilterOperation: React.FC<{ selectedFilters: any; setSelectedFilters: any; setAnchorElId: any }> = ({
  selectedFilters,
  setSelectedFilters,
  setAnchorElId,
}) => {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState(
    selectedFilters ?? {
      weekly: false,
      monthly: false,
      yearly: false,
      fromDate: "",
      toDate: "",
    }
  );
  return (
    <>
      <div className="flex flex-col p-2 gap-2 h-90 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">{t("booking.filter.weekly")}</span>
          <input
            type="checkbox"
            checked={localFilters.weekly}
            onChange={() => {
              const currentWeekStart = dayjs().startOf("week");
              const currentWeekEnd = dayjs().endOf("week");

              setLocalFilters({
                ...localFilters,
                weekly: !localFilters.weekly,
                monthly: false,
                yearly: false,
                fromDate: currentWeekStart.format("YYYY-MM-DD"),
                toDate: currentWeekEnd.format("YYYY-MM-DD"),
              });
            }}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">{t("booking.filter.monthly")}</span>
          <input
            type="checkbox"
            checked={localFilters.monthly}
            onChange={() => {
              const currentMonthStart = dayjs().startOf("month");
              const currentMonthEnd = dayjs().endOf("month");

              setLocalFilters({
                ...localFilters,
                monthly: !localFilters.monthly,
                weekly: false,
                yearly: false,
                fromDate: currentMonthStart.format("YYYY-MM-DD"),
                toDate: currentMonthEnd.format("YYYY-MM-DD"),
              });
            }}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">{t("booking.filter.yearly")}</span>
          <input
            type="checkbox"
            checked={localFilters.yearly}
            onChange={() => {
              const currentYearStart = dayjs().startOf("year");
              const currentYearEnd = dayjs().endOf("year");

              setLocalFilters({
                ...localFilters,
                yearly: !localFilters.yearly,
                weekly: false,
                monthly: false,
                fromDate: currentYearStart.format("YYYY-MM-DD"),
                toDate: currentYearEnd.format("YYYY-MM-DD"),
              });
            }}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">{t("booking.filter.fromDate")}</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.fromDate}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, monthly: false, yearly: false, fromDate: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">{t("booking.filter.toDate")}</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.toDate}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, monthly: false, yearly: false, toDate: e.target.value })
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
          {t("booking.filter.applyButton")}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{ marginTop: 1 }}
          onClick={() => {
            setSelectedFilters({
              upcoming: false,
              ongoing: false,
              monthly: false,
              yearly: false,
              fromDate: "",
              toDate: "",
            });
            setLocalFilters({
              upcoming: false,
              ongoing: false,
              monthly: false,
              yearly: false,
              fromDate: "",
              toDate: "",
            });
            setAnchorElId(null);
          }}
        >
          {t("booking.filter.resetButton")}
        </Button>
      </div>
    </>
  );
};

export default FilterOperation;
