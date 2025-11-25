import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { exportBookingAPI } from "../../api/booking";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import AcceptRejectRemovalRequest from "./AcceptRejectRemovalRequest";
import HeaderRemovalRequest from "./HeaderRemovalRequest";
import ListRemovalRequest from "./ListRemovalRequest";
import { exportRemovalRequestAPI, listRemovalRequestAPI } from "../../api/removalRequest";
import { downloadFile } from "../../utils/functions";

const RemovalRequest = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [removalRequestData, setRemovalRequestData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(globalSearch, 400);
  const [selectedFilters, setSelectedFilters] = useState({
    upcoming: false,
    ongoing: false,
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });
  const [removalRequestStatusModal, setRemovalRequestStatusModal] = useState(false);
  const [removalRequestId, setRemovalRequestId] = useState("");
  const [removalRequestStatus, setRemovalRequestStatus] = useState<"approved" | "rejected">("approved");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listRemovalRequest", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listRemovalRequestAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setRemovalRequestData(data?.data?.removalRequests);
      setTotalCount(data?.data?.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleRemovalRequestExport = useMutation({
    mutationFn: () => {
      return exportRemovalRequestAPI({ search: debouncedSearch, sortConfig, selectedFilters });
    },
    onSuccess: (data) => {
      downloadFile(data, "removal-request.xlsx")
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const handleStatusRemovalRequest = (id: string, status: "approved" | "rejected") => {
    setRemovalRequestId(id);
    setRemovalRequestStatus(status);
    setRemovalRequestStatusModal(true);
  };

  return (
    <>
      {/* <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md"> */}
      <div className="mt-6 border border-gray-200 rounded-3xl p-4">
        <HeaderRemovalRequest
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleRemovalRequestExport={handleRemovalRequestExport}
        />
        <ListRemovalRequest
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          data={removalRequestData}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          handleStatusRemovalRequest={handleStatusRemovalRequest}
        />
        <AcceptRejectRemovalRequest
          removalRequestStatusModal={removalRequestStatusModal}
          setRemovalRequestStatusModal={setRemovalRequestStatusModal}
          removalRequestId={removalRequestId}
          removalRequestStatus={removalRequestStatus}
        />
      </div>
    </>
  );
};

export default RemovalRequest;
