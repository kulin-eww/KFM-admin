import { useEffect, useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { listLateDeliveryAPI } from "../../../api/lateDelivery";

const LateDeliveries: React.FC<{ selectedFilters: any }> = ({ selectedFilters }) => {
  const { t, i18n } = useTranslation();
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const debouncedSearch = useDebounce(globalSearch, 400);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [lateDeliveriesData, setLateDeliveriesData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(false);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listLateDelivery", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listLateDeliveryAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setLateDeliveriesData(data?.data?.lateDeliveries);
      setTotalCount(data?.data?.pagination?.total);
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
        data={lateDeliveriesData || []}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        columns={[
          {
            key: "id",
            label: t("reports.lateDeliveries.table.bookingId"),
            render: (row: any) => {
              return (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-secondary">
                      ID <span className="text-primary">#{row?.booking_id}</span>
                    </p>
                  </div>
                </>
              );
            },
          },
          { key: "customer_name", label: t("reports.lateDeliveries.table.customerName") },
          {
            key: "container_size",
            label: t("container.wasteType"),
            render: (row: any) => (
              <>
                <div>{i18n.language === "ar" ? row?.waste_type_name?.ar : row?.waste_type_name?.en}</div>
              </>
            ),
          },
          {
            key: "booking_date",
            label: t("reports.lateDeliveries.table.bookingDate"),
            accessor: (row: any) => row?.booking_start_date_time?.split("T")[0],
          },
          { key: "address", label: t("reports.lateDeliveries.table.deliveryAddress") },
          { key: "expected_delivery", label: t("reports.lateDeliveries.table.expectedDelivery") },
          // { key: "actual_delivery", label: t("reports.lateDeliveries.table.actualDelivery") },
          {
            key: "booking_status",
            label: t("reports.lateDeliveries.table.orderStatus"),
            render: (row: any) => (
              <>
                <div className="capitalize">{row?.booking_status}</div>
              </>
            ),
          },
          { key: "delay_duration", label: t("reports.lateDeliveries.table.delayDuration") },
        ]}
      />
    </div>
  );
};

export default LateDeliveries;
