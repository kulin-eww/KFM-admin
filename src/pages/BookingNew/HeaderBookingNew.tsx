import { Button } from "@mui/material";
import Plus from "../../assets/icons/common/plus.svg?react";
import Filter from "../../assets/icons/common/filter.svg?react";
import { useNavigate } from "react-router-dom";
import FilterMenu from "../../components/Table/FilterMenu";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FilterBooking from "../Booking/FilterBooking";

const HeaderBookingNew: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
  handleBookingExport: any;
}> = ({ selectedFilters, setSelectedFilters, handleBookingExport }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("bookingNew.header.title")}</div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="contained"
            onClick={handleBookingExport.mutate}
            loading={handleBookingExport.isPending}
            sx={{ whiteSpace: "nowrap" }}
          >
            {t("bookingUpcoming.header.exportCsvButton")}
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
            {t("bookingUpcoming.header.filterButton")}
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

export default HeaderBookingNew;
