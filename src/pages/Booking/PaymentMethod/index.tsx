import { Button } from "@mui/material";
import { ChevronRight, SeperatorIcon } from "../../../components/common/icons";
import { useState } from "react";
import PaymentCollectedDialog from "./PaymentCollectedDialog";
import { useTranslation } from "react-i18next";
import { PAYMENT_STATUS } from "../../../utils/constant";

const PaymentMethod: React.FC<{ bookingDetailData: any }> = ({ bookingDetailData }) => {
  const { t } = useTranslation();
  const [showPaymentCollectedDialog, setShowPaymentCollectedDialog] = useState(false);
  return (
    <>
      <div className="rounded-xl border border-[#EDEDED] md:p-4 p-3">
        <div className="flex justify-between gap-3 items-start pb-3 mb-3 border-b border-[#F7F7F7]">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base/tight font-semibold text-primary">{t("bookingDetails.paymentMethod")}</h3>
            <SeperatorIcon />
            {bookingDetailData?.payment_status === PAYMENT_STATUS.SUCCESS && (
              <span className="text-md font-semibold text-[#568BFF]">{t("bookingDetails.accepted")}</span>
            )}
            {bookingDetailData?.payment_status === PAYMENT_STATUS.FAILED && (
              <span className="text-md font-semibold text-red-500">{t("bookingDetails.failed")}</span>
            )}
            {bookingDetailData?.payment_status === PAYMENT_STATUS.PENDING && (
              <span className="text-md font-semibold text-[#FFA500]">{t("bookingDetails.pending")}</span>
            )}
          </div>
          {bookingDetailData?.payment_method === "cash" ? (
            <span className="text-base/tight font-semibold text-primary flex-shrink-0">{t("bookingDetails.cod")}</span>
          ) : (
            <span className="text-base/tight font-semibold text-primary flex-shrink-0">
              {t("bookingDetails.online")}
            </span>
          )}
        </div>

        <div className="flex justify-between items-start gap-2 pb-3 mb-3 border-b border-[#F7F7F7]">
          <div>
            <p className="font-medium text-base/tight text-[#363636] pb-1">{t("bookingDetails.amountToPay")}</p>
            <p className="text-xs/tight font-medium text-[#676767]">
              {bookingDetailData?.payment_method === "cash"
                ? t("bookingDetails.payCashMessage", {
                    amount: bookingDetailData?.total_amount,
                  })
                : t("bookingDetails.payOnlineMessage", {
                    amount: bookingDetailData?.total_amount,
                  })}
            </p>
          </div>
          <div className="text-end">
            <p className="text-sm/tight font-semibold text-primary flex gap-1">
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.26953 12.9004L13 11.9023C12.9727 12.1849 12.9226 12.4583 12.8497 12.7227C12.7767 12.987 12.6856 13.2422 12.5762 13.4883L7.8457 14.5C7.87305 14.2174 7.92318 13.9395 7.99609 13.666C8.06901 13.4017 8.16016 13.1465 8.26953 12.9004ZM12.5762 10.4805L7.8457 11.4922V8.4707L6.36914 8.78516V10.4531C6.36914 10.5352 6.35547 10.6126 6.32813 10.6855C6.3099 10.7493 6.28255 10.8132 6.24609 10.877L5.48047 12.0117C5.38021 12.1484 5.25716 12.2669 5.11133 12.3672C4.97461 12.4583 4.82422 12.5221 4.66016 12.5586L0.476562 13.4473C0.503906 13.1647 0.554036 12.8913 0.626953 12.627C0.699869 12.3535 0.79102 12.0938 0.90039 11.8477L4.89258 11V9.09961L1.17383 9.8926C1.20117 9.61003 1.2513 9.33659 1.32422 9.07227C1.39714 8.79883 1.48828 8.53906 1.59766 8.29297L4.89258 7.5957V1.73047C5.10221 1.48438 5.33008 1.25651 5.57617 1.04688C5.82227 0.83724 6.08659 0.65495 6.36914 0.5V7.28125L7.8457 6.9668V2.46875C8.04622 2.22266 8.26953 1.99479 8.51563 1.78516C8.77083 1.57552 9.03971 1.39323 9.32227 1.23828V6.65234L13 5.87305C12.9727 6.1556 12.9226 6.43359 12.8497 6.70703C12.7767 6.97135 12.6856 7.22656 12.5762 7.47266L9.32227 8.15625V9.6738L13 8.88086C12.9727 9.16341 12.9226 9.44141 12.8497 9.7148C12.7767 9.9792 12.6856 10.2344 12.5762 10.4805Z"
                  fill="#007A47"
                />
              </svg>
              {bookingDetailData?.total_amount}
            </p>
          </div>
        </div>

        {bookingDetailData?.bookingStatuses?.some((item) => item.status === "accepted" && item.is_status === true) && (
          <button
            className="text-sm/tight font-semibold w-full flex items-center justify-between text-primary cursor-pointer"
            onClick={() => {
              if (bookingDetailData?.invoice) {
                window.open(bookingDetailData?.invoice, "_blank");
              }
            }}
          >
            <span>{t("bookingDetails.viewInvoice")}</span>
            <ChevronRight className="rtl:rotate-180" />
          </button>
        )}

        {bookingDetailData?.bookingStatuses?.some((item) => item?.status === "delivered" && item?.is_status === true) &&
          bookingDetailData?.payment_method === "cash" &&
          bookingDetailData?.payment_status !== "success" && (
            <div className="mt-2">
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#007a47",
                  paddingX: "12px",
                  paddingY: 0.4,
                  borderColor: "#007A47",
                  backgroundColor: "#007A471A",
                  "&:hover": { backgroundColor: "#007A47", color: "#FFF" },
                }}
                onClick={() => {
                  setShowPaymentCollectedDialog(true);
                }}
              >
                {t("bookingDetails.paymentCollect")}
              </Button>
            </div>
          )}
      </div>
      <PaymentCollectedDialog
        openDialog={showPaymentCollectedDialog}
        setOpenDialog={setShowPaymentCollectedDialog}
        bookingId={bookingDetailData?.id}
      />
    </>
  );
};

export default PaymentMethod;
