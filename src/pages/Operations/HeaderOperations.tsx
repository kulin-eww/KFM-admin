import { Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Filter from "../../assets/icons/common/filter.svg?react";
import FilterMenu from "../../components/Table/FilterMenu";
import FilterOperation from "./FilterOperation";

const HeaderOperations: React.FC<{
  selectedFilters: any;
  setSelectedFilters: any;
}> = ({ selectedFilters, setSelectedFilters }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">Gameplay Packages</div>
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
            {t("common.filter")}
          </Button>
        </div>
      </div>
      <FilterMenu
        anchorElId={anchorElId}
        setAnchorElId={setAnchorElId}
        menuId="filter-menu"
        render={
          <FilterOperation
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setAnchorElId={setAnchorElId}
          />
        }
      />
    </>
  );
};

export default HeaderOperations;
