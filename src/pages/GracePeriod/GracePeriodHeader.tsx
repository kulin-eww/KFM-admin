import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../../assets/icons/common/filter.svg?react";
import FilterMenu from "../../components/Table/FilterMenu";
import { useTranslation } from "react-i18next";
import FilterBooking from "./FilterGracePeriod";

const GracePeriodHeader: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
  handleGracePeriodExport: any;
}> = ({ selectedFilters, setSelectedFilters, handleGracePeriodExport }) => {
  const { t } = useTranslation();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("gracePeriod.header.title")}</div>
        <div className="flex gap-2">
          <Button
            variant="contained"
            onClick={handleGracePeriodExport.mutate}
            loading={handleGracePeriodExport.isPending}
          >
            {t("bookingRenewal.header.exportCsvButton")}
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
            {t("gracePeriod.header.filterButton")}
          </Button>
        </div>
      </div>
      <FilterMenu
        anchorElId={anchorElId}
        setAnchorElId={setAnchorElId}
        menuId="filter-menu"
        render={
          <FilterBooking
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setAnchorElId={setAnchorElId}
          />
        }
      />
    </>
  );
};

export default GracePeriodHeader;
