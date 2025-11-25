import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CalendarBellIcon, CrossIcon } from "../../components/common/icons";

const ReminderDialog: React.FC<{
  showReminderDialog: boolean;
  setShowReminderDialog: any;
}> = ({ showReminderDialog, setShowReminderDialog }) => {
  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435, borderRadius: 8 } }}
        maxWidth="sm"
        open={showReminderDialog}
      >
        <DialogTitle>
          <div className="flex justify-between items-center pt-2">
            <div>Reminder</div>
            <div>
              <IconButton
                onClick={() => {
                  setShowReminderDialog(false);
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
            <CalendarBellIcon className="w-48 h-48" />
            <div className="text-center text-lg font-medium text-text-primary">
              Your booking <span className="text-primary">#BKG1023</span> is scheduled at{" "}
              <span className="text-primary">4:30PM</span>. Please be ready.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReminderDialog;
