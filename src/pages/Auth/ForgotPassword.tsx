import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "../../api/auth";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { REGEX } from "../../utils/constant";
import { useEffect } from "react";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordAPI,
    onSuccess: (res) => {
      navigate("/signin");
      resetForm();
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm, validateForm } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .required(t("auth.emailRequired"))
        .email(t("auth.emailInvalid"))
        .matches(REGEX.EMAIL, t("auth.emailInvalid")),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    validateForm();
  }, [i18n.language]);

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <div className="font-bold text-center text-3xl">{t("auth.forgotPassword.title")}</div>
          <p className="font-medium tracking-wide text-center text-md text-secondary">
            {t("auth.forgotPassword.subtitle")}
          </p>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-6 w-full sm:w-100 md:w-120 lg:w-100 xl:w-120">
            <TextField
              fullWidth
              label={t("auth.forgotPassword.emailLabel")}
              name="email"
              type="email"
              placeholder={t("auth.forgotPassword.emailPlaceholder")}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Button type="submit" fullWidth variant="contained" color="primary" loading={isPending}>
              {t("auth.forgotPassword.sendRecoveryEmail")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
