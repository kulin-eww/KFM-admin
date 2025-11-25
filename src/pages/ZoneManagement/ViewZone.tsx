import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewContainerAPI } from "../../api/container";
import FormZone from "./FormZone";
import { viewZoneAPI } from "../../api/zone";

const ViewZone = () => {
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

  return (
    <>
      <FormZone
        action="view"
        initialValues={initialValues}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};

export default ViewZone;
