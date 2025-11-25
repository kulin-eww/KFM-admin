import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import FormZone from "./FormZone";
import { createZoneAPI } from "../../api/zone";

const AddZone = () => {
  const navigate = useNavigate();

  const initialValues = {
    zone_name: "",
  };

  const handleAddZone = useMutation({
    mutationFn: createZoneAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate("/zone");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <FormZone
        action="add"
        onSave={handleAddZone}
        initialValues={initialValues}
        isSuccess={true}
        isError={false}
        isLoading={false}
      />
    </>
  );
};

export default AddZone;
