import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, TextField, Button, Box, Typography } from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpAPI } from "../../api/driver";
import useToast from "../../hooks/useToast";
import { useTranslation } from "react-i18next";

const VerifyNumberDialog: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleVerifyNumber: any;
  phone: string;
  setIsNumberVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setVerifiedPhone: React.Dispatch<React.SetStateAction<string>>;
}> = ({ open, setOpen, handleVerifyNumber, phone, setIsNumberVerified, setVerifiedPhone }) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const handleVerifyOtp = useMutation({
    mutationFn: verifyOtpAPI,
    onSuccess: (res) => {
      useToast(res.message);
      setIsNumberVerified(true);
      setVerifiedPhone(phone);
      setOpen(false);
      setOtp(Array(6).fill(""));
    },
    onError: (error) => {
      useToast(error.message, "error");
      setOtp(Array(6).fill(""));
    },
  });

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        prevInput?.focus();
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (open && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [open, timer]);

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    handleVerifyNumber.mutate({ phone: phone });
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 5,
          p: { xs: 2, sm: 3 }, // padding changes
          width: {
            xs: "90%", // small screens
            sm: 400, // tablets
            md: 500, // desktops
            lg: 500, // large desktops
          },
          maxWidth: "100%",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <div className="text-xl font-semibold text-black">{t("driver.verifyYourNumber")}</div>
        <IconButton onClick={handleClose} size="small">
          <XCircleIcon className="h-6" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <div className="my-2 text-sm text-primary">{t("driver.enterOTP")}</div>

        <div className="flex justify-between gap-1 mb-2">
          {otp.map((digit, index) => (
            <TextField
              key={index}
              id={`otp-input-${index}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e: any) => handleKeyDown(e, index)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center" },
              }}
              sx={{
                width: { xs: 40, sm: 50, md: 60 },
                "& input": { textAlign: "left", height: 40, fontSize: { xs: 12, sm: 18, md: 20, lg: 22 } },
              }}
            />
          ))}
        </div>

        <Typography
          variant="body2"
          color={canResend ? "primary" : "textSecondary"}
          sx={{ cursor: canResend ? "pointer" : "default", mb: 2, textAlign: "end" }}
          onClick={handleResend}
        >
          {canResend ? t("driver.resendCode") : `${t("driver.resendCode")} (${timer}s)`}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 2,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
          }}
          disabled={otp.join("").length !== 6}
          onClick={() => {
            handleVerifyOtp.mutate({ phone: phone, otp: otp.join("") });
          }}
          loading={handleVerifyOtp.isPending}
        >
          {t("driver.verifyOTP")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyNumberDialog;
