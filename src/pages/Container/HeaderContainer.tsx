import { Button } from "@mui/material";
import Plus from "../../assets/icons/common/plus.svg?react";
import Filter from "../../assets/icons/common/filter.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FilterMenu from "../../components/Table/FilterMenu";
import FilterDriver from "../Driver/FilterDriver";
import { useTranslation } from "react-i18next";

const HeaderContainer: React.FC<{
  search: string;
  setSearch: (value: string) => void;
  value: any;
  setValue: any;
}> = ({ search, setSearch, value, setValue }) => {
  const navigate = useNavigate();
  const [anchorElId, setAnchorElId] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    upcoming: false,
    ongoing: false,
    monthly: false,
    yearly: false,
  });
  const { t } = useTranslation();

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">Game Category</div>
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
            {t("common.filter")}
          </Button> */}
          <Button
            variant="contained"
            startIcon={<Plus className="h-4 rtl:ml-3" />}
            onClick={() => {
              navigate("/container/add");
            }}
          >
            {t("container.addNewContainer")}
          </Button>
        </div>
      </div>
      <FilterMenu
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
      />
    </>
  );
};

export default HeaderContainer;
