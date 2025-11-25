import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import ListDriver from "./ListDriver";
import HeaderDriver from "./HeaderDriver";
import { listDriverAPI } from "../../api/driver";
import DeleteDriver from "./DeleteDriver";
import { useSelector } from "react-redux";

const Driver = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [driverData, setDriverData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDriverId, setDeleteDriverId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    upcoming: false,
    ongoing: false,
    monthly: false,
    yearly: false,
    fromDate: "",
    toDate: "",
  });
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

  const handleDeleteDriver = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteDriverId(id);
  };

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);

  return (
    <div className="bg-white px-2 py-4 rounded-3xl shadow-md">
      <HeaderDriver selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <ListDriver
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={driverData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        handleDeleteDriver={handleDeleteDriver}
      />
      <DeleteDriver
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteDriverId={deleteDriverId}
      />
    </div>
  );
};

export default Driver;
