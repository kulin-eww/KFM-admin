import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUploadInput from "../../components/input/FileUploadInput";
import { useTranslation } from "react-i18next";

const KycVerification: React.FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formik: any;
  isPending: boolean;
}> = ({ setCurrentStep, formik, isPending }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 w-full sm:w-100 md:w-120 lg:w-100 xl:w-120">
        <FileUploadInput
          label={t("auth.setupProfile.kycVerification.businessImagesLabel")}
          name="business_images"
          value={formik.values.business_images}
          multiple
          maxFiles={5}
          onChange={(files) => {
            formik.setFieldTouched("business_images", true, true);
            formik.setFieldValue("business_images", files, true);
          }}
          error={formik.touched.business_images && Boolean(formik.errors.business_images)}
          helperText={
            formik.touched.business_images && formik.errors.business_images
              ? (formik.errors.business_images as string)
              : ""
          }
          accept="image/*"
        />

        <FileUploadInput
          label={t("auth.setupProfile.kycVerification.licenseCertificateLabel")}
          name="license_certificate"
          value={formik.values.license_certificate}
          onChange={(file) => {
            formik.setFieldTouched("license_certificate", true, true);
            formik.setFieldValue("license_certificate", file, true);
          }}
          error={formik.touched.license_certificate && Boolean(formik.errors.license_certificate)}
          helperText={
            formik.touched.license_certificate && formik.errors.license_certificate
              ? (formik.errors.license_certificate as string)
              : ""
          }
          accept="application/pdf"
        />

        <div className="flex flex-col md:flex-row gap-2 w-full mt-4">
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => {
              setCurrentStep(2);
              navigate("/setup/business-details");
            }}
          >
            {t("auth.setupProfile.businessDetails.backButton")}
          </Button>
          <Button fullWidth type="submit" variant="contained" color="primary" loading={isPending}>
            {t("auth.setupProfile.kycVerification.submitButton")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default KycVerification;
