import { useState } from "react";
import { BasicTable } from "../../../components/Table/BasicTable";
import { useTranslation } from "react-i18next";

type Row = {
  date: string;
  container: string;
  available: number;
  assigned: number;
  in_use: number;
  empty: number;
  returned: number;
  early_filling: number;
  id: string;
};

const ContainerUsage: React.FC<{ selectedFilters: any }> = ({ selectedFilters }) => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const data: Row[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `row-${i}`,
    date: "25-08-2025",
    container: ["Small (3m³)", "Medium (6m³)", "Large (10m³)"][i % 3],
    available: 20 + i * 5,
    assigned: 10 + i * 2,
    in_use: 5 + i * 2,
    empty: i,
    returned: i % 3 === 0 ? 10 : 0,
    early_filling: (i % 5) * 5,
  }));

  return (
    <div className="bg-white rounded-xl p-3">
      <BasicTable<Row>
        isLoading={false}
        isSuccess={true}
        isError={false}
        data={data}
        totalCount={data.length}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        columns={[
          { key: "date", label: t("reports.containerUsage.table.date") },
          { key: "container", label: t("reports.containerUsage.table.container") },
          { key: "available", label: t("reports.containerUsage.table.availableContainer") },
          { key: "assigned", label: t("reports.containerUsage.table.assignedContainers") },
          { key: "in_use", label: t("reports.containerUsage.table.containerInUse") },
          { key: "empty", label: t("reports.containerUsage.table.emptyContainers") },
          { key: "returned", label: t("reports.containerUsage.table.containersReturned") },
          { key: "early_filling", label: t("reports.containerUsage.table.earlyFilling") },
        ]}
      />
    </div>
  );
};

export default ContainerUsage;
