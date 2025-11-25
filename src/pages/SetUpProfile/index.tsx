import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useLocation, useNavigate } from "react-router-dom";
import Stepper from "../../components/common/Stepper";
import { useEffect, useState } from "react";
import SetUpAccount from "./SetUpAccount";
import BusinessDetails from "./BusinessDetails";
import KycVerification from "./KycVerification";
import { vendorKycAPI } from "../../api/vendor";
import { LENGTH, REGEX } from "../../utils/constant";
import { useTranslation } from "react-i18next";

const SetUpProfile: React.FC<{ currentTab: number }> = ({ currentTab }) => {
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("token");
  const { state } = useLocation();
  const steps = [
    t("auth.setupProfile.steps.step1"),
    t("auth.setupProfile.steps.step2"),
    t("auth.setupProfile.steps.step3"),
  ];
  const stepRoutes = ["/setup/account", "/setup/business-details", "/setup/kyc"];
  const [currentStep, setCurrentStep] = useState(currentTab);
  const navigate = useNavigate();

  const stepContent = {
    1: {
      title: t("auth.setupProfile.stepContent.step1.title"),
      subtitle: t("auth.setupProfile.stepContent.step1.subtitle"),
    },
    2: {
      title: t("auth.setupProfile.stepContent.step2.title"),
      subtitle: t("auth.setupProfile.stepContent.step2.subtitle"),
    },
    3: {
      title: t("auth.setupProfile.stepContent.step3.title"),
      subtitle: t("auth.setupProfile.stepContent.step3.subtitle"),
    },
  };

  useEffect(() => {
    if (!token || token === undefined || token === null || token === "undefined" || token === "null") {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    setCurrentStep(currentTab);
  }, [currentTab]);

  const { mutate, isPending } = useMutation({
    mutationFn: vendorKycAPI,
    onSuccess: (res) => {
      formik.resetForm();
      navigate("/dashboard");
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const validationSchemas = [
    // Step 1
    Yup.object({
      vendor_name: Yup.string()
        .trim()
        .required(t("profile.vendorNameRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("profile.vendorNameMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("profile.vendorNameMaxLength")),
      mobile_number: Yup.string()
        .trim()
        .required(t("profile.mobileNumberRequired"))
        .matches(REGEX.NUMBERS_ONLY, t("common.numbersOnly"))
        .test("len-9-or-10", t("profile.mobileNumberMinMaxLength"), function (value) {
          if (!value) return false;
          return value.length === 9 || value.length === 10;
        }),
      // email: Yup.string().email("Invalid email").required("Email is required"),
      logo: Yup.mixed()
        .required(t("profile.logoRequired"))
        .test("fileType", t("profile.logoFileType"), (file: File) =>
          file ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type) : false
        )
        .test("fileSize", t("profile.logoFileSize"), (file: File) => (file ? file.size <= 5 * 1024 * 1024 : false)),
    }),

    // Step 2
    Yup.object({
      country: Yup.string()
        .trim()
        .required(t("profile.countryRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("profile.countryMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("profile.countryMaxLength")),
      state: Yup.string()
        .trim()
        .required(t("profile.stateRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("profile.stateMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("profile.stateMaxLength")),
      city: Yup.string()
        .trim()
        .required(t("profile.cityRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("profile.cityMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("profile.cityMaxLength")),
      street_name: Yup.string()
        .trim()
        .required(t("profile.streetNameRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("profile.streetNameMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("profile.streetNameMaxLength")),
      building_number: Yup.string()
        .trim()
        .required(t("profile.buildingNumberRequired"))
        .min(LENGTH.MIN_NUMBER_LENGTH, t("profile.buildingNumberMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("profile.buildingNumberMaxLength")),
      pincode: Yup.string()
        .trim()
        .required(t("profile.pincodeRequired"))
        .matches(REGEX.NUMBERS_ONLY, t("common.numbersOnly"))
        .max(LENGTH.POSTAL_CODE_LENGTH, t("profile.pincodeMaxLength")),
      address: Yup.string().trim().required(t("profile.addressRequired")),
      // .min(LENGTH.MIN_STRING_LENGTH, t("profile.addressMinLength"))
      // .max(LENGTH.MAX_STRING_LENGTH, t("profile.addressMaxLength")),
      lat: Yup.string(),
      lng: Yup.string(),
    }),

    // Step 3
    Yup.object({
      business_images: Yup.array()
        .of(
          Yup.mixed<File>()
            .required(t("profile.businessImagesRequired"))
            .test("fileType", t("profile.businessImagesFileType"), (file) =>
              file ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type) : false
            )
            .test("fileSize", t("profile.businessImagesFileSize"), (file) =>
              file ? file.size <= LENGTH.MAX_FILE_SIZE : false
            )
        )
        .min(1, t("profile.businessImagesMinLength"))
        .max(5, t("profile.businessImagesMaxLength")),
      license_certificate: Yup.mixed()
        .required(t("profile.licenseCertificateRequired"))
        .test("fileType", t("profile.licenseCertificateFileType"), (file: File) =>
          file ? ["application/pdf"].includes(file.type) : false
        )
        .test("fileSize", t("profile.licenseCertificateFileSize"), (file: File) =>
          file ? file.size <= LENGTH.MAX_FILE_SIZE : false
        ),
    }),
  ];

  const formik = useFormik({
    initialValues: {
      vendor_name: "",
      mobile_number: "",
      email: state?.email,
      logo: null,
      country: "",
      state: "",
      city: "",
      street_name: "",
      building_number: "",
      pincode: "",
      address: "",
      lat: "",
      lng: "",
      business_images: [],
      license_certificate: null,
    },
    validationSchema: validationSchemas[currentStep - 1],
    validateOnBlur: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const handleNext = async () => {
    const isValid = await formik.validateForm();
    if (Object.keys(isValid).length === 0) {
      const currentIndex = stepRoutes.indexOf(location.pathname);
      if (currentIndex < stepRoutes.length - 1) {
        navigate(stepRoutes[currentIndex + 1]);
      } else {
        formik.handleSubmit();
      }
    } else {
      formik.setTouched(
        Object.keys(validationSchemas[currentStep - 1].fields).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="font-bold text-center text-3xl">{stepContent[currentStep].title}</div>
          <p className="font-medium tracking-wide text-center text-md text-secondary">
            {stepContent[currentStep].subtitle}
          </p>
        </div>
        <div>
          <div className="w-full">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {currentStep === 1 && (
            <SetUpAccount setCurrentStep={setCurrentStep} formik={formik} handleNext={handleNext} />
          )}
          {currentStep === 2 && (
            <BusinessDetails setCurrentStep={setCurrentStep} formik={formik} handleNext={handleNext} />
          )}
          {currentStep === 3 && (
            <KycVerification setCurrentStep={setCurrentStep} formik={formik} isPending={isPending} />
          )}
        </form>
      </div>
    </>
  );
};

export default SetUpProfile;
