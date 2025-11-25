import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import FormContainer from "./FormContainer";
import { createContainerAPI } from "../../api/container";

const AddContainer = () => {
  const navigate = useNavigate();

  const initialValues = {
    wasteTypeId: "default",
    binSizeId: "default",
    zoneId: "default",
    stock: "",
    basePrice: "",
    pickupFee: "",
    deliveryFee: "",
    vendorContainer: [],
  };

  const handleAddDriver = useMutation({
    mutationFn: createContainerAPI,
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

export default AddContainer;
