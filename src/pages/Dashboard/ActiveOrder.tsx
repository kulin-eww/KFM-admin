import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { listBookingAPI } from "../../api/booking";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";

const ActiveOrder: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [bookingData, setBookingData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    upcoming: false,
    ongoing: false,
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });

  const getColumns = () => [
    {
      key: "id",
      label: t("dashboard.orderId"),
      sortable: false,
      render: (row: any) => {
        return (
          <div className="flex items-center gap-2">
            <p className="text-secondary">
              {t("bookingActive.table.idPrefix")} <span className="text-primary">#{row?.bookingId}</span>
            </p>
          </div>
        );
      },
    },
    {
      key: "total_quantity",
      label: t("dashboard.containerQuantity"),
      sortable: false,
      render: (row: any) => {
        return (
          <div className="flex flex-col items-start gap-2">
            <p className="text-secondary">Qty: {row?.qty}</p>
            <p className="text-secondary">{row?.containers}</p>
          </div>
        );
      },
    },
    { key: "drivers", label: t("dashboard.driver"), sortable: false },
    {
      key: "isLate",
      label: t("bookingActive.table.deliveryStatus"),
      sortable: false,
      render: (row: any) => {
        return (
          <>
            {row?.isLate ? (
              <Chip label={t("bookingActive.table.late")} color="error" variant="outlined" sx={{ borderRadius: 1 }} />
            ) : (
              <Chip
                label={t("bookingActive.table.onTime")}
                color="success"
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            )}
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className=" flex justify-between">
          <div className="text-base font-medium text-text-primary"> {t("dashboard.activeBookings")}</div>
          {data?.length > 0 && (
            <div
              className="text-xs font-medium text-blue-500 hover:underline hover:cursor-pointer"
              onClick={() => navigate("/active-booking")}
            >
              {t("common.viewAll")}
            </div>
          )}
        </div>
        <BasicTable
          isLoading={false}
          isSuccess={true}
          isError={false}
          data={data || []}
          columns={getColumns()}
          totalCount={data?.length || 0}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          hidePagination={true}
        />
      </div>
    </>
  );
};

export default ActiveOrder;
