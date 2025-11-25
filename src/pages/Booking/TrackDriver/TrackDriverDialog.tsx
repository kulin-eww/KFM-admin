import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { CrossIcon, SearchIcon, SeperatorIcon } from "../../../components/common/icons";
import Loader from "../../../components/Loader/Loader";
import ErrorLottie from "../../../components/lottie/ErrorLottie";
import dayjs from "dayjs";
import { useState } from "react";
import Map from "./Map";
import { useTranslation } from "react-i18next";

const TrackDriverDialog: React.FC<{
  showTrackDriverDialog: boolean;
  setShowTrackDriverDialog: any;
  bookingDetailData: any;
  selectedDriverForMap: string;
  setSelectedDriverForMap: any;
}> = ({ showTrackDriverDialog, setShowTrackDriverDialog, bookingDetailData, selectedDriverForMap, setSelectedDriverForMap }) => {
  // const [selectedDriverForMap, setSelectedDriverForMap] = useState<string>("default");
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%" } }}
        maxWidth="md"
        open={showTrackDriverDialog}
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <div>{t("bookingDetails.trackDriver")}</div>
            <div>
              <IconButton
                onClick={() => {
                  setSelectedDriverForMap("default");
                  setShowTrackDriverDialog(false);
                }}
                edge="end"
              >
                <CrossIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <h2 className="md:text-base/tight text-sm/tight font-semibold text-[#727272]">
                  ID <span className="text-primary">#BYT-{bookingDetailData?.id}</span>
                </h2>
                <SeperatorIcon />
                <p className="2xl:text-base/tight sm:text-sm/tight text-xs/tight font-medium text-[#727272]">
                  {dayjs(bookingDetailData?.booking_start_date_time).format("YYYY-MM-DD hh:mm A")}
                </p>
              </div>
              {/* <div>
                <Chip
                  label="Approx arrival in 20 mins"
                  color="warning"
                  variant="outlined"
                  sx={{ borderRadius: 2, backgroundColor: "#FF8228", color: "#FFFF", padding: "4px 8px" }}
                />
              </div> */}
            </div>
            <div className="mt-4">
              <TextField
                fullWidth
                // label="Select Waste Type"
                name="driverId"
                select
                placeholder="Select Driver"
                value={selectedDriverForMap}
                onChange={(e) => {
                  setSelectedDriverForMap(e.target.value);
                }}
              >
                <MenuItem disabled value="default">
                  {t("bookingDetails.selectDriver")}
                </MenuItem>
                {/* {handleGetDumpYardList.isLoading && <Loader />} */}
                {bookingDetailData?.track_drivers?.map((val: any) => (
                  <MenuItem key={val?.id} value={val?.id}>
                    {val?.name}
                  </MenuItem>
                ))}
                {/* {handleGetDumpYardList.isError && <ErrorLottie />} */}
              </TextField>
            </div>
            <div className="mt-4">
              <Map driverId={selectedDriverForMap} bookingDetailData={bookingDetailData} />
            </div>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrackDriverDialog;
