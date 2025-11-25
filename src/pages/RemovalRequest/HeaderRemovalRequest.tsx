import { Button } from "@mui/material";
import Filter from "../../assets/icons/common/filter.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FilterMenu from "../../components/Table/FilterMenu";
import FilterRemovalRequest from "./FilterRemovalRequest";

const HeaderRemovalRequest: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
  handleRemovalRequestExport: any;
}> = ({ selectedFilters, setSelectedFilters, handleRemovalRequestExport }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("removalRequest.header.title")}</div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="contained"
            onClick={handleRemovalRequestExport.mutate}
            loading={handleRemovalRequestExport.isPending}
            sx={{ whiteSpace: "nowrap" }}
          >
            {t("removalRequest.header.exportCsvButton")}
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
            sx={{ whiteSpace: "nowrap" }}
          >
            {t("removalRequest.header.filterButton")}
          </Button>
        </div>
      </div>
      <FilterMenu
        anchorElId={anchorElId}
        setAnchorElId={setAnchorElId}
        menuId="filter-menu"
        render={
          <FilterRemovalRequest
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setAnchorElId={setAnchorElId}
          />
        }
      />
    </>
  );
};

export default HeaderRemovalRequest;
