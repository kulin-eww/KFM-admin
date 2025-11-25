import React, { useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useFormik } from "formik";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";
import * as Yup from "yup";
import { NoContainer } from "../../components/common/icons";
import FormArrayContainer from "./FormArrayContainer";
import {
  binSizeSelectListAPI,
  getGlobalPricingAPI,
  getZoneOptionsListAPI,
  wasteTypeSelectListAPI,
} from "../../api/container";
import { useQuery } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useTranslation } from "react-i18next";
import { REGEX } from "../../utils/constant";

const FormContainer: React.FC<{
  action: "add" | "edit" | "view";
  onSave?: any;
  initialValues: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}> = ({ action, onSave, initialValues, isSuccess, isError, isLoading }) => {
  const { t, i18n } = useTranslation();
  let title = "";
  if (action === "edit") {
    title = t("container.editContainer");
  } else if (action === "view") {
    title = t("container.viewContainer");
  } else {
    title = t("container.addContainer");
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      wasteTypeId: Yup.string()
        .required(t("container.wasteTypeRequired"))
        .notOneOf(["default"], t("container.wasteTypeRequired")),
      binSizeId: Yup.string()
        .required(t("container.binSizeRequired"))
        .notOneOf(["default"], t("container.binSizeRequired")),
      zoneId: Yup.string().required(t("container.zoneRequired")).notOneOf(["default"], t("container.zoneRequired")),
      stock: Yup.string().required(t("container.stockRequired")),
      basePrice: Yup.string()
        .required(t("container.priceRequired"))
        .matches(REGEX.DECIMAL_ONLY, t("common.numbersOnly")),
      pickupFee: Yup.string()
        .required(t("container.pickupfeeRequired"))
        .matches(REGEX.DECIMAL_ONLY, t("common.numbersOnly")),
      deliveryFee: Yup.string()
        .required(t("container.deliveryFeeRequired"))
        .matches(REGEX.DECIMAL_ONLY, t("common.numbersOnly")),
      vendorContainer: Yup.array()
        .of(
          Yup.object({
            barcode: Yup.string().trim().required(t("container.barcodeRequired")),
          })
        )
        .min(1, t("container.atLeastOneContainerRequired")),
      // .test("unique-barcode", t("container.barcodeMustBeUnique"), (vendorContainer) => {
      //   if (!vendorContainer) return true;
      //   const barcodes = vendorContainer.map((vc) => vc.barcode);
      //   const uniqueBarcodes = new Set(barcodes);
      //   const isUnique = uniqueBarcodes.size === barcodes.length;
      //   if (!isUnique) {
      //     useToast(t("container.barcodeMustBeUnique"), "error");
      //   }
      //   return isUnique;
      // }),
    }),
    onSubmit: async (values) => {
      const barcodes = values?.vendorContainer?.map((vc: any) => vc.barcode);
      const uniqueBarcodes = new Set(barcodes);
      const isUnique = uniqueBarcodes.size === barcodes.length;
      if (!isUnique) {
        useToast(t("container.barcodeMustBeUnique"), "error");
      } else {
        onSave.mutate(values);
      }
    },
  });

  const wasteTypeQuery = useQuery({
    queryKey: ["getWasteTypeSelect"],
    queryFn: () => wasteTypeSelectListAPI(),
  });

  const binSizeQuery = useQuery({
    queryKey: ["getBinSizeSelect"],
    queryFn: () => binSizeSelectListAPI(),
  });

  const zoneOptionsQuery = useQuery({
    queryKey: ["getZoneOptionsList"],
    queryFn: () => getZoneOptionsListAPI(),
  });

  const globalPricingQuery = useQuery({
    queryKey: ["getGlobalPricing", formik.values.wasteTypeId, formik.values.binSizeId, formik.values.zoneId],
    queryFn: () =>
      getGlobalPricingAPI({
        wasteTypeId: formik.values.wasteTypeId,
        binSizeId: formik.values.binSizeId,
        zoneId: formik.values.zoneId,
      }),
    enabled:
      action === "add" &&
      formik.values.wasteTypeId !== "default" &&
      formik.values.binSizeId !== "default" &&
      formik.values.zoneId !== "default",
  });

  useEffect(() => {
    if (globalPricingQuery.isError) {
      useToast(globalPricingQuery.error.message, "error");
    }
  }, [globalPricingQuery.isError]);

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  useEffect(() => {
    if (action === "add" && globalPricingQuery.isSuccess && globalPricingQuery.data) {
      formik.setFieldValue("basePrice", globalPricingQuery?.data?.data?.basePrice || "");
      formik.setFieldValue("pickupFee", globalPricingQuery?.data?.data?.pickupFee || "");
      formik.setFieldValue("deliveryFee", globalPricingQuery?.data?.data?.deliveryFee || "");
    }
  }, [action, globalPricingQuery.data, globalPricingQuery.isSuccess]);

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <TextField
                    fullWidth
                    label={t("container.selectWasteType")}
                    name="wasteTypeId"
                    select
                    placeholder={t("container.selectWasteType")}
                    value={formik.values.wasteTypeId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.wasteTypeId && Boolean(formik.errors.wasteTypeId)}
                    helperText={formik.touched.wasteTypeId && (formik.errors.wasteTypeId as string)}
                    disabled={action === "view" || action === "edit"}
                    // slotProps={{
                    //   select: {
                    //     displayEmpty: true,
                    //   },
                    // }}
                  >
                    <MenuItem disabled value="default">
                      {t("container.selectWasteType")}
                    </MenuItem>
                    {wasteTypeQuery.isLoading && <Loader />}
                    {wasteTypeQuery?.data?.data?.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {i18n.language === "ar" ? val?.name_ar : val?.name}
                      </MenuItem>
                    ))}
                    {wasteTypeQuery.isError && <ErrorLottie />}
                  </TextField>
                  <TextField
                    fullWidth
                    label={t("container.selectBinSize")}
                    name="binSizeId"
                    select
                    placeholder={t("container.selectBinSize")}
                    value={formik.values.binSizeId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.binSizeId && Boolean(formik.errors.binSizeId)}
                    helperText={formik.touched.binSizeId && (formik.errors.binSizeId as string)}
                    disabled={action === "view" || action === "edit"}
                  >
                    <MenuItem disabled value="default">
                      {t("container.selectBinSize")}
                    </MenuItem>
                    {binSizeQuery.isLoading && <Loader />}
                    {binSizeQuery?.data?.data?.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {i18n.language === "ar" ? val?.name_ar : val?.name}
                      </MenuItem>
                    ))}
                    {binSizeQuery.isError && <ErrorLottie />}
                  </TextField>
                  <TextField
                    fullWidth
                    label={t("container.selectZone")}
                    name="zoneId"
                    select
                    placeholder={t("container.selectZone")}
                    value={formik.values.zoneId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.zoneId && Boolean(formik.errors.zoneId)}
                    helperText={formik.touched.zoneId && (formik.errors.zoneId as string)}
                    disabled={action === "view" || action === "edit"}
                  >
                    <MenuItem disabled value="default">
                      {t("container.selectZone")}
                    </MenuItem>
                    {zoneOptionsQuery.isLoading && <Loader />}
                    {zoneOptionsQuery?.data?.data?.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {val.zone_name}
                      </MenuItem>
                    ))}
                    {zoneOptionsQuery.isError && <ErrorLottie />}
                  </TextField>
                </div>
                <div className="border-1 rounded-2xl px-4 py-4 border-gray-300">
                  <div className="font-medium">{t("container.addInventory")}</div>
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 mt-3">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1">
                        <TextField
                          fullWidth
                          label={t("container.sku")}
                          name="stock"
                          type="text"
                          placeholder={t("container.units")}
                          value={formik.values.stock}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.stock && Boolean(formik.errors.stock)}
                          helperText={formik.touched.stock && (formik.errors.stock as string)}
                          disabled={true}
                          sx={{
                            "& .MuiInputLabel-root": {
                              whiteSpace: "normal",
                              overflow: "visible",
                              textOverflow: "clip",
                            },
                          }}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="contained"
                          disabled={action === "view"}
                          // loading={onSave?.isPending}
                          sx={{
                            textWrap: "nowrap",
                            minWidth: "fit-content",
                            height: "40px",
                            marginTop: { md: "26px" },
                          }}
                          onClick={() => {
                            formik.setFieldValue("stock", Number(formik.values.stock) + 1);
                            formik.setFieldValue("vendorContainer", [
                              ...formik.values.vendorContainer,
                              { barcode: "" },
                            ]);
                          }}
                        >
                          {t("container.addContainer")}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                      <TextField
                        fullWidth
                        label={t("container.basePrice")}
                        name="basePrice"
                        type="number"
                        placeholder={t("container.addContainerPrice")}
                        value={formik.values.basePrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.basePrice && Boolean(formik.errors.basePrice)}
                        helperText={formik.touched.basePrice && (formik.errors.basePrice as string)}
                        disabled={action === "view"}
                      />
                      <TextField
                        fullWidth
                        label={t("container.pickupFee")}
                        name="pickupFee"
                        type="number"
                        placeholder={t("container.addPickupFee")}
                        value={formik.values.pickupFee}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.pickupFee && Boolean(formik.errors.pickupFee)}
                        helperText={formik.touched.pickupFee && (formik.errors.pickupFee as string)}
                        disabled={action === "view"}
                      />
                      <TextField
                        fullWidth
                        label={t("container.deliveryFee")}
                        name="deliveryFee"
                        type="text"
                        placeholder={t("container.addDeliveryFee")}
                        value={formik.values.deliveryFee}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.deliveryFee && Boolean(formik.errors.deliveryFee)}
                        helperText={formik.touched.deliveryFee && (formik.errors.deliveryFee as string)}
                        disabled={action === "view"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`border-1 rounded-2xl px-4 py-4 border-gray-300 w-[100%] mt-4 z-5 ${
                  formik.touched.vendorContainer && formik.errors.vendorContainer ? "mt-8" : "mt-0"
                }`}
              >
                {formik.values.vendorContainer.length > 0 ? (
                  <FormArrayContainer formik={formik} onSave={onSave} action={action} />
                ) : (
                  <div className="flex flex-col justify-center items-center p-8 py-10 gap-1">
                    <NoContainer className="h-20" />
                    <div className="text-secondary text-lg">{t("container.noContainersAdded")}</div>
                    <div className="text-secondary text-md">{t("container.noContainerInstuction")}</div>
                  </div>
                )}
              </div>
            </form>
          )}
          {isError && <ErrorLottie />}
        </div>
      </div>
    </>
  );
};

export default FormContainer;
