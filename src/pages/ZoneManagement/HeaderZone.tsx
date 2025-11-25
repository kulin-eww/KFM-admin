import { Button } from "@mui/material";
import Plus from "../../assets/icons/common/plus.svg?react";
import Filter from "../../assets/icons/common/filter.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const HeaderZone: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
}> = ({ selectedFilters, setSelectedFilters }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">{t("zoneManagement.header.title")}</div>
        <div className="flex gap-2">
          {/* <Button
            id="filter-menu"
            variant="contained"
            startIcon={<Filter className="h-4" />}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              if (anchorElId === "filter-menu") {
                setAnchorElId(null);
                return;
              }
              setAnchorElId("filter-menu");
            }}
          >
            {t("driver.filter")}
          </Button> */}
          <Button
            variant="outlined"
            startIcon={<Plus className="h-4 rtl:ml-3" />}
            onClick={() => {
              navigate("/zone/add");
            }}
          >
            {t("zoneManagement.header.addZone")}
          </Button>
        </div>
      </div>
      {/* <FilterMenu
        anchorElId={anchorElId}
        setAnchorElId={setAnchorElId}
        menuId="filter-menu"
        render={
          <FilterDriver
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setAnchorElId={setAnchorElId}
          />
        }
      /> */}
    </>
  );
};

export default HeaderZone;
