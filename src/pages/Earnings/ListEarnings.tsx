import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Avatar, Chip, IconButton, Switch } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Action from "../../assets/icons/common/action.svg?react";
import TableMenu from "../../components/Table/TableMenu";
import { toggleDriverStatusAPI } from "../../api/driver";
import { EyeIcon, PencilIcon, TrashIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const ListEarnings: React.FC<{
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
  const { t, i18n } = useTranslation();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const [rows, setRows] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const getColumns = () => [
    {
      key: "id",
      label: t("earnings.table.bookingId"),
      sortable: false,
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
      label: t("earnings.table.customerName"),
      sortable: true,
    },
    {
      key: "waste_type",
      label: t("earnings.table.wasteType"),
      sortable: true,
      render: (row: any) => (
        <>
          <div>{i18n.language === "ar" ? row?.waste_type_name?.ar : row?.waste_type_name?.en}</div>
        </>
      ),
    },
    {
      key: "date",
      label: t("earnings.table.date"),
      sortable: true,
      accessor: (row: any) => row?.created_at?.split("T")[0],
    },
    { key: "payment_method", label: t("earnings.table.method"), sortable: true },
    { key: "vendor_commission_amount", label: t("earnings.table.amount"), sortable: true },
    {
      key: "payment_status",
      label: t("earnings.table.status"),
      sortable: true,
      render: (row: any) => (
        <>
          <div className="capitalize">{i18n.language === "ar" ? row?.payment_status_ar : row?.payment_status}</div>
        </>
      ),
    },
    {
      key: "actions",
      label: t("earnings.table.actions"),
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
                  label: t("earnings.table.viewAction"),
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

export default ListEarnings;
