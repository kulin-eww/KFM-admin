import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardTabRequest: React.FC<{ tabs: any[]; active: string }> = ({ tabs, active }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="shadow-md rounded-xl p-4 mt-6 mb-2 mx-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {tabs.map((t) => (
            <Button
              key={t.key}
              variant={active === t.key ? "contained" : "disabledLike"}
              fullWidth
              onClick={() => navigate(`/booking-request?active=${t.key}`, { replace: true })}
              sx={{ paddingY: 1.2 }}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardTabRequest;
