import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { type SetStateAction } from "react";
import useToast from "../../hooks/useToast";
import { acceptRejectGracePeriod } from "../../api/gracePeriod";
import DeleteDialog from "../../components/common/DeleteDialog";
import { DeleteIcon } from "../../components/common/icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useTranslation } from "react-i18next";

interface gracePeriodStatusProps {
  gracePeriodStatusModal: boolean;
  setGracePeriodStatusModal: React.Dispatch<SetStateAction<boolean>>;
  gracePeriodId: string;
  gracePeriodStaus: "approved" | "rejected";
}

const GracePeriodChangeStatus: React.FC<gracePeriodStatusProps> = ({
  gracePeriodId,
  gracePeriodStatusModal,
  setGracePeriodStatusModal,
  gracePeriodStaus,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const gracePeriodStatusMutation = useMutation({
    mutationFn: acceptRejectGracePeriod,
    onSuccess: (res: any) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listGracePeriod"] });
      setGracePeriodStatusModal(false);
      resetForm();
    },
    onError: (error) => {
      useToast(error.message, "error");
      setGracePeriodStatusModal(false);
      resetForm();
    },
  });

  const { values, errors, handleChange, handleBlur, touched, resetForm, handleSubmit } = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: object().shape({
      reason: gracePeriodStaus === "rejected"
      ? string().trim().required(t("bookingDetails.pleaseEnterRejectionReason"))
      : string().notRequired(),
    }),
    onSubmit: (values) => {
      gracePeriodStatusMutation?.mutate({ id: gracePeriodId, status: gracePeriodStaus, reason: values?.reason });
    },
  });

  return (
    <>
      <Dialog
        open={gracePeriodStatusModal}
        onClose={() => setGracePeriodStatusModal(false)}
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
            {t("gracePeriod.modal.title")}
          </DialogTitle>
        </Stack>
        <DialogContent sx={{ background: "transparent" }}>
          {gracePeriodStaus === "rejected" && (
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
                  placeholder={t("gracePeriod.modal.reasonPlaceholder")}
                  label={t("gracePeriod.modal.reasonLabel")}
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
              setGracePeriodStatusModal(false);
            }}
            variant={"cancel"}
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
            {t("gracePeriod.modal.cancelButton")}
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
            {gracePeriodStaus === "approved"
              ? t("gracePeriod.modal.acceptButton")
              : t("gracePeriod.modal.rejectButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GracePeriodChangeStatus;
