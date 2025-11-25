import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import FormDriver from "./FormDriver";
import { updateDriverAPI, viewDriverAPI } from "../../api/driver";
import { useEffect, useState } from "react";

const EditDriver = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    dob: "",
    address: "",
    license_number: "",
    license_expiry_date: "",
    profile_image: null,
    driving_license_front: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["viewDriver", id],
    queryFn: () => viewDriverAPI(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues({
        id: data.data.id || "",
        name: data.data.name || "",
        phone: data.data.phone || "",
        email: data.data.email || "",
        dob: data.data.dob || "",
        address: data.data.address || "",
        license_number: data.data.license_number || "",
        license_expiry_date: data.data.license_expiry_date || "",
        profile_image: data.data.profile_image || null,
        driving_license_front: data.data.driving_license_front || null,
      });
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleEditDriver = useMutation({
    mutationFn: updateDriverAPI,
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
        action="edit"
        onSave={handleEditDriver}
        initialValues={initialValues}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};

export default EditDriver;
