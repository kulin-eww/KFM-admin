import { useEffect, useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import { listRemovalRequestAPI } from "../../../api/removalRequest";
import { useQuery } from "@tanstack/react-query";

const Removal: React.FC<{ selectedFilters: any }> = ({ selectedFilters }) => {
  const { t, i18n } = useTranslation();
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [removalRequestData, setRemovalRequestData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(globalSearch, 400);

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

  return (
    <div className="bg-white rounded-xl p-3">
      <BasicTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={removalRequestData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        columns={[
          {
            key: "id",
            label: t("reports.removal.table.bookingId"),
            render: (row: any) => {
              return (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-secondary">
                      {t("booking.table.idPrefix")} <span className="text-primary">#{row?.booking?.id}</span>
                    </p>
                  </div>
                </>
              );
            },
          },
          {
            key: "customer_name",
            label: t("reports.removal.table.customerName"),
            accessor: (row: any) => row?.booking?.user?.name,
          },
          {
            key: "container_size",
            label: t("container.wasteType"),
            render: (row: any) => (
              <>
                <div>
                  {i18n.language === "ar" ? row?.booking?.waste_type?.name?.ar : row?.booking?.waste_type?.name?.en}
                </div>
              </>
            ),
          },
          {
            key: "removal_date",
            label: t("reports.removal.table.removalDate"),
            accessor: (row: any) => row?.created_at?.split("T")[0],
          },
          {
            key: "removal_address",
            label: t("reports.removal.table.removalAddress"),
            accessor: (row: any) => row?.booking?.address?.full_address,
          },
          {
            key: "container_qty",
            label: t("reports.removal.table.containerQuantity"),
            accessor: (row: any) => row?.booking?.total_quantity,
          },
          // { key: "driver_assigned", label: t("reports.removal.table.driverAssigned") },
          {
            key: "status",
            label: t("reports.removal.table.status"),
            render: (row: any) => (
              <>
                <div className="capitalize">{row?.status}</div>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Removal;
