import React, { useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
// import AcceptCancelDialog from "./AccpetRejectDialog";
import { Chip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Action from "../../../assets/icons/common/action.svg?react";
import TableMenu from "../../../components/Table/TableMenu";
import { EyeIcon } from "../../../components/common/icons";

const BookingReplacementRequest = ({ bookingDetailData }: { bookingDetailData: any }) => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingRenewalId, setBookingRenewalId] = useState<string>("");
  const [bookingDetailStatus, setBookingDetailStatus] = useState<"approved" | "rejected" | "">("");
  const navigate = useNavigate();

  const getColumns = () => [
    {
      key: "totalContainerForReplaceMent",
      label: t("bookingDetails.quantity"),
      sortable: false,
      render: (row: any) => {
        return <span>{row?.totalContainerForReplaceMent}</span>;
      },
    },
    {
      key: "requested_date_time",
      label: t("bookingDetails.requestedOn"),
      sortable: false,
      accessor: (row) => row?.replace_request_created_at?.split("T")[0] ?? "",
    },
    {
      key: "reject_reason",
      label: t("bookingDetails.rejectionReason"),
      sortable: false,
      render: (row: any) => {
        return row?.replacement_reject_reason ? <span>{row?.replacement_reject_reason}</span> : <span>-</span>;
      },
    },
    {
      key: "status",
      label: t("bookingDetails.status"),
      sortable: false,
      accessor: (row) => {
        return (
          <>
            {row?.replace_request_status === "pending" && (
              <>
                <Chip label={t("bookingDetails.pending")} color="info" variant="outlined" sx={{ borderRadius: 1 }} />
              </>
            )}
            {row?.replace_request_status === "approved" && (
              <>
                <Chip
                  label={t("bookingDetails.accepted")}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              </>
            )}
            {row?.replace_request_status === "rejected" && (
              <>
                <Chip label={t("bookingDetails.rejected")} color="error" variant="outlined" sx={{ borderRadius: 1 }} />
              </>
            )}
            {row?.replace_request_status === "completed" && (
              <>
                <Chip
                  label={t("bookingDetails.completed")}
                  color="success"
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
      key: "payment_status",
      label: t("bookingDetails.paymentStatus"),
      sortable: false,
      render: (row: any) => {
        return row?.replace_payment_status ? (
          <span className="capitalize">{row?.replace_payment_status}</span>
        ) : (
          <span>-</span>
        );
      },
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

  const handleOpenDialogue = (status: "approved" | "rejected" | "") => {
    setOpenDialog(true);
    setBookingDetailStatus(status);
  };

  return (
    <>
      <BasicTable
        columns={getColumns()}
        data={bookingDetailData?.bookingReplacementRequest}
        isError={false}
        isLoading={false}
        isSuccess={true}
        pageNumber={pageNumber}
        pageSize={0}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        totalCount={bookingDetailData?.bookingReplacementRequest?.length ?? 0}
        hidePagination={true}
        setSortConfig={setSortConfig}
        sortConfig={sortConfig}
      />
      {/* {openDialog && (
        <AcceptCancelDialog
          openDialog={openDialog}
          setOpenDialog={() => setOpenDialog(false)}
          bookingRenewalId={bookingRenewalId}
          bookingDetailStatus={bookingDetailStatus}
        />
      )} */}
    </>
  );
};

export default BookingReplacementRequest;
