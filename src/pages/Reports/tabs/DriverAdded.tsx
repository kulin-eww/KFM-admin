import { useEffect, useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import useDebounce from "../../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { listDriverAPI } from "../../../api/driver";
import { useSelector } from "react-redux";

const DriverAdded: React.FC<{ selectedFilters: any }> = ({ selectedFilters }) => {
  const { t } = useTranslation();
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [driverData, setDriverData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(globalSearch, 400);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listDriver", { pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters }],
    queryFn: () => {
      setIsLoading(true);
      return listDriverAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig, selectedFilters });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setDriverData(data.data.drivers);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="bg-white rounded-xl p-3">
      <BasicTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={driverData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        columns={[
          {
            key: "created_at",
            label: t("reports.driverAdded.table.createdAt"),
            accessor: (row: any) => row?.created_at?.split("T")[0],
          },
          { key: "id", label: t("reports.driverAdded.table.id"), accessor: (row: any) => row?.id },
          { key: "name", label: t("reports.driverAdded.table.driver") },
          { key: "phone", label: t("reports.driverAdded.table.mobileNo") },
          { key: "email", label: t("reports.driverAdded.table.emailAddress") },
          {
            key: "status",
            label: t("reports.driverAdded.table.activeInactive"),
            render: (row: any) => (row?.status === true ? "Active" : "Inactive"),
          },
          {
            key: "availability_status",
            label: t("reports.driverAdded.table.status"),
            sortable: true,
            render: (row: any) => {
              return (
                <>
                  {row.availability_status ? (
                    <Chip
                      label={t("reports.driverAdded.table.available")}
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  ) : (
                    <Chip
                      label={t("reports.driverAdded.table.unavailable")}
                      color="warning"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  )}
                </>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default DriverAdded;
