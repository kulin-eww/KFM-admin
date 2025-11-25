import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import ListEarnings from "./ListEarnings";
import HeaderEarnings from "./HeaderEarnings";
import CardEarning from "./CardEarning";
import { listEarningAPI } from "../../api/earning";

const Earnings = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [earningsData, setEarningsData] = useState([]);
  const [earningStats, setEarningStats] = useState({});
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 400);
  const [selectedFilters, setSelectedFilters] = useState({
    weekly: false,
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listEarning", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listEarningAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setEarningsData(data?.data?.earnings);
      setEarningStats(data?.data?.stats);
      setTotalCount(data?.data?.pagination?.total);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
      <HeaderEarnings selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <CardEarning earningStats={earningStats} />
      <ListEarnings
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={earningsData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </div>
  );
};

export default Earnings;
