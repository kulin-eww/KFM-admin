import { Avatar, Button, Chip, IconButton, Switch } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Action from "../../assets/icons/common/action.svg?react";
import TableMenu from "../../components/Table/TableMenu";
import { BasicTable } from "../../components/Table/BasicTable";
import { EyeIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const ListGracePeriod: React.FC<{
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
  handleStatusGracePeriod: (id: string, status: "approved" | "rejected") => void;
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
  handleStatusGracePeriod,
}) => {
  const { t, i18n } = useTranslation();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const [rows, setRows] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  //   const toggleMutation = useMutation({
  //     mutationFn: toggleDriverStatusAPI,
  //     onSuccess: (res) => {
  //       useToast(res.message);
  //     },
  //     onError: (error) => {
  //       useToast(error.message, "error");
  //     },
  //   });

  const getColumns = () => [
    // { key: "id", label: t("gracePeriod.table.requestId"), sortable: true, accessor: (item: any) => item?.id ?? "" },
    {
      key: "id",
      label: t("booking.table.bookingId"),
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div className="flex items-center gap-2">
              <p className="text-secondary">
                {t("replacementRequest.table.idPrefix")} <span className="text-primary">#{row?.booking?.id}</span>
              </p>
            </div>
          </>
        );
      },
    },
    {
      key: "name",
      label: t("gracePeriod.table.customerName"),
      sortable: true,
      accessor: (row: any) => row?.booking?.user?.name ?? "",
    },
    {
      key: "container",
      label: t("container.wasteType"),
      sortable: true,
      render: (row: any) => (
        <>
          <div>{i18n.language === "ar" ? row?.booking?.waste_type?.name?.ar : row?.booking?.waste_type?.name?.en}</div>
        </>
      ),
    },
    { key: "days", label: t("gracePeriod.table.gracePeriod"), sortable: true },
    {
      key: "update_time",
      label: t("gracePeriod.table.updatedDateTime"),
      sortable: true,
      accessor: (row: any) => row?.new_booking_end_date?.split("T")[0] ?? "",
    },
    {
      key: "distance",
      label: t("gracePeriod.table.locationDistance"),
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div className="flex items-center">{(row?.booking?.distance / 1000).toFixed(2)} km</div>
          </>
        );
      },
    },
    {
      key: "rental-duration",
      label: t("gracePeriod.table.initialRentalDuration"),
      sortable: true,
      accessor: (row: any) => row?.booking?.days ?? "",
    },
    {
      key: "accept-reject",
      label: t("gracePeriod.table.acceptReject"),
      sortable: false,
      render: (row: any) => {
        return (
          <>
            {row?.status === "approved" && (
              <>
                <Chip
                  label={t("gracePeriod.table.approved")}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              </>
            )}
            {row?.status === "rejected" && (
              <>
                <Chip
                  label={t("gracePeriod.table.rejected")}
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
                    handleStatusGracePeriod(row?.id, "approved");
                  }}
                >
                  {t("gracePeriod.table.accept")}
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
                    handleStatusGracePeriod(row?.id, "rejected");
                  }}
                >
                  {t("gracePeriod.table.reject")}
                </Button>
              </div>
            )}
          </>
        );
      },
    },
    {
      key: "actions",
      label: t("gracePeriod.table.actions"),
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
                  label: t("gracePeriod.table.viewAction"),
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

export default ListGracePeriod;
