import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import ListBookingRenewal from "./ListBookingRenewal";
import HeaderBookingRenewal from "./HeaderBookingRenewal";
import BookingRenewalStatus from "./BookingRenewalStatus";
import { exportBookingRenewalAPI, listBookingRenewalAPI } from "../../api/bookingRenewal";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { downloadFile } from "../../utils/functions";

const BookingRenewal = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
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
  const debouncedSearch = useDebounce(globalSearch, 400);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "" });
  const [bookingRenewalData, setBookingRenewalData] = useState<any[]>([]);
  const [bookingRenewalId, setBookingRenewalId] = useState<string>("");
  const [bookingRenewalStatusModal, setBookingRenewalStatusModal] = useState<boolean>(false);
  const [bookingRenewalStaus, setBookingRenewalStatus] = useState<"approved" | "rejected" | "">("");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listBookingRenewal", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listBookingRenewalAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setBookingRenewalData(data?.data?.bookingRenewalRequests);
      setTotalCount(data?.data?.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleBookingRenewalStatus = (id: string, status: "approved" | "rejected") => {
    setBookingRenewalStatusModal(true);
    setBookingRenewalId(id);
    setBookingRenewalStatus(status);
  };

  const handleBookingRenewalExport = useMutation({
    mutationFn: () => {
      return exportBookingRenewalAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
    onSuccess: (data) => {
      downloadFile(data, "renewal-bookings.xlsx")
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      {/* <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md"> */}
      <div className="mt-6 border border-gray-200 rounded-3xl p-4">
        <HeaderBookingRenewal
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleBookingRenewalExport={handleBookingRenewalExport}
        />
        <ListBookingRenewal
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          data={bookingRenewalData}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          handleBookingRenewalStatus={handleBookingRenewalStatus}
        />
        <BookingRenewalStatus
          bookingRenewalStatusModal={bookingRenewalStatusModal}
          setBookingRenewalStatusModal={setBookingRenewalStatusModal}
          bookingRenewalId={bookingRenewalId}
          bookingRenewalStaus={bookingRenewalStaus}
        />
      </div>
    </>
  );
};

export default BookingRenewal;
