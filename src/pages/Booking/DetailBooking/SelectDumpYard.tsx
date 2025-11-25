import { MenuItem, TextField } from "@mui/material";
import { getDumpYardListAPI, selectDumpYardAPI } from "../../../api/booking";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import ErrorLottie from "../../../components/lottie/ErrorLottie";
import { useState, useEffect } from "react";
import useToast from "../../../hooks/useToast";
import { useTranslation } from "react-i18next";

const SelectDumpYard = ({ 
  bookingDetailData, 
  disabled, 
  onDumpYardChange 
}: { 
  bookingDetailData: any; 
  disabled: boolean;
  onDumpYardChange?: (isSelected: boolean) => void;
}) => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [selected, setSelected] = useState<string>(bookingDetailData?.dump_yard_id || "default");

  const handleGetDumpYardList = useQuery({
    queryKey: ["getDumpYardList", id],
    queryFn: () => getDumpYardListAPI(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: selectDumpYardAPI,
    onSuccess: (res) => {
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  // Notify parent about dump yard selection state
  useEffect(() => {
    const isDumpYardSelected = selected !== "default" && selected !== "";
    onDumpYardChange?.(isDumpYardSelected);
  }, [selected, onDumpYardChange]);

  return (
    <>
      <div className="w-full mt-4">
        <TextField
          disabled={disabled}
          fullWidth
          // label="Select Waste Type"
          name="wasteTypeId"
          select
          placeholder={t("bookingDetails.selectDumpYard")}
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            mutate({ id: id, dumpYardId: e.target.value });
            // Notify parent immediately about selection change
            const isDumpYardSelected = e.target.value !== "default" && e.target.value !== "";
            onDumpYardChange?.(isDumpYardSelected);
          }}
        >
          <MenuItem disabled value="default">
            {t("bookingDetails.selectDumpYard")}
          </MenuItem>
          {handleGetDumpYardList.isLoading && <Loader />}
          {handleGetDumpYardList?.data?.data?.map((val: any) => (
            <MenuItem key={val.id} value={val.id} disabled={val?.availability_status === "not_available"}>
              {i18n.language === "ar" ? val?.name?.ar : val?.name?.en}{" "}
              <span className="text-sm text-secondary ml-2 capitalize">
                ({val?.type?.replace("_", " ")?.replace("_", "")}) (
                {val?.availability_status?.replace("_", " ")?.replace("_", "")})
              </span>
            </MenuItem>
          ))}
          {handleGetDumpYardList.isError && <ErrorLottie />}
        </TextField>
      </div>
    </>
  );
};

export default SelectDumpYard;
