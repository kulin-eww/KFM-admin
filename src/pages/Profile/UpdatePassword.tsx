import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import useToast from "../../hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { changeVendorPasswordAPI } from "../../api/vendor";
import { useTranslation } from "react-i18next";

const UpdatePassword = () => {
  const { t } = useTranslation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: changeVendorPasswordAPI,
    onSuccess: (res) => {
      useToast(res.message);
      resetForm();
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .trim()
        .required(t("profile.updatePassword.oldPasswordRequired"))
        .min(8, t("profile.updatePassword.oldPasswordMinLength")),
      newPassword: Yup.string()
        .trim()
        .required(t("profile.updatePassword.newPasswordRequired"))
        .min(8, t("profile.updatePassword.newPasswordMinLength"))
        .notOneOf([Yup.ref("oldPassword")], t("profile.updatePassword.newPasswordDifferent")),
      confirmPassword: Yup.string()
        .trim()
        .required(t("profile.updatePassword.confirmPasswordRequired"))
        .oneOf([Yup.ref("newPassword"), null], t("profile.updatePassword.confirmPasswordMatch")),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <div className="bg-white shadow-sm rounded-xl px-6 py-4">
        <div className="text-2xl font-bold mb-1">{t("profile.updatePassword.title")}</div>
        <div className="mt-2 bg-bg-secondary p-4 rounded-xl">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-4">
              <TextField
                fullWidth
                label={t("profile.updatePassword.oldPasswordLabel")}
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder={t("profile.updatePassword.passwordPlaceholder")}
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.oldPassword && Boolean(errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "14px",
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showOldPassword
                              ? t("profile.updatePassword.hidePassword")
                              : t("profile.updatePassword.showPassword")
                          }
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          edge="end"
                        >
                          {showOldPassword ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label={t("profile.updatePassword.newPasswordLabel")}
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder={t("profile.updatePassword.passwordPlaceholder")}
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "14px",
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showNewPassword
                              ? t("profile.updatePassword.hidePassword")
                              : t("profile.updatePassword.showPassword")
                          }
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label={t("profile.updatePassword.confirmPasswordLabel")}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("profile.updatePassword.passwordPlaceholder")}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "14px",
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showConfirmPassword
                              ? t("profile.updatePassword.hidePassword")
                              : t("profile.updatePassword.showPassword")
                          }
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit" variant="contained" loading={isPending}>
                {t("profile.updatePassword.savePasswordButton")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
