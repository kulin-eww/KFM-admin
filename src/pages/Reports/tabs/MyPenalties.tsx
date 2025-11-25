import { useEffect, useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import { useTranslation } from "react-i18next";
import { listPenaltyPaymentsAPI } from "../../../api/penalty";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../../hooks/useDebounce";
import { useSelector } from "react-redux";

const MyPenalties: React.FC<{ selectedFilters: any }> = ({ selectedFilters }) => {
  const { t, i18n } = useTranslation();
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const debouncedSearch = useDebounce(globalSearch, 400);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [penaltyData, setPenaltyData] = useState([]);
  const [penaltyStats, setPenaltyStats] = useState({});
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(false);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listPenaltyPayments", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listPenaltyPaymentsAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setPenaltyData(data?.data?.penalties);
      setPenaltyStats(data?.data?.stats);
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
        data={penaltyData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        columns={[
          {
            key: "id",
            label: t("penaltyPayment.table.bookingId"),
            render: (row: any) => {
              return (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-secondary">
                      {t("booking.table.idPrefix")} <span className="text-primary">#{row?.booking_id}</span>
                    </p>
                  </div>
                </>
              );
            },
          },
          { key: "customer_name", label: t("penaltyPayment.table.customerName") },
          {
            key: "container_size",
            label: t("container.wasteType"),
            render: (row: any) => (
              <>
                <div>{i18n.language === "ar" ? row?.waste_type_name?.ar : row?.waste_type_name?.en}</div>
              </>
            ),
          },
          // { key: "container_qty", label: t("penaltyPayment.table.containerQty") },
          {
            key: "date",
            label: t("penaltyPayment.table.date"),
            accessor: (row: any) => row?.created_at?.split("T")[0],
          },
          { key: "cancel_reason", label: t("penaltyPayment.table.cancelationReason") },
          { key: "total_amount", label: t("penaltyPayment.table.amount") },
          { key: "penalty_amount", label: t("penaltyPayment.table.penalty") },
          {
            key: "payment_status",
            label: t("penaltyPayment.table.penaltyStatus"),
            render: (row: any) => (
              <>
                <div className="capitalize">{row?.payment_status}</div>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default MyPenalties;
