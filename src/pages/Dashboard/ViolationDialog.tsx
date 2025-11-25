import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { AlertIcon, CalendarBellIcon, CrossIcon } from "../../components/common/icons";

const ViolationDialog: React.FC<{
  showViolationDialog: boolean;
  setShowViolationDialog: any;
}> = ({ showViolationDialog, setShowViolationDialog }) => {
  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 500, borderRadius: 8 } }}
        maxWidth="sm"
        open={showViolationDialog}
      >
        <DialogTitle>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xl font-medium text-red-500">Action Required</div>
            <div>
              <IconButton
                onClick={() => {
                  setShowViolationDialog(false);
                }}
                edge="end"
              >
                <CrossIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col items-center justify-between gap-4 pb-4">
            <div>
              <span className="font-medium text-red-500">Alert: </span>
              <span className="font-medium text-primary">Driver Faisal, Al-Harbi (ID: #STS1) </span>
              is not following the assigned path. Immediate action required
            </div>
            <AlertIcon className="w-48 h-48" />
            <div className="text-lg font-medium text-text-primary">
            <div className="flex justify-between gap-2">
                <span className="font-medium">ID: #STS1</span>
                <span className="font-medium text-primary">Driver: Faisal, Al-Harbi</span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-full mb-2 px-4">
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{
                borderRadius: 4,
                height: 50,
                backgroundColor: "#FF4D4D",
                "&:hover": { backgroundColor: "#FF4D4D" },
              }}
            >
              Track Driver on Map
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViolationDialog;
