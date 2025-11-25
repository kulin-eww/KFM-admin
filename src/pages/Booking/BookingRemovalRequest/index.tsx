import React, { useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import { Button, Chip, IconButton } from "@mui/material";
// import AcceptCancelDialog from "./AcceptRejectDialog";
import { useTranslation } from "react-i18next";
import AcceptRejectRemovalRequest from "../../RemovalRequest/AcceptRejectRemovalRequest";
import AcceptCancelDialog from "./AcceptRejectDialog";
import { LuImages } from "react-icons/lu";
import RemovalImagesDialog from "./RemovalImagesDialog";
import useRequestTimeout from "../../../hooks/useRequestTimeout";
import { useSelector } from "react-redux";

const BookingRemovalRequest = ({ bookingDetailData }: { bookingDetailData: any }) => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingDetailStatus, setBookingDetailStatus] = useState<"approved" | "rejected">("approved");
  const [bookingRemovalRequestId, setBookingRemovalRequestId] = useState<string>("");
  const [showRemovalImagesDialog, setShowRemovalImagesDialog] = useState(false);
  const vendorBookingRequestTimeout = useSelector((state: any) => state?.user?.vendorBookingRequestTimeout);

  const getColumns = () => [
    {
      key: "customer_name",
      label: t("bookingDetails.customerName"),
      sortable: false,
      render: (row: any) => {
        return <span>{bookingDetailData?.user?.name}</span>;
      },
    },
    {
      key: "removal_date",
      label: t("bookingDetails.requestedOn"),
      sortable: false,
      accessor: (row: any) => row?.created_at?.split("T")[0] ?? "",
    },
    {
      key: "reject_reason",
      label: t("bookingDetails.rejectionReason"),
      sortable: false,
      render: (row: any) => {
        return row?.reject_reason ? <span>{row?.reject_reason}</span> : <span>-</span>;
      },
    },
    {
      key: "accept_reject",
      label: t("bookingDetails.acceptOrReject"),
      sortable: false,
      accessor: (row: any) => {
        const timeLeft = useRequestTimeout({
          created_at: row?.created_at,
          timeout_minutes: parseInt(vendorBookingRequestTimeout?.removal_booking_request),
        });
        return (
          <>
            {row?.status === "approved" && (
              <>
                <Chip
                  label={t("bookingDetails.accepted")}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              </>
            )}
            {row?.status === "rejected" && (
              <>
                <Chip label={t("bookingDetails.rejected")} color="error" variant="outlined" sx={{ borderRadius: 1 }} />
              </>
            )}
            {row?.status !== "approved" && row?.status !== "rejected" && (
              <div className="flex items-center 2xl:gap-4 md:gap-2 gap-1">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#007a47",
                    paddingX: "20px",
                    paddingY: 0.2,
                    borderColor: "#007A47",
                    backgroundColor: "#007A471A",
                    "&:hover": { backgroundColor: "#007A47", color: "#FFF" },
                  }}
                  onClick={() => {
                    setBookingRemovalRequestId(row?.id);
                    handleOpenDialogue("approved");
                  }}
                  disabled={timeLeft.expired}
                >
                  {t("bookingDetails.accept")}
                  <span className="ml-1">
                    ({String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")})
                  </span>
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#FF4D4D",
                    paddingX: "20px",
                    paddingY: 0.2,
                    backgroundColor: "rgba(255, 77, 77, 0.1)",
                    border: "1px solid #FF4D4D",
                    "&:hover": { backgroundColor: "#FF4D4D", color: "#FFF" },
                  }}
                  onClick={() => {
                    setBookingRemovalRequestId(row?.id);
                    handleOpenDialogue("rejected");
                  }}
                >
                  {t("bookingDetails.reject")}
                </Button>
              </div>
            )}
          </>
        );
      },
    },
    {
      key: "actions",
      label: t("bookingDetails.viewImage"),
      sortable: false,
      sx: { position: "sticky", zIndex: 2, right: 0 },
      render: (row: any) => {
        return (
          <div className="flex items-center justify-center cursor-pointer">
            <LuImages
              className="h-5 w-5 text-primary/80 hover:text-primary"
              onClick={() => setShowRemovalImagesDialog(true)}
            />
          </div>
        );
      },
    },
  ];

  const handleOpenDialogue = (status: "approved" | "rejected") => {
    setOpenDialog(true);
    setBookingDetailStatus(status);
  };

  return (
    <>
      <BasicTable
        columns={getColumns()}
        data={bookingDetailData?.bookingRemovalRequest}
        isError={false}
        isLoading={false}
        isSuccess={true}
        pageNumber={pageNumber}
        pageSize={0}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        totalCount={bookingDetailData?.bookingRemovalRequest?.length ?? 0}
        hidePagination={true}
        setSortConfig={setSortConfig}
        sortConfig={sortConfig}
      />
      {openDialog && (
        <AcceptCancelDialog
          openDialog={openDialog}
          setOpenDialog={() => setOpenDialog(false)}
          bookingRemovalRequestId={bookingRemovalRequestId}
          bookingDetailStatus={bookingDetailStatus}
        />
      )}
      {showRemovalImagesDialog && (
        <RemovalImagesDialog
          showRemovalImagesDialog={showRemovalImagesDialog}
          setShowRemovalImagesDialog={setShowRemovalImagesDialog}
          images={bookingDetailData?.bookingRemovalRequest?.[0]?.image}
        />
      )}
    </>
  );
};

export default BookingRemovalRequest;
