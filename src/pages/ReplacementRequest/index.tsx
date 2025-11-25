import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { exportBookingAPI } from "../../api/booking";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { listEarlyPickupAPI } from "../../api/earlyPickup";
import ListReplacementRequest from "./ListReplacementRequest";
import HeaderReplacementRequest from "./HeaderReplacementRequest";
import { exportReplacementRequestAPI, listReplacementRequestAPI } from "../../api/replacementRequest";
import { downloadFile } from "../../utils/functions";

const ReplacementRequest = () => {
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
  const [removalRequestStaus, setRemovalRequestStaus] = useState<"approved" | "rejected">("approved");

  const { data, isSuccess, isError } = useQuery({
    queryKey: [
      "listReplacementRequest",
      { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters },
    ],
    queryFn: () => {
      setIsLoading(true);
      return listReplacementRequestAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setRemovalRequestData(data?.data?.replaceRequests);
      setTotalCount(data?.data?.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleStatusRemovalRequest = (id: string, status: "approved" | "rejected") => {
    setRemovalRequestId(id);
    setRemovalRequestStaus(status);
    setRemovalRequestStatusModal(true);
  };

  const handleBookingExport = useMutation({
    mutationFn: () => {
      return exportReplacementRequestAPI({ search: debouncedSearch, sortConfig, selectedFilters });
    },
    onSuccess: (data) => {
      downloadFile(data, "replacement-request.xlsx")
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      {/* <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md"> */}
      <div className="mt-6 border border-gray-200 rounded-3xl p-4">
        <HeaderReplacementRequest
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleBookingExport={handleBookingExport}
        />
        <ListReplacementRequest
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
        {/* <AcceptRejectRemovalRequest
          removalRequestStatusModal={removalRequestStatusModal}
          setRemovalRequestStatusModal={setRemovalRequestStatusModal}
          removalRequestId={removalRequestId}
          removalRequestStaus={removalRequestStaus}
        /> */}
      </div>
    </>
  );
};

export default ReplacementRequest;
