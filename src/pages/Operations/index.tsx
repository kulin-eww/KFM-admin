import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { listDriverAPI } from "../../api/driver";
import HeaderOperations from "./HeaderOperations";
import ListOperations from "./ListOperations";
import { listOperationAPI } from "../../api/operations";

const Operations = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [operationData, setOperationData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });
  const debouncedSearch = useDebounce(globalSearch, 400);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listOperation", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listOperationAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOperationData(data?.data?.bookingOperations);
      setTotalCount(data?.data?.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <>
      <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
        <HeaderOperations selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        <ListOperations
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          data={operationData}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
      </div>
    </>
  );
};

export default Operations;
