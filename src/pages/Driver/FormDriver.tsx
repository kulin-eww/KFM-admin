import React, { useState, useEffect } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";
import * as Yup from "yup";
import FileUploadInput from "../../components/input/FileUploadInput";
import VerifyNumberDialog from "./VerifyNumberDialog";
import { sendOtpAPI } from "../../api/driver";
import useToast from "../../hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { LENGTH, REGEX } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const FormDriver: React.FC<{
  action: "add" | "edit" | "view";
  onSave?: any;
  initialValues: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}> = ({ action, onSave, initialValues, isSuccess, isError, isLoading }) => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isNumberVerified, setIsNumberVerified] = useState(action === "edit" ? true : false);
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  const navigate = useNavigate();

  let title = "";
  if (action === "edit") {
    title = "Edit Player";
  } else if (action === "view") {
    title = "View";
  } else {
    title = "Add New Player";
  }

  const handleVerifyNumber = useMutation({
    mutationFn: sendOtpAPI,
    onSuccess: (res) => {
      useToast(res.message);
      setOpen(true);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Player Name is required")
        .min(LENGTH.MIN_STRING_LENGTH, "Player name must be at least 2 characters")
        .max(LENGTH.MAX_STRING_LENGTH, "Player name must be at most 70 characters"),
      phone: Yup.string()
        .trim()
        .required("Please enter mobile number")
        .matches(REGEX.NUMBERS_ONLY, "Only numbers are allowed")
        .test("len-9-or-10", t("driver.invalidPhone"), function (value) {
          if (!value) return false;
          // If starts with '0', must be exactly 10 digits. Else, exactly 9 digits.
          if (value.startsWith("0")) {
            return value.length === 10;
          } else {
            return value.length === 9;
          }
        }),
      email: Yup.string()
        .trim()
        .required(t("driver.emailRequired"))
        .email(t("driver.emailInvalid"))
        .matches(REGEX.EMAIL, t("driver.emailInvalid")),
      dob: Yup.string()
        .required(t("driver.dobRequired"))
        .test("is-18", t("driver.mustBe18"), function (value) {
          if (!value) return false;
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          const dayDiff = today.getDate() - dob.getDate();
          return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
        }),
      address: Yup.string()
        .trim()
        .required(t("driver.addressRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("driver.addressMinLength")),
      // .max(LENGTH.MAX_STRING_LENGTH, t("driver.addressMaxLength")),
      license_number: Yup.string()
        .trim()
        .required(t("driver.licenseNumberRequired"))
        .min(LENGTH.MIN_NUMBER_LENGTH, t("driver.licenseNumberMinLength"))
        .max(LENGTH.MAX_NUMBER_LENGTH, t("driver.licenseNumberMaxLength")),
      license_expiry_date: Yup.string().required(t("driver.licenseExpiryDateRequired")),
      profile_image: Yup.mixed()
        .required(t("driver.profileImageRequired"))
        .test("conditionalRequired", t("driver.profileImageRequired"), function (value: any) {
          const { path, createError } = this;
          if (action === "edit" && value === initialValues.profile_image) {
            return true;
          }
          if (!value) {
            return createError({ path, message: t("driver.profileImageRequired") });
          }
          if (value instanceof File) {
            if (!["image/jpeg", "image/png", "image/jpg"].includes(value.type)) {
              return createError({ path, message: t("driver.profileImageFileType") });
            }
            if (value.size > LENGTH.MAX_FILE_SIZE) {
              return createError({ path, message: t("driver.profileImageFileSize") });
            }
          } else {
            return createError({ path, message: t("driver.invalidFile") });
          }

          return true;
        }),
      driving_license_front: Yup.mixed()
        .required(t("driver.drivingLicenseRequired"))
        .test("conditionalRequired", t("driver.drivingLicenseRequired"), function (value) {
          const { path, createError } = this;
          if (action === "edit" && value === initialValues.driving_license_front) {
            return true;
          }
          if (!value) {
            return createError({ path, message: t("driver.drivingLicenseRequired") });
          }
          if (value instanceof File) {
            if (!["application/pdf"].includes(value.type)) {
              return createError({ path, message: t("driver.drivingLicenseFileType") });
            }
            if (value.size > LENGTH.MAX_FILE_SIZE) {
              return createError({ path, message: t("driver.drivingLicenseFileSize") });
            }
          } else {
            return createError({ path, message: t("driver.invalidFile") });
          }

          return true;
        }),
      // .test("fileType", "Invalid file type. Only PDF files are allowed.", function (value: any) {
      //   if (!value) return true;
      //   if (typeof value === "string") return true;
      //   if (value instanceof File) {
      //     return value.type === "application/pdf";
      //   }
      //   return false;
      // }),
    }),
    onSubmit: async (values) => {
      onSave.mutate(values);
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  useEffect(() => {
    if (action === "edit") {
      setVerifiedPhone(initialValues.phone);
    }
  }, [initialValues]);

  useEffect(() => {
    if (formik.values.phone !== verifiedPhone) {
      setIsNumberVerified(false);
    }
    if (verifiedPhone && formik.values.phone === verifiedPhone) {
      setIsNumberVerified(true);
    }
  }, [formik.values.phone, verifiedPhone]);

  useEffect(() => {
    if (action === "edit" && initialValues?.phone === formik.values?.phone) {
      setIsNumberVerified(true);
    }
  }, [action, initialValues?.phone, formik.values?.phone]);

  return (
    <>
      <div className="bg-layout-bg rounded-3xl shadow-md px-2 py-4">
        <div className="flex justify-start items-center mb-2 gap-2 px-2">
          <div className="text-xl font-bold">{title}</div>
        </div>
        <div className="w-full p-4 rounded-xl">
          {isLoading && <Loader />}
          {isSuccess && !isLoading && (
            <form noValidate onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <TextField
                  fullWidth
                  label={"Name"}
                  name="name"
                  type="text"
                  placeholder="Enter Player Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && (formik.errors.name as string)}
                  disabled={action === "view"}
                />

                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="phone"
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && (formik.errors.phone as string)}
                  disabled={action === "view"}
                  // slotProps={{
                  //   htmlInput: {
                  //     maxLength: 10,
                  //   },
                  // }}
                  sx={{
                    "& .MuiInputLabel-root": {
                      whiteSpace: "normal",
                      overflow: "visible",
                      textOverflow: "clip",
                    },
                    "& .MuiOutlinedInput-root": {
                      paddingRight: 0.5, // remove root padding
                    },
                    "& .MuiOutlinedInput-input": {
                      paddingRight: 0, // remove input padding
                    },
                    "& .MuiInputAdornment-root": {
                      marginRight: 0, // remove adornment margin
                      paddingRight: 0,
                    },
                  }}
                  slotProps={{
                    htmlInput: {
                      maxLength: 10,
                    },
                    input: {
                      endAdornment:
                        action !== "view" ? (
                          <InputAdornment position="end">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                handleVerifyNumber.mutate({ phone: formik.values.phone });
                              }}
                              disabled={Boolean(formik.errors.phone) || !formik.values.phone || isNumberVerified}
                              loading={handleVerifyNumber.isPending}
                            >
                              {!isNumberVerified ? (
                                t("common.verify")
                              ) : (
                                <span className="text-green-600">{t("common.verified")}</span>
                              )}
                            </Button>
                          </InputAdornment>
                        ) : null,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={t("driver.email")}
                  name="email"
                  type="email"
                  placeholder={t("driver.driverEmail")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && (formik.errors.email as string)}
                  disabled={action === "view" || action === "edit"}
                />

                <TextField
                  fullWidth
                  label={t("driver.dob")}
                  name="dob"
                  type="date"
                  placeholder={t("driver.driverDob")}
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && (formik.errors.dob as string)}
                  disabled={action === "view"}
                  slotProps={{
                    input: {
                      inputProps: {
                        // max: new Date().toISOString().split("T")[0],
                        max: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0],
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={t("driver.address")}
                  name="address"
                  type="text"
                  placeholder={t("driver.driverAddress")}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && (formik.errors.address as string)}
                  multiline
                  rows={2}
                  disabled={action === "view"}
                />
              </div>
              {(action === "add" || action === "edit") && (
                <div className="flex flex-wrap justify-end gap-2 mt-6">
                  <Button
                    variant="cancel"
                    sx={{
                      px: { xs: 3, sm: 6 }, // responsive padding: small on mobile, bigger on desktop
                      py: 1.5,
                      flex: { xs: "1 1 100%", sm: "auto", md: "none" }, // full width on mobile
                    }}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    {t("common.Cancel")}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    loading={onSave.isPending}
                    disabled={!isNumberVerified}
                    sx={{
                      px: { xs: 3, sm: 6 },
                      py: 1.5,
                      flex: { xs: "1 1 100%", sm: "auto", md: "none" },
                    }}
                  >
                    {action === "add" ? t("driver.addNew") : t("driver.updateDriver")}
                  </Button>
                </div>
              )}
            </form>
          )}
          {isError && <ErrorLottie />}
        </div>
      </div>
      <VerifyNumberDialog
        open={open}
        setOpen={setOpen}
        handleVerifyNumber={handleVerifyNumber}
        phone={formik.values.phone}
        setIsNumberVerified={setIsNumberVerified}
        setVerifiedPhone={setVerifiedPhone}
      />
    </>
  );
};

export default FormDriver;
