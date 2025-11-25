import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { CrossIcon, SearchIcon } from "../../../components/common/icons";
import Loader from "../../../components/Loader/Loader";
import ErrorLottie from "../../../components/lottie/ErrorLottie";
import { useTranslation } from "react-i18next";

const AssignDriverDialog: React.FC<{
  showAssignDriverDialog: boolean;
  setShowAssignDriverDialog: any;
  availableDriverData: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  selectedDrivers: any[];
  setSelectedDrivers: any;
  setSelectedBins: any;
  isDumpYardSelected: boolean;
}> = ({
  showAssignDriverDialog,
  setShowAssignDriverDialog,
  availableDriverData,
  isLoading,
  isError,
  isSuccess,
  selectedDrivers,
  setSelectedDrivers,
  setSelectedBins,
  isDumpYardSelected,
}) => {
  const { t } = useTranslation();
  const handleCheckedDrivers = (e: any, driver: any) => {
    const isChecked = e.target.checked;

    setSelectedDrivers((prevSelectedDrivers: any[]) => {
      if (isChecked) {
        return [...prevSelectedDrivers, driver];
      } else {
        return prevSelectedDrivers.filter((d: any) => d.id !== driver.id);
      }
    });

    setSelectedBins((prevSelectedBins: any[]) => {
      if (!isChecked) {
        return prevSelectedBins.filter((bin: any) => bin.driver_id !== driver.id);
      }
      return prevSelectedBins;
    });
  };
  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435, borderRadius: 4 } }}
        maxWidth="sm"
        open={showAssignDriverDialog}
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <div>{t("bookingDetails.assignDriver")}</div>
            <div>
              <IconButton
                onClick={() => {
                  setShowAssignDriverDialog(false);
                }}
                edge="end"
              >
                <CrossIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          {isDumpYardSelected ? (
            <>
              {/* <TextField
            fullWidth
            name="search"
            type="text"
            placeholder="Search"
            // value={search}
            onChange={(e) => {
              // setSearch(e.target.value);
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                    <div className="flex items-center">
                    <IconButton edge="start">
                    <SearchIcon className="text-gray-400" />
                      </IconButton>
                      <span className="h-4 border-r border-1 border-gray-200" />
                      </div>
                      </InputAdornment>
                      ),
                      },
                      }}
                      /> */}
              <div className="flex flex-col gap-2">
                {isLoading && <Loader />}
                {isSuccess && !isLoading && (
                  <>
                    {availableDriverData?.length > 0 ? (
                      <>
                        {availableDriverData?.map((item: any) => {
                          return (
                            <div
                              key={item?.id}
                              className="flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0"
                            >
                              <div className="text-gray-800 flex items-center gap-2">
                                <span className="text-primary">#{item.id}</span>
                                <span className="text-gray-800">{item.name}</span>
                              </div>
                              <input
                                type="checkbox"
                                name={item?.id}
                                checked={selectedDrivers.some((d: any) => d.id === item.id)}
                                onChange={(e: any) => handleCheckedDrivers(e, item)}
                                className="h-5 w-5 accent-primary rounded-md cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="text-red-500 text-center text-lg font-medium mt-4">
                        {t("bookingDetails.noDriversAvailable")}
                      </div>
                    )}
                  </>
                )}
                {isError && <ErrorLottie />}
              </div>
            </>
          ) : (
            <>
              <div className="text-red-600 font-medium mt-2">
                {t("bookingDetails.pleaseSelectDumpYardToAssignDriver")}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {isDumpYardSelected && (
            <Button
              fullWidth
              onClick={() => {
                setShowAssignDriverDialog(false);
              }}
            >
              {t("bookingDetails.save")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssignDriverDialog;
