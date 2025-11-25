import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Avatar, Chip, IconButton, Switch } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import Action from "../../assets/icons/common/action.svg?react";
import TableMenu from "../../components/Table/TableMenu";
import { toggleDriverStatusAPI } from "../../api/driver";
import { EyeIcon } from "../../components/common/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListBookingNew: React.FC<{
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

  const toggleMutation = useMutation({
    mutationFn: toggleDriverStatusAPI,
    onSuccess: (res) => {
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const getColumns = () => [
    // { key: "id", label: "No.", sortable: false },
    {
      key: "id",
      label: t("bookingUpcoming.table.bookingId"),
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div className="flex items-center gap-2">
              <p className="text-secondary">
                {t("bookingUpcoming.table.idPrefix")} <span className="text-primary">#{row.id}</span>
              </p>
            </div>
          </>
        );
      },
    },
    {
      key: "customer_name",
      label: t("bookingUpcoming.table.customerName"),
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
      key: "delivered_date",
      label: t("bookingUpcoming.table.deliveryDate"),
      sortable: true,
      accessor: (row: any) => row?.booking_start_date_time?.split("T")[0],
    },
    {
      key: "delivery_address",
      label: t("bookingUpcoming.table.deliveryAddress"),
      sortable: true,
      accessor: (row: any) => row?.address?.full_address,
    },
    {
      key: "pickup_date",
      label: t("bookingUpcoming.table.pickupDate"),
      sortable: true,
      accessor: (row: any) => row?.booking_end_date_time?.split("T")[0],
    },
    {
      key: "booking_date",
      label: t("bookingUpcoming.table.bookingDate"),
      sortable: true,
      accessor: (row: any) => row?.created_at?.split("T")[0],
    },
    {
      key: "isDriverAssigned",
      label: t("bookingUpcoming.table.driverAssigned"),
      sortable: false,
      render: (row: any) => {
        return (
          <span className={row.isDriverAssigned ? "text-[#2BB673] font-medium" : "text-[#D32F2F] font-medium"}>
            {row.isDriverAssigned ? t("bookingUpcoming.table.yes") : t("bookingUpcoming.table.no")}
          </span>
        );
      },
    },
    {
      key: "total_amount",
      label: t("bookingUpcoming.table.amountPaid"),
      sortable: true,
    },
    {
      key: "booking_status",
      label: t("bookingUpcoming.table.bookingStatus"),
      sortable: true,
      render: (row: any) => (
        <>
          <div className="capitalize">{i18n.language === "ar" ? row?.booking_status_ar : row?.booking_status}</div>
        </>
      ),
    },
    {
      key: "payment_status",
      label: t("bookingUpcoming.table.paymentStatus"),
      sortable: true,
      render: (row: any) => (
        <>
          <div className="capitalize">{i18n.language === "ar" ? row?.payment_status_ar : row?.payment_status}</div>
        </>
      ),
    },
    {
      key: "actions",
      label: t("bookingUpcoming.table.actions"),
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
                  label: t("bookingUpcoming.table.viewAction"),
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

export default ListBookingNew;
