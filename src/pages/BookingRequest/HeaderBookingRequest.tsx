import { Button } from "@mui/material";
import Plus from "../../assets/icons/common/plus.svg?react";
import Filter from "../../assets/icons/common/filter.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FilterMenu from "../../components/Table/FilterMenu";
import { DownloadIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";
import FilterBookingRequest from "./FilterBookingRequest";

const HeaderBookingRequest: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
  handleReportExport: any;
}> = ({ selectedFilters, setSelectedFilters, handleReportExport }) => {
  const { t } = useTranslation();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("bookingRequest.header.title")}</div>
        <div className="flex gap-2">
        {/* <Button
            variant="contained"
            onClick={handleBookingExport.mutate}
            loading={handleBookingExport.isPending}
            sx={{ whiteSpace: "nowrap" }}
          >
            {t("replacementRequest.header.exportCsvButton")}
          </Button> */}
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
          <FilterBookingRequest
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setAnchorElId={setAnchorElId}
          />
        }
      />
    </>
  );
};

export default HeaderBookingRequest;
