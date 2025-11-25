import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { type SetStateAction } from "react";
import { acceptRejectGracePeriod } from "../../api/gracePeriod";
import useToast from "../../hooks/useToast";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, useTheme } from "@mui/material";
import { DeleteIcon } from "../../components/common/icons";
import { acceptRejectBookingRenewal } from "../../api/bookingRenewal";
import { useTranslation } from "react-i18next";

const BookingRenewalStatus: React.FC<{
  bookingRenewalStatusModal: boolean;
  setBookingRenewalStatusModal: React.Dispatch<SetStateAction<boolean>>;
  bookingRenewalId: string;
  bookingRenewalStaus: "approved" | "rejected" | "";
}> = ({ bookingRenewalId, bookingRenewalStatusModal, setBookingRenewalStatusModal, bookingRenewalStaus }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const gracePeriodStatusMutation = useMutation({
    mutationFn: acceptRejectBookingRenewal,
    onSuccess: (res: any) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listBookingRenewal"] });
      setBookingRenewalStatusModal(false);
      resetForm();
    },
    onError: (error) => {
      useToast(error.message, "error");
      setBookingRenewalStatusModal(false);
      resetForm();
    },
  });

  const { values, errors, handleChange, handleBlur, touched, resetForm, handleSubmit } = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: object().shape({
      reason:
        bookingRenewalStaus === "rejected"
          ? string().trim().required("Please enter rejction reason")
          : string().notRequired(),
    }),
    onSubmit: (values) => {
      gracePeriodStatusMutation?.mutate({ id: bookingRenewalId, status: bookingRenewalStaus, reason: values?.reason });
    },
  });

  return (
    <>
      <Dialog
        open={bookingRenewalStatusModal}
        onClose={() => setBookingRenewalStatusModal(false)}
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
              fontWeight: 700,
              color: (theme) => theme.palette.grey[900],
              fontSize: 24,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {t("bookingRenewal.modal.title")}
          </DialogTitle>
        </Stack>
        <DialogContent sx={{ background: "transparent" }}>
          {bookingRenewalStaus === "rejected" && (
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
                  placeholder={t("bookingRenewal.modal.reasonPlaceholder")}
                  label={t("bookingRenewal.modal.reasonLabel")}
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
              setBookingRenewalStatusModal(false);
            }}
            variant="outlined"
            sx={{
              borderRadius: 2,
              fontWeight: 500,
              width: "100%",
              border: "1px solid",
              borderColor: theme.palette.primary.main,
              background: "#fff",
              color: theme.palette.primary.main,
              "& :hover": { background: "#fff !important" },
            }}
          >
            {t("bookingRenewal.modal.cancelButton")}
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 2, width: "100%" }}
            loading={gracePeriodStatusMutation?.isPending}
          >
            {bookingRenewalStaus === "approved"
              ? t("bookingRenewal.modal.acceptButton")
              : t("bookingRenewal.modal.rejectButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingRenewalStatus;
