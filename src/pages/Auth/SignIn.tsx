import NafathLogo from "../../assets/icons/common/nafath-logo.svg?react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../api/auth";
import useToast from "../../hooks/useToast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { REGEX } from "../../utils/constant";

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      if (!res?.data?.user?.is_kyc) {
        navigate("/setup/account", { state: { email: res?.data?.user?.email } });
      } else {
        navigate("/dashboard");
      }
      resetForm();
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .required(t("auth.emailRequired"))
        .email(t("auth.emailInvalid"))
        .matches(REGEX.EMAIL, t("auth.emailInvalid")),
      password: Yup.string()
        .trim()
        .required(t("auth.passwordRequired"))
        .matches(REGEX.START_END_SPACE, t("auth.passwordCannotStartOrEndWithSpaces")),
    }),
    onSubmit: (rest) => {
      mutate(rest);
    },
  });

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-4 w-full sm:w-100 md:w-120 lg:w-100 xl:w-120">
          <TextField
            fullWidth
            label={t("auth.signIn.emailLabel")}
            name="email"
            type="email"
            placeholder={t("auth.signIn.emailPlaceholder")}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{
              "& input:-webkit-autofill": {
                boxShadow: "0 0 0 1000px white inset !important",
                WebkitBoxShadow: "0 0 0 1000px white inset !important",
              },
            }}
          />

          <TextField
            fullWidth
            label={t("auth.signIn.passwordLabel")}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("auth.signIn.passwordPlaceholder")}
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
                      aria-label={showPassword ? t("auth.signIn.hidePassword") : t("auth.signIn.showPassword")}
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
            sx={{
              "& input:-webkit-autofill": {
                boxShadow: "0 0 0 1000px white inset !important",
                WebkitBoxShadow: "0 0 0 1000px white inset !important",
              },
            }}
          />

          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-end">
              <NavLink to="/forgot-password" className="hover:underline cursor-pointer text-sm font-semibold">
                {t("auth.signIn.forgotPassword")}
              </NavLink>
            </div>
          </div>

          <Button type="submit" fullWidth variant="contained" color="primary" loading={isPending}>
            {t("auth.signIn.signInButton")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
