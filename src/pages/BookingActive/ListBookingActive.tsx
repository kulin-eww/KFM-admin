import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Chip, IconButton } from "@mui/material";
import Action from "../../assets/icons/common/action.svg?react";
import TableMenu from "../../components/Table/TableMenu";
import { EyeIcon } from "../../components/common/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListBookingActive: React.FC<{
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: any;
  totalCount: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  sortConfig: {
    sortBy: string;
    sortOrder: string;
  };
  setSortConfig: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sortOrder: string;
    }>
  >;
  handleDeleteDriver?: (id: string) => void;
}> = ({
  isLoading,
  isSuccess,
  isError,
  data,
  totalCount,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  sortConfig,
  setSortConfig,
  handleDeleteDriver,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const getColumns = () => [
    {
      key: "id",
      label: t("bookingActive.table.bookingId"),
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div className="flex items-center gap-2">
              <p className="text-secondary">
                {t("bookingActive.table.idPrefix")} <span className="text-primary">#{row.id}</span>
              </p>
            </div>
          </>
        );
      },
    },
    {
      key: "customer_name",
      label: t("bookingActive.table.customerName"),
      sortable: true,
      accessor: (row: any) => row?.user?.name,
    },
    {
      key: "container",
      label: t("container.wasteType"),
      sortable: true,
      render: (row: any) => (
        <>
          <div>{i18n.language === "ar" ? row?.waste_type?.name?.ar : row?.waste_type?.name?.en}</div>
        </>
      ),
    },
    {
      key: "booking_date",
      label: t("bookingActive.table.bookingDate"),
      sortable: true,
      accessor: (row: any) => row?.booking_start_date_time?.split("T")[0],
    },
    {
      key: "delivery_address",
      label: t("bookingActive.table.deliveryAddress"),
      sortable: true,
      accessor: (row: any) => row?.address?.full_address,
    },
    {
      key: "distance",
      label: t("bookingActive.table.locationDistance"),
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div className="flex items-center">{(row?.distance / 1000).toFixed(2)} km</div>
          </>
        );
      },
    },
    { key: "total_quantity", label: t("bookingActive.table.containerQuantity"), sortable: false },
    { key: "days", label: t("bookingActive.table.rentalDuration"), sortable: true },
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
    {
      key: "payment_status",
      label: t("bookingActive.table.paymentStatus"),
      sortable: true,
      render: (row: any) => (
        <>
          <div className="capitalize">{i18n.language === "ar" ? row?.payment_status_ar : row?.payment_status}</div>
        </>
      ),
    },
    {
      key: "actions",
      label: t("bookingActive.table.actions"),
      sortable: false,
      sx: { position: "sticky", zIndex: 2, right: 0 },
      render: (row: any) => {
        const menuId = `table-menu-${row.id}`;
        return (
          <div className="relative">
            <IconButton
              id={menuId}
              aria-label="action"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                if (anchorElId === menuId) {
                  setAnchorElId(null);
                  return;
                }
                setAnchorElId(menuId);
              }}
              edge="end"
            >
              <Action className="h-5" />
            </IconButton>
            <TableMenu
              anchorElId={anchorElId}
              setAnchorElId={setAnchorElId}
              menuId={menuId}
              menuItems={[
                {
                  icon: EyeIcon,
                  label: t("bookingActive.table.viewAction"),
                  onClick: () => {
                    navigate(`/all-booking/detail?id=${row?.id}`);
                    setAnchorElId(null);
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BasicTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={rows}
        columns={getColumns()}
        totalCount={totalCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </>
  );
};

export default ListBookingActive;
