import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import HeaderBooking from "./HeaderBooking";
import ListBooking from "./ListBooking";
import { exportBookingAPI, listBookingAPI } from "../../api/booking";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { downloadCSV, downloadFile } from "../../utils/functions";

const Booking = () => {
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
        tab: "all",
        selectedFilters,
      });
    },
  });

  const handleBookingExport = useMutation({
    mutationFn: () => {
      return exportBookingAPI({ search: debouncedSearch, selectedFilters, tab: "all" });
    },
    onSuccess: (data) => {
      downloadFile(data, "booking.xlsx");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setBookingData(data?.data?.bookings);
      setTotalCount(data?.data?.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <>
      <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
        <HeaderBooking
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleBookingExport={handleBookingExport}
        />
        <ListBooking
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

export default Booking;
