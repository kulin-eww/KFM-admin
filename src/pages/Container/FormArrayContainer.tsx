import { useState, useRef } from "react";
import { TextField, Button, IconButton, Tooltip } from "@mui/material";
import Barcode from "react-barcode";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { InfoIcon, PrintIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const FormArrayContainer = ({ formik, onSave, action }) => {
  const { t } = useTranslation();
  const [generatedBarcodes, setGeneratedBarcodes] = useState<string[]>(
    formik.values.vendorContainer.map((val) => val?.barcode || "")
  );

  const barcodeContainerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleGenerate = (index: number) => {
    const newBarcodes = [...generatedBarcodes];
    newBarcodes[index] = formik.values.vendorContainer[index].barcode || "";
    setGeneratedBarcodes(newBarcodes);
  };

  const handleRemove = (index: number) => {
    const newValues = [...formik.values.vendorContainer];
    newValues.splice(index, 1);
    formik.setFieldValue("stock", Number(formik.values.stock) - 1);
    formik.setFieldValue("vendorContainer", newValues);

    const newBarcodes = [...generatedBarcodes];
    newBarcodes.splice(index, 1);
    setGeneratedBarcodes(newBarcodes);
    console.log(barcodeContainerRefs.current);
    barcodeContainerRefs.current.splice(index, 1);
  };

  const handleDownload = (index: number) => {
    const container = barcodeContainerRefs.current[index];

    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = `barcode-${generatedBarcodes[index]}.png`;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="space-y-4">
      <div className="hidden lg:flex justify-between items-center">
        <div className="text-md font-bold">{t("container.containerId")}</div>
        <div className="flex items-center gap-2">
          <div className="text-md font-bold">{t("container.generateBarcode")}</div>
          <Tooltip title={t("container.generateBarcodeToPrint")}>
            <IconButton>
              <InfoIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {formik.values?.vendorContainer?.map((_, index) => {
        return (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-4 justify-center items-center border-b border-gray-300 pb-1 w-full"
          >
            <div className="grid lg:grid-cols-3 gap-3">
              <div className="flex items-center">
                <span className="mr-2 text-md font-bold sm:block lg:hidden">{t("container.containerId")}</span>
                <span>{formik.values.vendorContainer[index]?.id}</span>
              </div>
              <TextField
                fullWidth
                name={`vendorContainer.${index}.barcode`}
                type="text"
                placeholder={t("container.enterCode")}
                value={formik.values.vendorContainer[index].barcode ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.vendorContainer?.[index]?.barcode &&
                  Boolean(formik.errors.vendorContainer?.[index]?.barcode)
                }
                helperText={
                  formik.touched.vendorContainer?.[index]?.barcode &&
                  (formik.errors.vendorContainer?.[index]?.barcode as string)
                }
                disabled={action === "view"}
              />
              <Button
                variant="outlined"
                size="small"
                sx={{
                  height: "40px",
                  color: "#007A47",
                  paddingX: "40px",
                  paddingY: 0.8,
                  backgroundColor: "#007A471A",
                  "&:hover": { backgroundColor: "#007A471A" },
                }}
                onClick={() => handleGenerate(index)}
              >
                {t("container.generate")}
              </Button>
            </div>
            <div className="grid lg:grid-cols-5 gap-3">
              <div className="text-md font-bold lg:hidden sm:flex justify-center items-center">
                {t("container.generateBarcode")}
              </div>
              <div
                ref={(el) => {
                  barcodeContainerRefs.current[index] = el;
                }}
                className="col-span-3 flex justify-center items-center"
              >
                {generatedBarcodes[index] && (
                  <Barcode
                    value={generatedBarcodes[index]}
                    format="CODE128"
                    width={1.2}
                    height={25}
                    displayValue={true}
                    background="#fff"
                    lineColor="#000000"
                    fontSize={18}
                  />
                )}
              </div>

              <div className="flex items-center justify-center">
                {generatedBarcodes[index] && (
                  <IconButton onClick={() => handleDownload(index)} size="large">
                    <PrintIcon className="h-5 w-5" />
                  </IconButton>
                )}

                <IconButton disabled={action === "view"} color="error" onClick={() => handleRemove(index)} size="large">
                  <MinusCircleIcon className="h-5" />
                </IconButton>
              </div>
            </div>
          </div>
        );
      })}

      {(action === "add" || action === "edit") && (
        <div className="flex justify-end mt-5">
          <Button type="submit" variant="contained" loading={onSave?.isPending} sx={{ paddingX: 8 }}>
            {t("container.save")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormArrayContainer;
