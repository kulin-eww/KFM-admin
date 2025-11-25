import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { exportBookingAPI, listBookingAPI } from "../../api/booking";
import HeaderBookingCancelled from "./HeaderBookingCancelled";
import ListBookingCancelled from "./ListBookingCancelled";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";
import { downloadFile } from "../../utils/functions";

const BookingCancelled = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [bookingData, setBookingData] = useState([]);
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

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listBooking", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listBookingAPI({
        pageSize,
        pageNumber,
        search: debouncedSearch,
        sortConfig,
        tab: "cancelled",
        selectedFilters,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setBookingData(data.data.bookings);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleBookingExport = useMutation({
    mutationFn: () => {
      return exportBookingAPI({ search: debouncedSearch, selectedFilters, tab: "cancelled" });
    },
    onSuccess: (data) => {
      downloadFile(data, "cancelled-bookings.xlsx");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
        <HeaderBookingCancelled
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleBookingExport={handleBookingExport}
        />
        <ListBookingCancelled
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          data={bookingData}
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

export default BookingCancelled;
