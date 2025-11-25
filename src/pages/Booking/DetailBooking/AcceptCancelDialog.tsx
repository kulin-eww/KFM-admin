import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { acceptRejectGracePeriod } from "../../../api/gracePeriod";
import useToast from "../../../hooks/useToast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, useTheme } from "@mui/material";
import { DeleteIcon } from "../../../components/common/icons";
import { acceptCancelBooking } from "../../../api/booking";
import { useTranslation } from "react-i18next";

interface AcceptCancelDialogProps {
  openDialog: true;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  bookingId: string;
  bookingDetailStatus: "accepted" | "rejected" | "cancelled" | "";
}

const AcceptCancelDialog: React.FC<AcceptCancelDialogProps> = ({
  openDialog,
  setOpenDialog,
  bookingId,
  bookingDetailStatus,
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const acceptCancelBookingMutation = useMutation({
    mutationFn: acceptCancelBooking,
    onSuccess: (res: any) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["detailsBooking"] });
      setOpenDialog(false);
      resetForm();
    },
    onError: (error) => {
      useToast(error.message, "error");
      setOpenDialog(false);
      resetForm();
    },
  });

  const { values, errors, handleChange, handleBlur, touched, resetForm, handleSubmit } = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: Yup.object({
      reason:
        bookingDetailStatus === "cancelled"
          ? Yup.string().trim().required(t("bookingDetails.pleaseEnterCancellationReason"))
          : Yup.string().notRequired(),
    }),
    onSubmit: (values) => {
      acceptCancelBookingMutation?.mutate({
        bookingId: bookingId,
        status: bookingDetailStatus,
        reason: values?.reason,
      });
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
                xs: "80%",
                sm: "70%",
                md: "40%",
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
            {t("bookingDetails.areYouSureYouWantTo")}{" "}
            {bookingDetailStatus === "accepted"
              ? t("common.accept")
              : bookingDetailStatus === "rejected"
                ? t("common.reject")
                : t("common.cancel")}{" "}
            {t("bookingDetails.thisBooking")}?
          </DialogTitle>
        </Stack>
        <DialogContent sx={{ background: "transparent" }}>
          {(bookingDetailStatus === "rejected" || bookingDetailStatus === "cancelled") && (
            <>
              <div className="flex justify-center items-center mb-4">
                <DeleteIcon className="h-28" />
              </div>
              <DialogContent
                sx={{ background: "transparent", display: "flex", width: "100%", flexDirection: "column", p: 0 }}
              >
                <TextField
                  fullWidth
                  name="reason"
                  type="text"
                  placeholder={t("bookingDetails.enterReason")}
                  label={t("bookingDetails.provideReason")}
                  value={values?.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.reason && Boolean(errors.reason)}
                  helperText={touched.reason && (errors.reason as string)}
                  multiline
                  rows={4}
                  sx={{
                    "& .MuiInputLabel-root": {
                      whiteSpace: "normal",
                      overflow: "visible",
                      textOverflow: "clip",
                    },
                  }}
                />
              </DialogContent>
            </>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: i18n.language === "ar" ? 1 : 0,
          }}
        >
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            variant="outlined"
            fullWidth
          >
            {t("bookingDetails.cancel")}
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 2, width: "100%" }}
            loading={acceptCancelBookingMutation?.isPending}
          >
            {bookingDetailStatus === "accepted"
              ? t("bookingDetails.accept")
              : bookingDetailStatus === "cancelled"
                ? t("bookingDetails.yesSure")
                : t("bookingDetails.reject")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AcceptCancelDialog;
