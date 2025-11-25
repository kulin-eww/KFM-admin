import { Button } from "@mui/material";

const CardTabReport: React.FC<{ tabs: any[]; active: string; setActive: any }> = ({ tabs, active, setActive }) => {
  return (
    <>
      <div className="shadow-md rounded-xl p-4 mt-6 mb-2 mx-2">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
          {tabs.map((t) => (
            <Button
              key={t.key}
              variant={active === t.key ? "contained" : "disabledLike"}
              fullWidth
              onClick={() => setActive(t.key)}
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

export default CardTabReport;
