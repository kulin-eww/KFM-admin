import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import type { RootState } from "../../redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { setAdminDetails } from "../../redux/slices/adminSlice";
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
import useAppSelector from "../../hooks/useAppSelector";

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
  const userDetails = useAppSelector((state: RootState) => state.admin.adminDetails);
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
      name: userDetails.name || "",
      email: userDetails.email || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Name is required")
        .min(LENGTH.MIN_STRING_LENGTH, "Name must be at least 3 characters")
        .max(LENGTH.MAX_STRING_LENGTH, "Name must be less than 255 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid")
        .matches(REGEX.EMAIL, "Email is invalid"),
    }),
    onSubmit: (values) => {
      const payload: any = {
        name: values.name,
        email: values.email,
      };
      submitProfile(payload);
    },
  });

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["listDumpYards"],
    queryFn: () => listDumpYardAPI(),
  });

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
                label="Name"
                name="name"
                type="text"
                placeholder="Enter name"
                value={profileValues.name}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.name && Boolean(profileErrors.name)}
                helperText={profileTouched.name && profileErrors.name}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                placeholder={t("profile.updateProfile.emailPlaceholder")}
                value={profileValues.email}
                onChange={handleProfileChange}
                onBlur={handleProfileBlur}
                error={profileTouched.email && Boolean(profileErrors.email)}
                helperText={profileTouched.email && profileErrors.email}
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
