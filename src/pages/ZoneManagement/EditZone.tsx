import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewContainerAPI } from "../../api/container";
import FormZone from "./FormZone";
import { updateZoneAPI, viewZoneAPI } from "../../api/zone";
import useToast from "../../hooks/useToast";

const EditZone = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<any>({
    zone_name: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["viewZone", id],
    queryFn: () => viewZoneAPI(id),
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

  const handleEditZone = useMutation({
    mutationFn: updateZoneAPI,
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
        action="edit"
        onSave={handleEditZone}
        initialValues={initialValues}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};

export default EditZone;
