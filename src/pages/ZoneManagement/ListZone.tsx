import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Avatar, Chip, IconButton, Switch } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Action from "../../assets/icons/common/action.svg?react";
import TableMenu from "../../components/Table/TableMenu";
import { EyeIcon, PencilIcon, TrashIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";
import { toggleZoneStatusAPI } from "../../api/zone";

const ListZone: React.FC<{
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
  handleDeleteZone: (id: string) => void;
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
  handleDeleteZone,
}) => {
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const { t } = useTranslation();
  const [rows, setRows] = useState(data);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const toggleMutation = useMutation({
    mutationFn: toggleZoneStatusAPI,
    onSuccess: (res, rowId) => {
      useToast(res.message);
      setRows((prevRows) => prevRows.map((row) => (row.id === rowId ? { ...row, status: !row.status } : row)));
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["listZone"] });
      useToast(error.message, "error");
    },
  });

  const getColumns = () => [
    { key: "id", label: t("driver.id"), sortable: true, accessor: (row: any) => row?.id },
    {
      key: "zone_name",
      label: t("zoneManagement.zoneName"),
      sortable: true,
    },
    {
      key: "status",
      label: t("zoneManagement.status"),
      sortable: false,
      render: (row: any) => (
        <Switch
          checked={row?.status}
          onChange={() => {
            toggleMutation.mutate(row.id);
          }}
          slotProps={{
            input: { "aria-label": "Activate/Deactivate" },
          }}
        />
      ),
    },
    {
      key: "created_at",
      label: t("zoneManagement.createdAt"),
      sortable: true,
      render: (row: any) => <p>{row?.created_at?.split("T")[0]}</p>,
    },
    {
      key: "actions",
      label: t("driver.actions"),
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
                  label: t("driver.view"),
                  onClick: () => {
                    navigate(`/zone/view?id=${row?.id}`);
                    setAnchorElId(null);
                  },
                },
                {
                  icon: PencilIcon,
                  label: t("driver.edit"),
                  onClick: () => {
                    navigate(`/zone/edit?id=${row?.id}`);
                    setAnchorElId(null);
                  },
                },
                {
                  icon: TrashIcon,
                  label: t("driver.delete"),
                  onClick: () => {
                    handleDeleteZone(row?.id);
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

export default ListZone;
