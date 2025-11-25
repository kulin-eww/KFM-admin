import { Button } from "@mui/material";
import Filter from "../../assets/icons/common/filter.svg?react";
import { useNavigate } from "react-router-dom";
import FilterMenu from "../../components/Table/FilterMenu";
import { useState } from "react";
import FilterBooking from "./FilterBooking";
import { useTranslation } from "react-i18next";

const HeaderEarlyPickup: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
  handleEarlyPickupExport: any;
}> = ({ selectedFilters, setSelectedFilters, handleEarlyPickupExport }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("earlyPickup.header.title")}</div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="contained"
            onClick={handleEarlyPickupExport.mutate}
            loading={handleEarlyPickupExport.isPending}
            sx={{ whiteSpace: "nowrap" }}
          >
            {t("earlyPickup.header.exportCsvButton")}
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
            {t("earlyPickup.header.filterButton")}
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

export default HeaderEarlyPickup;
