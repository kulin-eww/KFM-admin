import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toggleDriverStatusAPI } from "../../api/driver";
import useToast from "../../hooks/useToast";
import { Chip, IconButton, Switch } from "@mui/material";
import Action from "../../assets/icons/common/action.svg?react";
import TableMenu from "../../components/Table/TableMenu";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { BasicTable } from "../../components/Table/BasicTable";

const ListOperations: React.FC<{
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
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const { t } = useTranslation();
  const [rows, setRows] = useState(data);
  const navigate = useNavigate();

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
    {
      key: "id",
      label: t("operations.orderId"),
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
      label: t("operations.customerName"),
      sortable: true,
    },
    { key: "containers", label: t("operations.containerNo"), sortable: true },
    { key: "duration", label: t("operations.duration"), sortable: true },
    { key: "eta", label: t("operations.eta"), sortable: true },
    { key: "driver_name", label: t("operations.driverName"), sortable: true },
    { key: "updated_at", label: t("operations.updatedAt"), sortable: true, accessor: (row: any) => row?.created_at?.split("T")[0] },
    {
      key: "container_status",
      label: t("operations.containerStatus"),
      sortable: false,
      render: (row: any) => {
        return (
          <>
            <Chip
              label={<span className="capitalize">{row?.status?.replace("_", " ")?.replace("_", " ")}</span>}
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
          </>
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

export default ListOperations;
