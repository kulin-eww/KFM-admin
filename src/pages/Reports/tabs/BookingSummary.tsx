import { useEffect, useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import { useTranslation } from "react-i18next";
import useDebounce from "../../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { listBookingAPI } from "../../../api/booking";

const BookingSummary: React.FC<{ selectedFilters: any }> = ({ selectedFilters }) => {
  const { t, i18n } = useTranslation();
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [bookingData, setBookingData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(globalSearch, 400);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listBooking", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listBookingAPI({
        pageSize,
        pageNumber,
        search: debouncedSearch,
        sortConfig,
        tab: "past",
        selectedFilters,
      });
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
    <div className="bg-white rounded-xl p-3">
      <BasicTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={bookingData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        columns={[
          {
            key: "id",
            label: t("reports.bookingSummary.table.bookingId"),
            render: (row: any) => {
              return (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-secondary">
                      {t("booking.table.idPrefix")} <span className="text-primary">#{row.id}</span>
                    </p>
                  </div>
                </>
              );
            },
          },
          {
            key: "customer_name",
            label: t("reports.bookingSummary.table.customerName"),
            accessor: (row: any) => row?.user?.name,
          },
          {
            key: "container",
            label: t("container.wasteType"),
            render: (row: any) => (
              <>
                <div>{i18n.language === "ar" ? row?.waste_type?.name?.ar : row?.waste_type?.name?.en}</div>
              </>
            ),
          },
          {
            key: "booking_date",
            label: t("reports.bookingSummary.table.bookingDate"),
            accessor: (row: any) => row?.booking_start_date_time?.split("T")[0],
          },
          {
            key: "address",
            label: t("reports.bookingSummary.table.deliveryAddress"),
            accessor: (row: any) => row?.address?.full_address,
          },
          {
            key: "distance",
            label: t("reports.bookingSummary.table.locationDistance"),
            render: (row: any) => {
              return (
                <>
                  <div className="flex items-center">{(row?.distance / 1000).toFixed(2)} km</div>
                </>
              );
            },
          },
          { key: "total_quantity", label: t("reports.bookingSummary.table.containerQuantity") },
          {
            key: "booking_status",
            label: t("reports.bookingSummary.table.currentStatus"),
            render: (row: any) => {
              return (
                <div className="capitalize">
                  {i18n.language === "ar"
                    ? row?.booking_status_ar?.replaceAll("_", " ")
                    : row?.booking_status?.replaceAll("_", " ")}
                </div>
              );
            },
          },
          {
            key: "payment_status",
            label: t("reports.bookingSummary.table.paymentStatus"),
            render: (row: any) => (
              <>
                <div className="capitalize">
                  {i18n.language === "ar" ? row?.payment_status_ar : row?.payment_status}
                </div>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default BookingSummary;
