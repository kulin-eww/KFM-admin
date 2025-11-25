import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ContainerImage from "../../../assets/images/home/container-image.png";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../../hooks/useToast";
import { LENGTH, REGEX } from "../../../utils/constant";
import { contactUsAPI } from "../../../api/home";

const ContactUs: React.FC = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required(t("home.contactUs.nameRequired"))
        .min(LENGTH.MIN_STRING_LENGTH, t("home.contactUs.nameMinLength"))
        .max(LENGTH.MAX_STRING_LENGTH, t("home.contactUs.nameMaxLength")),
      phone: Yup.string()
        .trim()
        .required(t("home.contactUs.phoneRequired"))
        .matches(REGEX.NUMBERS_ONLY, t("common.numbersOnly"))
        .min(LENGTH.PHONE_NUMBER_LENGTH, t("home.contactUs.phoneMinLength"))
        .max(LENGTH.PHONE_NUMBER_LENGTH, t("home.contactUs.phoneMaxLength")),
      email: Yup.string()
        .trim()
        .required(t("home.contactUs.emailRequired"))
        .email(t("home.contactUs.emailInvalid"))
        .matches(REGEX.EMAIL, t("home.contactUs.emailInvalid")),
      message: Yup.string()
        .trim()
        .required(t("home.contactUs.messageRequired"))
        .min(10, t("home.contactUs.messageMinLength"))
        .max(200, t("home.contactUs.messageMaxLength")),
    }),
    onSubmit: async (values) => {
      console.log(values);
      handleContactUs.mutate(values);
    },
  });

  const handleContactUs = useMutation({
    mutationFn: contactUsAPI,
    onSuccess: (res) => {
      formik.resetForm();
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const isFormValid = formik.values.name && formik.values.email && formik.values.phone && formik.values.message;

  return (
    <section id="contact-us" className="py-16 bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#363636] mb-4">
            {t("home.contact.title", "Get in Touch")}
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            {t(
              "home.contact.subtitle",
              "Have questions or need assistance? We're here to help. Send us a message and we'll get back to you as soon as possible."
            )}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch min-h-[600px]">
          {/* Left Side - Container Image */}
          <div className="order-2 lg:order-1 h-full">
            <div className="relative h-full">
              <div className="w-full h-full max-w-lg mx-auto lg:mx-0 flex items-center">
                <img
                  src={ContainerImage}
                  alt="Container rental service"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="order-1 lg:order-2 h-full">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-10 h-full flex flex-col">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#363636] mb-8 text-center lg:text-left">
                {t("home.contact.sendMessage", "Send us a Message")}
              </h3>

              <form onSubmit={formik.handleSubmit} className="space-y-6 flex-1 flex flex-col">
                {/* Name Field */}
                <div>
                  <TextField
                    fullWidth
                    label={t("home.contact.form.name")}
                    name="name"
                    type="text"
                    placeholder={t("home.contact.form.namePlaceholder")}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && (formik.errors.name as string)}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 60, // increase input height
                        fontSize: 16, // input text size
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: 18, // label text size
                      },
                      "& input:-webkit-autofill": {
                        boxShadow: "0 0 0 1000px #f9fafb inset !important",
                        WebkitBoxShadow: "0 0 0 1000px #f9fafb inset !important",
                      },
                    }}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <TextField
                    fullWidth
                    label={t("home.contact.form.email")}
                    name="email"
                    type="text"
                    placeholder={t("home.contact.form.emailPlaceholder")}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && (formik.errors.email as string)}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 60, // increase input height
                        fontSize: 16, // input text size
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: 18, // label text size
                      },
                      "& input:-webkit-autofill": {
                        boxShadow: "0 0 0 1000px #f9fafb inset !important",
                        WebkitBoxShadow: "0 0 0 1000px #f9fafb inset !important",
                      },
                    }}
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <TextField
                    fullWidth
                    label={t("home.contact.form.phone")}
                    name="phone"
                    type="text"
                    placeholder={t("home.contact.form.phonePlaceholder")}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && (formik.errors.phone as string)}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 60, // increase input height
                        fontSize: 16, // input text size
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: 18, // label text size
                      },
                      "& input:-webkit-autofill": {
                        boxShadow: "0 0 0 1000px #f9fafb inset !important",
                        WebkitBoxShadow: "0 0 0 1000px #f9fafb inset !important",
                      },
                    }}
                  />
                </div>

                {/* Message Field */}
                <div className="flex-1 flex flex-col">
                  <TextField
                    fullWidth
                    label={t("home.contact.form.message")}
                    name="message"
                    type="text"
                    placeholder={t("home.contact.form.messagePlaceholder")}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && (formik.errors.message as string)}
                    multiline
                    rows={4}
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: 16, // input text size
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: 18, // label text size
                      },
                      "& input:-webkit-autofill": {
                        boxShadow: "0 0 0 1000px #f9fafb inset !important",
                        WebkitBoxShadow: "0 0 0 1000px #f9fafb inset !important",
                      },
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isFormValid || handleContactUs.isPending}
                    className={`cursor-pointer w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 text-lg ${
                      isFormValid && !handleContactUs.isPending
                        ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {handleContactUs.isPending ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t("home.contact.form.submitting", "Sending...")}</span>
                      </div>
                    ) : (
                      t("home.contact.form.submit", "Send Message")
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {handleContactUs.isSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-800 font-medium">
                        {t("home.contact.form.successMessage", "Thank you! Your message has been sent successfully.")}
                      </p>
                    </div>
                  </div>
                )}

                {handleContactUs.isError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-red-800 font-medium">
                        {t(
                          "home.contact.form.errorMessage",
                          "Sorry, there was an error sending your message. Please try again."
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
