import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import FormDriver from "./FormDriver";
import { createDriverAPI, uploadFileDriverAPI } from "../../api/driver";

const AddDriver = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    dob: "",
    address: "",
    license_number: "",
    license_expiry_date: "",
    profile_image: null,
    driving_license_front: null,
  };

  const handleAddDriver = useMutation({
    mutationFn: createDriverAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate("/driver");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <FormDriver
        action="add"
        onSave={handleAddDriver}
        initialValues={initialValues}
        isSuccess={true}
        isError={false}
        isLoading={false}
      />
    </>
  );
};

export default AddDriver;
