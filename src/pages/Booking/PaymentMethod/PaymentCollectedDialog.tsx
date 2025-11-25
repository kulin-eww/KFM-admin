import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useToast from "../../../hooks/useToast";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, useTheme } from "@mui/material";
import { PaymentCollectedIcon } from "../../../components/common/icons";
import { paymentCollectedAPI } from "../../../api/booking";
import { useTranslation } from "react-i18next";

const PaymentCollectedDialog: React.FC<{
  openDialog: boolean;
  setOpenDialog: any;
  bookingId: string;
}> = ({ openDialog, setOpenDialog, bookingId }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const paymentCollectedMutation = useMutation({
    mutationFn: paymentCollectedAPI,
    onSuccess: (res: any) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["detailsBooking"] });
      setOpenDialog(false);
    },
    onError: (error) => {
      useToast(error.message, "error");
      setOpenDialog(false);
    },
  });

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: "30%",
                sm: "60%",
                md: "30%",
              },
              maxWidth: "90vw",
              borderRadius: 3,
              boxShadow: theme.shadows[24],
              p: 2,
              // background: `linear-gradient(135deg, ${theme.palette.background.paper} 80%, ${theme.palette.error.light}10%)`,
            },
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, mt: 1, ml: 2 }}>
          <DialogTitle
            sx={{
              flex: 1,
              p: 0,
              fontWeight: 600,
              color: (theme) => theme.palette.grey[900],
              fontSize: 24,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {t("bookingDetails.collectPayment")}
          </DialogTitle>
        </Stack>
        <DialogContent sx={{ background: "transparent" }}>
          <div className="flex flex-col justify-center items-center mb-4 gap-4">
            <PaymentCollectedIcon className="h-28" />
            <div>
              <p className="text-lg/tight font-medium text-[#676767] px-8 text-center">
                {t("bookingDetails.didYouReceiveThePaymentForThisBooking")}
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            onClick={() => {
              paymentCollectedMutation.mutate(bookingId);
            }}
            variant="contained"
            fullWidth
            loading={paymentCollectedMutation?.isPending}
          >
            {t("bookingDetails.yes")}
          </Button>
          <Button
            fullWidth
            onClick={() => {
              setOpenDialog(false);
            }}
            variant="outlined"
          >
            {t("bookingDetails.no")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentCollectedDialog;
