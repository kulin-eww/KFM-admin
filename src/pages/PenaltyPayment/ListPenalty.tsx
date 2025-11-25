import { useState } from "react";
import type React from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import TableMenu from "../../components/Table/TableMenu";
import Action from "../../assets/icons/common/action.svg?react";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { EyeIcon } from "../../components/common/icons";
import { useNavigate } from "react-router-dom";

const ListPenalty: React.FC<{
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: any;
  totalCount: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  sortConfig: { sortBy: string; sortOrder: string };
  setSortConfig: React.Dispatch<React.SetStateAction<{ sortBy: string; sortOrder: string }>>;
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
  const { t } = useTranslation();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="bg-white p-2 rounded-xl">
      <BasicTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={data || []}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        columns={[
          {
            key: "id",
            label: t("penaltyPayment.table.bookingId"),
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
          { key: "customer_name", label: t("penaltyPayment.table.customerName") },
          {
            key: "container_size",
            label: t("container.wasteType"),
            accessor: (row: any) => row?.waste_type_name?.en,
          },
          // { key: "container_qty", label: t("penaltyPayment.table.containerQty") },
          {
            key: "date",
            label: t("penaltyPayment.table.date"),
            accessor: (row: any) => row?.created_at?.split("T")[0],
          },
          { key: "cancel_reason", label: t("penaltyPayment.table.cancelationReason") },
          { key: "total_amount", label: t("penaltyPayment.table.amount") },
          { key: "penalty_amount", label: t("penaltyPayment.table.penalty") },
          {
            key: "payment_status",
            label: t("penaltyPayment.table.penaltyStatus"),
            // render: (row: any) => (
            //   <span className={row.status === "Paid" ? "text-[#2BB673] font-medium" : "text-[#D32F2F] font-medium"}>
            //     {row.status === "Paid"
            //       ? t("penaltyPayment.table.paid")
            //       : row.status === "Unpaid"
            //         ? t("penaltyPayment.table.unpaid")
            //         : row.status || "-"}
            //   </span>
            // ),
          },
          {
            key: "actions",
            label: t("penaltyPayment.table.actions"),
            render: (row) => {
              const menuId = `action-${row.id}`;
              return (
                <>
                  <IconButton
                    id={menuId}
                    aria-label="action"
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      if (anchorElId === `action-${row.id}`) {
                        setAnchorElId(null);
                        return;
                      }
                      setAnchorElId(`action-${row.id}`);
                    }}
                  >
                    <Action className="h-5" />
                  </IconButton>
                  <TableMenu
                    anchorElId={anchorElId}
                    setAnchorElId={setAnchorElId}
                    menuId={`action-${row.id}`}
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
                </>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default ListPenalty;
