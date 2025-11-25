import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FileUploadInput from "../../components/input/FileUploadInput";
import { useTranslation } from "react-i18next";

const SetUpAccount: React.FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formik: any;
  handleNext: () => Promise<void>;
}> = ({ setCurrentStep, formik, handleNext }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 w-full sm:w-100 md:w-120 lg:w-100 xl:w-120">
        <TextField
          fullWidth
          label={t("auth.setupProfile.setupAccount.vendorNameLabel")}
          name="vendor_name"
          type="text"
          placeholder={t("auth.setupProfile.setupAccount.vendorNamePlaceholder")}
          value={formik.values.vendor_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.vendor_name && Boolean(formik.errors.vendor_name)}
          helperText={formik.touched.vendor_name && formik.errors.vendor_name}
        />

        <TextField
          fullWidth
          label={t("auth.setupProfile.setupAccount.mobileNumberLabel")}
          name="mobile_number"
          type="text"
          placeholder={t("auth.setupProfile.setupAccount.mobileNumberPlaceholder")}
          value={formik.values.mobile_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile_number && Boolean(formik.errors.mobile_number)}
          helperText={formik.touched.mobile_number && formik.errors.mobile_number}
          slotProps={{
            htmlInput: {
              maxLength: 10,
            },
          }}
        />

        <TextField
          fullWidth
          label={t("auth.setupProfile.setupAccount.emailLabel")}
          name="email"
          type="email"
          placeholder={t("auth.setupProfile.setupAccount.emailPlaceholder")}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          slotProps={{ input: { readOnly: true } }}
          // disabled
        />

        <FileUploadInput
          label={t("auth.setupProfile.setupAccount.uploadLogoLabel")}
          name="logo"
          value={formik.values.logo}
          onChange={(file) => {
            formik.setFieldTouched("logo", true, true);
            formik.setFieldValue("logo", file, true);
          }}
          error={formik.touched.logo && Boolean(formik.errors.logo)}
          helperText={formik.touched.logo && formik.errors.logo ? (formik.errors.logo as string) : ""}
          accept="image/*"
        />

        <Button fullWidth variant="contained" color="primary" onClick={handleNext}>
          {t("auth.setupProfile.setupAccount.nextButton")}
        </Button>
      </div>
    </>
  );
};

export default SetUpAccount;
