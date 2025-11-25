import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, Button, Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signupAPI } from "../../api/auth";
import useToast from "../../hooks/useToast";
import { CheckIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { LENGTH, REGEX } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ChevronDownGreen } from "../../components/common/icons";
import { listDumpYardAPI } from "../../api/dumpYard";

const SignUp = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const icon = <CheckIcon fontSize="small" />;
  const checkedIcon = <CheckBadgeIcon fontSize="small" />;
  const [dumpYards, setDumpYards] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["listDumpYards"],
    queryFn: () => listDumpYardAPI(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (res) => {
      navigate("/signin");
      resetForm();
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setDumpYards(data?.data);
    } else if (isError) {
      setDumpYards([]);
    }
  }, [isSuccess, isError, data]);

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm, setFieldValue, validateForm } = useFormik({
    initialValues: {
      company_name: "",
      email: "",
      tax_number: "",
      commercial_register_number: "",
      license_number: "",
      password: "",
      dumping_yards: [],
    },
    validationSchema: Yup.object({
      company_name: Yup.string()
        .trim()
        .required(t("auth.companyNameRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("auth.companyNameMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("auth.companyNameMaxLength")),
      email: Yup.string()
        .trim()
        .required(t("auth.emailRequired"))
        .email(t("auth.emailInvalid"))
        .matches(REGEX.EMAIL, t("auth.emailInvalid")),
      tax_number: Yup.string()
        .trim()
        .required(t("auth.taxNumberRequired"))
        .min(LENGTH.MIN_NUMBER_LENGTH, t("auth.taxNumberMinLength"))
        .max(LENGTH.MAX_NUMBER_LENGTH, t("auth.taxNumberMaxLength")),
      commercial_register_number: Yup.string()
        .trim()
        .required(t("auth.commercialRegisterRequired"))
        .min(LENGTH.MIN_NUMBER_LENGTH, t("auth.commercialRegisterMinLength"))
        .max(LENGTH.MAX_NUMBER_LENGTH, t("auth.commercialRegisterMaxLength")),
      license_number: Yup.string()
        .trim()
        .required(t("auth.licenseNumberRequired"))
        .min(LENGTH.MIN_NUMBER_LENGTH, t("auth.licenseNumberMinLength"))
        .max(LENGTH.MAX_NUMBER_LENGTH, t("auth.licenseNumberMaxLength")),
      password: Yup.string()
        .trim()
        .required(t("auth.passwordRequired"))
        .matches(REGEX.START_END_SPACE, t("auth.passwordCannotStartOrEndWithSpaces"))
        .min(LENGTH.MIN_PASSWORD_LENGTH, t("auth.passwordMinLength"))
        .max(LENGTH.MAX_PASSWORD_LENGTH, t("auth.passwordMaxLength")),
      dumping_yards: Yup.array().of(Yup.string().required()).min(1, t("auth.dumpYardsRequired")),
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
      <form noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-3 w-full sm:w-100 md:w-120 lg:w-100 xl:w-120">
          <TextField
            fullWidth
            label={t("auth.signUp.companyName")}
            name="company_name"
            type="text"
            placeholder={t("auth.signUp.companyNamePlaceholder")}
            value={values.company_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.company_name && Boolean(errors.company_name)}
            helperText={touched.company_name && errors.company_name}
          />

          <TextField
            fullWidth
            label={t("auth.signUp.emailAddress")}
            name="email"
            type="email"
            placeholder={t("auth.signUp.emailAddressPlaceholder")}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            label={t("auth.signUp.taxNumber")}
            name="tax_number"
            type="text"
            placeholder={t("auth.signUp.taxNumberPlaceholder")}
            value={values.tax_number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.tax_number && Boolean(errors.tax_number)}
            helperText={touched.tax_number && errors.tax_number}
          />

          <TextField
            fullWidth
            label={t("auth.signUp.commercialRegister")}
            name="commercial_register_number"
            type="text"
            placeholder={t("auth.signUp.commercialRegisterPlaceholder")}
            value={values.commercial_register_number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.commercial_register_number && Boolean(errors.commercial_register_number)}
            helperText={touched.commercial_register_number && errors.commercial_register_number}
          />

          <TextField
            fullWidth
            label={t("auth.signUp.licenseNumber")}
            name="license_number"
            type="text"
            placeholder={t("auth.signUp.licenseNumberPlaceholder")}
            value={values.license_number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.license_number && Boolean(errors.license_number)}
            helperText={touched.license_number && errors.license_number}
          />

          <Autocomplete
            multiple
            fullWidth
            options={dumpYards}
            disableCloseOnSelect
            value={dumpYards.filter((dy) => values.dumping_yards.includes(dy.id))} // map ids back to objects for display
            onChange={(_, newValue) => {
              const ids = newValue.map((item) => item.id); // extract ids only
              setFieldValue("dumping_yards", ids); // update formik
            }}
            getOptionLabel={(option) => {
              return option?.name?.en + " (" + option?.type?.replace("_", " ")?.replace("_", "") + ")";
            }}
            popupIcon={<ChevronDownGreen className="w-3 h-3" />}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("auth.signUp.dumpingYard")}
                placeholder={t("auth.signUp.dumpingYardPlaceholder")}
                error={touched.dumping_yards && Boolean(errors.dumping_yards)}
                helperText={touched.dumping_yards && (errors.dumping_yards as string)}
              />
            )}
            sx={{
              "& .MuiAutocomplete-tag": {
                margin: i18n.language === "ar" ? "4px 0 4px 4px" : "4px 4px 4px 0",
                maxWidth: "calc(100% - 8px)",
              },
              "& .MuiAutocomplete-endAdornment": {
                position: "absolute",
                ...(i18n.language === "ar"
                  ? {
                      left: "8px !important",
                      right: "auto !important",
                    }
                  : {
                      right: "8px !important",
                      left: "auto !important",
                    }),
                top: "6px",
                transform: "none",
              },
              "& .MuiChip-root": {
                direction: i18n.language === "ar" ? "rtl" : "ltr",
                "& .MuiChip-label": {
                  paddingLeft: i18n.language === "ar" ? "4px" : "12px",
                  paddingRight: i18n.language === "ar" ? "12px" : "4px",
                },
                "& .MuiChip-deleteIcon": {
                  marginLeft: i18n.language === "ar" ? "4px" : "-4px",
                  marginRight: i18n.language === "ar" ? "-4px" : "4px",
                },
              },
              "& .MuiAutocomplete-inputRoot": {
                flexWrap: "wrap",
                paddingRight: i18n.language === "ar" ? "14px !important" : "14px",
                paddingLeft: i18n.language === "ar" ? "40px !important" : "14px",
                "& .MuiAutocomplete-input": {
                  paddingRight: i18n.language === "ar" ? "14px !important" : "14px",
                  paddingLeft: i18n.language === "ar" ? "0px !important" : "14px",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label={t("auth.signUp.password")}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("auth.signUp.passwordPlaceholder")}
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
                      aria-label={showPassword ? "hide the password" : "display the password"}
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

          <Button type="submit" fullWidth variant="contained" color="primary" loading={isPending} sx={{ marginTop: 2 }}>
            {t("auth.signUp.signUpButton")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
