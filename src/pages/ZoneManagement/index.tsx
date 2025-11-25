import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { listDriverAPI } from "../../api/driver";
import { useSelector } from "react-redux";
import ListZone from "./ListZone";
import HeaderZone from "./HeaderZone";
import DeleteZone from "./DeleteZone";
import { listZoneAPI } from "../../api/zone";

const ZoneManagement = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [zoneData, setZoneData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteZoneId, setDeleteZoneId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });
  const debouncedSearch = useDebounce(globalSearch, 400);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listZone", { pageSize, pageNumber, search: debouncedSearch, sortConfig }],
    queryFn: () => {
      setIsLoading(true);
      return listZoneAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setZoneData(data?.data?.zoneList);
      setTotalCount(data?.data?.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleDeleteZone = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteZoneId(id);
  };

  return (
    <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
      <HeaderZone selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <ListZone
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={zoneData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        handleDeleteZone={handleDeleteZone}
      />
      <DeleteZone
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteZoneId={deleteZoneId}
      />
    </div>
  );
};

export default ZoneManagement;
