import { useEffect, useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import { listReplacementRequestAPI } from "../../../api/replacementRequest";
import { useQuery } from "@tanstack/react-query";

type Row = {
  id: string;
  customer_name: string;
  container_size: string;
  container_qty: number;
  date: string;
  cancel_reason: string;
  amount: string;
  penalty: string;
  status: string;
};

const Replacement: React.FC<{ selectedFilters: any }> = ({ selectedFilters }) => {
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

  return (
    <div className="bg-white rounded-xl p-3">
      <BasicTable<Row>
        isLoading={false}
        isSuccess={true}
        isError={false}
        data={removalRequestData}
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
            label: t("reports.replacement.table.customerName"),
            accessor: (row: any) => row?.user?.name,
          },
          {
            key: "container_size",
            label: t("container.wasteType"),
            render: (row: any) => (
              <>
                <div>{i18n.language === "ar" ? row?.waste_type?.name?.ar : row?.waste_type?.name?.en}</div>
              </>
            ),
          },
          {
            key: "replacement_date",
            label: t("reports.replacement.table.replacementDate"),
            accessor: (row: any) => row?.created_at?.split("T")[0],
          },
          {
            key: "replacement_address",
            label: t("reports.replacement.table.replacementAddress"),
            accessor: (row: any) => row?.address?.full_address,
          },
          { key: "totalContainerForReplaceMent", label: t("reports.replacement.table.containerQuantity") },
          {
            key: "driver_assigned",
            label: t("reports.replacement.table.driverAssigned"),
            render: (row: any) => {
              return <>{row?.driverWiseContainers?.length > 0 ? t("bookingDetails.yes") : t("bookingDetails.no")}</>;
            },
          },
          {
            key: "replace_request_status",
            label: t("reports.replacement.table.status"),
            render: (row: any) => (
              <>
                <div className="capitalize">{row?.replace_request_status}</div>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Replacement;
