import { Button } from "@mui/material";
import Plus from "../../assets/icons/common/plus.svg?react";
import Filter from "../../assets/icons/common/filter.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FilterMenu from "../../components/Table/FilterMenu";
import { DownloadIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";
import FilterReport from "./FilterReport";

const HeaderReport: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
  handleReportExport: any;
}> = ({ selectedFilters, setSelectedFilters, handleReportExport }) => {
  const { t } = useTranslation();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("reports.header.title")}</div>
        <div className="flex gap-2">
          <Button
            variant="contained"
            startIcon={<DownloadIcon className="h-4" />}
            onClick={handleReportExport.mutate}
            loading={handleReportExport.isPending}
          >
            {t("reports.header.downloadReportButton")}
          </Button>
          <Button
            id="filter-menu"
            variant="contained"
            startIcon={<Filter className="h-4 rtl:ml-3" />}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              if (anchorElId === "filter-menu") {
                setAnchorElId(null);
                return;
              }
              setAnchorElId("filter-menu");
            }}
          >
            {t("reports.header.filterButton")}
          </Button>
        </div>
      </div>
      <FilterMenu
        anchorElId={anchorElId}
        setAnchorElId={setAnchorElId}
        menuId="filter-menu"
        render={
          <FilterReport
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setAnchorElId={setAnchorElId}
          />
        }
      />
    </>
  );
};

export default HeaderReport;
