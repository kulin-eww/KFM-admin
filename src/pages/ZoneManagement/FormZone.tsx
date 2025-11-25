import React, { useState, useEffect } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";
import * as Yup from "yup";
import useToast from "../../hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { LENGTH, REGEX } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import DrawZone from "./DrawZone";

const FormZone: React.FC<{
  action: "add" | "edit" | "view";
  onSave?: any;
  initialValues: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}> = ({ action, onSave, initialValues, isSuccess, isError, isLoading }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [zones, setZones] = useState<google.maps.LatLngLiteral[][]>([]);

  let title = "";
  if (action === "edit") {
    title = t("zoneManagement.edit");
  } else if (action === "view") {
    title = t("zoneManagement.view");
  } else {
    title = t("zoneManagement.add");
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      zone_name: Yup.string()
        .trim()
        .required(t("zoneManagement.zoneNameRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("zoneManagement.zoneNameMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("zoneManagement.zoneNameMaxLength")),
    }),
    onSubmit: async (values) => {
      if(zones.length === 0) {
        useToast(t("zoneManagement.pleaseDrawZone"), "error");
        return;
      }
      onSave.mutate({ ...values, radius: zones });
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  useEffect(() => {
    if (action === "view" || action === "edit") {
      setZones(initialValues?.radius);
    }
  }, [initialValues]);

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
                  label={t("zoneManagement.zoneName")}
                  name="zone_name"
                  type="text"
                  placeholder={t("zoneManagement.zoneNamePlaceholder")}
                  value={formik.values.zone_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.zone_name && Boolean(formik.errors.zone_name)}
                  helperText={formik.touched.zone_name && (formik.errors.zone_name as string)}
                  disabled={action === "view"}
                />

                <DrawZone zones={zones} setZones={setZones} action={action} />
              </div>
              {(action === "add" || action === "edit") && (
                <div className="flex flex-wrap justify-end gap-2 mt-6">
                  <Button
                    variant="outlined"
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
                    sx={{
                      px: { xs: 3, sm: 6 },
                      py: 1.5,
                      flex: { xs: "1 1 100%", sm: "auto", md: "none" },
                    }}
                  >
                    {action === "add" ? t("zoneManagement.addZone") : t("zoneManagement.updateZone")}
                  </Button>
                </div>
              )}
            </form>
          )}
          {isError && <ErrorLottie />}
        </div>
      </div>
    </>
  );
};

export default FormZone;
