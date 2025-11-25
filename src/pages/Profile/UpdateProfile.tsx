import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import type { RootState } from "../../redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { setVendorDetails } from "../../redux/slices/vendorSlice";
import FileUploadInput from "../../components/input/FileUploadInput";
import AvatarUploadInput from "../../components/input/AvatarUploadInput";
import { updateProfileAPI } from "../../api/vendor";
import { useEffect, useState } from "react";
import { listDumpYardAPI } from "../../api/dumpYard";
import { BackArrowIcon, ChevronDownGreen } from "../../components/common/icons";
import { useTranslation } from "react-i18next";
import { LENGTH, REGEX } from "../../utils/constant";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const formatTo12Hour = (time24: string) => {
  if (!time24) return "";
  const [hour, minute] = time24.split(":");
  let h = parseInt(hour);
  const suffix = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h.toString().padStart(2, "0")}:${minute} ${suffix}`;
};

const UpdateProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userDetails = useSelector((state: RootState) => state.user.vendorDetails);
  const [dumpYards, setDumpYards] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const { mutate: submitProfile, isPending: isSavingProfile } = useMutation({
    mutationFn: updateProfileAPI,
    onSuccess: (res: any) => {
      useToast(res.message || "Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      useToast(error?.message || "Failed to update profile", "error");
    },
  });
  console.log("Line 45", userDetails?.open_time, userDetails?.close_time);
  const {
    values: profileValues,
    handleChange: handleProfileChange,
    handleBlur: handleProfileBlur,
    handleSubmit: handleProfileSubmit,
    touched: profileTouched,
    errors: profileErrors,
    dirty: profileDirty,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      company_name: userDetails.company_name || "",
      email: userDetails.email || "",
      tax_number: userDetails.tax_number || "",
      commercial_register_number: userDetails.commercial_register_number || "",
      license_number: userDetails.license_number || "",
      dumping_yards: userDetails?.dumpYards.map((dy) => dy.id),
      open_time: userDetails.open_time || "",
      close_time: userDetails.close_time || "",
    },
    validationSchema: Yup.object({
      company_name: Yup.string()
        .trim()
        .required(t("auth.companyNameRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("auth.companyNameMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("auth.companyNameMaxLength")),
      email: Yup.string()
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
      dumping_yards: Yup.array().of(Yup.string().required()).min(1, t("auth.dumpYardsRequired")),
      open_time: Yup.string()
        .required(t("common.required", { field: t("profile.updateProfile.openTime") }))
        .test("is-before-end", t("manageSchedule.invalidStartTime"), function (value) {
          const { close_time } = this.parent;
          if (!value || !close_time) return true;

          const [startHour, startMin] = value.split(":").map(Number);
          const [endHour, endMin] = close_time.split(":").map(Number);
          const startTotal = startHour * 60 + startMin;
          const endTotal = endHour * 60 + endMin;

          return startTotal < endTotal;
        }),
      close_time: Yup.string()
        .required(t("common.required", { field: t("profile.updateProfile.closeTime") }))
        .test("is-after-start", t("manageSchedule.invalidEndTime"), function (value) {
          const { open_time } = this.parent;
          if (!open_time || !value) return true;

          const [startHour, startMin] = open_time.split(":").map(Number);
          const [endHour, endMin] = value.split(":").map(Number);
          const startTotal = startHour * 60 + startMin;
          const endTotal = endHour * 60 + endMin;

          return endTotal > startTotal; // ✅ end must be after start
        }),
    }),
    onSubmit: (values) => {
      const payload: any = {
        company_name: values.company_name,
        email: values.email,
        tax_number: values.tax_number,
        commercial_register_number: values.commercial_register_number,
        license_number: values.license_number,
        dumping_yards: values.dumping_yards,
        open_time: values.open_time,
        close_time: values.close_time,
      };
      submitProfile(payload);
    },
  });

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["listDumpYards"],
    queryFn: () => listDumpYardAPI(),
  });

  useEffect(() => {
    if (isSuccess) {
      setDumpYards(data?.data);
    } else if (isError) {
      setDumpYards([]);
    }
  }, [isSuccess, isError, data]);

  return (
    <div>
      <div className="bg-white shadow-md rounded-xl px-6 py-4 mb-2">
        <div className="flex items-center gap-2">
          <BackArrowIcon className="w-7 h-7 mb-2 cursor-pointer text-gray-500" onClick={() => navigate(-1)} />
          <div className="text-2xl font-bold mb-2">{t("profile.updateProfile.title")}</div>
        </div>
        <div className="mt-2 bg-bg-secondary p-4 rounded-xl">
          <form onSubmit={handleProfileSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label={t("profile.updateProfile.companyNameLabel")}
                name="company_name"
                type="text"
                placeholder={t("profile.updateProfile.companyNamePlaceholder")}
                value={profileValues.company_name}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.company_name && Boolean(profileErrors.company_name)}
                helperText={profileTouched.company_name && profileErrors.company_name}
              />
              <TextField
                fullWidth
                label={t("profile.updateProfile.emailLabel")}
                name="email"
                type="email"
                placeholder={t("profile.updateProfile.emailPlaceholder")}
                value={profileValues.email}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.email && Boolean(profileErrors.email)}
                helperText={profileTouched.email && profileErrors.email}
                disabled={true}
              />
              <TextField
                fullWidth
                label={t("profile.updateProfile.taxNumberLabel")}
                name="tax_number"
                type="text"
                placeholder={t("profile.updateProfile.taxNumberPlaceholder")}
                value={profileValues.tax_number}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.tax_number && Boolean(profileErrors.tax_number)}
                helperText={profileTouched.tax_number && (profileErrors.tax_number as any)}
              />
              <TextField
                fullWidth
                label={t("profile.updateProfile.commercialRegisterLabel")}
                name="commercial_register_number"
                type="text"
                placeholder={t("profile.updateProfile.commercialRegisterPlaceholder")}
                value={profileValues.commercial_register_number}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.commercial_register_number && Boolean(profileErrors.commercial_register_number)}
                helperText={
                  profileTouched.commercial_register_number && (profileErrors.commercial_register_number as any)
                }
                sx={{
                  "& .MuiInputLabel-root": {
                    whiteSpace: "normal",
                    overflow: "visible",
                    wordBreak: "break-word",
                    flexWrap: "wrap",
                    overflowWrap: "break-word",
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("profile.updateProfile.licenseNumberLabel")}
                name="license_number"
                type="text"
                placeholder={t("profile.updateProfile.licenseNumberPlaceholder")}
                value={profileValues.license_number}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.license_number && Boolean(profileErrors.license_number)}
                helperText={profileTouched.license_number && (profileErrors.license_number as any)}
              />
              <TextField
                fullWidth
                label={t("profile.updateProfile.openTime")}
                name="open_time"
                type="time"
                placeholder={t("profile.updateProfile.openTimePlaceHolder")}
                value={profileValues.open_time}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.open_time && Boolean(profileErrors.open_time)}
                helperText={profileTouched.open_time && (profileErrors.open_time as any)}
              />
              <TextField
                fullWidth
                label={t("profile.updateProfile.closeTime")}
                name="close_time"
                type="time"
                placeholder={t("profile.updateProfile.closeTimePlaceHolder")}
                value={profileValues.close_time}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.close_time && Boolean(profileErrors.close_time)}
                helperText={profileTouched.close_time && (profileErrors.close_time as any)}
              />
              <Autocomplete
                multiple
                fullWidth
                options={dumpYards}
                disableCloseOnSelect
                value={dumpYards.filter((dy) => profileValues.dumping_yards.includes(dy.id))}
                onChange={(_, newValue) => {
                  const ids = newValue.map((item) => item.id);
                  setFieldValue("dumping_yards", ids);
                }}
                getOptionLabel={(option) => {
                  return option?.name?.en + " (" + option?.type?.replace("_", " ")?.replace("_", "") + ")";
                }}
                popupIcon={<ChevronDownGreen className="w-3 h-3" />}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("profile.updateProfile.dumpingYardLabel")}
                    placeholder={
                      profileValues.dumping_yards.length > 0 ? "" : t("profile.updateProfile.dumpingYardPlaceholder")
                    }
                    error={profileTouched.dumping_yards && Boolean(profileErrors.dumping_yards)}
                    helperText={profileErrors.dumping_yards && (profileErrors.dumping_yards as string)}
                  />
                )}
                sx={{
                  "& .MuiChip-root": {
                    backgroundColor: "#16a34a",
                    color: "white",
                  },
                  "& .MuiChip-deleteIcon": {
                    color: "white",
                  },
                  "& .MuiChip-deleteIcon:hover": {
                    color: "#f87171",
                  },

                  "& .MuiAutocomplete-endAdornment": {
                    position: "absolute",
                    right: 8,
                    top: 6,
                    transform: "none",
                    alignItems: "flex-start",
                    height: "auto",
                  },
                }}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit" variant="contained" disabled={!profileDirty} loading={isSavingProfile}>
                {t("profile.updateProfile.saveProfileButton")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
