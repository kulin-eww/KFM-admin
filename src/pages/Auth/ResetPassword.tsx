import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { resetPasswordAPI } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { LENGTH, REGEX } from "../../utils/constant";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userType = searchParams.get("userType");

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordAPI,
    onSuccess: (res) => {
      navigate("/signin");
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, validateForm } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .trim()
        .required(t("auth.passwordRequired"))
        .matches(REGEX.START_END_SPACE, t("auth.passwordCannotStartOrEndWithSpaces"))
        .min(LENGTH.MIN_PASSWORD_LENGTH, t("auth.passwordMinLength"))
        .max(LENGTH.MAX_PASSWORD_LENGTH, t("auth.passwordMaxLength")),
      confirmPassword: Yup.string()
        .trim()
        .required(t("auth.confirmPasswordRequired"))
        .matches(REGEX.START_END_SPACE, t("auth.confirmPasswordCannotStartOrEndWithSpaces"))
        .oneOf([Yup.ref("password"), null], t("auth.confirmPasswordMustBeSame")),
    }),
    onSubmit: (values) => {
      mutate({ newPassword: values.password, token, userType });
    },
  });

  useEffect(() => {
    validateForm();
  }, [i18n.language]);

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <div className="font-bold text-center text-3xl">{t("auth.resetPassword.title")}</div>
          <p className="font-medium tracking-wide text-center text-md text-secondary">
            {t("auth.resetPassword.subtitle")}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-6 w-full sm:w-100 md:w-120 lg:w-100 xl:w-120">
            <TextField
              fullWidth
              label={t("auth.resetPassword.passwordLabel")}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.resetPassword.passwordPlaceholder")}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? t("auth.resetPassword.hidePassword") : t("auth.resetPassword.showPassword")
                        }
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        edge="end"
                      >
                        {showPassword ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label={t("auth.resetPassword.confirmPasswordLabel")}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("auth.resetPassword.confirmPasswordPlaceholder")}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? t("auth.resetPassword.hidePassword")
                            : t("auth.resetPassword.showPassword")
                        }
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                        edge="end"
                      >
                        {showConfirmPassword ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button type="submit" fullWidth variant="contained" color="primary" loading={isPending}>
              {t("auth.resetPassword.resetPasswordButton")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
