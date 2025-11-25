import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import ListContainer from "./ListContainer";
import HeaderContainer from "./HeaderContainer";
import { listContainerAPI } from "../../api/container";
import DeleteContainer from "./DeleteContainer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Container = () => {
  const globalSearch = useSelector((state: any) => state?.globalSearch?.globalSearch);
  const [search, setSearch] = useState<string>(globalSearch ?? "");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [containerData, setContainerData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteContainerId, setDeleteContainerId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(globalSearch, 400);

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listContainer", { pageSize, pageNumber, search: debouncedSearch, sortConfig }],
    queryFn: () => {
      setIsLoading(true);
      return listContainerAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setContainerData(data?.data?.containers);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleDeleteContainer = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteContainerId(id);
  };

  return (
    <div className="bg-layout-bg px-2 py-4 rounded-3xl shadow-md">
      <HeaderContainer search={search} setSearch={setSearch} value={value} setValue={setValue} />
      <ListContainer
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={containerData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        handleDeleteContainer={handleDeleteContainer}
      />
      <DeleteContainer
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteContainerId={deleteContainerId}
      />
    </div>
  );
};

export default Container;
