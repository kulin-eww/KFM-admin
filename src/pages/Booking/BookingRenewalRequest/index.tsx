import React, { useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import AcceptCancelDialog from "./AccpetRejectDialog";
import { Button, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import useRequestTimeout from "../../../hooks/useRequestTimeout";
import { useSelector } from "react-redux";

const BookingRenewalRequest = ({ bookingDetailData }: { bookingDetailData: any }) => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState();
  const [anchorElId, setAnchorElId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingRenewalId, setBookingRenewalId] = useState<string>("");
  const [bookingDetailStatus, setBookingDetailStatus] = useState<"approved" | "rejected" | "">("");
  const vendorBookingRequestTimeout = useSelector((state: any) => state?.user?.vendorBookingRequestTimeout);

  const getColumns = () => [
    { key: "days", label: t("bookingDetails.rentalDuration"), sortable: false },
    {
      key: "requested_date_time",
      label: t("bookingDetails.requestedOn"),
      sortable: false,
      accessor: (row) => row?.created_at?.split("T")[0] ?? "",
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
      key: "renewal_payment_status",
      label: t("bookingDetails.paymentStatus"),
      sortable: false,
      render: (row: any) => {
        return row?.renewal_payment_status ? (
          <span className="capitalize">{row?.renewal_payment_status}</span>
        ) : (
          <span>-</span>
        );
      },
    },
    {
      key: "accept_reject",
      label: t("bookingDetails.acceptOrReject"),
      sortable: false,

      accessor: (row) => {
        const timeLeft = useRequestTimeout({
          created_at: row?.created_at,
          timeout_minutes: parseInt(vendorBookingRequestTimeout?.renewal_booking_request),
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
                    setBookingRenewalId(row?.id);
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
                    setBookingRenewalId(row?.id);
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
  ];

  const handleOpenDialogue = (status: "approved" | "rejected" | "") => {
    setOpenDialog(true);
    setBookingDetailStatus(status);
  };

  return (
    <>
      <BasicTable
        columns={getColumns()}
        data={bookingDetailData?.bookingRenewalRequest}
        isError={false}
        isLoading={false}
        isSuccess={true}
        pageNumber={pageNumber}
        pageSize={0}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        totalCount={bookingDetailData?.bookingRenewalRequest?.length ?? 0}
        hidePagination={true}
        setSortConfig={setSortConfig}
        sortConfig={sortConfig}
      />
      {openDialog && (
        <AcceptCancelDialog
          openDialog={openDialog}
          setOpenDialog={() => setOpenDialog(false)}
          bookingRenewalId={bookingRenewalId}
          bookingDetailStatus={bookingDetailStatus}
        />
      )}
    </>
  );
};

export default BookingRenewalRequest;
