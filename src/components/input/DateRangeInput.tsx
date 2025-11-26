import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css
import "react-date-range/dist/theme/default.css"; // theme css
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const DateRangeInput = ({ range, setRange, disablePastDates = false, disabled = false }) => {
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div ref={containerRef} className="relative ms-auto">
      {/* Date display with button */}
      <div
        onClick={() => !disabled && setShowPicker(!showPicker)}
        className={`bg-white md:px-4 px-3 lg:py-3 md:py-2.5 py-2 rounded-2xl flex items-center justify-between lg:gap-4 gap-2 text-black-100 text-sm/4 font-semibold ms-auto ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {`${format(range[0].startDate, "dd MMM yy")} – ${format(range[0].endDate, "dd MMM yy")}`}
        <button type="button" className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.3333 1.6665V4.99984M6.66663 1.6665V4.99984"
              stroke="#101010"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8333 3.3335H9.16667C6.02397 3.3335 4.45262 3.3335 3.47631 4.3098C2.5 5.28612 2.5 6.85746 2.5 10.0002V11.6668C2.5 14.8095 2.5 16.3809 3.47631 17.3572C4.45262 18.3335 6.02397 18.3335 9.16667 18.3335H10.8333C13.976 18.3335 15.5474 18.3335 16.5237 17.3572C17.5 16.3809 17.5 14.8095 17.5 11.6668V10.0002C17.5 6.85746 17.5 5.28612 16.5237 4.3098C15.5474 3.3335 13.976 3.3335 10.8333 3.3335Z"
              stroke="#101010"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 8.3335H17.5"
              stroke="#101010"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.99621 11.6665H10.0037M9.99621 14.9998H10.0037M13.3258 11.6665H13.3333M6.66663 11.6665H6.6741M6.66663 14.9998H6.6741"
              stroke="#101010"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Date Picker dropdown */}
      {showPicker && !disabled && (
        <div className="absolute end-0 mt-1.5 z-50 rounded-xl bg-white shadow-[0px_0px_24px_-4px_#C1D5DB66] border border-[#F3F1EF] overflow-hidden flex sm:flex-row flex-wrap-reverse justify-between sm:min-w-[429px] sm:max-w-[429px] min-w-[280px] max-w-[280px]">
          <div className="flex flex-col justify-between pe-4 text-sm font-medium text-gray-700 gap-1.5 p-4 min-w-[145px] sm:pt-4 pt-0">
            <div className="flex sm:flex-col flex-wrap sm:gap-1.5 gap-x-3 gap-0.5">
              <button
                onClick={() => setRange([{ startDate: new Date(), endDate: new Date(), key: "selection" }])}
                className="text-base font-medium text-black-100 text-start"
              >
                Today
              </button>
              <button
                disabled={disablePastDates}
                className={`text-base font-medium text-black-100 text-start cursor-pointer ${disablePastDates ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() =>
                  setRange([
                    {
                      startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
                      endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
                      key: "selection",
                    },
                  ])
                }
              >
                Yesterday
              </button>
              <button
                className={`text-base font-medium text-black-100 text-start cursor-pointer ${disablePastDates ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                disabled={disablePastDates}
                onClick={() => {
                  const today = new Date();
                  // Get the last Sunday (start of last week)
                  const lastSunday = new Date(today);
                  lastSunday.setDate(today.getDate() - today.getDay() - 7);
                  lastSunday.setHours(0, 0, 0, 0);

                  // Get the last Saturday (end of last week)
                  const lastSaturday = new Date(lastSunday);
                  lastSaturday.setDate(lastSunday.getDate() + 6);
                  lastSaturday.setHours(23, 59, 59, 999);
                  setRange([
                    {
                      startDate: lastSunday,
                      endDate: lastSaturday,
                      key: "selection",
                    },
                  ]);
                }}
              >
                Last Week
              </button>
              <button
                className={`text-base font-medium text-black-100 text-start cursor-pointer ${disablePastDates ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                disabled={disablePastDates}
                onClick={() => {
                  const today = new Date();

                  // Get the first day of the current month
                  const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

                  // Get the first day of the last month
                  const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

                  // Get the last day of the last month
                  const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
                  lastDayOfLastMonth.setHours(23, 59, 59, 999);

                  setRange([
                    {
                      startDate: firstDayOfLastMonth,
                      endDate: lastDayOfLastMonth,
                      key: "selection",
                    },
                  ]);
                }}
              >
                Last Month
              </button>
              <button
                className={`text-base font-medium text-black-100 text-start cursor-pointer ${disablePastDates ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                disabled={disablePastDates}
                onClick={() => {
                  const today = new Date();
                  const currentMonth = today.getMonth(); // 0 = Jan, 11 = Dec

                  // Determine the current quarter (0–3)
                  const currentQuarter = Math.floor(currentMonth / 3);

                  // Determine the previous quarter (wrap around to previous year if needed)
                  const lastQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1;
                  const yearOfLastQuarter = currentQuarter === 0 ? today.getFullYear() - 1 : today.getFullYear();

                  // Calculate the first and last days of the last quarter
                  const startMonth = lastQuarter * 3; // quarter start month (0, 3, 6, 9)
                  const startDate = new Date(yearOfLastQuarter, startMonth, 1);
                  startDate.setHours(0, 0, 0, 0);

                  const endDate = new Date(yearOfLastQuarter, startMonth + 3, 0);
                  endDate.setHours(23, 59, 59, 999);

                  setRange([
                    {
                      startDate,
                      endDate,
                      key: "selection",
                    },
                  ]);
                }}
              >
                Last Quarter
              </button>
            </div>
            <button
              className="text-base font-medium text-primary text-start cursor-pointer"
              onClick={() => setRange([{ startDate: new Date(), endDate: new Date(), key: "selection" }])}
            >
              Reset
            </button>
          </div>

          {/* Calendar */}
          <div className="sm:ps-4 px-4 py-4 sm:w-[calc(100%-161px)] w-full">
            <DateRange
              onChange={(item) => setRange([item.selection])}
              // showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={range}
              direction="horizontal"
              editableDateInputs={!disabled}
              className="w-full relative"
              minDate={disablePastDates ? new Date() : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeInput;