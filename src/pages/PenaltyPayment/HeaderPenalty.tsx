import { Button } from "@mui/material";
import Filter from "../../assets/icons/common/filter.svg?react";
import { useState } from "react";
import FilterMenu from "../../components/Table/FilterMenu";
import { useTranslation } from "react-i18next";
import FilterPenalty from "./FilterPenalty";

const HeaderPenalty: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
}> = ({ selectedFilters, setSelectedFilters }) => {
  const { t } = useTranslation();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("penaltyPayment.header.title")}</div>
        <div className="flex gap-2">
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
            {t("penaltyPayment.header.filterButton")}
          </Button>
        </div>
      </div>
      <FilterMenu
        anchorElId={anchorElId}
        setAnchorElId={setAnchorElId}
        menuId="filter-menu"
        render={
          <FilterPenalty
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setAnchorElId={setAnchorElId}
          />
        }
      />
    </>
  );
};

export default HeaderPenalty;
