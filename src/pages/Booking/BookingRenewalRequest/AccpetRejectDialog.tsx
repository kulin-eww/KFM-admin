import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useToast from "../../../hooks/useToast";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, useTheme } from "@mui/material";
import { DeleteIcon } from "../../../components/common/icons";
import { acceptRejectBookingRenewal } from "../../../api/bookingRenewal";
import { useTranslation } from "react-i18next";

const AcceptCancelDialog: React.FC<{
  openDialog: true;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  bookingRenewalId: string;
  bookingDetailStatus: "approved" | "rejected" | "";
}> = ({ openDialog, setOpenDialog, bookingRenewalId, bookingDetailStatus }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const acceptCancelBookingRenewalMutation = useMutation({
    mutationFn: acceptRejectBookingRenewal,
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
    validationSchema: object().shape({
      reason:
        bookingDetailStatus === "rejected"
          ? string().trim().required(t("bookingDetails.pleaseEnterRejectionReason"))
          : string().notRequired(),
    }),
    onSubmit: (values) => {
      acceptCancelBookingRenewalMutation?.mutate({
        id: bookingRenewalId,
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
            {t("bookingDetails.areYouSureYouWantTo")} {bookingDetailStatus === "approved" ? t("bookingDetails.accept") : t("bookingDetails.reject")} {t("bookingDetails.thisBookingRenewal")}?
          </DialogTitle>
        </Stack>
        <DialogContent sx={{ background: "transparent" }}>
          {bookingDetailStatus === "rejected" && (
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
        <DialogActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            variant="outlined"
            // sx={{
            //   borderRadius: 2,
            //   fontWeight: 500,
            //   width: "100%",
            //   border: "1px solid",
            //   borderColor: theme.palette.primary.main,
            //   background: "#fff",
            //   color: theme.palette.primary.main,
            //   "& :hover": { background: "#fff !important" },
            // }}
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
            loading={acceptCancelBookingRenewalMutation?.isPending}
          >
            {bookingDetailStatus === "approved" ? t("bookingDetails.accept") : t("bookingDetails.reject")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AcceptCancelDialog;
