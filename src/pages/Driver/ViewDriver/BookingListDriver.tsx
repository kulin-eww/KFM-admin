import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useDebounce from "../../../hooks/useDebounce";
import { FilterIcon, SearchIcon } from "../../../components/common/icons";
import FilterMenu from "../../../components/Table/FilterMenu";
import FilterViewDriver from "./FilterViewDriver";
import { exportDriverBookingAPI, listDriverBookingAPI } from "../../../api/driver";
import { useTranslation } from "react-i18next";
import useToast from "../../../hooks/useToast";
import ListDriverBooking from "./ListDriverBooking";

const BookingListDriver = ({ id }: { id: string }) => {
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [bookingData, setBookingData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "" });
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 400);
  const [currentBookingStatus, setCurrentBookingStatus] = useState("assigned");
  const [selectedFilters, setSelectedFilters] = useState({
    upcoming: false,
    ongoing: false,
    weekly: false,
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });
  const { t } = useTranslation();
  const { data, isSuccess, isError } = useQuery({
    queryKey: [
      "listDriverBooking",
      { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters, type: currentBookingStatus },
    ],
    queryFn: () => {
      setIsLoading(true);
      return listDriverBookingAPI({
        pageSize,
        pageNumber,
        search: debouncedSearch,
        sortConfig,
        selectedFilters: selectedFilters,
        type: currentBookingStatus,
        id: id,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (currentBookingStatus === "violations") {
        setBookingData(data?.data?.driverViolations);
      } else if (currentBookingStatus === "late_delivery") {
        setBookingData(data?.data?.driverLateDeliveries);
      } else if (currentBookingStatus === "on_time_delivery") {
        setBookingData(data?.data?.driverOnTimeDelivery);
      } else {
        setBookingData(data?.data?.bookings);
      }
      setTotalCount(data?.data?.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleDriverBookingExport = useMutation({
    mutationFn: () => {
      return exportDriverBookingAPI({
        pageSize,
        pageNumber,
        search: debouncedSearch,
        sortConfig,
        selectedFilters: selectedFilters,
        type: currentBookingStatus,
        id: id,
      });
    },
    onSuccess: (data) => {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentBookingStatus}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <div className="border-1 rounded-2xl px-4 py-4 border-gray-300">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 box shadow-sm px-4 py-4 rounded-lg">
            <Button
              variant={currentBookingStatus === "assigned" ? "contained" : "disabledLike"}
              fullWidth
              onClick={() => setCurrentBookingStatus("assigned")}
              className="!text-sm"
            >
              {t("driver.assignedBookings")}
            </Button>
            <Button
              variant={currentBookingStatus === "completed" ? "contained" : "disabledLike"}
              fullWidth
              onClick={() => setCurrentBookingStatus("completed")}
              className="!text-sm"
            >
              {t("driver.completedBookings")}
            </Button>
            <Button
              variant={currentBookingStatus === "violations" ? "contained" : "disabledLike"}
              fullWidth
              onClick={() => setCurrentBookingStatus("violations")}
              className="!text-sm"
            >
              {t("driver.violationMade")}
            </Button>
            <Button
              variant={currentBookingStatus === "late_delivery" ? "contained" : "disabledLike"}
              fullWidth
              onClick={() => setCurrentBookingStatus("late_delivery")}
              className="!text-sm"
            >
              {t("driver.lateDeliveries")}
            </Button>
            <Button
              variant={currentBookingStatus === "on_time_delivery" ? "contained" : "disabledLike"}
              fullWidth
              onClick={() => setCurrentBookingStatus("on_time_delivery")}
              className="!text-sm"
            >
              {t("driver.onTimeDeliveries")}
            </Button>
          </div>
          <div className="flex lg:flex-row flex-col gap-2">
            <div className="flex-[4]">
              <TextField
                fullWidth
                name="search"
                type="text"
                placeholder={t("common.search")}
                id="filter-menu"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <div className="flex items-center">
                          <IconButton edge="start">
                            <SearchIcon className="text-gray-400" />
                          </IconButton>
                          <span className="h-4 border-r border-1 border-gray-200" />
                        </div>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {currentBookingStatus === "assigned" && (
                          <InputAdornment
                            position="end"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                              if (anchorElId === "filter-menu") {
                                setAnchorElId(null);
                                return;
                              }
                              setAnchorElId("filter-menu");
                            }}
                          >
                            <IconButton edge="end">
                              <FilterIcon className="text-primary" />
                            </IconButton>
                          </InputAdornment>
                        )}
                      </>
                    ),
                  },
                }}
              />
            </div>
            <div className="flex-[1]">
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleDriverBookingExport.mutate()}
                loading={handleDriverBookingExport.isPending}
              >
                {t("driver.exportReports")}
              </Button>
            </div>
          </div>
          <div>
            <ListDriverBooking
              currentBookingStatus={currentBookingStatus}
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
        </div>
        <FilterMenu
          anchorElId={anchorElId}
          setAnchorElId={setAnchorElId}
          menuId="filter-menu"
          render={
            <FilterViewDriver
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              setAnchorElId={setAnchorElId}
            />
          }
        />
      </div>
    </>
  );
};

export default BookingListDriver;
