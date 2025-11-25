import { useEffect, useState } from "react";
import HeaderPenalty from "./HeaderPenalty";
import ListPenalty from "./ListPenalty";
import CardPenalty from "./CardPenalty";
import { listPenaltyPaymentsAPI } from "../../api/penalty";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";

const PenaltyPayment = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const debouncedSearch = useDebounce(globalSearch, 400);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [penaltyData, setPenaltyData] = useState([]);
  const [penaltyStats, setPenaltyStats] = useState({});
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    weekly: false,
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listPenaltyPayments", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listPenaltyPaymentsAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setPenaltyData(data?.data?.penalties);
      setPenaltyStats(data?.data?.stats);
      setTotalCount(data?.data?.pagination?.total);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
      <HeaderPenalty selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <CardPenalty penaltyStats={penaltyStats} />
      <ListPenalty
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={penaltyData}
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

export default PenaltyPayment;
