import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import { editContainerAPI, viewContainerAPI } from "../../api/container";
import useToast from "../../hooks/useToast";

const EditContainer = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<any>({
    wasteTypeId: "",
    binSizeId: "",
    zoneId: "",
    stock: "",
    basePrice: "",
    pickupFee: "",
    deliveryFee: "",
    vendorContainer: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["viewContainer", id],
    queryFn: () => viewContainerAPI(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues(data?.data);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleEditDriver = useMutation({
    mutationFn: editContainerAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate("/container");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <FormContainer
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

export default EditContainer;
