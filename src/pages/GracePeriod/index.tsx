import { useEffect, useState } from "react";
import GracePeriodHeader from "./GracePeriodHeader";
import ListGracePeriod from "./ListGracePeriod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { exportGracePeriodAPI, listGracePeriodAPI } from "../../api/gracePeriod";
import useDebounce from "../../hooks/useDebounce";
import GracePeriodChangeStatus from "./GracePeriodChangeStatus";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { downloadFile } from "../../utils/functions";

const GracePeriod = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [search, setSearch] = useState<string>(globalSearch ?? "");
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    binType: "",
    deliveryLocation: "",
    customerName: "",
    monthly: false,
    yearly: false,
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "" });
  const [gracePeriodData, setGracePeriodData] = useState<any[]>([]);
  const [gracePeriodId, setGracePeriodId] = useState<string>("");
  const [gracePeriodStatusModal, setGracePeriodStatusModal] = useState<boolean>(false);
  const [gracePeriodStaus, setGracePeriodStatus] = useState<"approved" | "rejected" | null>(null);
  const debouncedSearch = useDebounce(globalSearch, 400);
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listGracePeriod", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listGracePeriodAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
    enabled: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setGracePeriodData(data?.data?.gracePeriodRequests);
      setTotalCount(data?.data?.total_count || 0);
      setIsLoading(false);
    } else if (isError) {
      setGracePeriodData([]);
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleStatusGracePeriod = (id: string, status: "approved" | "rejected") => {
    setGracePeriodStatusModal(true);
    setGracePeriodId(id);
    setGracePeriodStatus(status);
  };

  const handleGracePeriodExport = useMutation({
    mutationFn: () => {
      return exportGracePeriodAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
    onSuccess: (data) => {
      downloadFile(data, "grace-period-bookings.xlsx");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      {/* <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md"> */}
      <div className="mt-6 border border-gray-200 rounded-3xl p-4">
        <GracePeriodHeader
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleGracePeriodExport={handleGracePeriodExport}
        />
        <ListGracePeriod
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          data={gracePeriodData}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          handleStatusGracePeriod={handleStatusGracePeriod}
        />
        <GracePeriodChangeStatus
          gracePeriodStatusModal={gracePeriodStatusModal}
          setGracePeriodStatusModal={setGracePeriodStatusModal}
          gracePeriodId={gracePeriodId}
          gracePeriodStaus={gracePeriodStaus}
        />
      </div>
    </>
  );
};

export default GracePeriod;
