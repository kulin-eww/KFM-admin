import { Button } from "@mui/material";
import React, { useState } from "react";
import Filter from "../../assets/icons/common/filter.svg?react";
import FilterMenu from "../../components/Table/FilterMenu";
import FilterBookingRenewal from "./FilterBookingRenewal";
import { useTranslation } from "react-i18next";

const HeaderBookingRenewal: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
  handleBookingRenewalExport: any;
}> = ({ selectedFilters, setSelectedFilters, handleBookingRenewalExport }) => {
  const { t } = useTranslation();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("bookingRenewal.header.title")}</div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="contained"
            onClick={handleBookingRenewalExport.mutate}
            loading={handleBookingRenewalExport.isPending}
            sx={{ whiteSpace: "nowrap" }}
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
            sx={{ whiteSpace: "nowrap" }}
          >
            {t("bookingRenewal.header.filterButton")}
          </Button>
        </div>
      </div>
      <FilterMenu
        anchorElId={anchorElId}
        setAnchorElId={setAnchorElId}
        menuId="filter-menu"
        render={
          <FilterBookingRenewal
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setAnchorElId={setAnchorElId}
          />
        }
      />
    </>
  );
};

export default HeaderBookingRenewal;
