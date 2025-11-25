import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { viewDriverAPI } from "../../../api/driver";
import DetailsDriver from "./DetailsDriver";
import BookingListDriver from "./BookingListDriver";

const ViewDriver = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["viewDriver", id],
    queryFn: () => viewDriverAPI(id),
    enabled: !!id,
  });

  return (
    <>
      <div className="bg-layout-bg rounded-2xl shadow-md px-4 py-4 flex flex-col gap-4">
        <DetailsDriver data={data?.data} isSuccess={isSuccess} isError={isError} isLoading={isLoading} />
        <BookingListDriver id={id} />
      </div>
    </>
  );
};

export default ViewDriver;
