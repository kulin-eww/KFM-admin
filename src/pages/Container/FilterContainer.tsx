import { Button } from "@mui/material";

const FilterContainer: React.FC<{ selectedFilters: any; setSelectedFilters: any }> = ({
  selectedFilters,
  setSelectedFilters,
}) => {
  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
        <span className="text-secondary">Upcoming</span>
        <input
          type="checkbox"
          checked={selectedFilters.upcoming}
          onChange={() => setSelectedFilters({ ...selectedFilters, upcoming: !selectedFilters.upcoming })}
          className="h-5 w-5 accent-primary rounded-md cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
        <span className="text-secondary">Ongoing</span>
        <input
          type="checkbox"
          checked={selectedFilters.ongoing}
          onChange={() => setSelectedFilters({ ...selectedFilters, ongoing: !selectedFilters.ongoing })}
          className="h-5 w-5 accent-primary rounded-md cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
        <span className="text-secondary">Monthly</span>
        <input
          type="checkbox"
          checked={selectedFilters.monthly}
          onChange={() => setSelectedFilters({ ...selectedFilters, monthly: !selectedFilters.monthly })}
          className="h-5 w-5 accent-primary rounded-md cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 last:border-0 py-2">
        <span className="text-secondary">Yearly</span>
        <input
          type="checkbox"
          checked={selectedFilters.yearly}
          onChange={() => setSelectedFilters({ ...selectedFilters, yearly: !selectedFilters.yearly })}
          className="h-5 w-5 accent-primary rounded-md cursor-pointer"
        />
      </div>
      <div className="mt-2">
        <label className="text-secondary block mb-1">From Date</label>
        <input
          type="date"
          className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
        />
      </div>
      <div className="mt-2">
        <label className="text-secondary block mb-1">To Date</label>
        <input
          type="date"
          className="w-full border rounded-lg p-2 text-secondary text-sm focus:ring focus:ring-green-300"
        />
      </div>

      <Button fullWidth variant="contained" sx={{ marginTop: 1 }}>
        Apply
      </Button>
    </>
  );
};

export default FilterContainer;
