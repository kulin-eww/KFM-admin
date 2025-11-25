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

const ListReplacementRequest: React.FC<{
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
  handleStatusRemovalRequest?: (id: string, status: "approved" | "rejected") => void;
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
  handleStatusRemovalRequest,
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
      label: t("booking.table.bookingId"),
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div className="flex items-center gap-2">
              <p className="text-secondary">
                {t("replacementRequest.table.idPrefix")} <span className="text-primary">#{row.id}</span>
              </p>
            </div>
          </>
        );
      },
    },
    {
      key: "customer_name",
      label: t("replacementRequest.table.customerName"),
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
      key: "replacement_date",
      label: t("replacementRequest.table.replacementDate"),
      sortable: true,
      accessor: (row: any) => row?.replace_request_created_at?.split("T")[0],
    },
    {
      key: "delivery_address",
      label: t("replacementRequest.table.deliveryAddress"),
      sortable: true,
      accessor: (row: any) => row?.address?.full_address,
    },
    {
      key: "accept-reject",
      label: t("replacementRequest.table.acceptReject"),
      sortable: false,
      render: (row: any) => {
        return (
          <>
            {row?.replace_request_status === "approved" && (
              <>
                <Chip
                  label={t("replacementRequest.table.approved")}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              </>
            )}
            {row?.replace_request_status === "rejected" && (
              <>
                <Chip
                  label={t("replacementRequest.table.rejected")}
                  color="error"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              </>
            )}
            {row?.replace_request_status === "pending" && (
              <>
                <Chip
                  label={t("replacementRequest.table.pending")}
                  color="warning"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              </>
            )}
          </>
        );
      },
    },
    {
      key: "actions",
      label: t("replacementRequest.table.actions"),
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
                  label: t("replacementRequest.table.viewAction"),
                  onClick: () => {
                    navigate(`/replacement-request/detail?id=${row?.id}`);
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

export default ListReplacementRequest;
