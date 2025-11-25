import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, TextField } from "@mui/material";
import RichTextEditor from "../../components/CMS/RichTextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateCMSDetailAPI } from "../../api/cms";
import useToast from "../../hooks/useToast";
import Loader from "../../components/Loader/Loader";

const PrivacyPolicyForm = () => {
  const [searchParams] = useSearchParams();
  const cmsId = searchParams.get("id");
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, touched, handleSubmit, resetForm, setFieldValue } = useFormik({
    initialValues: {
      "title-en": "",
      "title-ar": "",
      "value-en": "",
      "value-ar": "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      "title-en": Yup.string().trim().required("Title EN is required"),
      "title-ar": Yup.string().trim().required("Title AR is required"),
      "value-en": Yup.string().trim().required("Description EN is required"),
      "value-ar": Yup.string().trim().required("Description AR is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        id: cmsId,
        show_name: {
          en: values?.["title-en"],
          ar: values?.["title-ar"],
        },
        value: {
          en: values?.["value-en"],
          ar: values?.["value-ar"],
        },
      };
      console.log("Line 39", payload);
      mutate(payload);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateCMSDetailAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate(-1);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md px-6 py-4">
        <div className="flex justify-start items-center mb-2 gap-2">
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftIcon className="h-5 cursor-pointer" />
          </div>
          <div className="text-xl font-bold">Privacy Policy</div>
        </div>
        <div className="w-full bg-bg-secondary px-8 py-4 rounded-xl">
          {false && <Loader />}
          {!false && !false && (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="title-en"
                  label="Title EN"
                  fullWidth
                  value={values?.["title-en"] ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched?.["title-en"] && Boolean(errors?.["title-en"])}
                  helperText={touched?.["title-en"] && (errors?.["title-en"] as string)}
                  slotProps={{
                    input: {
                      readOnly: false,
                    },
                  }}
                  variant="outlined"
                />
                <TextField
                  name="title-ar"
                  label="Title AR"
                  fullWidth
                  value={values?.["title-ar"] ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched?.["title-ar"] && Boolean(errors?.["title-ar"])}
                  helperText={touched?.["title-ar"] && (errors?.["title-ar"] as string)}
                  slotProps={{
                    input: {
                      readOnly: false,
                    },
                  }}
                  variant="outlined"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <RichTextEditor
                  onChange={(content) => setFieldValue("value-en", content === "<p><br></p>" ? "" : content)}
                  value={values?.["value-en"]}
                  isRTL={false}
                  readOnly={false}
                  error={touched?.["value-en"] && Boolean(errors?.["value-en"])}
                  helperText={touched?.["value-en"] && (errors?.["value-en"] as string)}
                />
                <RichTextEditor
                  onChange={(content) => setFieldValue("value-ar", content === "<p><br></p>" ? "" : content)}
                  value={values?.["value-ar"]}
                  isRTL={false}
                  readOnly={false}
                  error={touched?.["value-ar"] && Boolean(errors?.["value-ar"])}
                  helperText={touched?.["value-ar"] && (errors?.["value-ar"] as string)}
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button variant="cancel" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" loading={isPending}>
                  Update
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyForm;
