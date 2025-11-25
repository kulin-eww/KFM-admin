import { useEffect, useState } from "react";
import { Avatar, Chip, IconButton, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TableMenu from "../../../components/Table/TableMenu";
import { EyeIcon } from "../../../components/common/icons";
import { BasicTable } from "../../../components/Table/BasicTable";
import Action from "../../../assets/icons/common/action.svg?react";

const ListDriverBooking: React.FC<{
  currentBookingStatus: string;
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
}> = ({
  currentBookingStatus,
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
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const getColumns = () => {
    if (currentBookingStatus === "violations") {
      return [
        {
          key: "id",
          label: t("booking.table.bookingId"),
          sortable: true,
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
        {
          key: "customer_name",
          label: t("booking.table.customerName"),
          sortable: true,
        },
        {
          key: "container",
          label: t("booking.table.container"),
          sortable: true,
          accessor: (row: any) => row?.waste_type_name?.en,
        },
        {
          key: "booking_date",
          label: t("booking.table.bookingDate"),
          sortable: true,
          accessor: (row: any) => row?.booking_start_date_time?.split("T")[0],
        },
        {
          key: "delivery_address",
          label: t("booking.table.deliveryAddress"),
          sortable: true,
          accessor: (row: any) => row?.address?.full_address,
        },
        { key: "reason", label: t("booking.table.reason"), sortable: true },
        // { key: "location_distance", label: "Location Distance", sortable: true },
        { key: "container_qty", label: t("booking.table.containerQuantity"), sortable: true },
        {
          key: "booking_status",
          label: t("booking.table.orderStatus"),
          sortable: true,
          accessor: (row: any) => row?.booking_status?.slice(0, 1)?.toUpperCase() + row?.booking_status?.slice(1),
        },
        // {
        //   key: "payment_status",
        //   label: t("booking.table.paymentStatus"),
        //   sortable: true,
        //   accessor: (row: any) => row?.payment_status?.slice(0, 1)?.toUpperCase() + row?.payment_status?.slice(1),
        // },
        {
          key: "actions",
          label: t("booking.table.actions"),
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
                      label: t("booking.table.viewAction"),
                      onClick: () => {
                        navigate(`/all-booking/detail?id=${row?.booking_id}`);
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
    } else if (currentBookingStatus === "late_delivery") {
      return [
        {
          key: "id",
          label: t("booking.table.bookingId"),
          sortable: true,
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
        {
          key: "customer_name",
          label: t("booking.table.customerName"),
          sortable: true,
        },
        {
          key: "container",
          label: t("booking.table.container"),
          sortable: true,
          accessor: (row: any) => row?.waste_type_name?.en,
        },
        {
          key: "booking_date",
          label: t("booking.table.bookingDate"),
          sortable: true,
          accessor: (row: any) => row?.booking_start_date_time?.split("T")[0],
        },
        {
          key: "delivery_address",
          label: t("booking.table.deliveryAddress"),
          sortable: true,
          accessor: (row: any) => row?.address?.full_address,
        },
        { key: "expected_delivery", label: t("booking.table.expectedDelivery"), sortable: true },
        { key: "actual_delivery", label: t("booking.table.actualDelivery"), sortable: true },

        {
          key: "booking_status",
          label: t("booking.table.orderStatus"),
          sortable: true,
          accessor: (row: any) => row?.booking_status?.slice(0, 1)?.toUpperCase() + row?.booking_status?.slice(1),
        },
        { key: "delay_duration", label: t("booking.table.delayDuration"), sortable: true },
        {
          key: "actions",
          label: t("booking.table.actions"),
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
                      label: t("booking.table.viewAction"),
                      onClick: () => {
                        navigate(`/all-booking/detail?id=${row?.booking_id}`);
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
    } else if (currentBookingStatus === "on_time_delivery") {
      return [
        {
          key: "id",
          label: t("booking.table.bookingId"),
          sortable: true,
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
        {
          key: "customer_name",
          label: t("booking.table.customerName"),
          sortable: true,
        },
        {
          key: "container",
          label: t("booking.table.container"),
          sortable: true,
          accessor: (row: any) => row?.waste_type_name?.en,
        },
        {
          key: "booking_date",
          label: t("booking.table.bookingDate"),
          sortable: true,
          accessor: (row: any) => row?.booking_start_date_time?.split("T")[0],
        },
        {
          key: "delivery_address",
          label: t("booking.table.deliveryAddress"),
          sortable: true,
          accessor: (row: any) => row?.address?.full_address,
        },
        { key: "expected_delivery", label: t("booking.table.expectedDelivery"), sortable: true },
        { key: "actual_delivery", label: t("booking.table.actualDelivery"), sortable: true },

        {
          key: "booking_status",
          label: t("booking.table.orderStatus"),
          sortable: true,
          accessor: (row: any) => row?.booking_status?.slice(0, 1)?.toUpperCase() + row?.booking_status?.slice(1),
        },
        // {
        //   key: "payment_status",
        //   label: t("booking.table.paymentStatus"),
        //   sortable: true,
        //   accessor: (row: any) => row?.payment_status?.slice(0, 1)?.toUpperCase() + row?.payment_status?.slice(1),
        // },
        {
          key: "actions",
          label: t("booking.table.actions"),
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
                      label: t("booking.table.viewAction"),
                      onClick: () => {
                        navigate(`/all-booking/detail?id=${row?.booking_id}`);
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
    } else {
      return [
        {
          key: "id",
          label: t("booking.table.bookingId"),
          sortable: true,
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
          label: t("booking.table.customerName"),
          sortable: true,
          accessor: (row: any) => row?.user?.name,
        },
        {
          key: "container",
          label: t("booking.table.container"),
          sortable: true,
          accessor: (row: any) => row?.waste_type?.name?.en,
        },
        {
          key: "booking_date",
          label: t("booking.table.bookingDate"),
          sortable: true,
          accessor: (row: any) => row?.booking_start_date_time?.split("T")[0],
        },
        {
          key: "delivery_address",
          label: t("booking.table.deliveryAddress"),
          sortable: true,
          accessor: (row: any) => row?.address?.full_address,
        },
        // { key: "location_distance", label: "Location Distance", sortable: true },
        { key: "total_assigned_quantity", label: t("booking.table.containerQuantity"), sortable: true },
        {
          key: "booking_status",
          label: t("booking.table.orderStatus"),
          sortable: true,
          accessor: (row: any) => row?.booking_status?.slice(0, 1)?.toUpperCase() + row?.booking_status?.slice(1),
        },
        {
          key: "payment_status",
          label: t("booking.table.paymentStatus"),
          sortable: true,
          accessor: (row: any) => row?.payment_status?.slice(0, 1)?.toUpperCase() + row?.payment_status?.slice(1),
        },
        {
          key: "actions",
          label: t("booking.table.actions"),
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
                      label: t("booking.table.viewAction"),
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
    }
  };

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

export default ListDriverBooking;
