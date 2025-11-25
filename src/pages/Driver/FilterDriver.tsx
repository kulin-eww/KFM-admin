import { Button } from "@mui/material";
import { useState } from "react";

const FilterDriver: React.FC<{ selectedFilters: any; setSelectedFilters: any, setAnchorElId: any }> = ({
  selectedFilters,
  setSelectedFilters,
  setAnchorElId
}) => {
  const [localFilters, setLocalFilters] = useState(selectedFilters ?? {
    upcoming: false,
    ongoing: false,
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });
  return (
    <>
      <div className="flex flex-col gap-2 h-90 overflow-y-auto sidebar-scroll">
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">Upcoming</span>
          <input
            type="checkbox"
            checked={localFilters.upcoming}
            onChange={() => setLocalFilters({ ...localFilters, upcoming: !localFilters.upcoming })}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">Ongoing</span>
          <input
            type="checkbox"
            checked={localFilters.ongoing}
            onChange={() => setLocalFilters({ ...localFilters, ongoing: !localFilters.ongoing })}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">Monthly</span>
          <input
            type="checkbox"
            checked={localFilters.monthly}
            onChange={() => setLocalFilters({ ...localFilters, monthly: !localFilters.monthly })}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
          <span className="text-gray-700">Yearly</span>
          <input
            type="checkbox"
            checked={localFilters.yearly}
            onChange={() => setLocalFilters({ ...localFilters, yearly: !localFilters.yearly })}
            className="h-5 w-5 accent-primary rounded-md cursor-pointer"
          />
        </div>
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">From Date</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.fromDate}
            onChange={(e) => setLocalFilters({ ...localFilters, fromDate: e.target.value })}
          />
        </div>
        <div className="mt-2">
          <label className="text-gray-700 block mb-1">To Date</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
            value={localFilters.toDate}
            onChange={(e) => setLocalFilters({ ...localFilters, toDate: e.target.value })}
          />
        </div>

        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={() => {
            setSelectedFilters(localFilters);
            setAnchorElId(null)
          }}
        >
          Apply
        </Button>

        <Button
          fullWidth
          variant="contained"
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
  })
          }}
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default FilterDriver;
