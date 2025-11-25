import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Avatar, Button, Chip, IconButton, Switch } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import Action from "../../assets/icons/common/action.svg?react";
import TableMenu from "../../components/Table/TableMenu";
import { toggleDriverStatusAPI } from "../../api/driver";
import { EyeIcon } from "../../components/common/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListEarlyPickup: React.FC<{
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
  handleStatusEarlyPickup?: (id: string, status: "approved" | "rejected") => void;
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
  handleStatusEarlyPickup,
}) => {
  const { t } = useTranslation();
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
      label: t("booking.table.bookingId"),
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div className="flex items-center gap-2">
              <p className="text-secondary">
                {t("earlyPickup.table.idPrefix")} <span className="text-primary">#{row?.booking?.id}</span>
              </p>
            </div>
          </>
        );
      },
    },
    {
      key: "customer_name",
      label: t("earlyPickup.table.customerName"),
      sortable: true,
      accessor: (row: any) => row?.booking?.user?.name,
    },
    {
      key: "container",
      label: t("container.wasteType"),
      sortable: true,
      accessor: (row: any) => row?.booking?.waste_type?.name?.en,
    },
    {
      key: "early_pickup_date",
      label: t("earlyPickup.table.earlyPickupDate"),
      sortable: true,
      accessor: (row: any) => row?.new_booking_end_date?.split("T")[0],
    },
    {
      key: "delivery_address",
      label: t("earlyPickup.table.deliveryAddress"),
      sortable: true,
      accessor: (row: any) => row?.booking?.address?.full_address,
    },
    {
      key: "accept-reject",
      label: t("earlyPickup.table.acceptReject"),
      sortable: false,
      render: (row: any) => {
        return (
          <>
            {row?.status === "approved" && (
              <>
                <Chip
                  label={t("earlyPickup.table.approved")}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              </>
            )}
            {row?.status === "rejected" && (
              <>
                <Chip
                  label={t("earlyPickup.table.rejected")}
                  color="error"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              </>
            )}
            {row?.status !== "approved" && row?.status !== "rejected" && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#007A47",
                    paddingX: "16px",
                    paddingY: 0.4,
                    backgroundColor: "#007A471A",
                    "&:hover": { backgroundColor: "#007A47", color: "#FFF" },
                  }}
                  onClick={() => {
                    handleStatusEarlyPickup(row?.id, "approved");
                  }}
                >
                  {t("earlyPickup.table.accept")}
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#FF4D4D",
                    paddingX: "16px",
                    paddingY: 0.4,
                    backgroundColor: "rgba(255, 77, 77, 0.1)",
                    border: "1px solid #FF4D4D",
                    "&:hover": { backgroundColor: "#FF4D4D", color: "#FFF" },
                  }}
                  onClick={() => {
                    handleStatusEarlyPickup(row?.id, "rejected");
                  }}
                >
                  {t("earlyPickup.table.reject")}
                </Button>
              </div>
            )}
          </>
        );
      },
    },
    {
      key: "actions",
      label: t("earlyPickup.table.actions"),
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
                  label: t("earlyPickup.table.viewAction"),
                  onClick: () => {
                    navigate(`/all-booking/detail?id=${row?.booking?.id}`);
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

export default ListEarlyPickup;
