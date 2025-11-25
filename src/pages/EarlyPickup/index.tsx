import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import HeaderEarlyPickup from "./HeaderEarlyPickup";
import ListEarlyPickup from "./ListEarlyPickup";
import { exportBookingAPI, listBookingAPI } from "../../api/booking";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { exportEarlyPickupAPI, listEarlyPickupAPI } from "../../api/earlyPickup";
import AcceptRejectEarlyPickup from "./AcceptRejectEarlyPickup";

const EarlyPickup = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [earlyPickupData, setEarlyPickupData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(globalSearch, 400);
  const [selectedFilters, setSelectedFilters] = useState({
    binType: "",
    deliveryLocation: "",
    customerName: "",
    monthly: false,
    yearly: false,
    startDate: "",
    endDate: "",
  });
  const [earlyPickupStatusModal, setEarlyPickupStatusModal] = useState(false);
  const [earlyPickupId, setEarlyPickupId] = useState("");
  const [earlyPickupStaus, setEarlyPickupStaus] = useState<"approved" | "rejected">("approved");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listEarlyPickup", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listEarlyPickupAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  const handleEarlyPickupExport = useMutation({
    mutationFn: () => {
      return exportEarlyPickupAPI({ search: debouncedSearch, sortConfig, selectedFilters });
    },
    onSuccess: (data) => {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "early-pickup.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const handleStatusEarlyPickup = (id: string, status: "approved" | "rejected") => {
    setEarlyPickupId(id);
    setEarlyPickupStaus(status);
    setEarlyPickupStatusModal(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setEarlyPickupData(data?.data?.earlyPickupRequests);
      setTotalCount(data?.data?.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <>
      {/* <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md"> */}
      <div className="mt-6 border border-gray-200 rounded-3xl p-4">
        <HeaderEarlyPickup
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleEarlyPickupExport={handleEarlyPickupExport}
        />
        <ListEarlyPickup
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          data={earlyPickupData}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          handleStatusEarlyPickup={handleStatusEarlyPickup}
        />
        <AcceptRejectEarlyPickup
          earlyPickupStatusModal={earlyPickupStatusModal}
          setEarlyPickupStatusModal={setEarlyPickupStatusModal}
          earlyPickupId={earlyPickupId}
          earlyPickupStaus={earlyPickupStaus}
        />
      </div>
    </>
  );
};

export default EarlyPickup;
