import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Chip, IconButton, Switch } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Action from "../../assets/icons/common/action.svg?react";
import TableMenu from "../../components/Table/TableMenu";
import { EyeIcon, PencilIcon, TrashIcon } from "../../components/common/icons";
import { toggleContainerStatusAPI } from "../../api/container";
import { useTranslation } from "react-i18next";

const ListContainer: React.FC<{
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
  handleDeleteContainer: (id: string) => void;
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
  handleDeleteContainer,
}) => {
  const queryClient = useQueryClient();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const [rows, setRows] = useState(data);
  const navigate = useNavigate();

  const { t } = useTranslation();
  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const toggleMutation = useMutation({
    mutationFn: toggleContainerStatusAPI,
    onSuccess: (res, rowId) => {
      useToast(res.message);
      setRows((prevRows) => prevRows.map((row) => (row.id === rowId ? { ...row, status: !row.status } : row)));
    },
    onError: (error) => {
      // queryClient.invalidateQueries({ queryKey: ["listContainer"] });
      useToast(error.message, "error");
    },
  });

  const getColumns = () => [
    { key: "id", label: t("container.idPrefix"), sortable: false },
    {
      key: "waste_type",
      label: t("container.wasteType"),
      sortable: true,
      accessor: (row: any) => row?.wasteType?.name?.en,
    },
    {
      key: "container_size",
      label: t("container.containerSize"),
      sortable: true,
      accessor: (row: any) => row?.binSize?.name?.en,
    },
    {
      key: "zone_name",
      label: t("zoneManagement.zoneName"),
      sortable: true,
      accessor: (row: any) => row?.zone?.zone_name,
    },
    { key: "basePrice", label: t("container.price"), sortable: true },
    { key: "stock", label: t("container.inventory"), sortable: true },
    {
      key: "status",
      label: t("container.enableDisable"),
      sortable: true,
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
    // {
    //   key: "availability_status",
    //   label: t("container.status"),
    //   sortable: true,
    //   render: (row: any) => {
    //     return (
    //       <>
    //         {row.availabilityStatus === "available" ? (
    //           <Chip label="Available" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
    //         ) : (
    //           <Chip label="Unavailabe" color="warning" variant="outlined" sx={{ borderRadius: 1 }} />
    //         )}
    //       </>
    //     );
    //   },
    // },
    {
      key: "actions",
      label: t("container.actions"),
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
                  label: t("common.view"),
                  onClick: () => {
                    navigate(`/container/view?id=${row?.id}`);
                    setAnchorElId(null);
                  },
                },
                {
                  icon: PencilIcon,
                  label: t("common.edit"),
                  onClick: () => {
                    navigate(`/container/edit?id=${row?.id}`);
                    setAnchorElId(null);
                  },
                },
                {
                  icon: TrashIcon,
                  label: t("common.delete"),
                  onClick: () => {
                    handleDeleteContainer(row?.id);
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

export default ListContainer;
