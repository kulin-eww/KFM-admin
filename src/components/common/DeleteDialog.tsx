import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Stack, useTheme } from "@mui/material";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import i18n from "../../utils/i18n";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  modalImage?: any;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading,
  modalImage,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          {title}
        </DialogTitle>
      </Stack>
      <DialogContent sx={{ background: "transparent" }}>
        <div className="flex justify-center items-center mb-4">{modalImage}</div>
        <Typography
          variant="body1"
          sx={{
            color: (theme) => theme.palette.grey[600],
            fontSize: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ display: "flex", alignItems: "center", gap: i18n.language === "ar" ? 1 : 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
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
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          // sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 2, width: "100%" }}
          fullWidth
          loading={isLoading}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
