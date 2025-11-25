import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { type SetStateAction } from "react";
import useToast from "../../hooks/useToast";
import { DeleteIcon } from "../../components/common/icons";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { object, string } from "yup";
import { acceptRejectEarlyPickupAPI } from "../../api/earlyPickup";
import { useTranslation } from "react-i18next";

const AcceptRejectEarlyPickup: React.FC<{
  earlyPickupStatusModal: boolean;
  setEarlyPickupStatusModal: React.Dispatch<SetStateAction<boolean>>;
  earlyPickupId: string;
  earlyPickupStaus: "approved" | "rejected";
}> = ({ earlyPickupId, earlyPickupStatusModal, setEarlyPickupStatusModal, earlyPickupStaus }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const earlyPickupStatusMutation = useMutation({
    mutationFn: acceptRejectEarlyPickupAPI,
    onSuccess: (res: any) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listEarlyPickup"] });
      setEarlyPickupStatusModal(false);
      resetForm();
    },
    onError: (error) => {
      useToast(error.message, "error");
      setEarlyPickupStatusModal(false);
      resetForm();
    },
  });

  const { values, errors, handleChange, handleBlur, touched, resetForm, handleSubmit } = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: object().shape({
      reason:
        earlyPickupStaus === "rejected"
          ? string().trim().required("Please enter rejction reason")
          : string().notRequired(),
    }),
    onSubmit: (values) => {
      earlyPickupStatusMutation?.mutate({ id: earlyPickupId, status: earlyPickupStaus, reject_reason: values?.reason });
    },
  });

  return (
    <>
      <Dialog
        open={earlyPickupStatusModal}
        onClose={() => setEarlyPickupStatusModal(false)}
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
            {"Are you sure you want to change the status of Early Pickup?"}
          </DialogTitle>
        </Stack>
        <DialogContent sx={{ background: "transparent" }}>
          {earlyPickupStaus === "rejected" && (
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
                  placeholder={t("earlyPickup.modal.reasonPlaceholder")}
                  label={t("earlyPickup.modal.reasonLabel")}
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
              setEarlyPickupStatusModal(false);
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
            {t("earlyPickup.modal.cancelButton")}
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 2, width: "100%" }}
            loading={earlyPickupStatusMutation?.isPending}
          >
            {earlyPickupStaus === "approved"
              ? t("earlyPickup.modal.acceptButton")
              : t("earlyPickup.modal.rejectButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AcceptRejectEarlyPickup;
